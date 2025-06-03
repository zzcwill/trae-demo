import React, { useEffect, useState } from "react";
import { Col, Select, TreeSelect } from "dpl-react";
import "./index.scss";
import { callcenterCode } from "@/const/config";
const defaultFormatObj = {
  key: "code",
  value: "code",
  title: "name",
  children: "children",
};
export default function CompanyAndOrg(props) {
  const { other, onChange, value } = props;
  const {
    companyList = [],
    orgList = [],
    companyLabelName = "受理机构",
    orgLabelName = "受理部门",
    companyLabelWidth = "90px",
    orgLabelWidth = "110px",
    maxTagCount = "1",
    isMultiple = true,
  } = other;
  const [isDisabled, setIsDisabled] = useState(() => {
    return value.companyId === callcenterCode ? false : true;
  }); // 是否可以受理部门选择
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
   * @param {String} value
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
    <div className="company-org-box">
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
          <TreeSelect
            allowClear
            onChange={orgChange}
            value={value.departIdList}
            placeholder="请选择受理部门"
            disabled={isDisabled}
            multiple={isMultiple}
            showCheckedStrategy="SHOW_ALL"
            maxTagCount={maxTagCount}
            treeNodeFilterProp="title"
            maxTagTextLength={6}
            treeCheckable={isMultiple}
            getPopupContainer={(triggerNode) => {
              return triggerNode.parentNode;
            }}
          >
            {formatTree(orgList, defaultFormatObj)}
          </TreeSelect>
        </div>
      </Col>
    </div>
  );
}
