import React, { useContext } from 'react';
import CallCenterWebApi from '@/requestApi/callcenterweb/api';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import { Button, message } from 'dpl2-proxy';
import { StoreContext } from '../../context';

export const DeleteTaskBtn = ({ 
  className 
}) => {
  const storeContext = useContext(StoreContext);
  const {
    tableData,
    searchData,
    setSearchData,
    toSearchTable,
    currentUser,
  } = storeContext;

  const onClickClose = async () => {
    if (!tableData.tableSelectData.length) {
      message.warning('请先勾选数据');
      return;
    }

    let isCanDelete = true;
    tableData.tableSelectData.forEach((item) => {
      if (item.creatorId !== currentUser.id) {
        isCanDelete = false;
      }
    });
    
    if(!isCanDelete) {
      message.error('出错了！仅可删除创建人为自己的任务');
      return; 
    }

    try {
      const parmData = {
        idList: tableData.tableSelectData.map((item) => item.id),
      };
      const resData = await CallCenterManageApi.postTaskDelete(parmData);
      console.info('onCloseAll', resData);

      if (!resData.success) {
        message.error(resData.message);
        return;
      }


      const newSearchData = {
        ...searchData,
        pageIndex: 1,
      };
      setSearchData(newSearchData);      
      toSearchTable(newSearchData);
      message.success('删除成功！');
    } catch (error) {
      console.error('onCloseAll_error', error);
    }
  };

  return (
    <Button
      className={className}
      onClick={onClickClose}
    >
      删除任务
    </Button>
  );
};
