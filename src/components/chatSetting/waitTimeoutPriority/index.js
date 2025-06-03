import React from "react";
import { Switch, InputNumber, Input } from 'dpl-react'
import './index.scss';

export default function WaitTimeoutPriority(props) {
    const {
        value = {
            enable: 'N',
            timeout: '',
            priority: ''
        }, onChange, disabled = false
    } = props
    console.log(value, 'value');
    return <div className="wait-timeout-priority">
        <Switch checked={value.enable === 'Y'} disabled={disabled} onChange={(e) => {
            onChange(Object.assign({}, value, { enable: e ? 'Y' : 'N' }))
        }} />
        {value.enable === 'Y' && <div className='flex'>
            <span>访客排队时间超过</span>
            <InputNumber min={1} max={9999}
                disabled={disabled}
                value={value.timeout}
                className={value.timeout ? 'success' : ''}
                onChange={(e) => {
                    onChange(Object.assign({}, value, { timeout: e }))
                }} />
            <span>秒时，优先级调整为</span>
            <InputNumber min={1} max={9}
                disabled={disabled}
                value={value.priority}
                className={value.priority ? 'success' : ''}
                onChange={(e) => {
                    onChange(Object.assign({}, value, { priority: e }))
                }} />
        </div>}
    </div>
}