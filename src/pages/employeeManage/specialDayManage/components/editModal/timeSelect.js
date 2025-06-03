import React from "react";
import {Icon, message, Radio, TimePicker} from "dpl-react";
import moment from "moment";

export default function TimeSelect(props) {
    const {value, onChange} = props
    return <div className='time-select'>
        <div className='type'>
            <Radio.Group options={[{label: '上班', value: '0'}, {label: '不上班', value: '1'}]} value={value.workFlag}
                         onChange={(e) => {
                             value.workFlag = e.target.value
                             onChange({...value})
                         }}/>
        </div>
        {value.workFlag == '0' && <div className='time'>
            {Array.isArray(value.workTime) && value.workTime.map((workTime, index) => {
                return <div className='item' key={index}>
                    <TimePicker value={workTime.beginTime}
                                onChange={(e) => {
                                    workTime.beginTime = e
                                    onChange({...value})
                                }}
                                className={workTime.beginTime ? 'empty' : ''}
                    />
                    <TimePicker value={workTime.endTime}
                                onChange={(e) => {
                                    workTime.endTime = e
                                    onChange({...value})
                                }}
                                style={{marginLeft: 10}}
                                className={workTime.endTime ? 'empty' : ''}
                    />
                    <Icon type="plus"
                          onClick={() => {
                              value.workTime.splice(index + 1, 0, {
                                  "beginTime": moment(new Date('2020/07/09 08:30')),
                                  "endTime": moment(new Date('2020/07/09 17:30'))
                              })
                              onChange({...value})
                          }}
                          style={{marginLeft: 10, marginRight: 10, cursor: 'pointer'}}
                    />
                    <Icon type="minus"
                          style={{cursor: 'pointer'}}
                          onClick={() => {
                              if (value.workTime.length <= 1){
                                  message.error('至少需要存在一个时间段')
                                  return
                              }
                              value.workTime.splice(index, 1)
                              onChange({...value})
                          }}/>
                </div>
            })}
        </div>}
    </div>
}