import React from 'react'
import './index.scss'

export default function CardTitle(props) {
  const {title, onClick=()=>{},className = '', style = {}} = props

  return (
    <div className={`card-title ${className}`} onClick={onClick} style={style}>
      {title}
    </div>
  )
}
