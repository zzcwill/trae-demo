import React, { useState, useEffect, useImperativeHandle } from "react";
import "./index.scss";
import { Col } from "dpl-react";
import { bindingCreator } from "../binding/index";
import debounce from "lodash/debounce";
import Config from "./config";
import getValidateTriggers from "./utils";

const defaultConfig = {
  type: null, // string 组件类型 必填
  span: null, // number Col 的span值 非必填 默认为 8
  offset: null, // number Col 的offset值 非必填 默认为 0
  key: null, // string 字段名称 必填
  label: null, // string label名称 非必填 默认为空
  labelWidth: null, // number label的width值 非必填 默认为100
  rules: null, // array 校验规则 非必填 会对应解析数组中的对象，然后将该数组对象处理成一个对象
  initialValue: null, // any 默认值 该情况
  onChange: null, // 改变时的回调
  other: {}, // 其他输入栏目中的内容
};

function FormFilter(props, ref) {
  const {
    config = [],
    binder,
    defaultValue = {},
    labelWidth = "100px",
    selfComponents = {},
  } = props;
  const { getBindDecorator, getData, clearData, validateData } = binder;
  const [validateDataMap, setValidateDataMap] = useState({}); // 校验数据
  const componentsConfig = {
    ...Config,
    ...selfComponents,
  }; // 组件列表，除了公共组件统一提供以外，其他的组件自行传入
  const RenderFunc = (item) => {
    const Element = componentsConfig[item.type];
    if (Element) {
      return <Element other={item.other} {...item}></Element>;
    } else {
      return null;
    }
  };

  /**
   * 是否必填
   * @param {Array} rules
   */
  const ruleItem = (rules = [], key) => {
    const rule = getValidateTriggers(rules);
    return rule[key] || false;
  };

  useImperativeHandle(ref, () => {
    return {
      getData,
      clearData,
      validateData,
    };
  });

  const validateDataChange = async (key, flag) => {
    // console.log(validateDataMap)
    setValidateDataMap(
      Object.assign({}, validateDataMap, {
        [key]: flag,
      })
    );
  };

  useEffect(() => {}, []);
  return (
    <div className="callcenter-form-filter">
      {config.map((item) => {
        return (
          <Col span={item.span || 8} offset={item.offset || 0} key={item.key}>
            <div className="form-filter-item">
              {item.label && (
                <div
                  className={`label ${
                    ruleItem(item.rules, "required")
                      ? "form-filter-required"
                      : ""
                  }`}
                  style={{ width: item.labelWidth || labelWidth }}
                >
                  {item.label}&nbsp;:&nbsp;
                </div>
              )}
              <div
                className={`components-box ${
                  validateDataMap[item.key] === "N" ? "has-error" : ""
                }`}
              >
                {getBindDecorator(
                  item.key,
                  item.initialValue || defaultValue[item.key],
                  item.rules,
                  validateDataChange
                )(RenderFunc(item))}
                {validateDataMap[item.key] === "N" && (
                  <div className="error-message">
                    {ruleItem(item.rules, "message")}
                  </div>
                )}
              </div>
            </div>
          </Col>
        );
      })}
    </div>
  );
}

export default bindingCreator(React.forwardRef(FormFilter));
