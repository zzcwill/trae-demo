import "./index.scss";
import React from "react";
import ExpertCard from "@/components/consultManage/expertCard";
import { Checkbox, Icon } from "dpl-react";

export default function ExpertManageCard(props) {
  const { onClick, data, checked, onCheck } = props;
  return (
    <div className="expert-search-modal-card">
      <ExpertCard data={data} className="expert-search-card" />
      <div className="btn-group">
        <Checkbox
          checked={checked}
          onChange={(e) => {
            onCheck && onCheck(e.target.checked);
          }}
          className="card-option-item select"
        >
          选中
        </Checkbox>
      </div>
    </div>
  );
}
