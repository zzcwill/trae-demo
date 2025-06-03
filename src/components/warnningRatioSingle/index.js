/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-07-21 09:50:30
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-07-21 17:20:39
 * @FilePath: /askone-manage-pc/src/pages/employeeManage/groupManage/components/warnningRatio/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Icon, InputNumber, message, Select, Switch } from "dpl-react";
import React from "react";
import "./index.scss";

export default function WarnningRatioSingle(props) {
  const {
    value = {},
    lowKey = 'groupCallCompletingRateLowerThreshold',
    upperKey = 'groupCallCompletingRateUpperThreshold',
    onChange,
    showLow = true, // 展示低于xx的值
    showHigh = true, // 展示高于xx的值
  } = props;

  const lowRatio = value?.[lowKey]
  const upperRatio = value?.[upperKey];

  const handleChange = (key, val) => {
    function getDefault(key, val) {
      if (key === lowKey) {
        return val || 0;
      } else if (key === upperKey) {
        return val || 100;
      }
    }
    // 阈值填写最低时，最高若为空，自动填充为100
    // 阈值填写最高时，最低若为空，自动填充为0
    onChange?.({
      ...value,
      [lowKey]: key === lowKey ? getDefault(key, val) : getDefault(lowKey, lowRatio) ,
      [upperKey]: key === upperKey ? getDefault(key, val) : getDefault(upperKey, upperRatio),
    });
  };

  return (
    <div className="warnning-ratio-single">
      <div className="condition">
        {/* 低于的值不得大于等于高于的值 */}
        {showLow && (
          <span>
            接通率低于
            <InputNumber
              value={lowRatio}
              min={0}
              max={100}
              precision={0}
              onChange={(val) => {
                handleChange(
                  lowKey,
                  val
                );
              }}
            />
            %，
          </span>
        )}
        {showHigh && (
          <span>
            {showLow ? "或" : ""}高于
            <InputNumber
              value={upperRatio}
              min={0}
              max={100}
              precision={0}
              onChange={(val) => {
                handleChange(
                  upperKey,
                  val
                );
              }}
            />
            %，触发告警
          </span>
        )}
      </div>
    </div>
  );
}
