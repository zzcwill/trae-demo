/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-03-06 14:03:54
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-10-12 14:36:32
 * @FilePath: /askone-manage-pc/src/hooks/useParamsList.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useEffect, useState } from 'react'
import { message } from 'dpl-react';

const defaultFormatOptions = {
  requestKey: 'groupNames',
  responseKey: 'groupName',
  responseOptionsKey: 'options',
  label: 'name',
  value: 'id'
};

export default function useParamsList(types, func, formatOptions = defaultFormatOptions) {
  const [dictList, setDictList] = useState([]);
  // 获取业务分类，获取全部，在预览是一同使用，避免多次查询
  const getDictList = async () => {
    const res = await func({
      [formatOptions.requestKey]: types ? types?.join(',') : undefined
    });
    if (res.success) {
      const data = res.data;
      if (data && data.length) {
          const list = data.reduce((pre, cur) => {
            if (!cur || (types && !types?.includes(cur[formatOptions.responseKey]))) {
              return pre;
            }
            return [
              ...pre,
              cur[formatOptions.responseOptionsKey]?.map(cur => ({
                label: cur[formatOptions.label],
                value: cur[formatOptions.value]
              })) || []
            ]
          }, []);
          setDictList(list);
      } else {
          message.error(res.message);
      }
    }
  }

  useEffect(() => {
    getDictList();
  }, [JSON.stringify(types || [])]);

  return dictList;
}
