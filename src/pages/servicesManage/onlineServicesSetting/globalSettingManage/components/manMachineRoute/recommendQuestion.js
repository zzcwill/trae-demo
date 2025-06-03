import React from "react";
import {InputNumber} from 'dpl-react'

export default function (props) {
    const {
        value = {
            count: ''
        }, onChange
    } = props


    return (
        <div className='recommendQuestion'>
            <InputNumber min={1} max={99} value={value.count} onChange={(e) => {
                onChange({
                    count: e
                })
            }}/>
            <span>坐席回复框输入内容，知识推荐中自动联想提示相关标准问，最多显示20条。</span>
        </div>
    )
}