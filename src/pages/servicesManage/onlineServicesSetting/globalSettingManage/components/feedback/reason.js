import React from "react";
import {Input, Icon, message} from "dpl-react";

export default function Reason(props) {
    const {value = [], onChange, disabled} = props
    return <div className='reason'>
        {value.map((item, index) => {
            return <div className='item' key={index}>
                <Input placeholder={'请输入'}
                       value={item}
                       onChange={(e) => {
                           value[index] = e.target.value
                           onChange([...value])
                       }}
                       disabled={disabled}
                       maxLength={20}
                       className={item ? 'success' : ''}
                />
                <Icon type="plus"

                      onClick={() => {
                          if (disabled) return
                          if (value.length >= 5) return;
                          value.splice(index + 1, 0, '')
                          onChange([...value])
                      }}
                      style={{marginLeft: 10, marginRight: 10, cursor: 'pointer'}}
                />
                <Icon type="minus"
                      style={{cursor: 'pointer'}}
                      onClick={() => {
                          if (disabled) return
                          if (value.length <= 1) {
                              message.error('至少需要一条选项')
                              return
                          }
                          value.splice(index, 1)
                          onChange([...value])
                      }}/>
            </div>
        })}
    </div>
}