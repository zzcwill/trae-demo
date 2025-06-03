import React, { useState, useEffect, useImperativeHandle } from "react";
import CascaderRender from "../common/cascaderRender";
import { get } from "@/request/request";
import Api from "@/request/api";
let categoryList = [];
const findCategory = id => {
  if (categoryList.length === 0) return null;
  let result = null;
  const step = arr => {
    arr.forEach(item => {
      if (item.id == id) {
        result = item;
        return;
      }
      item.children && step(item.children);
    });
  };
  step(categoryList);
  return result;
};
export const genCategoryDefaultValue = value => {
  // 处理分类的初始值，用于还原cascader
  if (!value) return;
  if (Array.isArray(value)) {
    value = value[0];
  }
  const category = findCategory(value);
  if (!category) return [value];
  return category.path ? category.path.split(",") : [value];
};

export default function ClassifyTree(props) {
  const { other, onChange, value } = props;
  const [category, setCategory] = useState([]); // 分类

  const getCategory = async () => {
    const data = await get({ url: Api.getClassifyTree });
    if (data.success) {
      const step = (arr, parent) => {
        arr.forEach(item => {
          item.path = parent ? parent.path + "," + item.id : item.id;
          item.value = item.id + "";
          item.label = item.name;
          item.children && step(item.children, item);
        });
      };
      step(data.data);
      setCategory(data.data);
      categoryList = [].concat(data.data);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <CascaderRender
      value={value}
      options={category}
      onChange={onChange}
      item={other}
      changeOnSelect={true}
    />
  );
}
