import { Modal } from 'dpl-react';
import React, { useState } from 'react'
import {uForm} from "dora";
import WarnningRatioSingle from '@/components/warnningRatioSingle'
import './index.scss'

const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
} = uForm
const actions = createFormActions()

const validateFn = (value) => {
    if (!value?.callCompletingRateLowerThreshold && !value?.callCompletingRateUpperThreshold) {
        return {
            message: "请输入接通率告警阈值",
            type: 'error'
        }
    }
    if (+value?.callCompletingRateLowerThreshold >= +value?.callCompletingRateUpperThreshold) {
        return {
            message: "低于的阈值不能大于等于高于的阈值",
            type: 'error'
        }
    }
}

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 15 },
};
export default function ThresholdModal(props) {
    const { onOk, onCancel, ...rest } = props;
    const okHandler = () => {
        actions.submit().then(data => {
            onOk?.(data?.values.value)
        })
    }
    const onCancelHandler = () => {
        actions.reset();
        onCancel?.();
    }
    return (
        <Modal
            {...rest}
            destroyOnClose
            title="批量修改告警周期"
            onOk={okHandler}
            onCancel={onCancelHandler}
            width={760}
        >
            <SchemaForm actions={actions} components={{ WarnningRatioSingle }}>
                <Field
                    title='接通率阈值'
                    type="object"
                    name='value'
                    required
                    {...formItemLayout}
                    x-component='WarnningRatioSingle'
                    x-component-props={{ 
                        lowKey: 'callCompletingRateLowerThreshold',
                        upperKey: 'callCompletingRateUpperThreshold'
                    }}
                    x-rules={[(value) => validateFn(value)]}
                />
            </SchemaForm>
        </Modal>
    )
}
