import React from "react";
import {Switch, InputNumber, Input} from 'dpl-react'

export default function (props) {
    const {
        value = {
            limitEnable: 'N',
            limitInterval: '',
            limitCount: '',
            limitTip: '',
            limitDuration: "",
        }, onChange
    } = props
    return <div>
        <Switch checked={value.limitEnable === 'Y'} onChange={(e) => {
            onChange(Object.assign({}, value, {limitEnable: e ? 'Y' : 'N'}))
        }}/>
        {value.limitEnable === 'Y' && <div className='flex'>
            <span>访客在</span>
            <InputNumber min={1} max={999} value={value.limitInterval}
                         className={value.limitInterval ? 'success' : ''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {limitInterval: e}))
                         }}/>
            <span>分钟内，请求服务超过:</span>
            <InputNumber min={1} max={99}
                         value={value.limitCount}
                         className={value.limitCount ? 'success' : ''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {limitCount: e}))
                         }}/>
            <span>次,</span>
            <InputNumber min={1} max={999}
                         value={value.limitDuration}
                         className={value.limitDuration ? 'success' : ''}
                         onChange={(e) => {
                             onChange(Object.assign({}, value, {limitDuration: e}))
                         }}/>
            <span>
               分钟内不能再次请求，并提示：
            </span>
        </div>}
        {value.limitEnable === 'Y' && <Input.TextArea value={value.limitTip}
                                                      maxLength={1000}
                                                      className={value.limitTip ? 'success' : ''}
                                                      onChange={(e) => {
                                                          onChange(Object.assign({}, value, {limitTip: e.target.value}))
                                                      }}/>}
    </div>
}