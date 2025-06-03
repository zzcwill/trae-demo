export const editTypeEnum = {
    edit: "edit",
    add: "add",
};

export const errorManageEditType = {
    edit: "edit",
    detail: "detail",
}; // 纠错弹窗类型

export const sortMap = {
    ascend: "ASC",
    descend: "DESC",
    ASC: "ascend",
    DESC: "descend",
}; // 排序类型map

export const dimensionMap = {
    0: "REGION_LABEL",
    1: "PROFESSION_LABEL",
    2: "GRADE_LABEL",
};

// 枚举类
export const callcenterEnumOptionType = {
    InternalData: "INTERNAL_DATA_TYPE", // 内部资料类型
    EmailType: "EMAIL_TYPE", // 邮件类型
    IncallGroupType: "incall_group_type", // 来电组类型
    FullQueueStartegy: "FULL_QUEUE_STRATEGY", // 排队满时处理策略
    AllocationStartegy: "ALLOCATION_STRATEGY", // 成员分配策略
    AgentStatus: "SEAT_STATUS", // 坐席状态
    GroupStatus: "GROUP_STATUS", // 坐席状态
    OnDutyPosition: "ON_DUTY_POSITION", // 值班职务
    AcceptanceChannel: "ACCEPTANCE_CHANNEL", // 受理渠道
    AgentPost: "SEAT_POST", // 岗位
    AgentType: "agent_type", // 人员归属
    ExtNumberType: "EXT_NUMBER_TYPE", // 分机管理电话类型
    ExtNumberState: "EXT_NUMBER_BIND_STATE", // 分机管理状态
    satisfaction_evaluation_code: 'satisfaction_evaluation_code', // 满意程度
    smart_chat_analysis_specific_fmtt_app_id: 'smart_chat_analysis_specific_fmtt_app_id', // 大模型调用APPID
    feedback_solution_option_config: 'feedback_solution_option_config', // 反馈解决方案选项配置
    // GBusinessCenterType: 'g_business_center_type', // g端+综合经营中心
    // BAdminCompanyType: 'admin_company_code', // B端现有经营中心
    GBusinessCenterType: 'consult_business_center_code', // 综合 咨询技能组特殊设置的虚拟经营中心
    BAdminCompanyType: 'all_region_company_code', // B+G的经营中心
    // consult_business_center_code: 'consult_business_center_code', // 综合 咨询技能组特殊设置的虚拟经营中心
    // all_region_company_code: 'all_region_company_code', // B+G的经营中心
    region_company_code: 'region_company_code', // 受理机构 -- 纯B端的经营中心
};

// 坐席管理参数页面对应code
export const agentMessageType = {
    online: "online", // 在线
    call: "call", // 来电
};

export const INCALL = 'incall'; // 电话
export const ONLINE = 'online'; // 在线
export const EXPERT = 'expert'; // 专家
export const ROBOT = 'robot'; // 机器人
export const HUMAN_CALL = 'human_out_call' // 人工外呼
export const OVERALL_ANSWER_RATE = 'overall_answer_rate' // 综合接通率
export const TRIGGER_SCENE = 'trigger_scene' // 触发场景
export const TODO_EXECUTE_PARTY = 'todo_execute_party' // 待办执行方
export const CREATER_DEPARTMENT = 'creater_department' // 创建人所属部门

// 电话组管理新增时的默认值
export const defaultCallManageEditConfig = {
    complaintGroupFlag: "0", // 是否投诉组配置
    fullQueueStrategy: "0", // TODO 排队满时处理策略 需要注意，如果数据库配置调整了则需要进行调整
    busyThresholdSwitch: "0", // 是否启用繁忙阈值
    helpQueueSwitch: "0", // 是否启用代客排队
    alertSwitch:  "0", // 是否启用告警开关
};
// 坐席管理新增时的默认值
export const defaultEmployeeManageEditConfig = {
    agentHeadImg:
        "http://servu-consult.oss-cn-hangzhou.aliyuncs.com/callcenter/headImage/default_head_img.png", // 默认坐席头像
    onlineAgentAutoAllocation: "1", // 在线咨询自动分配
    callAgentRecordSoundFlag: "1", // 电话咨询是否录音
};
// 坐席岗位
export const agentPostCode = {
    agent: "1", // 坐席
    monitor: "2", // 班长
};
// 受理渠道
export const acceptanceChannelCode = {
    online: "2", // 在线
    call: "1", // 来电
};

