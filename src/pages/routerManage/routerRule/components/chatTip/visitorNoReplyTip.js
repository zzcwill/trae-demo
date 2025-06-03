import React from "react";
import {Switch, Checkbox, Input, InputNumber} from "dpl-react";
const TextArea = Input.TextArea;
export default function VisitorNoReplyTip(props) { // 访客长时间未回复
    const {value, onChange, disabled} = props

    return <div className='visitor-no-replyTip'>
        <div className='switch'>
            <Switch checked={value.visitorNoReplyTipEnable}
                    disabled={disabled}
                    onChange={(e) => {
                        onChange(Object.assign({}, value, {visitorNoReplyTipEnable: e}))
                    }}/>
            {value.visitorNoReplyTipEnable && <Checkbox checked={value.remindAgentEnable}
                                                        style={{marginLeft: 20}}
                                                        disabled={disabled}
                                                        onChange={(e) => {
                                                            onChange(Object.assign({}, value, {remindAgentEnable: e.target.checked}))
                                                        }}>同步提醒坐席</Checkbox>}
        </div>
        {value.visitorNoReplyTipEnable && <div className='list'>
            <div className='item'>
                <span>过</span>
                <InputNumber style={{margin: '0 4px 0 4px'}}
                             disabled={disabled}
                             value={value.visitorNoReplyInterval}
                             max={99}
                             min={1}
                             onChange={(e) => {
                                 onChange(Object.assign({}, value, {visitorNoReplyInterval: e}))
                             }}
                             className={value.visitorNoReplyInterval ? 'success' : ''}
                />
                <span>分钟未发送消息，提示：</span>
                <TextArea style={{flex: 1}}
                       value={value.visitorNoReplyTip}
                       disabled={disabled}
                       maxLength={1000}
                       className={value.visitorNoReplyTip ? 'success' : ''}
                       onChange={(e) => {
                           onChange(Object.assign({}, value, {visitorNoReplyTip: e.target.value}))
                       }}/>
            </div>
            <div className='item'>
                <span>过</span>
                <InputNumber style={{margin: '0 4px 0 4px'}}
                             disabled={disabled}
                             value={value.visitorNoReplyEndInternal}
                             className={value.visitorNoReplyEndInternal ? 'success' : ''}
                             max={99}
                             min={1}
                             onChange={(e) => {
                                 onChange(Object.assign({}, value, {visitorNoReplyEndInternal: e}))
                             }}/>
                <span>分钟未发送消息，对话结束并提示：</span>
                <TextArea style={{flex: 1}}
                       value={value.visitorNoReplyEndTip}
                       className={value.visitorNoReplyEndTip ? 'success' : ''}
                       disabled={disabled}
                       maxLength={1000}
                       onChange={(e) => {
                           onChange(Object.assign({}, value, {visitorNoReplyEndTip: e.target.value}))
                       }}/>
            </div>
        </div>
        }

    </div>
}