import React, { useContext } from 'react';
import CallCenterWebApi from '@/requestApi/callcenterweb/api';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import { Button, message } from 'dpl2-proxy';
import { StoreContext } from '../../context';

export const AddTaskBtn = ({ 
  className 
}) => {
  const storeContext = useContext(StoreContext);
  const {
    setTaskDrawerOpen,    
  } = storeContext;

  const onClickAdd = (event) => {
    setTaskDrawerOpen(true);
  };

  return (
    <Button
      type="primary"
      className={className}
      onClick={onClickAdd}
    >
      创建任务
    </Button>
  );
};
