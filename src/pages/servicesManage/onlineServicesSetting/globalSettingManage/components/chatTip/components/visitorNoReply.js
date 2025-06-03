import React from "react";
import {Switch, Checkbox, Input, InputNumber} from "dpl-react";
const TextArea = Input.TextArea;
export default function tip(props) { // 访客长时间未回复
    const {
        value = {
            tipEnable: 'N',
            remindAgentEnable: 'N',
            interval: '',
            tip: '',
            endInternal: '',
            endTip: ''
        }, onChange, disabled
    } = props

    return <div className='visitor-no-replyTip'>
        <div className='switch'>
            <Switch checked={value.tipEnable==='Y'}
                    disabled={disabled}
                    onChange={(e) => {
                        onChange(Object.assign({}, value, {tipEnable: e?'Y':'N'}))
                    }}/>
            {value.tipEnable==='Y' && <Checkbox checked={value.remindAgentEnable==='Y'}
                                                        style={{marginLeft: 20}}
                                                        disabled={disabled}
                                                        onChange={(e) => {
                                                            onChange(Object.assign({}, value, {remindAgentEnable: e.target.checked?'Y':'N'}))
                                                        }}>同步提醒坐席</Checkbox>}
        </div>
        {value.tipEnable==='Y' && <div className='list'>
            <div className='item'>
                <span>过</span>
                <InputNumber style={{margin: '0 4px 0 4px'}}
                             disabled={disabled}
                             value={value.interval}
                             max={99}
                             min={1}
                             onChange={(e) => {
                                 onChange(Object.assign({}, value, {interval: e}))
                             }}
                             className={value.interval ? 'success' : ''}
                />
                <span>分钟未发送消息，提示：</span>
                <TextArea style={{flex: 1}}
                       value={value.tip}
                       disabled={disabled}
                       maxLength={1000}
                       className={value.tip ? 'success' : ''}
                       onChange={(e) => {
                           onChange(Object.assign({}, value, {tip: e.target.value}))
                       }}/>
            </div>
            <div className='item'>
                <span>过</span>
                <InputNumber style={{margin: '0 4px 0 4px'}}
                             disabled={disabled}
                             value={value.endInternal}
                             className={value.endInternal ? 'success' : ''}
                             max={99}
                             min={1}
                             onChange={(e) => {
                                 onChange(Object.assign({}, value, {endInternal: e}))
                             }}/>
                <span>分钟未发送消息，对话结束并提示：</span>
                <TextArea style={{flex: 1}}
                       value={value.endTip}
                       className={value.endTip ? 'success' : ''}
                       disabled={disabled}
                       maxLength={1000}
                       onChange={(e) => {
                           onChange(Object.assign({}, value, {endTip: e.target.value}))
                       }}/>
            </div>
        </div>
        }

    </div>
}