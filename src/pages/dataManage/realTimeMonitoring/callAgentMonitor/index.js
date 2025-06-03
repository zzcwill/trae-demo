import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import FormFilter from "@/components/common/formFilter";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { message, Table, Button } from "dpl-react";
import useGetList from "@/components/common/hooks/useGetList";
import { isArray, isObject } from "@/utils/index";
import notCallImg from "./images/notCall.png";
import callingImg from "./images/calling.png";
import loginStateImg from "./images/loginState.png";

let timeoutObj = null; // 循环调用对象

// 登录状态
const loginState = [
  {
    text: "登录",
    key: "onlineNum",
    type: "loginState",
    value: "1",
  },
  {
    text: "离线",
    key: "offlineNum",
    type: "loginState",
    value: "0",
  },
];

// 通话状态
const onCallState = {
  unCallNum: {
    text: "未通话",
    key: "unCallNum",
    type: "onCallState",
    value: false,
  },
  onCallNum: {
    text: "通话中",
    key: "onCallNum",
    type: "onCallState",
    value: true,
  },
};

// 未通话
const notCall = [
  {
    text: "示忙",
    key: "busyNum",
    type: "ctiState",
    value: "8",
  },
  {
    text: "话后处理",
    key: "afterCallNum",
    type: "ctiState",
    value: "12",
  },
  {
    text: "外呼",
    key: "outCallNum",
    type: "ctiState",
    value: "9",
  },
  {
    text: "就绪",
    key: "freeNum",
    type: "ctiState",
    value: "0",
  },
  {
    text: "考试",
    key: "examingNum",
    type: "ctiState",
    value: "11",
  },
  {
    text: "培训",
    key: "trainingNum",
    type: "ctiState",
    value: "7",
  },
  {
    text: "休息",
    key: "leaveNum",
    type: "ctiState",
    value: "2",
  },
];

// 通话中
const calling = [
  {
    text: "受理",
    key: "inSpeakingNum",
    type: "callState",
    value: "5",
  },
  {
    text: "呼出",
    key: "outSpeakingNum",
    type: "callState",
    value: "16",
  },
];

// 机构类型Map
const orgTypeMap = {
  0: true, // 远程中心
  1: false, // 非远程中心
};

