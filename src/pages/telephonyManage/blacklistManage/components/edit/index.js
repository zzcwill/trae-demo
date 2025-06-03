import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { message, Button, Row, Col, Input, Form } from "dpl-react";
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

function Input_Number(props) {
  const { onChange, value } = props;
  const [isComposition, setIsComposition] = useState(false);

  // 修改判断是否为数字
  const numberChange = (e, flag) => {
    let num = e.target.value;
    flag = typeof flag === "undefined" ? isComposition : flag;
    if (flag) {
      onChange(num);
      return;
    }
    if (num && num.trim()) {
      num = num.replace(/\D*/g,'')
      onChange(num);
    } else {
      onChange(num);
    }
  };
  /**
   * 中文输入时的调用方法
   */
  const compositionStartFunc = (e) => {
    setIsComposition(true);
  };

  /**
   * 中文输入时的调用方法
   */
  const compositionEndFunc = (e) => {
    setIsComposition(false);
    numberChange(e,false)
  };

  return (
    <Input
      onCompositionStart={compositionStartFunc}
      onCompositionEnd={compositionEndFunc}
      onChange={numberChange}
      value={value}
      autocomplete="off"
      maxLength={20}
    ></Input>
  );
}
function Edit(props) {
  const { form, data, onCancel, id } = props;
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    setFieldsValue,
    getFieldsValue,
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
   * 计算长度
   * @param {String} str
   */
  const sizeof = function (str) {
    let total = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      const charCode = str.charCodeAt(i);
      if (charCode <= 0x080) {
        total += 1;
      } else {
        total += 2;
      }
    }
    return total;
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
            reason: values.reason.trim(),
          };
          updateBlackList(param);
        } else {
          const param = {
            telephone: values.telephone.trim(),
            reason: values.reason.trim(),
          };
          saveBlackList(param);
        }
      }
    });
  };

  /**
   * 新增黑名单
   */
  const saveBlackList = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postSaveBlackList,
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
  const updateBlackList = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdateBlackList,
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
  /**
   * 上榜原因校验
   */
  const reasonValidator = (rule, value, callback) => {
    if (value && value.trim()) {
      const total = sizeof(value.trim());
      if (total <= 50) {
        callback();
      } else {
        callback("上榜原因必须在25个中文以内或者50个英文以内！");
      }
    } else {
      callback("上榜原因不能为空！");
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
        <FormItem label="上榜原因" {...formItemLayout}>
          {getFieldDecorator("reason", {
            rules: [
              { required: true, message: [] },
              {
                validator: reasonValidator,
              },
            ],
            initialValue: data.reason,
          })(
            <Input.TextArea
              placeholder="请输入上榜原因"
              autosize={{ minRows: 4, maxRows: 4 }}
              style={{ width: "100%" }}
              maxLength={50}
            />
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
