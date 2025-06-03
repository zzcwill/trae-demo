import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { DatePicker, TimePicker } from "dpl-react";
import classnames from "classnames";
import moment from "moment";
import "moment/locale/zh-cn";

// 字段key值
export const dateKey = "date";
export const startTimeKey = "startTime";
export const endTimeKey = "endTime";
export const oneHour = 1 * 60 * 60 * 1000;
export const timeInterval = 8 * 60 * 60 * 1000;
const timeFormat = "HH:mm:ss";
const dateFormat = "YYYY-MM-DD";
/**
 * 获取当前时间
 */
export function getCurrentTime() {
    let result = {};
    try {
        const now = moment();
        const currentDateStart = moment(
            moment().format(`${dateFormat} 00:00:00`)
        );
        result.date = now.format(dateFormat);
        result.endTime = now.format(timeFormat);
        result.startTime = currentDateStart.format(timeFormat);
        const timeIntervalDate = now.valueOf() - timeInterval;
        if (timeIntervalDate - currentDateStart.valueOf() > 0) {
            result.startTime = moment(timeIntervalDate).format(timeFormat);
        }
    } catch (e) {
        console.error(e);
    }
    return result;
}

function range(start, end, specialStart, specialEnd) {
    const result = [];
    for (let i = start; i < end; i++) {
        if (i >= specialStart && i <= specialEnd) {
            continue;
        }
        result.push(i);
    }
    return result;
}

