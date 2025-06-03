/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-10-08 18:36:53
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-11-12 14:29:21
 * @FilePath: /askone-manage-pc/src/requestApi/.api.config.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
// 配置文档见： http://npm.dc.servyou-it.com/-/web/detail/@servyou/walle-code
// 配置完成后运行 `yarn api`, 开始加班吧!
module.exports = {
  // 路径相对工程根目录
  output: './src/requestApi',
  projects: [
    {
      // 项目ID在walle平台(https://walle.dc.servyou-it.com/project/470)获取
      // 比如 url 中的470就是项目ID
      projectId: 149, //callcentermanage
      useIncrementMode: true,
      // 如果在axios拦截器中对返回结果进行提取了，就需要配置dataKeys为[]或者[]
      // dataKeys: [],
      // 根据分类名称生成部分接口
      // controllers: ['UserController'],
    },
    {
      projectId: 129, //yypt-olhelp-manage
      useIncrementMode: true,
    },
    {
      projectId: 143, //callcenterweb
      useIncrementMode: true,
    }
  ],
};
