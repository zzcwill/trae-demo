import React, { useEffect, useState } from "react";
import { Col, Select, TreeSelect } from "dpl-react";
import "./index.scss";
import { callcenterCode } from "@/const/config";
export default function GroupCompanyAndOrg(props) {
  const { other, onChange, value, style } = props;
  const {
    companyList,
    orgList,
    companyLabelName = "受理机构",
    orgLabelName = "受理部门",
    companyLabelWidth = "90px",
    orgLabelWidth = "110px",
    multiple = true,
  } = other;
  const [isDisabled, setIsDisabled] = useState(() => {
    return value.companyId === callcenterCode ? false : true;
  }); // 是否可以受理部门选择

  /**
   * 受理机构改变
   */
  const companyChange = (id) => {
    if (id) {
      if (id === callcenterCode) {
        setIsDisabled(false);
        onChange(
          Object.assign({}, value, {
            companyId: id,
          })
        );
      } else {
        setIsDisabled(true);
        onChange(
          Object.assign({}, value, {
            companyId: id,
            departIdList: undefined,
          })
        );
      }
    } else {
      onChange(
        Object.assign({}, value, {
          companyId: id,
          departIdList: undefined,
        })
      );
      setIsDisabled(true);
    }
  };

  /**
   * 受理部门改变
   * @param {String} id
   */
  const orgChange = (id) => {
    onChange(
      Object.assign({}, value, {
        departIdList: id,
      })
    );
  };

  useEffect(() => {
    value.companyId || setIsDisabled(true);
  }, [value]);

  return (
    <div className="company-org-box" style={style}>
      <Col span={12} className="company-org-item">
        <div className="label" style={{ width: companyLabelWidth }}>
          {companyLabelName}&nbsp;:&nbsp;
        </div>
        <div className="content-box">
          <Select
            onChange={companyChange}
            allowClear
            value={value.companyId}
            placeholder="请选择受理机构"
            // showSearch
            // optionFilterProp="children"
            // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {companyList &&
              companyList.length > 0 &&
              companyList.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
          </Select>
        </div>
      </Col>
      <Col span={12} className="company-org-item">
        <div className="label" style={{ width: orgLabelWidth }}>
          {orgLabelName}&nbsp;:&nbsp;
        </div>
        <div className="content-box">
          <Select
            allowClear
            onChange={orgChange}
            value={value.departIdList}
            placeholder="请选择受理部门"
            disabled={isDisabled}
            multiple={multiple}
            maxTagCount="1"
            maxTagTextLength={6}
            showSearch={true}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode;
            }}
          >
            {orgList &&
              orgList.length > 0 &&
              orgList.map((item) => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
          </Select>
        </div>
      </Col>
    </div>
  );
}