export default function SelectOneDayTime(props) {
    const { value, onChange, className, style } = props;
    const bodyClassName = classnames("select-ont-day-time-box", {
        [className]: !!className,
    });
    const [dateTime, setDateTime] = useState([]); // 时间
    const startTimeRef = useRef(""); // 开始时间
    const endTimeRef = useRef(""); // 开始时间

    /**
     * 数据修改
     */
    const valueOnChange = (data) => {
        let result = Object.assign(dateTime, data);
        onChange && onChange(result);
    };

    /**
     * 日期变化
     */
    const onDateChange = (date, dateString) => {
        let result = {
            [dateKey]: dateString,
        };
        if (!dateString) {
            result[startTimeKey] = "";
            result[endTimeKey] = "";
        }
        valueOnChange(result);
    };

    /**
     * 开始时间变化
     */
    const onStartTimeChange = (time, timeString) => {
        let result = {
            [startTimeKey]: timeString,
        };
        startTimeRef.current = timeString;
        if (!timeString) {
            result[endTimeKey] = "";
        }
        valueOnChange(result);
    };

    /**
     * 是否在时间间隔
     * @returns
     */
    const isInTimeInterval = () => {
        let result = true;
        let startMoment = moment(startTimeRef.current, timeFormat);
        let endMoment = moment(endTimeRef.current, timeFormat);
        const startAndEndInterval =
            (endMoment.valueOf() - startMoment.valueOf()) % oneHour;
        if (startAndEndInterval && startAndEndInterval < oneHour) {
            result = false;
        }
        return result;
    };

    /**
     * 结束时间变化
     */
    const onEndTimeChange = (time, timeString) => {
        let result = {
            [endTimeKey]: timeString,
        };
        endTimeRef.current = timeString;
        valueOnChange(result);
    };

    /**
     * 禁止小时
     */
    const disabledHours = (type) => {
        const flag = isInTimeInterval();
        let startDisabledHour = 0;
        let endDisabledHour = 8;
        if (type === "startTime") {
            let endMoment = moment(endTimeRef.current, timeFormat).toObject();
            endDisabledHour = endMoment.hours;
            if (flag) {
                startDisabledHour = endMoment.hours - 8;
            } else {
                startDisabledHour = endMoment.hours - 7;
            }
        } else {
            let startMoment = moment(
                startTimeRef.current,
                timeFormat
            ).toObject();
            startDisabledHour = startMoment.hours;
            if (flag) {
                endDisabledHour = startMoment.hours + 8;
            } else {
                endDisabledHour = startMoment.hours + 7;
            }
        }
        const hours = range(0, 24, startDisabledHour, endDisabledHour);
        return hours;
    };

    /**
     * 禁止分钟
     */
    const disabledMinutes = (type, selectedHour) => {
        let startDisabledMinute = 0;
        let endDisabledMinute = 60;
        let startMoment = moment(startTimeRef.current, timeFormat).toObject();
        let endMoment = moment(endTimeRef.current, timeFormat).toObject();
        if (type === "startTime") {
            if (endMoment.hours - startMoment.hours === 8) {
                startDisabledMinute = endMoment.minutes;
                endDisabledMinute = 60;
            }
        } else {
            if (endMoment.hours - startMoment.hours === 8) {
                startDisabledMinute = 0;
                endDisabledMinute = startMoment.minutes;
            }
        }
        const minutes = range(0, 60, startDisabledMinute, endDisabledMinute);
        return minutes;
    };

    /**
     * 禁止秒
     */
    const disabledSeconds = (type, selectedHour, selectedMinute) => {
        let startDisabledSecond = 0;
        let endDisabledSecond = 60;
        let startMoment = moment(startTimeRef.current, timeFormat).toObject();
        let endMoment = moment(endTimeRef.current, timeFormat).toObject();
        if (type === "startTime") {
            if (endMoment.hours - startMoment.hours === 8) {
                startDisabledSecond = endMoment.seconds;
                endDisabledSecond = 60;
            }
        } else {
            if (endMoment.hours - startMoment.hours === 8) {
                startDisabledSecond = 0;
                endDisabledSecond = startMoment.seconds;
            }
        }
        const seconds = range(0, 60, startDisabledSecond, endDisabledSecond);
        return seconds;
    };

    useEffect(() => {
        const nowDateObj = getCurrentTime();
        const result = {
            [dateKey]: nowDateObj.date,
            [startTimeKey]: nowDateObj.startTime,
            [endTimeKey]: nowDateObj.endTime,
        };
        if (value) {
            Object.assign(result, value);
        }
        startTimeRef.current = result[startTimeKey];
        endTimeRef.current = result[endTimeKey];
        setDateTime(result);
    }, [value]);
    return (
        <div className={bodyClassName} style={style}>
            <div className="select-item">
                <DatePicker
                    value={
                        (dateTime[dateKey] && moment(dateTime[dateKey])) ||
                        dateTime[dateKey]
                    }
                    onChange={onDateChange}
                    allowClear={false}
                />
            </div>
            <div className="select-item">
                <TimePicker
                    value={
                        (dateTime[startTimeKey] &&
                            moment(dateTime[startTimeKey], timeFormat)) ||
                        dateTime[startTimeKey]
                    }
                    onChange={onStartTimeChange}
                    allowEmpty={false}
                    disabledHours={() => {
                        return disabledHours("startTime");
                    }}
                    disabledMinutes={(selectedHour) => {
                        return disabledMinutes("startTime", selectedHour);
                    }}
                    disabledSeconds={(selectedHour, selectedMinute) => {
                        return disabledSeconds(
                            "startTime",
                            selectedHour,
                            selectedMinute
                        );
                    }}
                />
            </div>
            <div className="select-item item-between">
                <span>至</span>
            </div>
            <div className="select-item">
                <TimePicker
                    value={
                        (dateTime[endTimeKey] &&
                            moment(dateTime[endTimeKey], timeFormat)) ||
                        dateTime[endTimeKey]
                    }
                    onChange={onEndTimeChange}
                    allowEmpty={false}
                    disabledHours={() => {
                        return disabledHours("endTime");
                    }}
                    disabledMinutes={(selectedHour) => {
                        return disabledMinutes("endTime", selectedHour);
                    }}
                    disabledSeconds={(selectedHour, selectedMinute) => {
                        return disabledSeconds(
                            "endTime",
                            selectedHour,
                            selectedMinute
                        );
                    }}
                />
            </div>
        </div>
    );
}
