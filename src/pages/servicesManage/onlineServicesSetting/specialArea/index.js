import './index.scss'
import {uForm} from 'dora'
import React, {useState} from 'react'
import {get, post} from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import useFormQueryNoChangeParams from '@/hooks/useFormQueryNoChangeParams'
import {Button, Table, Modal, message} from 'dpl-react'
import AddModal from './addModal'

const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset} = uForm
export default function SpecialArea(props) {
    const [dispatchAndNoChangeParams, queryParamsMiddleware] = useFormQueryNoChangeParams()
    const columns = [
        {"title": "来源渠道", "dataIndex": "channelName", "ellipsis": true, "align": "center"},
        {"title": "地区名称", "dataIndex": "name", "ellipsis": true, "align": "center"},
        {"title": "地区代码", "dataIndex": "code", "ellipsis": true, "align": "center"},
        {"title": "最后修改人", "dataIndex": "modifierName", "ellipsis": true, "align": "center"},
        {
            "title": "操作",
            "dataIndex": "id",
            "ellipsis": true,
            "align": "center",
            render: function (text, record) {
                return <div className='operator'>
    <span
        onClick={() => {
            deleteHandler(record.id)
        }}>删除
    </span>
                    <span onClick={() => {
                        setShowModal(true)
                        setCurrentItem(record)
                    }}>修改</span>
                </div>
            }
        }
    ]
    const [showModal, setShowModal] = useState(false)
    const [currentItem, setCurrentItem] = useState(null)

    const service = async ({values, pagination, sorter = {}, filters = {}}) => {
        const data = await get({
            url: Api.specialLocationList,
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
            pageSize: 10,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50', '100'],
            showTotalInfo: true
        }
    }, [queryParamsMiddleware])
    const deleteHandler = (id) => {
        Modal.confirm({
            title: '提示',
            content: '是否确定删除该记录',
            onOk: async () => {
                const data = await post({url: Api.specialLocationDelete, data: {id}})
                if (data.success) {
                    dispatchAndNoChangeParams()
                    message.success('删除成功')
                } else {
                    message.error(data.message)
                }
            }
        })
    }


    return (
        <div className='special-area'>
            <SchemaForm {...form} inline className="query-form-by-render">
                <Field

                    name='name'
                    title='地区名称'
                    x-component='Input'
                    x-component-props={{"placeholder": "请输入地区名称", "allowClear": true}}/>
                <Field

                    name='code'
                    title='地区代码'
                    x-component='Input'
                    x-component-props={{"placeholder": "请输入地区代码", "allowClear": true}}/>
                <FormButtonGroup>
                    <Submit style={{marginRight: 10}}>查询</Submit>
                    <Reset>清空条件</Reset>
                </FormButtonGroup>
            </SchemaForm>

            <div className='operate-btn-by-render'>
                <Button type='primary' className="operate-btn-item" onClick={() => {
                    setCurrentItem(null)
                    setShowModal(true)
                }}>新增</Button>
            </div>
            <Table className='table-wrap-by-render'
                   {...table}
                   columns={columns}
                   rowKey={'id'}
            />
            <AddModal visible={showModal}
                      onCancel={() => {
                          setShowModal(false)
                          setCurrentItem(null)
                      }}
                      onOk={() => {
                          dispatchAndNoChangeParams()
                          setShowModal(false)
                          setCurrentItem(null)
                      }}
                      id={currentItem ? currentItem.id : undefined}
            />
        </div>
    )
}