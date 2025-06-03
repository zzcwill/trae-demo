import React from "react";
import {Switch} from 'dpl-react'

export default function (props) {
    const {value = {enable: 'N'}, onChange} = props

    return (
        <div className='intelligentAssistant'>
            <Switch checked={value.enable === 'Y'}
                    onChange={(e) => {
                        onChange && onChange({
                            enable: e ? 'Y' : 'N',
                        })
                    }}/>
            <span>人工模式，机器人协助坐席自动解答。</span>
        </div>
    )
}