import React, { useRef, useEffect } from "react";
import { Button, message } from "dpl-react";
import Clipboard from "clipboard";
// 默认提示语
const defaultSuccessMessage = "复制成功！";
const defaultErrorMessage = "复制失败！";

export default function ClipboardButton(props) {
    const {
        url,
        children,
        successMessage = defaultSuccessMessage,
        errorMessage = defaultErrorMessage,
        onClick,
        ...otherProps
    } = props;
    const clipboardRef = useRef(null);

    const buttonOnClick = (e) => {
        if (clipboardRef.current) {
            clipboardRef.current.click();
        }
        onClick && onClick(e);
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
        <div className="clipboard-button">
            <button
                style={{ display: "none" }}
                ref={clipboardRef}
                data-clipboard-text={url}
            ></button>
            <Button {...otherProps} onClick={buttonOnClick}>
                {children}
            </Button>
        </div>
    );
}
