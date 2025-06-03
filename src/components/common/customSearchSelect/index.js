/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-06-09 14:08:28
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-10-15 12:33:24
 * @FilePath: /askone-manage-pc/src/components/common/customSearchSelect/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useEffect, useMemo } from "react";
import { Select, message } from "dpl-react";
import { get, post } from "@/request/request";
import debounce from "lodash/debounce";
const Option = Select.Option;
const defaultFormat = {
  searchKey: "keyword",
  value: 'id',
  label: 'name',
}

export default function CustomSearchSelect(props) {
  const { onChange, value, api, format = defaultFormat, ...other } = props;
  const [employeeList, setEmployeeList] = useState([]); // 人员列表
  const [isFirst, setIsFirst] = useState(true); // 第一次进入
  const [cacheSelectedNameFilter, setCacheSelectedNameFilter] = useState([]); // 缓存选择的坐席
  /**
   * 查询接口
   * @param {String} keyword
   */
  const getKeywordQuery = async (keyword) => {
    if (!keyword) {
      return;
    }
    const res = await get({
      url: api,
      params: {
        [format.searchKey]: keyword,
      },
    });
    if (res.success) {
      const data = res.data;
      sortEmployees(data);
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    if (isFirst && value) {
      setIsFirst(false);
      getKeywordQuery(value);
    }
  }, [value]);

  const cacheFilterUsers = (value) => {
    // 把所有选择过的人缓存下来
    setCacheSelectedNameFilter(employeeList?.filter(employee => value?.includes(employee[format.value])))
  }

  const sortEmployees = (list) => {
    setEmployeeList([
      ...(cacheSelectedNameFilter || []),
      ...(list || employeeList || []).filter(employee => !value?.includes(employee[format.id]))
    ])
  }

  return (
    <Select
      className="employee-search-box"
      onSearch={debounce(getKeywordQuery, 600)}
      value={value}
      showSearch
      onChange={(value) => {
        onChange(value);
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
            <Option key={item[format.value]} value={item[format.value]}>
              {item[format.label]}
            </Option>
          );
        })}
    </Select>
  );
}
