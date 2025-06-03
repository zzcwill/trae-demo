import React from 'react'
import './index.scss'
import category_img from './category.png'

export default function CardCategory(props) {
  const {className = '', style = {}, category = []} = props

  return (
    <div className={`card-category ${className}`} style={style}>
      <div className='category-box'>
        {category.map((item, index) => {
          return <div className='category-item' key={index}>{item}{index!==category.length-1?'/':''}</div>
        })}
      </div>
    </div>
  )
}
