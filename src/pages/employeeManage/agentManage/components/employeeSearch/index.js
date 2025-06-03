/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-03-11 10:06:07
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-09-11 20:16:57
 * @FilePath: /askone-manage-pc/src/pages/employeeManage/agentManage/components/employeeSearch/index.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useEffect, useMemo } from "react";
import { Select, message } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import debounce from "lodash/debounce";
const Option = Select.Option;

const valueFarmatDefault = {
  value: 'trueId',
  label: 'userName',
};

export default function EmployeeSearch(props) {
  const { onChange, value, other } = props;
  const valueFarmat = other?.valueFarmat || valueFarmatDefault;
  
  const [employeeList, setEmployeeList] = useState([]); // 人员列表
  const [isFirst, setIsFirst] = useState(true); // 第一次进入
  const [cacheSelectedNameFilter, setCacheSelectedNameFilter] = useState([]); // 缓存选择的坐席
  /**
   * 查询接口
   * @param {String} keyword
   */
  const getUserFuzzyQuery = async (keyword) => {
    if (!keyword || (Array.isArray(keyword) && keyword.length === 0)) {
      return;
    }
    const res = await get({
      url: Api.getUserFuzzyQuery,
      params: {
        keyword,
      },
    });
    if (res.success) {
      const data = res.data;
      sortEmployees(data);
      setIsFirst(false);
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    if (isFirst && value) {
      getUserFuzzyQuery(value);
    }
  }, [value]);

  const cacheFilterUsers = (value) => {
    // 把所有选择过的人缓存下来
    setCacheSelectedNameFilter(employeeList?.filter(employee => value?.includes(employee[valueFarmat.value])))
  }

  const sortEmployees = (list) => {
    setEmployeeList([
      ...(cacheSelectedNameFilter || []),
      ...(list || employeeList || []).filter(employee => !value?.includes(employee[valueFarmat.value]))
    ])
  }

  return (
    <Select
      className="employee-search-box"
      onSearch={debounce(getUserFuzzyQuery, 600)}
      value={value}
      showSearch
      onChange={(value) => {
        onChange(value, employeeList?.filter(employee => value?.includes(employee[valueFarmat.value])));
        cacheFilterUsers(value);
      }}
      onFocus={(e) => {
        other?.onFocus?.(e);
        // 失去焦点的时候，对数据进行排序，保证选择过的人永远在最前面
        sortEmployees();
      }}
      filterOption={false}
      allowClear
      {...other}
    >
      {employeeList.length > 0 &&
        employeeList.map((item) => {
          return (
            <Option key={item[valueFarmat.value]} value={item[valueFarmat.value]}>
              {item[valueFarmat.label]}
            </Option>
          );
        })}
    </Select>
  );
}
