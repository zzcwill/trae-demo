import React, { useEffect, useState } from "react";
import "./index.scss";
import Api from "@/request/api-olhelpmanage";
import { get } from "@/request/request";
import { Select, message, TreeSelect } from "dpl-react";
import LabelInput from "./labelInput";
import { paramCodeType } from "../../config";
import { olhelpEnumOptionType, callcenterEnumOptionType } from "@/const/config";
const groupNamesList = [
  olhelpEnumOptionType.RouterRuleParamCode,
  olhelpEnumOptionType.RouterRuleOperatorType,
  olhelpEnumOptionType.Channel,
  callcenterEnumOptionType.region_company_code,
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

export default function RuleConfig(props) {
  const { value = [], onChange, outerFetch = false, canAddRule = true, canDeleteRule = true, key } = props;
  const [paramCode, setParamCode] = useState([]);
  const [operatorType, setOperatorType] = useState([]);
  const [channel, setChannel] = useState([]); //来源渠道
  const [location, setLocation] = useState([]); //地区
  const [brandList, setBrandList] = useState([]); //产品维度
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
      [olhelpEnumOptionType.RouterRuleOperatorType]: setOperatorType,
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
  const getWdList = async () => {
    let brandListData = props.brand;
    if (!brandListData && !outerFetch) {
      const data = await get({ url: Api.getWdList });
      if (data.success) {
        brandListData = data.data.brand
      }
    }
    setBrandList(brandListData.map((item) => {
      return { 
        label: item.name || item.label,
        value: item.id || item.value,
      };
    }));
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
  const changeValue = (index, type, e) => {
    value[index][type] = e;
    onChange && onChange([...value]);
  };
  useEffect(() => {
    getOptions();
    getLocationList();
    getOrgTree();
    getWdList();
  }, [props.optionData, props.locationListData, props.orgTreeData, props.brand]);
  const showLabelInput = (index) => {
    return (
      value[index].paramCode !== "location" &&
      value[index].paramCode !== "agencyLocation" &&
      value[index].paramCode !== "channel" &&
      value[index].paramCode !== "brand" &&
      value[index].paramCode !== "agencyBusinessCenter" &&
      value[index].paramCode !== "companyBusinessCenter" && 
      value[index].paramCode !== "businessCenter"
    );
  };

  const showTreeSelect = (index) => {
    return value[index].paramCode === paramCodeType.store;
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

  const isMultiple = (index) => {
    return value[index].operatorType == "4" || value[index].operatorType == "5";
  };
  const optionsMap = {
    location: location,
    agencyLocation: location,
    channel: channel,
    brand: brandList,
    [paramCodeType.store]: orgTree,
    agencyBusinessCenter: business,
    companyBusinessCenter: business,
    businessCenter: business,
  };

  return (
    <div className="rule-config" key={props.id} id={props.id}>
      {canAddRule && <span
        className="add"
        onClick={() => {
          onChange &&
            onChange(
              value.concat([
                {
                  paramCode: "",
                  operatorType: "",
                  targetValue: "",
                },
              ])
            );
        }}
      >
        添加条件
      </span>}
      <div className="list">
        {value.map((item, index) => {
          return (
            <div className="item rule-config-item" key={index}>
              <div>
                <Select
                  style={{ width: 200, marginRight: 10 }}
                  placeholder="请选择"
                  onChange={(e) => {
                    changeValue(index, "paramCode", e);
                    changeValue(index, "operatorType", undefined);
                    changeValue(index, "targetValue", undefined);
                  }}
                  className={`rule-config-item-select ${
                    item.paramCode ? "success" : ""
                  }`}
                  value={item.paramCode}
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
              <div>
                <Select
                  style={{ width: 200, marginRight: 10 }}
                  placeholder="请选择"
                  value={item.operatorType}
                  className={`rule-config-item-select ${
                    item.operatorType ? "success" : ""
                  }`}
                  onChange={(e) => {
                    changeValue(index, "operatorType", e);
                    changeValue(index, "targetValue", undefined);
                  }}
                  key={key}
                >
                  {operatorType.map((type) => {
                    return (
                      <Option value={type.value} key={type.value}>
                        {type.label}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              {showLabelInput(index) && !showTreeSelect(index) && (
                <LabelInput
                  value={item.targetValue}
                  className='rule-config-item-select'
                  onChange={(e) => {
                    changeValue(index, "targetValue", e);
                  }}
                  isMultiple={isMultiple(index)}
                  key={key}
                />
              )}
              {!showLabelInput(index) && (
                <Select
                  style={{ flex: 1 }}
                  key={key}
                  mode={isMultiple(index) ? "multiple" : ""}
                  placeholder="请选择"
                  className={`rule-config-item-select ${
                    value[index].targetValue ? "success" : ""
                  }`}
                  showSearch
                  filterOption={(val, option) => {
                    return option?.props?.children?.indexOf(val) > -1;
                  }}
                  value={
                    value[index].targetValue
                      ? value[index].targetValue.split(",")
                      : []
                  }
                  onChange={(e) => {
                    value[index].targetValue = Array.isArray(e)
                      ? e.join(",")
                      : e;
                    onChange && onChange([...value]);
                  }}
                >
                  {Array.isArray(optionsMap[value[index].paramCode]) &&
                    optionsMap[value[index].paramCode].map((item) => {
                      return (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                </Select>
              )}

              {showTreeSelect(index) && (
                <TreeSelect
                  key={key}
                  showSearch
                  style={{ flex: 1 }}
                  value={treeValue(
                    value[index].targetValue &&
                      value[index].targetValue.split(",")
                  )}
                  className="rule-config-item-select"
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
                    value[index].targetValue = result.join(",");

                    onChange && onChange([...value]);
                  }}
                >
                  {Array.isArray(optionsMap[value[index].paramCode]) &&
                    formatTree(
                      optionsMap[value[index].paramCode],
                      defaultFormatObj
                    )}
                </TreeSelect>
              )}

              {canDeleteRule && <div
                className="delete"
                onClick={() => {
                  if (value.length <= 1) {
                    message.error("至少需要一条配置");
                    return;
                  }
                  value.splice(index, 1);
                  onChange && onChange([...value]);
                }}
              >
                删除
              </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