export default function CallAgentMonitor(props) {
  const [isCallcentertUser, setIsCallcenterUser] = useState(false); // 当前登录者身份判断
  const [businessGroupList, setBusinessGroupList] = useState([]); // 业务组数据
  const [workTeamList, setWorkTeamList] = useState([]); // 工作组数据
  const [monitorList, setMonitorList] = useState([]); // 监控信息列表
  const [summarizedData, setSummarizedData] = useState({}); // 监控统计
  const [queryParams, setQueryParams] = useState({}); // 查询参数对象
  const formFilterRef = useRef(null);
  const [isShowTable, setIsShowTable] = useState(false);

  /**
   * 查询列表接口
   * @param {Object} params
   */
  const getMonitorList = async (params) => {
    try {
      clearTimeout(timeoutObj);
      const res = await get({
        url: Api.getConnectMonitorList,
        params,
      });
      if (res.success) {
        const data = res.data;
        if (data.summarizedData && isObject(data.summarizedData)) {
          setSummarizedData(data.summarizedData);
        }
        if (data.monitorInfoList && isArray(data.monitorInfoList)) {
          setMonitorList(data.monitorInfoList);
        }
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.log(e);
    }
    timeoutObj = setTimeout(() => {
      getMonitorList(params);
    }, 3000);
  };

  /**
   * 获取当前登录者信息
   */
  const getCurrentUser = async () => {
    const res = await get({
      url: Api.getCurrentUser,
    });
    if (res.success) {
      const data = res.data;
      if (orgTypeMap[data.orgType]) {
        // 获取业务组和工作组列表
        getBusinessGroupList();
        getWorkTeamList();
      } else {
        // 禁用工作组
        setIsCallcenterUser(true);
        // 获取业务组
        getBusinessGroupList();
      }
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取业务组信息
   */
  const getBusinessGroupList = async () => {
    const res = await get({
      url: Api.getBusinessGroup,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      if (data && isArray(data)) {
        setBusinessGroupList(data);
      }
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取工作组列表
   */
  const getWorkTeamList = async () => {
    const res = await get({
      url: Api.getWorkTeamList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      if (data && isArray(data)) {
        setWorkTeamList(data);
      }
    } else {
      message.error(res.message);
    }
  };

  /**
   * 表单配置
   */
  const filterConfig = [
    {
      type: "select", // string 组件类型 必填
      key: "skillGroup", // string 字段名称 必填
      label: "业务组", // string label名称 非必填 默认为空
      labelWidth: "80px", // number label的width值 非必填 默认为100
      options: businessGroupList, // 选项
      other: {
        placeholder: "请选择业务组",
        mode: "multiple",
        maxTagCount: "1",
        maxTagTextLength: "5",
        allowClear: true,
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      }, // input中的其他可取字段内容
    }, // 业务组
    {
      type: "treeSelect", // string 组件类型 必填
      key: "workGroup", // string 字段名称 必填
      label: "工作组", // string label名称 非必填 默认为空
      labelWidth: "80px", // number label的width值 非必填 默认为100
      orgTree: workTeamList, // 选项
      treeNodeFilter: {
        key: "code",
        value: "code",
        title: "name",
        children: "children",
      },
      other: {
        placeholder: "请选择工作组",
        allowClear: true,
        disabled: isCallcentertUser,
        multiple: true,
        maxTagCount: "1",
        maxTagTextLength: "5",
        treeNodeFilterProp: "title",
      }, // input中的其他可取字段内容
    }, // 工作组
    {
      type: "input", // string 组件类型 必填
      key: "keyword", // string 字段名称 必填
      label: "员工", // string label名称 非必填 默认为空
      labelWidth: "80px", // number label的width值 非必填 默认为100
      other: {
        placeholder: "输入姓名或工号",
        mode: "multiple",
        allowClear: true,
      },
    }, // 员工配置
  ];

  // table表格展示风格
  const columns = [
    {
      title: "基本信息量",
      children: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          align: "center",
          width: 50,
          render: (text, record, index) => {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: "工号",
          dataIndex: "baseInfo.jobNumber",
          key: "baseInfo.jobNumber",
          align: "center",
          width: 50,
        },
        {
          title: "姓名",
          dataIndex: "baseInfo.username",
          key: "baseInfo.username",
          align: "center",
          width: 50,
        },
        {
          title: "工作组",
          dataIndex: "baseInfo.workGroup",
          key: "baseInfo.workGroup",
          width: 80,
        },
      ],
    },
    {
      title: "CTI状态",
      dataIndex: "baseInfo.ctiStatus",
      key: "baseInfo.ctiStatus",
      align: "center",
      width: 90,
    },
    {
      title: "通话组",
      dataIndex: "baseInfo.skillGroup",
      key: "baseInfo.skillGroup",
    },
    {
      title: "在岗时间",
      dataIndex: "todayStatistics.dutyTime",
      key: "todayStatistics.dutyTime",
      align: "center",
      width: 90,
    },
    {
      title: "话后处理时长",
      children: [
        {
          title: "累计时长",
          dataIndex: "todayStatistics.afterCallTotalTime",
          key: "todayStatistics.afterCallTotalTime",
          align: "center",
          width: 90,
        },
        {
          title: "平均时长",
          dataIndex: "todayStatistics.afterCallAverageTime",
          key: "todayStatistics.afterCallAverageTime",
          align: "center",
          width: 90,
        },
      ],
    },
    {
      title: "呼入受理情况",
      children: [
        {
          title: "累计时长",
          dataIndex: "todayStatistics.inCallTime",
          key: "todayStatistics.inCallTime",
          align: "center",
          width: 90,
        },
        {
          title: "次数",
          dataIndex: "todayStatistics.inCallNum",
          key: "todayStatistics.inCallNum",
          align: "center",
          width: 70,
        },
      ],
    },
    {
      title: "外呼情况",
      children: [
        {
          title: "累计时长",
          dataIndex: "todayStatistics.outCallTime",
          key: "todayStatistics.outCallTime",
          align: "center",
          width: 90,
        },
        {
          title: "次数",
          dataIndex: "todayStatistics.outCallNum",
          key: "todayStatistics.outCallNum",
          align: "center",
          width: 70,
        },
      ],
    },
    {
      title: "休息时长",
      dataIndex: "todayStatistics.leaveTime",
      key: "todayStatistics.leaveTime",
      align: "center",
      width: 90,
    },
  ];

  /**
   * 查询
   */
  const searchHandler = () => {
    const param = formFilterRef.current.getData();
    const data = {
      workGroup: param.workGroup ? param.workGroup.join(",") : undefined,
      skillGroup: param.skillGroup ? param.skillGroup.join(",") : undefined,
      keyword: param.keyword && param.keyword.trim(),
      showFlag: true,
    };
    getMonitorList(data);
    setQueryParams(data);
    setIsShowTable(true);
  };

  /**
   * 清空条件
   */
  const clearHandler = () => {
    formFilterRef.current.clearData();
  };

  /**
   * 根据类型查询
   * @param {Object} selectType
   */
  const queryMonitor = (selectType, num) => {
    if (num > 100) {
      return;
    }
    let param = Object.assign({}, queryParams, {
      showFlag: true,
    });
    param[selectType.type] = selectType.value;
    setIsShowTable(true);
    getMonitorList(param);
  };

  useEffect(() => {
    getCurrentUser();
    getMonitorList(Object.assign({}, queryParams, { showFlag: false }));
    return () => {
      clearTimeout(timeoutObj);
    };
  }, []);

  return (
    <div className="agent-monitor-box">
      <div className="search-box">
        <FormFilter config={filterConfig} ref={formFilterRef} />
        <div className="btn-group">
          <Button type="primary" onClick={searchHandler}>
            查询
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={clearHandler}>
            清空条件
          </Button>
        </div>
      </div>
      <div className="statistics-box">
        <div className="login-state-box statistics-item">
          <div className="head">
            <img src={loginStateImg} className="head-img" />
            <span className="head-text">登录状态</span>
          </div>
          <div className="body">
            {loginState.map((item) => {
              return (
                <div className="body-item" key={item.key}>
                  <span className="body-item-label">
                    {item.text}&nbsp;:&nbsp;
                  </span>
                  <span
                    className="body-item-text"
                    onClick={() => {
                      queryMonitor(item, summarizedData[item.key]);
                    }}
                  >
                    {summarizedData[item.key]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="not-call-box statistics-item">
          <div className="head">
            <img src={notCallImg} className="head-img" />
            <span className="head-text">未通话&nbsp;:&nbsp;</span>
            <span
              onClick={() => {
                queryMonitor(
                  onCallState.unCallNum,
                  summarizedData["unCallNum"]
                );
              }}
              className="head-num"
            >
              {summarizedData["unCallNum"]}
            </span>
          </div>
          <div className="body">
            {notCall.map((item) => {
              return (
                <div className="body-item" key={item.key}>
                  <span className="body-item-label">
                    {item.text}&nbsp;:&nbsp;
                  </span>
                  <span
                    className="body-item-text"
                    onClick={() => {
                      queryMonitor(item, summarizedData[item.key]);
                    }}
                  >
                    {summarizedData[item.key]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="calling-box statistics-item">
          <div className="head">
            <img src={callingImg} className="head-img" />
            <span className="head-text">通话中&nbsp;:&nbsp;</span>
            <span
              onClick={() => {
                queryMonitor(
                  onCallState.onCallNum,
                  summarizedData["onCallNum"]
                );
              }}
              className="head-num"
            >
              {summarizedData["onCallNum"]}
            </span>
          </div>
          <div className="body">
            {calling.map((item) => {
              return (
                <div className="body-item" key={item.key}>
                  <span className="body-item-label">
                    {item.text}&nbsp;:&nbsp;
                  </span>
                  <span
                    className="body-item-text"
                    onClick={() => {
                      queryMonitor(item, summarizedData[item.key]);
                    }}
                  >
                    {summarizedData[item.key]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {isShowTable && (
        <div className="table-box">
          <Table
            dataSource={monitorList}
            bordered
            columns={columns}
            pagination={false}
          />
        </div>
      )}
    </div>
  );
}
