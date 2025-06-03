import React, { useState, useEffect } from "react";
import "./index.scss";
import { message, Select } from "dpl-react";
import { get } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import BatchEdit from "./components/batchEdit";
import BatchUpdataMainGroup from "./components/batchUpdataMainGroup";
import BatchUpdataGroupPriorty from "./components/batchUpdataGroupPriorty";
import BatchUpdataMaxReception from "./components/batchUpdataMaxReception";
import BatchAutoDistribution from "./components/batchAutoDistribution";

const Option = Select.Option;
// 批量操作配置
const batchSettingList = [
  {
    id: "add",
    name: "批量新增组",
  },
  {
    id: "delete",
    name: "批量删除组",
  },
  {
    id: "updata",
    name: "批量修改组",
  },
  {
    id: "updataMainGroup",
    name: "批量修改主要业务组",
  },
  {
    id: "updataGroupPriorty",
    name: "批量修改组优先级",
  },
  {
    id: "updateMaxReception",
    name: "批量修改接待上限",
  },
  {
    // TODO: 需要确认是否前端写死
    id: "batchAutoDistribution",
    name: "批量修改自动分配",
  },
];
// 默认批量操作为批量新增组
const defaultBatchSettingCode = "add";

export default function BatchSetting(props) {
  const {
    idList = [],
    agentList = [],
    callGroupList = [],
    onlineGroupList = [],
    closeModal,
  } = props;

  const [agentNames, setAgentNames] = useState(() => {
    let list = [];
    agentList.forEach((item) => {
      item.name && list.push(item.name);
    });
    return list.join("、");
  }); // 批量操作的坐席的名称
  const [batchOption, setBatchOption] = useState(defaultBatchSettingCode); // 批量操作选择类型
  const [mainGroupList, setMainGroupList] = useState([]); // 主要业务组列表
  const [groupPriortyList, setGroupPriortyList] = useState([]); // 主要业务组列表

  /**
   * 批量操作类型修改
   */
  const batchOptionChange = (value) => {
    switch (value) {
      // 批量修改主要业务组
      case "updataMainGroup":
        getMainGroupList();
        break;
      // 批量修改组优先级
      case "updataGroupPriorty":
        getGroupPriorty();
        break;
      default:
        break;
    }
    setBatchOption(value);
  };

  /**
   * 批量查询选中坐席主要业务组列表接口
   */
  const getMainGroupList = async () => {
    const res = await get({
      url: Api.getBatchMainGroupList,
      params: {
        idList: idList.join(","),
      },
    });
    if (res.success) {
      const data = res.data;
      setMainGroupList(data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 批量查询选中坐席组列表接口
   */
  const getGroupPriorty = async () => {
    const res = await get({
      url: Api.getBatchGroupPriortyList,
      params: {
        idList: idList.join(","),
      },
    });
    if (res.success) {
      const data = res.data;
      setGroupPriortyList(data);
    } else {
      message.error(res.message);
    }
  };
  /**
   * 渲染批量操作展示界面
   */
  const renderBatchOperation = (value) => {
    switch (value) {
      case "updataMainGroup":
        return (
          <BatchUpdataMainGroup
            mainGroupList={mainGroupList}
            idList={idList}
            closeModal={closeModal}
          />
        );
      case "updataGroupPriorty":
        return (
          <BatchUpdataGroupPriorty
            groupPriortyList={groupPriortyList}
            idList={idList}
            closeModal={closeModal}
          />
        );
      case "updateMaxReception":
        return (
          <BatchUpdataMaxReception idList={idList} closeModal={closeModal} />
        );
      case "batchAutoDistribution":
        return (
          <BatchAutoDistribution idList={idList} closeModal={closeModal} />
        );
      default:
        return (
          <BatchEdit
            batchType={value}
            idList={idList}
            callGroupList={callGroupList}
            onlineGroupList={onlineGroupList}
            closeModal={closeModal}
          />
        );
    }
  };

  return (
    <div className="batch-setting-box">
      <div className="base-message-box">
        <div className="base-item item-agent">
          <div className="item-label ">
            <span>坐席&nbsp;:&nbsp;</span>
          </div>
          <div className="item-context">{agentNames}</div>
        </div>
        <div className="base-item">
          <div className="item-label">
            <span className="message-required">*</span>
            <span>操作&nbsp;:&nbsp;</span>
          </div>
          <div className="item-context">
            <Select
              value={batchOption}
              placeholder="请选择操作类型"
              className="operation-select"
              onChange={batchOptionChange}
            >
              {batchSettingList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </div>
        </div>
        <div className="batch-components-box">
          {renderBatchOperation(batchOption)}
        </div>
      </div>
    </div>
  );
}
