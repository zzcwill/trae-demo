import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Form, Row, Col, Radio, Select } from "dpl-react";
import SelectAll from "@/components/common/selectAll";
import { taxType, modalType } from "../../config";
const FormItem = Form.Item;
// 布局
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

function SpecialSetting(props) {
  const {
    form,
    type,
    loading,
    data = {},
    labelType = "",
    currentLabelType,
    locationList = [],
    consultServiceList = [],
    isValidate,
    callBack,
  } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;

  const validateFieldsFunc = () => {
    validateFields(async (err, values) => {
      if (!err) {
        let sendData = {
          taxType: values.taxType || undefined,
        };
        // 新增的时候，多选，并且接收数组，修改的时候只接收字符串，所以特殊处理
        if (type === modalType.add.type) {
          sendData.locationList = values.location;
          sendData.consultServiceList = values.consultService;
        } else {
          sendData.location = values.location;
          sendData.consultService = values.consultService;
        }
        callBack && callBack(true, sendData);
      } else {
        callBack && callBack(false, null);
      }
    });
  };

  const getDisabled = () => {
    return currentLabelType !== labelType ||
    loading
  }

  useEffect(() => {
    if (isValidate && isValidate.type === labelType) {
      validateFieldsFunc();
    }
  }, [isValidate]);

  useEffect(() => {
    if (currentLabelType !== labelType) {
      resetFields();
    }
  }, [currentLabelType]);

  return (
    <div className="vip-special-setting-box">
      <Form>
        <Row>
          <Col span={12}>
            <FormItem {...formItemLayout} label="适用地区">
              {getFieldDecorator("location", {
                initialValue: data.location,
                rules: [{ required: true, message: "请选择使用地区" }],
              })(
                <SelectAll
                  options={locationList}
                  isShowTitle
                  allowClear
                  placeholder="请选择适用地区"
                  showSearch
                  mode={type === modalType.add.type ? "multiple" : undefined}
                  optionFilterProp="children"
                  disabled={
                    type === modalType.edit.type ||
                    currentLabelType !== labelType ||
                    loading
                  }
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="咨询产品类型">
              {getFieldDecorator("consultService", {
                initialValue: data.consultService,
              })(
                <Select
                  allowClear
                  placeholder="请选择咨询产品类型"
                  showSearch
                  optionFilterProp="children"
                  mode={type === modalType.add.type ? "multiple" : undefined}
                  maxTagCount="2"
                  disabled={getDisabled()}
                >
                  {Array.isArray(consultServiceList) &&
                    consultServiceList.map((item) => {
                      return (
                        <Select.Option key={item.value} value={item.value}>
                          {item.label}
                        </Select.Option>
                      );
                    })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="国地类型">
              {getFieldDecorator("taxType", {
                initialValue: data.taxType,
              })(
                <Radio.Group
                  disabled={currentLabelType !== labelType || loading}
                >
                  {taxType.map((item) => {
                    return (
                      <Radio key={item.value} value={item.value}>
                        {item.label}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Form.create()(React.forwardRef(SpecialSetting));
