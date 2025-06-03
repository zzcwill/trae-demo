/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2021-09-13 14:30:19
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-06-06 10:26:11
 * @FilePath: /askone-manage-pc/src/components/consultManage/ueditor/components/fileModal/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useRef, useEffect } from "react";
import { Modal, Button, message } from "dpl-react";
import "./index.scss";
import { postFileCommon } from "@/request/request";
import Api from "@/request/api-olhelpmanage";

/**TODO:图片和文件上传，添加LOADING*/
export default function FileModal(props) {
    const {
        onOk,
        onCancel,
        visible = true,
        imgSize = 100,
        fileSize = 100,
        fileNameLength = 200,
        totalSize = 1000,
        multiple = false,
    } = props;
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);
    const fileChange = (e) => {
        let result = [];
        e.target.files.forEach((file) => {
            let imgReg = /(\.gif|\.jpeg|\.png|\.jpg)$/i;
            let fileReg =
                /(\.doc|\.docx|\.txt|\.xls|\.xlsx|\.zip|\.rar|\.pdf|\.ppt|\.pptx|\.bmp)$/i;
            if (imgReg.test(file.name)) {
                if (file.size > 1024 * 1024 * imgSize) {
                    file.errorTips = "只能上传小于3M的图片";
                }
            } else if (fileReg.test(file.name)) {
                if (file.size > 1024 * 1024 * fileSize) {
                    file.errorTips = `只能上传小于${fileSize}M的文件`;
                }
                if (file.name.length > fileNameLength) {
                    file.errorTips = "文件名称过长";
                }
            } else {
                file.errorTips = "文件格式不合法";
            }
            result.push(file);
        });
        setFileList(fileList.concat(result));
        inputRef.current.value = "";
    };
    const deleteFile = (index) => {
        let arr = [...fileList];
        arr.splice(index, 1);
        setFileList(arr);
    };
    const handleConfirm = async () => {
        const list = fileList.filter((item) => {
            return !item.errorTips;
        });
        let size = list.reduce((total, num) => {
            return total + num.size;
        }, 0);
        if (multiple && size > 1024 * 1024 * totalSize) {
            message.error(`文件大小不能超过${totalSize}M`);
            return;
        }
        if (list.length === 0) {
            message.error("请选择正确的文件");
            return;
        }
        setLoading(true);
        const res = await postFileCommon({
            url: Api.postUploadFile,
            data: { file: list, type: "file" },
        });
        if (res.success) {
            const data = res.data;
            let result = [];
            if (!Array.isArray(data)) {
                result.push(data);
            } else {
                result = data;
            }
            onOk(result);
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        setFileList([]);
    }, [visible]);
    return (
        <Modal
            className="file-modal"
            visible={visible}
            title="上传文件"
            onOk={handleConfirm}
            onCancel={onCancel}
            confirmLoading={loading}
        >
            <Button
                type="primary"
                disabled={multiple ? false : fileList.length > 0}
                onClick={() => {
                    inputRef.current.click();
                }}
            >
                文件浏览
            </Button>
            <div className="file-list">
                {fileList.map((item, index) => {
                    return (
                        <div className="item" key={index}>
                            <p
                                title={item.name}
                                className={item.errorTips ? "error" : ""}
                            >
                                {item.name}
                            </p>
                            <div className="right">
                                {item.errorTips && (
                                    <span className="tips">
                                        ({item.errorTips})
                                    </span>
                                )}
                                <span
                                    className="close"
                                    onClick={() => {
                                        deleteFile(index);
                                    }}
                                ></span>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="warn-tips">
                <span>
                    注意：单张图片大小不能大于{imgSize}m，单个文件大小不能超过
                    {fileSize}M。
                </span>
                {multiple && <span>总大小不能超过1000M。</span>}
                <span>错误文件将不会被上传</span>
            </div>
            <input
                type="file"
                ref={inputRef}
                onChange={fileChange}
                multiple={multiple ? "multiple" : null}
                style={{ display: "none" }}
            />
        </Modal>
    );
}
