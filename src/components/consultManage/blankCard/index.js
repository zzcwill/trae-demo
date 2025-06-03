import React, { useState, useEffect } from "react";
import "./index.scss";
import classnames from "classnames";
import { Icon } from "dpl-react";

function BlankCard(props, ref) {
  const {
    className,
    context,
    onClick,
    disabled,
    width = 280,
    height = 388,
    text = '新增服务'
  } = props;
  const officalServiceCardClassNames = () => {
    return classnames({
      "blank-card-box": true,
      "blank-card-disabled": disabled,
      className,
    });
  };
  const clickHandle = (e) => {
    if (disabled) {
      return;
    }
    onClick && onClick(e);
  };
  return (
    <div
      className={officalServiceCardClassNames()}
      ref={ref}
      style={{ width: `${width}px`, height: `${height}px` }}
      onClick={clickHandle}
      draggable={false}
    >
      {context && context()}
      {!context && (
        <div className="blank-card-content">
          <Icon type="plus" />
          <div className="content-line"></div>
          <span>{text}</span>
        </div>
      )}
    </div>
  );
}
export default React.forwardRef(BlankCard);
