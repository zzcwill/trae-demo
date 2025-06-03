import React from "react";
import './index.scss'
import {Popover} from 'dpl-react'
import Api from '@/request/api'
import {get} from '@/request/request'

let dimensionsList = []
get({url: Api.getDimensionList}).then(data => {
    if (data.success) {
        dimensionsList = data.data
    }
})
const getLabel = (list, type) => {
    let result = []
     list.forEach(item => {
        if (item.type == type) {
            result = item.dimensionList
        }
    })
    return result
}
export default function DimensionPopover(props) {
    const {type, list = [], children} = props
    const nowList = getLabel(dimensionsList, type) || []
    const isInclude = (code) => {
        return list.some(item => item.code === code)
    }
    const PopoverContent = <div className={'dimension-popover-content'}>
        <div className='list'>
            {nowList.map(item => {
                return <div className={isInclude(item.code) ? 'item active' : 'item'}><span title={item.name}>{item.name}</span></div>
            })}
        </div>
        <div className='tips'>注：蓝色为覆盖区域，灰色为未覆盖区域</div>
    </div>
    return <div className='dimension-popover'>
        {list.length <= 1 ? children : <Popover content={PopoverContent} >{children}</Popover>}
    </div>
}