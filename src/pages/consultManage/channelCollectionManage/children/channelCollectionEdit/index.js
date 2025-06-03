import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import qs from "qs";
import history from "@/history";
import classnames from "classnames";
import { Input, Button, message, Modal } from "dpl-react";
import { uForm } from "dora";
import { editTypeMap } from "../../config";
import { createUrl } from "../../utils";
import ClipboardButton from "../../component/clipboardButton";
import successImg from "../../images/success.png";
import TextArea from '@/components/common/textArea';

const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
    FormSlot,
    FormEffectHooks,
} = uForm;
const actions = createFormActions();
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
};
function ChannelCollectionEdit(props) {
    const { onFieldValueChange$ } = FormEffectHooks;
    const [queryParams, setQueryParams] = useState({}); // 按钮表单参数
    const [editType, setEditType] = useState(""); // 编辑类型
    const [loading, setLoading] = useState(false); // loading
    const sourceIdRef = useRef(null);
    const [result, setResult] = useState({
        visible: false,
    });

    /**
     * 获取按钮详情
     */
    const getChannelCollectionDetail = async (id) => {
        try {
            const res = await get({
                url: Api.getPromotionChannelDetail,
                params: { id },
            });
            if (res.success) {
                const data = res.data;
                setQueryParams({
                    ...data,
                });
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 保存点击
     */
    const confirmHandler = () => {
        actions.submit().then(async (res) => {
            const { values } = res;
            let sendData = {
                name: values.name && values.name.trim(),
                originalUrl: values.originalUrl && values.originalUrl.trim(),
                remark: values.remark && values.remark.trim(),
            };
            if (editType === editTypeMap.add.type) {
                add(sendData);
            }

            if (editType === editTypeMap.edit.type) {
                if (!sourceIdRef.current) {
                    return;
                }
                sendData.id = sourceIdRef.current;
                update(sendData);
            }
        });
    };

    const cancelResult = () => {
        setResult({
            visible: false,
        });
        cancelHandler();
    };

    const showResult = (data = {}) => {
        const resultData = Object.assign({}, result, {
            visible: true,
            ...data,
            publicityUrl: createUrl(data.originalUrl, {
                sourceId: data.promotionId,
            }),
        });
        setResult(resultData);
    };

    /**
     * 新增
     */
    const add = async (data) => {
        try {
            setLoading(true);
            const res = await post({
                url: Api.postPromotionChannelSave,
                data,
            });
            if (res.success) {
                message.success("新增成功！");
                showResult(Object.assign({}, res.data, data));
            } else {
                message.error(res.message);
            }
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    /**
     * 修改
     */
    const update = async (data) => {
        try {
            setLoading(true);
            const res = await post({
                url: Api.postPromotionChannelUpdate,
                data,
            });
            if (res.success) {
                message.success("修改成功！");
                showResult(Object.assign({}, res.data, data));
            } else {
                message.error(res.message);
            }
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    /**
     * 取消
     */
    const cancelHandler = (id) => {
        const url = `/consultManage/channelCollectionManage`;
        history.push(url);
    };

    // 初始化
    useEffect(() => {
        const queryString = qs.parse(window.location.href.split("?")[1]);
        // 没有地区配置的无法添加按钮配置信息
        if (queryString.id) {
            sourceIdRef.current = queryString.id;
            getChannelCollectionDetail(queryString.id);
        }
        let type = queryString.type || editTypeMap.add.type;
        setEditType(type);
    }, []);

    return (
        <div className="channel-collection-edit-box">
            <div className="content">
                <div className="header-box">
                    <span className="title">
                        {(editTypeMap[editType] &&
                            editTypeMap[editType].name) ||
                            ""}
                    </span>
                </div>
                <div className="form-box">
                    <SchemaForm
                        components={{
                            TextArea,
                        }}
                        initialValues={queryParams}
                        actions={actions}
                    >
                        <Field
                            type="string"
                            name="name"
                            x-component="Input"
                            title="渠道名称"
                            x-rules={[
                                {
                                    message: "请输入渠道名称",
                                    required: true,
                                    whitespace: true,
                                },
                            ]}
                            {...formItemLayout}
                            x-component-props={{
                                placeholder:
                                    "请输入渠道名称，如QQ群，限制100字符",
                                maxLength: "100",
                                autoComplete: "off",
                                allowClear: true,
                                disabled: loading,
                            }}
                        />
                        <Field
                            type="string"
                            name="originalUrl"
                            x-component="Input"
                            title="原始链接"
                            x-rules={[
                                {
                                    message: "请输入原始链接",
                                    required: true,
                                    whitespace: true,
                                },
                            ]}
                            {...formItemLayout}
                            x-component-props={{
                                placeholder:
                                    "请输入网站地址，如http://consult.17win.com/，限制2000字符",
                                maxLength: "2000",
                                autoComplete: "off",
                                disabled: loading,
                                allowClear: true,
                            }}
                        />
                        <Field
                            type="string"
                            name="remark"
                            x-component="TextArea"
                            title="备注"
                            {...formItemLayout}
                            x-component-props={{
                                placeholder: "请输入备注，限制500字符",
                                maxLength: "500",
                                autoComplete: "off",
                                disabled: loading,
                                allowClear: true,
                                autosize: { minRows: 4, maxRows: 6 },
                            }}
                        />
                    </SchemaForm>
                </div>
                <div className="option-box">
                    <Button
                        type="primary"
                        className="button-item"
                        loading={loading}
                        onClick={() => {
                            confirmHandler();
                        }}
                    >
                        一键生成推广链接
                    </Button>
                    <div className="line-box"></div>
                    <Button
                        className="button-item"
                        disabled={loading}
                        onClick={() => {
                            cancelHandler();
                        }}
                    >
                        取消
                    </Button>
                </div>
            </div>
            <Modal
                footer={null}
                destroyOnClose
                title="创建结果"
                visible={result.visible}
                onCancel={() => {
                    cancelResult();
                }}
                width={650}
                className="channel-collection-modal"
            >
                {result.publicityUrl && (
                    <div className="channel-collection-modal-content">
                        <div className="channel-collection-result">
                            <div className="item-box">
                                <img
                                    className="success-icon"
                                    src={successImg}
                                />
                            </div>
                            <div className="item-box">
                                <div className="header text-bold">
                                    推广链接已创建成功
                                </div>
                                <div className="url text-bold">
                                    {result.publicityUrl}
                                </div>
                                <div className="data-item text">
                                    <span className="label">渠道名称</span>
                                    <span>{result.name}</span>
                                </div>
                                <div className="data-item text">
                                    <span className="label">原始链接</span>
                                    <span>{result.originalUrl}</span>
                                </div>
                            </div>
                        </div>
                        <div className="button-box">
                            <ClipboardButton
                                type="primary"
                                url={result.publicityUrl}
                                className="button-item"
                            >
                                复制链接
                            </ClipboardButton>
                            <div className="line-box"></div>
                            <Button
                                className="button-item"
                                onClick={() => {
                                    cancelHandler();
                                }}
                            >
                                返回列表页
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default ChannelCollectionEdit;
