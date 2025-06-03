import React from "react";
import {
  Cascader,
} from "dpl-react";

export default function ClassifyTree(props) {
  const { item, onChange, value, options, changeOnSelect } = props;
  return (
    <Cascader
      value={value}
      options={options}
      onChange={onChange}
      placeholder={item.placeholder}
      changeOnSelect={changeOnSelect}
    />
  );
}
