/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2022-06-06 10:30:18
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-09-05 15:44:55
 * @FilePath: /askone-manage-pc/src/store.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { createStore, action } from "easy-peasy";
import consultManageLandingPageConfig from "./pages/consultManage/landingPageConfig/model";
const model = {
  consultManageLandingPageConfig,
  dataStatisticsManage: {
    yearList: [], // 咨询入口信息
    setYearList: action((state, payload) => {
      state.yearList = [...payload];
    }),
  },
  commonUserInfo: { // 用户信息
    userInfo: {},
    setUserInfo: action((state, payload) => {
      state.userInfo = { ...payload };
    }),
  },
};
const store = createStore(model);

export default store;
