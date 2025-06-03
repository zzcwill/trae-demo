import React, {useEffect, useState} from 'react'
import './index.scss'
import {uForm} from 'dora'
import {Button, Table} from 'dpl-react'
import {get} from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import history from "@/history";
import sdkBreadCrumb from '@/components/consultManage/breadcrumb/sdkBreadCrumb'

const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset} = uForm
const {Breadcrumb, push} = sdkBreadCrumb
export default function ChannelManage(props) {
    const [list, setList] = useState([])
    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
            title: "渠道代码",
            dataIndex: "id",
            ellipsis: true,
        },
        {
            title: "渠道名称",
            dataIndex: "name",
            ellipsis: true,
        },
        {
            title: '操作',
            dataIndex: "id",
            ellipsis: true,
            render(text) {
                return <div style={{color: '#39f', cursor: 'pointer'}} onClick={() => {
                    push('/consultManage/sdkManage/productManage?id=' + text)
                }}>进入</div>
            }
        }
    ]
    const getList = async () => {
        const NAME = 'consult_channel'
        const res = await get({url: Api.getEnumOptions, params: {groupNames: NAME}})
        if (res.success) {
            res.data.forEach(item => {
                if (item.groupName === NAME) {
                    item.options.sort((a, b) => {
                        try {
                            return Number(a.id) - Number(b.id)
                        } catch (e) {
                            return 0
                        }
                    })
                    setList(item.options)
                    setDataSource(item.options)
                }
            })
        }
    }

    useEffect(() => {
        getList()
    }, [])
    return <div className='channel-manage'>
        <Breadcrumb style={{marginBottom: 20}}/>
        <SchemaForm inline className='form-wrap'
                    onSubmit={(e) => {
                        if (e && e.keyword) {
                            setDataSource(list.filter(item => {
                                return item.name.indexOf(e.keyword) >= 0
                            }))
                        } else {
                            setDataSource([...list])
                        }

                    }}
                    onReset={(e) => {
                        setDataSource([...list])
                    }}
        >
            <Field type='string'
                   title='渠道名称'
                   name='keyword'
                   x-component='Input'
                   x-component-props={{placeholder: '请输入渠道名称'}}/>
            <FormButtonGroup>
                <Submit style={{marginRight: 10}}>搜索</Submit>
                <Reset/>
            </FormButtonGroup>
        </SchemaForm>
        <Table className='table-wrap' pagination={false} dataSource={dataSource} columns={columns}/>
    </div>
}