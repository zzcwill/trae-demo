import React, { useEffect, useState } from "react";
import "./index.scss";
import Api from "@/request/api-olhelpmanage";
import { get } from "@/request/request";
import { Select, message, TreeSelect, Input } from "dpl-react";
import { paramCodeType } from "../../config";
import { olhelpEnumOptionType, callcenterEnumOptionType } from "@/const/config";
const groupNamesList = [
  olhelpEnumOptionType.RouterRuleParamCode,
  olhelpEnumOptionType.RouterRuleOperatorType,
  olhelpEnumOptionType.Channel,
  callcenterEnumOptionType.region_company_code ,
];
const Option = Select.Option;

/**
 * 格式化树节点，利用treeNode自行渲染
 * @param {props} tree
 * @param {props} formatObj
 */
function formatTree(tree, formatObj) {
  return tree.map((item) => {
    return (
      <TreeSelect.TreeNode
        key={item[formatObj["key"]]}
        value={item[formatObj["value"]]}
        title={item[formatObj["title"]]}
      >
        {formatTree(item[formatObj["children"]] || [], formatObj)}
      </TreeSelect.TreeNode>
    );
  });
}
const defaultFormatObj = {
  key: "code",
  value: "code",
  title: "shortName",
  children: "children",
};

function treeMap(tree, obj) {
  if (Array.isArray(tree)) {
    tree.map((item) => {
      if (!obj[item.code]) {
        obj[item.code] = {
          code: item.code,
          fullName: item.fullName,
          shortName: item.shortName,
        };
        if (item.children) {
          treeMap(item.children, obj);
        }
      }
    });
  }
}

export default function RuleConfigFilter(props) {
  const { value = {}, onChange, brand = [], outerFetch = false, key } = props;
  const [paramCode, setParamCode] = useState([]);
  const [channel, setChannel] = useState([]); //来源渠道
  const [location, setLocation] = useState([]); //地区
  const [orgTree, setOrgTree] = useState([]); // 组织机构树
  const [orgTreeMap, setOrgTreeMap] = useState({}); // 组织机构map
  const [business, setBusiness] = useState([]); // 经营中心
  const getOptions = async () => {
    let optionsData = props.optionsData;
    if (!optionsData && !outerFetch) {
      const data = await get({
        url: Api.getEnumOptions,
        params: {
          groupNames: groupNamesList.join(","),
        },
      });
      optionsData = data.data;
    }
    let map = {
      [olhelpEnumOptionType.RouterRuleParamCode]: setParamCode,
      [olhelpEnumOptionType.Channel]: setChannel,
      [callcenterEnumOptionType.region_company_code]: setBusiness,
    };
    if (Array.isArray(optionsData)) {
      optionsData.forEach((item) => {
        map[item.groupName] &&
          map[item.groupName](
            item.options.map((item) => {
              return { label: item.name, value: item.id };
            })
          );
      });
    }
  };
  const getLocationList = async () => {
    let locationListData = props.locationListData;
    if (!locationListData && !outerFetch) {
      const data = await get({ url: Api.commonGetLocationList });
      locationListData = data.data;
    }
    setLocation(
      locationListData.map((item) => {
        return { label: item.name, value: item.id };
      })
    );
  };

  const getOrgTree = async () => {
    let orgTreeData = props.orgTreeData;
    try {
      if (!orgTreeData && !outerFetch) {
        const res = await get({ url: Api.getOrgTree });
        orgTreeData = res.data;
      }
      let resultObj = {};
      treeMap(orgTreeData, resultObj);
      setOrgTreeMap(resultObj);
      setOrgTree(orgTreeData);
    } catch (e) {
      console.error(e);
    }
  };
  const changeValue = (type, e) => {
    value[type] = e;
    onChange && onChange({...value});
  };
  useEffect(() => {
    getOptions();
    getLocationList();
    getOrgTree();
  }, [props.optionData, props.locationListData, props.orgTreeData]);
  const showLabelInput = (paramCode) => {
    return (
      paramCode !== "location" &&
      paramCode !== "agencyLocation" &&
      paramCode !== "channel" &&
      paramCode !== "brand" &&
      paramCode !== "agencyBusinessCenter" &&
      paramCode !== "companyBusinessCenter"
    );
  };

  const showTreeSelect = () => {
    return value.paramCode === paramCodeType.store;
  };

  const treeValue = (valueList) => {
    let result = [];
    if (Array.isArray(valueList)) {
      valueList.forEach((item) => {
        if (orgTreeMap[item]) {
          result.push({
            label: orgTreeMap[item].shortName,
            value: orgTreeMap[item].code,
          });
        }
      });
    }
    return result;
  };

  const optionsMap = {
    location: location,
    agencyLocation: location,
    channel: channel,
    brand: brand,
    [paramCodeType.store]: orgTree,
    agencyBusinessCenter: business,
    companyBusinessCenter: business,
  };

  return (
    <div className="rule-config-filter" key={key}>
      <div className="list">
            <div className="item rule-config-item">
              <div>
                <Select
                  style={{ width: 200, marginRight: 10 }}
                  placeholder="请选择"
                  allowClear
                  onChange={(e) => {
                    changeValue("paramCode", e);
                    changeValue("targetValue", undefined);
                  }}
                  className={`rule-config-item-select ${
                    value.paramCode ? "success" : ""
                  }`}
                  value={value.paramCode}
                  key={key}
                >
                  {paramCode.map((code) => {
                    return (
                      <Option value={code.value} key={code.value}>
                        {code.label}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              {showLabelInput(value.paramCode) && !showTreeSelect() && (
                <Input
                  value={value.targetValue}
                  className='rule-config-item-select sub-select'
                  onChange={(e) => {
                    changeValue("targetValue", e.target.value);
                  }}
                  key={key}
                />
              )}
              {!showLabelInput(value.paramCode) && (
                <Select
                  style={{ flex: 1 }}
                  key={key}
                  mode={"multiple"}
                  placeholder="请选择"
                  allowClear
                  className={`rule-config-item-select sub-select ${
                    value.targetValue ? "success" : ""
                  }`}
                  maxTagCount={1}
                  showSearch
                  filterOption={(val, option) => {
                    return option?.props?.children?.indexOf(val) > -1;
                  }}
                  value={
                    value.targetValue
                      ? value.targetValue.split(",")
                      : []
                  }
                  onChange={(e) => {
                    value.targetValue = Array.isArray(e)
                      ? e.join(",")
                      : e;
                    onChange && onChange({...value});
                  }}
                >
                  {Array.isArray(optionsMap[value.paramCode]) &&
                    optionsMap[value.paramCode].map((item) => {
                      return (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                </Select>
              )}

              {showTreeSelect() && (
                <TreeSelect
                  key={key}
                  showSearch
                  maxTagCount={1}
                  style={{ flex: 1 }}
                  value={treeValue(
                    value.targetValue &&
                      value.targetValue.split(",")
                  )}
                  allowClear
                  className="rule-config-item-select sub-select"
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  treeNodeFilterProp="title"
                  treeCheckStrictly={true}
                  multiple
                  treeCheckable
                  onChange={(e) => {
                    let result = [];
                    if (Array.isArray(e)) {
                      e.forEach((val) => {
                        result.push(val.value);
                      });
                    }
                    value.targetValue = result.join(",");

                    onChange && onChange({...value});
                  }}
                >
                  {Array.isArray(optionsMap[value.paramCode]) &&
                    formatTree(
                      optionsMap[value.paramCode],
                      defaultFormatObj
                    )}
                </TreeSelect>
              )}
            </div>
      </div>
    </div>
  );
}
