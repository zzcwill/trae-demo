export default {
  getLogList: '/robot/log/list?startTime={startTime}&endTime={endTime}&evaluationStartTime={evaluationStartTime}&evaluationEndTime={evaluationEndTime}', // 查询机器人咨询满意度信息
  getExportExcel: '/robot/log/export?startTime={startTime}&endTime={endTime}&evaluationStartTime={evaluationStartTime}&evaluationEndTime={evaluationEndTime}&', // 导出机器人咨询满意度信息
  getWdList: '/robot/wdList', // 获取维度列表
  getRobotQuestionList: "/robot/questionList", // 查询机器人列表
  getRobotQuestionDetail:"/robot/questionDetail", // 查询机器人问题答案
  getQueueAbandonLogList:'/queueabandon/log/list',
  getQueueAbandonLogeExport:'/queueabandon/log/export'
};
