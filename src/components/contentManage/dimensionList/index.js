import React, {useEffect, useState} from "react";
import './index.scss'
import DimensionPopover from "@/components/common/dimensionPopover";

export default function DimensionList(props) {
    const {list = []} = props
    const [dimension, setDimension] = useState({
        'location': {type: 'location', list: []},
        'profession': {type: 'profession', list: []},
        'grade': {type: 'grade', list: []},
    })
    useEffect(() => {
        let obj = dimension
        Array.isArray(list) && list.forEach(item => {
            if (obj[item.type]) {
                obj[item.type].list = item.list
            }
        })
        setDimension(Object.assign({}, obj))
    }, [list])
    const region = dimension['location'].list
    const profession = dimension['profession'].list
    const grade = dimension['grade'].list
    return (
        <div className='dimension-label'>
            {region.length > 0 && <DimensionPopover list={region} type={'location'}>
                <span className='dimension-span'>{
                    region.length === 1 ? region[0].name : ` ${region.length}地区`
                }</span>
            </DimensionPopover>}
            {profession.length > 0 && <DimensionPopover list={profession} type={'profession'}>
                <span className='dimension-span'>{
                    profession.length === 1 ? profession[0].name : ` ${profession.length}行业`
                }</span>
            </DimensionPopover>}
            {grade.length > 0 && <DimensionPopover list={grade} type={'grade'}>
                <span className='dimension-span'>{
                    grade.length === 1 ? grade[0].name : ` ${grade.length}分级`
                }</span>
            </DimensionPopover>}
        </div>
    )
}