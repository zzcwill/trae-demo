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
import { callcentermanageUploadFile } from "@/utils/uploadFile";
import Api from "@/request/api-callcentermanage";
import { agentPostCode } from "@/const/config";
import ModalSelect from "@/components/common/modalSelect";
// 支持的图片格式
const accept = ".png,.jpg";
// 图片名字的最大长度
const nameLength = 100;
// 图片大小
const fileSize = 2;
// 自动分配设置
const autoAllocationList = [
    {
        id: "1",
        name: "开启",
    },
    {
        id: "0",
        name: "关闭",
    },
];
export default function OnlineEdit(props) {
    const { onlineGroupList, data, agentPostList, onChange } = props;
    const onlineConfig = data.onlineConfig;
    const [isDisabled, setIsDisabled] = useState(() => {
        let obj = {
            agent: true,
            monitor: true,
        };
        if (onlineConfig.postList && onlineConfig.postList.length > 0) {
            onlineConfig.postList.forEach((item) => {
                if (item == agentPostCode.agent) {
                    obj.agent = false;
                } else {
                    obj.monitor = false;
                }
            });
        }
        return obj;
    }); // 禁用
    const [loading, setLoading] = useState(false); // loading

    /**
     * 图片格式校验
     * @param {File} file
     */
    const onImgChange = (file) => {
        const picture = file[0];
        const acceptList = ["image/png", "image/jpeg", "image/jpg"];
        if (acceptList.length > 0 && acceptList.indexOf(picture.type) < 0) {
            message.error("图片格式不正确");
            return false;
        }
        if (picture.name.length > nameLength) {
            message.error("图片名字长度超过" + nameLength + "个字");
            return false;
        }
        if (picture.size > fileSize * 1024 * 1024) {
            message.error("图片大小超过" + fileSize + "M");
            return false;
        }
        setLoading(true);
        return true;
    };
    /**
     * 更换头像点击方法
     */
    const openUploadFile = async () => {
        if (loading) return;
        const res = await callcentermanageUploadFile(
            Api.uploadFile,
            onImgChange,
            accept,
            "picture"
        ).finally(() => {
            setLoading(false);
        });
        if (res.success) {
            const data = res.data;
            agentDataChange("headImageUrl", data.filePath);
        } else {
            message.error(res.message);
        }
    };

    /**
     * 坐席数据修改
     */
    const agentDataChange = (key, value) => {
        onChange("online", key, value);
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
        };
        value.forEach((item) => {
            if (item == agentPostCode.agent) {
                obj.agent = false;
            } else {
                obj.monitor = false;
            }
        });
        setIsDisabled(obj);
        agentDataChange("postList", value);
    };

    return (
        <div className="online-edit">
            <div className="edit-item">
                <div className="edit-item-label">
                    <span className="edit-required">*</span>
                    <span>头像&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <div className="head-box">
                        <div className="head-show">
                            <div
                                style={{
                                    backgroundImage: `url("${onlineConfig.headImageUrl}")`,
                                }}
                                className="head-img"
                            />
                            <div className="head-description">
                                <Button
                                    loading={loading}
                                    type="primary-bordered"
                                    className="head-button"
                                    onClick={() => {
                                        openUploadFile();
                                    }}
                                >
                                    更改头像
                                </Button>
                                <div className="head-description-text">
                                    建议尺寸：80*80px
                                </div>
                                <div className="head-description-text">
                                    图片格式：jpg、png等图片类型，不得大于2M：
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    <span className="edit-required">*</span>
                    <span>昵称&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <Input
                        placeholder="请输入昵称"
                        value={onlineConfig.nickname}
                        className="context-components"
                        maxLength={20}
                        onChange={(e) => {
                            agentDataChange("nickname", e.target.value);
                        }}
                    ></Input>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    <span className="edit-required">*</span>
                    <span>岗位&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <Checkbox.Group
                        value={onlineConfig.postList}
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
                    {onlineConfig.postList &&
                        onlineConfig.postList.indexOf(agentPostCode.agent) >
                            -1 && <span className="edit-required">*</span>}
                    <span>坐席组&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <ModalSelect
                        value={onlineConfig.agentGroupIdList}
                        placeholder="请选择坐席组"
                        className="context-components"
                        list={onlineGroupList}
                        showType="box"
                        showButton={true}
                        disabled={isDisabled.agent}
                        isShowModalClear={true}
                        onChange={(value) => {
                            agentDataChange("agentGroupIdList", value);
                        }}
                        isNeedStringToNumber={true}
                    ></ModalSelect>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    {onlineConfig.postList &&
                        onlineConfig.postList.indexOf(agentPostCode.monitor) >
                            -1 && <span className="edit-required">*</span>}
                    <span>班长组&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <ModalSelect
                        value={onlineConfig.monitorGroupIdList}
                        placeholder="请选择班长组"
                        className="context-components"
                        disabled={isDisabled.monitor}
                        list={onlineGroupList}
                        showType="box"
                        showButton={true}
                        isShowModalClear={true}
                        onChange={(value) => {
                            agentDataChange("monitorGroupIdList", value);
                        }}
                        isNeedStringToNumber={true}
                    ></ModalSelect>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    <span className="edit-required">*</span>
                    <span>接待上限&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <InputNumber
                        min={1}
                        max={99}
                        step={1}
                        precision={0}
                        value={onlineConfig.maxReception}
                        inputWidth={200}
                        onChange={(value) => {
                            agentDataChange("maxReception", value);
                        }}
                    ></InputNumber>
                    <span className="help-context">建议小于或等于8个</span>
                </div>
            </div>
            <div className="edit-item">
                <div className="edit-item-label">
                    <span className="edit-required">*</span>
                    <span>自动分配&nbsp;:&nbsp;</span>
                </div>
                <div className="edit-item-context">
                    <Radio.Group
                        value={onlineConfig.autoAllocation}
                        onChange={(e) => {
                            agentDataChange("autoAllocation", e.target.value);
                        }}
                    >
                        {autoAllocationList.map((item) => {
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
