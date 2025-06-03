import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, InputNumber, Input, Button} from "dpl-react";

const FormItem = Form.Item;

const MultiEditModal = (props) => {
  const { visible, id, onCancel, onOk, form } = props;
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  const [loading, setLoading] = useState(false); // loading

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

  /**
   * 保存点击
   */
  const confirmHandler = () => {
    validateFields((err, values) => {
      console.log('lxp: confirmHandler', values);
      if (!err) {
        Modal.confirm({
          title: "提示",
          content: "是否确定批量修改当前选中的配置项？",
          onOk: () => {
            onOk?.(values);
            setFieldsValue({
              vip: undefined,
              grade: undefined,
              remark: '',
            })
          },
        })
      }
    });
  };

    /**
   * 取消
   */
    const cancelHandler = () => {
      setFieldsValue({
        vip: undefined,
        grade: undefined,
        remark: '',
      })
      onCancel?.();
    };

  return (
    <Modal
      width={1000}
      title="批量编辑"
      visible={visible}
      onCancel={cancelHandler}
      onOk={confirmHandler}
      okText="保存"
    > 

      <div className="multi-edit-modal">
        <Form>
          <Row>
            <Col span={12}>
              <FormItem {...formItemLayout} label="VIP等级">
                {getFieldDecorator("vip", {
                  rules: [{ required: true, message: "请输入VIP等级" }],
                })(<InputNumber min={1} max={99} disabled={loading} />)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem {...formItemLayout} label="受理优先级">
                {getFieldDecorator("grade", {
                  rules: [{ required: true, message: "请输入受理优先级" }],
                })(<InputNumber min={1} max={99} disabled={loading} />)}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem {...formItemOneLayout} label="备注">
              {getFieldDecorator("remark")(
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
      </div>
    </Modal>
  );
};

export default Form.create()(React.forwardRef(MultiEditModal));
      