export const spectialCallManageEditConfig = {
    fullQueueStrategy: ["1"], // TODO 排队满时处理策略,避免之后添加多个策略
    busyThresholdSwitch: "1", // 启用繁忙阈值
    helpQueueSwitch: "1", // 启用代客排队
};

export const classifyTypeEnum = {
    classify: "0", // 咨询范围
    profession: "1", // 擅长行业
    area: "2", // 咨询地区
    serviceWays: "3", // 服务方式
    inquiryRange: "4", // 专家问诊咨询范围
    inquiryProfession: "5", // 专家问诊擅长行业
    inquiryArea: "6", // 问诊服务地区
    inquiryServiceWays: "7", // 问诊服务方式
    inquiryPost: "8", // 岗责
    bizArea: '9', // 服务大区
    areaRegion: '10', // 适用地区
    allArea: '12', // 包括全国(0000)以及省直单地区数据
    isdConfigArea: '14', // 受理人配置-适用地区
};

export const dictTypeEnum = {
    productPackage: 'product_package_type', // 产品包类型
    onshelfRegion: 'onshelf_region', // 上架位置
    onshelfStatus: 'onshelf_status', // 状态
    consultService: 'consult_service', // 适用服务
    marketCctivityDisplayType: 'market_activity_display_type', // 营销活动展示位
    consultServiceCategory: 'consult_service_category', // 咨询产品大类
    controlType: 'consult_service_control_type', // 控制类型字典
    consultLabel: 'consult_service_qqt_label', // 咨询标签枚举
    consultBusinessType: 'consult_business_type', // 咨询业务类型
    memberType: 'member_type', // 会员类型
    productCategory: 'product_category', // 产品大类
    financialltaxTopicType: 'financial_tax_topic_type', // 智能助理产品主题类型
    connect_rate_type: 'connect_rate_type', // 接通率类型
    warnPeriodType: 'warn_period_type', // 告警周期
    consultWay: 'consult_way', // 咨询方式
    consult_task_rule_way: 'consult_task_rule_way', // 咨询方式
    trigger_scene: 'trigger_scene',
    condition_operator_type: 'condition_operator_type',//条件表达式
    consult_task_rule_todo_type: 'consult_task_rule_todo_type', //任务信息中待办类型
    condition_operator_type: 'condition_operator_type', //条件表达式
    todo_execute_party: 'todo_execute_party', // 待办执行方
    todo_business_type: 'todo_business_type', // 待办业务
    consult_group_scene: 'consult_group_scene', // 咨询组场景
    ipt_business_classify: 'ipt_business_classify', // 业务分类
};

// 业务组参数类型
export const workGroupType = {
    online: "2", // 在线组
    call: "1", // 电话组
};

// 远程中心code
export const callcenterCode = "001050";

// 是否投诉组配置
export const complaintGroupList = [
    {
        id: "0",
        name: "否",
    },
    {
        id: "1",
        name: "是",
    },
];
// 重要性
export const importanceList = [
    {
        id: "0",
        name: "重要业务组",
    },
    {
        id: "1",
        name: "次要业务组",
    },
];
// 繁忙阈值
export const busyThresholdList = [
    {
        id: "0",
        name: "不启用",
    },
    {
        id: "1",
        name: "启用",
    },
];
// 代客排队
export const helpQueueList = [
    {
        id: "0",
        name: "不启用",
    },
    {
        id: "1",
        name: "启用",
    },
];

