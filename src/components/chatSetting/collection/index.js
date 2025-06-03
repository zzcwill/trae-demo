import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'
import './index.scss';

export default function Collection(props) {
    const {
        value = {
            enable: 'N',
            collectTip: ''
        }, onChange, disabled = false
    } = props
    console.log(value, 'value');
    return <div className="transfer-over-message">
        <Switch checked={value.enable === 'Y'} disabled={disabled} onChange={(e) => {
            onChange(Object.assign({}, value, {enable: e ? 'Y' : 'N'}))
        }}/>
        {value.enable === 'Y' && <div className='flex'>
            <div>收藏成功提示语:</div>
        </div>}
        {value.enable === 'Y' && <Input.TextArea value={value.collectTip}
            maxLength={1000}
            className={value.collectTip ? 'success' : ''}
            disabled={disabled}
            onChange={(e) => {
                onChange(Object.assign({}, value, {collectTip: e.target.value}))
            }}
        />}
    </div>
}