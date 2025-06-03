import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, Form, Input } from "dpl-react";
import { modalTypeEnum, editInputype } from "../../config";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};
function Edit(props, ref) {
  const { form, formData = {}, type, onCancel, onSave } = props;
  const { getFieldDecorator, validateFields, setFieldsValue } = form;

  const save = () => {
    form.validateFields((err, values) => {
      if (!err) {
        const result = {
          jumpUrlName: values.jumpUrlName.trim(),
          jumpUrl: values.jumpUrl.trim(),
        };
        onSave && onSave(result);
        onCancel && onCancel();
      }
    });
  };

  const validatorInput = (message, rule, value, callback) => {
    if (!value || !value.trim()) {
      callback(message);
    }
    callback();
  };
  return (
    <div className="edit-modal-box" ref={ref}>
      <Form>
        <FormItem label="链接名称" {...formItemLayout}>
          {getFieldDecorator("jumpUrlName", {
            rules: [
              {
                validator: (rule, value, callback) => {
                  validatorInput(editInputype.name, rule, value, callback);
                },
              },
              { required: true, message: "请输入链接名称" },
            ],
            initialValue: formData.jumpUrlName,
          })(
            <Input
              placeholder="请输入链接名称"
              maxLength={20}
              allowClear
              autocomplete="off"
            />
          )}
        </FormItem>
        <FormItem label="链接" {...formItemLayout}>
          {getFieldDecorator("jumpUrl", {
            rules: [
              {
                validator: (rule, value, callback) => {
                  validatorInput(editInputype.url, rule, value, callback);
                },
              },
              { required: true, message: "请输入链接" },
            ],
            initialValue: formData.jumpUrl,
          })(
            <Input
              placeholder="请输入链接"
              maxLength={200}
              allowClear
              autocomplete="off"
            />
          )}
        </FormItem>
      </Form>
      {type !== modalTypeEnum.detail && (
        <div className="button-box">
          <Button
            className="button-item"
            type="primary"
            onClick={() => {
              save();
            }}
          >
            确认
          </Button>

          <div className="line-box"></div>
          <Button
            className="button-item"
            onClick={() => {
              onCancel();
            }}
          >
            取消
          </Button>
        </div>
      )}
    </div>
  );
}
export default Form.create()(React.forwardRef(Edit));
