import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import { reservationManageEditComponentsType } from "@/const/config";
import { Button, message } from "dpl-react";
import ReservationTime from "./component/reservationTime";
import TagInput from "./component/tagInput";
import Api from "@/request/api-olhelpmanage";
import { get, post } from "@/request/request";
import { valueEnum, statusEnum } from "./config";
import { uForm } from "dora";
import moment from "moment";
import "moment/locale/zh-cn";
const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    FormEffectHooks,
    createFormActions,
} = uForm;
const actions = createFormActions();
const configErrorNull = {
    message: "配置不能存在空",
    type: "error",
};
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
};
const componentsConfig = {
    [reservationManageEditComponentsType.switch]: {
        rules: (value) => {
            if (typeof value !== "boolean") {
                return false;
            }
        },
    },
    [reservationManageEditComponentsType.tagInput]: {
        rules: (value, ...arg) => {
            if (!value) {
                return false;
            }
            if (Array.isArray(value)) {
                if (!value.length) {
                    return false;
                }
                for (let i = 0, len = value.length; i < len; i++) {
                    const item = value[i];
                    if (!item) {
                        return configErrorNull;
                    }
                }
            }
        },
    },
    [reservationManageEditComponentsType.reservationTime]: {
        rules: (value) => {
            if (!value) {
                return false;
            }
            if (Array.isArray(value)) {
                if (!value.length) {
                    return false;
                }
                for (let i = 0, len = value.length; i < len; i++) {
                    const item = value[i];
                    if (
                        !item[valueEnum.serviceDate] ||
                        !item[valueEnum.startTime] ||
                        !item[valueEnum.endTime] ||
                        (!item[valueEnum.serviceCount] && item[valueEnum.serviceCount] != 0)
                    ) {
                        return configErrorNull;
                    }
                }
            }
        },
    },
};

// 格式化配置时间
const formatTimeConfigListToMoment = (data) => {
    let result = [];
    if (Array.isArray(data)) {
        data.forEach((item) => {
            result.push({
                [valueEnum.timeConfigId]:
                    item[valueEnum.timeConfigId] || undefined,
                [valueEnum.serviceDate]: moment(item[valueEnum.serviceDate]),
                [valueEnum.startTime]: moment(
                    item[valueEnum.startTime],
                    "HH:mm"
                ),
                [valueEnum.endTime]: moment(item[valueEnum.endTime], "HH:mm"),
                [valueEnum.serviceCount]: parseInt(
                    item[valueEnum.serviceCount]
                ),
            });
        });
    }
    return result;
};

const formatTimeConfigListToString = (data) => {
    let result = [];
    if (Array.isArray(data)) {
        data.forEach((item) => {
            if (
                item[valueEnum.serviceDate] &&
                item[valueEnum.startTime] &&
                item[valueEnum.endTime] &&
                (item[valueEnum.serviceCount] ||
                    item[valueEnum.serviceCount] == 0)
            ) {
                result.push({
                    [valueEnum.timeConfigId]:
                        item[valueEnum.timeConfigId] || undefined,
                    [valueEnum.serviceDate]:
                        item[valueEnum.serviceDate] &&
                        item[valueEnum.serviceDate].format("YYYY-MM-DD"),
                    [valueEnum.startTime]:
                        item[valueEnum.startTime] &&
                        item[valueEnum.startTime].format("HH:mm"),
                    [valueEnum.endTime]:
                        item[valueEnum.endTime] &&
                        item[valueEnum.endTime].format("HH:mm"),
                    [valueEnum.serviceCount]: parseInt(
                        item[valueEnum.serviceCount]
                    ),
                });
            }
        });
    }
    return result;
};

