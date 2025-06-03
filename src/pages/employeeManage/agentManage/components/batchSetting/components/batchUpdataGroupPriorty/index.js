import React, { useState, useEffect } from "react";
import "./index.scss";
import { message, Select, Input, Button, Checkbox } from "dpl-react";
import { post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
const Option = Select.Option;
//优先级最高等级
const priortyMax = 10;
// 优先级可选择列表
let priortyTypeList = [];
for (let i = 0; i <= priortyMax; i++) {
  priortyTypeList.push({
    id: i,
    name: i.toString(10),
  });
}

let dict = {} //记录当前选中的优先级
export default function BatchUpdataGroupPriorty(props) {
  const { groupPriortyList, idList, closeModal } = props;
  const [searchText, setSearchText] = useState(""); // 对组进行筛选
  const [priortyList, setPriortyList] = useState(() => {
    return groupPriortyList.map((item) => {
      return {
        ...item,
        priority: 0,
      };
    });
  }); // 选中组的列表
  const [loading, setLoading] = useState(false); // loading
  const [selectRowKeys, setSelectRowKeys] = useState([]); // 选择惬意

  /**
  /**
   * 保存
   */
  const save = () => {
    if (!selectRowKeys.length) {
      message.warning("请选择对应的电话组");
      return;
    }
    let list = [];
    priortyList.forEach((item) => {
      if (selectRowKeys.indexOf(item.id) > -1) {
        list.push({
          groupId: item.id,
          priority: item.priority,
        });
      }
    });
    const sendData = {
      idList,
      groupPriorityList: list,
    };
    updataMainGrroup(sendData);
  };

  /**
   * 批量修改主要业务组
   */
  const updataMainGrroup = async (sendData) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postBatchUpdataGroupPriorty,
        data: sendData,
      });
      if (res.success) {
        message.success("批量修改组优先级成功！");
        closeModal(true);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("系统出错，请联系管理员");
    }
    setLoading(false);
  };

  /**
   * 优先级修改
   */
  const priortyChange = (value, index, id) => {
    let list = [].concat(priortyList);
    const listIndex = list.findIndex(item => item.id === id)
    list[listIndex].priority = value;
    dict[id] = value //记录一下已经修改的优先级
    setPriortyList(list);
  };

  /**
   * 勾选企业
   * @param {*} e
   */
  const selectGroup = (e) => {
    const target = e.target;
    let list = [].concat(selectRowKeys);
    if (target.checked && selectRowKeys.indexOf(target.value) < 0) {
      list.push(target.value);
    } else {
      list.splice(selectRowKeys.indexOf(target.value), 1);
    }
    console.log(list);
    setSelectRowKeys(list);
  };

  const selectAllGroup = () => {
    if (selectRowKeys.length  === priortyList.length) {
      setSelectRowKeys([]);
    } else {
      setSelectRowKeys(priortyList?.map(priorty => priorty.id));
    }
  }
  // 筛选按钮
  const onSearchClick = () => {
    let newList = [];
    if (searchText) {
      // 筛选的时候，已经选中的组即使不在名称筛选结果里面，也要保留
      newList = groupPriortyList.filter(item => item.name.indexOf(searchText) > -1 || selectRowKeys.includes(item.id))
    } else {
      newList = groupPriortyList
    }

    setPriortyList(
      newList.map((item) => {
        return {
          ...item,
          priority: dict[item.id] || 0,
        };
      })
    );
  }

  useEffect(() => {
    dict = {} 
    setPriortyList(
      groupPriortyList.map((item) => {
        return {
          ...item,
          priority: 0,
        };
      })
    );
  }, [groupPriortyList]);

  return (
    <div className="group-priorty-batch">
      <div className="edit-item">
        <div className="item-label">
          <span className="message-required">*</span>
          <span>组类型&nbsp;:&nbsp;</span>
        </div>
        <div className="item-context">
          <span>电话</span>
        </div>
      </div>
      <div className="line-box"></div>
      <div className="search-view">
        <span className="left-title">组名称：</span>
        <Input className="search-text" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        <Button type="primary" className="search-btn" onClick={onSearchClick}>过滤</Button>
      </div>
      <div className="priorty-box">
        <div className="title">优先级&nbsp;:&nbsp;</div>
        {priortyList.length > 0 && <div className="title all-checked" onClick={selectAllGroup}>
          <Checkbox
            value={-1}
            onChange={selectAllGroup}
            checked={selectRowKeys.length  && selectRowKeys.length  === priortyList.length}
          ></Checkbox>&nbsp;&nbsp;全选
        </div>}
        <div className="list-box">
          {priortyList.length > 0 &&
            priortyList.map((item, index) => {
              return (
                <div className="group-item" key={item.id}>
                  <div className="group-select">
                    <Checkbox
                      value={item.id}
                      onChange={selectGroup}
                      checked={selectRowKeys.indexOf(item.id) > -1}
                    ></Checkbox>
                  </div>
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
                      onChange={(value) => {
                        priortyChange(value, index, item.id);
                      }}
                    >
                      {priortyTypeList.map((num) => {
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
          onClick={() => {
            save();
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
