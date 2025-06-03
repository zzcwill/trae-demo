import React, { useState, useEffect } from "react";
import { Modal, Form, Input, message } from 'dpl-react';
import { getRequiredRule, getRangeRule } from "@/utils/rules";

const { TextArea } = Input;

const FormItem = Form.Item;


function CommentModal(props) {
  const { open, prop, title, submitClose = true, required = true, maxLength, label, model = {}, handleClick, handleClose, form } = props;
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  const modalClose = () => {
    form.resetFields();
    handleClose();
  }

  const submit = () => {
    form.validateFields(async (err, fields) => {
      if (err) return;
      if (fields[prop] === undefined || fields[prop].length === 0) {
        return message.warning('不能为空');
      } else if (fields[prop].length > maxLength) {
        return message.warning(`不能超过${maxLength}`);
      }
      handleClick(fields[prop]);
      if(submitClose) {
        modalClose();
      }
    });
  }

  let placeText = `请输入${label}`;
  const rules = []
  if (required) {
    rules.push(getRequiredRule(`请输入${label}`))
  }
  if (maxLength) {
    placeText += `（不超过${maxLength}个字）`
    rules.push(getRangeRule(1, maxLength, `字数限制${maxLength}`))
  }

  useEffect(() => {
    if(open) {
      form.resetFields();
    }
  },[open])

  return (
    <Modal maskClosable={false} title={title} visible={open} onCancel={() => modalClose()} onOk={() => submit()} width={600}>
      <Form layout="horizontal">
        <FormItem {...formItemLayout} label={label}>
          {getFieldDecorator(prop, {
            initialValue: model[prop],
            rules: rules
          })(<TextArea rows={4} placeholder={placeText} maxLength={maxLength} />)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default Form.create()(CommentModal);