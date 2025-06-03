import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { Form, Input, DatePicker, message, Button, Select } from "dpl-react";
import { modalType } from "../../config";
import StyleSelect from "../styleSelect";
import SelectAll from "@/components/common/selectAll";
const FormItem = Form.Item;
const allCode = "all";
// 布局
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
function EditModal(props) {
  const {
    form,
    data = {},
    type,
    onCancel,
    locationList = [],
    styleList = [],
  } = props;
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
          style: values.style,
          location: values.location && values.location.join(","),
          description: values.description && values.description.trim(),
        };
        if (sendData.location === allCode) {
          sendData.location = "";
        }
        if (type === modalType.add.type) {
          sendData.moduleId = data.moduleId && parseInt(data.moduleId);
          add(sendData);
        }
        if (type === modalType.copy.type) {
          sendData.moduleId = data.moduleId && parseInt(data.moduleId);
          sendData.oldId = data.oldId;
          copy(sendData);
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
        url: Api.postSaveLocation,
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
        url: Api.postCopyLocation,
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
        url: Api.postUpdateLocation,
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
        <FormItem {...formItemLayout} label="适用地区">
          {getFieldDecorator("location", {
            initialValue:
              type === modalType.copy.type || type === modalType.add.type
                ? undefined
                : (data.location && data.location.split(",")) || [allCode],
            rules: [{ required: true, message: "请选择适用地区" }],
          })(
            <SelectAll
              options={locationList}
              optionConfig={{ value: "id", label: "name" }}
              isShowTitle
              allowClear
              placeholder="请选择适用地区，支持多选"
              showSearch
              allCode={allCode}
              mode="multiple"
              optionFilterProp="children"
              disabled={loading}
              className="search-select-location"
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="按钮样式">
          {getFieldDecorator("style", {
            initialValue: data.style,
            rules: [{ required: true, message: "请选择按钮样式" }],
          })(<StyleSelect options={styleList} disabled={loading} />)}
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
