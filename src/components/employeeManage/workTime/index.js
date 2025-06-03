import React, { useState, useEffect } from "react";
import "./index.scss";
import { TimePicker, Radio, Modal, Icon } from "dpl-react";
import moment from "moment";
import classnames from "classnames";
import { workTimeSaveKeyMap, workTypeList } from "@/const/config";
const format = "HH:mm";

const defaultWorkTime = {
  beginTime: "08:30",
  endTime: "17:30",
};
const defaultMaxItem = 3;
function WorkTime(props, ref) {
  const {
    className,
    style,
    title,
    isRequire,
    value,
    onChange,
    maxItem = defaultMaxItem,
    disabled,
    weekIndex,
  } = props;
  const bodyClass = classnames({
    "work-time-box": true,
    [className]: className,
  });
  const titleClass = classnames({
    "work-time-title": title,
    "work-time-title-require": isRequire,
  });

  const disabledHoursFunc = (startTime) => {
    let disabledHours = [];
    const hour = moment(startTime, format).hour();
    for (let i = 0; i < hour; i++) {
      disabledHours.push(i);
    }
    return disabledHours;
  };

  const disabledMinutesFunc = (selectedHour, startTime) => {
    const hour = moment(startTime, format).hour();
    const minute = moment(startTime, format).minutes();
    let disabledMinutes = [];
    if (selectedHour == hour) {
      for (let i = 0; i <= minute; i++) {
        disabledMinutes.push(i);
      }
    }
    return disabledMinutes;
  };

  // 工作类型修改
  const workTypeChange = (e) => {
    const data = e.target.value;
    let result = Object.assign({}, value);
    result[workTimeSaveKeyMap.workFlag] = data;
    if (
      data === workTypeList[0].id &&
      (!result[workTimeSaveKeyMap.dayTime] ||
        result[workTimeSaveKeyMap.dayTime].length === 0)
    ) {
      result[workTimeSaveKeyMap.dayTime] = [].concat(defaultWorkTime);
    }
    onChange && onChange({ result, index: weekIndex });
  };

  // 时间修改
  const timePickerChange = (type, time, index, sourceData) => {
    let result = Object.assign({}, value);
    let list = [].concat(result[workTimeSaveKeyMap.dayTime]);
    if (
      type === workTimeSaveKeyMap.beginTime &&
      moment(time, format).valueOf() >
        moment(sourceData[workTimeSaveKeyMap.endTime], format).valueOf()
    ) {
      list[index] = Object.assign({}, sourceData, {
        [type]: time,
        [workTimeSaveKeyMap.endTime]: null,
      });
    } else if (
      type === workTimeSaveKeyMap.endTime &&
      moment(time, format).valueOf() <=
        moment(sourceData[workTimeSaveKeyMap.beginTime], format).valueOf()
    ) {
    } else {
      list[index] = Object.assign({}, sourceData, {
        [type]: time,
      });
    }

    result[workTimeSaveKeyMap.dayTime] = list;
    onChange && onChange({ result, index: weekIndex });
  };

  const addWorkTime = () => {
    if (value.dayTime.length < maxItem && !disabled) {
      let list = [].concat(value.dayTime);
      list.push(defaultWorkTime);
      onChange &&
        onChange({
          result: Object.assign({}, value, {
            dayTime: list,
          }),
          index: weekIndex,
        });
    }
  };

  const deleteWorkTIme = (index) => {
    if (value.dayTime.length > 1 && !disabled) {
      let list = [].concat(value.dayTime);
      list.splice(index, 1);
      onChange &&
        onChange({
          result: Object.assign({}, value, {
            dayTime: list,
          }),
          index: weekIndex,
        });
    }
  };

  return (
    <div className={bodyClass} style={style} ref={ref}>
      {title && <div className={titleClass}>{title}</div>}
      <div className="work-time-body">
        <div className="work-time-item">
          <Radio.Group
            value={value.workFlag}
            onChange={workTypeChange}
            disabled={disabled}
          >
            {workTypeList.map((item) => {
              return (
                <Radio value={item.id} key={item.id}>
                  {item.name}
                </Radio>
              );
            })}
          </Radio.Group>
        </div>
        {value.workFlag &&
          value.workFlag === workTypeList[0].id &&
          value.dayTime.length > 0 &&
          value.dayTime.map((item, index) => {
            return (
              <div className="work-time-item">
                <div className="work-time-item-timepicker">
                  <TimePicker
                    value={
                      (item.beginTime && moment(item.beginTime, format)) ||
                      item.beginTime
                    }
                    format={format}
                    allowEmpty={false}
                    className="time-item"
                    disabled={disabled}
                    onChange={(time, timeString) => {
                      timePickerChange(
                        workTimeSaveKeyMap.beginTime,
                        timeString,
                        index,
                        item
                      );
                    }}
                  />
                  <span className="time-item-center">至</span>
                  <TimePicker
                    value={
                      (item.endTime && moment(item.endTime, format)) ||
                      item.endTime
                    }
                    format={format}
                    allowEmpty={false}
                    className="time-item"
                    disabled={disabled}
                    onChange={(time, timeString) => {
                      timePickerChange(
                        workTimeSaveKeyMap.endTime,
                        timeString,
                        index,
                        item
                      );
                    }}
                    disabledHours={() => disabledHoursFunc(item.beginTime)}
                    disabledMinutes={(selectedHour) =>
                      disabledMinutesFunc(selectedHour, item.beginTime)
                    }
                  />
                </div>
                <div className="work-time-item-option">
                  <div className="option-item">
                    {index == value.dayTime.length - 1 &&
                      value.dayTime.length < maxItem && (
                        <Icon
                          type="plus"
                          className="work-time-item-option-icon"
                          onClick={() => {
                            addWorkTime();
                          }}
                        />
                      )}
                  </div>
                  <div className="option-line-box"></div>
                  <div className="option-item">
                    {value.dayTime.length != 1 && (
                      <Icon
                        type="minus"
                        className="work-time-item-option-icon"
                        onClick={() => {
                          deleteWorkTIme(index);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default React.forwardRef(WorkTime);
