import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Form, Row, Col, Select, Input } from "dpl-react";
import SelectAll from "@/components/common/selectAll";
import { modalType,tagTypeMap } from "../../config";
import TagSelect from "../tagSelect";
const FormItem = Form.Item;
// 布局
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
function TagSetting(props) {
    const {
        form,
        type,
        loading,
        data = {},
        labelType = "",
        currentLabelType,
        isValidate, // 是否出发校验
        locationList = [],
        consultServiceList = [],
        channelList = [],
        tagTypeList = [],
        callBack,
    } = props;
    const {
        getFieldDecorator,
        validateFields,
        getFieldInstance,
        setFieldsValue,
        resetFields,
    } = form;

    const [isRequired, setIsRequired] = useState(false);

    const validateFieldsFunc = () => {
        validateFields(async (err, values) => {
            if (!err) {
                let sendData = {
                    module: values.module,
                    tagType: values.tagInfo && values.tagInfo.tagType,
                };
                // 新增的时候，多选（后端保存之后会拆成多条数据），并且接收数组，修改的时候只接收字符串，所以特殊处理
                if (type === modalType.add.type) {
                    sendData.tagList = values.tagInfo && values.tagInfo.tagId;
                    sendData.locationList = values.location;
                    sendData.consultServiceList = values.consultService;
                    sendData.channelList = values.channel;
                } else {
                    sendData.location = values.location;
                    sendData.channel = values.channel;
                    sendData.consultService = values.consultService;
                    sendData.tagCode = values.tagInfo && values.tagInfo.tagId;
                }
                callBack && callBack(true, sendData);
            } else {
                callBack && callBack(false, null);
            }
        });
    };

    const tagInfoValidator = (rule, value, callback) => {
        let tagTypeName = "";
        if(tagTypeMap[value.tagType]){
            tagTypeName = tagTypeMap[value.tagType].label
        }
        if (value && value.tagType && (!value.tagId || value.tagId.length === 0)) {
            callback(
                `选择了${tagTypeName || "企业"}类型必须选择${
                    tagTypeName || "企业"
                }标签`
            );
        } else {
            callback();
        }
    };

    /**
     * tagSelect 修改的时候
     */
    const tagSelectOnChange = (value) => {
        if (value && value.tagType) {
            setIsRequired(true);
        } else {
            setIsRequired(false);
        }
    };

    const getDisabled = () => {
        return currentLabelType !== labelType ||
        loading
    }
    useEffect(() => {
        if (data && data.configType === labelType && !data.tagType) {
            setIsRequired(false);
        }
    }, [data]);

    useEffect(() => {
        if (isValidate && isValidate.type === labelType) {
            validateFieldsFunc();
        }
    }, [isValidate]);

    useEffect(() => {
        if (currentLabelType !== labelType) {
            resetFields();
        }
    }, [currentLabelType]);
    return (
        <div className="vip-tag-setting-box">
            <Form>
                <Row>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="适用地区">
                            {getFieldDecorator("location", {
                                initialValue: data.location,
                                rules: [
                                    {
                                        required: true,
                                        message: "请选择使用地区",
                                    },
                                ],
                            })(
                                <SelectAll
                                    options={locationList}
                                    isShowTitle
                                    allowClear
                                    placeholder="请选择适用地区"
                                    showSearch
                                    mode={
                                        type === modalType.add.type
                                            ? "multiple"
                                            : undefined
                                    }
                                    maxTagCount="2"
                                    optionFilterProp="children"
                                    disabled={
                                        type === modalType.edit.type ||
                                        currentLabelType !== labelType ||
                                        loading
                                    }
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="咨询产品类型">
                            {getFieldDecorator("consultService", {
                                initialValue: data.consultService,
                            })(
                                <Select
                                    allowClear
                                    placeholder="请选择咨询产品类型"
                                    showSearch
                                    optionFilterProp="children"
                                    mode={
                                        type === modalType.add.type
                                            ? "multiple"
                                            : undefined
                                    }
                                    maxTagCount="2"
                                    disabled={getDisabled()}
                                >
                                    {Array.isArray(consultServiceList) &&
                                        consultServiceList.map((item) => {
                                            return (
                                                <Select.Option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </Select.Option>
                                            );
                                        })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="适用渠道">
                            {getFieldDecorator("channel", {
                                initialValue: data.channel,
                            })(
                                <Select
                                    allowClear
                                    placeholder="请选择适用渠道"
                                    showSearch
                                    optionFilterProp="children"
                                    mode={
                                        type === modalType.add.type
                                            ? "multiple"
                                            : undefined
                                    }
                                    maxTagCount="2"
                                    disabled={
                                        type === modalType.edit.type ||
                                        currentLabelType !== labelType ||
                                        loading
                                    }
                                >
                                    {Array.isArray(channelList) &&
                                        channelList.map((item) => {
                                            return (
                                                <Select.Option
                                                    key={item.value}
                                                    value={item.value}
                                                >
                                                    {item.label}
                                                </Select.Option>
                                            );
                                        })}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="模块">
                            {getFieldDecorator("module", {
                                initialValue: data.module,
                            })(
                                <Input
                                    placeholder="请输入模块"
                                    maxLength="20"
                                    autoComplete="off"
                                    disabled={getDisabled()}
                                />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="标签">
                            {getFieldDecorator("tagInfo", {
                                initialValue: {
                                    tagType:
                                        data.tagType || undefined,
                                    tagId: data.tagCode || null,
                                },
                                rules: [
                                    { required: isRequired, message: [] },
                                    { validator: tagInfoValidator },
                                ],
                            })(
                                <TagSelect
                                    type={type}
                                    onChange={tagSelectOnChange}
                                    disabled={getDisabled()}
                                    tagTypeList={tagTypeList}
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default Form.create()(React.forwardRef(TagSetting));