// 在线咨询枚举类型
export const olhelpEnumOptionType = {
    EnterType: "consult_entry_type", // 入口类型
    Gjlx: "consult_gjlx", //  构建类型
    QuestionSystem: "GUESS_QUESTION_SYSTEM", // 排队满时处理策略
    OfficialServiceType: "official_service_type", //  官方服务类型
    ExpertServiceType: "EXPERT_SERVICE_TYPE", //  专家服务分类
    LandingPageModuleType: "LANDING_PAGE_MODULE_TYPE", // 落地页类型
    GjType: "special_consult_rights", // 构建类型
    Channel: "consult_channel", // 在线咨询来源渠道
    PersonalTag: "olhelp_route_person_tag", // 在线咨询个人标签
    CompanyTag: "olhelp_route_company_tag", // 在线咨询企业标签
    AgencyTag:"olhelp_route_agency_tag", // 在线咨询中介标签
    Gj: "olhelp_route_empower", // 在线咨询构建
    ButtonStyle: "STANDARD_CONSULT_STYLE", // 按钮样式
    IconStyle: "STANDARD_CONSULT_BUTTON_ICON", // icon样式
    EmpowerService:"consult_empower_service", // 服务授权
    UserType:"consult_usertype", // 会员等级
    CompanyGroupTag:"olhelp_route_company_group_tag", // 企业分群标签
    OperationActionMatter:"operate_action_matter", // 运营动作事项
    RightsType:"rights_type", // 权益类型
    AgencyGroupTag:"olhelp_route_agency_group_tag", // 机构分群标签
    RouterRuleParamCode:"route_rule_param_code", // 路由规则枚举
    RouterRuleOperatorType:"route_rule_operator_type", // 路由规则匹配类型
    ConsultServiceExpert:"consult_service_expert", //专家管理页面的权益服务类型
    ConsultServiceOfficial:"consult_service_official", //官方服务管理页面的权益服务类型
    ConsultService:"consult_service", //权益服务类型
    ConsultSystemCode:"consult_system_code", //专家池适用产品
    ExpertPoolUserLabel: "expert_pool_user_group", // 专家池用户分层
    route_rule_acceptance_mode: "route_rule_acceptance_mode", // 受理模式
    PersonGroupTag: "olhelp_route_person_group_tag", // 个人分群标签
};

// 咨询产品配置列表
export const serviceConfigCardTypeEnum = {
    expert: '1',
    offcial: '2',
}

export const publicPath = "askone-manage-pc";

export const modelType = {
    taxCategory: "2",
    basicCategory: "1",
    expertCategory: "3",
    expertDetail: "4",
    officialService: "5",
    homePage: "6",
    expertDetailService: "7",
};

export const previewTypeMap = {
    basic: {
        code: modelType.basicCategory,
        type: "basic-page-preview",
        name: "基础财税咨询",
    },
    basicGround: {
        code: modelType.basicCategory,
        type: "basic-page-ground",
        name: "基础财税咨询落地页",
    },
    tax: {
        code: modelType.taxCategory,
        type: "tax-page-preview",
        name: "办税咨询",
    },
    taxGround: {
        code: modelType.taxCategory,
        type: "tax-page-ground",
        name: "办税咨询落地页",
    },
    expert: {
        code: modelType.expertCategory,
        type: "expert-page-preview",
        name: "专家财税咨询",
    },
    expertGround: {
        code: modelType.expertCategory,
        type: "expert-page-ground",
        name: "专家财税咨询落地页",
    },
    expertDetail: {
        code: modelType.expertDetail,
        type: "expert-detail-preview",
        name: "专家详情页预览页",
    },
    expertDetailGround: {
        code: modelType.expertDetail,
        type: "expert-detail-ground",
        name: "专家详情页落地页",
    },
    home: {
        code: modelType.homePage,
        type: "home-page-preview",
        name: "首页",
    },
    homeGround: {
        code: modelType.homePage,
        type: "home-page-ground",
        name: "首页落地页",
    },
};

// button位置
export const buttonSiteMap = {
    top: "top",
    bottom: "bottom",
};

// 咨询前台渠道配置状态
export const consultEntranceStatusMap = {
    ineffective: "0", // 未生效
    effective: "1", // 已生效
    invalid: "2", // 已失效
};

// 咨询前台渠道配置状态
export const expertPoolStatusMap = {
    effective: "01", // 已生效
    invalid: "02", // 已失效
    ineffective: "03", // 未生效
};

export const landingPageTyp = {
    default: "0",
    exclusive: "1",
};
// 落地页类型
export const landingPageTypeMap = {
    [landingPageTyp.default]: {
        id: landingPageTyp.default,
        name: "通用页面",
    }, // 通用
    [landingPageTyp.exclusive]: {
        id: landingPageTyp.exclusive,
        name: "专属页面",
    }, // 专属
};
// 落地页类型列表
export const landingPageTypeList = Object.keys(landingPageTypeMap).map(
    (item) => {
        return landingPageTypeMap[item];
    }
);

// 模板类型
export const modelTypeMap = {
    [modelType.taxCategory]: {
        id: modelType.taxCategory,
        name: "【web】-分类页-办税咨询",
    },
    [modelType.basicCategory]: {
        id: modelType.basicCategory,
        name: "【web】-分类页-基础财税",
    },
    [modelType.expertCategory]: {
        id: modelType.expertCategory,
        name: "【web】-分类页-专家财税",
    },
    [modelType.expertDetail]: {
        id: modelType.expertDetail,
        name: "【web】-详情页-专家财税",
    },
    [modelType.officialService]: {
        id: modelType.officialService,
        name: "【web】-服务页-官方团队",
    },
    [modelType.homePage]: {
        id: modelType.homePage,
        name: "【web】-首页",
    },
    [modelType.expertDetailService]: {
        id: modelType.expertDetailService,
        name: "【web】-服务页-专家&机构",
    },
};

