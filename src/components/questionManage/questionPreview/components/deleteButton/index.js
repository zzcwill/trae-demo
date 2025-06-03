import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { Icon, Modal, message } from "dpl-react";
export default function DeleteButton(props) {
    return (
        <div className="my-question-delete-button">
            <Icon type="dustbin-o" />
            <span className="text">删除问题</span>
        </div>
    );
}
