/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-06-12 18:49:07
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-10-18 16:59:02
 * @FilePath: /askone-manage-pc/src/pages/employeeManage/workTimeManage/components/workGroup/index.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useEffect } from "react";
import "./index.scss";
import { Dropdown, Menu, Select } from "dpl-react";
import { acceptanceChannelCode } from "@/const/config";
import { valueChangeTypeMap } from "../../config";
import ModalSelect from "@/components/common/modalSelect";
const Option = Select.Option;
const menuListMap = {
  [acceptanceChannelCode.call]: {
    id: acceptanceChannelCode.call,
    name: "电话",
  },
  [acceptanceChannelCode.online]: {
    id: acceptanceChannelCode.online,
    name: "在线",
  },
};
const menuList = Object.keys(menuListMap).map((item) => {
  return menuListMap[item];
});

function WorkGroup(props) {
  const {
    value,
    onChange,
    companyList = [],
    orgList = [],
    outerFetch = true, // 是否外部请求下拉列表，因为以前的场景都是外部传入的，这个组件里不做请求仅透传参数给ModalSelect
  } = props;
  const valueChange = (type, data) => {
    let result = Object.assign({}, value, {
      [type]: data,
    });
    if (type === valueChangeTypeMap.type) {
      result = Object.assign({}, value, {
        [type]: data,
        [valueChangeTypeMap.groupIdList]: [],
      });
    }
    onChange && onChange(result);
  };
  // 组类型修改
  const groupTypeChange = (data) => {
    valueChange(valueChangeTypeMap.type, data);
  };

  const modalSelectChange = (data) => {
    valueChange(valueChangeTypeMap.groupIdList, data);
  };

  return (
    <div className="work-group-box">
      <Select
        style={{ width: 120 }}
        value={value?.type}
        onChange={groupTypeChange}
      >
        {menuList.map((item) => {
          return (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          );
        })}
      </Select>
      <ModalSelect
        value={value?.groupIdList}
        groupType={value?.type}
        showCompanyDepartFilter
        companyList={companyList}
        orgList={orgList}
        outerFetchCompanyAndOrg={outerFetch}
        onChange={modalSelectChange}
        isNeedStringToNumber={true}
      />
    </div>
  );
}

export default WorkGroup;
