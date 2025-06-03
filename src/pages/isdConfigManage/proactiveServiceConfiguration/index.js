import React, { useState, useEffect } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Button, Popover, message } from "dpl-react";
import { get, post } from "@/request/request";
import AppTable from "@/components/common/table";
import Api from "@/request/api-callcentermanage";
import DetailDrawer from "./detailDrawer";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
} = uForm;

export default function ProactiveServiceConfiguration(props) {
  const [detailDrawer, setDetailDrawer] = useState({
    visible: false,
    id: '',
  }); // 详情弹窗数据

  // 导出任务结果
  const toExport = (record) => {
    const urlData = Api.getIsdChatAnalysisFilterConfigTaskExport + `?id=${record.id}&chatAnalysisTaskId=${record.chatAnalysisTaskId}`;
    console.info('urlData', urlData);
    window.open(urlData);
  };

  // 去设置状态
  const toSetTaskStatus = async (record) => {
    const isDoing = record.status === 'in_process'
    try {
      const resData = await post({
        url: Api.postIsdChatAnalysisFilterConfigStatusUpdate,
        data: {
          id: record.id,
          status: isDoing ? 'suspended' : 'in_process',
        },
      });  

      console.info('api_postIsdChatAnalysisFilterConfigStatusUpdate', resData);
      if(resData.data) {
        message.success(isDoing ? '配置暂停成功' : '配置开始成功');
        trigger();
      } else {
        message.error(isDoing ? '配置暂停失败' : '配置开始失败');
      }
    } catch (error) {
      message.error(isDoing ? '配置暂停失败' : '配置开始失败');
      console.info('api_postIsdChatAnalysisFilterConfigStatusUpdate', error)
    }
  }

  const columns = [
    {
      title: "筛选id",
      dataIndex: "id",
      width: 100,
      align: "left",
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover placement="topLeft" content={value}>
            <span>{value}</span>
          </Popover>
        );
      },
    },
    {
      title: "任务ID",
      dataIndex: "chatAnalysisTaskId",
      width: 100,
      align: "left",
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover placement="topLeft" content={value}>
            <span>{value}</span>
          </Popover>
        );
      },
    },
    {
      title: "状态",
      dataIndex: "statusName",
      width: 100,
      align: "left",
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover placement="topLeft" content={value}>
            <span>{value || '--'}</span>
          </Popover>
        );
      },
    },
    {
      title: "结果数量",
      dataIndex: "chatSessionCount",
      width: 100,
      align: "left",
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover placement="topLeft" content={value}>
            <span>{value || '--'}</span>
          </Popover>
        );
      },
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
      ellipsis: true,
      minWidth: 100,
      align: "center",
    },
    {
      title: "修改时间",
      minWidth: 100,
      dataIndex: "modifyDate",
      ellipsis: true,
      align: "center",
    },
    {
      title: "创建人",
      dataIndex: "creatorName",
      ellipsis: true,
      width: 100,
      align: "center",
      render: (value) => {
        return (
          <Popover placement="topLeft" content={value}>
            <span className="rule-name">{value}</span>
          </Popover>
        );
      },
    },
    {
      title: "修改人",
      dataIndex: "modifierName",
      ellipsis: true,
      width: 100,
      align: "center",
      render: (value) => {
        return (
          <Popover placement="topLeft" content={value}>
            <span className="rule-name">{value}</span>
          </Popover>
        );
      },
    },    
    {
      title: "操作",
      minWidth: 100,
      dataIndex: "opt",
      ellipsis: true,
      align: "left",
      render: (text, record, index) => {
        const isDoing = record.status === 'in_process'
        return (
          <div className="option-button-list">
            <span
              className="option-button"
              onClick={() => {
                setDetailDrawer({
                  visible: true,
                  id: record.id
                })
              }}
            >
              编辑
            </span>
            <span
              className="option-button"
              onClick={() => toSetTaskStatus(record)}
            >
              { isDoing ? '暂停' : '开始'}
            </span>
            <span
              className="option-button"
              onClick={() => toExport(record)}
            >
              下载
            </span>            
          </div>
        );
      },
    },
  ];

  const tableWrap = document.querySelector('.sessio-analysis-task .app-table-box');
  const scrollX = tableWrap?.clientWidth;

  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    const data = await post({
      url: Api.getIsdChatAnalysisFilterConfigPage,
      data: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.current,
        sortRuleList: [
          {
            field: "create_date",
            order: "desc"
          }
        ],        
        ...values,
      },
    });
    
    console.info('api_getIsdChatAnalysisFilterConfigPage', data)
    return {
      dataSource: data.data.list,
      pageSize: data.data.pageSize,
      total: data.data.total,
      current: data.data.pageIndex,
    };
  };
  const { form, table, trigger } = useFormTableQuery(service, {
    pagination: { pageSize: 100 },
  });

  useEffect(() => {
  }, []);

  return (
    <div className="app-bg-box sessio-analysis-task">
      <SchemaForm {...form} inline className="app-search-box display-n">
        {/* <Field
          type="string"
          title="会话分析任务"
          name="taskNameOrTaskId"
          x-component="Input"
          x-component-props={{ 
            placeholder: "请输入任务名称/任务ID",
            allowClear: true,
          }}
        />
        <Field
          type="string"
          title="关联方案"
          name="planName"
          x-component="Input"
          x-component-props={{ 
            placeholder: "请输入方案名称",
            allowClear: true,
          }}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }}>查询</Submit>
        </FormButtonGroup> */}
      </SchemaForm>

      <div className="content-wrap">
        {/* <Loading coloured text='加载中' visible={showLoadingFlag} /> */}
        <div className="app-button-box">
          <Button
            className="app-button"
            onClick={() => {
              setDetailDrawer({
                visible: true,
                id: '',
              })
            }}
            type="primary"
          >
            新增
          </Button>
        </div>
        <AppTable
          className="app-table-box"
          {...table}
          columns={columns}
          rowKey="id"
          scroll={{ x: scrollX ? scrollX - 44 : 1088 }}
        />
      </div>
      <DetailDrawer
        detailDrawer={detailDrawer}
        setDetailDrawer={setDetailDrawer}
        trigger={trigger}
      />
    </div>
  );
}
