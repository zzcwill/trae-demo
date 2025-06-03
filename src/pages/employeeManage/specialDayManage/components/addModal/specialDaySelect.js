import React, {useEffect} from "react";
import {DatePicker, Icon, Radio, TimePicker, message} from 'dpl-react'
import moment from "moment";
import {getMonthEndDay} from "@/utils";

const {now, monthEndDate} = getMonthEndDay()
export default function SpecialDaySelect(props) {
    const {value = [], onChange} = props
    return <div className='special-day-select'>
        {value.map((item, index) => {
            return <div className='item' key={index}>
                <div className='date'>
                    <DatePicker.RangePicker format="YYYY-MM-DD" value={[item.beginDay, item.endDay]}
                                            onChange={(e) => {
                                                value[index].beginDay = e[0]
                                                value[index].endDay = e[1]
                                                onChange([...value])
                                            }}
                                            className={item.beginDay || item.endDay ? 'empty' : ''}
                    />
                    <Icon type="plus"
                          onClick={() => {
                              value.splice(index + 1, 0, {
                                  "beginDay": moment(now),
                                  "endDay": moment(monthEndDate),
                                  "workFlag": "1",
                                  "workTime": [{
                                      "beginTime": moment(new Date('2020/07/09 08:30')),
                                      "endTime": moment(new Date('2020/07/09 17:30'))
                                  }]
                              })
                              onChange([...value])
                          }}
                          style={{marginLeft: 10, marginRight: 10, cursor: 'pointer'}}
                    />
                    <Icon type="minus"
                          style={{cursor: 'pointer'}}
                          onClick={() => {
                              if (value.length <= 1) {
                                  message.error('至少需要存在一个特殊日')
                                  return;
                              }
                              value.splice(index, 1)
                              onChange([...value])
                          }}/>
                </div>
                <Radio.Group value={item.workFlag} options={[{label: '上班', value: '0'}, {label: '不上班', value: '1'}]}
                             style={{marginTop: 10}}
                             onChange={(e) => {
                                 item.workFlag = e.target.value
                                 onChange([...value])
                             }}/>
                {item.workFlag == '0' && <div className='time'>
                    {Array.isArray(item.workTime) && item.workTime.map((workTime, workTimeIndex) => {
                        return <div className='time-item' key={workTimeIndex}>
                            <TimePicker value={workTime.beginTime}
                                        onChange={(e) => {
                                            workTime.beginTime = e
                                            onChange([...value])
                                        }}
                                        className={workTime.beginTime ? 'empty' : ''}
                            />
                            <TimePicker value={workTime.endTime}
                                        onChange={(e) => {
                                            workTime.endTime = e
                                            onChange([...value])
                                        }}
                                        style={{marginLeft: 10}}
                                        className={workTime.endTime ? 'empty' : ''}
                            />
                            <Icon type="plus"
                                  onClick={() => {
                                      item.workTime.splice(workTimeIndex + 1, 0, {
                                          "beginTime": moment(new Date('2020/07/09 08:30')),
                                          "endTime": moment(new Date('2020/07/09 17:30'))
                                      })
                                      onChange([...value])
                                  }}
                                  style={{marginLeft: 10, marginRight: 10, cursor: 'pointer'}}
                            />
                            <Icon type="minus"
                                  style={{cursor: 'pointer'}}
                                  onClick={() => {
                                      if (item.workTime.length <= 1) {
                                          message.error('至少需要存在一个时间段')
                                          return
                                      }
                                      item.workTime.splice(workTimeIndex, 1)
                                      onChange([...value])
                                  }}/>
                        </div>
                    })}
                </div>}
            </div>
        })}
    </div>
}