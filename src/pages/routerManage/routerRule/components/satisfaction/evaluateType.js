import React from "react";
import { Checkbox } from 'dpl-react'

export const EvaluateType = (props) => {
    const {
        disabled,
        value, 
        onChange
    } = props
    return (
        <Checkbox.Group 
          direction='vertical' 
          value={value} 
          disabled={disabled}
          onChange={(data) => {
            console.info('onChange', data)
            onChange(data)
          }
        }>
            <Checkbox value={'4'}>必须评价后才能关闭咨询窗口的选项</Checkbox>
        </Checkbox.Group>
    )
}