import React, {useRef} from 'react'
import './index.scss'
import {Popover, Tag} from 'dpl-react'
import {arr_splice} from '@/utils'

export default function QuestionDimension(props) {
    const {dimensionList = [], style, type = 'location'} = props
    const wrapRef = useRef(null)
    function renderList(arr) {
        const result = arr_splice(arr, 5)
        return <div className='dimension-list-wrap'>
            {result.map((list, index) => {
                return <div className='dimension-list' key={index}>
                    {list.map((item,inIndex) => {
                        return <div className='item' key={inIndex}>{item}</div>
                    })}
                </div>
            })}
        </div>
    }

    return <div className='question-dimension' style={style} ref={wrapRef}>
        {dimensionList.map((item, index) => {
            return item.type === type
                ? item.list.length > 1
                    ? <Popover className='question-dimension-popover'
                               content={renderList(item.list)}
                               getPopupContainer={() => {
                                   return wrapRef.current
                               }}
                               key={index}
                               popupAlign={{
                                   overflow: {
                                       adjustX: true,
                                   },
                               }}
                    >
                        <Tag
                            className='question-dimension-popover-item'>{item.list.length === 1 ? item.list[0] : item.list.length}地区适用</Tag>
                    </Popover>
                    : <Tag
                        key={index}
                        className='question-dimension-popover-item'>{item.list.length === 1 ? item.list[0] : item.list.length}{type === 'location' ? '地区适用' : ''}</Tag>
                : null
        })}
    </div>
}