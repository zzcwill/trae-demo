import React from "react";
import { Button, Icon } from "dpl-react";
// import edit_icon from "./img/edit.png";
export default function BtnDelete(props) {
  const { onClick, className = "", style = {}, text = "删除问题" } = props;
  return (
    <Button onClick={onClick} className={className} style={style}>
      <Icon type="delete" />
      <span>{text}</span>
    </Button>
  );
}
