/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2022-08-30 13:38:02
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-08-14 18:19:15
 * @FilePath: /askone-manage-pc/src/hooks/useDictList.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useEffect, useState } from 'react'
import { get } from '@/request/request'
import { message } from 'dpl-react';

export default function useDictList(types, url) {
  const [dictList, setDictList] = useState([]);
  // 获取业务分类，获取全部，在预览是一同使用，避免多次查询
  const getDictList = async () => {
    const res = await get({
      url,
      params: {
        groupNames: types ? types?.join(',') : undefined
      },
    });
    if (res.success) {
      const data = res.data;
      if (data && data.length) {
          const list = data.reduce((pre, cur) => {
            if (!cur || (types && !types?.includes(cur.groupName))) {
              return pre;
            }
            return [
              ...pre,
              cur.options?.map(cur => ({
                label: cur.name,
                value: cur.id
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