import './index.scss'
import React, {useState, useEffect} from 'react'
import {uForm} from 'dora'
import {Button, message, Input} from 'dpl-react'
import {get, post} from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import qs from 'qs'
import history from '@/history'
import TextArea from '@/components/common/textArea';

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
}
const formItemLayout2 = {
    labelCol: {span: 2},
    wrapperCol: {span: 22},
}
const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, Row, Col, FormSlot} = uForm
const actions = createFormActions()
export default function TestLinkCreate(props) {
    const [areaCodeOptions, setAreaCodeOptions] = useState([])
    const [channelOptions, setChannelOptions] = useState([])
    const [brandOptions, setBrandOptions] = useState([])
    const [link, setLink] = useState('')
    const getOptions = async () => {
        const res = await get({url: Api.getWdList})
        if (res.success) {
            const data = res.data;
            setAreaCodeOptions(data.location.map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            }));
            setBrandOptions(data.brand.map(item => {
                return {
                    label: item.name,
                    value: item.id
                }
            }))
        } else {
            message.error(res.message);
        }
    }
    const getEunm = async () => {
        const res = await get({url: Api.getEnumOptions, params: {groupNames: 'consult_channel'}})
        if (res.success) {
            res.data.forEach(item => {
                if (item.groupName === 'consult_channel') {
                    setChannelOptions(item.options.map(item => {
                        return {value: item.id, label: item.name}
                    }))
                }
            })
        }
    }
    const genLink = async () => {
        actions.submit().then(async (value) => {
            value = value.values
            try {
                value.extra = JSON.parse(value.extra)
            } catch (e) {
                message.error('额外参数格式错误，请输入json格式')
                return
            }

            const res = await post({url: Api.toolConsultUrl, data: value})
            if (res.success) {
                setLink(res.data)
                message.success('生成成功')
            } else {
                message.error(res.message)
            }
        })
    }
    useEffect(() => {
        getOptions()
        getEunm()
    }, [])
    return (
        <div className='test-link-create'>
            <div className='add-form-by-render'>
                <SchemaForm actions={actions} components={{TextArea}}
                            initialValues={{systemCode: 'TEST0000000000', extra: '{"seriesCode":"","taxType":""}'}}>
                    <Row>
                        <Col span={12}>
                            <Field
                                {...formItemLayout}
                                name='areaCode'
                                title='地区'
                                x-component='Select'
                                x-rules={[{message: '请选择地区', required: true}]}
                                x-component-props={{
                                    "placeholder": "请选择地区",
                                    "allowClear": true,
                                    "dataSource": areaCodeOptions,
                                    "showSearch": true,
                                    "optionFilterProp": "children",
                                    filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }}/>
                        </Col>
                        <Col span={12}>
                            <Field
                                {...formItemLayout}
                                name='systemCode'
                                title='产品代码'
                                x-component='Input'
                                x-rules={[{message: '请输入产品代码', required: true}]}
                                x-component-props={{"placeholder": "请输入产品代码", "allowClear": true}}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Field
                                {...formItemLayout}
                                name='channel'
                                title='渠道'
                                x-rules={[{message: '请选择渠道', required: true}]}
                                x-component='Select'
                                x-component-props={{
                                    "placeholder": "请选择渠道",
                                    "allowClear": true,
                                    "dataSource": channelOptions,
                                    "showSearch": true,
                                    "optionFilterProp": "children",
                                    filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }}/>
                        </Col>
                        <Col span={12}>
                            <Field
                                {...formItemLayout}
                                name='brand'
                                title='产品纬度'
                                x-component='Select'
                                x-component-props={{
                                    "placeholder": "请选择产品纬度",
                                    "allowClear": true,
                                    "dataSource": brandOptions,
                                    "showSearch": true,
                                    "optionFilterProp": "children",
                                    filterOption: (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Field
                                {...formItemLayout}
                                name='moduleCode'
                                title='模块ID'
                                x-component='Input'
                                x-component-props={{"placeholder": "请输入模块ID", "allowClear": true}}/>
                        </Col>
                        <Col span={12}>
                            <Field
                                {...formItemLayout}
                                name='buttonCode'
                                title='按钮ID'
                                x-component='Input'
                                x-component-props={{"placeholder": "请输入按钮ID", "allowClear": true}}/>
                        </Col>
                    </Row>
                    <FormSlot>
                        <h3>用户信息</h3>
                    </FormSlot>
                    <Field type='object' name='consultUserInfo'>
                        <Row>
                            <Col span={12}>
                                <Field
                                    {...formItemLayout}
                                    name='yhdm'
                                    title='企业税号'
                                    x-component='Input'
                                    x-component-props={{"placeholder": "请输入企业税号", "allowClear": true}}/>
                            </Col>
                            <Col span={12}>
                                <Field
                                    {...formItemLayout}
                                    name='yhmc'
                                    title='用户名称'
                                    x-component='Input'
                                    x-component-props={{"placeholder": "请输入用户名称", "allowClear": true}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Field
                                    {...formItemLayout}
                                    name='personaldm'
                                    title='个人代码'
                                    x-component='Input'
                                    x-component-props={{"placeholder": "请输入个人代码", "allowClear": true}}/>
                            </Col>
                            <Col span={12}>
                                <Field
                                    {...formItemLayout}
                                    name='personalmc'
                                    title='个人名称'
                                    x-component='Input'
                                    x-component-props={{"placeholder": "请输入个人名称", "allowClear": true}}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>

                                <Field
                                    {...formItemLayout}
                                    name='agencydm'
                                    title='机构代码'
                                    x-component='Input'
                                    x-component-props={{"placeholder": "请输入机构代码", "allowClear": true}}/>
                            </Col>
                            <Col span={12}>
                                <Field
                                    {...formItemLayout}
                                    name='agencymc'
                                    title='机构名称'
                                    x-component='Input'
                                    x-component-props={{"placeholder": "请输入机构名称", "allowClear": true}}/>
                            </Col>
                        </Row>
                    </Field>


                    <FormSlot>
                        <h3>场景信息</h3>
                    </FormSlot>
                    <Field type='object' name='sceneInfo'>
                        <Row>
                            <Col span={12}>
                                <Field
                                    {...formItemLayout}
                                    name='openMode'
                                    title='打开方式'
                                    x-component='Input'
                                    x-component-props={{
                                        "placeholder": "0：安全U盾 1：PC电脑 2：微信 3：手机APP",
                                        "allowClear": true
                                    }}/>
                            </Col>
                            <Col span={12}>
                                <Field
                                    {...formItemLayout}
                                    name='systemVersion'
                                    title='版本号'
                                    x-component='Input'
                                    x-component-props={{"placeholder": "请输入版本号", "allowClear": true}}/>
                            </Col>
                        </Row>
                        <Field
                            {...formItemLayout2}
                            name='moduleName'
                            title='频道名称'
                            x-component='Input'
                            x-component-props={{"placeholder": "请输入频道名称", "allowClear": true}}/>
                        <Field
                            {...formItemLayout2}
                            name='position'
                            title='菜单地址'
                            x-component='Input'
                            x-component-props={{"placeholder": "母菜单和子菜单之间用英文>>隔开", "allowClear": true}}/>
                        <Field
                            {...formItemLayout2}
                            name='errorMsg'
                            title='错误提示'
                            x-component='Input'
                            x-component-props={{"placeholder": "请输入错误提示", "allowClear": true}}/>
                    </Field>
                    <Field
                        {...formItemLayout2}
                        name='extra'
                        title='其他参数'
                        x-component='TextArea'
                        x-component-props={{"placeholder": "请输入其他参数", "allowClear": true, rows: 6}}/>

                </SchemaForm>
                <div className='btn-group'>
                    <Button type='primary' onClick={genLink}>生成链接</Button>
                </div>
                <Input.TextArea
                    style={{marginTop: 20}}
                    rows={6}
                    value={link}
                />
            </div>
        </div>
    )
}