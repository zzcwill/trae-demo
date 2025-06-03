import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import {
    Input,
    Button,
    message,
    Form,
    Col,
    Row,
    Select,
    Modal,
} from "dpl-react";
import Api from "@/request/api-olhelpmanage.js";
import { get, post , postFileCommon } from "@/request/request";
import UploadImage from "@/components/common/uploadImage";
import { editTypeEnum } from "../../config";
import { sceneOfficialList, RightsServiceList } from "@/const/config";
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const oneFormItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};
const descriptionMaxLength = 150;
// 枚举中基础财税咨询code，用来判断是否H5图片必填
const basicCode = "1";
const imageType = {
    pc: {
        type: "pc",
        url: "imageUrl",
        name: "imageUrlName",
    },
    mobile: {
        type: "mobile",
        url: "mobileImageUrl",
        name: "mobileImageName",
    },
};

function EditModal(props) {
    const {
        className = "",
        form,
        brandList = [],
        serviceList = [],
        rightsServiceList = [],
        formData = {},
        config,
        onCancel,
    } = props;
    const { getFieldDecorator, validateFields, setFieldsValue } = form;
    const [loading, setLoading] = useState(false);
    const [isRequired, setIsRequired] = useState(false);
    const isRequiredValidateDataRef = useRef({});

    // 格式化
    const formatResult = (imgObj) => {
        return Object.assign({}, imgObj, {
            imageUrl: imgObj.domain + imgObj.imageUrl,
        });
    };

    // 上传图片
    const onUpload = (file) => {
        return postFileCommon({
            url: Api.saveImage,
            data: file,
        });
    };

    const formatData = (data) => {
        let descriptionText = data.description.replace(/\n+?/g, "<br/>");
        return {
            name: data.name.trim(),
            scene: data.scene,
            brand: data.brand,
            type: data.type,
            consultService: data.consultService,
            description: descriptionText,
            imageUrlName:
                data.imagePc && data.imagePc.length
                    ? data.imagePc[0].name
                    : undefined,
            imageUrl:
                data.imagePc && data.imagePc.length
                    ? data.imagePc[0].imageUrl
                    : undefined,
            mobileImageName:
                data.imageMobile && data.imageMobile.length
                    ? data.imageMobile[0].name
                    : undefined,
            mobileImageUrl:
                data.imageMobile && data.imageMobile.length
                    ? data.imageMobile[0].imageUrl
                    : undefined,
        };
    };

    // 保存
    const save = () => {
        form.validateFields((err, values) => {
            if (!err) {
                switch (config.type) {
                    case editTypeEnum.edit:
                        let result = formatData(values);
                        result.id = formData.id;
                        updateOfficialService(result);
                        break;
                    case editTypeEnum.add:
                        addOfficialService(formatData(values));
                        break;
                    default:
                        break;
                }
            }
        });
    };

    // 修改
    const updateOfficialService = async (data) => {
        setLoading(true);
        try {
            const res = await post({
                url: Api.postUpdateOfficialService,
                data,
            });
            if (res.success) {
                message.success("修改成功！");
                onCancel(editTypeEnum.edit);
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
            message.error("系统出错请联系管理员！");
        }
        setLoading(false);
    };

    // 新增
    const addOfficialService = async (data) => {
        setLoading(true);
        try {
            const res = await post({
                url: Api.postAddOfficialService,
                data,
            });
            if (res.success) {
                message.success("新增成功！");
                onCancel(editTypeEnum.add);
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
            message.error("系统出错请联系管理员！");
        }
        setLoading(false);
    };

    const initImage = (data, type) => {
        const typeMap = imageType[type];
        if (typeMap) {
            if (data[typeMap.url]) {
                return [].concat({
                    imageUrl: data[typeMap.url],
                    name: data[typeMap.name],
                });
            }
        }
        return undefined;
    };

    const validatorInput = (message, rule, value, callback) => {
        if (!value || !value.trim()) {
            callback(message);
        }
        callback();
    };

    // 回填到textArea的时候需要再次处理一次
    const getText = (str) => {
        try {
            if (str.length > descriptionMaxLength) {
                return str
                    .substring(0, descriptionMaxLength)
                    .replace(/\<br\/\>+?/g, "\n");
            }
            return str.replace(/\<br\/\>+?/g, "\n");
        } catch (e) {
            console.error(e);
            return "";
        }
    };

    const isRequiredOnChange = (type, val) => {
        isRequiredValidateDataRef.current[type] = val;
        if (
            isRequiredValidateDataRef.current.scene ===
                sceneOfficialList[0].id &&
            isRequiredValidateDataRef.current.type == basicCode
        ) {
            setIsRequired(true);
        } else {
            setIsRequired(false);
        }
    };

    useEffect(() => {
        if (formData && (formData.scene || formData.type)) {
            if (
                formData.scene === sceneOfficialList[0].id &&
                formData.type == basicCode
            ) {
                setIsRequired(true);
            }
            isRequiredValidateDataRef.current.scene = formData.scene;
            isRequiredValidateDataRef.current.type = formData.type;
        }
    }, [formData]);

    useEffect(() => {
        form.validateFields(["imageMobile"], { force: true });
    }, [isRequired]);

    return (
        <div className="service-edit-box">
            <Form>
                <Row>
                    <Col span={12}>
                        <FormItem label="产品维度" {...formItemLayout}>
                            {getFieldDecorator("brand", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择产品维度",
                                    },
                                ],
                                initialValue: formData.brand,
                            })(
                                <Select
                                    placeholder="请选择产品维度"
                                    disabled={loading}
                                    showSearch={true}
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {brandList.map((item, index) => {
                                        return (
                                            <Option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="咨询类别" {...formItemLayout}>
                            {getFieldDecorator("type", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择咨询类别",
                                    },
                                ],
                                initialValue: formData.type,
                            })(
                                <Select
                                    placeholder="请选择咨询类别"
                                    disabled={
                                        config.type === editTypeEnum.detail ||
                                        loading
                                    }
                                    onChange={(val) => {
                                        isRequiredOnChange("type", val);
                                    }}
                                >
                                    {serviceList.map((item, index) => {
                                        return (
                                            <Option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem label="卡片类型" {...oneFormItemLayout}>
                            {getFieldDecorator("scene", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择卡片类型",
                                    },
                                ],
                                initialValue: formData.scene,
                            })(
                                <Select
                                    placeholder="请选择卡片类型"
                                    disabled={
                                        config.type !== editTypeEnum.add ||
                                        loading
                                    }
                                    onChange={(val) => {
                                        isRequiredOnChange("scene", val);
                                    }}
                                >
                                    {sceneOfficialList.map((item, index) => {
                                        return (
                                            <Option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="咨询产品类型" {...formItemLayout}>
                            {getFieldDecorator("consultService", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择咨询产品类型",
                                    },
                                ],
                                initialValue: formData.consultService,
                            })(
                                <Select
                                    placeholder="请选择咨询产品类型"
                                    disabled={
                                        config.type !== editTypeEnum.add ||
                                        loading
                                    }
                                    onChange={(val) => {
                                        isRequiredOnChange("consultService", val);
                                    }}
                                >
                                    {rightsServiceList.map((item, index) => {
                                        return (
                                            <Option
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </Option>
                                        );
                                    })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <FormItem label="官方图片PC" {...formItemLayout}>
                            {getFieldDecorator("imagePc", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择pc端官方图片",
                                    },
                                ],
                                initialValue: initImage(
                                    formData,
                                    imageType.pc.type
                                ),
                            })(
                                <UploadImage
                                    width={240}
                                    height={140}
                                    disabled={
                                        config.type === editTypeEnum.detail ||
                                        loading
                                    }
                                    onUpload={onUpload}
                                    maxSize={2}
                                    className="edit-image-box"
                                    imgProp={"imageUrl"}
                                    isShowDelete={true}
                                    formatResult={formatResult}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem label="官方图片H5" {...formItemLayout}>
                            {getFieldDecorator("imageMobile", {
                                rules: [
                                    {
                                        required: isRequired,
                                        message: "请选择H5端官方图片",
                                    },
                                ],
                                initialValue: initImage(
                                    formData,
                                    imageType.mobile.type
                                ),
                            })(
                                <UploadImage
                                    width={240}
                                    height={140}
                                    disabled={
                                        config.type === editTypeEnum.detail ||
                                        loading
                                    }
                                    onUpload={onUpload}
                                    maxSize={2}
                                    className="edit-image-box"
                                    imgProp={"imageUrl"}
                                    isShowDelete={true}
                                    formatResult={formatResult}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem label="官方服务名称" {...oneFormItemLayout}>
                            {getFieldDecorator("name", {
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            validatorInput(
                                                "请输入官方服务名称",
                                                rule,
                                                value,
                                                callback
                                            );
                                        },
                                    },
                                    {
                                        required: true,
                                        message: "请输入官方服务名称",
                                    },
                                ],
                                initialValue: formData.name,
                            })(
                                <Input
                                    disabled={
                                        config.type === editTypeEnum.detail ||
                                        loading
                                    }
                                    autoComplete="off"
                                    maxLength={10}
                                    placeholder="请输入官方服务名称"
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <FormItem label="服务详情简介" {...oneFormItemLayout}>
                            {getFieldDecorator("description", {
                                rules: [
                                    {
                                        validator: (rule, value, callback) => {
                                            validatorInput(
                                                "请输入服务详情简介",
                                                rule,
                                                value,
                                                callback
                                            );
                                        },
                                    },
                                    {
                                        required: true,
                                        message: "请输入服务详情简介",
                                    },
                                ],
                                initialValue: formData.description
                                    ? getText(formData.description)
                                    : "",
                            })(
                                <Input.TextArea
                                    disabled={
                                        config.type === editTypeEnum.detail ||
                                        loading
                                    }
                                    rows={2}
                                    autosize={{ minRows: 3, maxRows: 5 }}
                                    maxLength={descriptionMaxLength}
                                    placeholder={`请输入服务详情简介，不能超过${descriptionMaxLength}个字`}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            {config.type !== editTypeEnum.detail && (
                <div className="button-box">
                    <Button
                        type="primary"
                        className="button-item"
                        loading={loading}
                        onClick={() => {
                            save();
                        }}
                    >
                        保存
                    </Button>
                    <div className="line-box"></div>
                    <Button
                        className="button-item"
                        disabled={loading}
                        onClick={() => {
                            onCancel();
                        }}
                    >
                        取消
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Form.create()(React.forwardRef(EditModal));
