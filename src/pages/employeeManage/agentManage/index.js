import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { message, Button, Table, Pagination, Modal, Popover } from "dpl-react";
import CompanyAndOrg from "@/components/employeeManage/companyAndOrg";
import EmployeeSearch from "./components/employeeSearch";
import AgentGroupPriorty from "./components/agentGroupPriority";
import BatchSetting from "./components/batchSetting";
import CallGroup from "./components/callGroup";
import { priortyTypeList } from "./config";
import { workGroupType, callcenterEnumOptionType } from "@/const/config";
import CommonOrgTree from '@/components/common/commonOrgTree'
import sessionStorageHelper from "@/utils/sessionStorage";
import moment from "moment";
// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 20;
// 坐席状态为正常时对应的code
const employeeStatusCode = "0";
// 查询组件中的特有组件对象
const otherComponentSConfig = {
  companyAndOrg: CompanyAndOrg,
  employeeSearch: EmployeeSearch,
  callGroup: CallGroup,
  commonOrgTree: CommonOrgTree
};
// 设置组优先级弹窗默认蚕食
const defaultAgentGroupProity = {
  isShow: false,
  id: undefined,
  name: undefined,
};

// 批量操作弹窗默认参数
const defaultBatchSetting = {
  isShow: false, // 是否展示
  idList: [], // 坐席ID列表
  agentList: [], // 坐席数据列表
};
// 重要性   0：重要业务组
const importanceCode = "0";
const incallPopoverColumns = [
  {
    title: "电话组",
    dataIndex: "name",
    align: "center",
  },
  {
    title: "优先级",
    dataIndex: "priority",
    align: "center",
    width: 60,
  },
];

function incallPopoverRender(data) {
  if (
    data &&
    Array.isArray(data.agentGroupList) &&
    data.agentGroupList.length > 0
  ) {
    return (
      <div className="incall-detail">
        <Table
          dataSource={data.agentGroupList}
          columns={incallPopoverColumns}
          pagination={false}
          rowKey="id"
          bordered
        />
      </div>
    );
  }
  return null;
}

