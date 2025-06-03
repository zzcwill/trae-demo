import React from "react";
import './index.scss'

export default function Status (props) {
    const { backgroundColor, text } = props;
    return <div className="askone-list-status">
      <span
        className="color"
        style={{ backgroundColor }}
      >
      </span>
      <span className="text">{text}</span>
    </div>
  }
