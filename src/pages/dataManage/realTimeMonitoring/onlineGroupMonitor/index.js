import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { message, Popover, Table, Select } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { formatDataSource, isArray, isObject, makeUUID } from "@/utils/index";
import ShowData from "./components/showData";
import { uForm } from "dora";
import { callcenterEnumOptionType, dictTypeEnum } from "@/const/config";
import { getCallAndOnlineMonitorSortRuleList } from "@/const/type";
import AllChooseSelect from "@/components/common/allChooseSelect";
import { getConnectRatioTypeText, getConnectRatioTypeColor, getConnectRatioThreshold } from "../common/index";

const { Option } = Select;
const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset } = uForm
// 监控数据
const monitorData = [
  {
    text: "排队数",
    key: "queuingNum",
    color: "#FF6E7B",
  },
  {
    text: "通话数",
    key: "connectedNum",
    color: "#2CB5FD",
  },
  {
    text: "总数",
    key: "consultNum",
    color: "#1AD175",
  },
];

// 今日累计数
const summarizedTodayGroupConfig = [
  {
    text: "咨询数",
    key: "consultNum"
  },
  {
    text: "通话数",
    key: "connectedNum"
  },
  {
    text: "放弃数",
    key: "abandonNum"
  },
  {
    text: "接通率",
    key: "connectRatio"
  },
]

let timeoutObj = null; // 循环调用对象
const SORTORDER = {
  default: '',
  queues_num: 'desc', // 排队数降序
  connect_rate: 'asc' // 接通率升序
}
const sortRuleList = getCallAndOnlineMonitorSortRuleList() // 排序规则

