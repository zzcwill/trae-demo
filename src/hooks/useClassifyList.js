/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2022-08-30 13:38:02
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-01-08 15:08:10
 * @FilePath: /askone-manage-pc/src/hooks/useClassifyList.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useEffect, useState } from 'react'
import Api from "@/request/api-olhelpmanage.js";
import { get } from '@/request/request'
import { message } from 'dpl-react';

export default function useClassifyList(types, url = Api.getClassifyList) {
  const [classifyList, setClassifyList] = useState([]);
  // 获取业务分类，获取全部，在预览是一同使用，避免多次查询
  const getClassificationList = async () => {
    const res = await get({
      url,
      params: {
        types: types ? types?.join(',') : undefined
      },
    });
    if (res.success) {
      const data = res.data;
      if (data && data.length) {
          const list = data.reduce((pre, cur) => {
            if (!cur || (types && !types?.includes(cur.type))) {
              return pre;
            }
            return [
              ...pre,
              cur.list?.map(cur => ({
                label: cur.name,
                value: cur.code
              })) || []
            ]
          }, []);
          setClassifyList(list);
      } else {
          message.error(res.message);
      }
    }
  }

  useEffect(() => {
    getClassificationList();
  }, [JSON.stringify(types || [])]);

  return classifyList
}
