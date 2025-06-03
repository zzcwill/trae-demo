import React from 'react'
import {Button} from 'dpl-react'

export default function BtnAnswer(props) {
  const {onClick, className = '', style = {},title='新增回答'} = props
  return (
    <Button onClick={onClick} type="primary-bordered" icon="edit" className={`card-btn ${className}`} style={style}>{title}</Button>
  )
}
