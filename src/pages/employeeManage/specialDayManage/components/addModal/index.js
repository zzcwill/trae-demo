import React, {useEffect, useRef, useState} from "react";
import './index.scss'
import {Modal} from "dpl-react";
import {uForm} from "dora";
import ModalSelect from "@/components/common/modalSelect";
import SpecialDaySelect from "@/pages/employeeManage/specialDayManage/components/addModal/specialDaySelect";
import {getMonthEndDay} from '@/utils/index'
import moment from "moment";
import cloneDeep from 'lodash/cloneDeep'

const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormEffectHooks} = uForm
const actions = createFormActions()
const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18},
};
const {now, monthEndDate} = getMonthEndDay()
const defaultValue = {
    type: '1',
    specialDate: [{
        "beginDay": moment(now),
        "endDay": moment(monthEndDate),
        "workFlag": "1",
        "workTime": [{
            "beginTime": moment(new Date('2020/07/09 08:30')),
            "endTime": moment(new Date('2020/07/09 17:30'))
        }]
    }]
}
export default function AddSpecialDayModal(props) {
    const {visible = false, onOk, onCancel, callList = [], callMap = {}, onlineList = [], onlineMap = {}, companyList = [], orgList = []} = props
    const [type, setType] = useState('1')
    const {onFieldValueChange$} = FormEffectHooks
    const groupIdTemp = useRef({
        '1': [],//电话
        '2': []//在线
    })
    const okHandler = () => {
        actions.submit().then(data => {
            onOk(data.values)
        })
    }
    useEffect(() => {
        groupIdTemp.current = {
            '1': [],//电话
            '2': []//在线
        }
    }, [visible])
    return <Modal 
                  className='special-day-add-modal'
                  title={'新增'}
                  visible={visible}
                  onOk={okHandler}
                  onCancel={onCancel}
                  width={600}
    >
        {visible && <SchemaForm 
                                components={{ModalSelect, SpecialDaySelect}}
                                actions={actions}
                                effects={() => {
                                    const {setFieldState, setFieldValue} = createFormActions()
                                    onFieldValueChange$('type').subscribe(({value}) => {
                                        setType(value)
                                        setFieldState('groupIdList', state => {
                                            state.value = groupIdTemp.current[value]
                                        }, true)
                                    })
                                }}
                                initialValues={cloneDeep(defaultValue)}
        >
            <Field
                {...formItemLayout}
                type="string"
                title="类型"
                name="type"
                x-component="RadioGroup"
                x-component-props={{options: [{label: '电话组', value: '1'}, {label: '在线组', value: '2'}]}}
                x-rules={[{required: true, message: '请选择类型'}]}
            />
            <Field
                {...formItemLayout}
                type="string"
                title="业务组"
                name="groupIdList"
                x-component="ModalSelect"
                x-component-props={{
                    list: type == '1' ? callList : onlineList,
                    listMap: type == '1' ? callMap : onlineMap,
                    isShowModalClear: true,
                    isNeedStringToNumber:true,
                    companyList,
                    orgList,
                    groupType: type,
                    showCompanyDepartFilter: true,
                    onChange(value) {
                        groupIdTemp.current = Object.assign({}, groupIdTemp.current, {[type]: value})
                    },
                }}
                x-rules={[{required: true, message: '请选择业务组'}]}
            />
            <Field
                {...formItemLayout}
                type="string"
                title="特殊日"
                name="specialDate"
                x-component="SpecialDaySelect"
                required
                x-rules={(value) => {
                    for (let i = 0; i < value.length; i++) {
                        if (!value[i].beginDay || !value[i].endDay) {
                            return {
                                message: '有必填项未填，请检查',
                                type: 'error'
                            }
                        }
                        if (value[i].workFlag !== '0') return
                        let workTime = value[i].workTime
                        for (let j = 0; j < workTime.length; j++) {
                            if (!workTime[j].beginTime || !workTime[j].endTime) {
                                return {
                                    message: '有必填项未填，请检查',
                                    type: 'error'
                                }
                            }
                        }
                    }
                }}
            />
        </SchemaForm>}
    </Modal>
}