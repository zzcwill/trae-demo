import React, {useEffect, useRef, useState} from 'react'
import {DatePicker} from 'dpl-react';
import moment from 'moment'

export default function TimeRangeSelect(props) {
    const {value, onChange} = props
    const startTime = value[0] ? moment(value[0]) : ''
    const endTime = value[1] ? moment(value[1]) : ''
    const [endDisabled, setEndDisabled] = useState(true)
    const startChangeHandler = (e) => {
        onChange && onChange([e.format('YYYY-MM-DD HH:mm:ss'), ''])
        setEndDisabled(!!!e)
    }
    const endChangeHandler = (e) => {
        const lastTime = startTime.clone()
        lastTime.add(1, 'days')
        if (e.isAfter(lastTime, 'second')) {
            onChange && onChange([startTime.format('YYYY-MM-DD HH:mm:ss'), lastTime.format('YYYY-MM-DD HH:mm:ss')])
           return
        }
        onChange && onChange([startTime.format('YYYY-MM-DD HH:mm:ss'), e.format('YYYY-MM-DD HH:mm:ss')])
    }
  console.log(endTime)
    return <div className='time-range-select'>
        <DatePicker allowClear
                    showTime
                    value={startTime}
                    onChange={startChangeHandler}
                    format="YYYY-MM-DD HH:mm:ss"
        />
        <span className='zhi'>至</span>
        <DatePicker allowClear
                    showTime
                    value={endTime}
                    disabled={endDisabled}
                    format="YYYY-MM-DD HH:mm:ss"
                    disabledDate={(current) => {
                        const lastTime = startTime.clone()
                        lastTime.add(1, 'days')
                        return current.isAfter(lastTime, 'day') || current.isBefore(startTime, 'day')
                    }}
                    disabledTime={(data) => {
                        if (data) {
                            const lastTime = startTime.clone()
                            lastTime.add(1, 'days')
                            const lastTimeObj = lastTime.toObject()
                            const nowTimeObj = data.toObject()
                            const sameHours = lastTimeObj.hours === nowTimeObj.hours
                            const sameMinutes = lastTimeObj.hours === nowTimeObj.hours && lastTimeObj.minutes === nowTimeObj.minutes
                            const getArr = (end) => {
                                const result = []
                                for (let i = 0; i < end; i++) {
                                    result.push(i)
                                }
                                return result
                            }
                            const getArrBefore = (start, end) => {
                                const result = []
                                for (let i = start + 1; i <= end; i++) {
                                    result.push(i)
                                }
                                return result
                            }
                            const obj = {
                                disabledHours: (a, b, c) => {
                                    if (data.isBefore(lastTime, 'day')) return getArr(lastTimeObj.hours)
                                    return getArrBefore(lastTimeObj.hours, 24)
                                },
                                disabledMinutes: (b) => {
                                    if (data.isBefore(lastTime, 'day')) return sameHours ? getArr(lastTimeObj.minutes) : []
                                    return sameHours ? getArrBefore(lastTimeObj.minutes, 60) : []
                                },
                                disabledSeconds: (c) => {
                                    if (data.isBefore(lastTime, 'day')) return sameMinutes ? getArr(lastTimeObj.seconds) : []
                                    return sameMinutes ? getArrBefore(lastTimeObj.seconds, 60) : []
                                }
                            }
                            return obj
                        }
                        return true
                    }}
                    onChange={endChangeHandler}/>
    </div>
}