import React, { useState, useEffect } from "react";
import {
  Select,
  Form,
  Col,
  Row,
  Input,
  Button,
  message,
  Modal
} from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api";
import confirmExamineModal from "../../../confirmExamineModal";

const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 }
};
const OneFormLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 }
};

const examineMap = [
  {
    id: 1,
    name: "通过"
  },
  {
    id: 2,
    name: "不通过"
  }
];

let unPassOptions = [];
const getOptions = async () => {
  const data = await get({
    url: Api.getCommonOptions,
    params: { groupNames: "audit_unpass_reason" }
  });
  if (data.success) {
    data.data.forEach(item => {
      if (item.groupName === "audit_unpass_reason") {
        unPassOptions = item.options;
      }
    });
  }
};
getOptions();

const BatchExamineForm = React.forwardRef((props, refs) => {
  const { form, closeModel, selectRows, param } = props;
  const { getFieldDecorator, setFieldsValue } = form;

  const [isShow, setIsShow] = useState(false); // 是否展示
  /**
   * 审核状态修改
   * @param {String} value
   */
  const stateChange = value => {
    if (value == "2") {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  const submit = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const keyList = Object.keys(selectRows);
        if (!keyList.length) {
          Modal.warning({
            content: "请选择至少一个问答",
            okText: "确定"
          });
          return false;
        }
        let idList = [];
        keyList.forEach(item => {
          idList = idList.concat(selectRows[item]);
        });
        const param = Object.assign(
          {
            idList
          },
          values
        );
        if (values.status == "2") {
          confirmExamineModal.render({
            text: "正在进行编辑问答审核状态的操作",
            descript: (
              <>
                <p>未通过原因将自动同步到对应问答</p>
                <p style={{ color: "#2A2A2A", "line-height": "22px" }}>
                  你还要继续吗？
                </p>
              </>
            ),
            okText: "继续",
            onCancel: () => {
              confirmExamineModal.close();
            },
            onOk: () => {
              replyBatchAudit(param);
            }
          });
        } else {
          replyBatchAudit(param);
        }
      }
    });
  };

  /**
   * 批量审核
   * @param {Object} values
   */
  const replyBatchAudit = async values => {
    const res = await post({ url: Api.replyBatchAudit, data: values });
    if (res.success) {
      message.success("问答审核操作成功！");
      confirmExamineModal.close();
      closeModel(true);
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    setFieldsValue(param);
    setIsShow(false)
  }, [param]);
  return (
    <Form>
      <Row>
        <Col span={12}>
          <Form.Item
            label="批量修改审核状态为："
            {...formItemLayout}
            colon={false}
          >
            {getFieldDecorator("status", {
              rules: [{ required: true, message: "请选择审核状态" }],
              initialValue: param.status
            })(
              <Select
                placeholder="请选择审核状态"
                allowClear
                onChange={stateChange}
                getPopupContainer={triggerNode => triggerNode.parentNode}
              >
                {examineMap.length > 0 &&
                  examineMap.map(item => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
              </Select>
            )}
          </Form.Item>
        </Col>
        {isShow && (
          <Col span={12}>
            <Form.Item label="未通过原因：" {...formItemLayout} colon={false}>
              {getFieldDecorator("auditUnPassReasonCode", {
                rules: [{ required: true, message: "请选择审核未通过原因" }],
                initialValue: param.auditUnPassReasonCode
              })(
                <Select placeholder="请选择未通过原因" allowClear>
                  {unPassOptions.length > 0 &&
                    unPassOptions.map(item => {
                      return (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </Form.Item>
          </Col>
        )}
      </Row>
      <Row>
        {isShow && (
          <Form.Item label="未通过补充说明：" {...OneFormLayout} colon={false}>
            {getFieldDecorator("auditUnPassDesc", {
              initialValue: param.auditUnPassDesc
            })(
              <Input.TextArea
                placeholder="未通过补充说明内容（不超过200字）"
                autosize={{ minRows: 2, maxRows: 3 }}
                style={{ width: "100%" }}
                maxLength={200}
              />
            )}
          </Form.Item>
        )}
      </Row>
      <Row>
        <div className="submit-box">
          <Button
            type="primary"
            onClick={() => {
              submit();
            }}
          >
            确定
          </Button>
          <div className="space"></div>
          <Button
            type="primary-bordered"
            onClick={() => {
              closeModel();
            }}
          >
            取消
          </Button>
        </div>
      </Row>
    </Form>
  );
});
export default Form.create()(BatchExamineForm);
