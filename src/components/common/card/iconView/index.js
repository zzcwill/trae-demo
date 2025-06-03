import React from 'react'
import './index.scss'
import goodIcon from './images/good.png'
import lookIcon from './images/look.png'
import goodActive from './images/good-active.png'

export default function iconView(props) {
  const {
    text, className = '', style = {}, icon = 'good', onClick = () => {
    }
  } = props
  const iconMap = {
    good: goodIcon,
    look: lookIcon,
    goodActive: goodActive
  }
  return (
    <div className={`icon-view ${className}`} style={style} onClick={onClick}>
      <img src={iconMap[icon]} className='image' alt=''/>
      <p className='text'>{text}</p>
    </div>
  )
}
