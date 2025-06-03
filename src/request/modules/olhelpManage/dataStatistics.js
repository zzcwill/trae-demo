/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-08-02 16:49:00
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-08-07 14:31:12
 * @FilePath: /askone-manage-pc/src/request/modules/olhelpManage/dataStatistics.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export default {
    getDmPersonaList: '/dm/persona/list',
    getDmPersonaConsultList: '/dm/persona/consultList',
    getDmPersonalDetail:'/dm/persona/detail',
    getDmPersonalTagStatistics:'/dm/persona/tagStatistics',

    getDmConsultTagStatistics: '/dm/consult/tagStatistics',
    getDmConsultMonthStatistics:'/dm/consult/monthStatistics',
    getDmConsultLocationStatistics: '/dm/consult/locationStatistics',
    getDmConsultLastTagStatistics:'/dm/consult/lastTagStatistics',
    getDmConsultGetYearTag:'/dm/consult/getYearTag',
    getNoAnswerList: '/selfservice/noAnswerList', // 查询错误提示无答案日志
    getErrorWarnList: '/selfservice/errorWarnList', // 错误告警列表
    postIgnoreErrorWarn: '/selfservice/ignoreErrorWarn', // 忽略错误告警
    postRemoveIgnoreErrorWarn: '/selfservice/removeIgnoreErrorWarn', // 移除忽略错误告警
  }
  