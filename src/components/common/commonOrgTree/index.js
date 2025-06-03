/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-05-23 17:15:42
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-05-27 17:12:30
 * @FilePath: /askone-manage-pc/src/components/common/commonOrgTree/index.js
 * @Description: 机构树 
 * 经营中心+大区选择树
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useEffect } from 'react';
import { TreeSelect } from 'dpl2-proxy';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';

const { SHOW_ALL } = TreeSelect;
const DATA_SOURCE_ALL = 'all';
const defaultFormatObj = {
  value: 'code',
  title: 'fullName',
  children: 'childList'
};

const CommonOrgTree = (props) => {
  const {
    orgList,
    dataSourceType = DATA_SOURCE_ALL, // 默认全层级
    formatObj = defaultFormatObj,
    value,
    onChange,
    multiple,
    ...restProps
  } = props;
  

  const [treeData, setTreeData] = useState([]);

  useEffect(() => {
    if (orgList) {
      setTreeData(orgList);
    } else {
      fetchOrgTree();
    }
  }, [orgList]);

  const fetchOrgTree = async () => {
    try {
      const func = dataSourceType === DATA_SOURCE_ALL ? CallCenterManageApi.getOrgGetAllRegionTree : CallCenterManageApi.getOrgGetRegionTreeByCode;
      const response = await func();
      // ztest
      if(!Array.isArray(response.data)) {
        response.data = [
          {
            ...response.data
          }
        ]
      }
      if (response.success && Array.isArray(response.data)) {
        setTreeData(formatTreeData(response.data));
      }
    } catch (error) {
      console.error('获取组织树失败:', error);
    }
  };

  const formatTreeData = (data) => {
    return data.map(item => ({
      value: item[formatObj.value],
      title: item[formatObj.title],
      children: item[formatObj.children] ? formatTreeData(item[formatObj.children]) : undefined,
      ...item
    }));
  };

  const tProps = {
    treeData: treeData,
    value,
    onChange,
    multiple,
    treeCheckable: multiple ? true : false,
    allowClear: true,
    showCheckedStrategy: SHOW_ALL,
    maxTagCount: 'responsive',
    treeNodeFilterProp: 'title',
    placeholder: '请选择',
    style: {
      width: '100%',
    },
    ...restProps
  };

  return <TreeSelect {...tProps} />;
};

export default CommonOrgTree;
