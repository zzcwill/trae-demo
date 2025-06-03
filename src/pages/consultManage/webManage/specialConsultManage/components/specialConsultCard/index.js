import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import classnames from "classnames";
import { sceneOfficialList } from "@/const/config";
import { Checkbox, Icon } from "dpl-react";
import DeleteSvg from "../deleteSvg";
/**
 * 获取场景类型
 * @param {string} target
 */
function getSceneType(target) {
  let value = "";
  sceneOfficialList.forEach((item) => {
    if (item.id === target) {
      value = item.name;
    }
  });
  return value;
}

function SpecialConsultCard(props) {
  const { data = {}, checked, onDelete, onEdit, onCheck } = props;
  // 场景类型展示
  const sceneTypeClass = (scene) => {
    return classnames({
      "special-consult-scene-type": true,
      [`special-consult-scene-${scene}`]: true,
    });
  };
  return (
    <div className="special-consult-card">
      <div className="card-cover-image">
        {data.coverImageUrl && <img src={data.coverImageUrl} />}
        {data.scene && (
          <div className={sceneTypeClass(data.scene)}>
            {getSceneType(data.scene)}
          </div>
        )}
      </div>
      <div className="card-header">
        <span title={data.name} className="text">
          {data.name}
        </span>
      </div>
      <div className="card-message">
        {data.descriptionImageUrl && <img src={data.descriptionImageUrl} />}
      </div>
      <div className="btn-group">
        <Checkbox
          checked={checked}
          onChange={(e) => {
            onCheck(e.target.checked);
          }}
          className="card-option-item select"
        >
          选中
        </Checkbox>
        <div className="line"></div>
        <div className="card-option-item edit" onClick={onEdit}>
          <Icon type="pen-o" />
          <div className="text-line"></div>
          <span>编辑</span>
        </div>
        <div className="line"></div>
        <div className="card-option-item delete" onClick={onDelete}>
          <DeleteSvg />
          <div className="text-line"></div>
          <span>删除</span>
        </div>
      </div>
    </div>
  );
}

export default SpecialConsultCard;
