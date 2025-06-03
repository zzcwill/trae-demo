/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-01-08 14:47:20
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-01-17 10:33:23
 * @FilePath: /askone-manage-pc/src/request/modules/callcenterManage/isdConfig.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export default {
    getIsdConfigPage: "/isdConfig/page", // 分页查询对内服务数字化配置
    getIsdConfigSystemAndModuleQuery: '/isdConfig/systemAndModule/query', // 查询对内服务数字化产品和模块配置
    postUpdateIsdConfigPage: '/isdConfig/update', // 修改对内服务数字化配置
    batchDelItem: '/isdConfig/batchDelete', // 批量删除配置
}
