import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  siteList,
  valueChangeTypeMap,
  linkTypeList,
  linkTypeMap,
} from "../../config";
import { Select, Input, Icon } from "dpl-react";
import classnames from "classnames";
const Option = Select.Option;

function LinkConfig(props, ref) {
  const { value, className, onChange, disabled, landingPageList = [] } = props;

  const onValueChange = (type, data) => {
    onChange && onChange(type, data);
  };
  return (
    <div className="link-config-box">
      <div className="link-config-item">
        <Select
          placeholder="请选择跳转类型"
          style={{ width: 180 }}
          disabled={disabled}
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
          value={value[valueChangeTypeMap.linkType.code]}
          onChange={(e) => {
            onValueChange(valueChangeTypeMap.linkType.code, e);
          }}
        >
          {linkTypeList.length > 0 &&
            linkTypeList.map((item) => {
              return (
                <Option key={`link-type-${item.id}`} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
        </Select>
      </div>
      {value[valueChangeTypeMap.linkType.code] ==
        linkTypeMap.landingPageLink.id && (
        <div className="link-config-item">
          <div className="config-item-label">
            <span>落地页名称:</span>
          </div>
          <div className="config-item-value">
            <Select
              placeholder="请选择落地页"
              style={{ width: 250 }}
              disabled={disabled}
              showSearch
              optionFilterProp="children"
              getPopupContainer={(triggerNode) => triggerNode.parentNode}
              value={value[valueChangeTypeMap.linkBusinessId.code]}
              onChange={(e) => {
                onValueChange(valueChangeTypeMap.linkBusinessId.code, e);
              }}
            >
              {landingPageList.length > 0 &&
                landingPageList.map((item) => {
                  return (
                    <Option key={`landing-page-${item.id}`} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          </div>
        </div>
      )}
      {value[valueChangeTypeMap.linkType.code] == linkTypeMap.otherLink.id && (
        <div className="link-config-item">
          <div className="config-item-label">
            <span>链接地址:</span>
          </div>
          <div className="config-item-value">
            <Input
              placeholder="请输入链接地址"
              style={{ width: 200 }}
              value={value[valueChangeTypeMap.linkUrl.code]}
              maxLength="2000"
              disabled={disabled}
              onChange={(e) => {
                onValueChange(valueChangeTypeMap.linkUrl.code, e.target.value);
              }}
            ></Input>
          </div>
        </div>
      )}
    </div>
  );
}

export default React.forwardRef(LinkConfig);
