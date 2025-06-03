import React from "react";
import { Switch, InputNumber, Input } from 'dpl-react'
import './index.scss';

export default function RiskWordRemind(props) {
    const {
        value = {
            enable: 'N',
            riskWord: '',
        }, onChange, disabled = false
    } = props
    console.log(value, 'value');
    return <div className="risk-word-remind">
        <Switch checked={value.enable === 'Y'} disabled={disabled} onChange={(e) => {
            onChange(Object.assign({}, value, { enable: e ? 'Y' : 'N' }))
        }} />
        {value.enable === 'Y' && <div className='flex'>
            <div>当用户客服发送以下风险词，标红提醒客服<span className="tips">词语与词语之间用&符号分割</span></div>
            <Input.TextArea value={value.riskWord}
                maxLength={2000}
                className={value.riskWord ? 'success' : ''}
                placeholder="词语与词语之间用&符号分割"
                disabled={disabled}
                onChange={(e) => {
                    onChange(Object.assign({}, value, {riskWord: e.target.value}))
                }}
            />
        </div>}
    </div>
}