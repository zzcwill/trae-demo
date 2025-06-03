import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Input, Select, Button, message } from "dpl-react";
import { getRequiredRule, getRangeRule } from "@/utils/rules";
import "./index.scss";

const FormItem = Form.Item;
const Option = Select.Option;



function SkipModal(props) {
  const {
    visible,
    onOk,
    onCancel,
    form
  } = props;

  const {
    getFieldDecorator,
    validateFields,
    getFieldInstance,
    setFieldsValue,
    resetFields,
} = form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
  };
  const handleConfirm = () => {
    form.validateFields(async (err, values) => {
      if (err) return;
      onOk && onOk(values);
      resetFields();
  });

  }
  const skipList = [
    {
      text: '图文咨询',
      id: 'applyPictureQuestion' //发起图文咨询
    },
    {
      text: '财税实务咨询（综合入口）',
      id: 'defualtConsultDetail' //正式环境综合咨询入口点进去的咨询
    },
    {
      text: '财税专家咨询分类页',
      id: 'expertConsultList' //yqconsult-web-pc/consult/expert?type=member
    },
  ]
  return (
    <Modal
      className="skip-modal"
      visible={visible}
      title="增加咨询入口"
      onOk={handleConfirm}
      onCancel={onCancel}
    >
      <FormItem {...formItemLayout} label="文本内容">
        {getFieldDecorator("skipText", {
          initialValue: undefined,
          rules: [
            getRequiredRule('请输入文本内容')
          ]
        })(
          <Input
            placeholder="请输入跳转文本内容"
            maxLength={20}
            allowClear
          />
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="咨询入口">
        {getFieldDecorator("skipType", {
          initialValue: undefined,
          rules: [
            getRequiredRule('请选择咨询入口')
          ]
        })(
          <Select
            placeholder="请选择咨询入口"
            style={{ width: "100%" }}
          >
            {skipList.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.text}
                </Option>
              );
            })}
          </Select>
        )}
      </FormItem>
    </Modal>
  );
}


export default Form.create()(SkipModal);