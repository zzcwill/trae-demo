import React, {useEffect, useState} from "react";
import {uForm, UploadImage} from 'dora'
import './index.scss'
import Api from '@/request/api-olhelpmanage'
import {get, post, postFile} from '@/request/request'
import {Button, message, Switch} from 'dpl-react'
import Advert from './advert'

const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormSlot} = uForm
const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18},
};
const actions = createFormActions()
const toolbarOptions = [
    {label: '字体', value: '0'},
    {label: '表情', value: '1'},
    {label: '截屏', value: '2'},
    {label: '文件发送', value: '3'},
    {label: '保存记录', value: '4'},
    {label: '声音', value: '5'},
]
const mobileToolbarOptions = [
    {label: '结束对话', value: '6'},
    {label: '表情', value: '1'},
    {label: '图片', value: '7'},
    {label: '声音', value: '5'},
]
export default function ManMachineRoute(props) {
    const [detail, setDetail] = useState(null)
    const [pcAvatarEnable, setPcAvatarEnable] = useState(false)
    const [mobileAvatarEnable, setMobileAvatarEnable] = useState(false)
    const getDetail = async function () {
        const data = await get({url: Api.globalWindowDetail})

        function genImageUrl(url) {
            return url ? [{imageUrl: url}] : []
        }

        if (data.success) {
            data.data.pcConfig.carouselSlideEnable = data.data.pcConfig.carouselSlideEnable === 'Y'
            data.data.pcConfig.bubbleEnable = data.data.pcConfig.bubbleEnable === 'Y'
            data.data.pcConfig.avatarEnable = data.data.pcConfig.avatarEnable === 'Y'
            setPcAvatarEnable(data.data.pcConfig.avatarEnable)
            data.data.pcConfig.logoImageUrl = genImageUrl(data.data.pcConfig.logoImageUrl)
            data.data.pcConfig.robotAvatar = genImageUrl(data.data.pcConfig.robotAvatar)
            data.data.pcConfig.agentAvatar = genImageUrl(data.data.pcConfig.agentAvatar)
            data.data.pcConfig.visitorAvatar = genImageUrl(data.data.pcConfig.visitorAvatar)
            data.data.mobileConfig.robotAvatar = genImageUrl(data.data.mobileConfig.robotAvatar)
            data.data.mobileConfig.agentAvatar = genImageUrl(data.data.mobileConfig.agentAvatar)
            data.data.mobileConfig.visitorAvatar = genImageUrl(data.data.mobileConfig.visitorAvatar)
            data.data.mobileConfig.avatarEnable = data.data.mobileConfig.avatarEnable === 'Y'
            setMobileAvatarEnable(data.data.mobileConfig.avatarEnable)
            data.data.pcConfig.advert = {
                adType: data.data.pcConfig.adType ? data.data.pcConfig.adType : '0',
                adUrl: data.data.pcConfig.adUrl,
                adJumpUrl: data.data.pcConfig.adJumpUrl,
                sliderImageId: data.data.pcConfig.sliderImageId,
            }
            setDetail(data.data)
        } else {
            message.error(data.message)
        }
    }
    const submit = function () {
        actions.submit().then(async data => {
            let values = data.values
            console.log(values)

            function getImageUrl(a) {
                if (Array.isArray(a) && a.length > 0) {
                    return a[0].imageUrl
                } else {
                    return ''
                }
            }

            values.pcConfig.logoImageUrl = getImageUrl(values.pcConfig.logoImageUrl)
            values.pcConfig.robotAvatar = getImageUrl(values.pcConfig.robotAvatar)
            values.pcConfig.agentAvatar = getImageUrl(values.pcConfig.agentAvatar)
            values.pcConfig.visitorAvatar = getImageUrl(values.pcConfig.visitorAvatar)

            values.pcConfig.carouselSlideEnable = values.pcConfig.carouselSlideEnable ? 'Y' : 'N'
            values.pcConfig.avatarEnable = values.pcConfig.avatarEnable ? 'Y' : 'N'
            values.pcConfig.bubbleEnable = values.pcConfig.bubbleEnable ? 'Y' : 'N'

            values.pcConfig = {...values.pcConfig, ...values.pcConfig.advert}
            delete values.pcConfig.advert
            values.mobileConfig.robotAvatar = getImageUrl(values.mobileConfig.robotAvatar)
            values.mobileConfig.agentAvatar = getImageUrl(values.mobileConfig.agentAvatar)
            values.mobileConfig.visitorAvatar = getImageUrl(values.mobileConfig.visitorAvatar)
            values.mobileConfig.avatarEnable = values.mobileConfig.avatarEnable ? 'Y' : 'N'

            const response = await post({url: Api.globalWindowSave, data: values})
            if (response.success) {
                message.success('保存成功')
            } else {
                message.success(response.message)
            }
        })
    }
    const uploadHandler = async (files) => {
        const data = await postFile(Api.saveImage, {data: {file: files[0]}})
        return [{
            imageUrl: data.data.domain + data.data.imageUrl,
            name: data.data.name
        }]
    }
    useEffect(() => {
        getDetail()
    }, [])
    return (
        <div>
            {detail ?
                <SchemaForm className='global-window-page'
                            components={{UploadImage, Advert}}
                            initialValues={detail}
                            actions={actions}
                >
                    <FormSlot>
                        <div className='box-title'>PC访客端</div>
                    </FormSlot>
                    <Field type='object' name={'pcConfig'}>
                        <Field type='string'
                               name='name'
                               x-component='Input'
                               title='窗口名称'
                               {...formItemLayout}
                               x-component-props={{placeholder: '请输入窗口名称', maxLength: 20}}
                               x-rules={[{required: true, message: '请输入窗口名称'}]}
                        />
                        <Field type='string'
                               name='carousel'
                               x-component='Input'
                               title='跑马灯'
                               {...formItemLayout}
                               x-component-props={{placeholder: '请输入跑马灯',maxLength:200}}
                        />
                        <Field type='array'
                            {...formItemLayout}
                            title='配置时间'
                            name='[carouselStartDate,carouselEndDate]'
                            x-component='RangePicker'
                            x-component-props={{
                            "allowClear": true
                            }}
                        />
                        <Field type='string'
                               name='carouselSlideEnable'
                               x-component='Switch'
                               title='滚动显示'
                               {...formItemLayout}
                               x-component-props={{placeholder: '请输入滚动显示'}}
                        />
                        <Field
                            {...formItemLayout}
                            type='string'
                            title='LOGO图片'
                            name='logoImageUrl'
                            x-component='UploadImage'
                            x-component-props={{
                                maxLength: 1,
                                multiple: false,
                                acceptTypes: ['png', 'jpg', 'jpeg', 'bmp'],
                                mapKey: 'imageUrl',
                                onUpload: uploadHandler,
                                maxSize: 1024 * 1024,
                                onSizeCheckError() {
                                    message.error('仅支持小于1MB的图片')
                                }
                            }}
                            x-rules={[{required: true, message: '请上传LOGO图片'}]}
                        />
                        <Field type='object'
                               name='advert'
                               x-component='Advert'
                               title='右侧广告'
                               {...formItemLayout}
                               x-rules={(value) => {
                                   if (value.adType == '0') {
                                       if (!value.adUrl) {
                                           return {type: 'error', message: '请上传图片'}
                                       }
                                   }
                                   if (value.adType == '1' && !value.sliderImageId) {
                                       return {type: 'error', message: '请选择轮播图'}
                                   }
                               }}

                        />
                        <Field name='customerServiceButtonEnable' title='转人工按钮'
                               x-component='RadioGroup'
                               {...formItemLayout}
                               x-component-props={{options: [{label: '显示', value: 'Y'}, {label: '不显示', value: 'N'}]}}
                               required
                        />
                        <Field type='string'
                               name='bubbleEnable'
                               x-component='Switch'
                               title='气泡模式'
                               required
                               {...formItemLayout}
                               x-component-props={{placeholder: '请输入气泡模式'}}
                        />
                        <Field type='string'
                               name='avatarEnable'
                               x-component='Switch'
                               title='显示头像'
                               required
                               {...formItemLayout}
                               x-component-props={{
                                   placeholder: '请输入显示头像', onChange: (e) => {
                                       setPcAvatarEnable(e)
                                   }
                               }}
                        />
                        {pcAvatarEnable && <>
                            <Field
                                {...formItemLayout}
                                type='string'
                                title='机器人头像'
                                name='robotAvatar'
                                x-component='UploadImage'
                                x-component-props={{
                                    maxLength: 1,
                                    multiple: false,
                                    acceptTypes: ['png', 'jpg', 'jpeg', 'bmp'],
                                    mapKey: 'imageUrl',
                                    onUpload: uploadHandler,
                                    maxSize: 1024 * 1024,
                                    onSizeCheckError() {
                                        message.error('仅支持小于1MB的图片')
                                    }
                                }}
                                x-rules={[{required: true, message: '请上传机器人头像'}]}
                            />
                            <Field
                                {...formItemLayout}
                                type='string'
                                title='客服头像'
                                name='agentAvatar'
                                x-component='UploadImage'
                                x-component-props={{
                                    maxLength: 1,
                                    multiple: false,
                                    acceptTypes: ['png', 'jpg', 'jpeg', 'bmp'],
                                    mapKey: 'imageUrl',
                                    onUpload: uploadHandler,
                                    maxSize: 1024 * 1024,
                                    onSizeCheckError() {
                                        message.error('仅支持小于1MB的图片')
                                    }
                                }}
                                x-rules={[{required: true, message: '请上传客服头像'}]}
                            />
                            <Field
                                {...formItemLayout}
                                type='string'
                                title='访客头像'
                                name='visitorAvatar'
                                x-component='UploadImage'
                                x-component-props={{
                                    maxLength: 1,
                                    multiple: false,
                                    acceptTypes: ['png', 'jpg', 'jpeg', 'bmp'],
                                    mapKey: 'imageUrl',
                                    onUpload: uploadHandler,
                                    maxSize: 1024 * 1024,
                                    onSizeCheckError() {
                                        message.error('仅支持小于1MB的图片')
                                    }
                                }}
                                x-rules={[{required: true, message: '请上传访客头像'}]}
                            />
                        </>}
                        <Field
                            {...formItemLayout}
                            type='string'
                            title='工具栏配置'
                            name='toolbar'
                            x-component='CheckboxGroup'
                            x-component-props={{options: toolbarOptions}}
                            x-rules={[{required: true, message: "请选择"}]}
                        />
                    </Field>
                    <FormSlot>
                        <div className='box-line'></div>
                        <div className='box-title'>手机访客端</div>
                    </FormSlot>

                    <Field type='object' name='mobileConfig'>
                        <Field type='string'
                               name='avatarEnable'
                               x-component='Switch'
                               title='显示头像'
                               {...formItemLayout}
                               x-component-props={{
                                   placeholder: '请输入气泡模式', onChange(e) {
                                       setMobileAvatarEnable(e)
                                   }
                               }}
                               required
                        />
                        {mobileAvatarEnable && <>
                            <Field
                                {...formItemLayout}
                                type='string'
                                title='机器人头像'
                                name='robotAvatar'
                                x-component='UploadImage'
                                x-component-props={{
                                    maxLength: 1,
                                    multiple: false,
                                    acceptTypes: ['png', 'jpg', 'jpeg', 'bmp'],
                                    mapKey: 'imageUrl',
                                    onUpload: uploadHandler,
                                    maxSize: 1024 * 1024,
                                    onSizeCheckError() {
                                        message.error('仅支持小于1MB的图片')
                                    }
                                }}
                                x-rules={[{required: true, message: '请上传机器人头像'}]}
                            />
                            <Field
                                {...formItemLayout}
                                type='string'
                                title='客服头像'
                                name='agentAvatar'
                                x-component='UploadImage'
                                x-component-props={{
                                    maxLength: 1,
                                    multiple: false,
                                    acceptTypes: ['png', 'jpg', 'jpeg', 'bmp'],
                                    mapKey: 'imageUrl',
                                    onUpload: uploadHandler,
                                    maxSize: 1024 * 1024,
                                    onSizeCheckError() {
                                        message.error('仅支持小于1MB的图片')
                                    }
                                }}
                                x-rules={[{required: true, message: '请上传客服头像'}]}
                            />
                            <Field
                                {...formItemLayout}
                                type='string'
                                title='访客头像'
                                name='visitorAvatar'
                                x-component='UploadImage'
                                x-component-props={{
                                    maxLength: 1,
                                    multiple: false,
                                    acceptTypes: ['png', 'jpg', 'jpeg', 'bmp'],
                                    mapKey: 'imageUrl',
                                    onUpload: uploadHandler,
                                    maxSize: 1024 * 1024,
                                    onSizeCheckError() {
                                        message.error('仅支持小于1MB的图片')
                                    }
                                }}
                                x-rules={[{required: true, message: '请上传访客头像'}]}
                            />
                        </>}
                        <Field
                            {...formItemLayout}
                            type='string'
                            title='工具栏配置'
                            name='toolbar'
                            x-component='CheckboxGroup'
                            x-component-props={{options: mobileToolbarOptions}}
                            x-rules={[{required: true, message: "请选择"}]}
                        />
                        <Field type='string'
                               x-component='Input'
                               title='对话结束跳转到'
                               {...formItemLayout}
                               name='jumpUrlAfterFinished'
                               maxLength={1000}/>
                    </Field>

                </SchemaForm> : null}

            <div className='btn-group'>
                <Button type='primary' onClick={submit}>提交</Button>
            </div>
        </div>
    )
}
