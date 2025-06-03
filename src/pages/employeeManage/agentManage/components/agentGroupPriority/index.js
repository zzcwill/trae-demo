import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, message, Select, Col } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
const Option = Select.Option;
//优先级最高等级
const priortyMax = 10;
// 优先级可选择列表
let priortyList = [];
for (let i = 0; i <= priortyMax; i++) {
  priortyList.push({
    id: i,
    name: i.toString(10)
  });
}

export default function AgentGroupPriorty(props) {
  const { id, name, closeModal } = props;

  const [groupPriortyList, setGroupPriortyList] = useState([]); // 优先级列表
  const [isDisabled, setIsDisabled] = useState(() => {
    return id !== 0 && !id;
  }); //
  const [loading, setLoading] = useState(false); // loading

  /**
   * 获取组优先级详情
   */
  const getGroupPriortyList = async () => {
    const res = await get({
      url: Api.getAgentGroupPriority,
      params: {
        id
      }
    });
    if (res.success) {
      const data = res.data;
      setGroupPriortyList(data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 更新组优先级
   */
  const updateGroupPriorty = async () => {
    let isOk = true;
    const list = groupPriortyList.map(item => {
      if (
        (item.priority != 0 && !item.priority) ||
        item.priority > 10 ||
        item.priority < 0
      ) {
        isOk = false;
      }
      return {
        groupId: item.id,
        priority: item.priority
      };
    });
    if (!isOk) {
      message.error("组优先级必须在0至10之间！");
      return;
    }
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdateGroupPriorty,
        data: {
          id,
          groupPriorityList: list
        }
      });
      if (res.success) {
        message.success("设置优先级成功！");
        closeModal(true);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  /**
   * 优先级修改
   */
  const priortyChange = (value, index) => {
    let list = [].concat(groupPriortyList);
    list[index].priority = value;
    setGroupPriortyList(list);
  };

  useEffect(() => {
    if (!isDisabled) {
      getGroupPriortyList();
    }
  }, []);

  return (
    <div className="group-priorty-box">
      <div className="agent-message-box">
        <div className="message-item">
          <div className="label">坐席&nbsp;:&nbsp;</div>
          <div className="context">{name}</div>
        </div>
        <div className="message-item">
          <div className="label">组类型&nbsp;:&nbsp;</div>
          <div className="context">电话</div>
        </div>
      </div>
      <div className="line-box"></div>
      <div className="priorty-box">
        <div className="title">优先级&nbsp;:&nbsp;</div>
        <div className="list-box">
          {groupPriortyList.length > 0 &&
            groupPriortyList.map((item, index) => {
              return (
                <div className="group-item" key={item.id}>
                  <div className="group-name" title={item.name}>
                    {item.name}
                  </div>
                  <div className="group-value">
                    <span className="value-name">
                      优先级&nbsp;:&nbsp;&nbsp;
                    </span>
                    <Select
                      value={item.priority}
                      className="value"
                      onChange={value => {
                        priortyChange(value, index);
                      }}
                    >
                      {priortyList.map(num => {
                        return (
                          <Option key={num.id} value={num.id}>
                            {num.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="button-box">
        <Button
          type="primary"
          className="button-item"
          loading={loading}
          disabled={isDisabled}
          onClick={() => {
            updateGroupPriorty();
          }}
        >
          确定
        </Button>
        <div className="line-box"></div>
        <Button
          className="button-item"
          disabled={loading}
          onClick={() => {
            closeModal();
          }}
        >
          取消
        </Button>
      </div>
    </div>
  );
}
