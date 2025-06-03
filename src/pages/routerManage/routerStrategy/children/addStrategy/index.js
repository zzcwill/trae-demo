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

export default function AddStrategy(props) {
    const [id, setId] = useState(() => {
        const obj = qs.parse(window.location.href.split('?')[1])
        return obj.id
    })
    const [channel, setChannel] = useState([]) //策略适用渠道

    const [detail, setDetail] = useState({})
    const getDetail = async (id) => {
        const data = await get({url: Api.routePolicyDetail, params: {id}})
        if (data.success) {
            data.data.channelList = Array.isArray(data.data.channelList) ? data.data.channelList.map(item => item.id) : []
            setDetail(data.data)
        }
    }
    const getOptions = async () => {
        const data = await get({
            url: Api.getEnumOptions, params: {
                groupNames: 'consult_channel'
            }
        })
        let map = {
            'consult_channel': setChannel,
        }
        if (Array.isArray(data.data)) {
            data.data.forEach(item => {
                map[item.groupName] && map[item.groupName](item.options.map(item => {
                    return {label: item.name, value: item.id}
                }))
            })
        }
    }
    const confirmHandler = () => {
        actions.submit().then(async value => {
            let data = null
            let params = {
                channelList: value.values.channelList,
                remark: value.values.remark,
                name: value.values.name
            }
            if (id) {
                data = await post({url: Api.routePolicyUpdate, data: {...params, id}})
            } else {
                data = await post({url: Api.routePolicySave, data: {...params}})
            }
            if (!data) return
            if (data.success) {
                message.success(id ? '修改成功' : '新增成功')
                history.push('/routerManage/routerStrategy')
            } else {
                message.error(data.message)
            }
        })
    }
    const cancelHandler = () => {
        history.push('/routerManage/routerStrategy')
    }
    useEffect(() => {
        getOptions()
    }, [])
    useEffect(() => {
        if (id) {
            getDetail(id)
        }
    }, [id])
    return (
        <div className='add-strategy'>
            <div className='title'>{id ? '修改策略' : '新增策略'}</div>
            <SchemaForm actions={actions} initialValues={detail}>
                <Field
                    {...formItemLayout}
                    type='string'
                    title='策略名称'
                    name='name'
                    x-component='Input'
                    x-component-props={{placeholder: '请输入策略名称', maxLength: 20}}
                    x-rules={[{required: true, message: "请输入策略名称"}]}/>
                <Field
                    {...formItemLayout}
                    type='string'
                    title='备注'
                    name='remark'
                    x-component='Input'
                    x-component-props={{placeholder: '请输入备注', maxLength: 100}}
                />
                <Field type='string'
                       {...formItemLayout}
                       title='来源渠道'
                       name='channelList'
                       x-component='Select'
                       x-component-props={{placeholder: '请选择来源渠道', dataSource: channel, mode: 'multiple'}}
                       x-rules={[{required: true, message: "请选择来源渠道"}]}
                />
            </SchemaForm>
            <div className='btn-group'>
                <Button type='primary' onClick={confirmHandler}>保存</Button>
                <Button onClick={cancelHandler} style={{marginLeft: 10}}>取消</Button>
            </div>
        </div>
    )
}