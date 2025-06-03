import React from "react";
import {Switch, InputNumber} from 'dpl-react'

export default function (props) {
    const {
        value = {
            waitingTipEnable: 'N',
            waitingTipCount: ''
        }, onChange
    } = props
    return <div>
        <Switch checked={value.waitingTipEnable === 'Y'} onChange={(e) => {
            onChange(Object.assign({}, value, {waitingTipEnable: e ? 'Y' : 'N'}))
        }}/>
        {value.waitingTipEnable === 'Y' && <div className='flex'>
            <span>排队人数超过</span>
            <InputNumber min={1} max={999} value={value.waitingTipCount} onChange={(e) => {
                onChange(Object.assign({}, value, {waitingTipCount: e}))
            }}/>
            <span>位时，访客从机器人请求人工服务将提示当前排队人数，并确认是否继续转人工服务。</span>
        </div>}
    </div>
}