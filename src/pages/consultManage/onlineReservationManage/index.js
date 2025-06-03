import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import ExpertList from "@/components/consultManage/reservationManageList";
import qs from "qs";
import history from "@/history";
import { serviceTypeMap } from "@/const/config";
export default function OnlineReservationManage(props) {
    // 编辑按钮
    const onEdit = (data) => {
        history.push(
            `/consultManage/onlineReservationManage/edit?${qs.stringify(data)}`
        );
    };
    return (
        <ExpertList
            onEdit={onEdit}
            serviceWay={serviceTypeMap.ONLINE_VIDEO.id}
        />
    );
}
