import React from "react";
import { Select } from "dpl-react";
const { Option } = Select;

/**
 * 默认的select中Option的配置
 */
const defaultOptionConfig = {
  value: "value",
  label: "label",
};
export default function SelectItem(props) {
  const {
    onChange,
    options,
    optionConfig,
    value,
    isShowTitle = false,
    allCode = "ALL",
    ...other
  } = props;
  const { mode } = other;
  const config = Object.assign({}, defaultOptionConfig, optionConfig); // select的选项配置
  const valueChange = (value) => {
    if (mode === "multiple") {
      let newValue = [].concat(value);
      const lastValue = value.slice(-1);
      const firstValue = value.slice(0, 1);
      if (lastValue[0] === allCode && value.length > 1) {
        newValue = lastValue;
      } else if (firstValue[0] === allCode && value.length > 1) {
        newValue = [];
        value.forEach((item) => {
          if (item !== allCode) {
            newValue.push(item);
          }
        });
      }
      onChange(newValue);
    } else {
      onChange(value);
    }
  };
  return (
    <Select onChange={valueChange} value={value} {...other}>
      {options.length > 0 &&
        options.map((option, index) => {
          if (isShowTitle) {
            return (
              <Option
                value={option[config.value]}
                key={option[config.value]}
                title={option[config.label]}
              >
                {option[config.label]}
              </Option>
            );
          }
          return (
            <Option value={option[config.value]} key={option[config.value]}>
              {option[config.label]}
            </Option>
          );
        })}
    </Select>
  );
}
