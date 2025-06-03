/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-08-31 14:41:38
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-08-31 15:56:03
 * @FilePath: /askone-manage-pc/src/components/common/customCheckbox/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Checkbox } from "dpl-react";
export default function customCheckbox(props) {
  const { defaultValue, value, onChange, children } = props;
  return <Checkbox defaultChecked={defaultValue} checked={value} onChange={onChange} >{children}</Checkbox>;
}