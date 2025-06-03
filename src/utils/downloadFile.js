/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2022-11-30 15:05:57
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-01-15 15:17:56
 * @FilePath: /askone-manage-pc/src/utils/downloadFile.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import {baseUrl} from '../const/index'

export default function (url, needBase = false) {
  if(needBase) {
    url = baseUrl + url
  }
  let download = document.createElement('a')
  download.setAttribute('href', url)
  download.setAttribute('target', '_blank')
  download.setAttribute('download', url)
  download.style.display = 'none'
  document.body.appendChild(download)
  download.click()
  document.body.removeChild(download)
}
