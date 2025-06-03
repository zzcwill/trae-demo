import ReactUeditor from "ifanrx-react-ueditor";
import React, {useRef, useState, useEffect} from "react";
import {message} from "dpl-react";
import {postFile} from "../../../request/request";
import api from "@/request/api";
import appConfig from "../../../../app.config";
import "./index.scss";

const defaultFormat = {
    path:'fileUrl'
}

export default function UEditor(props) {
    const {
        value = "",
        onChange,
        initHeight = 200,
        autoHeightEnabled = true,
        disabled = false,
        uploadImageUrl = api.uploadFile,
        beforeUpload,
        format = defaultFormat,
        size,
    } = props;
    const [initValue, setInitValue] = useState(value);
    const [isOnchange, setIsOnchange] = useState(false);
    const config = {
        toolbars: [
            [
                "undo", //撤销
                "redo", //重做
                "italic", //斜体
                "underline", //下划线
                /*  'fontfamily', //字体
                          'fontsize', //字号*/
                "justifyleft", //居左对齐
                "justifyright", //居右对齐
                "justifycenter", //居中对齐
                "justifyjustify", //两端对齐
                "bold", //加粗
                "link",
            ],
        ],
        initialFrameWidth: "100%",
        initialFrameHeight: initHeight,
        retainOnlyLabelPasted: true, // 粘贴只保留标签
        pasteplain: true, //粘贴只保留纯文本
        autoHeightEnabled: autoHeightEnabled, //是否自动长高
    };
    const ueditor = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const isReadyRef = useRef(false);
    const uploadImage = (e) => {
        if (disabled) return;
        const nameLength = 100;
        const fileSize = size || 5;
        if (ueditor.current.ueditor) {
            let editorInstance = ueditor.current.ueditor;
            const picture = e.target.files[0];
            const acceptList = ["image/png", "image/jpg", "image/jpeg"];
            if (acceptList.length > 0 && acceptList.indexOf(picture.type) < 0) {
                message.error("图片格式不正确");
                return null;
            }
            if (picture.name.length > nameLength) {
                message.error("图片名字长度超过" + nameLength + "个字");
                return null;
            }
            if (picture.size > fileSize * 1024 * 1024) {
                message.error("图片大小超过" + fileSize + "M");
                return null;
            }
            let data = {
                file: e.target.files[0],
            }
            if(beforeUpload){
                data = beforeUpload(e.target.files)
            }
            postFile({
                url: uploadImageUrl,
                data,
            }).then((data) => {
                if (data.success) {
                    editorInstance.focus();
                    editorInstance.execCommand(
                        "inserthtml",
                        `<p><img src="${data.data[format.path]}" style="max-width: 100%"  alt="" ></p>`
                    );
                } else {
                    message.error(data.message);
                }
            });
        }
        return null;
    };
    const changeHandler = (e) => {
        if (isReadyRef.current) {
            setIsOnchange(true);
            onChange(e);
            console.log(e)
        }
    };

    useEffect(() => {
        if (!isOnchange && isReady) {
            //父组件value改变时，相应改变
            ueditor.current.ueditor.setContent(value);
        }
        setIsOnchange(false);
    }, [value, isReady]);
    const setDisabled = () => {
        if (!isReady) return;
        if (disabled) {
            ueditor.current.ueditor.setDisabled();
        } else {
            ueditor.current.ueditor.setEnabled();
        }
    };
    useEffect(() => {
        setDisabled();
    }, [disabled, isReady]);
    return (
        <ReactUeditor
            config={config}
            ueditorPath={`${appConfig.publicPath}/ueditor`}
            debug
            plugins={["uploadImage"]}
            value={initValue}
            onChange={changeHandler}
            uploadImage={uploadImage}
            ref={ueditor}
            onReady={() => {
                isReadyRef.current = true;
                setIsReady(true);
            }}
        />
    );
}
