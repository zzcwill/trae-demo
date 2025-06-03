import React from "react";
import './index.scss'
import {Icon} from "dpl-react";

export default function Breadcrumb(props) {
    const {className = '', style = {}, list = [], onClick} = props
    return <div className={`breadcrumb-wrap ${className}`} style={style}>
        {list.map(item => {
            return <div className='breadcrumb-item'>
                <div
                    className='text'
                    onClick={() => {
                        onClick(item)
                    }}>{item.name}</div>
                <Icon type='right-arrow'/>
            </div>
        })}
    </div>
}