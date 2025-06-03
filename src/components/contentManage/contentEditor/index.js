import React from "react";
import "./index.scss";
import Ueditor from "@/components/common/ueditor";

function ContentEditor(props) {
  const initialValue = props["data-__meta"].initialValue;
  // console.log(props,initialValue)
  console.log(props);
  const { value, onChange } = props;
  // console.log(value)
  /**
   * 编辑内容修改
   */
  const onEditChange = value => {
    onChange(value);
  };

  return (
    <Ueditor
      onChange={value => {
        onEditChange(value);
      }}
      value={initialValue}
      height={206}
    />
  );
}
export default ContentEditor;
