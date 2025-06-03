import React, { useState, useEffect } from "react";
import { message, Select, Modal, Checkbox, Button, Radio } from "dpl-react";
import { post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { isArray } from "@/utils/index";
// 组类型
const autoList = [
    {
        id: "1",
        name: "开启",
    },
    {
        id: "0",
        name: "关闭",
    },
];
// 校验参数
const validateFields = [
    {
        key: "autoDistribution",
        message: "请选择是否开启自动分配",
        rules: (data) => {
            return !!data;
        },
    },
];

export default function BatchEdit(props) {
    const { idList, callGroupList, onlineGroupList, closeModal, batchType } =
        props;
    const [batchData, setBatchData] = useState({
        autoDistribution: '', // 是否自动分配
    }); // 接口入参
    const [loading, setLoading] = useState(false); // loading

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
            autoAllocation: batchData.autoDistribution
        };
        batchAutoDistribution(sendData);
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
    const batchAutoDistribution = async (sendData) => {
        setLoading(true);
        try {
            const res = await post({
                url: Api.postBatchUpdateAutoAllocationGroup,
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

    const batchDataChange = (key, value) => {
      setBatchData({
        ...batchData,
        [key]: value
      })
    }

    console.log(batchData, 'batchData');

    return (
        <div className="batch-edit-box">
            <div className="edit-item">
                <div className="item-label">
                    <span className="message-required">*</span>
                    <span>自动分配&nbsp;:&nbsp;</span>
                </div>
                <div className="item-context">
                    <Radio.Group
                        value={batchData.autoDistribution}
                        onChange={(e) => {
                            batchDataChange("autoDistribution", e.target.value);
                        }}
                    >
                        {autoList.map((item) => {
                            return (
                                <Radio key={item.id} value={item.id}>
                                    {item.name}
                                </Radio>
                            );
                        })}
                    </Radio.Group>
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
