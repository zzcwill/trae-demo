import React, {useState} from 'react'
import './index.scss'
import {uForm} from 'dora'
import {Table, Modal, message, Button} from 'dpl-react'
import {get, post} from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import sdkBreadCrumb from '@/components/consultManage/breadcrumb/sdkBreadCrumb'
import OperationBtn from "@/components/common/operationBtn/index";
import AddModal from './addModal'
import qs from 'qs'
import history from "@/history";

const {Breadcrumb, push} = sdkBreadCrumb

const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset} = uForm
export default function ProductManage(props) {
    const [channel, setChannel] = useState(() => {
        const obj = qs.parse(window.location.href.split('?')[1])
        return obj.id
    })
    const [addModalVisible, setAddModalVisible] = useState(false)
    const [currentItem, setCurrentItem] = useState({}) //当前操作的产品
    const columns = [
        {
            title: "产品系列名称",
            dataIndex: "seriesName",
            ellipsis: true,
        },
        {
            title: "产品名称",
            dataIndex: "systemName",
            ellipsis: true,
        },
        {
            title: "配置时间",
            dataIndex: "createDate",
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: "id",
            ellipsis: true,
            render(text, record, index) {
                const btnList = [
                    {
                        name: '删除',
                        color: 'red',
                        callback(id, item) {
                            Modal.confirm({
                                title: '确定删除该记录吗',
                                onOk: async () => {
                                    const res = await post({url: Api.consultSystemDelete, data: {id}})
                                    if (res.success) {
                                        trigger()
                                        message.success('删除成功')
                                    } else {
                                        message.error(res.message)
                                    }
                                }
                            })
                        }
                    },
                    {
                        name: '复制',
                        callback(a, item) {
                            const {id, ...other} = item
                            setCurrentItem({...other})
                            setAddModalVisible(true)
                        }
                    },
                    {
                        name: '编辑',
                        callback(id, item) {
                            setCurrentItem(item)
                            setAddModalVisible(true)
                        }
                    },
                    {
                        name: '进入',
                        callback(id, item) {
                            push('/consultManage/sdkManage/moduleManage?id=' + item.id)
                        }
                    },
                ]
                return <OperationBtn
                    className="center"
                    data={btnList}
                    text={text}
                    record={record}
                    index={index}
                    channel={channel}
                />
            }
        }
    ]
    const service = async ({values, pagination, sorter = {}, filters = {}}) => {
        const data = await get({
            url: Api.consultSystemList,
            params: {
                channel: channel,
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                ...values
            }
        })
        return {
            dataSource: data.data,
            pageSize: data.data.pageSize,
            total: data.data.total,
            current: data.data.pageIndex
        }
    }
    const {form, table, trigger} = useFormTableQuery(service, {pagination: {pageSize: 10}})
    table.pagination = false

    const addModalOkHandler = async (data) => {
        const {values} = data
        const trim = (str) => {
            if (typeof str === 'string' && str) {
                return str.trim()
            }
            return ''
        }
        const params = {
            seriesCode: trim(values.seriesCode),
            seriesName: trim(values.seriesName),
            systemCode: trim(values.systemCode),
            systemName: trim(values.systemName),
            description: values.description,
            channel: values.channel || channel,
            id: currentItem.id
        }
        const url = currentItem.id ? Api.consultSystemUpdate : Api.consultSystemSave
        const res = await post({url, data: params})
        if (res.success) {
            setAddModalVisible(false)
            trigger()
            message.success(currentItem.id ? '修改成功' : '新增成功')
        } else {
            message.error(res.message)
        }
    }
    return <div className='product-manage'>
        <Breadcrumb style={{marginBottom: 20}}/>

        <SchemaForm {...form} inline className='form-wrap'>
            <Field type='string'
                   title='产品系列名称'
                   name='seriesName'
                   x-component='Input'
                   x-component-props={{placeholder: '请输入产品系列名称'}}/>
            <Field type='string'
                   title='产品名称'
                   name='systemName'
                   x-component='Input'
                   x-component-props={{placeholder: '请输入产品名称'}}/>
            <Field type='array'
                   title='配置时间'
                   name='[startDate,endDate]'
                   x-component='RangePicker'
            />
            <FormButtonGroup>
                <Submit style={{marginRight: 10}}/>
                <Reset/>
            </FormButtonGroup>
        </SchemaForm>
        <div style={{paddingLeft: 20, paddingTop: 20, background: '#fff'}}>
            <Button type='primary' onClick={() => {
                setCurrentItem({})
                setAddModalVisible(true)
            }}>添加配置</Button>
        </div>
        <Table className='table-wrap' {...table} columns={columns}/>
        {addModalVisible && <AddModal
            visible={addModalVisible}
            onCancel={() => {
                setAddModalVisible(false)
            }}
            onOk={addModalOkHandler}
            id={currentItem.id}
            data={currentItem}
        />}
    </div>
}