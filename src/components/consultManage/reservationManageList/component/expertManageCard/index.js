import "./index.scss";
import React from "react";
import ExpertCard from "@/components/consultManage/expertCard";
import { Icon } from "dpl-react";

export default function ExpertManageCard(props) {
    const { onClick, data, onEdit } = props;
    const clickHandler = () => {
        onClick && onClick();
    };
    return (
        <div className="expert-manage-card">
            <ExpertCard data={data} onClick={clickHandler} />
            <div className="btn-group">
                <div className="card-option-item edit" onClick={onEdit}>
                    <Icon type="pen-o" />
                    <div className="text-line"></div>
                    <span>编辑</span>
                </div>
            </div>
        </div>
    );
}
