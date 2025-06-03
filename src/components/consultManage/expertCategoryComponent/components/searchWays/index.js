import React, { useState, useEffect } from "react";
import "./index.scss";
import { Select, Input, message } from "dpl-react";
import { searchSiteList, valueChangeTypeMap } from "../../config";
import AddCategory from "../../../addCategory";
const Option = Select.Option;
function SearchWays(props) {
  const {
    value, // 数据
    onChange, // 数据改变
    classifyTypeEnum = [], // 分类类型枚举
    classifyList = [], // 分类列表
    loading, // loading 状态
  } = props;

  const [currentClassifyList, setCurrentClassifyList] = useState([]);

  /**
   * 数据改变
   */
  const onValueChange = (type, data) => {
    let sendData = Object.assign({}, value, {
      [type]: data,
    });
    if (type === valueChangeTypeMap.type.code) {
      for (let i = 0, len = classifyList.length; i < len; i++) {
        const item = classifyList[i];
        if (item.type == data) {
          setCurrentClassifyList(item.list);
          break;
        }
      }
      sendData.idList = [];
    }
    onChange && onChange(sendData);
  };

  // 是否可以增加分类
  const isCanAdd = () => {
    if (value[valueChangeTypeMap.type.code]) {
      return true;
    }
    message.warning("请选择了筛选栏类型后再选择展示内容");
    return false;
  };

  useEffect(() => {
    if (value.type) {
      for (let i = 0, len = classifyList.length; i < len; i++) {
        const item = classifyList[i];
        if (item.type == value.type) {
          setCurrentClassifyList(item.list);
          break;
        }
      }
    }
  }, [value]);
  return (
    <div className="search-ways-box">
      <div className="search-ways-item">
        <div className="item-label">
          <span>筛选栏位置:</span>
        </div>
        <div className="item-value">
          <Select
            placeholder="请选择筛选栏位置"
            style={{ width: 200 }}
            value={value[valueChangeTypeMap.location.code]}
            disabled={loading}
            onChange={(value) => {
              onValueChange(valueChangeTypeMap.location.code, value);
            }}
          >
            {searchSiteList.length > 0 &&
              searchSiteList.map((item) => {
                return (
                  <Option key={`site-option-${item.id}`} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </div>
      </div>
      <div className="search-ways-item">
        <div className="item-label">
          <span>筛选栏名称:</span>
        </div>
        <div className="item-value">
          <Input
            placeholder="请输入筛选栏名称"
            style={{ width: 200 }}
            value={value[valueChangeTypeMap.name.code]}
            maxLength={10}
            disabled={loading}
            onChange={(e) => {
              onValueChange(valueChangeTypeMap.name.code, e.target.value);
            }}
          ></Input>
        </div>
      </div>

      <div className="search-ways-item">
        <div className="item-label">
          <span>筛选栏类型:</span>
        </div>
        <div className="item-value">
          <Select
            placeholder="请选择筛选栏类型"
            style={{ width: 200 }}
            value={value[valueChangeTypeMap.type.code]}
            disabled={loading}
            onChange={(value) => {
              onValueChange(valueChangeTypeMap.type.code, value);
            }}
          >
            {classifyTypeEnum.length > 0 &&
              classifyTypeEnum.map((item) => {
                return (
                  <Option key={`site-option-${item.id}`} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </div>
      </div>

      <div className="search-ways-item">
        <div className="item-label ways-category-item">
          <span>筛选栏展示内容:</span>
        </div>
        <div className="item-value">
          <AddCategory
            selectList={currentClassifyList}
            list={value[valueChangeTypeMap.idList.code]}
            disabled={loading}
            placeholder="请选择专家业务分类"
            isCanAdd={isCanAdd}
            onChange={(e) => {
              onValueChange(valueChangeTypeMap.idList.code, e);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchWays;
