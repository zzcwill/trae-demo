import React, {useEffect, useState, useRef} from "react";
import "./index.scss";
import CardTitle from "@/components/common/card/cardTitle";
import CardPolicyBasis from "@/components/common/card/cardPolicyBasis";
import CardPractice from "@/components/common/card/cardPractice";
import openSwipe from "@/utils/photoSwipe/index";

export default function QuestionDetail(props) {
    const {detail = {}} = props;
    const replyInfo = Array.isArray(detail.replyList) && detail.replyList.length > 0 ? detail.replyList[0] : {}
    return (
        <div className="question-detail">
            <CardTitle title={detail.resume} className="title"/>
            {detail.description && (
                <div className="description">问题描述：{detail.description}</div>
            )}
            {Array.isArray(detail.descImageList) && detail.descImageList.length > 0 && (
                <ul className="des-image">
                    {detail.descImageList.map((item, index) => {
                        return (
                            <li
                                key={item.imageUrl}
                                style={{backgroundImage: `url("${item.imageUrl}")`}}
                                onClick={() => {
                                    openSwipe(detail.descImageList, index);
                                }}
                            ></li>
                        );
                    })}
                </ul>
            )}
            <div className="answer-box">
                <div className="answer">
                    <div className="answer-title">标准答案：</div>
                    <div
                        dangerouslySetInnerHTML={{__html: replyInfo.reply}}
                    ></div>
                </div>
                <CardPractice
                    className="practice"
                    content={replyInfo.internalTips}
                />
            </div>
        </div>
    );
}
