import React from 'react'
import { Popover } from 'dpl-react';
import './index.scss'
import grayImg from './images/tip_gray.png';
import whiteImg from './images/tip_white.png';

export default function HoverTip(props) {
  const {  onClick, className = '', style = {},color = 'gray',tipText='', children} = props

  const img = {
      'gray': grayImg,
      'white': whiteImg
    }
  return (
    <div onClick={onClick} className={`hover-tip ${className}`} style={style}>
        {children && <div className='tip-title'>{children}</div>}
        {tipText && 
            <Popover 
                content={tipText} 
                overlayClassName="hover-tip-pop"
                content={
                    <div className='hover-tip-pop-content'>
                        {tipText}
                    </div>}
                placement="bottomLeft" 
            >
                <img className='tip-img' src={img[color] || grayImg} />
            </Popover>
        }
        {!tipText && 
            <img className='tip-img' src={img[color] || grayImg} />
        }
    </div>
  )
}
