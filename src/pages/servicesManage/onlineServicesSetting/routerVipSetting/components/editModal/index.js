import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import {
  Form,
  Button,
  message,
  Row,
  Col,
  Radio,
  InputNumber,
  Input,
} from "dpl-react";
import { modalType } from "../../config";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import ServiceSetting from "../serviceSetting";
import TagSetting from "../tagSetting";
import SpecialSetting from "../specialSetting";
const FormItem = Form.Item;
// 按标签配置 数据处理
function tagSettingData(data) {
  return {
    location: data.location,
    channel: data.channel,
    module: data.module,
    tagType: data.tagType,
    tagId: data.tagCode,
  };
}
// 按服务构件配置 数据处理
function empowerData(data) {
  return {
    location: data.location,
    channel: data.channel,
    module: data.module,
    serviceEmpower: data.serviceEmpower,
  };
}
// 按特殊地区配置 数据处理
function specialData(data) {
  return {
    location: data.location,
    taxType: data.taxType,
  };
}
// 配置类型
const typeList = [
  {
    label: "按标签配置",
    value: "tag",
    component: TagSetting,
    formatData: tagSettingData,
  },
  {
    label: "按服务构件配置",
    value: "empower",
    component: ServiceSetting,
    formatData: empowerData,
  },
  {
    label: "按特殊地区配置",
    value: "special",
    component: SpecialSetting,
    formatData: specialData,
  },
];
// 布局
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
// 布局
const formItemOneLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function EditModal(props, refs) {
  const {
    form,
    data = {},
    type,
    onCancel,
    locationList = [], // 地区
    consultServiceList = [], // 咨询产品类型
    serviceList = [], // 服务构建
    channelList = [], // 渠道
    tagTypeList=[], // 标签列表
  } = props;
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const [selectType, setSelectType] = useState({
    type: undefined,
  });
  const [currentType, setCurrentType] = useState("");
  const configTypeRef = useRef(null);
  const [loading, setLoading] = useState(false); // loading
  const sendDataRef = useRef(null);
  /**
   * 配置类型筛选val
   */
  const configTypeChange = (e) => {
    const val = e.target.value;
    configTypeRef.current = val;
    setCurrentType(val);
  };

  /**
   * 保存点击
   */
  const confirmHandler = () => {
    validateFields((err, values) => {
      if (!err) {
        // 没有选中配置类型
        if (!configTypeRef.current) {
          return;
        }
        setSelectType({
          type: configTypeRef.current,
        });
        let sendData = {
          vip: values.vip,
          grade: values.grade,
          remark: values.remark,
          configType: values.configType,
        };
        sendDataRef.current = sendData;
      }
    });
  };

  /**
   * 子组件校验回调
   */
  const configTypeValidateCallBack = (success, result) => {
    if (success) {
      const sendData = Object.assign({}, sendDataRef.current, result);
      if (type === modalType.add.type) {
        add(sendData);
      }
      if (type === modalType.edit.type) {
        sendData.id = data.id;
        update(sendData);
      }
    }
  };

  /**
   * 新增
   */
  const add = async (data) => {
    try {
      setLoading(true);
      const res = await post({
        url: Api.postSaveRoutePriority,
        data,
      });
      if (res.success) {
        message.success("新增成功！");
        cancelHandler(true);
      } else {
        message.error(res.message);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  /**
   * 修改
   */
  const update = async (data) => {
    try {
      setLoading(true);
      const res = await post({
        url: Api.postUpdateRoutePriority,
        data,
      });
      if (res.success) {
        message.success("修改成功！");
        cancelHandler(true);
      } else {
        message.error(res.message);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  /**
   * 取消
   */
  const cancelHandler = (flag) => {
    setSelectType(null);
    onCancel && onCancel(flag);
  };


  useEffect(() => {
    if (data.configType) {
      configTypeRef.current = data.configType;
      setCurrentType(data.configType);
    }
  }, [data]);
  return (
    <div className="edit-blacklist-modal-box">
      <Form>
        <div className="label-title">适用规则</div>
        <FormItem>
          {getFieldDecorator("configType", {
            initialValue: data.configType,
            rules: [{ required: true, message: "请选择配置类型" }],
          })(
            <Radio.Group
              className="edit-radio-box"
              onChange={configTypeChange}
              disabled={type === modalType.edit.type || loading}
            >
              {typeList.map((item) => {
                const Component = item.component;
                return (
                  <div key={item.value}>
                    <Radio key={item.value} value={item.value}>
                      {item.label}
                    </Radio>
                    <Component
                      channelList={channelList}
                      serviceList={serviceList}
                      tagTypeList={tagTypeList}
                      locationList={locationList}
                      consultServiceList={consultServiceList}
                      loading={loading}
                      data={currentType === item.value ? data : {}}
                      type={type}
                      labelType={item.value}
                      currentLabelType={currentType}
                      isValidate={selectType}
                      callBack={configTypeValidateCallBack}
                    />
                  </div>
                );
              })}
            </Radio.Group>
          )}
        </FormItem>
        <div className="label-title">VIP配置</div>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="VIP等级">
              {getFieldDecorator("vip", {
                initialValue: data.vip,
                rules: [{ required: true, message: "请输入VIP等级" }],
              })(<InputNumber min={1} max={99} disabled={loading} />)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="受理优先级">
              {getFieldDecorator("grade", {
                initialValue: data.grade,
                rules: [{ required: true, message: "请输入受理优先级" }],
              })(<InputNumber min={1} max={99} disabled={loading} />)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <FormItem {...formItemOneLayout} label="备注">
            {getFieldDecorator("remark", {
              initialValue: data.remark,
            })(
              <Input.TextArea
                placeholder="请输入备注"
                autosize={{ minRows: 2, maxRows: 2 }}
                disabled={loading}
                maxLength="1000"
                showTextCount={true}
              />
            )}
          </FormItem>
        </Row>
      </Form>
      <div className="button-box">
        <Button
          type="primary"
          className="button-item"
          loading={loading}
          onClick={() => {
            confirmHandler();
          }}
        >
          保存
        </Button>
        <div className="line-box"></div>
        <Button
          className="button-item"
          disabled={loading}
          onClick={() => {
            cancelHandler();
          }}
        >
          取消
        </Button>
      </div>
    </div>
  );
}

export default Form.create()(React.forwardRef(EditModal));
