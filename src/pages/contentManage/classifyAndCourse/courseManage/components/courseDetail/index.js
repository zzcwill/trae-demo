import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import openSwipe from "@/utils/photoSwipe/index";

export default function CourseDetail(props) {
  const { detail } = props;
  const clickLink = link => {
    window.open(link);
  };
  return (
    <div className="course-detail-box">
      <div className="detail-item">
        <div className="detail-item-title detail-required">课程名称：</div>
        <div className="detail-item-text">{detail.name}</div>
      </div>
      <div className="detail-item">
        <div className="detail-item-title detail-required">讲师姓名：</div>
        <div className="detail-item-text">{detail.teacherName}</div>
      </div>
      <div className="detail-item">
        <div className="detail-item-title detail-required">课程图片：</div>
        <div className="detail-item-text">
          <img
            src={detail.imageUrl}
            className="image-box"
            onClick={() => {
              openSwipe(
                [].concat({
                  imageUrl: detail.imageUrl,
                  name: "课程图片"
                }),
                0
              );
            }}
          />
        </div>
      </div>
      <div className="detail-item">
        <div className="detail-item-title detail-required">课程链接：</div>
        <div
          className="detail-item-text edit-link"
          onClick={() => {
            clickLink(detail.courseUrl);
          }}
        >
          {detail.courseUrl}
        </div>
      </div>
      <div className="detail-item">
        <div className="detail-item-title ">引导话术：</div>
        <div className="detail-item-text">{detail.guideSpeech}</div>
      </div>
    </div>
  );
}
