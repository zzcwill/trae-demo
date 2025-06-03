import React from 'react'
import {uForm} from "dora";
import {message, Modal, Input} from 'dpl-react'
import {get, post} from "@/request/request";
import Api from '@/request/api-olhelpmanage'
import TextArea from '@/components/common/textArea';
const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
} = uForm
const actions = createFormActions()

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 17},
}
export default function AddModal(props) {
    const {visible, onOk, onCancel, id, data} = props
    const okHandler = () => {
        actions.submit().then(data => {
            onOk(data)
        })
    }
    return <Modal
        title={id ? '编辑产品' : '新增产品'}
        visible={visible}
        onCancel={onCancel}
        onOk={okHandler}
        width={560}
    >
        <SchemaForm components={{TextArea}} initialValues={data} actions={actions}>
            <Field title='产品系列代码'
                   name='seriesCode'
                   {...formItemLayout}
                   x-component='Input'
                   x-component-props={{placeholder: '请输入产品系列代码，如A03', maxLength: 20}}
            />
            <Field title='产品系列名称'
                   name='seriesName'
                   {...formItemLayout}
                   x-component='Input'
                   x-component-props={{placeholder: '请输入产品系列名称，如亿企代帐', maxLength: 20}}
            />
            <Field title='产品代码'
                   name='systemCode'
                   {...formItemLayout}
                   x-component='Input'
                   x-component-props={{placeholder: '请输入产品代码，如08060100010000', maxLength: 50}}
                   x-rules={[{message: '请输入产品代码', required: true}]}
            />
            <Field title='产品名称'
                   name='systemName'
                   {...formItemLayout}
                   x-component='Input'
                   x-component-props={{placeholder: '请输入产品名称，如云记账', maxLength: 50}}
                   x-rules={[{message: '请输入产品名称', required: true}]}
            />
            <Field title='备注'
                   name='description'
                   {...formItemLayout}
                   x-component='TextArea'
                   x-component-props={{placeholder: '请输入备注', maxLength: 200}}
            />
        </SchemaForm>
    </Modal>
}