import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { Form, Button, message, Select, Radio } from "dpl-react";
import { modalType } from "../../config";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import GroupSelect from "../groupSelect/index";
const FormItem = Form.Item;
// 布局
const formItemLayout = {
    labelCol: { offset: 2 },
    wrapperCol: { offset: 2, span: 20 },
};

function EditModal(props, refs) {
    const {
        form,
        data = {},
        type,
        onCancel,
        operationList = [],
        operationMatterList = [],
        onlineGroupList = [],
        inCallGroupList = [],
        isShowList = [],
        isShowMap,
    } = props;
    console.log(data)
    const { getFieldDecorator, validateFields, setFieldsValue } = form;
    const [loading, setLoading] = useState(false); // loading

    /**
     * 保存点击
     */
    const confirmHandler = () => {
        validateFields(async (err, values) => {
            if (!err) {
                console.log(values);
                if (
                    (!Array.isArray(values.operationMatterList) &&
                        !Array.isArray(values.onlineGroupList)) ||
                    (!values.onlineGroupInfo.groupList.length &&
                        !values.inCallGroupInfo.groupList.length &&
                        !values.operationMatterList.length)
                ) {
                    message.error("事项和不受理组不能同时为空");
                    return;
                }
                let sendData = {
                    matterCodeList: values.operationMatterList,
                };
                if (values?.onlineGroupInfo?.groupList?.length > 0) {
                    sendData.onlineGroupIdList =
                        values.onlineGroupInfo.groupList;
                    sendData.isShowOnline = values.onlineGroupInfo.isShow;
                }
                if (values?.inCallGroupInfo?.groupList.length > 0) {
                    sendData.incallGroupIdList =
                        values.inCallGroupInfo.groupList;
                    sendData.isShowIncall = values.inCallGroupInfo.isShow;
                }
                if (type === modalType.add.type) {
                    sendData.operateActionCodeList = values.operationList;
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
                url: Api.postOperationActionSave,
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
                url: Api.postOperationActionUpdate,
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
        <div className="edit-operation-manage-modal-box">
            <Form>
                <FormItem {...formItemLayout} label="运营动作">
                    {getFieldDecorator("operationList", {
                        initialValue: data.operationList || [],
                        rules: [
                            { required: true, message: "运营动作不能为空" },
                        ],
                    })(
                        <Select
                            placeholder="请选择运营动作"
                            disabled={type === modalType.edit.type || loading}
                            allowClear={true}
                            showSearch={true}
                            mode="multiple"
                            optionFilterProp="children"
                        >
                            {operationList.map((item, index) => {
                                return (
                                    <Option key={item.code} value={item.code}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="事项">
                    {getFieldDecorator("operationMatterList", {
                        initialValue: data.operationMatterList || [],
                    })(
                        <Select
                            placeholder="请选择事项"
                            disabled={loading}
                            allowClear={true}
                            showSearch={true}
                            mode="multiple"
                            optionFilterProp="children"
                        >
                            {operationMatterList.map((item, index) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="以下在线组的受理界面"
                    className="group-select"
                >
                    {getFieldDecorator("onlineGroupInfo", {
                        initialValue: {
                            groupList: data.onlineGroupList || [],
                            isShow: data.isShowOnline || isShowMap["N"].id,
                        },
                    })(
                        <GroupSelect
                            placeholder="请选择在线组"
                            disabled={loading}
                            allowClear={true}
                            modalTitle="在线业务组"
                            groupList={onlineGroupList}
                            isShowModalClear={true}
                            isShowList={isShowList}
                            isShowMap={isShowMap}
                        ></GroupSelect>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="以下来电组的受理界面"
                    className="group-select"
                >
                    {getFieldDecorator("inCallGroupInfo", {
                        initialValue: {
                            groupList: data.inCallGroupList || [],
                            isShow: data.isShowInCall || isShowMap["N"].id,
                        },
                    })(
                        <GroupSelect
                            placeholder="请选择来电组"
                            disabled={loading}
                            allowClear={true}
                            modalTitle="来电业务组"
                            groupList={inCallGroupList}
                            isShowModalClear={true}
                            isShowList={isShowList}
                            isShowMap={isShowMap}
                        ></GroupSelect>
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
