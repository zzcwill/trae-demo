import React, { useState, useEffect } from "react";
import "./index.scss";
import classnames from "classnames";
import { Icon } from "dpl-react";
import CategorySelect from "./components/categorySelect";

function AddCategory(props) {
  const { selectList, list, disabled, onChange, placeholder, isCanAdd } = props;
  const [categoryList, setCategoryList] = useState([]);
  // 删除
  const onDelete = (value, index) => {
    let list = [].concat(categoryList);
    list.splice(index, 1);
    setCategoryList(list);
    onChange(list);
  };

  // 数据修改
  const onValueChange = (value, index) => {
    let list = [].concat(categoryList);
    list[index] = value;
    // setCategoryList(list);
    onChange && onChange(list);
  };

  // 新增
  const addCategory = () => {
    // isCanAdd 为function 并且返回为false的时候，不执行后续操作
    if(typeof isCanAdd === "function" && !isCanAdd()){
      return 
    }
    let list = [].concat(categoryList);
    list.push(undefined);
    setCategoryList(list);
  };

  useEffect(() => {
    if (list && Array.isArray(list)) {
      setCategoryList(list);
    }
  }, [list]);
  return (
    <div className="add-category-box">
      {categoryList.length > 0 &&
        categoryList.map((item, index) => {
          return (
            <CategorySelect
              key={index}
              selectList={selectList}
              disabled={disabled}
              value={item}
              index={index}
              placeholder={placeholder}
              onDelete={onDelete}
              onChange={onValueChange}
            />
          );
        })}
      <div
        className="add-category"
        onClick={() => {
          addCategory();
        }}
      >
        <Icon type="plus" />
        <div className="line"></div>
        <span>添加分类</span>
      </div>
    </div>
  );
}
export default React.forwardRef(AddCategory);
