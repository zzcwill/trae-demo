import React, { useState, useEffect } from "react";
import "./index.scss";
import { Input, Button, message, Form, Select } from "dpl-react";
import { editTypeEnum } from "../../config";
import { post, get } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
const FormItem = Form.Item;
const Option = Select.Option;
const oneFormItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
function EntranceEditModal(props, ref) {
  const { config, areaList = [], onCancel, form, formData = {} } = props;
  const { getFieldDecorator, validateFields, setFieldsValue } = form;
  const [loading, setLoading] = useState(false); // loading
  const [landingPageList, setLandingPageList] = useState([]); // 落地页列表

  /**
   * 获取落地页列表
   */
  const getLandingPageList = async () => {
    const res = await get({
      url: Api.getLandingPageList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      setLandingPageList(data);
    } else {
      message.error(res.message);
    }
  };

  const formatData = (data) => {
    return {
      name: (data.name && data.name.trim()) || undefined,
      locationList: data.locationList,
      landingPageId: data.landingPageId,
    };
  };
  // 保存
  const save = () => {
    form.validateFields((err, values) => {
      if (!err) {
        switch (config.type) {
          case editTypeEnum.edit:
            let result = formatData(values);
            result.id = formData.id;
            update(result);
            break;
          case editTypeEnum.add:
            add(formatData(values));
            break;
          default:
            break;
        }
      }
    });
  };

  const update = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdateConsultEntrance,
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
      message.error("系统出错请联系管理员！");
    }
    setLoading(false);
  };

  const add = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postSaveConsultEntrance,
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
      message.error("系统出错请联系管理员！");
    }
    setLoading(false);
  };

  const validatorInput = (message, rule, value, callback) => {
    if (!value || !value.trim()) {
      callback(message);
    }
    callback();
  };

  useEffect(() => {
    getLandingPageList();
  }, []);

  return (
    <div className="entrance-edit-modal-box" ref={ref}>
      <div className="entrance-edit-modal-title">
        <span>如果为同一渠道同一按钮，请保持名称一致</span>
      </div>
      <Form>
        <FormItem label="渠道名称" {...oneFormItemLayout}>
          {getFieldDecorator("name", {
            rules: [
              { required: true, message: [] },
              {
                validator: (rule, value, callback) => {
                  validatorInput("请输入渠道名称", rule, value, callback);
                },
              },
            ],
            initialValue: formData.name,
          })(
            <Input
              disabled={loading}
              autocomplete="off"
              maxLength={20}
              placeholder="请输入渠道名称"
            ></Input>
          )}
        </FormItem>
        <FormItem label="地区" {...oneFormItemLayout}>
          {getFieldDecorator("locationList", {
            rules: [{ required: true, message: "请选择地区" }],
            initialValue: formData.locationList,
          })(
            <Select
              placeholder="请选择地区"
              disabled={loading}
              showSearch={true}
              optionFilterProp="children"
              mode="multiple"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {areaList.map((item, index) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          )}
        </FormItem>
        <FormItem label="落地页" {...oneFormItemLayout}>
          {getFieldDecorator("landingPageId", {
            rules: [{ required: true, message: "请选择落地页" }],
            initialValue: formData.landingPageId,
          })(
            <Select
              placeholder="请选择落地页"
              disabled={loading}
              showSearch={true}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {landingPageList.map((item, index) => {
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
          className="button-item"
          loading={loading}
          onClick={() => {
            save();
          }}
        >
          保存
        </Button>
        <div className="line-box"></div>
        <Button
          className="button-item"
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

export default Form.create()(React.forwardRef(EntranceEditModal));
