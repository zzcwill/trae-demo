import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            remindEnable: 'N',
            content: ''
        }, onChange
    } = props
    return <div>
        <div className='flex'>
            <Switch checked={value.remindEnable === 'Y'} onChange={(e) => {
                onChange(Object.assign({}, value, {remindEnable: e ? 'Y' : 'N'}))
            }}/>
            {value.remindEnable === 'Y' && <>
             <span style={{marginLeft: 10}}>
               当访客发送以下关键词，将在访客队列的关注提醒列提醒客服
           </span>
                <span style={{marginLeft: 10, color: '#999999', fontSize: 12}}>词语与词语之间用&符号分割</span>
            </>}
        </div>
        {value.remindEnable === 'Y' && <Input.TextArea value={value.content}
                                                       maxLength={1000}
                                                       className={value.content ? 'success' : ''}
                                                       onChange={(e) => {
                                                           onChange(Object.assign({}, value, {content: e.target.value}))
                                                       }}/>}
    </div>
}