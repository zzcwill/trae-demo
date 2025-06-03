import React from "react";
import { Checkbox } from 'dpl-react'
import { makeUUID } from "@/utils";
import './index.scss'

export const OptionConfigInfo = (props) => {
    const {
      disabled,
      value,
      options = [],
      // onChange,
    } = props
    // console.info('optionConfigInfo', value)

    return (
      <Checkbox.Group
        className="check-box-choice"
        value={value}
        disabled={disabled}
      >
        {
          options.map((item, index) => {
            return (
              <Checkbox
                key={makeUUID()}
                value={item}
              >
                {item.optionName}
              </Checkbox>            
            )
          })
        }
      </Checkbox.Group>
    )
}