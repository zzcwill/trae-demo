import React, { useState, useEffect, useImperativeHandle } from "react";
import {
  Select,
} from "dpl-react";
export default function SelectRender(props) {
  const { item, children, onChange, value } = props;
  return (
    <Select
      allowClear={item.allowClear !== undefined ? item.allowClear : true}
      placeholder={item.placeholder}
      onChange={onChange}
      value={value}
      disabled={item.disabled}
    >
      {children}
    </Select>
  );
}
