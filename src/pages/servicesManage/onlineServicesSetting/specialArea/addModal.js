import React, {useEffect, useRef, useState} from 'react'
import {uForm} from 'dora'
import {message, Modal} from 'dpl-react'
import {get, post} from "@/request/request";
import Api from '@/request/api-olhelpmanage'

const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    Row,
    Col,
    createFormActions,
    FormEffectHooks
} = uForm
const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
}
const actions = createFormActions()

const {onFieldValueChange$} = FormEffectHooks
export default function AddModal(props) {
    const {visible, onOk, onCancel, id} = props
    const [detail, setDetail] = useState({channelList: ['__all']})
    const [channelList, setChannelList] = useState([])
    const [loading, setLoading] = useState(true)
    const getDetail = async (id) => {
        const res = await get({url: Api.specialLocationDetail, params: {id}})
        if (res.success) {
            res.data.channelList = [res.data.channel === 'ALL' ? '__all' : res.data.channel]
            setDetail(res.data)
        } else {
            message.error(res.message)
        }
    }
    const getChannelList = async () => {
        const res = await get({url: Api.getEnumOptions, params: {groupNames: 'consult_channel'}})
        if (res.success) {
            res.data.forEach(item => {
                if (item.groupName === 'consult_channel') {
                    const list = item.options.map(a => {
                        return {
                            value: a.id,
                            label: a.name
                        }
                    })
                    list.unshift({label: '全部', value: '__all'})
                    setChannelList(list)
                }
            })
        }
    }
    const preChannelListValue = useRef([])
    const formEffect = () => {
        onFieldValueChange$('channelList').subscribe(({value}) => {
            const allIndex = value.indexOf('__all')
            if (allIndex >= 0 && preChannelListValue.current.indexOf('__all') < 0) { //选择全部
                actions.setFieldValue('channelList', ['__all'], true)
                preChannelListValue.current = ['__all']
            } else if (allIndex >= 0 && preChannelListValue.current.indexOf('__all') >= 0) {//之前选中全部，现在去选择其他选项
                value.splice(allIndex, 1)
                preChannelListValue.current = value
                actions.setFieldValue('channelList', value, true)
            } else {
                preChannelListValue.current = value
            }

        })
    }
    const okHandler = () => {
        actions.submit().then(async data => {
            const {values} = data
            if (values.channelList.indexOf('__all') >= 0) {
                delete values.channelList
            }
            const url = id ? Api.specialLocationUpdate : Api.specialLocationSave
            const res = await post({
                url: url, data: {
                    id,
                    channelList: values.channelList,
                    name: values.name,
                    code: values.code
                }
            })
            if (res.success) {
                onOk()
                message.success(id ? '修改成功' : '删除成功')
            } else {
                message.error(res.message)
            }
        })
    }
    useEffect(() => {
        async function init() {
            setLoading(true)
            if (id) {
                await getDetail(id)
            } else {
                setDetail({channelList: ['__all']})
            }
            setLoading(false)
        }

        init()
    }, [id])
    useEffect(() => {
        getChannelList()
    }, [])
    return <Modal title={id ? '修改' : '新增'}
                  visible={visible}
                  onCancel={() => {
                      // setDetail({})
                      onCancel()
                  }}
                  onOk={okHandler}
                  width={650}
    >
        {visible && !loading && <SchemaForm initialValues={detail} actions={actions} effects={() => {
            formEffect()
        }}>
            <Row>
                <Col span={12}>
                    <Field type='string'
                           name='name'
                           {...formItemLayout}
                           title='地区名称'
                           x-component='Input'
                           x-component-props={{placeholder: '请输入地区名称', maxLength: 10}}
                           x-rules={[{message: '请输入地区名称', required: true}]}
                    />
                </Col>
                <Col span={12}>
                    <Field type='string'
                           name='code'
                           title='地区代码'
                           {...formItemLayout}
                           x-component='Input'
                           x-component-props={{placeholder: '请输入地区代码', maxLength: 10}}
                           x-rules={[{message: '请输入地区代码', required: true}]}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Field type='array'
                           name='channelList'
                           title='来源渠道'
                           {...formItemLayout}
                           x-component='Select'
                           x-component-props={{
                               placeholder: '请选择来源渠道',
                               dataSource: channelList,
                               mode: 'multiple',
                               filterOption: (input, option) => {
                                   return option.props.title.indexOf(input) >= 0
                               }
                           }}
                    />
                </Col>
            </Row>
        </SchemaForm>}
    </Modal>
}