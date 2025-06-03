import React, {useState} from 'react'
import {Button, Input, Checkbox,message} from 'dpl-react'
import up_icon from './image/up.png'
import down_icon from './image/down.png'
import './index.scss'

export default function SearchBtn(props, ref) {
    const {
        style,
        show = false,
        onSearch = () => {
        },
        onClick = () => {
        }
    } = props
    const [formData, setFormData] = useState({keyword: undefined, findRange: undefined})
    const rangeOptions = [
        {label: '标准问', value: 'RESUME'},
        {label: '问题描述', value: 'DESC'},
        {label: '回答', value: 'REPLY'}
    ]
    const searchHandler=()=>{
        if(!formData.keyword){
            message.error('请输入关键字')
            return
        }
        if(!formData.findRange){
            message.error('请选择查询范围')
            return
        }
        if(formData.findRange&&formData.findRange.length===0){
            message.error('请选择查询范围')
            return
        }
        onSearch(formData)
    }
    return (
        <div className='searchBtn' style={style}>
            <Button type={'primary-bordered'} className='btn' onClick={onClick}>
                <p>查找与替换</p>
                {show ? <img src={up_icon}/> : <img src={down_icon}/>}
            </Button>
            {show && <div className='search-content'>
                <div className='search-form'>
                    <div className='item'>
                        <span className='label'>查找内容：</span>
                        <div className='input-wrap'>
                            <Input placeholder='输入需要查找的内容'
                                   value={formData.keyword}
                                   onChange={(e) => {
                                       setFormData(Object.assign({}, formData, {keyword: e.target.value}))
                                   }}/>
                        </div>
                    </div>
                    <div className='item'>
                        <span className='label'>适用范围：</span>
                        <div className='input-wrap'>
                            <Checkbox.Group
                                options={rangeOptions}
                                value={formData.findRange}
                                onChange={(e) => {
                                    setFormData(Object.assign({}, formData, {findRange: e}))
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='btn-group'>
                    <Button type={'primary'} style={{marginRight: 8}}
                            onClick={() => {
                                searchHandler()
                            }}
                    >查找</Button>
                    <Button onClick={() => {
                        setFormData({})
                    }}>清空条件</Button>
                </div>
            </div>}
        </div>
    )
}