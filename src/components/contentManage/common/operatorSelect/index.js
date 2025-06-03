import React, { useState, useEffect, useImperativeHandle } from "react";
import "./index.scss";
import SelectRender from "../selectRender";
import MultipleSelectRender from "../multipleSelectRender";

export default function OperatorSelect(props) {
  const {
    value = {
      type: undefined,
      value: undefined
    },
    onChange,
    selectChildren,
    multipleChildren,
    item,
    onSearch
  } = props;
  const typeChange = data => {
    onChange({ type: data, value: data === undefined ? [] : value.value });
  };
  const selectChange = data => {
    if (data.length > item.maxLength) return;
    onChange({ type: value.type, value: data });
  };
  return (
    <div className="group-select">
      <SelectRender
        item={{ ...item, placeholder: "请选择操作人类型" }}
        children={selectChildren}
        onChange={typeChange}
        value={value.type}
      />
      <MultipleSelectRender
        item={item}
        children={multipleChildren}
        useFilter={false}
        onSearch={onSearch}
        onChange={selectChange}
        value={value.value}
        disabled={!!!value.type}
      />
    </div>
  );
}
