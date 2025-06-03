import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            offlineMessageTimeoutEnable: 'N',
            offlineMessageInterval: '',
        }, onChange
    } = props
    return <div>
        <Switch checked={value.offlineMessageTimeoutEnable === 'Y'} onChange={(e) => {
            onChange(Object.assign({}, value, {offlineMessageTimeoutEnable: e ? 'Y' : 'N'}))
        }}/>
        {value.offlineMessageTimeoutEnable === 'Y' && <div className='flex'>
            <span>客服发送离线消息</span>
            <InputNumber min={1} max={999}
                         value={value.offlineMessageInterval}
                         className={value.offlineMessageInterval ? 'success' : ''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {offlineMessageInterval: e}))
                         }}/>
            <span>小时后，访客端将不出现离线消息提醒</span>
        </div>}
    </div>
}