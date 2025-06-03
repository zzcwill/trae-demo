import React, {useEffect, useRef, useState} from "react";
import {Icon, Input} from "dpl-react";

const Tag = (props) => {//DPL tag有Bug,重写一下
    const {children, onClose, onDoubleClick, onClick, closable, className} = props
    return <div className={'dpl-tag ' + className} onDoubleClick={onDoubleClick} onClick={onClick}>
        <span className='dpl-tag-text'>{children}</span>
        {closable && <i className='dpl-anticon dpl-anticon-cross' onClick={onClose}></i>}
    </div>
}
export default function LabelInput(props) {
    const {value = '', onChange, isMultiple = false, className, key} = props
    const [valueArr, setValueArr] = useState([])
    const [showInput, setShowInput] = useState(false)
    const inputRef = useRef(null)
    const editInputRef = useRef(null)
    const [inputValue, setInputValue] = useState('')
    const [currentEditIndex, setCurrentEditIndex] = useState(-1)
    const [editValue, setEditValue] = useState('')
    const [isMax, setIsMax] = useState(false)
    const handleInputConfirm = () => {
        setShowInput(false)
        setInputValue('')
        if (!inputValue) {
            return
        }
        if (valueArr.some(item => {
            return item === inputValue
        })) {
            return;
        }
        if (value) {
            onChange && onChange(value + ',' + inputValue)
        } else {
            onChange && onChange(inputValue)
        }
    }
    const handleEditInputConfirm = (text, index) => {
        setCurrentEditIndex(-1)
        setEditValue('')
        if (!text) return
        if (valueArr.some(item => item === text)) return
        valueArr[index] = text
        onChange(valueArr.join(','))
    }
    useEffect(() => {
        if (value) {
            setValueArr(value.split(','))
        } else {
            setValueArr([])
        }
    }, [value])
    useEffect(() => {
        if (showInput) {
            inputRef.current && inputRef.current.input.focus()
        }
    }, [showInput])
    useEffect(() => {
        if (currentEditIndex !== -1) {
            editInputRef.current && editInputRef.current.input.focus()
        }
    }, [currentEditIndex])
    useEffect(() => {
        setIsMax(() => {
            if (isMultiple) return false //多选
            return valueArr.length === 1
        })
    }, [valueArr])
    return <div className={`label-input ${className} ${value ? '' : 'error'}`} key={key}>
        {valueArr.map((item, index) => {
            return <>
                {currentEditIndex !== index && <Tag key={index}
                                                    onDoubleClick={() => {
                                                        setCurrentEditIndex(index)
                                                        setEditValue(item)
                                                    }}
                                                    closable={true}
                                                    onClose={() => {
                                                        const tags = valueArr.filter(e => e !== item)
                                                        onChange(tags.join(','))
                                                    }}
                >{item}</Tag>}
                {currentEditIndex === index &&
                <Input
                    key={index}
                    style={{display: 'inline-block', width: 80, marginRight: 8}}
                    type="text"
                    size="small"
                    maxLength={50}
                    ref={editInputRef}
                    value={editValue}
                    onChange={(e) => {
                        setEditValue(e.target.value)
                    }}
                    onBlur={(e) => {
                        handleEditInputConfirm(e.target.value, index)
                    }}
                    onPressEnter={(e) => {
                        handleEditInputConfirm(e.target.value, index)
                    }}
                />}
            </>
        })}
        {!showInput && !isMax && < Tag className="site-tag-plus" onClick={() => {
            setShowInput(true)
        }}>
            <Icon type="plus"/> 新增
        </Tag>}
        {showInput && <Input type="text"
                             size="small"
                             key={key}
                             ref={inputRef}
                             style={{display: 'inline-block', width: 80}}
                             value={inputValue}
                             onBlur={handleInputConfirm}
                             onPressEnter={handleInputConfirm}
                             maxLength={50}
                             onChange={(e) => {
                                 setInputValue(e.target.value)
                             }}
        />}
    </div>
}