import React, { useState, useEffect } from "react";
import "./index.scss";
import CardTitle from "@/components/common/card/cardTitle";
import CardTime from "@/components/common/card/cardTime";


export default function ProblemCard(props) {
  const { question, className = "" } = props;

  /**
   * 跳转到问答详情页
   * @param {Object} item
   */
  const gotoDetail = item => {
    let url =
      window.location.href.split("#")[0] +
      "#/contentManage/qaManage/taxLib/qaDetail?id=" +
      item.id;
    window.open(url);
  };

  return (
    <div className={`problem-card ${className}`}>
      <div className="question-box">
        <div className="left">
          <CardTitle
            title={question.resume}
            className="title"
            onClick={() => {
              gotoDetail(question);
            }}
          />
        </div>
        <div className="right">
          <div className="time">
            <CardTime
              des="最近修改于"
              time={question.lastModifyTime}
              userName={question.lastModifierName}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
