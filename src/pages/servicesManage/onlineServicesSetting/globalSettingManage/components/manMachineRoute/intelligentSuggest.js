import React from "react";
import {Switch, InputNumber} from 'dpl-react'

export default function (props) {
    const {
        value = {enable: 'N', questionCount: ''}, onChange
    } = props
    return (
        <div className='association'>
            <div className='enable'>
                <Switch checked={value.enable === 'Y'}
                        onChange={(e) => {
                            onChange && onChange({
                                enable: e ? 'Y' : 'N',
                                questionCount: value.questionCount
                            })
                        }}/>
                <p>人工模式下访客输入内容，自动联想提示相关标准问。</p>
            </div>
            <div className='count'>
                <span>访客端智能联想提示问显示条数：</span>
                <InputNumber max={99} min={1} value={value.questionCount} onChange={(e) => {
                    onChange && onChange({
                        enable: value.enable,
                        questionCount: e
                    })
                }}/>
                <span className='tips'>（最多可显示10条）</span>
            </div>
        </div>
    )
}