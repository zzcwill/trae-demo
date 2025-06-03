import React, { useEffect, useState, useContext } from 'react';
import moment from 'moment';
import {
  Pagination,
  Button,
  Popover,
} from 'dpl2-proxy';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import AppTable from '@/components/common/betterTable'
import { taskStatusMap, taskStatusOperateTextMap, taskStatusClassMap } from '@/const/intelligentTraineeManage.js'
import { StoreContext } from '../../context';

// import 'react-better-table/dist/index.css';
import './index.scss';

export const TaskTable = ({
  className
}) => {
  const storeContext = useContext(StoreContext);
  const {
    tableLoad,
    currentUser,
    searchData,
    setSearchData,
    tableData,
    setTableData,
    toSearchTable, 
  } = storeContext;

  const renderTxt = (text, record) => {
    return (
      <span>{text || '-'}</span>
    )
  }

  const renderTxtPopover = (text, record) => {
    if(!text) {
      return (
        <span>-</span>
      )
    }

    return (
      <Popover
        content={text}
        placement="topLeft"
        arrowPointAtCenter
        overlayStyle={{ maxWidth: '400px', maxHeight: '300px' }}        
      >
        <div
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <span>{text}</span>
        </div>
      </Popover>
    );
  }

  const tableColumns = [
    {
      title: '任务ID',
      headerAlign: 'left',
      dataIndex: 'id',
      minWidth: 70,
      render: renderTxt,
    },
    {
      title: '任务名称',
      headerAlign: 'left',
      dataIndex: 'taskName',
      minWidth: 170,
      render: renderTxtPopover,     
    },    
    {
      title: '业务分类',
      headerAlign: 'left',
      dataIndex: 'calendarCodeName',
      minWidth: 140,
      render: renderTxt,
    },
    {
      title: '产品维度',
      headerAlign: 'left',
      dataIndex: 'dimensionCodeName',
      minWidth: 110,
      render: renderTxt,
    },
    {
      title: '任务创建人',
      headerAlign: 'left',
      dataIndex: 'creatorName',
      minWidth: 130,
      render: renderTxt,
    },   
    {
      title: '受训人',
      headerAlign: 'left',
      dataIndex: 'traineeName',
      minWidth: 130,
      render: renderTxt,
    },  
    {
      title: '任务创建时间',
      headerAlign: 'left',
      dataIndex: 'createDate',
      minWidth: 110,
      render: (text, record) => {
        let txt = '-';

        if(text) {
          txt = moment(text).format('YYYY-MM-DD HH:mm');
        }

        return (
          <span>{txt}</span>
        )
      },
    },
    {
      title: '任务状态',
      headerAlign: 'left',
      dataIndex: 'taskStatusName',
      minWidth: 100,
      render: (text, record) => {
        let taskStatusClass = '';
        const txt = text || '-';

        if(record.taskStatus) {
          taskStatusClass = taskStatusClassMap[record.taskStatus] || '';
        }

        return (
          <div className='task-status'>
            <div className={`dot ${taskStatusClass}`}></div>
            <div className='txt'>{txt}</div>
          </div>
        )
      },
    },
    {
      title: '案例数',
      headerAlign: 'left',
      dataIndex: 'caseNum',
      minWidth: 70,
      render: renderTxt,
    },                 
    {
      title: '操作',
      headerAlign: 'left',
      dataIndex: 'operator',
      minWidth: 80,
      align: 'left',
      headerAlign: 'left',
      fixed: 'right',
      render: (text, record) => {
        const taskTxt = taskStatusOperateTextMap[record.taskStatus] || '-';  
        let isDisabled = false;

        // 开始训练和进行训练，登录人id不等于受训人，不能点击
        if (
          [taskStatusMap.start, taskStatusMap.training].includes(record.taskStatus) &&
          ![record.traineeId].includes(currentUser.id)
        ){
          isDisabled = true;
        }

        // 查看结果，登录人id不等于受训人和创建人，不能点击
        if (
          [taskStatusMap.result].includes(record.taskStatus) &&
          ![record.creatorId, record.traineeId].includes(currentUser.id)
        ){
          isDisabled = true;
        }        
        

        const onClickTask = async () => {   
          console.info('onClickTask_record', record);
          if (record.taskStatus === taskStatusMap.start) {
            const paramData = { id: record.id }
            await CallCenterManageApi.getTaskStart(paramData)
          }

          window.location.hash = `/intelligentTraineeManage/traineeChat?id=${record.id}&type=task`;     
        }

        if(taskTxt === '-') {
          return (
            <span>{taskTxt}</span>
          )
        }

        return (
          <Button
            disabled={isDisabled}
            type="text"
            onClick={onClickTask}
          >
            { taskTxt }
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
  }, []);

  const getRowSelection = () => {
    let rowSelection = {
      // eslint-disable-next-line
      onChange: async (selectedRowKeys, selectedRows) => {
        console.info('onChange', selectedRowKeys, selectedRows);
        setTableData({
          ...tableData,
          tableSelectData: selectedRows,
        })
      },
      // eslint-disable-next-line
      onSelectAll: async (selected, selectedRows) => {
        console.info('onSelectAll', selected, selectedRows);
        setTableData({
          ...tableData,
          tableSelectData: selectedRows,
        })        
      },
      columnWidth: 62,
      selectedRowKeys: tableData.tableSelectData.map((item) => item.id),
    };

    return rowSelection;
  };

  return (
    <div className="task-table">
      <div className="task-table-info">
        <AppTable
          // draggable
          // virtual={{
          //   delayTime: 0,
          //   preloadCount: 1,
          // }}
          // loadingProps={{
          //   text: '正在加载中',
          //   icon: <Loading visible coloured />,
          // }}          
          rowHoverEffectEnabled
          loading={tableLoad}
          bordered={false}
          scroll={{
            maxHeight: `calc(100vh - 324px)`,
          }}
          columns={tableColumns}
          rowSelection={getRowSelection()}
          dataSource={tableData.tableList}
					pagination={{
						current: searchData.pageIndex,
						pageSize: searchData.pageSize,
						total: tableData.tableTotal,
						onPageChange: (pageIndex, pageSize) => {
              console.info('onChange', pageIndex, pageSize);
              const newSearchData = {
                ...searchData,
                pageIndex,
                pageSize,
              };
              setSearchData(newSearchData);
              toSearchTable(newSearchData);
						}
					}}
        />
      </div>
      {/* <div className="task-table-page">
        <Pagination
          size="default"
          showSizeChanger
          showQuickJumper
          onChange={(current) => {
            console.info('onChange', current);
            const newSearchData = {
              ...searchData,
              pageIndex: current,
            };
            setSearchData(newSearchData);
            toSearchTable(newSearchData);
          }}
          onShowSizeChange={(current, pageSize) => {
            console.info('onShowSizeChange', current, pageSize);
            const newSearchData = {
              ...searchData,
              pageIndex: current,
              pageSize,
            };
            setSearchData(newSearchData);
            toSearchTable(newSearchData);
          }}
          pageSizeOptions={['10', '20', '30', '50', '100']}
          current={searchData.pageIndex}
          pageSize={searchData.pageSize}
          total={tableData.tableTotal}
        />
      </div> */}
    </div>
  );
};
