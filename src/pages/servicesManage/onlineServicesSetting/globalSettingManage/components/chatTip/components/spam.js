import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            enable: 'N',
            count: '',
            tip: ''
        }, onChange
    } = props
    return <div>
        <Switch checked={value.enable === 'Y'} onChange={(e) => {
            onChange(Object.assign({}, value, {enable: e ? 'Y' : 'N'}))
        }}/>
        {value.enable === 'Y' && <div className='flex'>
            <span>访客一分钟连续发</span>
            <InputNumber min={1} max={999}
                         value={value.count}
                         className={value.count ? 'success' : ''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {count: e}))
                         }}/>
            <span>条信息后一分钟内不允许再向客服发送消息，并提示：</span>
        </div>}
        {value.enable === 'Y' && <Input.TextArea
            value={value.tip}
            className={value.tip ? 'success' : ''}
            maxLength={1000}
            onChange={(e) => {
                onChange(Object.assign({}, value, {tip: e.target.value}))
            }}/>}
    </div>
}