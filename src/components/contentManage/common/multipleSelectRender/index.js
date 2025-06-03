import React, { useState, useEffect, useImperativeHandle } from "react";
import {
  Select,
} from "dpl-react";

export default function MultipleSelectRender(props) {
  const {
    item,
    children,
    useFilter,
    onSearch,
    onChange,
    value,
    disabled = false
  } = props;
  const filterOption = (value, option) => {
    if (option.props.children && option.props.children.indexOf(value) >= 0) {
      return true;
    }
    return false;
  };
  return (
    <Select
      mode="multiple"
      onChange={onChange}
      placeholder={item.placeholder}
      filterOption={useFilter ? filterOption : false}
      onSearch={onSearch}
      maxTagCount={3}
      maxLength={item.maxLength}
      value={value}
      disabled={disabled}
    >
      {children}
    </Select>
  );
}
