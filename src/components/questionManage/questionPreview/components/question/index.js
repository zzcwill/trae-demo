import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import classnames from "classnames";
import PhotoSwipeGallery from "@/utils/photoSwipe/photoSwipeGallery/index";
import DeleteButton from "../deleteButton";
import Tag from "../tag";

export default function Question(props) {
    const { detail, className, style, canClick = true } = props;
    const bodyClassName = classnames("question-info", {
        [className]: className,
    });
    return (
        detail && (
            <div className={bodyClassName} style={style}>
                <div className="resume">
                    {detail.openStatus && (
                        <Tag openStatus={detail.openStatus} />
                    )}
                    <span className="question-title">{detail.question}</span>
                </div>
                {detail.description && (
                    <div className="description">
                        <span className="label">补充描述</span>
                        <span>{detail.description}</span>
                    </div>
                )}
                {Array.isArray(detail.imageUrlList) && (
                    <div className="image-list">
                        <PhotoSwipeGallery
                            imgList={detail.imageUrlList.map((item) => {
                                return {
                                    imageUrl: item,
                                };
                            })}
                            width={70}
                            height={70}
                        />
                    </div>
                )}
                <div className="operation">
                    <div className="operation-left">
                        {detail.askTime && (
                            <div className="time">{detail.askTime}</div>
                        )}
                    </div>
                    <div className="operation-right">
                        <DeleteButton
                            questionId={detail.questionId}
                            canClick={canClick}
                        />
                    </div>
                </div>
            </div>
        )
    );
}
