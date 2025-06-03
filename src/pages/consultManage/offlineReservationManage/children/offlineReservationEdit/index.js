import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import qs from "qs";
import ReservationManageEdit from "@/components/consultManage/reservationManageEdit";
import { valueEnum } from "@/components/consultManage/reservationManageEdit/config";
import {
    reservationManageEditTypeEnum,
    reservationManageEditComponentsType,
} from "@/const/config";
import history from "@/history";

const config = [
    {
        componentType: reservationManageEditComponentsType.switch,
        props: {
            checkedChildren: "开",
            unCheckedChildren: "关",
        },
        title: "是否展示",
        name: valueEnum.status,
        required: true,
        type: "string",
    },
    {
        componentType: reservationManageEditComponentsType.tagInput,
        props: {},
        title: "可预约地点",
        name: valueEnum.way,
        required: true,
        type: "string",
    },
    {
        componentType: reservationManageEditComponentsType.reservationTime,
        props: {},
        title: "可预约时间",
        name: valueEnum.timeConfigList,
        required: true,
        type: "string",
    },
];

export default function OfflineReservationEdit(props) {
    const [params, setParams] = useState(() => {
        const paramsData = qs.parse(window.location.href.split("?")[1]);
        return {
            expertId: paramsData.expertId || "",
            location: paramsData.location || "",
            type: reservationManageEditTypeEnum.offline,
        };
    });

    // 修改
    const onChannel = () => {
        const data = {
            location: params.location || "",
        };
        history.push(
            `/consultManage/offlineReservationManage?${qs.stringify(data)}`
        );
    };

    const onSave = () => {
        const data = {
            expertId: params.expertId || "",
            location: params.location || "",
        };
        history.push(
            `/consultManage/offlineReservationManage/detail?${qs.stringify(data)}`
        );
    };

    return (
        <div className="offline-reservation-edit">
            <ReservationManageEdit
                title="线下面对面咨询"
                queryData={params}
                type={reservationManageEditTypeEnum.offline}
                config={config}
                onChannel={onChannel}
                onSave={onSave}
            />
        </div>
    );
}
