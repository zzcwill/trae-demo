import React, { useState, useEffect } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { message, Modal, Col, Select } from "dpl-react";
import FunctionList from "../functionList";
export default function SystemAndFunction(props) {
  const { value, onChange, other } = props;
  const { systemList, className, labelWidth, disabled = false } = other;
  const [functionNameList, setFunctionNameList] = useState([]); // 名字列表
  const [functionList, setFunctionList] = useState([]); // 功能
  const [functionMap, setFunctionMap] = useState({}); // 功能的map
  // 系统改变
  const systemChange = async (value) => {
    getFunctionList(value);
    setFunctionNameList([]);
    const sendData = Object.assign({}, value, {
      systemId: value,
    });
    onChange(sendData);
  };

  // 功能列表改变
  const changeFunction = (data) => {
    const sendData = Object.assign({}, value, {
      functionIdList: data,
    });
    onChange(sendData);
  };

  const functionNameChange = (data) => {
    setFunctionNameList(data);
  };

  // 获取功能列表
  const getFunctionList = async (systemId) => {
    if (systemId) {
      const res = await get({
        url: Api.getFunctionList,
        params: {
          systemId,
        },
      });
      if (res.success) {
        const data = res.data;
        let functionObj = {};
        data.forEach((item) => {
          functionObj[item.id] = item.name;
        });
        setFunctionMap(functionObj);
        setFunctionList(data);
      } else {
        message.error(res.message);
      }
    }
  };

  // 点击选择按钮前的判断条件
  const beforeClick = () => {
    if (!value.systemId) {
      Modal.warning({
        content: "未选择系统，请先选择系统。",
        okText: "确定",
      });
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!value.functionIdList || value.functionIdList.length === 0) {
      setFunctionNameList([]);
    }
  }, [value]);

  return (
    <div className="system-and-function-box">
      <Col span={12}>
        <div className="item-box">
          <div className="item-label" style={{ width: `${labelWidth}px` }}>
            <span>系统&nbsp;:&nbsp;</span>
          </div>
          <div className="item-content">
            <Select
              placeholder="请选择"
              allowClear
              value={value.systemId}
              onChange={systemChange}
              disabled={disabled}
            >
              {systemList.length > 0 &&
                systemList.map((item) => {
                  {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  }
                })}
            </Select>
          </div>
        </div>
      </Col>
      <Col span={12}>
        <div className="item-box">
          <div className="item-label" style={{ width: `${labelWidth}px` }}>
            <span>功能&nbsp;:&nbsp;</span>
          </div>
          <div className="item-content">
            <FunctionList
              value={value.functionIdList}
              onChange={changeFunction}
              inputList={functionNameList}
              functionList={functionList}
              beforeClick={beforeClick}
              functionMap={functionMap}
              functionNameChange={functionNameChange}
            />
          </div>
        </div>
      </Col>
    </div>
  );
}
