import React from 'react'
import './index.scss'

export default function OperationBtn(props) {
  const {data, text, record, className} = props
  return (
    <div className={`operation-btn ${className}`}>
      {Array.isArray(data) && data.map((item,index) => {
        return (
          <div
            key={index}
            onClick={() => {
              item.callback && item.callback(text, record, index)
            }}
          style={{color:item.color||'#2C85D9 '}}
          >{item.name}</div>
        )
      })}
    </div>
  )
}
