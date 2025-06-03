import React, { useState, useEffect } from "react";
import { Radio, InputNumber } from "dpl-react";
import {
  busyThresholdList,
  spectialCallManageEditConfig
} from "@/const/config";

export default function BusyThreshold(props) {
  const { value, onChange } = props;
  const [isDisabled, setIsDisabled] = useState(() => {
    return (
      value.busyThresholdSwitch !=
      spectialCallManageEditConfig.busyThresholdSwitch
    );
  }); // 繁忙阈值是否可以输入

  const busyThresholdSwitchChange = e => {
    const id = e.target.value;
    if (id == spectialCallManageEditConfig.busyThresholdSwitch) {
      setIsDisabled(false);
      onChange(
        Object.assign({}, value, {
          busyThresholdSwitch: id
        })
      );
    } else {
      setIsDisabled(true);
      onChange(
        Object.assign({}, value, {
          busyThresholdSwitch: id,
          busyThreshold: undefined
        })
      );
    }
  };

  /**
   * 备用组改变
   */
  const busyThresholdChange = num => {
    onChange(
      Object.assign({}, value, {
        busyThreshold: num
      })
    );
  };

  useEffect(() => {
    setIsDisabled(
      value.busyThresholdSwitch !=
        spectialCallManageEditConfig.busyThresholdSwitch
    );
  }, [value]);
  return (
    <div className="help-queue-box">
      <Radio.Group
        value={value.busyThresholdSwitch}
        onChange={busyThresholdSwitchChange}
      >
        {busyThresholdList.map(item => {
          if (item.id != spectialCallManageEditConfig.busyThresholdSwitch) {
            return (
              <Radio key={item.name} value={item.id} style={{ width: 120 }}>
                {item.name}
              </Radio>
            );
          } else {
            return (
              <span key={item.name}>
                <Radio  value={item.id}>
                  {item.name}
                </Radio>
                <InputNumber
                  value={value.busyThreshold}
                  min={1}
                  max={999}
                  step={1}
                  precision={0}
                  disabled={isDisabled}
                  inputWidth={392}
                  placeholder="请输入繁忙阈值"
                  onChange={busyThresholdChange}
                />
              </span>
            );
          }
        })}
      </Radio.Group>
    </div>
  );
}
