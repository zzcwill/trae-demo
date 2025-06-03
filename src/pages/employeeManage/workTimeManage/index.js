import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Table, message, Button, Checkbox, Pagination, Modal } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { acceptanceChannelCode, callcenterCode } from "@/const/config";
import WorkGroup from "./components/workGroup";
import GroupCompanyAndOrg from "@/components/employeeManage/groupCompanyAndOrg";
import {
  workFlagType,
  editTypeMap,
  mergeTypeListConfig,
  workTimeMergeMap,
  defaultEffectiveDate,
  weekCodeTYpe,
  workTimeMergeList,
} from "./config";
import EditModal from "./components/editModal";
import CommonOrgTree from '@/components/common/commonOrgTree'
import sessionStorageHelper from "@/utils/sessionStorage";
import { defaultFormat } from "moment";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
} = uForm;
// 默认表单数据
const defaultFormData = {
  workGroup: {
    type: acceptanceChannelCode.call,
    groupIdList: [],
  },
  // companyAndOrg: {
  //   companyId: undefined,
  //   departIdList: undefined,
  // },
  bigRegionCodeList: [],
};
const isLastModifierOption = [
  {
    value: "1",
    label: "最后修改人是我",
  },
];
// 枚举
const typeMap = {
  [acceptanceChannelCode.call]: {
    id: acceptanceChannelCode.call,
    name: "电话组",
  },
  [acceptanceChannelCode.online]: {
    id: acceptanceChannelCode.online,
    name: "在线组",
  },
};

const defaultPageIndex = 1;
// todo:是否需要默认500
const defaultPageSize = 20;

