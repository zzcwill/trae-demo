import React from "react";
import "./index.scss";
import { Tag } from "dpl-react";

export default function cardLabel(props) {
  const {
    className = "",
    style = {},
    labels = [],
    mapName = "name",
    regionLabel = null,
    gradeLabel = null,
    professionLabel = null,
    onRegionClick = () => {},
    onLabelClick = () => {}
  } = props;

  return (
    <div className={`card-label ${className}`} style={style}>
      <div className='label-box'>
      {regionLabel && regionLabel.name && (
        <div className="label-item">
          <span>区域：</span>
          <span>{regionLabel.name}</span>
        </div>
      )}
      {professionLabel && professionLabel.name && (
        <div className="label-item">
          <span>行业：</span>
          <span>{professionLabel.name}</span>
        </div>
      )}

      {gradeLabel && gradeLabel.name && (
        <div className="label-item">
          <span>问题分级：</span>
          <span>{gradeLabel.name}</span>
        </div>
      )}
      </div>

      {/* {labels.map((item, index) => {
        return (<Tag className="label" key={index} onClick={() => {
          onLabelClick(item)
        }}>{item[mapName]}</Tag>)
      })} */}
    </div>
  );
}
