import React from "react";
import {Checkbox, InputNumber} from 'dpl-react'

export default function (props) {
    const {
        value = {
            feedbackTypeOptionList: [],
            visitorSendNum: '',
            agentSendNum: ''
        }, onChange
    } = props
    return (
        <Checkbox.Group direction='vertical' value={value.feedbackTypeOptionList} onChange={(e) => {
            onChange(Object.assign({}, value, {feedbackTypeOptionList: e}))
        }}>
            <Checkbox value={'1'}>对话中系统自动推送满意度评价窗口</Checkbox>
            {value.feedbackTypeOptionList.indexOf('1') >= 0 && <div className='numbers'>
                <span>当访客发送</span>
                <InputNumber min={1} max={999} value={value.visitorSendNum} onChange={(e) => {
                    onChange(Object.assign({}, value, {visitorSendNum: e}))
                }}/>
                <span>条并且客服发送</span>
                <InputNumber min={1} max={999} value={value.agentSendNum} onChange={(e) => {
                    onChange(Object.assign({}, value, {agentSendNum: e}))
                }}/>
                <span>条后，自动向访客弹出满意度评价</span>
            </div>}
            <Checkbox value={'2'}>对话结束后系统自动推送满意度窗口</Checkbox>
            <Checkbox value={'3'}>允许访客主动评价</Checkbox>
            <Checkbox value={'4'}>必须评价后才能关闭咨询窗口的选项</Checkbox>
        </Checkbox.Group>
    )
}