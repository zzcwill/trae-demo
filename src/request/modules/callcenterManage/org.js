/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2021-09-13 14:30:19
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-01-17 10:21:27
 * @FilePath: /askone-manage-pc/src/request/modules/callcenterManage/org.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export default {
    getCompanyList : "/org/companyList", // 查询分公司列表
    getOrgTree: 'org/tree', // 查询组织机构树接口（内部资料管理）
    getDepartmentList: '/org/departmentList', // 查询分子公司部门列表接口
    getCMClassifyList:'/classify/list', // 获取分类树接口 - 不同后台调用接口是一个接口
}
