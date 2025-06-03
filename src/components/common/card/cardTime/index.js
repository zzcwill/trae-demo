import React from 'react'
import './index.scss'
import personIcon from './images/person.png'

export default function CardTime(props) {
  const {className = '', time, userName, des, style = {}} = props
  return (
    <div className={`card-time ${className}`} style={style}>
      <img src={personIcon} className='image' alt=''/>
      <p className='userName'>{userName}</p>
      <p className='des'>{des}</p>
      <p className='time'>{time}</p>
    </div>
  )
}
