/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-06-05 14:46:48
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-06-05 14:47:57
 * @FilePath: /askone-manage-pc/src/pages/consultManage/common/tools.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
/**
* 获取场景信息
* @param {string} target
*/
export function getSceneType(sceneList, target) {
  let value = "";
  sceneList.forEach((item) => {
      if (item.id === target) {
          value = item.showName;
      }
  });
  return value;
}
/**
* 获取会员还是专项
* @param {String} target
*/
export function getSubSceneType(subSceneList, target) {
  let value = "";
  subSceneList.forEach((item) => {
      if (item.id === target) {
          value = item.showName;
      }
  });
  return value ? `-${value}` : value;
}