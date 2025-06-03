/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-08-07 17:29:41
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-08-14 19:58:48
 * @FilePath: /askone-manage-pc/src/pages/routerManage/routerRule/children/ruleBatchCopy/fastInput/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Input } from 'dpl-react'
import React, { useEffect, useState } from 'react'

export default function FastInput(props) {
    const { value, onChange, ...rest } = props;
    const [innerValue, setInnerValue] = useState(props.value);

    useEffect(() => {
        setInnerValue(value);
    }, [value]);

    return (
        <Input
            value={innerValue}
            onChange={(e) => {
                setInnerValue(e.target.value);
            }}
            onBlur={() => {
                onChange?.(innerValue);
            }}
            id={rest.key}
            {...rest}
        />
    )
}