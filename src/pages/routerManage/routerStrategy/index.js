import React, {useEffect, useState, useRef} from 'react'
import './index.scss'
import {uForm} from 'dora'
import {Modal, Table, message, Button} from 'dpl-react'
import {get, post} from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import useFormQueryNoChangeParams from "@/hooks/useFormQueryNoChangeParams";
import history from "@/history";

const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset} = uForm
export default function RouterStrategy(props) {
    const [channel, setChannel] = useState([]) //策略适用渠道
    const [dispatchAndNoChangeParams, queryParamsMiddleware] = useFormQueryNoChangeParams()
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
    useEffect(() => {
        getOptions()
    }, [])
    const columns = [
        {
            title: "咨询渠道",
            dataIndex: "channelList",
            ellipsis: true,
            align: "left",
            width:240,
            render(text, record) {
                let result = text.map(item => item.name).join(',')
                return <span title={result}>{result}</span>
            }
        },
        {
            title: "适用策略ID",
            dataIndex: "id",
            ellipsis: true,
            align: "center",
            width:100
        },
        {
            title: "适用策略名称",
            dataIndex: "name",
            ellipsis: true,
            align: "left",
            width:240,
        },
        {
            title: "备注",
            dataIndex: "remark",
            ellipsis: true,
            align: "left",
        },
        {
            title: "操作",
            dataIndex: "name",
            ellipsis: true,
            align: "center",
            width:100,
            render(text, record) {
                return <div className='operator'>
                    <span onClick={() => {
                        window.open( window.location.href.split("#")[0]+'#/routerManage/routerStrategy/addStrategy?id=' + record.id)
                    }}>修改</span>
                    <span onClick={() => {
                        deleteHandler(record.id)
                    }}>删除</span>
                </div>
            }
        },
    ]
    const service = async ({values, pagination, sorter = {}, filters = {}}) => {
        const data = await get({
            url: Api.routePolicyList,
            params: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                ...values
            }
        })
        return {
            dataSource: data.data.list,
            pageSize: data.data.pageSize,
            total: data.data.total,
            current: data.data.pageIndex
        }
    }
    const {form, table} = useFormTableQuery(service, {
        pagination: {
            pageSize: 20,
            showQuickJumper: true,
            showSizeChanger: true
        }
    }, [queryParamsMiddleware])
    const deleteHandler = (id) => {
        Modal.confirm({
            title: '提示',
            content: '是否确定删除该记录',
            onOk: async () => {
                const data = await post({url: Api.routePolicyDelete, data: {id}})
                if (data.success) {
                    dispatchAndNoChangeParams()
                    message.success('删除成功')
                } else {
                    message.error(data.message)
                }
            }
        })
    }

    return <div className='router-strategy'>
        <SchemaForm {...form} inline className='form-wrap'>
            <Field type='string'
                   title='策略名称'
                   name='name'
                   x-component='Input'
                   x-component-props={{placeholder: '请输入策略名称'}}/>
            <Field type='string'
                   title='来源渠道'
                   name='channel'
                   x-component='Select'
                   x-component-props={{placeholder: '请选择来源渠道', dataSource: channel,allowClear:true}}/>
            <FormButtonGroup>
                <Submit style={{marginRight: 10}}/>
                <Reset/>
            </FormButtonGroup>
        </SchemaForm>
        <div className='btn-wrap'><Button type='primary' onClick={() => {
            window.open( window.location.href.split("#")[0]+'#/routerManage/routerStrategy/addStrategy')
        }}>新增策略</Button></div>
        <Table className='table-wrap' {...table} columns={columns}/>
    </div>
}