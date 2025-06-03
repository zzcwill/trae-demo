import React from 'react'
import {Button} from 'dpl-react'
import edit_icon from './img/edit.png'
export default function BtnEdit(props) {
  const {onClick, className = '', style = {}, text = '修改问题',type='primary-bordered'} = props
  return (
    <Button onClick={onClick} className={className} style={style} type={type}>
      <img alt='' src={edit_icon} style={{width:16,height:16,marginRight:4,position:'relative',top:4}}/>
      <span>{text}</span>
    </Button>
  )
}
