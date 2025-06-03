// 数据枚举
export const valueEnum = {
    serviceDate: "serviceDate", // 服务日期
    startTime: "startTime", // 开始时间
    endTime: "endTime", // 结束时间
    serviceCount: "serviceCount", // 服务人数
    timeConfigList:"timeConfigList", // 配置时间
    timeConfigId:'id', // 配置时间id
    status: "status", // 是否开启
    way: "ways", // 预约的途径
    type: "type", // 预约方式
    location: "location", // 地区
    expertId: "expertId", // 专家id
};

// 预约类型枚举
export const AppointmentTypeEnum = {
    ONLINE: {
        code: "ONLINE",
        name: "线上",
    },
    OFFLINE: {
        code: "OFFLINE",
        name: "线下",
    },
};

export const statusEnum = {
    checked: "Y",
    unchecked: "N",
};
