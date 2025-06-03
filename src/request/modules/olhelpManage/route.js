/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-08-14 14:45:14
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-08-14 18:52:39
 * @FilePath: /askone-manage-pc/src/request/modules/olhelpManage/route.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export default {
    routeRuleList: '/route/rule/list',
    getCommonGroupList: '/common/groupList',
    routeRuleSort: '/route/rule/sort',
    routeRuleSave: '/route/rule/save',
    routeRuleUpdate: '/route/rule/update',
    routeRuleDetail: '/route/rule/detail',
    routeRuleDelete: '/route/rule/delete',
    routeRuleInteractDetail: '/route/rule/interact/detail',
    routeRuleInteractSave: '/route/rule/interact/save',
    routeRuleFeedbackSave: '/route/rule/feedback/save',
    routeRuleFeedbackDetail: '/route/rule/feedback/detail',
    routeRuleWindowSave: '/route/rule/window/save',
    routeRuleWindowDetail: '/route/rule/window/detail',
    routeRuleChatTipDetail: '/route/rule/chatTip/detail',
    routeRuleChatTipSave: '/route/rule/chatTip/save',
    routePolicyDetail: '/route/policy/detail',
    routePolicySave: '/route/policy/save',
    routePolicyUpdate: '/route/policy/update',
    routePolicyList: '/route/policy/list',
    routePolicyDelete: '/route/policy/delete',
    globalInteractDetail: '/route/rule/global/interact/detail',
    globalInteractSave: '/route/rule/global/interact/save',
    globalWindowDetail: '/route/rule/global/window/detail',
    globalWindowSave: '/route/rule/global/window/save',
    globalFeedbackDetail:'/route/rule/global/feedback/detail',
    globalFeedbackSave:'/route/rule/global/feedback/save',
    globalChatTipDetail:'/route/rule/global/chatTip/detail',
    globalChatTipSave:'/route/rule/global/chatTip/save',
    getRoutePriorityList:"/route/priority/list", // 查询路由优先级配置列表
    getRoutePriorityDetail:"/route/priority/detail", // 查询路由优先级配置
    postDeleteRoutePriority:"/route/priority/delete", // 删除路由优先级配置
    postSaveRoutePriority:"/route/priority/save", // 保存路由优先级配置
    postUpdateRoutePriority:"/route/priority/update", // 修改路由优先级配置
    postBatchOperateUpdate: "route/rule/batchOperate/update", // 批量修改路由规则
    postBatchOperateCopy: "route/rule/batchOperate/copy", // 批量复制路由规则
    postBatchOperateCheckConfig: "route/rule/batchOperate/checkConfig", //校验路由规则是否在全局配置中
    getRouteRuleOptionConfigList: '/route/rule/getRouteRuleOptionConfigList', // 获取路由规则配置项
    postPriorityBatchUpdate: "route/priority/batchUpdate", // 批量修改路由优先级配置
    postCheckGlobalConfig: "route/rule/batchUpdate/checkGlobalConfig", // 批量修改路由规则校验全局配置
    postFeedbackBatchUpdate: '/route/rule/feedback/batchUpdate', // 批量更新满意度评价配置
    postChatTipBatchUpdate: '/route/rule/chatTip/batchUpdate', // 批量更新对话提示页面配置
    postWindowBatchUpdate: '/route/rule/window/batchUpdate', // 批量更新路由规则窗口界面
}
