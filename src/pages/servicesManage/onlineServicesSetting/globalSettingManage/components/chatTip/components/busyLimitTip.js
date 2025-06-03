import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            busyLimitTipEnable: 'N',
            busyLimitCount: '',
            busyLimitTip: ''
        }, onChange
    } = props
    return <div>
        <Switch checked={value.busyLimitTipEnable === 'Y'} onChange={(e) => {
            onChange(Object.assign({}, value, {busyLimitTipEnable: e ? 'Y' : 'N'}))
        }}/>
        {value.busyLimitTipEnable==='Y'&&<div className='flex'>
            <span>排队人数超过</span>
            <InputNumber min={1} max={999}
                         value={value.busyLimitCount}
                         className={value.busyLimitCount?'success':''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {busyLimitCount: e}))
                         }}/>
            <span>位时，将提示:</span>
        </div>}
        {value.busyLimitTipEnable==='Y'&&<Input.TextArea
            value={value.busyLimitTip}
            className={value.busyLimitTip?'success':''}
            maxLength={1000}
            onChange={(e) => {
                onChange(Object.assign({}, value, {busyLimitTip: e.target.value}))
            }}/>}
    </div>
}