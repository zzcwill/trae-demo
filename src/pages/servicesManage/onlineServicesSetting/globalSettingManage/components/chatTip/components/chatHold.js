import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            "enable": "N",
            "duration": ""
        }, onChange,
        type='PC'
    } = props
    return <div>
        <Switch checked={value.enable === 'Y'} onChange={(e) => {
            onChange(Object.assign({}, value, {enable: e ? 'Y' : 'N'}))
        }}/>
        {value.enable==='Y'&&<div className='flex'>
            <span>访客关闭{type}对话窗口，对话保持</span>
            <InputNumber min={1} max={999}
                         value={value.duration}
                         className={value.duration?'success':''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {duration: e}))
                         }}/>
            <span>分钟后，系统自动结束对话</span>
        </div>}
    </div>
}