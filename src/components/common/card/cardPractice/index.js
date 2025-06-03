import React from "react";
import "./index.scss";
import shi_icon from "./shi.png";

export default function CardPractice(props, ref) {
  const { className = "", style, content = "" } = props;
  return (
    <div className={"card-practice " + className} style={style}>
      <div className="title">
        <img alt="" src={shi_icon} />
        <p>内部提示</p>
      </div>
      <div className="content">
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
      <div className="tips">
        &nbsp;（注意：内部提示仅用于员工查看，该部分内容无法通过分享、复制等操作发送给其他用户）
      </div>
    </div>
  );
}
