/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-03-01 16:05:51
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-03-01 16:10:08
 * @FilePath: /askone-manage-pc/src/components/FormTitle/index.jsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React from "react";
import './index.scss'

export default function FormTitle(props){
  const { title } = props;
  return <div className="form-container-title">{title}</div>;
}