export default function CallGroupMonitor(props) {
  const [monitorDataObject, setMonitorDataObject] = useState({}); // 监控数据
  const [summarizedTodayGroupData, setSummarizedTodayGroupData] = useState({}); // 今日累计数据
  const [monitorDataList, setMonitorDataList] = useState([]); // 监控列表
  const [businessCenterList, setBusinessCenterList] = useState([]); // 经营中心列表
  const [memberTypeList, setMemberTypeList] = useState([]); // 会员类型
  const [businessTypeList, setBusinessTypeList] = useState([]); // 自诩业务类型
  const [areaList, setAreaList] = useState([]); // 地区
  const [connectType, setConnectType] = useState([]); // 接通率类型
  const [productCategoryList, setProductCategoryList] = useState([]); // 产品大类
  // 添加排序规则 默认排序order不传其他传desc
  const [sortRule, setSortRule] = useState('default'); 
  const sortRuleRef = useRef('default'); // 排序规则
  const paramsRef = useRef(null);
  /**
 * 获取枚举
 */
  const getEnumOptions = async () => {
    const res = await get({
      url: Api.getEnumOption,
      params: {
        groupNames: [
          callcenterEnumOptionType.GBusinessCenterType,
          callcenterEnumOptionType.BAdminCompanyType,
          'consult_business_type',
          'member_type',
          'connect_rate_type',
          dictTypeEnum.productCategory
        ].join(','), // FALLOCATION_STRATEGY：成员分配策略
      },
    });
    if (res.success) {
      let centerList = []
      const data = res.data;
      data.forEach((item) => {
        switch (item.groupName) {
          case dictTypeEnum.memberType:
            setMemberTypeList(formatDataSource(item.options))
            break;
          case dictTypeEnum.consultBusinessType:
            setBusinessTypeList(formatDataSource(item.options))
            break;
          case callcenterEnumOptionType.GBusinessCenterType:
            centerList = centerList.concat(item.options)
            break;
          case callcenterEnumOptionType.BAdminCompanyType:
            centerList = centerList.concat(item.options) // 拼接两个经营中心列表
            break;
          case dictTypeEnum.connect_rate_type:
            setConnectType(formatDataSource(item.options))
            break;
          case dictTypeEnum.productCategory:
            setProductCategoryList(formatDataSource(item.options))
            break;            
          default:
            break;
        }
      });
      setBusinessCenterList(formatDataSource(centerList))
    } else {
      message.error(res.message);
    }
  };


  /**
   * 获取地区
   */
  const getAreaList = async () => {
    const res = await get({
      url: Api.getAreaList,
    });
    if (res.success) {
      const data = res.data;
      setAreaList(formatDataSource(
        [].concat(
          {
            id: "000000",
            name: "全国",
          },
          data
        )
      ));
    } else {
      message.error(res.message);
    }
  };

  const getMonitorData = async (params) => {
    const values = params?.values;
    if (values) {
      paramsRef.current = values
    }
    const { businessCenterCodeList, name, areaIdList, consultBusinessTypeList, memberTypeList, connectRatioTypeList, productCategoryList } = (paramsRef.current || {});
    try {
      const res = await post({
        url: Api.getOnlineMonitor,
        data: {
          businessCenterCodeList,
          areaIdList,
          consultBusinessTypeList,
          memberTypeList,
          connectRatioTypeList,
          productCategoryList,
          name: name?.trim(),
          sortRuleList: [{
            field: sortRuleRef.current,
            order: SORTORDER[sortRuleRef.current]
          }]
        }
      });
      if (res.success) {
        const data = res.data;
        if (data.summarizedData && isObject(data.summarizedData)) {
          setMonitorDataObject(data.summarizedData);
        }
        if (data.summarizedTodayGroupData && isObject(data.summarizedTodayGroupData)) {
          setSummarizedTodayGroupData(data.summarizedTodayGroupData);
        }
        if (data.monitorInfoList && isArray(data.monitorInfoList)) {
          setMonitorDataList(data.monitorInfoList);
        }
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.log(e);
    }
    clearTimeout(timeoutObj);
    timeoutObj = setTimeout(() => {
      getMonitorData();
    }, 5000);
    return {};
  };

  // 表格
  const columns = [
    {
      title: "基本信息",
      width: 200,
      children: [
        {
          title: "",
          width: 80,
          key: 'id',
          align: "center",
          render: (text, record, index) => {
            return <span>{index + 1}</span>;
          },
        },
        {
          title: "业务组",
          dataIndex: "baseInfo.skillGroupName",
          key: "baseInfo.skillGroupName",
          width: 266,
          ellipsis: true,
        },
      ],
    },
    {
      title: "访客对话",
      width: 320,
      children: [
        {
          title: "排队数",
          dataIndex: "realTimeStatistics.queuingNum",
          key: "realTimeStatistics.queuingNum",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="访客对话:排队数">{text}</Popover>;
          },
        },
        {
          title: "通话数",
          dataIndex: "realTimeStatistics.callingNum",
          key: "realTimeStatistics.callingNum",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="访客对话:通话数">{text}</Popover>;
          },
        },
      ],
    },
    {
      title: "在线客服",
      width: 480,
      children: [
        {
          title: "在线",
          dataIndex: "realTimeStatistics.agentOnlineNum",
          key: "realTimeStatistics.agentOnlineNum",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="在线客服:在线">{text}</Popover>;
          },
        },
        {
          title: "忙碌",
          dataIndex: "realTimeStatistics.agentBusyNum",
          key: "realTimeStatistics.agentBusyNum",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="在线客服:忙碌">{text}</Popover>;
          },
        },
        {
          title: "离开",
          dataIndex: "realTimeStatistics.agentLevelNum",
          key: "realTimeStatistics.agentLevelNum",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="在线客服:离开">{text}</Popover>;
          },
        },
      ],
    },
    {
      title: "今日累计",
      width: 320,
      children: [
        {
          title: "咨询数",
          dataIndex: "todayStatistics.consultNum",
          key: "todayStatistics.consultNum",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="今日累计:咨询数">{text}</Popover>;
          },
        },
        {
          title: "接通数",
          dataIndex: "todayStatistics.connectedNum",
          key: "todayStatistics.connectedNum",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="今日累计:接通数">{text}</Popover>;
          },
        },
        {
          title: "放弃数",
          dataIndex: "todayStatistics.abandonNum",
          key: "todayStatistics.abandonNum",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="今日累计:放弃数">{text}</Popover>;
          },
        },
        {
          title: "接通率",
          dataIndex: "todayStatistics.connectRatio",
          key: "todayStatistics.connectRatio",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="今日累计:接通率">{text}</Popover>;
          },
        },
        {
          title: "接通率情况",
          dataIndex: "todayStatistics.connectRatioType",
          key: "todayStatistics.connectRatioType",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="今日累计:接通率情况">{getConnectRatioTypeText(text)}</Popover>;
          },
        },
        {
          title: "接通率阈值",
          dataIndex: "todayStatistics",
          key: "todayStatistics",
          align: "center",
          render: (text, record, index) => {
            return <Popover content="今日累计:接通率阈值">{getConnectRatioThreshold(text?.groupCallCompletingRateLowerThreshold, text?.groupCallCompletingRateUpperThreshold)}</Popover>;
          },
        }
      ],
    },
  ];
  useEffect(() => {
    getMonitorData();
    getEnumOptions();
    getAreaList();
    return () => {
      clearTimeout(timeoutObj);
    };
  }, []);

  const { form } = useFormTableQuery(getMonitorData)

  return (
    <div className="online-group-monitor-box">
      <div className="main-box">
        <div className="search-box">
          <SchemaForm 
            {...form}
            inline 
            className='app-search-box'
            components={{
              AllChooseSelect
            }}
          >
          <Field
              type='string'
              title='在线组名称'
              name='name'
              x-component='Input'
              x-component-props={{ placeholder: '请输入' }}
            />
            <Field
              type='string'
              title='经营中心'
              name='businessCenterCodeList'
              x-component='Select'
              x-component-props={{ 
                placeholder: '请选择',
                dataSource: businessCenterList,
                allowClear: true,
                showSearch: true,
                optionFilterProp: "children",
                mode: 'multiple',
                maxTagCount: 1,
                maxTagTextLength: 6
              }}
            />
            <Field
              type='string'
              title='地区'
              name='areaIdList'
              className="area-controller"
              x-component='AllChooseSelect'
              x-component-props={{ 
                placeholder: '请选择',
                dataSource: areaList,
                allowClear: true,
                showSearch: true,
                optionFilterProp: "children",
                mode: 'multiple',
                maxTagCount: 2,
                maxTagTextLength: 3
              }}
            />
            <Field
              type='string'
              title='业务类型'
              name='consultBusinessTypeList'
              x-component='Select'
              x-component-props={{ 
                placeholder: '请选择',
                dataSource: businessTypeList,
                allowClear: true,
                showSearch: true,
                optionFilterProp: "children",
                mode: 'multiple',
                maxTagCount: 1,
                maxTagTextLength: 6
              }}
            />
            <Field
              type='string'
              title='会员类型'
              name='memberTypeList'
              x-component='Select'
              x-component-props={{ 
                placeholder: '请选择',
                dataSource: memberTypeList,
                allowClear: true,
                showSearch: true,
                optionFilterProp: "children",
                mode: 'multiple',
                maxTagCount: 1,
                maxTagTextLength: 6
              }}
            />
            <Field
              type='string'
              title='接通率情况'
              name='connectRatioTypeList'
              x-component='Select'
              x-component-props={{ 
                placeholder: '请选择',
                dataSource: connectType,
                allowClear: true,
                showSearch: true,
                optionFilterProp: "children",
                mode: 'multiple',
                maxTagCount: 1,
                maxTagTextLength: 6
              }}
            />
            <Field
              type='string'
              title='产品大类'
              name='productCategoryList'
              x-component='Select'
              x-component-props={{ 
                placeholder: '请选择',
                dataSource: productCategoryList,
                allowClear: true,
                showSearch: true,
                optionFilterProp: "children",
                mode: 'multiple',
                maxTagCount: 1,
                maxTagTextLength: 6
              }}
            />
            <FormButtonGroup>
              <Submit style={{ marginRight: 10 }} />
              <Reset />
            </FormButtonGroup>
          </SchemaForm>
        </div>
        <div className="show-box">
          <div className="monitor-data-title">监控数据&nbsp;:&nbsp;&nbsp;</div>
          {monitorData.map((item) => {
            return (
              <div className="monitor-data-item" key={item.key}>
                <div
                  className="item-color"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span>{item.text}&nbsp;:&nbsp;</span>
                <span>{monitorDataObject[item.key]}</span>
              </div>
            );
          })}
          {summarizedTodayGroupData && <>
            <div className="monitor-data-title">今日累计&nbsp;:&nbsp;&nbsp;</div>
            {summarizedTodayGroupConfig.map((item, summarIndex) => {
              return <span key={summarIndex}><span>{item.text}</span>&nbsp;:&nbsp;&nbsp;<span>{(summarizedTodayGroupData[item.key] || summarizedTodayGroupData[item.key] == 0) ? summarizedTodayGroupData[item.key] : '-'}</span>&nbsp;&nbsp;&nbsp;</span>
            })}
          </>}
          <Select 
              onChange={(value) => {
                setSortRule(value);
                sortRuleRef.current = value;
                getMonitorData();
              }}
              value={sortRule}
              placeholder="排序规则"
          >
              {sortRuleList.map((item) => {
                  return (
                  <Option key={item.value} value={item.value}>
                      {item.label}
                  </Option>
                  );
              })}
          </Select>
        </div>
        <div className="online-group-table-box">
          <Table
            dataSource={monitorDataList}
            bordered
            columns={columns}
            rowClassName={(record) => { 
              return getConnectRatioTypeColor(record.todayStatistics?.connectRatioType)
            }}
            rowKey={() => makeUUID()}
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}
