function get(key, list) {
  if (key !== undefined) {
      const tmp = list.find((x) => {
          return x.id == key;
      });
      if (tmp) return tmp.name;
      return '';
  } else {
      return list;
  }
}

// 图文咨询-问题列表-问题状态
export function getQuestionStatus(key) {
  const list = [
      { id: 'ANSWERED', name: '已回答' },
      { id: 'NOT_ANSWER', name: '未回答' },
      { id: 'DELETE', name: '已删除' },
  ];
  return get(key, list);
}

// 图文咨询-问题列表-审核状态
export function getReplyAuditStatus(key) {
  const list = [
      { id: 'UN_COMMIT_AUDIT', name: '未提交' },
      { id: 'UN_AUDIT', name: '未审核' },
      { id: 'AUDIT_PASS', name: '审核通过' },
      { id: 'AUDIT_UN_PASS', name: '审核未通过' },
  ];
  return get(key, list);
}

// 图文咨询-统计列表-解决状态
export function getQuestionSolveStatus(key) {
  const list = [
      { id: 'Y', name: '已采纳' },
      { id: 'N', name: '未采纳' }
  ];
  return get(key, list);
}

// 专家机构审核-审核状态
export function getExpertCheckStatus(key) {
  const list = [
      { id: '0', name: '未审核' },
      { id: '1', name: '已审核' },
      { id: '2', name: '审核不通过' },
  ];
  return get(key, list);
}

//专家问诊管理端 - 问诊导入 - 预约方式
export function getInterrogationImportBookMode(key) {
  const list = [
      { id: '00', name: '导入' },
      { id: '01', name: '体验导入' },
  ];
  return get(key, list);
}

//专家问诊管理端 - 问诊导入 - 问诊方式
export function getInterrogationImportServiceMode(key) {
  const list = [
      { id: 'inquiry_online', name: '线上' },
      { id: 'inquiry_offline', name: '线下' },
  ];
  return get(key, list);
}

//专家问诊管理端 - 问诊导入 - 权益状态
export function getInterrogationImportDeductStatus(key) {
  const list = [
      { id: '00', name: '未扣次' },
      { id: '01', name: '扣次成功' },
      { id: '02', name: '扣次失败' },
      { id: '99', name: '无需扣次' },
  ];
  return get(key, list);
}


function getNew(key, list) {
  if (key !== undefined) {
      const tmp = list.find((x) => {
          return x.value == key;
      });
      if (tmp) return tmp.label;
      return '';
  } else {
      return list;
  }
}

//会员营销位管理-展示位类型
export function getMemberBannerManageDisplayType(key) {
  const list = [
      { value: '1', label: '会员咨询页-实务咨询营销位' },
      { value: '2', label: '会员咨询页-专家咨询营销位' },
      { value: '3', label: '会员-顶部营销位' },
      { value: '4', label: 'h5会员-顶部营销位' },
  ];
  return getNew(key, list);
}

//会员营销位管理-状态
export function getMemberBannerManageStatus(key) {
  const list = [
      { value: '0', label: '未启动' },
      { value: '1', label: '未开始' },
      { value: '2', label: '已过期' },
      { value: '3', label: '使用中' },
      { value: '4', label: '已结束' },
      { value: '5', label: '已下架' },
  ];
  return getNew(key, list);
}

//问诊管理-问诊类型
export function getInterrogationListInquiryType(key) {
  const list = [
      { value: '1', label: '专家问诊' },
      { value: '2', label: '专属顾问' },
  ];
  return getNew(key, list);
}

//咨询产品类型-状态
export function getConsultProductionTypeStatus(key) {
  const list = [
      { value: '1', label: '有效' },
      { value: '2', label: '禁用' },
  ];
  return getNew(key, list);
}

//会员营销位管理-展示位类型
export function getCallAndOnlineMonitorSortRuleList(key) {
  const list = [
      { value: 'default', label: '默认排序' },
      { value: 'queues_num', label: '排队数排序' },
      { value: 'connect_rate', label: '接通率排序' },
  ];
  return getNew(key, list);
}
