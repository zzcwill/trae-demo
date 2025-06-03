import React, { useEffect, useState } from 'react';
import { Select } from 'dpl2-proxy';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import { debounce } from 'lodash';

export default function TaskSelectDpl2(props) {
  const { 
    onChange = () => {}, 
    value,
    initApiDataList = [],
    ...otherProps 
  } = props;

  const [apiDataList, setApiDataList] = useState([]);

  const getApiDataList = async (value) => {
    if (!value) {
      return;
    }

    const keyword = value.trim();

    const paramData = {
      keyword,
    };
    try {
      const resData = await CallCenterManageApi.postSimpleList(paramData);
      let dataList = resData.data || [];

      dataList = dataList.map((itemQ) => {
        const newItem = {
          name: itemQ.taskName,
          value: itemQ.id
        }
        return newItem;
      })
      setApiDataList(dataList)
    } catch (error) {
      console.error(error);
    }
  } 

  const onSearchDebounce = debounce(getApiDataList, 600); 
  
  useEffect(() => {
    setApiDataList(initApiDataList)
  }, []);
  
  return (
    <Select
      {...otherProps}
      value={value}
      onSearch={onSearchDebounce}
      onChange={onChange}                                 
    >
      {
        apiDataList.map((itemK) => {
          return (
            <Select.Option key={itemK.value} value={itemK.value}>{`[${itemK.value}]${itemK.name}`}</Select.Option>
          )
        })
      }
    </Select>
  )
}