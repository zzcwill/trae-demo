import { Modal, Row } from 'dpl-react';
import React, { useState } from 'react'
import {uForm} from "dora";
import './index.scss'

const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
} = uForm
const actions = createFormActions()
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 12 },
};
export default function PeriodModal(props) {
    const { warnPeriodTypeList = [], onOk, onCancel, ...rest } = props;
    const okHandler = () => {
        actions.submit().then(data => {
            onOk?.(data.values)
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
            width={560}
            className="period-modal"
        >
            <SchemaForm actions={actions}>
                <Field
                    title='告警周期'
                    name='warnPeriod'
                    x-component='Select'
                    {...formItemLayout}
                    required
                    x-component-props={{ placeholder: '请选择', dataSource: warnPeriodTypeList }}
                    x-rules={[{
                        required: true,
                        message: '请选择告警周期'
                    }]}
                />
            </SchemaForm>
        </Modal>
    )
}
