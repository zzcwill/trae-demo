import React, {useState, useEffect} from 'react'
import './index.scss'
import {uForm} from "dora";
import {Button, message} from 'dpl-react'
import history from '@/history'
import {get, post} from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import qs from 'qs'

const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 15},
};
const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions} = uForm
const actions = createFormActions()

export default function __functionName(props) {
    const [id, setId] = useState(() => {
        const obj = qs.parse(window.location.href.split('?')[1])
        return obj.id
    })
    const [detail, setDetail] = useState({})
    const getDetail = async (id) => {
        const data = await get({url: Api.expertInstitutionDetail, params: {id}})
        if (data.success) {
            setDetail(data.data)
        }
    }
    const confirmHandler = () => {
        actions.submit().then(async value => {
            console.log(value.values)
            let data = null
            if (id) {
                data = await post({url: Api.xxx, data: {...value.values}})
            } else {
                data = await post({url: Api.xxx, data: {...value.values, id}})
            }
            if (!data) return
            if (data.success) {
                message.success(id ? '修改成功' : '新增成功')
            } else {
                message.error(data.message)
            }
        })
    }
    const cancelHandler = () => {
    }
    useEffect(() => {
        if (id) {
            getDetail(id)
        }
    }, [id])
    return (
        <div className='__className'>
            <SchemaForm actions={actions} initialValues={detail}>
                <Field
                    {...formItemLayout}
                    type='string'
                    title='account'
                    name='account'
                    x-component='Input'
                    x-component-props={{placeholder: '请输入'}}
                    x-rules={[{required: true, message: "必填项"}]}/>
            </SchemaForm>
            <div className='btn-group'>
                <Button type='primary' onClick={confirmHandler}>保存</Button>
                <Button onClick={cancelHandler} style={{marginLeft: 10}}>取消</Button>
            </div>
        </div>
    )
}