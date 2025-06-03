import React from "react";
import "./index.scss";
import { Icon } from "dpl-react";
const borderTypeMap = {
  dashed: "dashed",
  solid: "solid",
};
const defaultWidth = "100%";
export default function AddBox(props) {
  const {
    context,
    borderType = borderTypeMap.dashed,
    width = defaultWidth,
    onClick,
  } = props;
  return (
    <div
      className="add-box"
      style={{ borderStyle: borderType, width }}
      onClick={onClick}
    >
      <Icon type="plus" />
      <div className="content-line"></div>
      <span>{context}</span>
    </div>
  );
}
