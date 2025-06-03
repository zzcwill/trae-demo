import React, { useState, useEffect } from "react";
import { Radio, InputNumber } from "dpl-react";
import { helpQueueList, spectialCallManageEditConfig } from "@/const/config";

export default function BusyThreshold(props) {
  const { value, onChange } = props;
  const [isDisabled, setIsDisabled] = useState(() => {
    return (
      value.helpQueueSwitch != spectialCallManageEditConfig.helpQueueSwitch
    );
  }); // 启用值、最大值、通知值是否可以输入

  const helpQueueSwitchChange = e => {
    const id = e.target.value;
    if (id == spectialCallManageEditConfig.helpQueueSwitch) {
      setIsDisabled(false);
      onChange(
        Object.assign({}, value, {
          helpQueueSwitch: id
        })
      );
    } else {
      setIsDisabled(true);
      onChange(
        Object.assign({}, value, {
          helpQueueSwitch: id,
          helpQueueStartNum: undefined, // 	代客排队启用值
          helpQueueMaxNum: undefined, // 	代客排队最大值
          helpQueueNotifyNum: undefined // 	代客排队通知值
        })
      );
    }
  };

  /**
   * 备用组改变
   */
  const helpQueueNumChange = (num, type) => {
    onChange(
      Object.assign({}, value, {
        [type]: num
      })
    );
  };

  useEffect(() => {
    setIsDisabled(
      value.helpQueueSwitch != spectialCallManageEditConfig.helpQueueSwitch
    );
  }, [value]);

  return (
    <div className="help-queue-box">
      <Radio.Group
        value={value.helpQueueSwitch}
        onChange={helpQueueSwitchChange}
      >
        {helpQueueList.length > 0 &&
          helpQueueList.map(item => {
            if (item.id != spectialCallManageEditConfig.helpQueueSwitch) {
              return (
                <Radio key={item.id} value={item.id} style={{ width: 120 }}>
                  {item.name}
                </Radio>
              );
            } else {
              return (
                <>
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                  <InputNumber
                    value={value.helpQueueStartNum}
                    min={1}
                    max={999}
                    step={1}
                    precision={0}
                    disabled={isDisabled}
                    placeholder="请输入启用值"
                    inputWidth={100}
                    onChange={num => {
                      helpQueueNumChange(num, "helpQueueStartNum");
                    }}
                  />
                  <InputNumber
                    value={value.helpQueueMaxNum}
                    min={1}
                    max={999}
                    step={1}
                    precision={0}
                    disabled={isDisabled}
                    placeholder="请输入最大值"
                    inputWidth={100}
                    onChange={num => {
                      helpQueueNumChange(num, "helpQueueMaxNum");
                    }}
                  />
                  <InputNumber
                    value={value.helpQueueNotifyNum}
                    min={1}
                    max={999}
                    step={1}
                    precision={0}
                    disabled={isDisabled}
                    placeholder="请输入通知值"
                    inputWidth={100}
                    onChange={num => {
                      helpQueueNumChange(num, "helpQueueNotifyNum");
                    }}
                  />
                </>
              );
            }
          })}
      </Radio.Group>
    </div>
  );
}
