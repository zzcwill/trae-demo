import ReactUeditor from "ifanrx-react-ueditor";
import React, { useRef, useState, useEffect } from "react";
import { message } from "dpl-react";
import { postFile } from "../../../request/request";
import api from "@/request/api-olhelpmanage";
import appConfig from "../../../../app.config";
import "./index.scss";
import icon_attach from "./image/icon_attach.png";
import icon_skip from "./image/consult.png";
import FileModal from "./components/fileModal";
import SkipModal from "./components/skipModal";

const baseToolBars = [
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
];
// 默认文件上传配置
const defaultUploadFileConfig = {
    imgSize: 3,
    fileSize: 100,
    fileNameLength: 200,
    totalSize: 1000,
    multiple: false,
};
export default function UEditor(props) {
    const {
        value = "",
        onChange,
        initHeight = 200,
        autoHeightEnabled = true,
        disabled = false,
        defaultValue,
        customizeConfig = {}, // 自定义配置
    } = props;
    // 控制类型，避免出错
    if (typeof customizeConfig !== "object") {
        customizeConfig = {};
    }
    const {
        customizeToolbars = [], // 自定义工具栏
        customizePlugins = [], // 插件
        uploadFileConfig = defaultUploadFileConfig, // 上传文件配置项
    } = customizeConfig;
    const [initValue, setInitValue] = useState(value);
    const [isOnchange, setIsOnchange] = useState(false);
    const ueditor = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const isReadyRef = useRef(false);
    const isInitRef = useRef(true);
    const [fileUploadShow, setFileUploadShow] = useState(false);
    const [skipModalOpen, setSkipModalOpen] = useState(false);

    const addFilePlugin = (ueditor) => {
        return {
            menuText: "上传附件",
            cssRules: `
          background-repeat:no-repeat;
          background-position: -622px -40px;
           ${disabled ? "opacity:0.3" : ""}
          `,
            onIconClick: async () => {
                if (disabled) return;
                setFileUploadShow(true);
                /* if (disabled) return
             const data = await uploadMultipartFile(api.commonUploadFile)
             if (data.success) {
               const url = data.data[0].domain +'/'+ data.data[0].fileUrl
               let editorInstance = editorRef.current.ueditor
               editorInstance.execCommand('inserthtml', `<p><img src="${icon_attach}" style="max-width: 100%"  alt="" ><a href=${url}>${data._file.name}</a></p>`)
             } else {
               message.error(data.message)
             }*/
            },
        };
    };

    const addCustomSkipPlugin = (ueditor) => {
        return {
            menuText: "自定义跳转",
            cssRules: 'background: url(' + icon_skip + ') !important; background-size: 20px 20px !important;width:100px !important;height:20px !important;',
            onIconClick: async () => {
                if (disabled) return;
                setSkipModalOpen(true);
            },
        };
    };

    let plugins = ["uploadImage"];
    let customizeToolbarsList = customizeToolbars.filter((item) => {
        if (item === "attachment") {
            plugins.push(addFilePlugin);
            return false;
        }else if(item === "customskip") {
            plugins.push(addCustomSkipPlugin);
        }
        return true;
    });
    const config = {
        toolbars: [[].concat(baseToolBars, customizeToolbarsList)],
        initialFrameWidth: "100%",
        initialFrameHeight: initHeight,
        retainOnlyLabelPasted: true, // 粘贴只保留标签
        pasteplain: true, //粘贴只保留纯文本
        autoHeightEnabled: autoHeightEnabled, //是否自动长高
    };
    plugins.concat(customizePlugins);

    const onFileUploadOk = (fileList) => {
        setFileUploadShow(false);
        fileList.forEach((item) => {
            const url = item.filePath;
            let editorInstance = ueditor.current.ueditor;
            editorInstance.execCommand(
                "inserthtml",
                `<p><img src="${icon_attach}" style="max-width: 100%;vertical-align: bottom;"  alt="" ><a href=${url} target="_blank">${item.name}</a></p>`
            );
        });
    };

    const onSkipOk = (params) => {
        setSkipModalOpen(false);
        let editorInstance = ueditor.current.ueditor;
        editorInstance.execCommand(
            "inserthtml",
            `<a href="" class="${params.skipType}" id="${params.skipType}" target="_blank">${params.skipText}</a>`
        );
        // <a style="color: #2c85d9;" href="${params.skipType}" target="_blank">${params.skipText}</a>
    };
    const uploadImage = (e) => {
        if (disabled) return;
        const nameLength = 100;
        const fileSize = 5;
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
            postFile({
                url: api.saveImage,
                data: {
                    file: e.target.files[0],
                },
            }).then((data) => {
                if (data.success) {
                    editorInstance.focus();
                    editorInstance.execCommand(
                        "inserthtml",
                        `<p><img src="${
                            data.data.domain + data.data.imageUrl
                        }" style="max-width: 100%"  alt="" ></p>`
                    );
                } else {
                    message.error(data.message);
                }
            });
        }
        return null;
    };
    const changeHandler = (e) => {
        console.log("changeHandler");
        if (isInitRef.current === false && disabled === true) {
            //不是初始化
            return;
        }
        if (isReadyRef.current) {
            if (isInitRef.current && !e) {
                isInitRef.current = false;
                return;
            }

            isInitRef.current = false;
            setIsOnchange(true);
            onChange(e);
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
        console.log("setDisabled", isReady, disabled);
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
    useEffect(() => {
        // 用来初始化在Form中使用ueditor
        setInitValue(defaultValue);
        //  defaultValue && onChange(defaultValue)
    }, [defaultValue]);

    return (
        <div>
            <ReactUeditor
                config={config}
                ueditorPath={`${appConfig.publicPath}/ueditor`}
                debug
                plugins={plugins}
                value={initValue}
                onChange={changeHandler}
                uploadImage={uploadImage}
                ref={ueditor}
                onReady={() => {
                    isReadyRef.current = true;
                    setIsReady(true);
                }}
            />
            <FileModal
                visible={fileUploadShow}
                imgSize = {uploadFileConfig.imgSize}
                fileSize = {uploadFileConfig.fileSize}
                fileNameLength = {uploadFileConfig.fileNameLength}
                totalSize = {uploadFileConfig.totalSize}
                multiple = {uploadFileConfig.multiple}
                onOk={onFileUploadOk}
                onCancel={() => {
                    setFileUploadShow(false);
                }}
            />
            <SkipModal
                visible={skipModalOpen}
                onOk={onSkipOk}
                onCancel={() => {
                    setSkipModalOpen(false);
                }}
            />
        </div>
    );
}

/*export default function(props){
    const {value,onChange} = props
    console.log(value)
    return <input value={value} onChange={onChange}/>
}*/
