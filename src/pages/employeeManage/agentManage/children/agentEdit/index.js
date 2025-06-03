import React, { useEffect, useState } from "react";
import "./index.scss";
import qs from "qs";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import OnlineEdit from "./components/onlineEdit";
import CallEdit from "./components/callEdit";
import {
  message,
  Col,
  Row,
  Tabs,
  Checkbox,
  Modal,
  Button,
  Select,
} from "dpl-react";
import {
  workGroupType,
  callcenterEnumOptionType,
  agentMessageType,
  agentPostCode,
  defaultEmployeeManageEditConfig,
  acceptanceChannelCode,
} from "@/const/config";
import { isArray, isObject } from "@/utils/index";
const TabPane = Tabs.TabPane;

// 受理渠道
const acceptanceChannelList = [
  {
    id: "2",
    name: "在线咨询",
  },
  {
    id: "1",
    name: "来电咨询",
  },
];
// 默认坐席身份为在线咨询
const onlineAgentCode = "2";
// tabs标签展示内容
const tabsObject = {
  "1": {
    id: "1",
    name: "来电",
    components: CallEdit,
  },
  "2": {
    id: "2",
    name: "在线",
    components: OnlineEdit,
  },
};

/**
 * 获取数组中的id列表
 */
function getIdList(list) {
  if (isArray(list)) {
    return list.map((item) => {
      return item.id;
    });
  } else {
    return [];
  }
}

// 格式化处理参数内容
const formatDataConfig = {
  base: {
    acceptanceChannelList: {
      key: "acceptanceChannelList",
      getValue: (data) => {
        if (data && !data.length) {
          return [].concat(onlineAgentCode);
        } else {
          let firstTab;
          let list = data.filter((value) => {
            if (value == onlineAgentCode) {
              firstTab = value;
            }
            return value != onlineAgentCode;
          });
          firstTab && list.unshift(firstTab);
          return list;
        }
      },
    }, // 坐席受理渠道
  },
  onlineConfig: {
    // 坐席头像
    headImageUrl: {
      key: "headImageUrl",
      getValue: (data) => {
        return data || defaultEmployeeManageEditConfig.agentHeadImg;
      },
    },
    // 坐席自动分配
    autoAllocation: {
      key: "autoAllocation",
      getValue: (data) => {
        return (
          data || defaultEmployeeManageEditConfig.onlineAgentAutoAllocation
        );
      },
    },
    // 坐席 坐席组
    agentGroupList: {
      key: "agentGroupIdList",
      getValue: (list) => {
        if (isArray(list)) {
          return getIdList(list);
        }
        return [];
      },
    },
    // 坐席 坐席组
    monitorGroupList: {
      key: "monitorGroupIdList",
      getValue: (list) => {
        if (isArray(list)) {
          return getIdList(list);
        }
        return [];
      },
    },
  },
  incallConfig: {
    recordSoundFlag: {
      key: "recordSoundFlag",
      getValue: (data) => {
        return data || defaultEmployeeManageEditConfig.callAgentRecordSoundFlag;
      },
    }, // 坐席是否录音
    agentGroupList: {
      key: "agentGroupIdList",
      getValue: (list) => {
        if (isArray(list)) {
          return getIdList(list);
        }
        return [];
      },
    }, // 坐席 坐席组
    monitorGroupList: {
      key: "monitorGroupIdList",
      getValue: (list) => {
        if (isArray(list)) {
          return getIdList(list);
        }
        return [];
      },
    }, // 坐席 坐席组
    mainGroup: {
      key: "mainGroup",
      getValue: (data) => {
        if (isObject(data)) {
          return data.id || undefined;
        } else {
          return undefined;
        }
      },
    }, // 坐席 重要组
  },
};

// 在线必填校验
const onlineValidateFields = [
  {
    key: "headImageUrl",
    message: "在线页签中，头像不能为空",
    rules: (data) => {
      return data;
    },
  },
  {
    key: "nickname",
    message: "在线页签中，昵称不能为空",
    rules: (data) => {
      return data && data.trim();
    },
  },
  {
    key: "postList",
    message: "在线页签中，岗位不能为空",
    rules: (data) => {
      return isArray(data) && data.length > 0;
    },
  },
  {
    key: "agentGroupIdList",
    message: "在线页签中，岗位为坐席时坐席组不能为空",
    beforeRules: (detail) => {
      return (
        detail.postList && detail.postList.indexOf(agentPostCode.agent) > -1
      );
    },
    rules: (data) => {
      return isArray(data) && data.length > 0;
    },
  },
  {
    key: "monitorGroupIdList",
    message: "在线页签中，岗位为班长时班长组不能为空",
    beforeRules: (detail) => {
      return (
        detail.postList && detail.postList.indexOf(agentPostCode.monitor) > -1
      );
    },
    rules: (data) => {
      return isArray(data) && data.length > 0;
    },
  },
  {
    key: "maxReception",
    message: "在线页签中，接待上限不能为空",
    rules: (data) => {
      return data;
    },
  },
];

