import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  Button,
  message,
  Form,
  Col,
  Row,
  Select,
  InputNumber,
} from "dpl-react";
import Api from "@/request/api-olhelpmanage.js";
import { get, post } from "@/request/request";
import { addAllOption } from "@/utils";
import SelectAll from "../selectAll";
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const oneFormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const addProps = (type) => {
  if (type === "add") {
    return {
      mode: "multiple",
      maxTagCount: 1,
      maxTagTextLength: 10,
      allowClear: true,
      showSearch: true,
      optionFilterProp: "children",
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    };
  } else {
    return {};
  }
};
// string转化成number，以及额外判断，用户初始数值
const stringToNum = (str) => {
  const data = Number(str)
  if (typeof data === "number") {
    if(data >= 0 && data <= 1){
      return data
    }else{
      return undefined
    }
  }
  return undefined;
};
function EditModal(props, ref) {
  const {
    className = "",
    form,
    location,
    brand,
    formData = {},
    config,
    onCancel,
  } = props;
  const { getFieldDecorator, validateFields } = form;
  const [loading, setLoading] = useState(false);
  const [locationList, setLocationList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [formObj, setFormObj] = useState({
    locationList: [],
    brandList: [],
  }); // 表单数据
  useEffect(() => {
    setLocationList([].concat(location));
  }, [location]);

  useEffect(() => {
    setBrandList([].concat(brand));
  }, [brand]);

  /**
   * 地区和产品修改
   */
  const valueChange = (type, value, list, setList, sourceList) => {
    if (value && value[0] === "all") {
      if (list[0].id === "all") {
        list.shift();
        setList([].concat(list));
      }
    } else if (value.length > 0) {
      if (list[0].id !== "all") {
        setList([].concat(sourceList));
      }
    } else {
      if (type === "locationList" && formObj.brandList[0] !== "all") {
        addAllToList();
      }
      if (type === "brandList" && formObj.locationList[0] !== "all") {
        addAllToList();
      }
    }
    setFormObj(
      Object.assign({}, formObj, {
        [type]: value,
      })
    );
  };

  /**
   * 给列表添加全部
   */
  const addAllToList = () => {
    if (brandList[0].id !== "all") {
      setBrandList([].concat(brand));
    }
    if (locationList[0].id !== "all") {
      setLocationList([].concat(location));
    }
  };

  /**
   * 保存
   */
  const save = () => {
    form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        let sendData = Object.assign({}, values);
        if (config.type === "edit") {
          updateManualInteractConfig({
            id: config.data.id,
            autoAnswerThreshold: sendData.autoAnswerThreshold,
          });
        } else {
          sendData.brandList =
            sendData.brandList[0] === "all" ? undefined : sendData.brandList;
          sendData.locationList =
            sendData.locationList[0] === "all"
              ? undefined
              : sendData.locationList;
          addManualInteractConfig(sendData);
        }
      }
    });
  };

  /**
   * 新增
   */
  const addManualInteractConfig = async (data) => {
    try {
      const res = await post({
        url: Api.postAddManualInteractConfig,
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
   * 修改
   */
  const updateManualInteractConfig = async (data) => {
    try {
      const res = await post({
        url: Api.postUpdateManualInteractConfig,
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

  return (
    <div className="manual-interact-modal-box">
      <Form>
        <div className="manual-interact-modal-label">条件设置</div>
        <Row>
          <Col span={11}>
            <FormItem label="地区" {...formItemLayout}>
              {getFieldDecorator("locationList", {
                rules: [{ required: true, message: "请选择地区" }],
                initialValue: formData.locationList,
              })(
                <SelectAll
                  options={locationList}
                  onChange={(value) => {
                    valueChange(
                      "locationList",
                      value,
                      brandList,
                      setBrandList,
                      brand
                    );
                  }}
                  other={Object.assign(
                    {
                      disabled: config.type === "edit" || loading,
                      placeholder: "请选择地区",
                    },
                    addProps(config.type)
                  )}
                ></SelectAll>
              )}
            </FormItem>
          </Col>
          <Col span={11} offset={1}>
            <FormItem label="产品维度" {...formItemLayout}>
              {getFieldDecorator("brandList", {
                rules: [{ required: true, message: "请选择产品维度" }],
                initialValue: formData.brandList,
              })(
                <SelectAll
                  options={brandList}
                  onChange={(value) => {
                    valueChange(
                      "brandList",
                      value,
                      locationList,
                      setLocationList,
                      location
                    );
                  }}
                  other={Object.assign(
                    {
                      disabled: config.type === "edit" || loading,
                      placeholder: "请选择产品维度",
                    },
                    addProps(config.type)
                  )}
                ></SelectAll>
              )}
            </FormItem>
          </Col>
        </Row>
        <div className="manual-interact-modal-label">参数设置</div>
        <Row>
          <FormItem label="自动解答阈值" {...oneFormItemLayout}>
            {getFieldDecorator("autoAnswerThreshold", {
              rules: [{ required: true, message: "请输入自动解答阈值" }],
              initialValue:stringToNum(formData.autoAnswerThreshold)
            })(
              <InputNumber
                min={0}
                max={1}
                precision={3}
                step={0.001}
                inputWidth={100}
                disabled={loading}
              />
            )}
          </FormItem>
        </Row>
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
export default Form.create()(React.forwardRef(EditModal));
