import React, { useState, useEffect } from "react";
import { Select, message, Col } from "dpl-react";
import "./index.scss";

const Option = Select.Option;

function CallGroup(props) {
  const { onChange, value, other } = props;
  const {
    cllGroupList = [],
    groupPriorityList = [],
    groupLabelName = "电话业务组",
    groupPriorityLabelName = "电话组优先级",
    groupLabelWidth = "100px",
    groupPriorityLabelWidth = "100px",
    isShowTitle = false,
  } = other;
  const [isDisabled, setIsDisabled] = useState(() => {
    return value.incallGroupId === "all" ? true : false;
  }); // 是否可以受理部门选择

  // 电话组修改
  const onCallGroupChange = (data) => {
    let sendData = {};
    if (data == "all") {
      sendData = {
        incallGroupId: data,
        groupPriority: "all",
      };
    } else {
      sendData = Object.assign({}, value, {
        incallGroupId: data,
      });
    }
    onChange(sendData);
  };

  const onGroupPriorityChange = (data) => {
    let sendData = Object.assign({}, value, {
      groupPriority: data,
    });
    onChange(sendData);
  };

  useEffect(() => {
    if (value) {
      if (value.incallGroupId == "all") {
        setIsDisabled(true);
      } else {
        setIsDisabled(false);
      }
    }
  }, [value]);
  return (
    <div className="call-group-box">
      <Col span={12} className="call-group-item">
        <div className="label" style={{ width: groupLabelWidth }}>
          {groupLabelName}&nbsp;:&nbsp;
        </div>
        <div className="content-box">
          <Select
            value={value.incallGroupId}
            placeholder="请选择电话业务组"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            onChange={onCallGroupChange}
          >
            {Array.isArray(cllGroupList) &&
              cllGroupList.map((item) => {
                return (
                  <Option
                    key={item.id}
                    value={item.id}
                    title={isShowTitle ? item.name : null}
                  >
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </div>
      </Col>
      <Col span={12} className="call-group-item">
        <div className="label" style={{ width: groupPriorityLabelWidth }}>
          {groupPriorityLabelName}&nbsp;:&nbsp;
        </div>
        <div className="content-box">
          <Select
            value={value.groupPriority}
            placeholder="请选择电话组优先级"
            disabled={isDisabled}
            onChange={onGroupPriorityChange}
          >
            {Array.isArray(groupPriorityList) &&
              groupPriorityList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </div>
      </Col>
    </div>
  );
}

export default CallGroup;
