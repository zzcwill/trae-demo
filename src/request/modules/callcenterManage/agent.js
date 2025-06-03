export default {
  getAgentList: "/agent/list", // 坐席列表接口
  getAgentDetail: "/agent/detail", // 坐席详情接口
  getAgentGroupPriority: "/agent/listGroupPriority", // 查询组优先级列表接口
  postUpdateGroupPriorty: "/agent/updateGroupPriority", // 设置坐席组优先级接口
  postUpdataAgent: "/agent/update", // 坐席修改接口
  getBatchMainGroupList: "/agent/listMainGroup", // 批量查询选中坐席主要业务组列表接口
  postBatchUpdataMainGroupList: "/agent/batchUpdateMainGroup", // 批量修改主要业务组接口
  getBatchGroupPriortyList: "/agent/listGroupRalation", // 批量查询选中坐席组列表接口
  postBatchUpdataGroupPriorty: "/agent/batchUpdateGroupPriority", // 批量修改组优先级接口
  postBatchAddGroup: "/agent/batchSaveGroupRelation", // 批量新增坐席组接口
  postBatchUpdateAutoAllocationGroup: "/agent/batchUpdateAutoAllocation", // 批量修改自动分配
  postBatchUpdataGroup: "/agent/batchUpdateGroupRelation", // 批量修改组接口
  postBatchDeleteGroup: "/agent/batchDeleteGroupRelation", // 批量删除组接口
  postBatchUpdateMaxReception: "/agent/batchUpdateMaxReception", // 批量设置在线坐席接待上限接口
};
