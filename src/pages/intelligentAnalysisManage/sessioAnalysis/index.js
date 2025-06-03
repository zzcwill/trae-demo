import React, { useEffect, useState } from "react";
import "./index.scss";
import { uForm } from "dora";
import { useStoreState } from "easy-peasy";
import { Modal, message, Button, Popover, Loading } from "dpl-react";
import { get, post } from "@/request/request";
import AppTable from "@/components/common/table";
import Api from "@/request/api-callcentermanage";
import TestDrawer from "./testDrawer";
import { smartChatAnalysisPlanEdit } from '@/const/config';

const { confirm } = Modal;

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
} = uForm;
export default function SessioAnalysis(props) {

  const userInfo = useStoreState(
    (state) => state.commonUserInfo.userInfo
  );
  
  const [testWinFlag, setTestWinFlag] = useState(false);
  const [curVal, setCurVal] = useState({});
  const [showLoadingFlag, setShowLoadingFlag] = useState(false);
  const [showEditFlag, setShowEditFlag] = useState(false); // 编辑按钮权限
  
  const columns = [
    {
      title: "方案ID",
      dataIndex: "planId",
      ellipsis: true,
      align: "left",
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover
            placement="topLeft"
            content={value}
          >
            <span className="rule-name">{value}</span>
          </Popover>
        )
      }
    },
    {
      title: "方案名称",
      dataIndex: "smartChatAnalysisPlanName",
      align: "left",
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover
            placement="topLeft"
            content={value}
          >
            <span className="rule-name">{value}</span>
          </Popover>
        )
      }
    },
    {
      title: "发布状态",
      dataIndex: "publishStatusName",
      align: "center",
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover
            placement="topLeft"
            content={value}
          >
            <span className="rule-name">{value}</span>
          </Popover>
        )
      }
    },
    {
      title: "操作人",
      dataIndex: "modifierName",
      align: "center",
      autoEllipsis: true,
      render: (value) => {
        return (
          <Popover
            placement="topLeft"
            content={value}
          >
            <span className="rule-name">{value}</span>
          </Popover>
        )
      }
    },
  {
      title: "操作时间",
      dataIndex: "modifyDate",
      ellipsis: true,
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "name",
      ellipsis: true,
      align: "left",
      render: (text, record, index) => {
        return (
          <div className="option-button-list">
            {(showEditFlag || record.creatorId === userInfo.id) && <>
              {
                (record.publishStatus === "published") ?
                (
                  <Popover content={"会话分析方案已发布无法编辑，请撤销发布后变更内容。"}>
                    <span className="option-button disabled">编辑</span>
                  </Popover>
                ) :
                  (<span
                    onClick={() => {
                      editClick(record);
                    }}
                    className="option-button"
                  >
                    编辑
                  </span>)
              }
            </> }
            <span
              onClick={() => {
                testClick(record);
              }}
              className="option-button"
            >
              测试
            </span>
            {(showEditFlag || record.creatorId === userInfo.id) && <>
              {
                (record.publishStatus === "published") ?
                  (<span
                    onClick={() => {
                      revocationPublish(record);
                    }}
                    className="option-button"
                  >
                    撤销发布
                  </span>) : (<span
                    onClick={() => {
                      publish(record);
                    }}
                    className="option-button"
                  >
                    发布
                  </span>)
              }
            </>}
            <span
              onClick={() => {
                preview(record);
              }}
              className="option-button"
            >
              预览提示词
            </span>
          </div>
        );
      },
    }
  ];

  const addBtn = () => {
    console.log('add btn');
    window.location.hash = '/intelligentAnalysisManage/sessioAnalysis/update'
  }
  const editClick = (record) => {
    window.location.hash = `/intelligentAnalysisManage/sessioAnalysis/update?planId=${record.planId}`
  };

  // 点击测试按钮
  const testClick = (record) => {
    console.log('record', record);
    setCurVal(record)
    setTestWinFlag(true);
  };

  // 撤销发布
  const revocationPublish = (record) => {
    const modal = confirm({
      title: "确定要撤销发布吗？",
      content: <span>撤销发布状态并编辑方案内容，不影响会话分析任务。<span style={{color: 'red'}}>会话分析任务执行效果，以新建时关联确认的会话分析方案内容为准。</span></span>,
      okText: '撤销发布',
      async onOk() {
        console.log('OK', record);
        try {
          const res = await get({
            url: Api.unpublishScheme,
            params: {
              planId: record.planId
            }
          })
          if (res.success) {
            // 发布成功了
            message.success("操作成功")
            trigger()
          } else {
            message.error("操作失败")
          }
        } catch (error) {
          message.error(error.message)
        } finally {
          modal.destroy()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  // 发布
  const publish = (record) => {
    const modal = confirm({
      content: "确定要发布么？",
      async onOk() {
        console.log('OK', record);
        try {
          const res = await get({
            url: Api.publishScheme,
            params: {
              planId: record.planId
            }
          })
          console.log('res', res);
          if (res.success) {
            // 发布成功了
            message.success("发布成功")
            trigger()
          } else {
            message.error(res.message)
          }
        } catch (error) {
          message.error(error.message)
        } finally {
          modal.destroy()
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const preview = async (record) => {
    // 先调用获取详情接口targetDetailQuery 再调用预览接口getPreviewContent
    console.log('record', record);
    const res = await get({
      url: Api.getPlanPreview,
      params: {
        planId: record.planId,
      }
    });
    if (res.success) {
      Modal.open({
        title: '预览提示词',
        width: 700,
        footer: null,
        content: (
          <div className="preview-content whitespace-pre-line">
            <div dangerouslySetInnerHTML={{ __html: res.data }} />
          </div>
        ),
        onOk() {},
      });
    } else {
      message.error(res.message)
    }
  }

  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    console.log('query list', values, pagination)
    try {
      // setShowLoadingFlag(true)
      const data = await post({
        url: Api.getIntelligentAnalysisManageSessionAnalysisList,
        data: {
          pageSize: pagination.pageSize,
          pageIndex: pagination.current,
          ...values,
        },
      });
      return {
        dataSource: data?.data?.list,
        pageSize: data?.data?.pageSize,
        total: data?.data?.total,
        current: data?.data?.pageIndex,
      };
    } catch (error) {
      message.error(error.message);
    } finally {
    }
    
  };
  const { form, table, trigger } = useFormTableQuery(service, {
    pagination: { pageSize: 10 },
  });

  const getOptRender = async () => {
    setShowLoadingFlag(true)
    try {
      const res = await get({
        url: Api.getPermissionList
      })
      if (res.success) {
        const hasPermission = res?.data?.some(v => v.code === smartChatAnalysisPlanEdit)
        setShowEditFlag(hasPermission);
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error(error.message)
    } finally {
      setShowLoadingFlag(false)
    }
  }

  const closeDrawer = () => {
    setCurVal({})
  }

  useEffect(() => {
    // 动态接口判断是否显示
    getOptRender()
  }, [])

  return (
    <div className="app-bg-box sessio-analysis">
      <SchemaForm
        {...form} 
        inline 
        className="app-search-box"
      >
        <Field
          type="string"
          title="会话分析方案"
          name="smartChatAnalysisPlanName"
          x-component="Input"
          x-component-props={{ placeholder: "请输入方案名称关键字查询" }}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }} >查询</Submit>
        </FormButtonGroup>
      </SchemaForm>
      <div className="content-wrap">
        <Loading coloured text='加载中' visible={showLoadingFlag} />
        <div className="app-button-box">
          <Button className="app-button" onClick={() => addBtn()} type="primary">新增</Button>
        </div>
        <AppTable
          className="app-table-box"
          {...table}
          columns={columns}
          rowKey="planId"
        />
      </div>

      <TestDrawer
          curVal={curVal}
          testWinFlag={testWinFlag}
          closeDrawer={closeDrawer}
          setTestWinFlag={setTestWinFlag}
      /> 

    </div>
  );
}
