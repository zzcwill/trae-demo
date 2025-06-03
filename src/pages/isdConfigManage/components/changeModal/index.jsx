/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-01-08 18:08:44
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-01-08 18:32:30
 * @FilePath: /askone-manage-pc/src/pages/isdConfigManage/components/changeModal/index.jsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { message, Modal, Select } from "dpl-react";
import React, { useEffect, useState } from "react";
import { uForm } from "dora";
import EmployeeSearch from "../../../employeeManage/agentManage/components/employeeSearch";
// import "./index.scss";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
} = uForm;
const actions = createFormActions();
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export default function ChangeModal({ onOk, onCancel, visible, title = '提示' }) {
  const onOkHandler = () => {
    actions.submit().then(({ values }) => {
      console.log(values);
      onOk?.(values);
    });
  };

  const onCancelHandler = () => {
    onCancel?.();
  };

  useEffect(() => {
    if (visible) {
    } else {
      actions.reset();
    }
  }, [visible]);

  return visible ? (
    <Modal
      className="add-planning-modal dpl-modal-overwite"
      onOk={onOkHandler}
      onCancel={onCancelHandler}
      title={title}
      visible={visible}
    >
      <SchemaForm
        className="app-search-box"
        actions={actions}
        components={{ EmployeeSearch }}
      >
        <Field
          type="string"
          title="受理人"
          name="acceptorTrueId"
          x-component="EmployeeSearch"
          {...formItemLayout}
          x-component-props={{
            other: {
              allowClear: true,
              showSearch: true,
              // mode: "multiple",
              // maxTagCount: "2",
              // maxTagTextLength: "3",
              placeholder: "请输入受理人名称、工号、账号",
            },
          }}
          x-rules={[
            {
              required: true,
              message: "请输入受理人",
            },
          ]}
        />
      </SchemaForm>
    </Modal>
  ) : null;
}
