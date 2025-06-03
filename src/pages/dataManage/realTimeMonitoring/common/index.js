/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-09-11 15:46:42
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-09-19 17:27:07
 * @FilePath: /askone-manage-pc/src/pages/dataManage/realTimeMonitoring/common/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export function getConnectRatioTypeText(type) {
  switch (type) {
    case '01':
      return "正常";
    case '02':
      return "高于最高阈值";
    case '03':
      return "低于最低阈值";
    default:
      return "-";
  }
}
export function getConnectRatioTypeColor(type) {
  switch (type) {
    case '02':
      return "warning-color"; // 高于 黄色
    case '03':
      return "red-color"; // 低于 红色
    default:
      return "";
  }
}

export function getConnectRatioThreshold(low = 0, high = 1) {
  if(!low) {
    low = 0
  }
  if(!high) {
    high = 1
  }
  let text = "";
  if (low || low === 0) {
    text = (low * 100) + "%";
  }
  if (high || high === 0) {
    text = text + "-" + (high * 100) + "%";
  }
  return text || "-";
}