// 来电必填校验
const callValidateFields = [
  {
    key: "postList",
    message: "来电页签中，岗位不能为空",
    rules: (data) => {
      return isArray(data) && data.length > 0;
    },
  },
  {
    key: "agentGroupIdList",
    message: "来电页签中，岗位为坐席时坐席组不能为空",
    beforeRules: (detail) => {
      return (
        detail.postList && detail.postList.indexOf(agentPostCode.agent) > -1
      );
    },
    rules: (data) => {
      return isArray(data) && data.length > 0;
    },
  },
  {
    key: "monitorGroupIdList",
    message: "来电页签中，岗位为班长时班长组不能为空",
    beforeRules: (detail) => {
      return (
        detail.postList && detail.postList.indexOf(agentPostCode.monitor) > -1
      );
    },
    rules: (data) => {
      return isArray(data) && data.length > 0;
    },
  },
  {
    key: "mainGroup",
    message: "来电页签中，岗位为坐席时主要业务组组不能为空",
    beforeRules: (detail) => {
      return (
        detail.postList && detail.postList.indexOf(agentPostCode.agent) > -1
      );
    },
    rules: (data) => {
      return data;
    },
  },
  {
    key: "onDutyPosition",
    message: "来电页签中，值班职务不能为空",
    rules: (data) => {
      return data;
    },
  },
];

