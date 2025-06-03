import React, {useState, useEffect} from 'react'
import {Button, Menu, Dropdown, Icon, Modal, Form, Select, Input} from 'dpl-react'
import {get} from '@/request/request'
import Api from '@/request/api'
import getPermissionList from "@/utils/getPermission";
import {permissionCode} from "@/const";

const FormItem = Form.Item
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const Option = Select.Option

let unPassOptions = []

const getOptions = async () => {
    const data = await get({url: Api.getCommonOptions, params: {groupNames: 'audit_unpass_reason'}})
    if (data.success) {
        data.data.forEach(item => {
            if (item.groupName === 'audit_unpass_reason') {
                unPassOptions = item.options
            }
        })
    }
}
getOptions();

function BtnExamine(props) {
    const {onStatusChange, className = '', style = {}, disabled = false, form} = props
    const {getFieldDecorator, validateFieldsAndScroll, setFieldsValue} = form
    const [showModal, setShowModal] = useState(false)
    const [canExamine, setCanExamine] = useState(true)

    const onClick = (key) => {
        if (key.key == 1) {
            onStatusChange({status: 1})
            return
        }
        setShowModal(true)
    }
    const upPassHandler = () => {
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.status = 2
                onStatusChange(values)
                setShowModal(false)
            }
        })
    }
    const subMenu = (
        <Menu onClick={onClick}>
            <Menu.Item key={1}>通过</Menu.Item>
            <Menu.Item key={2}>不通过</Menu.Item>
        </Menu>
    )

    useEffect(() => {
        setFieldsValue({
            auditUnPassReasonCode: undefined,
            auditUnPassDesc: ''
        })
    }, [showModal])

    useEffect(() => {
        getPermissionList().then(permissionList => {
            permissionList.forEach(item => {
                if (item.permissionCode === permissionCode.audit_reply) {
                    setCanExamine(true)
                }
            })
        })
    }, [])

    return (canExamine ? <>
        <Dropdown overlay={subMenu} className={className} style={style} disabled={disabled}>
            <Button type='primary-bordered'>
                修改审核状态 <Icon type="caret-down"/>
            </Button>
        </Dropdown>
        <Modal visible={showModal}
               title='审核未通过'
               onCancel={() => {
                   setShowModal(false)
               }}
               onOk={upPassHandler}
               width={520}
        >
            <Form>
                <FormItem label='未通过原因' {...formItemLayout}>
                    {getFieldDecorator('auditUnPassReasonCode', {
                        rules: [{required: true, message: '请选择未通过原因'}],
                    })(
                        <Select placeholder='请选择未通过原因'>
                            {unPassOptions.map((item, index) => {
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })}
                        </Select>
                    )}
                </FormItem>

                <FormItem label='未通过补充说明' {...formItemLayout}>
                    {getFieldDecorator('auditUnPassDesc', {})(
                        <Input.TextArea placeholder='请补充填写做出不通过的原因（不超过200字）' rows={5} maxLength={200}/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    </> : null)
}

export default Form.create()(React.forwardRef(BtnExamine))