// 模板类型
export const modelTypeList = Object.keys(modelTypeMap).map((item) => {
    return modelTypeMap[item];
});

// 工作时间周的type值map
export const workTimeWeekMap = {
    Mon: {
        type: "1",
        name: "周一",
    },
    Tues: {
        type: "2",
        name: "周二",
    },
    Wed: {
        type: "3",
        name: "周三",
    },
    Thur: {
        type: "4",
        name: "周四",
    },
    Fri: {
        type: "5",
        name: "周五",
    },
    Sat: {
        type: "6",
        name: "周六",
    },
    Sun: {
        type: "0",
        name: "周日",
    },
};

// 工作时间字段key值map
export const workTimeSaveKeyMap = {
    workFlag: "workFlag",
    type: "type",
    groupType: "type",
    beginTime: "beginTime",
    endTime: "endTime",
    effectiveDate: "effectiveDate",
    effectiveDateEnd: "effectiveDateEnd",
    effectiveDateBegin: "effectiveDateBegin",
    groupIdList: "groupIdList",
    dayTime: "dayTime",
    weekConfig: "weekConfig",
};
// 工作类型
export const workTypeList = [
    {
        id: "0",
        name: "上班",
    },
    {
        id: "1",
        name: "不上班",
    },
];
// 咨询前台页面配置类型
export const configTypeMap = {
    default: "0", // 默认配置
    landingPage: "1", // 落地页配置
};

// 专家状态
export const expertStatus = {
    examinePass: "1", // 审核通过
};

// 专家类型列表
export const expertTypeList = [
    {
        id: "individual",
        name: "个人",
        showName: "个人",
    },
    {
        id: "expert_team",
        name: "专家团",
        showName: "专家团",
    },
]; 

// 专家场景列表
export const sceneList = [
    {
        id: "WEB",
        name: "web专用",
        showName: "web",
    },
    {
        id: "TOOL",
        name: "工具专用",
        showName: "工具",
    },
    {
        id: "H5",
        name: "H5专用",
        showName: "H5",
    },
    {
        id: "ALL",
        name: "通用",
        showName: "通用",
    },
];

// 权益服务类型 -- 暂时用不到
export const RightsServiceList = [
    {
        id: "TAX_INQUIRY",
        name: "办税咨询",
    },
    {
        id: "FIN_TAX_INQUIRY",
        name: "财税实务咨询",
    },
    {
        id: "FIN_TAX_EXP_INQUIRY",
        name: "咨财税专家询",
    },
    {
        id: "SPECIAL",
        name: "专项服务咨询",
    },
    {
        id: "HUMAN_RESORCES",
        name: "人资咨询",
    },
    {
        id: "INQUIRY",
        name: "专家问诊",
    },
];
// 官方服务场景列表
export const sceneOfficialList = [
    {
        id: "web",
        name: "web专用",
        showName: "web",
    },
    {
        id: "tool",
        name: "工具专用",
        showName: "工具",
    },
];

// banner图跳转类型列表
export const jumpTypeList = [
    {
        id: "0",
        name: "不跳转",
    },
    {
        id: "1",
        name: "落地页",
    },
    {
        id: "2",
        name: "外部链接",
    },
];

// 可提供咨询类别列表
export const subSceneList = [
    {
        id: "MEMBER",
        name: "财税专家咨询",//同原会员咨询
        showName: "财税专家咨询",
    },
    {
        id: "ZSGS",
        name: "安心管税咨询",
        showName: "安心管税咨询",
    },
    {
        id: "SPECIAL",
        name: "专项咨询",
        showName: "专项专用",
    },
    {
        id: "INQUIRY",
        name: "专家问诊",
        showName: "专家问诊",
    },
];

/**
 * 编辑类型
 */
export const editTypeMap = {
    add: {
        code: "add",
        name: "新增",
    },
    edit: {
        code: "edit",
        name: "编辑",
    },
    copy: {
        code: "copy",
        name: "复制",
    },
};

