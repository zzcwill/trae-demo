import React from "react";
import "./index.scss";

const config = {
  "question-answer-rate": require("./images/question-answer-rate.png").default,
  "answer-audit-rate": require("./images/answer-audit-rate.png").default,
  "answer-num": require("./images/answer-num.png").default,
  "question-num": require("./images/question-num.png").default,
  "caret-up": require("./images/caret-up.png").default,
  "caret-down": require("./images/caret-down.png").default
};

export default function IconImage(props) {
  const { type = "", className = "", style = {} } = props;

  return (
    <>
      {config[type] !== "undefined" && (
        <img
          src={config[type]}
          className={`icon-image ${className}`}
          style={style}
        />
      )}
    </>
  );
}
