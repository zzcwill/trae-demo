import React, {useState, useEffect} from "react";
import "./index.scss";
import {Input, Button, message, Form, Select} from "dpl-react";
import {
    modelTypeList,
    landingPageTypeList,
    landingPageTypeMap,
    landingPageTyp,
    modelType,
} from "@/const/config";
import {editTypeMap} from "../../../../config";

const FormItem = Form.Item;
const Option = Select.Option;
const oneFormItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

function FormEdit(props) {
    const {form, formData = {}, onChange, onCancel, onNextStep, type} = props;
    const {
        getFieldDecorator,
        validateFields,
        setFieldsValue,
        getFieldsValue,
    } = form;
    const [landingTypeList, setLandingTypeList] = useState(() => {
        return [].concat(modelTypeList);
    });

    const validatorInput = (message, rule, value, callback) => {
        if (!value || !value.trim()) {
            callback(message);
        }
        callback();
    };

    const next = () => {
        form.validateFields((err, values) => {
            if (!err) {
                const result = {
                    name: (values.name && values.name.trim()) || undefined,
                    type: values.type,
                    modelType: values.modelType,
                    headerType: values.headerType,
                    description:
                        (values.description && values.description.trim()) || undefined,
                };
                onChange && onChange(result);
                onNextStep && onNextStep();
            }
        });
    };

    return (
        <div className="landing-form-edit-box">
            <Form>
                <FormItem label="落地页名称" {...oneFormItemLayout}>
                    {getFieldDecorator("name", {
                        rules: [
                            {required: true, message: []},
                            {
                                validator: (rule, value, callback) => {
                                    validatorInput("请输入落地页名称", rule, value, callback);
                                },
                            },
                        ],
                        initialValue: formData.name,
                    })(
                        <Input
                            autocomplete="off"
                            maxLength={20}
                            placeholder="请输入落地页名称"
                        ></Input>
                    )}
                </FormItem>
                <FormItem label="落地页类型" {...oneFormItemLayout}>
                    {getFieldDecorator("type", {
                        rules: [{required: true, message: "请选择落地页类型"}],
                        initialValue: formData.type,
                    })(
                        <Select
                            placeholder="请选择落地页类型"
                            style={{width: "250px"}}
                            disabled={formData.id || formData.id == 0}
                        >
                            {landingPageTypeList.map((item, index) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                    {type === editTypeMap.add && (
                        <span className="landing-type-tip">注意：保存后落地页类型不可修改</span>
                    )}
                </FormItem>
                <FormItem label="是否显示头部" {...oneFormItemLayout}>
                    {getFieldDecorator("headerType", {
                        initialValue: formData.headerType || 'Y',
                    })(
                        <Select
                            placeholder="请选择是否显示头部"
                            style={{width: "250px"}}
                        >
                            <Option value={'Y'}>
                                是
                            </Option>
                            <Option value={'N'}>
                                否
                            </Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="模板页" {...oneFormItemLayout}>
                    {getFieldDecorator("modelType", {
                        rules: [{required: true, message: "请选择模板"}],
                        initialValue: formData.modelType,
                    })(
                        <Select placeholder="请选择模板" style={{width: "250px"}}>
                            {landingTypeList.map((item, index) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                </FormItem>
                <FormItem label="备注信息" {...oneFormItemLayout}>
                    {getFieldDecorator("description", {
                        rules: [
                            {required: true, message: []},
                            {
                                validator: (rule, value, callback) => {
                                    validatorInput("请输入备注信息", rule, value, callback);
                                },
                            },
                        ],
                        initialValue: formData.description,
                    })(
                        <Input.TextArea
                            placeholder="请输入备注信息"
                            autocomplete="off"
                            maxLength={100}
                            autosize={{
                                minRows: 4,
                                maxRows: 5,
                            }}
                        />
                    )}
                </FormItem>
            </Form>
            <div className="button-box">
                <Button
                    type="primary"
                    className="button-item"
                    onClick={() => {
                        next();
                    }}
                >
                    下一步
                </Button>
                <div className="line-box"></div>
                <Button
                    className="button-item"
                    onClick={() => {
                        onCancel();
                    }}
                >
                    取消
                </Button>
            </div>
        </div>
    );
}

export default Form.create()(React.forwardRef(FormEdit));
