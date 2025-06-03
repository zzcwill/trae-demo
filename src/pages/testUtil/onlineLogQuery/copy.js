import React, {useRef, useEffect} from "react";
import {message} from "dpl-react";
import Clipboard from "clipboard";
// 默认提示语
const successMessage = "复制成功！";
const errorMessage = "复制失败！";

export default function Copy(props) {
    const {
        copyContent,
        children,
    } = props;
    const clipboardRef = useRef(null);

    const buttonOnClick = (e) => {
        if (clipboardRef.current) {
            clipboardRef.current.click();
        }
    };

    useEffect(() => {
        const clipboardItem = new Clipboard(clipboardRef.current);
        clipboardItem.on("success", (e) => {
            message.success(successMessage);
        });
        clipboardItem.on("error", (e) => {
            message.error(errorMessage);
        });
        return () => {
            clipboardItem.destroy();
        };
    }, []);
    return (
        <div onDoubleClick={buttonOnClick} title={copyContent} className='online-log-copy-btn'>
            <button
                style={{display: "none"}}
                ref={clipboardRef}
                data-clipboard-text={copyContent}
            ></button>
            {children}
        </div>
    );
}
