import React, { useState, useEffect } from "react";
import "./index.scss";
import classnames from "classnames";
import { Icon } from "dpl-react";
import { sceneOfficialList } from "@/const/config";
/**
 * 获取2qa
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

function OfficialServiceCard(props, ref) {
  const {
    value,
    className,
    isShowDelete,
    onDelete,
    index,
    disabled,
    isShowConsult,
    imageUrl,
    serviceTypeMap,
    draggable = false,
    showDescription = true, // 展示描述
    showName = false, // 展示名称
    showBrand = false, // 展示维度
  } = props;
  const officialServiceCardClassNames = () => {
    return classnames({
      "official-service-card-box": true,
      className,
    });
  };
  const deleteClassNames = () => {
    return classnames({
      icon: true,
      disabled: disabled,
    });
  };
  const sceneTypeClass = (scene) => {
    return classnames({
      "card-scene-type": true,
      [`card-scene-${scene}`]: true,
    });
  };

  const cardContentBoxClassNames = classnames({
    "card-content-box": true,
    "card-content-no-description": !showDescription,
  });

  return (
    <div
      className={officialServiceCardClassNames()}
      ref={ref}
      draggable={draggable}
    >
      <div className="card-box" draggable={false}>
        {value.type && (
          <div className="card-type-box">
            {serviceTypeMap[value.type] && serviceTypeMap[value.type].name}
          </div>
        )}
        {value.scene && (
          <div className={sceneTypeClass(value.scene)}>
            {getSceneType(value.scene)}
          </div>
        )}
        <div className="card-img-box">
          <img src={imageUrl} draggable={false} />
        </div>
        <div className={cardContentBoxClassNames}>
          {showDescription && (
            <div
              className="card-description"
              dangerouslySetInnerHTML={{ __html: value.description }}
            ></div>
          )}
          {showName && (
            <div className="card-item">
              <span className="label">官方服务名称</span>
              <span className="context">{value.name}</span>
            </div>
          )}
          {showBrand && (
            <div className="card-item">
              <span className="label">产品维度</span>
              <span className="context">{value.brandName}</span>
            </div>
          )}
        </div>
      </div>
      {isShowConsult && (
        <div className="card-goto-consult" draggable={false}>
          <span>开始咨询</span>
        </div>
      )}
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
export default React.forwardRef(OfficialServiceCard);
