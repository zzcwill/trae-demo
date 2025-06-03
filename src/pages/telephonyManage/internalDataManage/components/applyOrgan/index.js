import React from 'react';
import { TreeSelect } from 'dpl-react';
import './index.scss';

class ApplyOrgan extends React.Component {
  constructor(props) {
    super(props);
    this.formatTree = this.formatTree.bind(this);
    this.treeSelectChange = this.treeSelectChange.bind(this);
  }

  /**
   * 格式化树节点，利用treeNode自行渲染
   * @param {props} tree
   * @param {props} formatObj
   */
  formatTree(tree, formatObj) {
    return tree.map(item => {
      return (
        <TreeSelect.TreeNode key={item[formatObj['key']]} value={item[formatObj['value']]} title={item[formatObj['title']]}>
          {this.formatTree(item.childrens || [], formatObj)}
        </TreeSelect.TreeNode>
      );
    });
  }

  treeSelectChange(value) {
    this.props.onChange(value);
  }

  render() {
    const { value, orgTree, treeNodeFilter, disabled = false } = this.props;
    return (
      <TreeSelect
        value={value}
        placeholder="请选择组织机构"
        showCheckedStrategy={TreeSelect.SHOW_PARENT}
        dropdownMatchSelectWidth={true}
        dropdownClassName="tree-format-box"
        className="tree-format-box"
        treeCheckable={true}
        treeDefaultExpandedKeys={orgTree.length === 1 ? [].concat(orgTree[0].id) : []}
        treeNodeFilterProp={'title'}
        multiple={true}
        maxTagCount={1}
        onChange={this.treeSelectChange}
        disabled={disabled}
      >
        {this.formatTree(orgTree, treeNodeFilter)}
      </TreeSelect>
    );
  }
}
export default ApplyOrgan;
