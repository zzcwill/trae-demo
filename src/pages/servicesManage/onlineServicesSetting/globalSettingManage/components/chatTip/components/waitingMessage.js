import React from "react";
import { Icon, Input, InputNumber, Switch, message } from "dpl-react";

export default function WaitingMessage(props) {
  const {
    value = {
      enable: "N",
      configList: [],
      sendLimit: "",
      sendLimitTip: "",
      disableTip: "",
    },
    onChange,
    disabled,
  } = props;

  return (
    <div className="WaitingMessage">
      <Switch
        checked={value.enable === "Y"}
        disabled={disabled}
        onChange={(e) => {
          onChange(Object.assign({}, value, { enable: e ? "Y" : "N" }));
        }}
      />
      {value.enable === "Y" && (
        <div className="list">
          {Array.isArray(value.configList) &&
            value.configList.map((item, index) => {
              return (
                <div className="item" key={index}>
                  <span>发送</span>
                  <InputNumber
                    style={{ margin: "0 4px 0 4px" }}
                    disabled={disabled}
                    value={item.sendNum}
                    max={99}
                    min={1}
                    className={item.sendNum ? "success" : ""}
                    onChange={(e) => {
                      value.configList[index].sendNum = e;
                      onChange(Object.assign({}, value));
                    }}
                  />
                  <span>条消息将提示:</span>
                  <Input
                    style={{ flex: 1 }}
                    value={item.sendTip}
                    disabled={disabled}
                    maxLength={1000}
                    className={item.sendTip ? "success" : ""}
                    onChange={(e) => {
                      value.configList[index].sendTip = e.target.value;
                      onChange(Object.assign({}, value));
                    }}
                  />
                  <Icon
                    type="plus"
                    onClick={() => {
                      if (disabled) return;
                      if (value.configList.length >= 5) {
                        message.error("最多支持5条排队提示");
                        return;
                      }
                      value.configList.splice(index + 1, 0, {
                        sendNum: "",
                        sendTip: "",
                      });
                      onChange(Object.assign({}, value));
                    }}
                    style={{
                      marginLeft: 10,
                      marginRight: 10,
                      cursor: "pointer",
                    }}
                  />
                  <Icon
                    type="minus"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (disabled) return;
                      if (value.configList.length <= 1) {
                        message.error("至少需要一条提示");
                        return;
                      }
                      value.configList.splice(index, 1);
                      onChange(Object.assign({}, value));
                    }}
                  />
                </div>
              );
            })}
        </div>
      )}
      {value.enable === "Y" && (
        <div className="limit-box">
          <div className="num">
            <span>访客在排队中最多可发送</span>
            <InputNumber
              disabled={disabled}
              value={value.sendLimit}
              style={{ marginLeft: 10, marginRight: 10 }}
              max={99}
              min={1}
              className={value.sendLimit ? "success" : ""}
              onChange={(e) => {
                value.sendLimit = e;
                onChange(Object.assign({}, value));
              }}
            />
            <span>条消息，超过限制后用户将不能再发送消息，并提示</span>
          </div>
        </div>
      )}
      {value.enable === "Y" && (
        <Input.TextArea
          disabled={disabled}
          value={value.sendLimitTip}
          className={value.sendLimitTip ? "success" : ""}
          maxLength={1000}
          onChange={(e) => {
            value.sendLimitTip = e.target.value;
            onChange(Object.assign({}, value));
          }}
        />
      )}
      {value.enable === "N" && (
        <div className="close-tip-box">
          <div className="context">
            <span className='context-text'>排队关闭提示语</span>
            <Input
              disabled={disabled}
              value={value.disableTip}
              className={(value.disableTip && value.disableTip.trim()) ? "success" : ""}
              maxLength={1000}
              onChange={(e) => {
                value.disableTip = e.target.value;
                onChange(Object.assign({}, value));
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
