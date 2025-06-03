import React from 'react'
import './index.scss'
import fail_icon from "./fail.png";

export default function CardUnPass(props, ref) {
    const {auditUnpassReasonName = '', auditUnpassDesc = '',style,className=''} = props
    return <div className={'unPass '+className} style={style}>
        <div className='title'>
            <img alt='' src={fail_icon}/>
            <p>未通过原因：{auditUnpassReasonName}</p>
        </div>
        {auditUnpassDesc && <div className='des'>
            失败原因：{auditUnpassDesc}
        </div>}
    </div>
}