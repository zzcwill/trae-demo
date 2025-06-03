export default {
  getExpertInquiryRecordList: "/expertInquiryRecord/listPage", // 专家问诊记录列表
  postExpertInquiryRecordComplete: "/expertInquiryRecord/dealInquiryRecord", // 完成/取消问诊
  postExpertInquiryRecordUpdateCancelReason: "/expertInquiryRecord/updateCancelReason", // 取消问诊更新
  postExpertInquiryRecordUpdateRecordContent: "/expertInquiryRecord/updateRecordContent", // 更新问诊服务记录
  getExpertexpertInquiryRecordExpertList: "/expertInquiryRecord/expertList", // 查询问诊专家列表
  getExpertexpertInquiryQueryExpertScheduleList: "/expertInquiryRecord/queryExpertScheduleList", // 根据问诊专家查询对应的排期列表
  postExpertexpertInquirySaveInquiryRecord: "/expertInquiryRecord/saveInquiryRecord", // 保存代预约问诊记录
  getExpertInquiryRecordExport: "/expertInquiryRecord/export", // 保存代预约问诊记录
  getExpertInquiryImportList: "/expertInquiryImport/list", // 导入记录查询列表
  getInquiryImportTemplateUrl: "/expertInquiryImport/getImportTemplateUrl", // 获取模板url
  postExpertInquiryImport: "/expertInquiryImport/import", // 导入问诊记录
  postExpertInquiryImportBatchDeductRecord: "/expertInquiryImport/batchDeductRecord",  //批量扣次
  postExpertInquiryImportNotDeductRecord: "/expertInquiryImport/notDeductRecord",  //批量扣次
}
