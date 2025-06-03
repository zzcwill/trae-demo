import React from 'react'
import './index.scss'
import zhen_icon from './zhen.png'

export default function CardPolicyBasis(props, ref) {
    const {style, className = ''} = props

    return (
        <div className={'policy-basis ' + className} style={style}>
            <img alt='' src={zhen_icon}/>
            <p>政策依据</p>
        </div>
    )
}