import React, { useEffect, useReducer, useRef, useState } from "react";
import "./index.scss";
import classnames from "classnames";
import { Select } from "dpl-react";
import { landingTypeList } from "../../config";
function LandingSelect(props) {
  const {
    value,
    onChange,
    className,
    style,
    disabled,
    exclusiveList = [],
    normalList = [],
    landingPageList = [],
  } = props;
  const [landingType, setLandingType] = useState(""); // 落地页类型

  const [selectList, setSelectList] = useState([]); // 选择列表
  const isFirstRef = useRef(true);

  const bodyClassName = classnames({
    "landing-select-box": true,
    [className]: className,
  });

  const settingSelectList = (val) => {
    let result = [];
    if (val === landingTypeList[0].value) {
      result = [].concat(normalList);
    } else {
      result = [].concat(exclusiveList);
    }
    setSelectList(result);
  };

  /**
   * 落地页类型修改
   */
  const landingTypeOnChange = (val) => {
    if (val !== landingType) {
      landingPageOnChange(undefined);
    }
    settingSelectList(val);
    setLandingType(val);
  };

  /**
   * 落地页改变
   */
  const landingPageOnChange = (val) => {
    onChange && onChange(val);
  };

  useEffect(() => {
    if (Array.isArray(landingPageList) && isFirstRef.current) {
      landingPageList.forEach((item) => {
        if (item.value === value) {
          isFirstRef.current = false;
          setLandingType(item.type);
          settingSelectList(item.type);
        }
      });
    }
  }, [landingPageList, value]);

  return (
    <div className={bodyClassName} style={style}>
      <Select
        placeholder="请选择落地页类型"
        value={landingType}
        disabled={disabled}
        onChange={landingTypeOnChange}
        className="landing-type-select"
        getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode;
        }}
      >
        {Array.isArray(landingTypeList) &&
          landingTypeList.map((item) => {
            return (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            );
          })}
      </Select>
      <Select
        placeholder="请选择落地页名称"
        disabled={disabled || !landingType}
        value={value}
        onChange={landingPageOnChange}
        className="landing-select"
        showSearch
        optionFilterProp="children"
        getPopupContainer={(triggerNode) => {
          return triggerNode.parentNode;
        }}
      >
        {Array.isArray(selectList) &&
          selectList.map((item) => {
            return (
              <Select.Option key={item.value} value={item.value}>
                {item.label}
              </Select.Option>
            );
          })}
      </Select>
    </div>
  );
}

export default LandingSelect;
