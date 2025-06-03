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
        title: "线上沟通工具",
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

export default function OnlineReservationEdit(props) {
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
            `/consultManage/onlineReservationManage?${qs.stringify(data)}`
        );
    };

    const onSave = () => {
        const data = {
            expertId: params.expertId || "",
            location: params.location || "",
        };
        history.push(
            `/consultManage/onlineReservationManage/detail?${qs.stringify(data)}`
        );
    };
    return (
        <div className="online-reservation-edit">
            <ReservationManageEdit
                title="视频/语音面对面咨询"
                queryData={params}
                type={reservationManageEditTypeEnum.online}
                config={config}
                onChannel={onChannel}
                onSave={onSave}
            />
        </div>
    );
}