const defaultEditModalData = {
  isShow: false,
  // isShow: true,
  title: editTypeMap.add.name,
  detail: {
    type: acceptanceChannelCode.call,
    workTimeConfig: [].concat(defaultEffectiveDate()),
  },
  type: editTypeMap.add.code,
};
export default function WorkTimeManage(props) {
  const [callGroup, setCallGroup] = useState([]); // 电话组
  const [onlineGroup, setOnlineGroup] = useState([]); // 在线组
  const [companyList, setCompanyList] = useState([]); // 受理机构
  const [orgList, setOrgList] = useState([]); // 受理部门
  const [groupMap, setGroupMap] = useState({}); // 组map
  const [formData, setFormData] = useState(defaultFormData); // 表单数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选择列表
  const [groupIdList, setGroupIdList] = useState([]); // 组ID列表
  const [editModalData, setEditModalData] = useState(defaultEditModalData); //
  const isResetForm = useRef(false); // 是否重置了选择数据
  const userInfo = sessionStorageHelper.getItem('__userInfo')
  const treeDefaultExpandedKeys = userInfo && userInfo.regionCompanyCode ? [userInfo.regionCompanyCode] : [];  


  // 获取业务组信息
  const getWorkGroupList = async (type) => {
    try {
      const res = await get({
        url: Api.getWorkGroupList,
        params: {
          type,
        },
      });
      if (res.success) {
        const data = res.data;
        let dataMap = {};
        data.forEach((item) => {
          dataMap[item.id] = Object.assign({}, item);
        });
        if (type === acceptanceChannelCode.call) {
          setCallGroup(data);
        } else {
          setOnlineGroup(data);
        }
        setGroupMap((state) => {
          return Object.assign({}, state, dataMap);
        });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 获取受理机构
   */
  const getCompanyList = async () => {
    const res = await get({
      url: Api.getCompanyList,
      params: {
        needRemoteCenter: true,
      },
    });
    if (res.success) {
      const data = res.data;
      setCompanyList(data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取受理部门
   */
  const getOrgList = async () => {
    const res = await get({
      url: Api.getDepartmentList,
      params: {
        companyId: callcenterCode,
      },
    });
    if (res.success) {
      const data = res.data;
      setOrgList(data);
    } else {
      message.error(res.message);
    }
  };

  // 星期数据格式化
  const weekDataFormat = (weekList, mergeTypeList) => {
    let result = [].concat(workTimeMergeList);
    let mergeType = null;
    weekList.forEach((item) => {
      if (mergeType && mergeTypeList.indexOf(item.type.toString()) > -1) {
        return;
      }
      // 周一到周五
      if (mergeTypeList.indexOf(item.type.toString()) > -1) {
        mergeType = item.type;
        result[0] = Object.assign({}, result[0], { ...item });
      }
      // 周六
      if (item.type.toString() === weekCodeTYpe.Sat) {
        result[1] = Object.assign({}, result[1], { ...item });
      }
      // 周日
      if (item.type.toString() === weekCodeTYpe.Sun) {
        result[2] = Object.assign({}, result[2], { ...item });
      }
    });
    return result;
  };

  // 处理数据
  const filterSort = (list) => {
    if (list && list.length > 0) {
      let idList = [];
      let result = [];
      list.forEach((item) => {
        if (item.groupId) {
          idList.push(item.groupId);
          item.workTime &&
            item.workTime.forEach((workTime, workTimeIndex) => {
              result.push({
                ...item,
                workTimeConfig: {
                  effectiveDateBegin: workTime.effectiveDateBegin,
                  effectiveDateEnd: workTime.effectiveDateEnd,
                  weekConfig: weekDataFormat(
                    workTime.weekConfig,
                    mergeTypeListConfig
                  ),
                },
                _isStart: workTimeIndex === 0,
                _listLength: item.workTime.length,
              });
            });
        }
      });
      return {
        idList,
        list: result,
      };
    }
    return {
      idList: [],
      list: [],
    };
  };

  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    setFormData(values);
    const data = {
      type: values.workGroup && values.workGroup.type,
      groupIdList:
        values.workGroup &&
        values.workGroup.groupIdList &&
        (values.workGroup.groupIdList.join(",") || undefined),
      lastModifierFlag:
        (values.lastModifierFlag && values.lastModifierFlag[0]) || undefined,
      // companyId:
      //   (values.companyAndOrg && values.companyAndOrg.companyId) || undefined,
      // departId:
      //   (values.companyAndOrg && values.companyAndOrg.departIdList) ||
      //   undefined,
      bigRegionCodeList: values.bigRegionCodeList,
    };
    // const res = await get({
    //   url: Api.getWorkTimeList,
    //   params: {
    //     pageSize: pagination.pageSize,
    //     pageIndex: pagination.current,
    //     ...data,
    //   },
    // });
    const res = await post({
      url: Api.getWorkTimeList,
      data: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.current,
        ...data,
      },
    });    
    let result = filterSort(res.data.list);
    setGroupIdList(result.idList);
    return {
      dataSource: result.list,
      pageSize: res.data.pageSize,
      total: res.data.total,
      current: res.data.pageIndex,
    };
  };

  const submitClickFunc = () => {
    isResetForm.current = false;
  };

  const onPageQueryMiddleware = () => ({ context }) => ({
    onPageQuery(payload, next) {
      // 手动将表单数据清除
      context.setPagination({
        ...context.pagination,
      });
      console.log(isResetForm.current);
      return next(isResetForm.current ? {...defaultFormData} : payload);
    },
  });

  // formily 查询中间件
  const onFormSubmitQueryMiddleware = () => ({ context }) => ({
    onFormSubmitQuery(payload, next) {
      setSelectedRowKeys([]);
      context.setPagination({
        ...context.pagination,
        current: defaultPageIndex,
      });
      return next(payload);
    },
  });

  //  formily 清空中间件
  const resetMiddleware = () => ({ context }) => ({
    onFormResetQuery(payload, next) {
      setSelectedRowKeys([]);
      isResetForm.current = true;
      context.setPagination({
        ...context.pagination,
        current: defaultPageIndex,
      });
      // type 不能为空，所以重置的时候手动设置一个type
      return next({
        ...defaultFormData,
        ...payload,
      });
    },
  });
  const { trigger, form, table } = useFormTableQuery(
    service,
    {
      pagination: { pageSize: defaultPageSize },
    },
    [onFormSubmitQueryMiddleware(), resetMiddleware(), onPageQueryMiddleware()]
  );

  // 批量删除接口
  const postBatchDeleteWorkTime = async (groupIdList) => {
    try {
      const data = await post({
        url: Api.postBatchDeleteWorkTime,
        data: {
          groupIdList,
          type: formData.workGroup && formData.workGroup.type,
        },
      });
      if (data.success) {
        message.success("删除成功");
        setSelectedRowKeys([]);
        trigger();
      } else {
        message.error(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 修改
  const editWorkTime = (detail) => {
    let data = {};
    if (detail) {
      let result = [];
      detail.workTime.forEach((workTime, workTimeIndex) => {
        result.push({
          effectiveDateBegin: workTime.effectiveDateBegin,
          effectiveDateEnd: workTime.effectiveDateEnd,
          weekConfig: weekDataFormat(workTime.weekConfig, mergeTypeListConfig),
        });
      });
      Object.assign(data, defaultEditModalData, {
        isShow: true,
        title: editTypeMap.edit.name,
        detail: {
          ...detail,
          workTimeConfig: result,
          groupIdList: [detail.groupId],
        },
        type: editTypeMap.edit.code,
      });
    } else {
      Object.assign(data, defaultEditModalData, {
        isShow: true,
        detail: {
          type: acceptanceChannelCode.call,
          groupIdList: [],
          workTimeConfig: [].concat(defaultEffectiveDate()),
        },
      });
    }
    setEditModalData(data);
  };

  // 删除
  const deleteWorkTime = (id) => {
    Modal.confirm({
      title: "正在进行删除操作",
      content: "删除后的数据不可恢复，你还要继续吗？",
      onOk: () => {
        postBatchDeleteWorkTime([id]);
      },
    });
  };

  // 批量修改
  const batchEditWorkTime = async () => {
    if (selectedRowKeys.length === 0) {
      message.error("请至少选择一个业务组");
      return;
    }
    let workTimeConfig = [].concat(defaultEffectiveDate())

    const res = await get({
      url: Api.getQuerySameWorkTime,
      params: {
        type: formData.workGroup.type,
        groupIdList: selectedRowKeys.join(','),
      }
    })
    if(res.success && Array.isArray(res.data) && res.data.length > 0) {
      let result = []; //做周一到周五数据合并
      res.data.forEach((workTime, workTimeIndex) => {
        result.push({
          effectiveDateBegin: workTime.effectiveDateBegin,
          effectiveDateEnd: workTime.effectiveDateEnd,
          weekConfig: weekDataFormat(workTime.weekConfig, mergeTypeListConfig),
        });
      });
      workTimeConfig = result
    }
    setEditModalData(
      Object.assign({}, defaultEditModalData, {
        isShow: true,
        title: editTypeMap.edit.name,
        detail: {
          workTimeConfig,
          type: formData.workGroup.type,
          groupIdList: selectedRowKeys,
        },
        type: editTypeMap.edit.code,
      })
    );
  };

  // 批量删除
  const batchDeleteWorkTime = () => {
    if (selectedRowKeys.length === 0) {
      message.error("请至少选择一个业务组");
      return;
    }
    Modal.confirm({
      title: "正在进行删除操作",
      content: "删除后的数据不可恢复，你还要继续吗？",
      onOk: () => {
        postBatchDeleteWorkTime(selectedRowKeys);
      },
    });
  };

  /**
   * 分页
   */
  const changePage = (pageIndex, pageSize) => {
    const pagination = Object.assign({}, table.pagination, {
      current: pageIndex,
      pageSize,
    });
    setSelectedRowKeys([]);
    table.onChange(pagination, null, null);
  };

  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={
            groupIdList.length > 0 &&
            selectedRowKeys.length > 0 &&
            selectedRowKeys.length < groupIdList.length
          }
          checked={
            groupIdList.length > 0 &&
            selectedRowKeys.length === groupIdList.length
          }
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys([...groupIdList]);
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      ),
      width: 42,
      align: "center",
      render(text, record, index) {
        const obj = {
          children: (
            <Checkbox
              checked={selectedRowKeys.indexOf(record.groupId) >= 0}
              onChange={(e) => {
                const checked = e.target.checked;
                const index = selectedRowKeys.indexOf(record.groupId);
                if (checked) {
                  if (index < 0) {
                    setSelectedRowKeys([...selectedRowKeys, record.groupId]);
                  }
                } else {
                  if (index >= 0) {
                    selectedRowKeys.splice(index, 1);
                    setSelectedRowKeys([...selectedRowKeys]);
                  }
                }
              }}
            />
          ),
          props: {},
        };
        if (record._isStart) {
          obj.props.rowSpan = record._listLength;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: "名称",
      dataIndex: "name",
      width: 250,
      render: (text, record, index) => {
        const obj = {
          children: <span title={text}>{text}</span>,
          props: {},
        };
        if (record._isStart) {
          obj.props.rowSpan = record._listLength;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: "操作",
      width: 120,
      align: "center",
      render: (text, record, index) => {
        const obj = {
          children: (
            <div className="table-option-box">
              <span
                onClick={() => {
                  editWorkTime(record);
                }}
                className="option-button"
              >
                修改
              </span>
              <span
                onClick={() => {
                  deleteWorkTime(record.groupId);
                }}
                className="option-button"
              >
                删除
              </span>
            </div>
          ),
          props: {},
        };
        if (record._isStart) {
          obj.props.rowSpan = record._listLength;
          // obj.props.style = { borderRight: "1px solid #d1d3d8" };
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: "类型",
      dataIndex: "type",
      ellipsis: true,
      align: "center",
      render(text, record, index) {
        return <span>{typeMap[record.type].name || "-"}</span>;
      },
    },
    {
      title: "生效日期",
      ellipsis: true,
      align: "center",
      render(text, record, index) {
        return (
          <span>{`${record.workTimeConfig.effectiveDateBegin} ~ ${record.workTimeConfig.effectiveDateEnd}`}</span>
        );
      },
    },
    {
      title: "上班时间",
      align: "center",
      render(text, record, index) {
        return (
          record.workTimeConfig &&
          record.workTimeConfig.weekConfig &&
          record.workTimeConfig.weekConfig.map((item) => {
            if (item.workFlag == workFlagType.noWork.code) {
              return <div>{`${item.name}:${workFlagType.noWork.name}`}</div>;
            } else {
              return (
                <div>
                  <span>{`${item.name}:`}</span>
                  {item.dayTime &&
                    item.dayTime.length > 0 &&
                    item.dayTime.map((time) => {
                      return (
                        <span className="day-time-item">{`${time.beginTime}-${time.endTime}`}</span>
                      );
                    })}
                </div>
              );
            }
          })
        );
      },
    },
  ];

  const closeEditModal = (isRefresh) => {
    setEditModalData(defaultEditModalData);
    if (isRefresh) {
      trigger();
    }
  };

  const initFunc = () => {
    getWorkGroupList(acceptanceChannelCode.call);
    getWorkGroupList(acceptanceChannelCode.online);
    getCompanyList(); // 获取受理机构
    getOrgList(); // 获取受理部门
  };

  useEffect(() => {
    initFunc();
  }, []);
  return (
    <div className="work-time-manage">
      <SchemaForm
        {...form}
        className="form-wrap"
        initialValues={formData}
        inline
        components={{ workGroupComponent: WorkGroup, GroupCompanyAndOrg, CommonOrgTree }}
      >
        {/* <Field
          type="Object"
          name="companyAndOrg"
          x-component="GroupCompanyAndOrg"
          x-component-props={{
            style: { width: 900 },
            other: { companyList, orgList, multiple: false },
          }}
        /> */}
        <Field
          type="Array"
          title="受理机构"
          name="bigRegionCodeList"
          x-component="CommonOrgTree"
          x-component-props={{
            style: { width: 340 },
            multiple: true, // 是否多选
            showSearch: true, // 是否显示搜索框
            treeDefaultExpandedKeys,
          }}
        />

        <Field
          type="Object"
          title="业务组"
          name="workGroup"
          x-component="workGroupComponent"
          x-component-props={{
            groupMap: groupMap,
            callGroupList: callGroup,
            onlineGroupList: onlineGroup,
            companyList,
            orgList
          }}
        />

        <Field
          type="Array"
          name="lastModifierFlag"
          x-component="CheckboxGroup"
          x-component-props={{
            options: isLastModifierOption,
          }}
        />
        <FormButtonGroup>
          <Reset>清空条件</Reset>
          <div className="button-line-box "></div>
          <Submit onClick={submitClickFunc}>查询</Submit>
        </FormButtonGroup>
      </SchemaForm>
      <div className="table-box">
        <div className="table-btn">
          <Button type="primary" onClick={() => editWorkTime()}>
            新增
          </Button>
          <div className="button-line-box"></div>
          <Button type="primary" onClick={() => batchEditWorkTime()}>
            批量修改
          </Button>
          <div className="button-line-box"></div>
          <Button type="primary" onClick={() => batchDeleteWorkTime()}>
            批量删除
          </Button>
        </div>
        <Table
          className="table-wrap"
          {...table}
          columns={columns}
          bordered={true}
          pagination={false}
        />
        <div className="pagination-box">
          <Pagination
            showTotalInfo={true}
            current={Number(table.pagination.current)}
            pageSize={Number(table.pagination.pageSize)}
            total={table.pagination.total}
            showSizeChanger={true}
            showQuickJumper={true}
            pageSizeOptions={["10", "20", "50", "100", "500"]}
            onChange={changePage}
            onShowSizeChange={changePage}
          />
        </div>
      </div>
      <Modal
        title={editModalData.title}
        visible={editModalData.isShow}
        width={600}
        footer={null}
        className="work-time-modal"
        destroyOnClose
        onCancel={() => {
          closeEditModal();
        }}
      >
        <EditModal
          type={editModalData.type}
          idList={editModalData.idList}
          detail={editModalData.detail}
          callGroupList={callGroup}
          onlineGroupList={onlineGroup}
          onCancel={closeEditModal}
          groupMap={groupMap}
          companyList={companyList}
          orgList={orgList}
        />
      </Modal>
    </div>
  );
}
