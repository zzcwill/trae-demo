import React, {useEffect, useState} from "react";
import {Checkbox} from "dpl-react";

const noop = () => {
}
export default function DimensionCheck(props) {
    const {
        list = [], value, onChange = noop,
        disabled = false
    } = props
    const [all, setALL] = useState({})
    const [dimensionList, setDimensionList] = useState([])
    const [codeList, setCodeList] = useState([])
    const [checkedList, setCheckedList] = useState([])
    const allCheckHandler = (e) => {
        const checked = e.target.checked
        if (checked) {
            const result = codeList
            setCheckedList([...result])
            onChange([all.code])
        } else {
            setCheckedList([])
            onChange()
        }
    }
    const checkHandler = (checked, code) => {
        const index = checkedList.indexOf(code)
        if (checked && index < 0) {
            const result = [...checkedList, code]
            setCheckedList(result)
            if (result.length === dimensionList.length) { // 全部选中
                onChange([all.code])
            } else {
                onChange(result)
            }
            return
        }
        if (!checked && index >= 0) {
            checkedList.splice(index, 1)
            const result = [...checkedList]
            setCheckedList(result)
            if (result.length === 0) { //全部取消
                onChange()
            } else {
                onChange(result)
            }
        }
    }
    useEffect(() => {
        if (list.length > 0) {
            setALL(list[0])
            const result = list.slice(1, list.length )
            setDimensionList(result)
            setCodeList(result.map(item => item.code))
        }
    }, [list])
    useEffect(() => {
        if (value) {
            if (value[0] === all.code) {
                setCheckedList([...codeList])
            } else {
                setCheckedList([...value])
            }
        } else {
            setCheckedList([])
        }
    }, [value])
    return (
        <div className='dimension-check'>
            <div className='all'>
                <Checkbox value={all.code}
                          checked={checkedList.length > 0 && checkedList.length === dimensionList.length}
                          onChange={allCheckHandler}
                          disabled={disabled}
                >{all.name}</Checkbox>
            </div>
            <div className='list'>
                {dimensionList.map(item => {
                    return <Checkbox value={item.code}
                                     className={'check-box'}
                                     checked={checkedList.indexOf(item.code) >= 0}
                                     onChange={(e) => {
                                         checkHandler(e.target.checked, item.code)
                                     }}
                                     key={item.code}
                                     disabled={disabled}
                    >
                        <span title={item.name}>{item.name}</span></Checkbox>
                })}
            </div>
        </div>
    )
}