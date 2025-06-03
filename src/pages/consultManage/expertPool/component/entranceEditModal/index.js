import React, { useState, useEffect, useMemo } from "react";
import "./index.scss";
import {
  Input,
  Button,
  message,
  Form,
  Select,
  Row,
  Col,
  TreeSelect,
  Modal,
  Tag,
} from "dpl-react";
import {
  subSceneList,
  sceneList,
 editTypeEnum } from "@/const/config";
import { getExpertCheckStatus } from "@/const/type";
import { post, get } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import ExpertSearchModal from "@/components/consultManage/expertSearchModal";

const FormItem = Form.Item;
const Option = Select.Option;
const oneFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

/**
 * 格式化树节点，利用treeNode自行渲染
 * @param {props} tree
 * @param {props} formatObj
 */
function formatTree(tree) {
  return tree.map((item) => {
    return (
      <TreeSelect.TreeNode
        className='custom-treeselect-node'
        key={item.value}
        value={item.value}
        title={item.label}
        disabled={item.tierType !== '99'}
      >
        {formatTree(item.children || [])}
      </TreeSelect.TreeNode>
    );
  });
}

/**
 * 获取会员还是专项
 * @param {String} target
 */
 function getSubSceneType(target) {
  let value = "";
  subSceneList.forEach((item) => {
      if (item.id === target) {
          value = item.showName;
      }
  });
  return value ? `${value}` : value;
}

