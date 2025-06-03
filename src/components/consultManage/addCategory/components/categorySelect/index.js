import React, { useState, useEffect } from "react";
import "./index.scss";
import classnames from "classnames";
import { Icon, TreeSelect } from "dpl-react";

/**
 * 格式化树节点，利用treeNode自行渲染
 * @param {props} tree
 * @param {props} formatObj
 */
function formatTree(tree) {
  return tree.map((item) => {
    return (
      <TreeSelect.TreeNode
        key={item.id}
        value={item.id}
        title={item.name}
        disabled={item.showFlag !== "Y"}
      >
        {formatTree(item.children || [])}
      </TreeSelect.TreeNode>
    );
  });
}

function CategorySelect(props, ref) {
  const {
    value,
    selectList,
    index,
    onChange,
    disabled,
    onDelete,
    placeholder,
  } = props;
  const deleteClassNames = () => {
    return classnames({
      icon: true,
      disabled: disabled,
    });
  };

  return (
    <div className="category-select-box" ref={ref}>
      <div className="select">
        <TreeSelect
          style={{ width: "100%" }}
          allowClear={false}
          value={value}
          onChange={(data) => {
            onChange(data, index);
          }}
          disabled={disabled}
          placeholder={placeholder}
          showSearch={true}
          treeNodeFilterProp='title'
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          {formatTree(selectList)}
        </TreeSelect>
      </div>
      <div className="right-up-box">
        <Icon
          type="circle-error-o"
          className={deleteClassNames()}
          onClick={() => {
            onDelete(value, index);
          }}
        />
      </div>
    </div>
  );
}
export default React.forwardRef(CategorySelect);
