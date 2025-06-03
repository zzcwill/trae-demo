export default {
    getCommonLabels: '/common/tag/tree', //查询问题标签
    getQuestionList:"/ask/question/list", // 查询问题列表接口
    getQuestionDetail: "/ask/question/detail", // 查询问题 (新增问题的时候)
    getReplyDetail: "/ask/question/reply", // 查询问题+回答详情
    getAskQuestionRecordList: '/ask/question/record/list',//根据手机号查询咨询记录接口
    postSaveReply:"/ask/reply/save", // 新增回答
    postUpdateReply:"/ask/reply/update", // 更新回答
    postDeleteReply:"/ask/reply/delete", // 删除回答
    getQuestionAuditList:"/ask/question/audit/list", // 查询审核列表接口
    postUpdateQuestionRecommend: "/ask/question/recommend/update", // 修改是否推荐
    postSaveAudit:"/ask/reply/audit", // 审核回答
    getAskQuestionDataList: "/ask/question/data/list", //获取问题统计信息
    getAskQuestionVoteDownList: "/ask/question/voteDown/detail", //获取踩详情
}