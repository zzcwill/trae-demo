import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { message, Button, Form, Row, Input, Icon } from "dpl-react";
import { get, post } from "@/request/request";
import API from "@/request/api-callcentermanage";
import FormFilter from "@/components/common/formFilter";
// 文件类型
const fileType = [
    ".bat",
    ".cll",
    ".db",
    ".dll",
    ".doc",
    ".docx",
    ".exe",
    ".ini",
    ".json",
    ".mui",
    ".ncc",
    ".ocx",
    ".pdf",
    ".png",
    ".rar",
    ".rav",
    ".rep",
    ".scf",
    ".xls",
    ".xlsx",
    ".xml",
    ".zip",
];

export default function EmailTemplateEdit(props) {
    const {
        emailId = "",
        type = "add",
        onCancel,
        detail = {},
        areaList = [],
        emailType = [],
    } = props;
    const formFilterRef = useRef(null);
    const [disabled, setDisabled] = useState(() => {
      return type === "detail";
    }); // disabled状态
    const [loading, setLoading] = useState(false); // loading
    const [buttonDisabled, setButtonDisabled] = useState(false); //按钮禁止点击

    /**
     * 查询模块配置
     */
    const filterConfig = [
        {
            type: "select", // string 组件类型 必填
            span: 24,
            key: "areaCodeList", // string 字段名称 必填
            label: "地区", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            options: areaList, // 选项
            initialValue: detail.areaCodeList || [], // any 默认值 该情况
            rules: [
                {
                    required: true,
                    message: "地区不能为空！",
                },
            ],
            other: {
                placeholder: "请选择地区",
                disabled: type === "edit" || disabled,
                mode: "multiple",
                optionFilterProp: "children",
                allowClear: true,
            }, // input中的其他可取字段内容
        },
        {
            type: "select", // string 组件类型 必填
            span: 24,
            key: "emailTypeCode", // string 字段名称 必填
            label: "邮件类型", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            options: emailType, // 选项
            initialValue: detail.emailTypeCode, // any 默认值 该情况
            rules: [
                {
                    required: true,
                    message: "邮件类型不能为空！",
                },
            ],
            other: {
                placeholder: "请选择邮件类型",
                disabled: disabled,
            }, // input中的其他可取字段内容
        },
        {
            type: "input", // string 组件类型 必填
            span: 24,
            key: "templateName", // string 字段名称 必填
            label: "模板名称", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            initialValue: detail.templateName, // any 默认值 该情况
            rules: [
                {
                    required: true,
                    message: "模板名称不能为空！",
                },
            ],
            other: {
                placeholder: "请输入邮件模板名称",
                disabled: disabled,
                maxLength: 100,
            }, // input中的其他可取字段内容
        },
        {
            type: "fileUpload", // string 组件类型 必填
            span: 24,
            mode: "list",
            key: "attachmentList", // string 字段名称 必填
            label: "附件列表", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            initialValue: detail.attachmentList, // any 默认值 该情况
            other: {
                action: API.uploadFile,
                fileSize: 100,
                nameLength: "100",
                isDownloadFile: true,
                maxLength: 5,
                format: {
                    name: "name",
                    path: "filePath",
                },
                beforeUpload: (files) => {
                    setButtonDisabled(true);
                    return {
                        file: files,
                        type: "email",
                    };
                },
                afterUpload: (res) => {
                    setButtonDisabled(false);
                },
                disabled: disabled,
                downloadFunc: (file) => {
                    window.open(
                        window.location.origin +
                            API.downloadFile.replace(
                                "${path}",
                                encodeURIComponent(
                                    encodeURIComponent(file.filePath)
                                )
                            )
                    );
                },
            }, // input中的其他可取字段内容
        },
        {
            type: "uEditor", // string 组件类型 必填
            mode: "textarea",
            span: 24,
            key: "content", // string 字段名称 必填
            label: "模板正文", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            initialValue: detail.emailContent, // any 默认值 该情况
            other: {
                className: "email-edit-textarea",
                initHeight: 200,
                autoHeightEnabled: true,
                uploadImageUrl: API.uploadFile,
                beforeUpload: (files) => {
                    return {
                        file: files[0],
                        type: "picture",
                    };
                },
                size:2,
                format: {
                    path: "filePath",
                },
                disabled: disabled,
            }, // input中的其他可取字段内容
        },
    ];

    /**
     * 格式化处理
     * @param {Object} value
     */
    const formatParam = (value, id) => {
        let param = {
            areaCodeList: value.areaCodeList || undefined,
            emailTypeCode: value.emailTypeCode || undefined,
            templateName: value.templateName || undefined,
            content: value.content || undefined,
            attachmentList:
                value.attachmentList && value.attachmentList.length > 0
                    ? value.attachmentList
                    : undefined,
        };
        if (id) {
            param.id = id;
        }
        return param;
    };

    /**
     * 保存按钮点击事件
     */
    const saveEmailTemplate = () => {
        formFilterRef.current.validateData((success, value) => {
            if (success) {
                if (type === "add") {
                    const data = formatParam(value);
                    addEmailTemplate(data);
                } else if (type === "edit") {
                    const data = formatParam(value, detail.id);
                    updataEmailTemplate(data);
                }
            }
        });
    };

    /**
     * 新增邮件模板
     */
    const addEmailTemplate = async (data) => {
        setLoading(true);
        const res = await post({
            url: API.addEmailConfig,
            data,
        });
        if (res.success) {
            message.success("新增邮件模板成功！");
            onCancel && onCancel(true);
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };

    /**
     * 更新邮件模板
     * @param {Object} data
     */
    const updataEmailTemplate = async (data) => {
        setLoading(true);
        const res = await post({
            url: API.updataEmailConfig,
            data,
        });
        if (res.success) {
            message.success("修改邮件模板成功！");
            onCancel && onCancel(true);
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };

    return (
        <div className="email-template-edit">
            <div className="form-box">
                <FormFilter config={filterConfig} ref={formFilterRef} />
            </div>
            <div className="button-box">
                {type !== "detail" && (
                    <div className="center">
                        <Button
                            type="primary"
                            className="search-button"
                            loading={loading}
                            onClick={() => {
                                saveEmailTemplate();
                            }}
                            disabled={buttonDisabled}
                        >
                            保存
                        </Button>
                        <div className="line-box"></div>
                        <Button
                            className="search-button"
                            loading={loading}
                            disabled={buttonDisabled}
                            onClick={() => {
                                onCancel();
                            }}
                            
                        >
                            取消
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
