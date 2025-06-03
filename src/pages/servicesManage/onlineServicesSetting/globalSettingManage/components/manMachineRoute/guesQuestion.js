import React from "react";
import {Switch, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            enable: 'N',
            tip: ''
        },
        onChange,
        disabled
    } = props
    return <div className='guess-question'>
        <Switch checked={value.enable === 'Y'}
                disabled={disabled}
                onChange={(e) => {
                    onChange && onChange({
                        enable: e ? 'Y' : 'N',
                        tip: value.tip
                    })
                }}/>
        <div className='tips'>
            <p>当开启猜您想问后，打开对话窗口时，将提示：</p>
            <span>统配符${`{userName}`}表示访客姓名</span>
        </div>
        <Input.TextArea rows={6}
                        value={value.tip}
                     /*   disabled={value.enable==='N'}*/
                        maxLength={1000}
                        onChange={(e) => {
                            onChange && onChange({
                                enable: value.enable,
                                tip: e.target.value
                            })
                        }}/>
    </div>
}