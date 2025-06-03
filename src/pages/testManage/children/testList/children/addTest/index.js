/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2022-11-30 15:05:57
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-03-06 20:07:44
 * @FilePath: /askone-manage-pc/src/pages/testManage/children/testList/children/addTest/index.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useEffect } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Button, message } from "dpl-react";
import history from "@/history";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import qs from "qs";

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 15 },
};
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
} = uForm;
const actions = createFormActions();

export default function AddTest(props) {
  const [id, setId] = useState(() => {
    const obj = qs.parse(window.location.href.split("?")[1]);
    return obj.id;
  });
  const [detail, setDetail] = useState({});
  const getDetail = async (id) => {
    const data = await get({
      url: Api.expertInstitutionDetail,
      params: { id },
    });
    if (data.success) {
      setDetail(data.data);
    }
  };
  const confirmHandler = () => {
    actions.submit().then(async (value) => {
      console.log(value.values);
      let data = null;
      if (id) {
        data = await post({ url: Api.xxx, data: { ...value.values } });
      } else {
        data = await post({ url: Api.xxx, data: { ...value.values, id } });
      }
      if (!data) return;
      if (data.success) {
        message.success(id ? "修改成功" : "新增成功");
      } else {
        message.error(data.message);
      }
    });
  };
  const cancelHandler = () => {};
  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);
  return (
    <div className="detail-bg">
      <div className="detail-bg-content add-test">
        <SchemaForm actions={actions} initialValues={detail}>
          <Field
            {...formItemLayout}
            type="string"
            title="account"
            name="account"
            x-component="Input"
            x-component-props={{ placeholder: "请输入" }}
            x-rules={[{ required: true, message: "必填项" }]}
          />
          <Field
            name="test4"
            title="字段4"
            x-component="DatePicker"
            x-component-props={{
              placeholder: "请选择日期",
              allowClear: true,
              showTime: true,
            }}
          />
        </SchemaForm>
        <div className="app-buttons app-buttons-center">
          <Button
            className="app-button"
            type="primary"
            onClick={confirmHandler}
          >
            保存
          </Button>
          <Button className="app-button" onClick={cancelHandler}>
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}
