import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import classnames from "classnames";

export default function LogDetail(props) {
    const { className, style, data = {} } = props;
    const bodyClassName = classnames("log-detail", {
        [className]: !!className,
    });
    return (
        Array.isArray(data) && (
            <div className={bodyClassName} style={style}>
                {data.map((item) => {
                    if (item.key && item.name) {
                        return (
                            <div className="log-detail-item">
                                <div className="item-label">{item.name}</div>
                                <div className="item-value">{item.value}</div>
                            </div>
                        );
                    }
                })}
            </div>
        )
    );
}
