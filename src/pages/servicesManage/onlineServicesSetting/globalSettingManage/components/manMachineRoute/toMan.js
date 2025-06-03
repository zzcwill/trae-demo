import React from 'react'
import {InputNumber, Switch, Input} from 'dpl-react'


export default function (props) {
    const {
        value = {
            multiRoundsEnable: 'N',
            multiRoundsCount: '',
            multiRoundsTip: ''
        }, onChange
    } = props

    return (
        <div className='to-man'>
            <Switch checked={value.multiRoundsEnable === 'Y'}
                    onChange={(e) => {
                        onChange && onChange({
                            multiRoundsEnable: e ? 'Y' : 'N',
                            multiRoundsCount: value.multiRoundsCount,
                            multiRoundsTip: value.multiRoundsTip
                        })
                    }}/>
            <p className='count'>
                <span>机器人服务时，访客发言次数达到</span>
                <InputNumber value={value.multiRoundsCount}
                             min={1}
                             max={99}
                             className={value.multiRoundsCount ? 'success' : ''}
                             onChange={(e) => {
                                 onChange && onChange({
                                     multiRoundsEnable: value.multiRoundsEnable,
                                     multiRoundsCount: e,
                                     multiRoundsTip: value.multiRoundsTip
                                 })
                             }}/>
                <span className='tips'
                      style={{marginLeft: 10}}
                      dangerouslySetInnerHTML={{__html: '提示：可配置{staffService}来替换人工服务入口，该信息会被替换成"人工服务"按钮'}}></span>
            </p>
            <Input.TextArea value={value.multiRoundsTip}
                            className={value.multiRoundsTip ? 'success' : ''}
                            maxLength={1000}
                            onChange={(e) => {
                                onChange(Object.assign({}, value, {multiRoundsTip: e.target.value}))
                            }} rows={6} placeholder='请输入提示语' style={{marginTop: 10}}/>
        </div>
    )
}