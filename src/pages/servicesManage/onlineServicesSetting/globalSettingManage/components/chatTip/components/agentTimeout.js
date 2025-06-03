import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            tipEnable: 'N',
            interval: ''
        }, onChange
    } = props
    return <div>
        <Switch checked={value.tipEnable === 'Y'} onChange={(e) => {
            onChange(Object.assign({}, value, {tipEnable: e ? 'Y' : 'N'}))
        }}/>
        {value.tipEnable==='Y'&& <div className='flex'>
            <span>客服</span>
            <InputNumber min={1} max={999}
                         value={value.interval}
                         className={value.interval ? 'success' : ''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {interval: e}))
                         }}/>
            <span>秒未回复访客，将在访客队列的等待时间列出现超时回复提醒</span>
        </div>}
    </div>
}