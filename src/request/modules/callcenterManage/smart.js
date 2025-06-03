/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-02-29 20:50:26
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-09-05 19:23:48
 * @FilePath: /askone-manage-pc/src/request/modules/callcenterManage/smart.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import getPermission from "@/utils/getPermission";

export default { 
  getIntelligentAnalysisManageSessionAnalysisList: '/smart/chat/analysis/plan/page', // 会话分析列表查询接口
  publishScheme: "/smart/chat/analysis/plan/publish", // 方案发布接口
  unpublishScheme: "/smart/chat/analysis/plan/cancel/publish", // 方案撤销接
  planDetailQuery: "/smart/chat/analysis/plan/detail", // 方案详情查询接口
  getAllRuleList: "/smart/chat/analysis/plan/config/rule", // 获取所有规则列表
  saveRuleInfo: "/smart/chat/analysis/plan/rule/save", // 保存规则信息
  getRemotConfig: "/smart/chat/analysis/plan/config", // 获取远端配置数据
  getPreviewContent: "/smart/chat/analysis/plan/preview", // 获取预览内容
  saveTargetInfo: "/smart/chat/analysis/plan/target/save", // 保存方案目标信息
  targetDetailQuery: "/smart/chat/analysis/plan/target/detail", // 方案目标详情查询接口
  getPermissionList: "/permission/list",
  getSmartChatAnalysisTaskPage: "/smartChatAnalysisTask/page", // 会话分析任务列表查询接口
  getSmartChatAnalysisTaskExport: "/smartChatAnalysisTask/task/export", // 会话分析任务列表导出接口
  getSmartChatAnalysisPlanPreviewSnapshot: "/smart/chat/analysis/plan/preview/snapshot", // 方案预览快照接口
  getSmartChatByMessageId: '/smart/chat/analysis/plan/message', // 根据messageID查询会话
  testPlan: '/smart/chat/analysis/plan/test', // 会话分析方案测试接口
  getFmtAnswer: '/smart/chat/analysis/plan/getFmtAnswer', // 根据fmttLogId获取fmtAnswer
  getAnalysisTaskConfigList: 'smartChatAnalysisTask/getSpecific', // 获取指定大模型配置列表
  postCancelsmartChatAnalysisTask: '/smartChatAnalysisTask/task/cancel', // 取消智能会话分析任务
  getPlanPreview: 'smart/chat/analysis/plan/preview/plan', // 列表直接预览方案预览接口
  getSmartChatAnalysisPlanGetAnalysisResult: '/smart/chat/analysis/plan/getAnalysisResult' // 测试会话分析方案-解析结果
}
