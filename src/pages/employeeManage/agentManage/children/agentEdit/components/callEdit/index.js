import React, { useState, useEffect } from "react";
import "./index.scss";
import {
    message,
    Button,
    Input,
    Checkbox,
    Modal,
    Select,
    InputNumber,
    Radio,
} from "dpl-react";
import { agentPostCode } from "@/const/config";
import ModalSelect from "@/components/common/modalSelect";
const Option = Select.Option;
// 重要业务组id
const importanceCode = "0";
// 是否录音
const recordList = [
    {
        id: "1",
        name: "录音",
    },
    {
        id: "0",
        name: "不录音",
    },
];

export default function CallEdit(props) {
    const { callGroupList, onDutyPositionList, data, agentPostList, onChange } =
        props;
    const incallConfig = data.incallConfig;
    const [mainGroupList, setMainGroupList] = useState(() => {
        if (incallConfig.agentGroupList) {
            const list = incallConfig.agentGroupList.filter((item) => {
                return item.importance == importanceCode;
            });
            return list;
        } else {
            return [];
        }
    }); // 主要业务组

    const [isDisabled, setIsDisabled] = useState(() => {
        let obj = {
            agent: true,
            monitor: true,
            mainGroup: true,
        };
        if (incallConfig.postList && incallConfig.postList.length > 0) {
            incallConfig.postList.forEach((item) => {
                if (item == agentPostCode.agent) {
                    obj.agent = false;
                    obj.mainGroup = false;
                } else {
                    obj.monitor = false;
                }
            });
        }
        return obj;
    }); // 禁用

    /**
     * 坐席数据修改
     */
    const agentDataChange = (key, value) => {
        onChange("call", key, value);
    };

    /**
     * 坐席组选中调用
     */
    const agentGroupSelect = (value, option) => {
        agentDataChange("agentGroupIdList", value);
        if (option) {
            let list = [];
            let isExist = false;
            option.forEach((data) => {
                if (data.importance == importanceCode) {
                    if (data.id === incallConfig.mainGroup) {
                        isExist = true;
                    }
                    list.push({
                        id: data.id,
                        name: data.name,
                        importance: data.importance,
                    });
                }
            });
            if (!isExist) {
                agentDataChange("mainGroup", undefined);
            }
            console.log(list);
            setMainGroupList(list);
        }
    };

    /**
     * 岗位修改
     */
    const postChange = (value) => {
        // if (!value.length) {
        //   Modal.warning({
        //     content: "岗位必须选择一个，不可取消",
        //     okText: "确定"
        //   });
        //   return;
        // }
        let obj = {
            agent: true,
            monitor: true,
            mainGroup: true,
        };
        value.forEach((item) => {
            if (item == agentPostCode.agent) {
                obj.agent = false;
                obj.mainGroup = false;
            } else {
                obj.monitor = false;
            }
        });
        setIsDisabled(obj);
        agentDataChange("postList", value);
    };

    return (
        <div className="call-edit">
            <div className="edit-item">
                <div className="edit-item-label">
                    <span className="edit-required">*</span>
                    <span>岗位&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <Checkbox.Group
                        value={incallConfig.postList}
                        onChange={postChange}
                    >
                        {agentPostList.length > 0 &&
                            agentPostList.map((item) => {
                                return (
                                    <Checkbox value={item.id} key={item.id}>
                                        {item.name}
                                    </Checkbox>
                                );
                            })}
                    </Checkbox.Group>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    {incallConfig.postList &&
                        incallConfig.postList.indexOf(agentPostCode.agent) >
                            -1 && <span className="edit-required">*</span>}
                    <span>坐席组&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <ModalSelect
                        value={incallConfig.agentGroupIdList}
                        placeholder="请选择坐席组"
                        disabled={isDisabled.agent}
                        className="context-components"
                        onChange={(value, option) => {
                            agentGroupSelect(value, option);
                        }}
                        isNeedStringToNumber={true}
                        list={callGroupList}
                        showType="box"
                        showButton={true}
                        isShowModalClear={true}
                    ></ModalSelect>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    {incallConfig.postList &&
                        incallConfig.postList.indexOf(agentPostCode.monitor) >
                            -1 && <span className="edit-required">*</span>}
                    <span>班长组&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <ModalSelect
                        value={incallConfig.monitorGroupIdList}
                        placeholder="请选择班长组"
                        className="context-components"
                        disabled={isDisabled.monitor}
                        onChange={(value) => {
                            agentDataChange("monitorGroupIdList", value);
                        }}
                        list={callGroupList}
                        isNeedStringToNumber={true}
                        showType="box"
                        showButton={true}
                        isShowModalClear={true}
                    ></ModalSelect>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    {incallConfig.postList &&
                        incallConfig.postList.indexOf(agentPostCode.agent) >
                            -1 && <span className="edit-required">*</span>}
                    <span>主要业务组&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <Select
                        value={incallConfig.mainGroup}
                        placeholder="请选择主要业务组"
                        allowClear
                        disabled={isDisabled.mainGroup}
                        onChange={(value) => {
                            agentDataChange("mainGroup", value);
                        }}
                    >
                        {mainGroupList.length > 0 &&
                            mainGroupList.map((item) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                    </Select>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    <span className="edit-required">*</span>
                    <span>值班职务&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <Select
                        value={incallConfig.onDutyPosition}
                        placeholder="请选择值班职务"
                        allowClear
                        onChange={(value) => {
                            agentDataChange("onDutyPosition", value);
                        }}
                    >
                        {onDutyPositionList.length > 0 &&
                            onDutyPositionList.map((item) => {
                                return (
                                    <Option key={item.id} value={item.id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                    </Select>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    <span className="edit-required">*</span>
                    <span>是否录音&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <Radio.Group
                        value={incallConfig.recordSoundFlag}
                        onChange={(e) => {
                            agentDataChange("recordSoundFlag", e.target.value);
                        }}
                    >
                        {recordList.map((item) => {
                            return (
                                <Radio value={item.id} key={item.id}>
                                    {item.name}
                                </Radio>
                            );
                        })}
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
}
