import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            "enable": "Y",
            "word": "",
            "tip": ""
        },
        type = '访客',
        onChange
    } = props
    return <div>
        <Switch checked={value.enable === 'Y'} onChange={(e) => {
            onChange(Object.assign({}, value, {enable: e ? 'Y' : 'N'}))
        }}/>
        {value.enable==='Y'&&  <>
            <div className='flex'>
                <span>当{type}发送以下敏感词</span>
                <span style={{marginLeft: 10, color: '#999999', fontSize: 12}}>词语与词语之间用&符号分割</span>
            </div>
            <Input.TextArea
                value={value.word}
                className={value.word ? 'success' : ''}
                maxLength={2000}
                onChange={(e) => {
                    onChange(Object.assign({}, value, {word: e.target.value}))
                }}/>
            <div className='flex'>
                <span>系统将提示</span>
                <span style={{marginLeft: 10, color: '#999999', fontSize: 12}}>提示：xx表示敏感词的通配符</span>
            </div>
            <Input.TextArea
                value={value.tip}
                className={value.tip ? 'success' : ''}
                maxLength={1000}
                onChange={(e) => {
                    onChange(Object.assign({}, value, {tip: e.target.value}))
                }}/></>}
    </div>
}