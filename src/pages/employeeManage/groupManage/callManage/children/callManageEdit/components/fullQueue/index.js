import React, { useState, useEffect } from "react";
import { Radio, Select } from "dpl-react";
import { spectialCallManageEditConfig } from "@/const/config";
export default function FullQueue(props) {
  const { waitFullStateList = [], workList = [], value, onChange } = props;
  const [isDisabled, setIsDisabled] = useState({
    assistGroup:
      spectialCallManageEditConfig.fullQueueStrategy.indexOf(
        value.fullQueueStrategy
      ) < 0
  }); // 备用组是否可以选
  /**
   * 格式化排队满时处理策略列表
   * 目的：确保新加策略后，转换至备用组一直在最后
   */
  const formatList = list => {
    const len = list.length;
    let newList = [];
    let assistGroupObj = undefined;
    for (let i = 0; i < len; i++) {
      if (
        spectialCallManageEditConfig.fullQueueStrategy.indexOf(list[i].id) < 0
      ) {
        newList.push(list[i]);
      } else {
        assistGroupObj = Object.assign({}, list[i]);
      }
    }
    assistGroupObj && newList.push(assistGroupObj);
    return newList;
  };
  const waitFullState = formatList(waitFullStateList); // 处理过的列表
  const waitFullStateChange = e => {
    const id = e.target.value;
    if (spectialCallManageEditConfig.fullQueueStrategy.indexOf(id) > -1) {
      setIsDisabled(
        Object.assign({}, isDisabled, {
          assistGroup: false
        })
      );
      onChange(
        Object.assign({}, value, {
          fullQueueStrategy: id
        })
      );
    } else {
      setIsDisabled(
        Object.assign({}, isDisabled, {
          assistGroup: true
        })
      );
      onChange(
        Object.assign({}, value, {
          fullQueueStrategy: id,
          assistGroupIdList: []
        })
      );
    }
  };

  /**
   * 备用组改变
   */
  const assistGroupChange = list => {
    onChange(
      Object.assign({}, value, {
        assistGroupIdList: list
      })
    );
  };
  useEffect(() => {
    setIsDisabled({
      assistGroup:
        spectialCallManageEditConfig.fullQueueStrategy.indexOf(
          value.fullQueueStrategy
        ) < 0
    });
  }, [value]);

  return (
    <div className="help-queue-box">
      <Radio.Group
        value={value.fullQueueStrategy}
        onChange={waitFullStateChange}
      >
        {waitFullState.length > 0 &&
          waitFullState.map(item => {
            if (
              spectialCallManageEditConfig.fullQueueStrategy.indexOf(item.id) <
              0
            ) {
              return (
                <Radio key={item.id} value={item.id} style={{ width: 120 }}>
                  {item.name}
                </Radio>
              );
            } else {
              return (
                <span key={item.id}>
                  <Radio  value={item.id} style={{ width: 100 }}>
                    {item.name}
                  </Radio>
                  <Select
                    allowClear
                    placeholder="请选择备用组"
                    disabled={isDisabled.assistGroup}
                    style={{ width: 390 }}
                    onChange={assistGroupChange}
                    value={value.assistGroupIdList}
                    mode="multiple"
                    optionFilterProp="children"
                    maxTagTextLength={10}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {workList.length > 0 &&
                      workList.map(workItem => {
                        return (
                          <Select.Option key={workItem.id} value={workItem.id} title={workItem.name}>
                            {workItem.name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </span>
              );
            }
          })}
      </Radio.Group>
    </div>
  );
}
