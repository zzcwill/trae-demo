/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-08-21 15:40:53
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-08-21 19:00:37
 * @FilePath: /askone-manage-pc/src/pages/routerManage/routerRule/components/windowFilter/index.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useEffect, useState } from 'react'
import './index.scss'
import { Select } from 'dpl-react'

const Option = Select.Option;
const typeList = [
  { label: "全局配置", value: "0" },
  { label: "差异化配置", value: "1" },
];

export default function WindowFilter(props) {
	const { value = {}, onChange, customTypeList = [], key } = props;
  const [typeDisabled, setTypeDisabled]  = useState(true);

	return (
		<div className="window-config-filter" key={key}>
			<Select
				style={{ width: 200, marginRight: 10 }}
				placeholder="请选择"
				allowClear
        mode="multiple"
				onChange={(e) => {
          if (!e || e.length === 0) {
            setTypeDisabled(true);
            onChange?.({
              customTypeList: e,
              type: undefined,
            });
          } else {
            setTypeDisabled(false);
            onChange?.({
              ...value,
              customTypeList: e,
            });
          }
				}}
				className={`rule-config-item-select`}
				value={value.customTypeList}
			>
				{customTypeList.map((code) => {
					return (
						<Option value={code.value} key={code.value}>
							{code.label}
						</Option>
					)
				})}
			</Select>
      <span style={{ color: '#333', fontSize: '14px'}}>是否试用全局配置为：</span>
      <Select
				style={{ width: 200, marginRight: 10 }}
				placeholder="请选择"
				allowClear
        disabled={typeDisabled}
				onChange={(e) => {
          onChange?.({
            ...value,
            type: e,
          });
				}}
				className={`rule-config-item-select`}
				value={value.type}
			>
				{typeList.map((item) => {
					return (
						<Option value={item.value} key={item.value}>
							{item.label}
						</Option>
					)
				})}
			</Select>
		</div>
	)
}
