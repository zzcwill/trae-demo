import React from 'react'
import './index.scss'

export default function CardStatus(props) {
  const {text, className = '', style = {}, iconColor = '#52c41a', unShowTextColor = false} = props
  return (
    <div className={`card-status ${className}`} style={style}>
      <span className='icon' style={{background: iconColor}}></span>
      <p className='text' style={!unShowTextColor ? {color: iconColor} : {}}>{text}</p>
    </div>
  )
}
