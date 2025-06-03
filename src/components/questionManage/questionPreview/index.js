import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import "./index.scss";
import qs from "qs";
import loading_icon from "./images/编组 6.svg";
import ReplyItem from "./components/replyItem";
import NoQuestion from "./components/noQuestion";
import Question from "./components/question";
const headerImg =
    "http://servu-consult.oss-cn-hangzhou.aliyuncs.com/front/manage/header.png?" +
    Date.now();
const rightImg =
    "http://servu-consult.oss-cn-hangzhou.aliyuncs.com/front/manage/right.png?" +
    Date.now();

export default function MyQuestionDetailPreview(props) {
    const { data } = props;
    const [showNoQuestion, setShowNoQuestion] = useState(false);
    const [detail, setDetail] = useState(null);
    const [replyList, setReplyList] = useState([]);
    const [loading, setLoading] = useState(false);
    const getDetail = (data) => {
        if (data) {
            if (data.answer) {
                // 处理维度信息
                if (Array.isArray(data.answer.locationList)) {
                    let dimensionList = [];
                    data.answer.locationList.forEach((item) => {
                        if (item && item.id && item.name) {
                            dimensionList.push(item.name);
                        }
                    });
                    data.answer.dimensionList = [
                        {
                            type: "location",
                            list: dimensionList,
                        },
                    ];
                }
                data.replyList = [data.answer];
            }
            setDetail(data);
            setReplyList(data.replyList);
        } else {
            setShowNoQuestion(true);
        }
    };
    const scrollBoxRef = useRef(null);

    const showDetail = detail && !showNoQuestion;

    useLayoutEffect(() => {
        getDetail(data);
    }, [data]);
    return (
        <div className="my-question-detail-preview" ref={scrollBoxRef}>
            <div className="header">
                <img src={headerImg} className="header-img" />
            </div>
            <div className="question-detail-content">
                <div className="left">
                    {!loading ? (
                        <>
                            {showDetail ? (
                                <>
                                    <Question
                                        detail={detail}
                                        canClick={false}
                                    />
                                    <div className="reply-list-box">
                                        {Array.isArray(detail.replyList) &&
                                            detail.replyList.length > 0 && (
                                                <div className="all">
                                                    全部
                                                    {detail.replyList.length}
                                                    条回答
                                                </div>
                                            )}
                                        <div className="reply-list">
                                            {replyList.map((item, index) => {
                                                return (
                                                    <ReplyItem
                                                        key={item.replyId}
                                                        reply={item}
                                                        scrollBox={scrollBoxRef}
                                                        question={detail}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <NoQuestion />
                            )}
                        </>
                    ) : (
                        <img src={loading_icon} style={{ width: "100%" }} />
                    )}
                </div>
                <div className="right">
                    <img src={rightImg} className="right-img" />
                </div>
            </div>
        </div>
    );
}
