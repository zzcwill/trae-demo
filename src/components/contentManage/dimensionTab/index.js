import React, {useEffect, useRef, useState, useImperativeHandle} from 'react'
import './index.scss'
import {toChineseNum} from '@/utils/index'
import {Icon} from 'dpl-react'
import add_icon from './image/add.png'
import complete_icon from './image/complete.png'
import edit_icon from './image/edit.png'

function DimensionTab(props, ref) {
    const {list = [], onClick, activeIndex = 0, style, showAdd = false, onAdd, statusList = [], showStatus = false} = props
    const scrollRef = useRef(null)
    const wrapRef = useRef(null)
    const [maxWidth, setMaxWidth] = useState(0)
    const iconClick = (isLeft = true) => {
        const currentLeft = scrollRef.current.scrollLeft
        const width = scrollRef.current.offsetWidth
        scrollRef.current.scrollLeft = isLeft ? currentLeft - width - 4 : currentLeft + width + 4
    }
    const resetMaxWidth = () => { // 计算可用最大宽度，自适应屏幕
        const wrapWidth = wrapRef.current.offsetWidth
        setMaxWidth(showAdd ? wrapWidth - 44 - 16 - 12 : wrapWidth - 44)
    }
    const addHandler = () => {
        onAdd()
        setTimeout(() => {
            scrollRef.current.scrollLeft = 100000
        }, 0)
    }
    const scrollTo = (isLeft = true) => {
        if (isLeft) {
            scrollRef.current.scrollLeft = -100000
        } else {
            scrollRef.current.scrollLeft = 100000
        }
    }
    useImperativeHandle(ref, () => {
        return {
            scrollTo
        }
    })
    useEffect(() => {
        resetMaxWidth()
    }, [])
    return (
        <div className='dimension-tab' style={style} ref={wrapRef}>
            <div className='icon-wrap' onClick={iconClick} style={{marginRight: 2,}}>
                <Icon type="left"/>
            </div>
            <div className='dimension-list-wrap' ref={scrollRef} style={{maxWidth: maxWidth}}>
                <div className='dimension-list'>
                    {list.map((item, index) => {
                        return (
                            <div
                                className={activeIndex === index ? 'item active' : 'item'}
                                onClick={() => {
                                    onClick(item, index)
                                }}
                                key={item.id}
                            >
                                <div className='item-wrap'>
                                    <span className='name'>维度{toChineseNum(index + 1)}</span>
                                    {showStatus &&
                                    <img src={statusList[index] ? complete_icon : edit_icon} style={{marginLeft: 10}}/>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='icon-wrap'>
                <Icon type="right" onClick={() => {
                    iconClick(false)
                }}/>
            </div>
            {showAdd && <img src={add_icon} className='add-icon' onClick={addHandler}/>}
        </div>
    )
}

export default React.forwardRef(DimensionTab)