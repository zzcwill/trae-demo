export default {
  postGroupDelete: "/group/delete", // 组管理停用接口
  postSaveGroup: "/group/save", // 组管理新增接口
  postUpdateGroup: "/group/update", // 组管理修改接口
  getInCallList: "/group/incall/list", // 电话组管理查询接口
  getGroupDetail: "/group/incall/detail", // 电话组管理详情接口
  getOnlineGroupList: "/group/online/list", // 在线组管理查询接口
  getOnlineGroupDetail: "/group/online/detail", // 在线组管理详情接口
  getGroupPriortyList: "/agent/listGroupPriority", // 查询组优先级列表接口
  groupEnable:'/group/enable',
  getGroupCompletingRateGlobalConfig:"/group/callCompletingRateAlarm/globalConfig/detail", // 在线全局告警配置
  postSaveGroupCompletingRateGlobalConfig:"/group/callCompletingRateAlarm/globalConfig/save", // 在线全局告警配置
};