export default function AgentManage(props) {
  const [companyList, setCompanyList] = useState([]); // 机构
  const [orgList, setOrgList] = useState([]); // 工作组
  const [callGroupList, setCallGroupList] = useState([]); // 电话业务组
  const [onlineGroupList, setOnlineGroupList] = useState([]); // 在线业务组
  const [mainGroupList, setMainGroupList] = useState([]); // 主要业务组
  const [acceptanceChannelList, setAcceptanceChannelList] = useState([]); // 受理渠道
  const [agentPostList, setAgentPostList] = useState([]); // 岗位
  const [agentPostMap, setAgentPostMap] = useState({}); // 岗位map
  const [agentStatusList, setAgentStatusList] = useState([]); // 坐席状态
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中列表
  const [selectRowObjList, setSelectRowObjList] = useState([]); // 选中的数据对象用于批量操作

  const [agentGroupPriorityObj, setAgentGroupPriorityObj] = useState(
    defaultAgentGroupProity
  ); // 设置单个坐席组优先级参数对象
  const [batchSettingModal, setBatchSettingModal] = useState(
    defaultBatchSetting
  ); // 设置批量操作弹窗参数对象
  const formFilterRef = useRef(null); // formRef
  const [queryParams, setQueryParams] = useState(() => {
    const data = qs.parse(window.location.href.split("?")[1]);

		if (data.bigRegionCodeList) {
			data.bigRegionCodeList = data.bigRegionCodeList.split(',')
		}

    return Object.assign(
      {
        pageIndex: defaultPageIndex,
        pageSize: defaultPageSize,
        status: employeeStatusCode,
      },
      data,
      {
        trueIdList: undefined,
        createTime: undefined
      },
    );
  }); // 查询参数
  const userInfo = sessionStorageHelper.getItem('__userInfo')
  const treeDefaultExpandedKeys = userInfo && userInfo.regionCompanyCode ? [userInfo.regionCompanyCode] : [];  

  /**
   * 查询列表Function
   * @param {Object} params // 查询参数
   */
  const getAgentList = (params) => {
    return get({
      url: Api.getAgentList,
      params,
    });
  };

  // 封装的获取列表自定义hooks
  const { params, getList, loading, total, changeParams, list } = useGetList({
    queryFunc: getAgentList,
    defaultParam: queryParams,
    isUseQueryString: true,
    isSearchRightNow: true,
  });

  /**
   * 添加全部的select的option
   */
  const addAllOption = (options) => {
    return [].concat(
      {
        id: "all",
        name: "全部",
      },
      options
    );
  };

  /**
   * 获取机构
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
   * 获取工作组
   */
  const getOrgList = async () => {
    const res = await get({
      url: Api.getWorkGroupTree,
      params: {
        needRemoteCenter: true,
      },
    });
    if (res.success) {
      const data = res.data;
      setOrgList(data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取业务组
   */
  const getWorkGroupList = async (type) => {
    const res = await get({
      url: Api.getWorkGroupList,
      params: {
        type,
      },
    });
    if (res.success) {
      const data = res.data;
      if (type === workGroupType.online) {
        setOnlineGroupList(data);
      } else {
        // 获取主要业务组
        let importanceList = [];
        data.forEach((item) => {
          if (item.importance == importanceCode) {
            importanceList.push(item);
          }
        });
        setMainGroupList(importanceList);
        setCallGroupList(data);
      }
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取枚举（坐席状态、受理渠道、岗位）
   */
  const getEnumOptions = async () => {
    const res = await get({
      url: Api.getEnumOption,
      params: {
        groupNames: "SEAT_STATUS,ACCEPTANCE_CHANNEL,SEAT_POST", // SEAT_STATUS：坐席状态，ACCEPTANCE_CHANNEL：受理渠道，SEAT_POST：岗位，
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        switch (item.groupName) {
          // 坐席状态
          case callcenterEnumOptionType.AgentStatus:
            setAgentStatusList(item.options);
            break;
          //受理渠道
          case callcenterEnumOptionType.AcceptanceChannel:
            setAcceptanceChannelList(item.options);
            break;
          // 岗位
          case callcenterEnumOptionType.AgentPost:
            let postMap = {};
            Array.isArray(item.options) &&
              item.options.forEach((option) => {
                postMap[option.id] = option;
              });
            setAgentPostList(item.options);
            setAgentPostMap(postMap);
            break;
          default:
            break;
        }
      });
    } else {
      message.error(res.message);
    }
  };

  /**
   * 初始化func
   */
  const initFunc = () => {
    getCompanyList();
    getOrgList();
    getWorkGroupList(workGroupType.online);
    getWorkGroupList(workGroupType.call);
    getEnumOptions();
  };

  /**
   * 查询模块配置
   */
  const filterConfig = [
    {
      type: "employeeSearch", // string 组件类型 必填
      key: "trueIdList", // string 字段名称 必填
      label: "坐席名称", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      initialValue: queryParams.trueIdList?.length ? queryParams.trueIdList : undefined,
      other: {
        placeholder: "输入坐席名称、工号、账号",
        mode: 'multiple',
        maxTagCount: "1",
        maxTagTextLength: "6",
      }, // input中的其他可取字段内容
    },
    // {
    //   type: "companyAndOrg", // string 组件类型 必填
    //   key: "companyObj", // string 字段名称 必填
    //   span: 16,
    //   initialValue: {
    //     companyId: queryParams.companyId || undefined,
    //     departIdList:
    //       (queryParams.departIdList && queryParams.departIdList.split(",")) ||
    //       [],
    //   },
    //   other: {
    //     companyLabelName: "机构",
    //     orgLabelName: "工作组",
    //     companyLabelWidth: "100px",
    //     orgLabelWidth: "100px",
    //     companyList,
    //     orgList,
    //   }, // 组件中的其他可取字段内容
    // },
		{
			type: 'commonOrgTree',
			key: 'bigRegionCodeList',
			label: '受理机构',
			labelWidth: '100px',
      multiple: true, // 是否多选
      initialValue: queryParams.bigRegionCodeList || [],
      showSearch: true, // 是否显示搜索框
      treeDefaultExpandedKeys,
		},    
    {
      type: "callGroup", // string 组件类型 必填
      key: "inCallGroup", // string 字段名称 必填
      span: 16,
      initialValue: {
        incallGroupId:
          (queryParams.incallGroupId && parseInt(queryParams.incallGroupId)) ||
          "all",
        groupPriority:
          (queryParams.incallGroupId !== "all" &&
            queryParams.groupPriority &&
            parseInt(queryParams.groupPriority)) ||
          "all",
      }, // any 默认值 该情况
      other: {
        cllGroupList: addAllOption(callGroupList),
        groupPriorityList: addAllOption(priortyTypeList),
        isShowTitle: true, // 下拉列表是否展示hit
      }, // 组件中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "onlineGroupId", // string 字段名称 必填
      label: "在线业务组", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      isShowTitle: true, // 下拉列表是否展示hit
      options: addAllOption(onlineGroupList), // 选项
      initialValue:
        (queryParams.onlineGroupId && parseInt(queryParams.onlineGroupId)) ||
        "all", // any 默认值 该情况
      other: {
        placeholder: "请选择在线业务组",
        showSearch: true,
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "mainGroupId", // string 字段名称 必填
      label: "主要业务组", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      options: addAllOption(mainGroupList), // 选项
      initialValue:
        (queryParams.mainGroupId && Number(queryParams.mainGroupId)) || "all",
      other: {
        placeholder: "请选择主要业务组",
        showSearch: true,
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      }, // input中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "post", // string 字段名称 必填
      label: "岗位", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      options: addAllOption(agentPostList), // 选项
      initialValue: queryParams.post || "all", // any 默认值 该情况
      other: {
        placeholder: "请选择岗位",
      }, // input中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "status", // string 字段名称 必填
      label: "坐席状态", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      initialValue: queryParams.status || employeeStatusCode,
      options: agentStatusList, // 选项
      other: {
        placeholder: "请选择坐席状态",
        allowClear: true,
      }, // input中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "acceptanceChannel", // string 字段名称 必填
      label: "受理渠道", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      options: addAllOption(acceptanceChannelList), // 选项
      initialValue: queryParams.acceptanceChannel || "all",
      other: {
        placeholder: "请选择受理渠道",
      }, // input中的其他可取字段内容
    },
    {
      type: "datePickerRangePicker", // string 组件类型 必填
      key: "createTime", // string 字段名称 必填
      label: "创建时间", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      initialValue: queryParams.createTime || [],
      other: {
        placeholder: ["开始时间", "结束时间"],
      }, // input中的其他可取字段内容
    },
  ];

  /**
   * 表格配置
   */
  const tableConfig = [
    {
      title: "坐席账号",
      dataIndex: "userId",
      align: "center",
    },
    {
      title: "坐席工号",
      dataIndex: "workId",
      align: "center",
    },
    {
      title: "坐席名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "option",
      align: "center",
      width: 150,
      render: (text, record, index) => {
        if (record.status == employeeStatusCode) {
          return (
            <div className="table-option-box">
              <span
                onClick={() => {
                  editWorkGroup(record.trueId, record.id);
                }}
                className="option-button"
              >
                修改
              </span>
              <span
                onClick={() => {
                  settingGroupPriority(record.id, record.name);
                }}
                className="option-button"
              >
                设置组优先级
              </span>
            </div>
          );
        }
      },
    },

    {
      title: "受理机构",
      dataIndex: "businessCenterName",
      width: 160,
      ellipsis: true,
      render: (text, record, index) => {
        const businessCenterName = record.businessCenterName || '-';
        const bigRegionName = record.bigRegionName || '-';
        return `${businessCenterName}/${bigRegionName}`;
      },      
    },
    {
      title: "主要业务组",
      width: 160,
      ellipsis: true,
      render: (text, record, index) => {
        if (record.incallConfig && record.incallConfig.mainGroup) {
          return <span>{record.incallConfig.mainGroup.name}</span>;
        }
        return null;
      },
    },
    {
      title: "电话组",
      align: "center",
      width: 80,
      render: (text, record, index) => {
        const num =
          (record.incallConfig &&
            record.incallConfig.agentGroupList &&
            record.incallConfig.agentGroupList.length) ||
          0;
        return (
          <Popover
            content={incallPopoverRender(record.incallConfig)}
            disabled={num < 1}
          >
            <span>已分配:{num}</span>
          </Popover>
        );
      },
    },
    {
      title: "受理渠道与岗位",
      align: "center",
      width: 160,
      render: (text, record, index) => {
        let onlineConfigPost = [];
        let incallConfigPost = [];
        if (
          record.onlineConfig &&
          record.onlineConfig.postList &&
          record.onlineConfig.postList.length > 0
        ) {
          record.onlineConfig.postList.forEach((item) => {
            if (agentPostMap[item] && agentPostMap[item].name) {
              onlineConfigPost.push(agentPostMap[item].name);
            }
          });
        }
        if (
          record.incallConfig &&
          record.incallConfig.postList &&
          record.incallConfig.postList.length > 0
        ) {
          record.incallConfig.postList.forEach((item) => {
            if (agentPostMap[item] && agentPostMap[item].name) {
              incallConfigPost.push(agentPostMap[item].name);
            }
          });
        }
        return (
          <div className="agent-post">
            {onlineConfigPost.length > 0 && (
              <div className="post-item">
                <span>在线&nbsp;:&nbsp;</span>
                <span>{onlineConfigPost.join(",")}</span>
              </div>
            )}
            {incallConfigPost.length > 0 && (
              <div className="post-item">
                <span>电话&nbsp;:&nbsp;</span>
                <span>{incallConfigPost.join(",")}</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: "状态",
      dataIndex: "statusName",
      align: "center",
    },
  ];

  /**
   * 格式化查询参数
   */
  const formatParams = (data) => {
    let formatData = {
      onlineGroupId:
        data.onlineGroupId === "all" ? undefined : data.onlineGroupId,
      incallGroupId:
        data.inCallGroup && data.inCallGroup.incallGroupId === "all"
          ? undefined
          : data.inCallGroup.incallGroupId,
      mainGroupId: data.mainGroupId === "all" ? undefined : data.mainGroupId,
      acceptanceChannel:
        data.acceptanceChannel === "all" ? undefined : data.acceptanceChannel,
      post: data.post === "all" ? undefined : data.post,
      // companyId: data.companyObj && data.companyObj.companyId,
      // departIdList:
      //   data.companyObj &&
      //   data.companyObj.departIdList &&
      //   data.companyObj.departIdList.join(","),
      bigRegionCodeList: data.bigRegionCodeList.length ? data.bigRegionCodeList.join(',') : undefined,
      status: data.status || undefined,
      name: (data.name && data.name.trim()) || undefined,
      trueIdList: data.trueIdList?.length ? data.trueIdList?.join(',') : undefined,
      startDate: data.createTime?.[0] ? data.createTime?.[0].format('YYYY-MM-DD') : undefined,
      endDate: data.createTime?.[1] ? data.createTime?.[1].format('YYYY-MM-DD') : undefined,
      pageIndex: defaultPageIndex,
      pageSize: params.pageSize,
    };
    if (formatData.incallGroupId || formatData.incallGroupId == 0) {
      formatData.groupPriority =
        data.inCallGroup && data.inCallGroup.groupPriority === "all"
          ? undefined
          : data.inCallGroup.groupPriority;
    }
    return formatData;
  };

  /**
   * 查询
   */
  const query = () => {
    const data = formFilterRef.current.getData();
    const param = formatParams(data);
    setSelectedRowKeys([]);
    changeParams(param);
  };

  /**
   * 重置
   */
  const reset = () => {
    formFilterRef.current.clearData({
      status: employeeStatusCode,
      acceptanceChannel: "all",
      inCallGroup:{
        incallGroupId: "all",
      },
      onlineGroupId: "all",
      post: "all",
      mainGroupId: "all",
      // companyObj: {
      //   companyId: undefined,
      //   departIdList: [],
      // },
      bigRegionCodeList: [],
    });
    setSelectedRowKeys([]);
    changeParams({
      status: employeeStatusCode,
      pageIndex: defaultPageIndex,
      pageSize: params.pageSize,
    });
  };

  /**
   * 分页
   */
  const changePage = (pageIndex, pageSize) => {
    // 选择置空
    setSelectedRowKeys([]);
    changeParams(
      Object.assign({}, params, {
        pageIndex,
        pageSize,
      })
    );
  };

  /**
   * 编辑坐席
   */
  const editWorkGroup = (trueId, id) => {
    if (trueId) {
      let url =
        window.location.href.split("#")[0] +
        "#/employeeManage/agentManage/edit?" +
        qs.stringify({
          trueId,
          id,
        });
      window.open(url);
    }
  };

  /**
   * 设置组优先级
   */
  const settingGroupPriority = async (id, name) => {
    setAgentGroupPriorityObj(
      Object.create({
        isShow: true,
        id,
        name,
      })
    );
  };

  /**
   * 关闭设置单个优先级弹窗
   */
  const closePriortyModal = (isRefresh) => {
    setAgentGroupPriorityObj(defaultAgentGroupProity);
    if (isRefresh) {
      setSelectedRowKeys([]);
      getList();
    }
  };

  /**
   * 关闭批量设置弹窗
   */
  const closeBtachModal = (isRefresh) => {
    setBatchSettingModal(defaultBatchSetting);
    if (isRefresh) {
      setSelectedRowKeys([]);
      getList();
    }
  };

  /**
   * 批量设置
   */
  const batchSetting = () => {
    if (selectedRowKeys && !selectedRowKeys.length) {
      Modal.warning({
        content: "必须选中至少一个坐席",
        okText: "确定",
      });
      return;
    }
    let selectIdList = [];
    selectRowObjList.length &&
      selectRowObjList.forEach((item) => {
        item.id && selectIdList.push(item.id);
      });
    setBatchSettingModal({
      isShow: true, // 是否展示
      idList: selectIdList, // 坐席ID列表
      agentList: selectRowObjList, // 坐席数据列表
    });
  };

  useEffect(() => {
    initFunc();
  }, []);

  return (
    <div className="agent-manage-box">
      <div className="search-box">
        <FormFilter
          config={filterConfig}
          ref={formFilterRef}
          selfComponents={otherComponentSConfig}
        />
        <div className="search-button-box">
          <Button
            type="primary"
            className="search-button"
            loading={loading}
            onClick={() => {
              query();
            }}
          >
            搜索
          </Button>
          <div className="line-box"></div>
          <Button
            className="search-button"
            disabled={loading}
            onClick={() => {
              reset();
            }}
          >
            清空条件
          </Button>
        </div>
      </div>
      <div className="table-box">
        <div className="table-btn">
          <Button type="primary" onClick={() => batchSetting()}>
            批量设置
          </Button>
        </div>
        <Table
          dataSource={list}
          loading={loading}
          columns={tableConfig}
          pagination={false}
          rowKey="trueId"
          rowSelection={{
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectedRowKeys(selectedRowKeys);
              setSelectRowObjList(selectedRows);
            },
            getCheckboxProps: (record) => ({
              disabled: !record.id || record.status != employeeStatusCode, // Column configuration not to be checked
              name: record.name,
            }),
          }}
          className="call-manage-table"
        />
        <div className="pagination-box">
          <Pagination
            showTotalInfo={true}
            current={parseInt(params.pageIndex)}
            pageSize={parseInt(params.pageSize)}
            total={total}
            showQuickJumper={true}
            pageSizeOptions={["10", "20", "50", "100"]}
            onChange={changePage}
            showSizeChanger={true}
            onShowSizeChange={changePage}
          />
        </div>
        <Modal
          title="设置组优先级"
          visible={agentGroupPriorityObj.isShow}
          width={600}
          footer={null}
          className="priorty-modal"
          destroyOnClose
          onCancel={() => {
            closePriortyModal();
          }}
        >
          <AgentGroupPriorty
            id={agentGroupPriorityObj.id}
            name={agentGroupPriorityObj.name}
            closeModal={closePriortyModal}
          />
        </Modal>
        <Modal
          title="批量设置"
          visible={batchSettingModal.isShow}
          width={600}
          footer={null}
          className="batch-setting-modal"
          destroyOnClose
          onCancel={() => {
            closeBtachModal();
          }}
        >
          <BatchSetting
            idList={batchSettingModal.idList}
            agentList={batchSettingModal.agentList}
            closeModal={closeBtachModal}
            callGroupList={callGroupList}
            onlineGroupList={onlineGroupList}
          />
        </Modal>
      </div>
    </div>
  );
}
