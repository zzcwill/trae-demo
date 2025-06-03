import React from "react";
import "./index.scss";
import ReservationManageDetail from "@/components/consultManage/reservationManageDetail";
import qs from "qs";
import history from "@/history";

export default function Detail(props) {
    const onEditHandler = (sendData) => {
        history.push(
            `/consultManage/onlineReservationManage/edit?${qs.stringify(sendData)}`
        );
    };
    return (
        <div className="detail">
            <ReservationManageDetail onEditHandler={onEditHandler} />
        </div>
    );
}
