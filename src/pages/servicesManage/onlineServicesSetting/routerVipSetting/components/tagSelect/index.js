/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2021-12-03 16:35:21
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-09-13 10:56:50
 * @FilePath: /askone-manage-pc/src/pages/servicesManage/onlineServicesSetting/routerVipSetting/components/tagSelect/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import { Select } from "dpl-react";
import { tagTypeList, modalType } from "../../config";
function TagSelect(props) {
    const {
        value,
        onChange,
        disabled,
        tagTypeList=[],
        type,
    } = props;
    const [tagList, setTagList] = useState([]); // 标签列表

    const valueChange = (type, data) => {
        let result = Object.assign({}, value);
        if (type === "tagType") {
            result.tagType = data;
            result.tagId = undefined;
        }
        if (type === "tagId") {
            result.tagId = data;
            // if(!data || data.length === 0){ // 清空前面标签类型
            //     result.tagType = undefined;
            // }
        }
        onChange && onChange(result);
    };

    useEffect(() => {
        if (value.tagType) {
            let result = [];
            for(let i = 0,len = tagTypeList.length; i<len; i++){
                const item  = tagTypeList[i]
                if(value.tagType === item.value){
                    result = item.list;
                    break;
                }
            }
            setTagList(result);
        } else { // 清空内容
            setTagList([])
        }
    }, [value, tagTypeList]);

    return (
        <div className="vip-tag-select">
            <Select
                className="vip-tag-select-type"
                value={value.tagType}
                allowClear
                disabled={disabled}
                onChange={(val) => {
                    valueChange("tagType", val);
                }}
            >
                {tagTypeList.map((item) => {
                    return (
                        <Select.Option key={item.value} value={item.value}>
                            {item.label}
                        </Select.Option>
                    );
                })}
            </Select>
            <Select
                showSearch
                optionFilterProp="children"
                mode={type === modalType.add.type ? "multiple" : undefined}
                value={value.tagId}
                allowClear
                disabled={disabled}
                maxTagCount="1"
                onChange={(val) => {
                    valueChange("tagId", val);
                }}
            >
                {tagList.map((item) => {
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

export default TagSelect;
