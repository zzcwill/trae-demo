import React from "react";
import { Select } from "dpl-react";
const { Option } = Select;

/**
 * 默认的select中Option的配置
 */
const defaultOptionConfig = {
  value: "id",
  labal: "name",
};
export default function SelectItem(props) {
  const {
    other,
    onChange,
    options,
    optionConfig,
    value,
    isShowTitle = false,
  } = props;
  const { mode } = other;
  const config = Object.assign({}, defaultOptionConfig, optionConfig); // select的选项配置

  const valueChange = (value) => {
    if (mode === "multiple") {
      let newValue = [].concat(value);
      const lastValue = value.slice(-1);
      const firstValue = value.slice(0, 1);
      if (lastValue[0] === "all" && value.length > 1) {
        newValue = lastValue;
      } else if (firstValue[0] === "all" && value.length > 1) {
        newValue = [];
        value.forEach((item) => {
          if (item !== "all") {
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
    <Select {...other} onChange={valueChange} value={value}>
      {options.length > 0 &&
        options.map((option, index) => {
          if (isShowTitle) {
            return (
              <Option
                value={option[config.value]}
                key={option[config.value]}
                title={option[config.labal]}
              >
                {option[config.labal]}
              </Option>
            );
          }
          return (
            <Option value={option[config.value]} key={option[config.value]}>
              {option[config.labal]}
            </Option>
          );
        })}
    </Select>
  );
}
