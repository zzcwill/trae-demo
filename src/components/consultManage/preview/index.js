import React, {useRef, useEffect} from "react";
import "./index.scss";
import {previewUrl, preViewPageUrl} from "@/const/index";

export default function Preview(props) {
    const {data, type, headerType='Y'} = props;
    const iframeUrl = previewUrl + preViewPageUrl[type] + "?times=" + Date.now() + '&headerType=' + headerType;
    const iframeRef = useRef(null);
    const sendFormData = () => {
        const el = iframeRef.current.contentWindow;
        el.postMessage(data, "*");
    };
    return (
        <div className="preview-modal-box">
            <iframe
                ref={iframeRef}
                src={iframeUrl}
                height={"100%"}
                width={"100%"}
                scrolling="auto"
                frameBorder="0"
                onLoad={sendFormData}
            ></iframe>
        </div>
    );
}
