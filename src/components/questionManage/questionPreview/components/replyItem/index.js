import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import classNames from "classnames";
import zhuanyuan_head_icon from "../../images/财税小管家.svg";
import xiaoguanjia_icon from "../../images/财税小管家标签.png";
import { Icon } from "dpl-react";
import throttle from "lodash/throttle";
import QuestionDimension from "../questionDimension";

export default function ReplyItem(props) {
    const {
        reply,
        scrollBox,
    } = props;
    
    if(reply && reply.reply) {
        reply.reply = reply.reply.replace(/ href /g,' ') //把href属性去掉
    }

    const replyContentClassName = classNames({
        "reply-content": true,
    });
    const replyContentRef = useRef(null);
    const questionItemRef = useRef(null);
    return (
        reply && (
            <div className="my-question-reply-item" ref={questionItemRef}>
                <div className="reply">
                    {reply && reply.replyName && (
                        <div className="name">
                            <img
                                className="header-img"
                                src={
                                    reply?.replyHeaderUrl || zhuanyuan_head_icon
                                }
                            />
                            <div className="text">
                                {reply?.replyName || "财税小管家"}
                            </div>
                            <div className="type">
                                <span>亿企咨询官方团队</span>
                                <img src={xiaoguanjia_icon} />
                            </div>
                        </div>
                    )}
                    {reply && (
                        <QuestionDimension
                            style={{ marginTop: 10, marginBottom: 14 }}
                            dimensionList={reply.dimensionList}
                        />
                    )}
                    <div
                        className={replyContentClassName}
                        ref={replyContentRef}
                        dangerouslySetInnerHTML={{ __html: reply?.reply }}
                    ></div>
                    {reply.replyTime && (
                        <div className="modify-time">
                            编辑于{reply.replyTime}
                        </div>
                    )}
                </div>
            </div>
        )
    );
}
