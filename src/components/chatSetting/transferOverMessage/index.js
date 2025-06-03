import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'
import './index.scss';

export default function TransferOverMessage(props) {
    const {
        value = {
            enable: 'N',
            limitNum: '',
            limitTip: ''
        }, onChange, disabled = false
    } = props
    console.log(value, 'value');
    return <div className="transfer-over-message">
        <Switch checked={value.enable === 'Y'} disabled={disabled} onChange={(e) => {
            onChange(Object.assign({}, value, {enable: e ? 'Y' : 'N'}))
        }}/>
        {value.enable === 'Y' && <div className='flex'>
            <span>转接次数超过</span>
            <InputNumber min={1} max={99}
                         disabled={disabled}
                         value={value.limitNum}
                         className={value.limitNum ? 'success' : ''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {limitNum: e}))
                         }}/>
            <span>次时，提示坐席</span>
        </div>}
        {value.enable === 'Y' && <Input.TextArea value={value.limitTip}
            maxLength={1000}
            className={value.limitTip ? 'success' : ''}
            disabled={disabled}
            onChange={(e) => {
                onChange(Object.assign({}, value, {limitTip: e.target.value}))
            }}
        />}
    </div>
}