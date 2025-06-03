import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            limitEnable: 'N',
            threshold: '',
            limitInterval: '',
            limitTip: '',
        }, onChange
    } = props
    return <div>
        <Switch checked={value.limitEnable === 'Y'} onChange={(e) => {
            onChange(Object.assign({}, value, {limitEnable: e ? 'Y' : 'N'}))
        }}/>
        {value.limitEnable==='Y'&&  <div className='flex'>
            <span>对话</span>
            <InputNumber min={1} max={999}
                         value={value.threshold}
                         className={value.threshold ? 'success' : ''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {threshold: e}))
                         }}/>
            <span>分钟后,访客在</span>
            <InputNumber min={1} max={999}
                         value={value.limitInterval}
                         className={value.limitInterval ? 'success' : ''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {limitInterval: e}))
                         }}/>
            <span>分钟内不允许发送消息，并提示：</span>
        </div>}
        {value.limitEnable==='Y'&& <Input.TextArea
            value={value.limitTip}
            className={value.limitTip ? 'success' : ''}
            maxLength={1000}
            onChange={(e) => {
                onChange(Object.assign({}, value, {limitTip: e.target.value}))
            }}/>}
    </div>
}