function ReservationManageEdit(props) {
    const {
        title = "",
        config = [],
        queryData = {},
        type,
        onChannel,
        onSave,
    } = props;
    const [params, setParams] = useState({});
    const [loading, setLoading] = useState(false);
    const [configList, setConfigList] = useState([]);
    const { onFieldValueChange$ } = FormEffectHooks;

    /**
     * 获取预约详情
     */
    const getReservationDetail = async (queryParams = {}) => {
        try {
            const res = await get({
                url: Api.getAppointmentDetail,
                params: { ...queryParams, type },
            });
            if (res.success) {
                const data = res.data || {};
                const result = {
                    [valueEnum.way]: data[valueEnum.way],
                    [valueEnum.timeConfigList]: formatTimeConfigListToMoment(
                        data[valueEnum.timeConfigList]
                    ),
                    [valueEnum.status]:
                        data[valueEnum.status] === statusEnum.checked
                            ? true
                            : false,
                };
                setParams(result);
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 保存点击
     */
    const confirmHandler = () => {
        actions.submit().then(({ values }) => {
            let sendData = {
                ...queryData,
                type,
            };
            if (Array.isArray(config)) {
                config.forEach((item) => {
                    switch (item.name) {
                        case valueEnum.timeConfigList:
                            sendData[item.name] = formatTimeConfigListToString(
                                values[item.name]
                            );
                            break;
                        case valueEnum.status:
                            sendData[item.name] = values[item.name]
                                ? statusEnum.checked
                                : statusEnum.unchecked;
                            break;
                        default:
                            sendData[item.name] = values[item.name];
                            break;
                    }
                });
            }
            add(sendData);
        });
    };

    /**
     * 新增
     */
    const add = async (data) => {
        try {
            setLoading(true);
            const res = await post({
                url: Api.postAppointmentSave,
                data,
            });
            if (res.success) {
                message.success("新增成功！");
                onSave && onSave();
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
        onChannel && onChannel();
    };

    /**
     * 联动
     */
    const effectsFunc = () => {
        const { setFieldState, setFieldValue } = createFormActions();
        onFieldValueChange$(valueEnum.status).subscribe(({ value }) => {
            let requiredFlag = true;
            if (typeof value === "boolean" && !value) {
                requiredFlag = false;
            }
            setFieldState("*(timeConfigList,ways)", (state) => {
                console.log(state['x-rules'])
                state.required = requiredFlag;
                state.ruleErrors = [];
            });
        });
    };

    useEffect(() => {
        setConfigList(config);
    }, [config]);

    useEffect(() => {
        const result = Object.assign({}, queryData);
        getReservationDetail(result);
    }, [queryData]);
    return (
        <div className="reservation-manage-edit-box">
            {title && <div className="title">{title}</div>}
            <div className="form-box">
                <SchemaForm
                    initialValues={params}
                    actions={actions}
                    components={{
                        TagInput,
                        ReservationTime,
                    }}
                    effects={effectsFunc}
                >
                    {Array.isArray(config) &&
                        config.map((item, index) => {
                            const requiredProps =
                                item.componentType ===
                                reservationManageEditComponentsType.switch
                                    ? {
                                          required: true,
                                      }
                                    : {};
                            return (
                                <Field
                                    key={`${item.name}${index}`}
                                    name={item.name}
                                    type={item.type}
                                    title={item.title}
                                    x-component={item.componentType}
                                    {...formItemLayout}
                                    x-component-props={item.props}
                                    {...requiredProps}
                                    x-rules={
                                        (componentsConfig[item.componentType] &&
                                            componentsConfig[item.componentType]
                                                .rules) ||
                                        undefined
                                    }
                                />
                            );
                        })}
                    <div className="button-box">
                        <Button
                            type="primary"
                            url={params.publicityUrl}
                            className="button-item"
                            onClick={() => {
                                confirmHandler();
                            }}
                            disabled={loading}
                        >
                            保存并预览
                        </Button>
                        <div className="line-box"></div>
                        <Button
                            className="button-item"
                            onClick={() => {
                                cancelHandler();
                            }}
                            disabled={loading}
                        >
                            取消
                        </Button>
                    </div>
                </SchemaForm>
            </div>
        </div>
    );
}

export default ReservationManageEdit;
