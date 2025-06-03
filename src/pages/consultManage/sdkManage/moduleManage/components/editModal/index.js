import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { Form, Input, DatePicker, message, Button } from "dpl-react";
import { modalType } from "../../config";
const FormItem = Form.Item;
// 布局
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
function EditModal(props) {
  const { form, data = {}, type, onCancel } = props;
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const [loading, setLoading] = useState(false); // loading

  /**
   * 保存点击
   */
  const confirmHandler = () => {
    validateFields((err, values) => {
      if (!err) {
        // 没有选中配置类型
        let sendData = {
          moduleCode: values.moduleCode && values.moduleCode.trim(),
          moduleName: values.moduleName && values.moduleName.trim(),
          description: values.description && values.description.trim(),
        };
        if (type === modalType.add.type) {
          sendData.systemId = data.systemId;
          add(sendData);
        }
        if(type === modalType.copy.type){
          sendData.systemId = data.systemId;
          sendData.moduleId = data.id;
          copy(sendData)
        }
        if (type === modalType.edit.type) {
          sendData.id = data.id;
          update(sendData);
        }
      }
    });
  };

  /**
   * 新增
   */
  const add = async (data) => {
    try {
      setLoading(true);
      const res = await post({
        url: Api.postSaveModule,
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
   * 复制
   */
  const copy = async (data) => {
    try {
      setLoading(true);
      const res = await post({
        url: Api.postCopyModule,
        data,
      });
      if (res.success) {
        message.success("复制成功！");
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
        url: Api.postUpdateModule,
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
    onCancel && onCancel(flag);
  };
  return (
    <div className="module-edit-box">
      <Form>
        <FormItem {...formItemLayout} label="模块代码">
          {getFieldDecorator("moduleCode", {
            initialValue: data.moduleCode,
            rules: [
              { required: true, message: "请输入模块代码", whitespace: true },
            ],
          })(
            <Input
              allowClear
              maxLength="20"
              disabled={loading}
              autoComplete='off'
              placeholder="请输入模块代码，如yqdz_customer（最多20字）"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="模块名称">
          {getFieldDecorator("moduleName", {
            initialValue: data.moduleName,
            rules: [
              { required: true, message: "请输入模块名称", whitespace: true },
            ],
          })(
            <Input
              allowClear
              maxLength="20"
              disabled={loading}
              autoComplete='off'
              placeholder="请输入模块名称，如客户（最多20字）"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator("description", {
            initialValue: data.description,
          })(
            <Input.TextArea
              allowClear
              maxLength="200"
              placeholder="请输入备注（最多200字）"
              showTextCount={true}
              disabled={loading}
            />
          )}
        </FormItem>
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
