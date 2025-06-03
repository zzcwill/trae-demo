import React, { useState, useEffect } from 'react';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import CallCenterWebApi from '@/requestApi/callcenterweb/api'
import { StoreContext } from './context';
import { SearchInfo } from './components/searchInfo';
import { TaskTable } from './components/taskTable';
import { DeleteTaskBtn } from './components/deleteTaskBtn';
import { AddTaskBtn } from './components/addTaskBtn';
import { TaskDrawer } from './components/taskDrawer';
import './index.scss';

const initSearchData = {
  handleUserId: undefined, // 机构名称
  locationCodeList: undefined, // 地区
  pageIndex: 1,
  pageSize: 10,
};

const initTableData = {
  tableSelectData: [],
  tableList: [],
  tableTotal: 0,
};

export default function TraineeTaskList() {
  const [currentUser, setCurrentUser] = useState({
    id: ''
  }); // 当前用户信息
  const [searchData, setSearchData] = useState(initSearchData); // 查询条件
  const [tableData, setTableData] = useState(initTableData); // 表格数据
  const [tableLoad, setTableLoad] = useState(false); // 表格加载状态
  const [businessList, setBusinessList] = useState([]); // 业务列表
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false); // 任务抽屉是否打开
  const [apiBrandList, setApiBrandList] = useState([]); // 产品维度列表
  const [caseTemplateUrl, setCaseTemplateUrl] = useState(''); // 案例模板url

  // 查询表格
  const toSearchTable = async (newSearchData) => {
    setTableLoad(true);

    try {
      let paramData = searchData;

      if (newSearchData) {
        paramData = newSearchData;
      }

      const resData = await CallCenterManageApi.postTaskList(paramData);
      // console.info('toSearchTable', resData);

      resData.data.list = resData.data.list.map((newItem, index) => {
        newItem.key = newItem.id;
        // if (index === 0) {
        //   newItem.taskName = '任务名称任务名称任务名称任务名称任务名称任务名称任务名称任务名称任务名称任务名称任名称任名称任名称任';
        // }
        return newItem;   
      })

      setTableData({
        tableSelectData: [],
        tableList: resData.data.list || [],
        tableTotal: resData.data.total || 0,
      });
    } catch (error) {
      setTableData(initTableData);
      console.error('toSearchTable', error);
    } finally {
      setTableLoad(false);
    }
  };


  // 获取业务分类列表
  const getBusinessList = async () => {
    try {
      const paramData = {
        groupNames: 'ipt_business_classify',
      };
      const resData = await CallCenterManageApi.getCommonOptions(paramData);
      // console.info('getBusinessList', resData.data);
      if(resData.data.length > 0) {
        const dataList = resData.data[0].options || [];
        setBusinessList(dataList);
      }
    } catch (error) {
      setBusinessList([]);
    }
  }

  // 获取产品维度列表
  const getApiBrandList = async () => {
    try {
      const paramData = {
        typeList: 'brand'
      }
      const resData = await CallCenterManageApi.getCommonDimensionList(paramData);
      if (resData.success) {
        if (resData.data.length > 0) {
          const needData = resData.data[0].dimensionParamList || []
          setApiBrandList(needData);          
        }
      }
    } catch (error) {
      console.error('error', error);
    }  
  }

  // 获取案例模板url
  const getCaseTemplateUrl = async () => {
    const resData = await CallCenterManageApi.getTaskTemplate();
    // console.info('getCaseTemplateUrl', resData);
    const toUrl = resData.data || '';
    setCaseTemplateUrl(toUrl);
  };  

  // 获取当前用户信息
  const getCurrentUser = async () => {
    const resData = await CallCenterManageApi.getUserCurrentUser();
    // console.info('getCurrentUser', resData);
    if (resData.data) {
      setCurrentUser(resData.data);
    }
  };  


  // 页面初始化
  const initPageData = async () => {
    getCurrentUser();
    getBusinessList();
    getApiBrandList();
    getCaseTemplateUrl()
    toSearchTable();
  };

  useEffect(() => {
    initPageData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);  

  return (
    <StoreContext.Provider 
      value={{
        tableLoad,
        currentUser,
        businessList,
        apiBrandList,
        caseTemplateUrl,
        initSearchData,
        searchData,
        setSearchData,
        tableData,
        setTableData,
        toSearchTable,
        taskDrawerOpen,
        setTaskDrawerOpen,   
      }}
    >
      <div className="smart-sparring-task-list">
        <SearchInfo />
        <div className="table-info">
          <div className="table-info-head mb-12">
            <AddTaskBtn className='mr-12' />
            <DeleteTaskBtn className='mr-12' />
          </div>
          <TaskTable />
        </div>
        <TaskDrawer />
      </div>
    </StoreContext.Provider>
  );
}
