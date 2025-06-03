import React from "react";
import {Switch, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            switch: false,
            tips: ''
        },
        onChange,
        disabled
    } = props
    return <div className='guess-question'>
        <Switch checked={value.switch}
                disabled={disabled}
                onChange={(e) => {
                    onChange && onChange({
                        switch: e,
                        tips: value.tips
                    })
                }}/>
        <div className='tips'>
            <p>当开启猜您想问后，打开对话窗口时，将提示：</p>
            <span>统配符${`{userName}`}表示访客姓名</span>
        </div>
        <Input.TextArea rows={6}
                        value={value.tips}
                        disabled={disabled || !value.switch}
                        maxLength={1000}
                        onChange={(e) => {
                            onChange && onChange({
                                switch: value.switch,
                                tips: e.target.value
                            })
                        }}/>
    </div>
}