import React from "react";
import { InputNumber } from "dpl-react";

export default function ReconnectInterval(props) {
  // 访客长时间未回复
  const { value, onChange, disabled } = props;

  return (
    <div className="reconnect-interval-box">
      <span>人工咨询时，访客长时间未发言会话超时结束，</span>
      <InputNumber
        style={{ margin: "0 4px 0 4px" }}
        disabled={disabled}
        value={value}
        max={99}
        min={0}
        onChange={(e) => {
          console.log(e);
          onChange(e);
        }}
        className={value ? "success" : ""}
      />
      <span>分钟后在相同页面重新发言，需要按新咨询重新判断路由规则。</span>
    </div>
  );
}
