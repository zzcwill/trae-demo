import React, { useState, useEffect, useImperativeHandle } from "react";
import "./index.scss";
import {
  Input,
  Select,
  Col,
} from "dpl-react";
const unallowClearSelectRender = (item, children, onChange, value) => {
  return (
    <Select placeholder={item.placeholder} onChange={onChange} value={value}>
      {children}
    </Select>
  );
};

const inputComponnentsRender = (item, onChange, value) => {
  return (
    <Input
      placeholder={item.placeholder}
      maxLength={item.inputMaxLength}
      onChange={onChange}
      allowClear
      value={value}
    />
  );
};

export default function CorrectSeaarch(props) {
  const {
    value = {
      correctReason: "all",
      keyword: undefined
    },
    onChange,
    selectChildren,
    item
  } = props;
  const selectChange = data => {
    onChange({ correctReason: data, keyword: value.keyword });
  };
  const inputChange = data => {
    onChange({
      correctReason: value.correctReason,
      keyword: data.target.value
    });
  };
  return (
    <div className="group-select-input">
      <Col span={item.col}>
        {unallowClearSelectRender(
          Object.assign({}, { ...item }, { placeholder: "请选择纠错类型" }),
          selectChildren,
          selectChange,
          value.correctReason
        )}
      </Col>
      <Col span={24 - item.col}>
        {inputComponnentsRender(
          Object.assign({}, { ...item }, { placeholder: "输入纠错内容关键字" }),
          inputChange,
          value.keyword
        )}
      </Col>
    </div>
  );
}
