/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-05-27 15:57:27
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-05-27 16:24:27
 * @FilePath: /askone-manage-pc/src/components/common/businessCenterCascader/index.js
 * @Description: 查询大区组织树（经营中心+大区）（不含三级部门）, code为空会查询全部的经营中心和经营中心下的大区
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useEffect } from 'react';
import { Cascader } from 'dpl2-proxy';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';

const defaultFormatObj = {
  value: 'code',
  label: 'fullName',
  children: 'childList'
};

const BusinessCenterCascader = (props) => {
  const {
    regionList,
    formatObj = defaultFormatObj,
    value,
    onChange,
    ...restProps
  } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (regionList) {
      setOptions(formatTreeData(regionList));
    } else {
      fetchOrgTree();
    }
  }, [regionList]);

  const fetchOrgTree = async () => {
    try {
      const response = await CallCenterManageApi.getOrgGetRegionTreeByCode();
      if (response.success && Array.isArray(response.data)) {
        setOptions(formatTreeData(response.data));
      }
    } catch (error) {
      console.error('获取组织树失败:', error);
    }
  };

  const formatTreeData = (data) => {
    return data.map(item => ({
      value: item[formatObj.value],
      label: item[formatObj.label],
      children: item[formatObj.children] ? formatTreeData(item[formatObj.children]) : undefined,
      ...item
    }));
  };

  const handleChange = (value) => {
    onChange && onChange(value);
  };

  const cascaderProps = {
    options,
    value,
    onChange: handleChange,
    allowClear: true,
    showSearch: true,
    maxTagCount: "responsive",
    showCheckedStrategy: Cascader.SHOW_CHILD,
    placeholder: '请选择',
    style: {
      width: '100%',
    },
    ...restProps
  };

  return <Cascader {...cascaderProps} />;
};

export default BusinessCenterCascader;
