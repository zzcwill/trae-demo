import React from "react";
import "./index.scss";
import classnames from "classnames";

export default function Tag(props) {
    const { openStatus, className, style } = props;
    const tagClassName = classnames("my-question-tag", {
        "my-question-tag-open": openStatus === "Y",
        [className]: className,
    });
    return (
        openStatus && (
            <div className={tagClassName} style={style}>
                {openStatus === "Y" ? "公开" : "私密"}
            </div>
        )
    );
}
