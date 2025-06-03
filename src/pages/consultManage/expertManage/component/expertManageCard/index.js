import "./index.scss";
import React from "react";
import ExpertCard from "@/components/consultManage/expertCard";
import { Checkbox, Icon } from "dpl-react";
import DeleteSvg from "@/pages/consultManage/officialServiceManage/components/deleteSvg";

export default function ExpertManageCard(props) {
    const { onClick, data, checked, onDelete, onEdit, onCheck, onCopy } = props;
    const clickHandler = () => {
        onClick && onClick();
    };
    return (
        <div className="expert-manage-card">
            <ExpertCard data={data} onClick={clickHandler} />
            <div className="btn-group">
                <Checkbox
                    checked={checked}
                    onChange={(e) => {
                        onCheck(e.target.checked);
                    }}
                    className="card-option-item select"
                >
                    选中
                </Checkbox>
                <div className="line"></div>
                <div className="card-option-item edit" onClick={onEdit}>
                    <Icon type="pen-o" />
                    <div className="text-line"></div>
                    <span>编辑</span>
                </div>
                <div className="line"></div>
                <div className="card-option-item edit" onClick={onCopy}>
                    <Icon type="pen-o" />
                    <div className="text-line"></div>
                    <span>复制</span>
                </div>
                <div className="line"></div>
                <div className="card-option-item delete" onClick={onDelete}>
                    <DeleteSvg />
                    <div className="text-line"></div>
                    <span>删除</span>
                </div>
            </div>
        </div>
    );
}
