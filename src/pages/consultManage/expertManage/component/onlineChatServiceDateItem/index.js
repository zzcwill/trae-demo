import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { DatePicker, TimePicker, Select } from "dpl-react";
import classnames from "classnames";
import moment from "moment";
import { valueEnum } from "../../config";
const dateFormat = "YYYY-MM-DD";
const timeFormat = "HH:mm";
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
function OnlineChatServiceDateItem(props) {
    const {
        value,
        onChange,
        areaList = [],
        className,
        style,
        index,
        disabled,
    } = props;
    const bodyClassName = classnames({
        "online-chat-service-date-item": true,
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
            value[valueEnum.serviceTimeBegin] &&
            type === valueEnum.serviceTimeEnd &&
            data
        ) {
            const startTime = moment(
                value[valueEnum.serviceTimeBegin],
                timeFormat
            ).valueOf();
            const endTime = data.valueOf();
            if (startTime >= endTime) {
                result[type] = value[type];
            }
        }
        if (
            value[valueEnum.serviceTimeEnd] &&
            type === valueEnum.serviceTimeBegin &&
            data
        ) {
            const startTime = data.valueOf();
            const endTime = moment(
                value[valueEnum.serviceTimeEnd],
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
        if (type === valueEnum.serviceTimeBegin) {
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
        if (type === valueEnum.serviceTimeBegin) {
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
        value && (
            <div className={bodyClassName} style={style}>
                <div className="item">
                    <div className="label">
                        <span>服务日期</span>
                    </div>
                    <DatePicker.RangePicker
                        format="YYYY-MM-DD"
                        disabled={disabled}
                        value={
                            value[valueEnum.serviceDateBegin] &&
                            value[valueEnum.serviceDateEnd]
                                ? [
                                      moment(value[valueEnum.serviceDateBegin]),
                                      moment(value[valueEnum.serviceDateEnd]),
                                  ]
                                : []
                        }
                        onChange={(dates, dateStrings) => {
                            valueChange(
                                [
                                    valueEnum.serviceDateBegin,
                                    valueEnum.serviceDateEnd,
                                ],
                                dateStrings
                            );
                        }}
                    />
                </div>
                <div className="item">
                    <div className="label">
                        <span>服务时间</span>
                    </div>
                    <TimePicker
                        format="HH:mm"
                        disabled={disabled}
                        placeholder="开始时间"
                        value={
                            value[valueEnum.serviceTimeBegin] &&
                            moment(
                                value[valueEnum.serviceTimeBegin],
                                timeFormat
                            )
                        }
                        onChange={(time, timeString) => {
                            valueChange(valueEnum.serviceTimeBegin, timeString);
                        }}
                        disabledHours={() =>
                            disabledHoursFunc(valueEnum.serviceTimeEnd)
                        }
                        disabledMinutes={(selectedHour) =>
                            disabledMinutesFunc(
                                selectedHour,
                                valueEnum.serviceTimeEnd
                            )
                        }
                    />
                    <span className="line-text">至</span>
                    <TimePicker
                        format="HH:mm"
                        disabled={disabled}
                        disabledHours={() =>
                            disabledHoursFunc(valueEnum.serviceTimeBegin)
                        }
                        disabledMinutes={(selectedHour) =>
                            disabledMinutesFunc(
                                selectedHour,
                                valueEnum.serviceTimeBegin
                            )
                        }
                        placeholder="结束时间"
                        value={
                            value[valueEnum.serviceTimeEnd] &&
                            moment(value[valueEnum.serviceTimeEnd], timeFormat)
                        }
                        onChange={(time, timeString) => {
                            valueChange(valueEnum.serviceTimeEnd, timeString);
                        }}
                    />
                </div>
                <div className="item flex-1">
                    <div className="label">
                        <span>服务地区</span>
                    </div>
                    <Select
                        placeholder="请选择服务地区"
                        disabled={disabled}
                        style={{ width: 150 }}
                        optionFilterProp="children"
                        showSearch
                        mode="multiple"
                        className='select-area'
                        value={value[valueEnum.locationList]}
                        onChange={(val) => {
                            valueChange(valueEnum.locationList, val);
                        }}
                    >
                        {Array.isArray(areaList) &&
                            areaList.map((item, index) => {
                                return (
                                    <Select.Option
                                        value={item.value}
                                        key={`${item.label}${index}`}
                                    >
                                        {item.label}
                                    </Select.Option>
                                );
                            })}
                    </Select>
                </div>
            </div>
        )
    );
}

export default OnlineChatServiceDateItem;
