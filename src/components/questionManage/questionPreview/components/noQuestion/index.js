import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import no_question_icon from "./images/空.svg";
import { Button } from "dpl-react";
import classnames from "classnames";
export default function NoQuestion(props) {
    const {
        goHome,
        className,
        style,
        tips = "抱歉该问题已被删除或暂未开放",
        isShowOption = true,
        children,
    } = props;
    const goHomeHandler = () => {
        goHome && goHome();
    };
    const bodyClassName = classnames("my-question-no-question", {
        [className]: className,
    });
    return (
        <div className={bodyClassName}>
            <img src={no_question_icon} className="img" alt="无回答" />
            <div className="tips">{tips}</div>
            {isShowOption && (
                <div className="options">
                    <Button type="primary" onClick={goHomeHandler}>
                        返回首页
                    </Button>
                </div>
            )}
            {children}
        </div>
    );
}
