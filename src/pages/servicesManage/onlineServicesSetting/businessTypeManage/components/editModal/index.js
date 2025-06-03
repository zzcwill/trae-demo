import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { Form, Button, message, Select } from "dpl-react";
import { post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";

const FormItem = Form.Item;
// 布局
const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

/**
 * 获取结果
 */
function getBrandTypeId(target, value) {
    let result;
    if (Array.isArray(target)) {
        for (let i = 0, len = target.length; i < len; i++) {
            const item = target[i];
            if (item.id == value) {
                return value;
            }
        }
    }
    return result;
}

function EditModal(props, refs) {
    const { form, data = {}, businessList = [], onCancel } = props;
    const { getFieldDecorator, validateFields, setFieldsValue } = form;
    const [loading, setLoading] = useState(false); // loading

    /**
     * 保存点击
     */
    const confirmHandler = () => {
        validateFields(async (err, values) => {
            if (!err) {
                let sendData = {
                    id: data.id,
                    brandTypeId: values.brandTypeId,
                };
                update(sendData);
            }
        });
    };

    /**
     * 修改
     */
    const update = async (data) => {
        try {
            setLoading(true);
            const res = await post({
                url: Api.postBrandUpdate,
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
        <div className="edit-business-type-modal-box">
            <Form>
                <FormItem {...formItemLayout} label="产品维度">
                    <span className='text'>{data?.name}</span>
                </FormItem>
                <FormItem {...formItemLayout} label="业务类型">
                    {getFieldDecorator("brandTypeId", {
                        initialValue: getBrandTypeId(
                            businessList,
                            data.brandTypeId
                        ),
                        rules: [
                            { required: true, message: "业务类型不能为空" },
                        ],
                    })(
                        <Select
                            placeholder="请选择业务类型"
                            disabled={loading}
                            allowClear={true}
                            showSearch={true}
                            optionFilterProp="children"
                        >
                            {businessList.map((item, index) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
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