// 预约管理编辑组件类型
export const reservationManageEditComponentsType = {
    switch: "Switch", // 开关
    tagInput: "TagInput", // 选择
    reservationTime: "ReservationTime", // 预约时间
};

// 预约类型
export const reservationManageEditTypeEnum = {
    online: "ONLINE",
    offline: "OFFLINE",
};

// 专家服务方式
export const serviceTypeMap = {
    ONLINE_CHAT: {
        name: "在线咨询",
        id: "ONLINE_CHAT",
    },
    ONLINE_VIDEO: {
        name: "线上面对面咨询",
        id: "ONLINE_VIDEO",
    },
    OFFLINE: {
        name: "线下面对面咨询",
        id: "OFFLINE",
    },
    INQUIRY_ONLINE: {
        name: "线上专家问诊",
        id: "INQUIRY_ONLINE",
    },
    INQUIRY_OFFLINE: {
        name: "线下专家问诊",
        id: "INQUIRY_OFFLINE",
    },
};

export const serviceTypeList = Object.keys(serviceTypeMap).map((item) => {
    return serviceTypeMap[item];
});

// 全国地区代码
export const allCode = "0000";

// formily 声明周期
export const LifeCycleTypes = {
    /**
     * Form LifeCycle
     **/

    ON_FORM_WILL_INIT: "onFormWillInit",
    ON_FORM_INIT: "onFormInit",
    ON_FORM_CHANGE: "onFormChange", //ChangeType精准控制响应
    ON_FORM_MOUNT: "onFormMount",
    ON_FORM_UNMOUNT: "onFormUnmount",
    ON_FORM_SUBMIT: "onFormSubmit",
    ON_FORM_RESET: "onFormReset",
    ON_FORM_SUBMIT_START: "onFormSubmitStart",
    ON_FORM_SUBMIT_END: "onFormSubmitEnd",
    ON_FORM_SUBMIT_VALIDATE_START: "onFormSubmitValidateStart",
    ON_FORM_SUBMIT_VALIDATE_SUCCESS: "onFormSubmitValidateSuccess",
    ON_FORM_SUBMIT_VALIDATE_FAILED: "onFormSubmitValidateFailed",
    ON_FORM_ON_SUBMIT_SUCCESS: "onFormOnSubmitSuccess",
    ON_FORM_ON_SUBMIT_FAILED: "onFormOnSubmitFailed",
    ON_FORM_VALUES_CHANGE: "onFormValuesChange",
    ON_FORM_INITIAL_VALUES_CHANGE: "onFormInitialValuesChange",
    ON_FORM_VALIDATE_START: "onFormValidateStart",
    ON_FORM_VALIDATE_END: "onFormValidateEnd",
    ON_FORM_INPUT_CHANGE: "onFormInputChange",
    ON_FORM_HOST_RENDER: "onFormHostRender",
    /**
     * FormGraph LifeCycle
     **/
    ON_FORM_GRAPH_CHANGE: "onFormGraphChange",

    /**
     * Field LifeCycle
     **/

    ON_FIELD_WILL_INIT: "onFieldWillInit",
    ON_FIELD_INIT: "onFieldInit",
    ON_FIELD_CHANGE: "onFieldChange",
    ON_FIELD_INPUT_CHANGE: "onFieldInputChange",
    ON_FIELD_VALUE_CHANGE: "onFieldValueChange",
    ON_FIELD_INITIAL_VALUE_CHANGE: "onFieldInitialValueChange",
    ON_FIELD_VALIDATE_START: "onFieldValidateStart",
    ON_FIELD_VALIDATE_END: "onFieldValidateEnd",
    ON_FIELD_MOUNT: "onFieldMount",
    ON_FIELD_UNMOUNT: "onFieldUnmount",
};

// 是否的映射
export const YES_NO_MAP = {
    'Y': '是',
    'N': '否'
}

// 咨询方式列表
export const consultTypeList = [{
    label: '来电',
    value: '1'
}, {
    label: '在线',
    value: '2'
}]

export const resourceConsultTypeList = [
    {
		label: '在线',
		value: ONLINE
	},
	{
		label: '电话',
		value: INCALL
	},
]

// 状态
export const statusList = [{
    label: '正常',
    value: '0'
}, {
    label: '停用',
    value: '1'
}]

// 是否列表
export const yesnoList = [{
    label: '是',
    value: 'Y'
}, {
    label: '否',
    value: 'N'
}]

// 是否展示智能会话分析的操作按钮
export const smartChatAnalysisPlanEdit = 'smart_chat_analysis_plan_edit'
