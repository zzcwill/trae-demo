import React, { useEffect, useState } from "react";
import { uForm } from 'dora'
import './index.scss'
import GuesQuestion from './guesQuestion'
import IntelligentSuggest from './intelligentSuggest'
import ToMan from './toMan'
import RecommendQuestion from './recommendQuestion'
import IntelligentAssistant from './intelligentAssistant'
import Api from '@/request/api-olhelpmanage'
import { get, post } from '@/request/request'
import { Button, message, Switch } from 'dpl-react'
import RobotDelaySend from '@/components/robotDelaySend'
import LargeModelRecommend from '@/components/largeModelRecommend'

const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormSlot } = uForm
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 17 },
};
const actions = createFormActions()

function CustomerSwitch(props) {
    const { value, onChange, ...rest } = props
    return <Switch checked={value} onChange={onChange} {...rest} />
}

export default function ManMachineRoute(props) {
    const [detail, setDetail] = useState(null)
    const [delayTransmitEnable, setDelayTransmitEnable] = useState('N');
    const getDetail = async function () {
        const data = await get({ url: Api.globalInteractDetail })
        if (data.success) {
            data.data.autoCustomerServiceEnable = data.data.autoCustomerService.enable === 'Y'
            data.data.robotTransmit = data.data.robotTransmit || {};
            data.data.robotTransmit.delayTransmitEnable = data.data.robotTransmit.delayTransmitEnable || 'N';
            data.data.largeModelRecommend = data.data.largeModelRecommend || {};
            setDelayTransmitEnable(data.data.robotTransmit.delayTransmitEnable);
            setDetail(data.data)
        } else {
            message.error(data.message)
        }
    }
    const submit = function () {
        actions.submit().then(async data => {
            let values = data.values
            values.autoCustomerService.enable = values.autoCustomerServiceEnable ? 'Y' : 'N'
            delete values.autoCustomerServiceEnable
            const response = await post({ url: Api.globalInteractSave, data: values })
            if (response.success) {
                message.success('修改成功')
            } else {
                message.success(response.message)
            }
        })
    }
    useEffect(() => {
        getDetail()
    }, [])
    return (
        <div>
            {detail ?
                <SchemaForm className='man-machine-route'
                    components={{
                        GuesQuestion,
                        IntelligentSuggest,
                        CustomerSwitch,
                        ToMan,
                        RecommendQuestion,
                        IntelligentAssistant,
                        RobotDelaySend,
                        LargeModelRecommend
                    }}
                    onChange={(values) => {
                        setDelayTransmitEnable(values.robotTransmit.delayTransmitEnable)
                    }}
                    initialValues={detail}
                    actions={actions}
                >
                    <FormSlot>
                        <div className='box-title'>猜你想问</div>
                    </FormSlot>
                    <Field type='object'
                        name='guessQuestion'
                        title='猜你想问'
                        {...formItemLayout}
                        x-component='GuesQuestion'
                        required
                        x-rules={(value) => {
                            if (value.enable === 'Y' && !value.tip) {
                                return {
                                    message: '请输入提示语',
                                    type: 'error'
                                }
                            }
                        }}
                    >
                    </Field>
                    <FormSlot>
                        <div className='box-line'></div>
                        <div className='box-title'>智能联想</div>
                    </FormSlot>
                    <Field type='object'
                        name='intelligentSuggest'
                        title='智能联想'
                        {...formItemLayout}
                        required
                        x-component='IntelligentSuggest'
                        x-rules={(value) => {
                            if (value.enable === 'Y' && !value.questionCount) {
                                return {
                                    message: '请输入联想问条数',
                                    type: 'error'
                                }
                            }
                        }}
                    >
                    </Field>

                    <FormSlot>
                        <div className='box-line'></div>
                        <div className='box-title'>智能助理</div>
                    </FormSlot>
                    <Field type='object'
                        name='intelligentAssistant'
                        title='智能助理'
                        {...formItemLayout}
                        required
                        x-component='IntelligentAssistant'>
                    </Field>

                    <FormSlot>
                        <div className='box-line'></div>
                        <div className='box-title'>机器人自动转人工</div>
                    </FormSlot>
                    <Field 
                        type='string'  
                        {...formItemLayout}
                        title='机器人自动转人工'
                        name='autoCustomerServiceEnable'
                        x-component='Switch' required

                    />
                    <Field type='object' {...formItemLayout}
                        name='autoCustomerService'
                        title='机器人多次对话转人工'
                        x-component='ToMan' required
                        x-rules={(value) => {
                            if (value.multiRoundsEnable === 'Y') {
                                if (!value.multiRoundsCount || !value.multiRoundsTip) {
                                    return {
                                        message: '有必填项未填，请检查',
                                        type: 'error'
                                    }
                                }
                            }
                        }}
                    />
                    <FormSlot>
                        <div className='box-line'></div>
                        <div className='box-title'>知识推荐</div>
                    </FormSlot>
                    <Field type='object' {...formItemLayout} name='recommendQuestion' title=' 知识推荐显示条数'
                        required
                        x-component='RecommendQuestion'
                        x-rules={(value) => {
                            if (!value.count) {
                                return {
                                    message: '请输入',
                                    type: 'error'
                                }
                            }
                        }}
                    />
                    <FormSlot>
                        <div className='box-line'></div>
                        <div className='box-title'>机器人</div>
                    </FormSlot>
                    <Field type='object' {...formItemLayout} name='robotTransmit' title='机器人回复延迟发送'
                        required={delayTransmitEnable === 'Y'}
                        x-component='RobotDelaySend'
                        x-rules={(value) => {
                            if (value.delayTransmitEnable === 'Y' && !value.delayTransmitMilliseconds && value.delayTransmitMilliseconds !== 0) {
                                return {
                                    message: '请输入发送延迟时间',
                                    type: 'error'
                                }
                            }
                        }}
                    />
                    <FormSlot>
                        <div className='box-line'></div>
                        <div className='box-title'>智库推荐</div>
                    </FormSlot>
                    <Field 
                        type='object' 
                        {...formItemLayout} 
                        name='largeModelRecommend' 
                        colon={false}
                        x-component='LargeModelRecommend'
                        x-rules={(value) => {
                            if (!value?.inputInterval && value?.inputInterval !== 0) {
                                return {
                                    message: '请输入时间间隔',
                                    type: 'error'
                                }
                            }
                            if (!value?.packageNumber && value?.packageNumber !== 0) {
                                return {
                                    message: '请输入组装条数',
                                    type: 'error'
                                }
                            }
                        }}
                    />
                </SchemaForm> : null}

            <div className='btn-group'>
                <Button type='primary' onClick={submit}>提交</Button>
            </div>
        </div>
    )
}
