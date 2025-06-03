import React from "react";
import { Cascader } from "dpl-react";

const defaultFormatObj = {
  value: 'value',
  title: 'label',
  children: 'children',
}

/**
 * 格式化数组，转化成value，label，children 自行渲染
 * @param {props} tree
 * @param {props} formatObj
 */
function formatOptions(tree, formatObj) {
  if(Array.isArray(tree)) {
    return tree.map(item => {
      return {
        value: item[formatObj['value']],
        label: item[formatObj['title']],
        children: formatOptions(item[formatObj['children']] || [], formatObj) ,
      }
    });
  }
  return []
}


export default function CascaderItem(props) {
  const { other, onChange, value,  optionFormat } = props;
  let { options } = props;
  if(options && optionFormat) {//如果有格式化操作
    options = formatOptions(options, optionFormat)
  }
  return <Cascader {...other} onChange={onChange} value={value} options={options} ></Cascader>;
}
