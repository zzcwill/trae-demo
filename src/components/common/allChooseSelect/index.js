/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-06-09 14:08:28
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-04-17 14:56:26
 * @FilePath: /askone-manage-pc/src/components/common/allChooseSelect/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState } from "react";
import { Select, Checkbox, Divider } from "dpl-react";
import "./index.scss";

const Option = Select.Option;
const defaultFormat = {
  searchKey: "keyword",
  value: 'value',
  label: 'label',
}

export default function allChooseSelect(props) {
  const {  format = defaultFormat,  dataSource = [], value,  ...other } = props;
  const [selectState, setSelectState] = useState(false); // 全选状态
  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const currentSelectState = selectState && value.length === dataSource.length;
    const nextSelectState = !currentSelectState;
    setSelectState(nextSelectState)
    if (nextSelectState) {
      other.onChange(dataSource.map(item => item[format.value]))
    } else {
      other.onChange([])
    }     
  }

  return (
    <Select
      className="all-choose-select"
      value={value}
      {...other}
      dropdownRender={(allSelectValue) => (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          {
            other?.mode === 'multiple' 
              ? (
                <>
                  <div style={{ padding: "8px", cursor: "pointer" }} onMouseDown={(e) => e.preventDefault()} onClick={handleChange}>
                    <Checkbox
                      checked={selectState && (value?.length > 0 && value.length === dataSource.length)}
                      // onChange={handleChange}
                    >
                      全选
                    </Checkbox>
                  </div>
                  <Divider style={{ margin: "0" }} />
                </>
              )
              : null
          }
          
          {/* Option 标签值 */}
          {allSelectValue}
        </div>
      )}
    >
      {dataSource.length > 0 &&
        dataSource.map((item) => {
          return (
            <Option key={item[format.value]} value={item[format.value]}>
              {item[format.label]}
            </Option>
          );
        })}
    </Select>
  );
}