function EntranceEditModal(props, ref) {
  const {
    config = {},
    areaList = [],
    userLabelList = [],
    onCancel,
    form,
    formData = {},
  } = props;
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const [loading, setLoading] = useState(false); // loading
  const [isShow, setIsShow] = useState(false);
  const [chooseExperts, setChooseExperts] = useState(formData.experts || []); //已经选中的专家列表
  const [configList, setConfigList] = useState([]); // 配置列表
  const { relationBizType } = config
  /**
   * 获取落地页列表
   */
  const getConfig = async () => {
    const res = await get({
      url: Api.getExpertPoolConfigQuery,
      params: {
        relationBizType: relationBizType,
      },
    });
    if (res.success) {
      const data = res.data;
      setConfigList(data);
    } else {
      message.error(res.message);
    }
  };

  const formatData = (data) => {
    return {
      name: (data.name && data.name.trim()) || undefined,
      relationBizIds: data.userLabel ? [data.userLabel] : data.relationBizIds,
      relationBizType: data.userLabel ? '02' : relationBizType,
      expertIds: chooseExperts.map(item => item.id),
    };
  };

  const expertChoose = () => {
    setIsShow(true);
  };
  // 新增卡片列表
  const addCardList = (data) => {
    console.log("addCardList", data);
    setChooseExperts(data)
    setFieldsValue({
      experts: data
    })
  };
  /**
   * 关闭批量设置弹窗
   */
  const closeModal = () => {
    setIsShow(false);
  };

  // 保存
  const save = () => {
    form.validateFields((err, values) => {
      if (!err) {
        // userLabel和partcode二选一必填
        if (!values.userLabel && !values.relationBizIds?.length) {
          message.error("用户分层跟partcode必须填写一个！");
          return;
        }
        if (values.userLabel && values.relationBizIds?.length > 0) {
          message.error("当前partcode与用户分层为二选一，请重新选择！");
          return;
        }
        switch (config.type) {
          case editTypeEnum.edit:
            Modal.confirm({
              title: "提示",
              content: "请再次确认是否提交，提交后专家池将按照配置内容进行生效！",
              onOk: async () => {
                let result = formatData(values);
                result.id = formData.id;
                update(result);
              },
            });
            break;
          case editTypeEnum.add:
            add(formatData(values));
            break;
          default:
            break;
        }
      }
    });
  };

  const update = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postExpertPoolUpdate,
        data,
      });
      if (res.success) {
        message.success("修改成功！");
        onCancel(true);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("系统出错请联系管理员！");
    }
    setLoading(false);
  };

  const getRelationBizIds = useMemo(() => {
    return (value) => {
      console.log('getRelationBizIds', value);
      if (!value || !value.length) {
        return '';
      }
      return value.map(item => item.relationBizId)
    }
  }, []);

  const add = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postExpertPoolSave,
        data,
      });
      if (res.success) {
        message.success("新增成功！");
        onCancel(true);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("系统出错请联系管理员！");
    }
    setLoading(false);
  };

  const validatorInput = (message, rule, value, callback) => {
    if (!value || !value.trim()) {
      callback(message);
    }
    callback();
  };

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <div className="expert-pool-edit-modal-box" ref={ref}>
      <Form>
        <Row>
          <Col span={18}>
            <FormItem label="专家池名称" {...oneFormItemLayout}>
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: [] },
                  {
                    validator: (rule, value, callback) => {
                      validatorInput("请输入专家池名称", rule, value, callback);
                    },
                  },
                ],
                initialValue: formData.name,
              })(
                <Input
                  disabled={loading}
                  maxLength="30"
                  placeholder="请输入专家池名称"
                ></Input>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label="用户分层" {...oneFormItemLayout}>
              {getFieldDecorator("userLabel", {
                // rules: [
                //   { required: true, message: [] },
                // ],
                initialValue:(formData.relationBizType == '02' && formData.relationBizVOList?.length > 0)? formData.relationBizVOList[0].relationBizId : undefined,
              })(
                <Select placeholder="请选择用户分层" allowClear>
                  {userLabelList.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label="专家" {...oneFormItemLayout}>
              {getFieldDecorator("experts", {
                rules: [{ required: true, message: "请选择专家" }],
                initialValue: chooseExperts,
              })(
                <div className="choose-expert-out">
                  {chooseExperts?.length == 0 &&
                    <div className="choose-expert-placeholder">请选择专家</div>
                  }
                  {chooseExperts &&
                    chooseExperts.length > 0 &&
                    chooseExperts.map((item, index) => (
                      <Tag
                        key={item.id}
                        size="small"
                        closable
                        onClose={(e) => {
                          e.preventDefault();
                          chooseExperts.splice(index, 1)
                          setChooseExperts([...chooseExperts]);
                          setFieldsValue({
                            experts: [...chooseExperts]
                          })
                        }}
                      >
                        {item.name}({getSubSceneType(item.subScene)}){item.status !== '1' && <span>-{getExpertCheckStatus(item.status)}</span>}
                      </Tag>
                    ))}
                </div>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <Button
              style={{ marginLeft: 10 }}
              type="primary"
              onClick={expertChoose}
            >
              选择专家
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={18}>
            <FormItem label="partcode" {...oneFormItemLayout}>
              {getFieldDecorator("relationBizIds", {
                // rules: [{ required: true, message: "请选择partcode" }],
                initialValue: (formData.relationBizType == '01' && formData.relationBizVOList?.length > 0)? getRelationBizIds(formData.relationBizVOList) : undefined,
              })(
                <TreeSelect
                  placeholder="请选择partcode"
                  multiple
                  allowClear
                  showSearch
                  className='custom-treeselect-out'
                  disabled={loading}
                  treeNodeFilterProp="title"
                  showCheckedStrategy={TreeSelect.SHOW_CHILD}
                  getPopupContainer={(triggerNode) => {
                    return triggerNode.parentNode;
                  }}
                >
                  {formatTree(configList)}
                </TreeSelect>
              )}
            </FormItem>
          </Col>
          <Col span={6}>
            <span style={{ marginLeft: 10, lineHeight: "29px" }}>
              *渠道/产品/模块/partcode{" "}
            </span>
          </Col>
        </Row>
      </Form>
      <div className="button-box">
        <Button
          type="primary"
          className="button-item"
          loading={loading}
          onClick={() => {
            save();
          }}
        >
          保存
        </Button>
        <div className="line-box"></div>
        <Button
          className="button-item"
          disabled={loading}
          onClick={() => {
            onCancel();
          }}
        >
          取消
        </Button>
      </div>
      <Modal
        title="请选择专家"
        visible={isShow}
        width="1220px"
        className="expert-select-modal"
        footer={null}
        destroyOnClose
        onCancel={() => {
          closeModal();
        }}
      >
        <ExpertSearchModal
          value={chooseExperts}
          type="pool"
          multiple
          scene={sceneList[0].id}
          regionList={areaList}
          onCancel={closeModal}
          onChange={addCardList}
        />
      </Modal>
    </div>
  );
}

export default Form.create()(React.forwardRef(EntranceEditModal));
