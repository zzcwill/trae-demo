import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { message, Button, Input, Form, Select } from "dpl-react";
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function Input_Number(props) {
  const { onChange, value } = props;

  // 修改判断是否为数字
  const numberChange = (e) => {
    const num = e.target.value;
    if (num && num.trim()) {
      const reg = /^\d*$/;
      if (reg.test(num)) {
        onChange(num);
      }
    } else {
      onChange(num);
    }
  };
  return (
    <Input
      onChange={numberChange}
      value={value}
      autocomplete="off"
      maxLength={20}
    ></Input>
  );
}
function Edit(props) {
  const { form, data, onCancel, id, typeList } = props;
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
  } = form;

  const [loading, setLoading] = useState(false); // loading

  /**
   * 电话号码展示逻辑
   */
  const TelephoneElemenet = () => {
    if (id === 0 || id) {
      return <span className="telephone-context">{data.telephone}</span>;
    } else {
      return <Input_Number />;
    }
  };

  /**
   * 保存
   */
  const save = () => {
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (id === 0 || id) {
          const param = {
            id,
            type: values.type,
          };
          updateExtension(param);
        } else {
          const param = {
            telephone: values.telephone.trim(),
            type: values.type,
          };
          saveExtension(param);
        }
      }
    });
  };

  /**
   * 新增黑名单
   */
  const saveExtension = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postSaveExtNumber,
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
    }
    setLoading(false);
  };

  /**
   * 更新黑名单
   */
  const updateExtension = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdateExtNumber,
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
    }
    setLoading(false);
  };

  /**
   * 手机号校验
   */
  const telephoneValidator = (rule, value, callback) => {
    if (value && value.trim()) {
      const reg = /^\d*$/;
      if (reg.test(value.trim())) {
        callback();
      } else {
        callback("电话号码不合法！");
      }
    } else {
      callback("电话号码不能为空！");
    }
  };
  return (
    <div className="black-list-edit">
      <Form>
        <FormItem label="电话号码" {...formItemLayout}>
          {getFieldDecorator("telephone", {
            rules: [
              { required: true, message: [] },
              {
                validator: telephoneValidator,
              },
            ],
            initialValue: data.telephone,
          })(TelephoneElemenet())}
        </FormItem>
        <FormItem label="电话类型" {...formItemLayout}>
          {getFieldDecorator("type", {
            rules: [{ required: true, message: "电话类型不能为空！" }],
            initialValue: data.type,
          })(
            <Select allowClear placeholder={"请选择电话类型"}>
              {typeList.length > 0 &&
                typeList.map((item) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          )}
        </FormItem>
      </Form>
      <div className="button-box">
        <Button
          type="primary"
          className="search-button"
          loading={loading}
          onClick={() => {
            save();
          }}
        >
          确定
        </Button>
        <div className="button-line-box"></div>
        <Button
          className="search-button"
          disabled={loading}
          onClick={() => {
            onCancel();
          }}
        >
          取消
        </Button>
      </div>
    </div>
  );
}
export default Form.create()(Edit);
