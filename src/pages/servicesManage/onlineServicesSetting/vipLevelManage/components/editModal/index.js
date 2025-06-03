import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { Form, Button, message, Select, Input } from "dpl-react";
import { modalType } from "../../config";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";

const FormItem = Form.Item;
// 布局
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

function EditModal(props, refs) {
    const {
        form,
        data = {},
        type,
        onCancel,
        empowerServiceList = [],
        empowerServiceMap = {},
        userTypeList = [],
        userTypeMap = [],
    } = props;
    const { getFieldDecorator, validateFields, setFieldsValue } = form;
    const [loading, setLoading] = useState(false); // loading

    /**
     * 保存点击
     */
    const confirmHandler = () => {
        validateFields(async (err, values) => {
            if (!err) {
                let sendData = {
                    empowerCode: values.empowerCode,
                    usertype: values.usertype,
                    remark: values.remark,
                };
                if (type === modalType.add.type) {
                    add(sendData);
                }
                if (type === modalType.edit.type) {
                    sendData.id = data.id;
                    update(sendData);
                }
            }
        });
    };

    /**
     * 新增
     */
    const add = async (data) => {
        try {
            setLoading(true);
            const res = await post({
                url: Api.postVipLevelSave,
                data,
            });
            if (res.success) {
                message.success("新增成功！");
                onCancel && onCancel(true);
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
                url: Api.postVipLevelUpdate,
                data,
            });
            if (res.success) {
                message.success("修改成功！");
                onCancel && onCancel(true);
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
    const cancelHandler = () => {
        onCancel && onCancel();
    };

    return (
        <div className="edit-vip-level-modal-box">
            <Form>
                <FormItem {...formItemLayout} label="授权">
                    {getFieldDecorator("empowerCode", {
                        initialValue: data.empowerCode,
                        rules: [{ required: true, message: "授权不能为空" }],
                    })(
                        <Select
                            placeholder="请选择授权"
                            disabled={type === modalType.edit.type || loading}
                            allowClear={true}
                            showSearch={true}
                            optionFilterProp="children"
                        >
                            {empowerServiceList.map((item, index) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="会员等级">
                    {getFieldDecorator("usertype", {
                        initialValue: data.usertype,
                        rules: [
                            { required: true, message: "会员等级不能为空" },
                        ],
                    })(
                        <Select
                            placeholder="请选择授权"
                            disabled={loading}
                            allowClear={true}
                            showSearch={true}
                            optionFilterProp="children"
                        >
                            {userTypeList.map((item, index) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="备注">
                    {getFieldDecorator("remark", {
                        initialValue: data.remark,
                    })(
                        <Input.TextArea
                            placeholder="请输入备注"
                            disabled={loading}
                            autosize={{ minRows: 4, maxRows: 6 }}
                            style={{ width: "100%" }}
                            maxLength={500}
                            showTextCount={true}
                        />
                    )}
                </FormItem>
            </Form>
            <div className="button-box">
                <Button
                    type="primary"
                    className="button-item"
                    loading={loading}
                    onClick={() => {
                        confirmHandler();
                    }}
                >
                    保存
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
    );
}

export default Form.create()(React.forwardRef(EditModal));
