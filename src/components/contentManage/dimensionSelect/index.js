import React, { useState, useEffect, useImperativeHandle } from "react";
import { get } from "@/request/request";
import Api from "@/request/api";
import { Select, message } from "dpl-react";
import debounce from "lodash/debounce";
import sessionStorageHelp from "@/utils/sessionStorage";
import { dimensionMap } from "@/const/config";
import MultipleSelectRender from "../common/multipleSelectRender";
const Option = Select.Option;
const defaultOptionMap = {
  id: "id",
  name: "name",
  key: "id"
};
const optionsRender = (arr, map = defaultOptionMap) => {
  return arr.map(item => {
    return (
      <Option key={item[map.key]} value={item[map.id]}>
        {item[map.name]}
      </Option>
    );
  });
};

let regionLabel = []; // 地域标签
let professionLabel = []; //行业标签
let gradeLabel = []; // 分层标签
/**
 * 获取维度列表
 */
const getDimensionList = async () => {
  const map = {
    PROFESSION_LABEL: value => {
      professionLabel = [].concat(value);
    },
    REGION_LABEL: value => {
      regionLabel = [].concat(value);
    },
    GRADE_LABEL: value => {
      gradeLabel = [].concat(value);
    }
  };

  const res = await get({
    url: Api.getDimensionList,
    params: {
      type: "0,1,2" // 0：地域， 1：行业 ，2：分级
    }
  });
  if (res.success) {
    const data = res.data;
    data.forEach(item => {
      const fn = map[dimensionMap[item.type]];
      fn && fn(item.dimensionList);
    });
  } else {
    message.error(res.message);
  }
};
getDimensionList();

// 地域标签
function Region(props) {
  const { onChange, value, other } = props;
  return (
    <MultipleSelectRender
      item={other}
      children={optionsRender(regionLabel, {
        id: "code",
        key: "code",
        name: "name"
      })}
      useFilter={true}
      onChange={onChange}
      value={value}
    />
  );
}
// 行业标签
function Profession(props) {
  const { onChange, value, other } = props;
  return (
    <MultipleSelectRender
      item={other}
      children={optionsRender(professionLabel, {
        id: "code",
        key: "code",
        name: "name"
      })}
      useFilter={true}
      onChange={onChange}
      value={value}
    />
  );
}
// 分层标签
function Grade(props) {
  const { onChange, value, other } = props;
  return (
    <MultipleSelectRender
      item={other}
      children={optionsRender(gradeLabel, {
        id: "code",
        key: "code",
        name: "name"
      })}
      useFilter={true}
      onChange={onChange}
      value={value}
    />
  );
}

const DimensionSelect = {
  Region,
  Profession,
  Grade
};
export default DimensionSelect;
