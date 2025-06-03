import React, { useState, useEffect } from "react";
import "./index.scss";
import { message, Select, Modal, Checkbox, Button } from "dpl-react";
import { post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { isArray } from "@/utils/index";
import ModalSelect from "@/components/common/modalSelect";
const Option = Select.Option;
// 组类型
const groupTypeList = [
    {
        id: "1",
        name: "电话",
    },
    {
        id: "2",
        name: "在线",
    },
];
// 校验参数
const validateFields = [
    {
        key: "groupTypeList",
        message: "组类型不能为空",
        rules: (data) => {
            return isArray(data) && data.length > 0;
        },
    },
    {
        key: "incallGroupIdList",
        message: "组类型选择为电话时电话组不能为空",
        beforeRules: (detail) => {
            return (
                detail.groupTypeList &&
                detail.groupTypeList.indexOf(groupTypeList[0].id) > -1
            );
        },
        rules: (data) => {
            return isArray(data) && data.length > 0;
        },
    },
    {
        key: "onlineGroupIdList",
        message: "组类型选择为在线时在线组不能为空",
        beforeRules: (detail) => {
            return (
                detail.groupTypeList &&
                detail.groupTypeList.indexOf(groupTypeList[1].id) > -1
            );
        },
        rules: (data) => {
            return isArray(data) && data.length > 0;
        },
    },
];

export default function BatchEdit(props) {
    const { idList, callGroupList, onlineGroupList, closeModal, batchType } =
        props;
    const [batchData, setBatchData] = useState({
        groupTypeList: [], // 组类型
        incallGroupIdList: [], // 电话组Id列表
        onlineGroupIdList: [], // 在线组Id列表
    }); // 接口入参
    const [isDisabled, setIsDisabled] = useState({
        call: true, // 电话
        online: true, // 在线
    }); // 禁用状态
    const [loading, setLoading] = useState(false); // loading

    /**
     * 参数修改
     */
    const batchDataChange = (type, value) => {
        let data = Object.assign({}, batchData);
        switch (type) {
            case "groupTypeList":
                if (!value.length) {
                    Modal.warning({
                        content: "岗位必须选择一个，不可取消",
                        okText: "确定",
                    });
                    return;
                }
                let obj = {
                    call: true,
                    online: true,
                };
                value.forEach((item) => {
                    if (item == groupTypeList[0].id) {
                        obj.call = false;
                    } else {
                        obj.online = false;
                    }
                });
                data.groupTypeList = value;
                setBatchData(data);
                setIsDisabled(obj);
                break;
            default:
                data[type] = value;
                setBatchData(data);
                break;
        }
    };

    /**
     * 保存操作
     */
    const save = () => {
        const isError = checkData(batchData);
        if (isError) {
            return;
        }
        const sendData = {
            idList,
            groupTypeList: batchData.groupTypeList,
            incallGroupIdList:
                batchData.groupTypeList.indexOf(groupTypeList[0].id) > -1
                    ? batchData.incallGroupIdList
                    : undefined,
            onlineGroupIdList:
                batchData.groupTypeList.indexOf(groupTypeList[1].id) > -1
                    ? batchData.onlineGroupIdList
                    : undefined,
        };
        switch (batchType) {
            case "add":
                batchAddGroup(sendData);
                break;
            case "updata":
                batchUpdataGroup(sendData);
                break;
            case "delete":
                batchDeleteGroup(sendData);
                break;
            default:
                break;
        }
    };

    /**
     * 校验参数
     */
    const checkData = (checkData) => {
        for (let j = 0, len = validateFields.length; j < len; j++) {
            const config = validateFields[j];
            if (config.beforeRules) {
                if (
                    config.beforeRules(checkData) &&
                    !config.rules(checkData[config.key])
                ) {
                    modalWarning(config.message);
                    return true;
                }
            } else if (!config.rules(checkData[config.key])) {
                modalWarning(config.message);
                return true;
            }
        }
        return false;
    };

    /**
     * warning提示弹出
     */
    const modalWarning = (content) => {
        Modal.warning({
            content,
            okText: "确定",
        });
    };

    /**
     * 批量新增组
     */
    const batchAddGroup = async (sendData) => {
        setLoading(true);
        try {
            const res = await post({
                url: Api.postBatchAddGroup,
                data: sendData,
            });
            if (res.success) {
                message.success("批量新增组成功！");
                closeModal(true);
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
            message.error("系统出错，请联系管理员");
        }
        setLoading(false);
    };
    /**
     * 批量修改组
     */
    const batchUpdataGroup = async (sendData) => {
        setLoading(true);
        try {
            const res = await post({
                url: Api.postBatchUpdataGroup,
                data: sendData,
            });
            if (res.success) {
                message.success("批量修改组成功！");
                closeModal(true);
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
            message.error("系统出错，请联系管理员");
        }
        setLoading(false);
    };
    /**
     * 批量删除组
     */
    const batchDeleteGroup = async (sendData) => {
        setLoading(true);
        try {
            const res = await post({
                url: Api.postBatchDeleteGroup,
                data: sendData,
            });
            if (res.success) {
                message.success("批量删除组成功！");
                closeModal(true);
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
            message.error("系统出错，请联系管理员");
        }
        setLoading(false);
    };

    useEffect(() => {
        setBatchData({
            groupTypeList: [], // 组类型
            incallGroupIdList: [], // 电话组Id列表
            onlineGroupIdList: [], // 在线组Id列表
        });
        setIsDisabled({
            call: true, // 电话
            online: true, // 在线
        });
    }, [batchType]);

    return (
        <div className="batch-edit-box">
            <div className="edit-item">
                <div className="item-label">
                    <span className="message-required">*</span>
                    <span>组类型&nbsp;:&nbsp;</span>
                </div>
                <div className="item-context">
                    <Checkbox.Group
                        value={batchData.groupTypeList}
                        onChange={(value) => {
                            batchDataChange("groupTypeList", value);
                        }}
                    >
                        {groupTypeList.map((item) => {
                            return (
                                <Checkbox key={item.id} value={item.id}>
                                    {item.name}
                                </Checkbox>
                            );
                        })}
                    </Checkbox.Group>
                </div>
            </div>
            <div className="edit-item">
                <div className="item-label">
                    {batchData.groupTypeList.indexOf(groupTypeList[0].id) >
                        -1 && <span className="message-required">*</span>}
                    <span>电话组&nbsp;:&nbsp;</span>
                </div>
                <div className="item-context">
                    <ModalSelect
                        value={batchData.incallGroupIdList}
                        placeholder="请选择电话组"
                        className="context-components"
                        disabled={isDisabled.call}
                        onChange={(value) => {
                            batchDataChange("incallGroupIdList", value);
                        }}
                        list={callGroupList}
                        showType="box"
                        showButton={true}
                        isShowModalClear={true}
                        isNeedStringToNumber={true}
                    ></ModalSelect>
                </div>
            </div>
            <div className="edit-item">
                <div className="item-label">
                    {batchData.groupTypeList.indexOf(groupTypeList[1].id) >
                        -1 && <span className="message-required">*</span>}
                    <span>在线组&nbsp;:&nbsp;</span>
                </div>
                <div className="item-context">
                    <ModalSelect
                        value={batchData.onlineGroupIdList}
                        placeholder="请选择在线组"
                        className="context-components"
                        disabled={isDisabled.online}
                        onChange={(value) => {
                            batchDataChange("onlineGroupIdList", value);
                        }}
                        list={onlineGroupList}
                        showType="box"
                        showButton={true}
                        isShowModalClear={true}
                        isNeedStringToNumber={true}
                    ></ModalSelect>
                </div>
            </div>
            <div className="button-box">
                <Button
                    type="primary"
                    className="button-item"
                    loading={loading}
                    onClick={() => {
                        save();
                    }}
                >
                    确定
                </Button>
                <div className="line-box"></div>
                <Button
                    className="button-item"
                    disabled={loading}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    取消
                </Button>
            </div>
        </div>
    );
}
