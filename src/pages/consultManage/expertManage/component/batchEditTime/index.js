import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Modal, Tag, Select, Button, Row, Col, message, } from "dpl-react";
import { uForm } from "dora";
import classnames from "classnames";
import { valueEnum } from "../../config";
import Api from "@/request/api-olhelpmanage";
import { get, post } from "@/request/request";
import OnlineChatServiceDate from "../onlineChatServiceDate";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormEffectHooks,

} = uForm;

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const configErrorNull = {
  message: "配置不能存在空",
  type: "error",
};

const areaType = "2";
const INQUIRY = "INQUIRY"; // 专家问诊
const ONLINECHAT = "online_chat"; // 在线咨询
const actions = createFormActions();

function BatchEditTime(props) {
  const { visible, expertList, onOk, onCancel } = props;
  const [loading, setLoading] = useState(false);
  const [areaList, setAreaList] = useState([]);
  const [internalList, setInternalList] = useState([]); // 内部用于编辑的专家列表

  const updateTime = async (values) => {
    const inquiryList = internalList.filter((item) => item.subScene === INQUIRY);
    if (inquiryList.length > 0) {
      Modal.confirm({
        title: "提示",
        content: <div>
          <div>当前专家&机构中存在咨询类别为“专家问诊”的专家，是否需要系统去除？</div>
          <div>具体专家&机构为：{inquiryList.map((item) => item.name).join("、")}</div>
        </div>,
        onOk: () => {
          const otherList = internalList.filter((item) => item.subScene !== INQUIRY);
          setInternalList(otherList)
        },
      });
      return;
    }

    const { onlineChatServiceTimeList } = values;
    const allLocationList = []
    onlineChatServiceTimeList.forEach((item) => { // 获取所有时间选项的去重地区
      item.locationList.forEach((location) => {
        if(allLocationList.indexOf(location) === -1) {
          allLocationList.push(location)
        }
      })
    })
    setLoading(true);
    try {
      const res = await post({
        url: Api.expertServiceLocationCheck,
        data: {
          expertServiceVOList: internalList.map((item) => {
            return {
              id: item.id,
              expertName: item.name,
            }
          }),
          serviceWay: ONLINECHAT,
          locationList: allLocationList
        },
      });
      setLoading(false);
      if (res.data?.needFilter && res.data?.expertServiceVOList?.length > 0) { // 地区不匹配需要过滤
        const filterList = res.data?.expertServiceVOList
        const ids = filterList.map((item) => item.id)
        Modal.confirm({
          title: "提示",
          content: <div>
            <div>当前专家&机构中存在地区不匹配的专家，是否需要系统去除</div>
            <div>具体专家&机构为：{filterList.map((item) => item.expertName).join("、")}</div>
          </div>,
          onOk: () => {
            const otherList = internalList.filter((item) => !ids.includes(item.id));// 留下不在过滤列表中的专家
            setInternalList(otherList)
          },
        });
      } else {
        Modal.confirm({
          title: "提示",
          content: "请再次确认是否进行批量在线时间修改，提交后将按照新修改的时间更新",
          onOk: async () => {
            setLoading(true);
            const result = await post({
              url: Api.expertServiceTimeBatchUpdate,
              data: {
                idList: internalList.map((item) => item.id),
                serviceWay: ONLINECHAT,
                serviceTimeList: onlineChatServiceTimeList
              },
            });
            setLoading(false);
            if (result.success) {
              message.success("批量修改成功");
              onOk && onOk();
              actions.reset();
            } else if (result.message) {
              message.error(result.message);
            }
          },
          onCancel: () => {
            setLoading(false);
          }
        });
      }
    } catch (error) {
      setLoading(false);
    }

  }

  const handleConfirm = async () => {
    if (internalList.length === 0) {
      message.error("请至少选择一个专家");
      return
    }
    try {
      actions.submit().then(async (res) => {
        updateTime(res.values);
      })
    } catch (error) {
      
    }
  };

  const effectsFunc = () => {
    const { setFieldState, getFieldState } = createFormActions();
  };

  const getTreeDate = async () => {
    const res = await get({
      url: Api.classifyExpertTaxList,
      params: {
        type: areaType,
      },
    });
    if (res.success) {
      const data = res.data;
      Array.isArray(data) &&
        data.forEach((item) => {
          if (item.type == areaType && Array.isArray(item.list)) {
            const list = item.list.map((item) => {
              return {
                label: item.name,
                value: item.code,
              };
            });
            //地区类型
            setAreaList(list);
          }
        });
    } else {
      message.error(res.message);
    }
  };
  useEffect(() => {
    setInternalList([...expertList]);
  }, [expertList]);
  useEffect(() => {
    getTreeDate();
  }, []);
  return (
    <Modal
      className="batch-edit-time-modal"
      width={1260}
      visible={visible}
      title="在线时间设置"
      onOk={handleConfirm}
      onCancel={() => {
        setLoading(false);
        onCancel && onCancel();
      }}
      confirmLoading={loading}
    >
      <Row className="expert-out">
        <Col span={3}>
          <div className="left-title">已选择专家&机构：</div>
        </Col>
        <Col span={21}>
          <div className="expert-view">
            {internalList.map((item, index) => (
              <Tag
                key={item.id}
                className="expert-item"
                closable
                onClose={(e) => {
                  e.preventDefault();
                  internalList.splice(index, 1);
                  setInternalList([...internalList]);
                }}
              >
                {item.label}
              </Tag>
            ))}
          </div>
        </Col>
      </Row>
      <SchemaForm
        components={{
          OnlineChatServiceDate,
        }}
        // initialValues={detail}
        actions={actions}
        effects={effectsFunc}
      >
        <Field
          type="string"
          title="专家在线时间"
          name="onlineChatServiceTimeList"
          {...formItemLayout}
          x-component="OnlineChatServiceDate"
          x-rules={(value) => {
            if (!value) {
              return configErrorNull;
            }
            if (Array.isArray(value)) {
              if (!value.length) {
                return configErrorNull;
              }
              for (let i = 0, len = value.length; i < len; i++) {
                const item = value[i];
                if (
                  !item[valueEnum.serviceDateBegin] ||
                  !item[valueEnum.serviceDateEnd] ||
                  !item[valueEnum.serviceTimeBegin] ||
                  !item[valueEnum.serviceTimeEnd] ||
                  !Array.isArray(item[valueEnum.locationList]) ||
                  !item[valueEnum.locationList].length
                ) {
                  return configErrorNull;
                }
              }
            }
          }}
          x-component-props={{
            areaList: areaList,
          }}
        />
      </SchemaForm>
    </Modal>
  );
}

export default BatchEditTime;