export default function AgentEdit(props) {
  const [callGroupList, setCallGroupList] = useState([]); // 电话业务组
  const [onlineGroupList, setOnlineGroupList] = useState([]); // 在线业务组
  const [onDutyPositionList, setOnDutyPositionList] = useState([]); // 值班职务
  const [agentPostList, setAgentPostList] = useState([]); // 岗位
  const [loading, setLoading] = useState(false); // loading
  const [originalData, setOriginalData] = useState({}); // 原始数据
  const [typeList, setTypeList] = useState([]); // 设置人员归属
  const [agentData, setAgentData] = useState({
    id: undefined, // 坐席Id
    trueId: undefined, // 坐席trueId
    userId: undefined, // 坐席账号
    workId: undefined, // 坐席工号
    name: undefined, // 坐席名称
    companyId: undefined, // 机构
    companyName: undefined, // 机构名称
    type: undefined, // 人员归属
    acceptanceChannelList: [], // 受理渠道
    onlineConfig: {}, // 在线信息
    incallConfig: {}, // 来电信息
  }); // 坐席信息

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
        setCallGroupList(data);
      }
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取枚举（值班职务，岗位）
   */
  const getEnumOptions = async () => {
    const res = await get({
      url: Api.getEnumOption,
      params: {
        groupNames: "ON_DUTY_POSITION,SEAT_POST,agent_type", // ON_DUTY_POSITION：值班职务,SEAT_POST：岗位
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        switch (item.groupName) {
          // 排队满时处理策略
          case callcenterEnumOptionType.OnDutyPosition:
            setOnDutyPositionList(item.options);
            break;
          case callcenterEnumOptionType.AgentPost:
            setAgentPostList(item.options);
            break;
          case callcenterEnumOptionType.AgentType:
            setTypeList(item.options?.map(item => ({ value: item.id, label: item.name })));
            break
          default:
            break;
        }
      });
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取坐席详情
   */
  const getAgentDetail = async (trueId, id) => {
    const res = await get({
      url: Api.getAgentDetail,
      params: {
        trueId,
      },
    });
    if (res.success) {
      setOriginalData(res.data);
      const data = formatAgentData(res.data);
      const reg = /^[1-9][0-9]?$/;
      let obj = Object.assign({ id }, data);
      if (
        data.onlineConfig &&
        data.onlineConfig.maxReception &&
        !reg.test(data.onlineConfig.maxReception)
      ) {
        obj.onlineConfig.maxReception = undefined;
      }
      setAgentData(obj);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 格式化处理坐席详细信息
   */
  const formatAgentData = (detail) => {
    let data = Object.assign({}, detail);
    // 如果坐席没有受理渠道的时候，默认为在线
    Object.keys(formatDataConfig).forEach((key) => {
      const configType = formatDataConfig[key];
      if (key === "base") {
        Object.keys(configType).forEach((configKey) => {
          const config = configType[configKey];
          data[config.key] = config.getValue(data[configKey]);
        });
      } else {
        if (!data[key]) {
          data[key] = {};
        }
        Object.keys(configType).forEach((configKey) => {
          const config = configType[configKey];
          data[key][config.key] = config.getValue(data[key][configKey]);
        });
      }
    });
    return data;
  };

  /**
   * 初始化查询方法
   */
  const initFunc = () => {
    getEnumOptions();
    getWorkGroupList(workGroupType.online);
    getWorkGroupList(workGroupType.call);
  };

  /**
   * 受理渠道修改
   */
  const acceptanceChannelChange = (value) => {
    if (agentData.id === 0 || agentData.id) {
      const acceptanceChannelList = originalData["acceptanceChannelList"] || [];
      const len = acceptanceChannelList.length;
      for (let i = 0; i < len; i++) {
        const item = acceptanceChannelList[i];
        if (value.indexOf(item) < 0) {
          return;
        }
      }
    }
    if (!value.length) {
      Modal.warning({
        content: "坐席必须选择一个受理渠道",
        okText: "确定",
      });
      return;
    }
    agentMessageChange(null, "acceptanceChannelList", value);
  };

  /**
   * 坐席信息修改
   * type: (online,call)
   */
  const agentMessageChange = (type, key, value) => {
    let sourceData = Object.assign({}, agentData);
    switch (type) {
      case agentMessageType.online:
        sourceData.onlineConfig[key] = value;
        break;
      case agentMessageType.call:
        sourceData.incallConfig[key] = value;
        break;
      default:
        sourceData[key] = value;
        break;
    }
    setAgentData(sourceData);
  };

  /**
   * 保存
   */
  const save = () => {
    if (!agentData.type) {
      modalWarning("人员归属不能为空");
      return;
    }
    if (
      agentData.acceptanceChannelList &&
      agentData.acceptanceChannelList.length > 0
    ) {
      let isError = false;
      for (
        let i = 0, channelLen = agentData.acceptanceChannelList.length;
        i < channelLen;
        i++
      ) {
        const channel = agentData.acceptanceChannelList[i];
        if (channel == acceptanceChannelCode.call) {
          isError = checkError(callValidateFields, "incallConfig");
        } else {
          isError = checkError(onlineValidateFields, "onlineConfig");
        }
        if (isError) {
          return;
        }
      }
      let sendData = {
        id: agentData.id || undefined,
        trueId: agentData.trueId,
        acceptanceChannelList: agentData.acceptanceChannelList,
        type: agentData.type
      };
      if (
        agentData.acceptanceChannelList.indexOf(acceptanceChannelCode.online) >
        -1
      ) {
        sendData.onlineConfig = {
          headImageUrl: agentData.onlineConfig.headImageUrl,
          nickname: agentData.onlineConfig.nickname.trim(),
          postList: agentData.onlineConfig.postList,
          agentGroupIdList:
            agentData.onlineConfig.postList.indexOf(agentPostCode.agent) > -1
              ? agentData.onlineConfig.agentGroupIdList
              : undefined,
          monitorGroupIdList:
            agentData.onlineConfig.postList.indexOf(agentPostCode.monitor) > -1
              ? agentData.onlineConfig.monitorGroupIdList
              : undefined,
          maxReception: agentData.onlineConfig.maxReception,
          autoAllocation: agentData.onlineConfig.autoAllocation,
        };
      }
      if (
        agentData.acceptanceChannelList.indexOf(acceptanceChannelCode.call) > -1
      ) {
        sendData.incallConfig = {
          postList: agentData.incallConfig.postList,
          agentGroupIdList:
            agentData.incallConfig.postList.indexOf(agentPostCode.agent) > -1
              ? agentData.incallConfig.agentGroupIdList
              : undefined,
          monitorGroupIdList:
            agentData.incallConfig.postList.indexOf(agentPostCode.monitor) > -1
              ? agentData.incallConfig.monitorGroupIdList
              : undefined,
          mainGroup:
            agentData.incallConfig.postList.indexOf(agentPostCode.agent) > -1
              ? agentData.incallConfig.mainGroup
              : undefined,
          onDutyPosition: agentData.incallConfig.onDutyPosition,
          recordSoundFlag: agentData.incallConfig.recordSoundFlag,
        };
      }
      updataFunc(sendData);
    } else {
      modalWarning("受理渠道不能为空");
    }
  };

  /**
   * 检查是否存在错误
   */
  const checkError = (validateFields, type) => {
    for (let j = 0, len = validateFields.length; j < len; j++) {
      const data = agentData[type];
      const config = validateFields[j];
      if (config.beforeRules) {
        if (config.beforeRules(data) && !(config.rules(data[config.key]) || config.rules(data[config.key]) === 0)) {
          modalWarning(config.message);
          return true;
        }
      } else if (!config.rules(data[config.key])) {
        modalWarning(config.message);
        return true;
      }
    }
    return false;
  };

  /**
   * warning提示弹出
   */
  const modalWarning = (content) => {
    Modal.warning({
      content,
      okText: "确定",
    });
  };

  /**
   * 取消
   */
  const channel = () => {
    window.close();
  };

  /**
   * 修改坐席信息
   * @param {Object} sendData
   */
  const updataFunc = async (sendData) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdataAgent,
        data: sendData,
      });
      if (res.success) {
        message.success("修改坐席信息成功！");
        let url =
          window.location.href.split("#")[0] + "#/employeeManage/agentManage";
        window.location.href = url;
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("系统出错请咨询管理员！");
    }
    setLoading(false);
  };

  useEffect(() => {
    const data = qs.parse(window.location.href.split("?")[1]);
    if (data.trueId) {
      initFunc();
      getAgentDetail(data.trueId, data.id);
    }
  }, []);

  return (
    <div className="agent-edit-box">
      <div className="edit-box">
        <div className="agent-edit-title">修改坐席</div>
        <div className="agent-message-box">
          <Row>
            <Col span="6">
              <div className="message-item">
                <div className="message-item-label">账号&nbsp;:&nbsp;</div>
                <div className="message-item-value">{agentData.userId}</div>
              </div>
            </Col>
            <Col span="6">
              <div className="message-item">
                <div className="message-item-label">姓名&nbsp;:&nbsp;</div>
                <div className="message-item-value">{agentData.name}</div>
              </div>
            </Col>
            <Col span="6">
              <div className="message-item">
                <div className="message-item-label">坐席工号&nbsp;:&nbsp;</div>
                <div className="message-item-value">{agentData.workId}</div>
              </div>
            </Col>
            <Col span="6">
              <div className="message-item">
                <div className="message-item-label">受理机构&nbsp;:&nbsp;</div>
                <div className="message-item-value" title={agentData.companyName}>
                  {`${agentData.businessCenterName || '-'}/${agentData.bigRegionName || '-'}`}
                </div>
              </div>
            </Col>
          </Row>
          <div className="acceptance-channel-box" style={{ marginBottom: 16 }}>
            <div className="message-item-label">
              <span className="message-required">*</span>
              <span>人员归属&nbsp;:&nbsp;</span>
            </div>
            <div className="message-item-value">
              <Select
                style={{
                  minWidth: 180
                }}
                value={agentData?.type}
                onChange={(val) => {
                  setAgentData({
                    ...agentData,
                    type: val
                  })
                }}
              >
                {typeList?.map(item => {
                  return (
                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                  )
                })}
              </Select>
            </div>
          </div>
          <div className="acceptance-channel-box">
            <div className="message-item-label">
              <span className="message-required">*</span>
              <span>受理渠道&nbsp;:&nbsp;</span>
            </div>
            <div className="message-item-value">
              <Checkbox.Group
                value={agentData.acceptanceChannelList}
                onChange={acceptanceChannelChange}
              >
                {acceptanceChannelList.map((item) => {
                  return (
                    <Checkbox key={item.id} value={item.id}>
                      {item.name}
                    </Checkbox>
                  );
                })}
              </Checkbox.Group>
            </div>
          </div>
        </div>
        <div className="tab-box">
          <Tabs type="card">
            {agentData.acceptanceChannelList.length > 0 &&
              agentData.acceptanceChannelList.map((item) => {
                const Element = tabsObject[item].components;
                return (
                  <TabPane
                    tab={tabsObject[item].name}
                    key={tabsObject[item].id}
                  >
                    <Element
                      callGroupList={callGroupList}
                      onlineGroupList={onlineGroupList}
                      onDutyPositionList={onDutyPositionList}
                      onChange={agentMessageChange}
                      agentPostList={agentPostList}
                      data={agentData}
                    ></Element>
                  </TabPane>
                );
              })}
          </Tabs>
        </div>
        <div className="button-box">
          <Button
            type="primary"
            className="search-button"
            loading={loading}
            onClick={() => {
              save();
            }}
          >
            确定
          </Button>
          <div className="button-line-box"></div>
          <Button
            className="search-button"
            disabled={loading}
            onClick={() => {
              channel();
            }}
          >
            取消
          </Button>
        </div>
      </div>
    </div>
  );
}
