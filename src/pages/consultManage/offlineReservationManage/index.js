import React from "react";
import "./index.scss";
import ExpertList from "@/components/consultManage/reservationManageList";
import qs from "qs";
import history from "@/history";
import { serviceTypeMap } from "@/const/config";

export default function OfflineReservationManage(props) {
    // 编辑按钮
    const onEdit = (data) => {
        history.push(
            `/consultManage/offlineReservationManage/edit?${qs.stringify(data)}`
        );
    };
    return (
        <ExpertList onEdit={onEdit} serviceWay={serviceTypeMap.OFFLINE.id} />
    );
}
