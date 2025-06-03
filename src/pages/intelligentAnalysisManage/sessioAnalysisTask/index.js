import React, { useState, useEffect } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Button, Popover, message, Modal } from "dpl-react";
import { useStoreState } from 'easy-peasy';
import { get, post } from "@/request/request";
import AppTable from "@/components/common/table";
import Api from "@/request/api-callcentermanage";
import getPermissionList from "@/utils/getPermission";
import { permissionCode } from "@/const";
import AddDrawer from "./children/addDrawer";
import DetailDrawer from "./children/detailDrawer";
import ExportModal from "./children/exportModal";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
} = uForm;

const TaskTypeInTime = 'intime'; // 实时分析
const TaskTypeOffline = 'offline'; // 离线分析

export default function SessioAnalysisTask(props) {
  const userInfo = useStoreState(
    (state) => state.commonUserInfo.userInfo
  );
  const [addDrawerVisible, setAddDrawerVisible] = useState(false);
  const [detailDrawerVisible, setDetailDrawerVisible] = useState(false);
  const [detailModal, setDetailModal] = useState({}); // 详情弹窗数据
  const [showAddFlag, setShowAddFlag] = useState(false); // 新增按钮权限-暂时用不到跟菜单权限
  const [showCancelFlag, setShowCancelFlag] = useState(false); // 取消按钮权限
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // 方案预览详情
  const taskDetailClick = async (record) => {
    const res = await get({
      url: Api.getSmartChatAnalysisPlanPreviewSnapshot,
      params: {
        planSnapshotId: record.planSnapshotId,
      },
    });
    if (res.success) {
      const newDetail = {
        ...record,
        planSnapshotPreview: res.data,
      };
      setDetailModal(newDetail);
      setDetailDrawerVisible(true);
    } else {
      message.error(res.message);
    }
  };

  // 导出任务结果
  const clickTaskResultClick = (record) => {
    console.log("clickTaskResultClick");
    if (record.taskType === TaskTypeInTime) { // 实时分析弹一个时间选择弹框选完时间之后再导出
      setDetailModal(record);
      setExportModalOpen(true);
    } else {
      Modal.confirm({ // 离线分析弹框提示之后直接导出
        content: "确定要导出全部的分析结果吗？",
        onOk: async () => {
          window.open(Api.getSmartChatAnalysisTaskExport + `?taskId=${record.id}`);
          return true;
        },
      });
    }
  };

  const cancelTaskClick = (record) => {
    console.log("cancelTaskClick");
    Modal.confirm({
      title: "提示",
      content: "确定要取消该会话分析任务吗？",
      onOk: async () => {
        const data = await post({
          url: Api.postCancelsmartChatAnalysisTask,
          data: { taskId: record.id },
        });
        if (data.success) {
          message.success("操作成功");
          trigger();
        } else {
          message.error(data.message);
        }
        return true;
      },
    });
  };

  const addBtn = () => {
    setAddDrawerVisible(true);
  };

  const columns = [
    {
      title: "任务ID",
      dataIndex: "id",
      width: 60,
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
      title: "任务名称",
      dataIndex: "name",
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
      title: "关联方案",
      dataIndex: "planName",
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
      title: "指定大模型",
      width: 100,
      dataIndex: "fmttModelEnCode",
      align: "left",
      autoEllipsis: true,
      render: (obj) => {
        return (
          <Popover placement="topLeft" content={obj || '--'}>
            <span>{obj || '--'}</span>
          </Popover>
        );
      },
    },
    {
      title: "任务类型",
      dataIndex: "taskTypeText",
      ellipsis: true,
      width: 80,
      align: "center",
      render: (value) => {
        return <div>{value || '--' }</div>;
      },
    },
    {
      title: "调用appID",
      width: 100,
      dataIndex: "fmttAppName",
      ellipsis: true,
      align: "center",
      render: (text) => {
        return <div>{text || '--' }</div>;
      },
    },
    {
      title: "执行状态",
      width: 80,
      dataIndex: "taskExecuteEnStatusName",
      ellipsis: true,
      align: "center",
      render: (value, record, index) => {
        return <div>{value || '--'}</div>;
      },
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
      title: "创建时间",
      dataIndex: "createDate",
      ellipsis: true,
      minWidth: 110,
      align: "center",
    },
    {
      title: "开启时间",
      minWidth: 110,
      dataIndex: "taskStartTime",
      ellipsis: true,
      align: "center",
      render: (value, record, index) => {
        return <div>{value || '--'}</div>;
      },
    },
    {
      title: "结束时间",
      minWidth: 110,
      dataIndex: "taskEndTime",
      ellipsis: true,
      align: "center",
      render: (value, record, index) => {
        return <div>{value || '--'}</div>;
      },
    },
    {
      title: "操作",
      minWidth: 100,
      dataIndex: "opt",
      ellipsis: true,
      align: "left",
      render: (text, record, index) => {
        return (
          <div className="option-button-list">
            <span
              className="option-button"
              onClick={() => taskDetailClick(record)}
            >
              任务详情
            </span>
            {((record.taskType === TaskTypeOffline && ["execute_cancel", "execute_finish_part", "execute_finish"].includes(record.taskExecuteEnStatus)) || record.taskType === TaskTypeInTime) ?
              <span
                className="option-button"
                onClick={() => clickTaskResultClick(record)}
              >
                任务结果
              </span>
              :
              <span
                className="option-button"
                style={{ color: "#999", marginLeft: "10px"}}
              >
                任务结果
              </span>
            }
            {/* 待执行、执行中状态显示取消任务 */}
            {(showCancelFlag || record.creatorId === userInfo.id) && (record.taskExecuteEnStatus === "waiting_execute" || record.taskExecuteEnStatus === "executing") && 
              <span
                className="option-button"
                onClick={() => cancelTaskClick(record)}
              >
                取消任务
              </span>}
          </div>
        );
      },
    },
  ];

  const tableWrap = document.querySelector('.sessio-analysis-task .app-table-box');
  const scrollX = tableWrap?.clientWidth;

  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    const data = await get({
      url: Api.getSmartChatAnalysisTaskPage,
      params: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.current,
        ...values,
      },
    });
    return {
      dataSource: data.data.list,
      pageSize: data.data.pageSize,
      total: data.data.total,
      current: data.data.pageIndex,
    };
  };
  const { form, table, trigger } = useFormTableQuery(service, {
    pagination: { pageSize: 10 },
  });

  useEffect(() => {
    getPermissionList().then((permissionList) => {
      permissionList.forEach((item) => {
        if (
          item.permissionCode ===
          permissionCode.smartChatAnalysisTaskSave
        ) {
          setShowAddFlag(true);
        } else if (
          item.permissionCode ===
          permissionCode.smartChatAnalysisTaskCancel
        ) {
          setShowCancelFlag(true);
        }
      });
    });
  }, []);

  return (
    <div className="app-bg-box sessio-analysis-task">
      <SchemaForm {...form} inline className="app-search-box">
        <Field
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
        </FormButtonGroup>
      </SchemaForm>

      <div className="content-wrap">
        {/* <Loading coloured text='加载中' visible={showLoadingFlag} /> */}
        <div className="app-button-box">
          <Button
            className="app-button"
            onClick={() => addBtn()}
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
      <AddDrawer 
        open={addDrawerVisible} 
        onOpenChange={setAddDrawerVisible} 
        cancelClick={() => setAddDrawerVisible(false)}
        submitClick={() => {
          trigger();
          setAddDrawerVisible(false);
        }}
      />
      <DetailDrawer
        open={detailDrawerVisible}
        detail={detailModal}
        onOpenChange={setDetailDrawerVisible}
      />
      <ExportModal
        open={exportModalOpen}
        detail={detailModal}
        cancelClick={() => setExportModalOpen(false)}
        submitClick={() => {
          setExportModalOpen(false);
        }}
      />
    </div>
  );
}
