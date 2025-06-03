import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import ReservationTimeItem from "../reservationTimeItem";
import { valueEnum } from "../../config";
import { Button } from "dpl-react";
const defaultConfig = {
    [valueEnum.serviceDate]: undefined,
    [valueEnum.startTime]: undefined,
    [valueEnum.endTime]: undefined,
    [valueEnum.serviceCount]: undefined,
};
function ReservationTime(props) {
    const { value, onChange, disabled = false } = props;

    /**
     * 数据改变
     */
    const valueOnChange = (index, data) => {
        let list = [].concat(value);
        list[index] = data;
        onChange && onChange(list);
    };

    /**
     * 添加可预约时间
     */
    const addReservationTimeItem = (e) => {
        let list = [].concat(value);
        list.push({
            ...defaultConfig,
        });
        onChange && onChange(list);
    };

    /**
     * 删除可预约时间
     */
    const deleteReservationTimeItem = (e, index) => {
        let list = [].concat(value);
        list.splice(index, 1);
        onChange && onChange(list);
    };
    return (
        <div className="reservation-time-box">
            <div className="reservation-time-list">
                {Array.isArray(value) &&
                    value.map((item, index) => {
                        return (
                            <div className="item-box" key={index}>
                                <ReservationTimeItem
                                    value={item}
                                    onChange={valueOnChange}
                                    index={index}
                                    disabled={disabled}
                                />
                                <Button
                                    type="primary-bordered"
                                    onClick={(e) => {
                                        deleteReservationTimeItem(e, index);
                                    }}
                                >
                                    删除
                                </Button>
                            </div>
                        );
                    })}
            </div>
            <div className="reservation-time-add">
                <div className="add-text" onClick={addReservationTimeItem}>
                    + 添加可预约时间
                </div>
            </div>
        </div>
    );
}

export default ReservationTime;
