import React from "react";
import './index.scss'
import {Modal} from "dpl-react";
import {uForm} from "dora";
import TimeSelect from './timeSelect'
import cloneDeep from 'lodash/cloneDeep'
import GroupView from "@/pages/employeeManage/specialDayManage/components/editModal/groupView";

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18},
};
const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormEffectHooks} = uForm
const actions = createFormActions()
export default function SpecialDayEditModal(props) {
    const {visible, onCancel, onOk, initialValues} = props
    const okHandler = () => {
        actions.submit().then(value => {
            onOk(value.values)
        })
    }
    return <Modal visible={visible}
                  title={'修改'}
                  onOk={okHandler}
                  onCancel={onCancel}
                  width={600}
                  className='special-day-edit-modal'
    >
        {visible &&
        <SchemaForm components={{TimeSelect, GroupView}} actions={actions} initialValues={cloneDeep(initialValues)}>
            <Field
                title='业务组'
                type='string'
                name={'_groupView'}
                x-component='GroupView'
                {...formItemLayout}
            />
            <Field title='上班时间'
                   {...formItemLayout}
                   type='string'
                   name={'workTime'}
                   required
                   x-component='TimeSelect'
                   x-rules={(value) => {
                       if (value.workFlag == '1') {
                           return
                       }
                       const workTime = value.workTime
                       for (let i = 0; i < workTime.length; i++) {
                           if (!workTime[i].beginTime || !workTime[i].endTime) {
                               return {
                                   type: 'error',
                                   message: '有必填项未填，请检查'
                               }
                           }
                       }
                   }}
            />
        </SchemaForm>}
    </Modal>
}