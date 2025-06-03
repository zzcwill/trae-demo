import React from "react";
import { Checkbox, Input } from 'dpl-react'
import { makeUUID } from "@/utils";
import './index.scss'

export const MultipleChoice = (props) => {
    const {
      disabled,
      value,
      options = [],
      onChange,
    } = props

    return (
        <Checkbox.Group
          className="check-box-choice"
          value={value}
          disabled={disabled}
          onChange={(data) => {
            console.info('onChange', data);
            // onChange(Object.assign({}, value, data))
            onChange(data);
          }
        }>
          {
            options.map((item, index) => {
              return (
                <Checkbox 
                  key={makeUUID()}
                  value={item.optionCode}
                >
                  {item.optionName}
                </Checkbox>               
              )
            })
          }
        </Checkbox.Group>
    )
}