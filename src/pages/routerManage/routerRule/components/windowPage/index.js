import Advert from "@/pages/routerManage/routerRule/components/windowPage/advert";
import Api from '@/request/api-olhelpmanage';
import { get, post, postFile } from "@/request/request";
import { uForm, UploadImage } from 'dora';
import { message, Modal, Switch } from "dpl-react";
import { useEffect, useState } from "react";
import './index.scss';

function CustomerSwitch(props) {
    const {value, onChange, ...rest} = props
    return <Switch checked={value} onChange={onChange} {...rest}/>
}

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 15},
};
const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormSlot, FormEffectHooks} = uForm
const actions = createFormActions()
const {onFieldValueChange$} = FormEffectHooks
const toolbarOptions = [
    {label: '字体', value: '0'},
    {label: '表情', value: '1'},
    {label: '截屏', value: '2'},
    {label: '文件发送', value: '3'},
    {label: '保存记录', value: '4'},
    {label: '声音', value: '5'},
]
export default function WindowPage(props) {
    const {visible, onOk, onCancel, id} = props
    const [type, setType] = useState('0')
    const [detail, setDetail] = useState(null)
    const getDetail = async (id) => {
        const data = await get({url: Api.routeRuleWindowDetail, params: {ruleId: id}})
        if (data.success) {
            data.data.carouselSlideEnable = data.data.carouselSlideEnable === 'Y'
            //  data.data.customerServiceButtonEnable = data.data.customerServiceButtonEnable === 'Y'
            data.data.logoImageUrl = data.data.logoImageUrl ? [{imageUrl: data.data.logoImageUrl}] : []
            data.data.advert = {
                adType: data.data.adType ? data.data.adType : '0',
                adUrl: data.data.adUrl,
                adJumpUrl: data.data.adJumpUrl,
                sliderImageId: data.data.sliderImageId
            }
            setType(data.data.type)
            setDetail(data.data)
        }
    }
    const uploadHandler = async (files) => {
        const data = await postFile(Api.saveImage, {data: {file: files[0]}})
        return [{
            imageUrl: data.data.domain + data.data.imageUrl,
            name: data.data.name
        }]
    }
    const okHandler = async () => {
        let params = {}
        if (type == '0') {
            params = {
                ruleId: id,
                type: type,
            }
        } else {
            let values = await actions.submit()
            values = values.values
            params = {
                ruleId: id,
                type: values.type,
                name: values.name,
                carousel: values.carousel ? values.carousel.trim() : '',
                carouselSlideEnable: values.carouselSlideEnable ? 'Y' : 'N',
                carouselStartDate: values.carouselStartDate || undefined,
                carouselEndDate: values.carouselEndDate || undefined,
                logoImageUrl: values.logoImageUrl && values.logoImageUrl.length > 0 ? values.logoImageUrl[0].imageUrl : '',
                adType: values.advert.adType,
                adUrl: values.advert.adUrl,
                adJumpUrl: values.advert.adJumpUrl,
                sliderImageId: values.advert.sliderImageId,
                customerServiceButtonEnable: values.customerServiceButtonEnable,
                toolbar: values.toolbar
            }
        }
        const data = await post({
            url: Api.routeRuleWindowSave, data: params
        })
        if (data && data.success) {
            message.success('保存成功')
            onOk && onOk()
        } else {
            message.error(data.message)
        }
    }
    const doNotValid = () => { //type为全局配置时不校验
        onFieldValueChange$('type').subscribe((state) => {
            if (state.value == '0') {
                actions.setFieldState('*', (stateA) => {
                    stateA.errors = []
                    stateA.valid = true
                    stateA.invalid = false
                    stateA.ruleErrors = []
                })
            }
        })
    }
    useEffect(() => {
        if (visible) {
            getDetail(id)
        } else {
            setDetail(null)
        }
    }, [visible, id])
    return <div className='window-page'>
        <Modal title='窗口界面' visible={visible} onCancel={onCancel} onOk={okHandler} width={800}
               className='window-page-modal'>
            {detail &&
            <SchemaForm components={{CustomerSwitch, UploadImage, Advert}}
                        initialValues={detail}
                        actions={actions}
                        effects={() => {
                            doNotValid()
                        }}
            >
                <Field
                    {...formItemLayout}
                    type='string'
                    title='是否使用全局设置'
                    name='type'
                    x-component='RadioGroup'
                    x-component-props={{
                        options: [{label: '使用全局设置', value: '0'}, {label: '差异化设置', value: '1'}],
                        onChange(e) {
                            setType(e.target.value)
                        }
                    }}
                    x-rules={[{required: true, message: "请选择"}]}/>
                <Field
                    {...formItemLayout}
                    type='string'
                    title='窗口名称'
                    name='name'
                    x-component='Input'
                    x-component-props={{
                        placeholder: '智能咨询',
                        maxLength: 20,
                        disabled: type == '0'
                    }}
                    x-rules={[{required: true, message: "请输入窗口名称"}]}
                />
                <Field
                    {...formItemLayout}
                    type='string'
                    title='跑马灯'
                    name='carousel'
                    x-component='Input'
                    x-component-props={{
                        placeholder: '请填写跑马灯',
                        maxLength: 200,
                        disabled: type == '0'
                    }}
                />
                <Field
                    {...formItemLayout}
                    type='string'
                    title='跑马灯滚动显示'
                    name='carouselSlideEnable'
                    x-component='CustomerSwitch'
                    x-component-props={{disabled: type == '0'}}
                />
                <Field type='array'
                    {...formItemLayout}
                    title='有效期'
                    name='[carouselStartDate,carouselEndDate]'
                    x-component='RangePicker'
                    x-component-props={{
                      disabled: type == '0',
                     "allowClear": true
                    }}
                />
                <Field
                    {...formItemLayout}
                    type='string'
                    title='LOGO图片'
                    name='logoImageUrl'
                    x-component='UploadImage'
                    x-component-props={{
                        disabled: type == '0',
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
                <FormSlot>
                    <div className='image-tips'>
                        <p>
                            建议尺寸：340*75px，jpg/png/gif/bmp格式
                        </p>
                    </div>
                </FormSlot>
                <Field
                    {...formItemLayout}
                    type='string'
                    title='右侧广告'
                    name='advert'
                    x-component='Advert'
                    x-component-props={{disabled: type == '0'}}
                    required={true}
                    x-rules={(value) => {
                        if (value.adType == '0') {
                            if(!value.adUrl){
                                return {type: 'error', message: '请上传图片'}
                            }
                        }
                        if (value.adType == '1' && !value.sliderImageId) {
                            return {type: 'error', message: '请选择轮播图'}
                        }
                    }}
                />
                <Field
                    {...formItemLayout}
                    type='string'
                    title='转人工按钮'
                    name='customerServiceButtonEnable'
                    x-component='RadioGroup'
                    x-component-props={{
                        disabled: type == '0',
                        options: [{label: '显示', value: 'Y'}, {label: '不显示', value: 'N'}]
                    }}
                    x-rules={[{required: true, message: "请选择"}]}
                />
                <Field
                    {...formItemLayout}
                    type='string'
                    title='工具栏配置'
                    name='toolbar'
                    x-component='CheckboxGroup'
                    x-component-props={{options: toolbarOptions, disabled: type == '0'}}
                    x-rules={[{required: true, message: "请选择"}]}
                />
            </SchemaForm>}
        </Modal>
    </div>
}
