import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { DatePicker, TimePicker, Select } from "dpl-react";
import classnames from "classnames";
import moment from "moment";
// 暂时没有用
const valueEnum = {
  startTime: "startTime", // 服务时间开始，格式 HH:mm
  endTime: "endTime", // 服务时间截止，格式 HH:mm
};
const timeFormat = "HH:mm";
function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
function TimeRangePicker(props) {
  const { value = {}, onChange, className, style, index, disabled } = props;
	console.log('value', value);
  const bodyClassName = classnames({
    "self-time-range-picker": true,
    [className]: className,
  });

  /**
   * 数据修改
   */
  const valueChange = (type, data) => {
    let result = Object.assign({}, value);
    if (Array.isArray(type) && Array.isArray(data)) {
      type.forEach((item, index) => {
        result[item] = data[index];
      });
    } else {
      result[type] = data;
    }
    if (
      value[valueEnum.startTime] &&
      type === valueEnum.endTime &&
      data
    ) {
      const startTime = moment(
        value[valueEnum.startTime],
        timeFormat
      ).valueOf();
      const endTime = data.valueOf();
      if (startTime >= endTime) {
        result[type] = value[type];
      }
    }
    if (
      value[valueEnum.endTime] &&
      type === valueEnum.startTime &&
      data
    ) {
      const startTime = data.valueOf();
      const endTime = moment(
        value[valueEnum.endTime],
        timeFormat
      ).valueOf();
      if (startTime >= endTime) {
        result[type] = value[type];
      }
    }
    onChange && onChange(result, index);
  };

  // 禁止选择小时
  const disabledHoursFunc = (type) => {
    const hours = range(0, 24);
    let timeHour = 0;
    if (value[type]) {
      timeHour = moment(value[type], timeFormat).hour();
    }
    if (type === valueEnum.startTime) {
      hours.splice(timeHour);
    } else {
      timeHour ? hours.splice(0, timeHour + 1) : hours.splice(timeHour);
    }

    return hours;
  };

  // 禁止选择分钟
  const disabledMinutesFunc = (selectedHour, type) => {
    let minutes = range(0, 60);
    let timeHour = 0;
    let timeMinutes = 0;
    if (value[type]) {
      timeHour = moment(value[type], timeFormat).hour();
      timeMinutes = moment(value[type], timeFormat).minute();
    }
    if (type === valueEnum.startTime) {
      if (selectedHour > timeHour) {
        minutes = [];
      } else {
        minutes.splice(timeMinutes);
      }
    } else {
      if (selectedHour >= timeHour) {
        timeMinutes
          ? minutes.splice(0, timeMinutes + 1)
          : minutes.splice(timeMinutes);
      } else {
        minutes = [];
      }
    }
    return minutes;
  };

  return (
    <div className={bodyClassName} style={style}>
      <TimePicker
        format="HH:mm"
        disabled={disabled}
        placeholder="开始时间"
        value={
          value[valueEnum.startTime] &&
          moment(value[valueEnum.startTime], timeFormat)
        }
        onChange={(time, timeString) => {
          valueChange(valueEnum.startTime, timeString);
        }}
        disabledHours={() => disabledHoursFunc(valueEnum.endTime)}
        disabledMinutes={(selectedHour) =>
          disabledMinutesFunc(selectedHour, valueEnum.endTime)
        }
      />
      <span className="line-text">-</span>
      <TimePicker
        format="HH:mm"
        disabled={disabled}
        disabledHours={() => disabledHoursFunc(valueEnum.startTime)}
        disabledMinutes={(selectedHour) =>
          disabledMinutesFunc(selectedHour, valueEnum.startTime)
        }
        placeholder="结束时间"
        value={
          value[valueEnum.endTime] &&
          moment(value[valueEnum.endTime], timeFormat)
        }
        onChange={(time, timeString) => {
          valueChange(valueEnum.endTime, timeString);
        }}
      />
    </div>
  );
}

export default TimeRangePicker;
