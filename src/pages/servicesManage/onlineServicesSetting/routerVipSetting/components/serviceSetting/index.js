import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Form, Row, Col, Select, Input } from "dpl-react";
import SelectAll from "@/components/common/selectAll";
import { modalType } from "../../config";
const FormItem = Form.Item;
// 布局
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
function ServiceSetting(props) {
  const {
    form,
    type,
    loading,
    data = {},
    isValidate,
    callBack,
    currentLabelType,
    labelType = "",
    locationList = [],
    consultServiceList = [],
    channelList = [],
    serviceList = [],
  } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;

  const validateFieldsFunc = () => {
    validateFields(async (err, values) => {
      if (!err) {
        let sendData = {
          module: values.module,
        };
        // 新增的时候，多选，并且接收数组，修改的时候只接收字符串，
        if (type === modalType.add.type) {
          sendData.locationList = values.location;
          sendData.channelList = values.channel;
          sendData.consultServiceList = values.consultService;
          sendData.serviceEmpowerList = values.serviceEmpower;
        } else {
          sendData.location = values.location;
          sendData.channel = values.channel;
          sendData.consultService = values.consultService;
          sendData.serviceEmpower = values.serviceEmpower;
        }
        callBack && callBack(true, sendData);
      } else {
        callBack && callBack(false, null);
      }
    });
  };

  const getDisabled = () => {
    return currentLabelType !== labelType || loading
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
    <div className="vip-service-setting-box">
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
                  mode={type === modalType.add.type ? "multiple" : undefined}
                  showSearch
                  maxTagCount="2"
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
            <FormItem {...formItemLayout} label="适用渠道">
              {getFieldDecorator("channel", {
                initialValue: data.channel,
              })(
                <Select
                  allowClear
                  placeholder="请选择适用渠道"
                  showSearch
                  mode={type === modalType.add.type ? "multiple" : undefined}
                  maxTagCount="2"
                  optionFilterProp="children"
                  disabled={type === modalType.edit.type ||
                    currentLabelType !== labelType ||
                    loading}
                >
                  {Array.isArray(channelList) &&
                    channelList.map((item) => {
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
            <FormItem {...formItemLayout} label="模块">
              {getFieldDecorator("module", {
                initialValue: data.module,
              })(
                <Input
                  placeholder="请输入模块"
                  maxLength="20"
                  autoComplete="off"
                  disabled={getDisabled()}
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem {...formItemLayout} label="服务构建">
              {getFieldDecorator("serviceEmpower", {
                initialValue: data.serviceEmpower,
              })(
                <Select
                  allowClear
                  placeholder="请选择服务构建"
                  showSearch
                  maxTagCount="2"
                  mode={type === modalType.add.type ? "multiple" : undefined}
                  optionFilterProp="children"
                  disabled={getDisabled()}
                >
                  {Array.isArray(serviceList) &&
                    serviceList.map((item) => {
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
        </Row>
      </Form>
    </div>
  );
}

export default Form.create()(React.forwardRef(ServiceSetting));
