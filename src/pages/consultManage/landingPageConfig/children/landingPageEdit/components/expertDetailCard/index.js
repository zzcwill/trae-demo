import React, { useState, useEffect } from "react";
import "./index.scss";
import ExpertCard from "@/components/consultManage/expertCard";
import { Icon } from "dpl-react";
import classnames from "classnames";

export default function ExpertDetailCard(props) {
  const { value, isShowDelete, onDelete, disabled, index } = props;
  const deleteClassNames = () => {
    return classnames({
      icon: true,
      disabled: disabled,
    });
  };
  return (
    <div className="expert-card-item-box">
      <ExpertCard data={value} />
      {isShowDelete && (
        <div className="right-up-box" draggable={false}>
          <Icon
            type="circle-error-o"
            className={deleteClassNames()}
            onClick={() => {
              onDelete(value, index);
            }}
          />
        </div>
      )}
    </div>
  );
}
