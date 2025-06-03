/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-02-21 19:00:44
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-02-21 19:01:19
 * @FilePath: /askone-manage-pc/src/utils/warden.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
export const sendWarden = (eventId, params) => {
  console.log('sendWarden', eventId, params);
  window.__WATCHDOGSDKINSTANCE__?.sendClick(eventId, params);
};

export const sendWardenPv = (eventId, params) => {
  console.log('sendWardenPv', eventId, params);
  window.__WATCHDOGSDKINSTANCE__?.sendPv(eventId, params);
};

export const setWardenUser = (params) => {
  /**
  {
    accountId: '123',
    customerId: '123', 短
    agentId: '', 短
    accountBizId: '123', 长
    customerBizId: '123', 长
    agentBizId: '',
  }
  */
  console.log('setWardenUser', params);
  window.__WATCHDOGSDKINSTANCE__?.setUser(params);
};

export const setWardenExtra = (params) => {
  console.log('setWardenExtra', params);
  window.__WATCHDOGSDKINSTANCE__?.setExtra(params);
};
