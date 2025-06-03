import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { DatePicker, TimePicker, InputNumber } from "dpl-react";
import { valueEnum } from "../../config";
import classnames from "classnames";
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
function ReservationTimeItem(props) {
    const {
        value,
        onChange,
        index,
        disabled = false,
        min = 0,
        max = 10000,
        className,
        style = {},
    } = props;
    const bodyClassName = classnames({
        "reservation-time-item": true,
        [className]: className,
    });

    // 数据改变
    const valueOnChange = (type, data) => {
        let result = Object.assign({}, value, {
            [type]: data,
        });
        if (value[valueEnum.startTime] && type === valueEnum.endTime && data) {
            const startTime = value[valueEnum.startTime].valueOf();
            const endTime = data.valueOf();
            if (startTime >= endTime) {
                result[type] = value[type];
            }
        }
        if (value[valueEnum.endTime] && type === valueEnum.startTime && data) {
            const startTime = data.valueOf();
            const endTime = value[valueEnum.endTime].valueOf();
            if (startTime >= endTime) {
                result[type] = value[type];
            }
        }
        onChange && onChange(index, result);
    };

    // 禁止选择小时
    const disabledHoursFunc = (type) => {
        const hours = range(0, 24);
        let timeHour = 0;
        if (value[type]) {
            timeHour = value[type].hour();
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
            timeHour = value[type].hour();
            timeMinutes = value[type].minute();
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
            <div className="item">
                <DatePicker
                    disabled={disabled}
                    value={value[valueEnum.serviceDate]}
                    onChange={(val) => {
                        valueOnChange(valueEnum.serviceDate, val);
                    }}
                />
            </div>
            <div className="item">
                <TimePicker
                    format="HH:mm"
                    disabled={disabled}
                    placeholder="开始时间"
                    disabledHours={() => disabledHoursFunc(valueEnum.endTime)}
                    disabledMinutes={(selectedHour) =>
                        disabledMinutesFunc(selectedHour, valueEnum.endTime)
                    }
                    value={value[valueEnum.startTime]}
                    onChange={(val) => {
                        valueOnChange(valueEnum.startTime, val);
                    }}
                />
            </div>
            <span>至</span>
            <div className="item">
                <TimePicker
                    format="HH:mm"
                    disabled={disabled}
                    disabledHours={() => disabledHoursFunc(valueEnum.startTime)}
                    disabledMinutes={(selectedHour) =>
                        disabledMinutesFunc(selectedHour, valueEnum.startTime)
                    }
                    placeholder="结束时间"
                    value={value[valueEnum.endTime]}
                    onChange={(val) => {
                        valueOnChange(valueEnum.endTime, val);
                    }}
                />
            </div>

            <div className="item">
                <InputNumber
                    min={min}
                    max={max}
                    inputWidth={80}
                    disabled={disabled}
                    value={value[valueEnum.serviceCount]}
                    onChange={(val) => {
                        valueOnChange(valueEnum.serviceCount, val);
                    }}
                />
            </div>
        </div>
    );
}

export default ReservationTimeItem;
