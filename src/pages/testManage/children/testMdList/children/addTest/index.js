import './index.scss'
import React ,{useState,useEffect}  from 'react'
import {uForm}  from 'dora'
import {Button,message}  from 'dpl-react'
import {get,post}  from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import qs from 'qs'
import history from '@/history'

const formItemLayout = {
    labelCol: {span: 3},
    wrapperCol: {span: 15},
}
const {SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions} = uForm
const actions = createFormActions()
export default function AddTest(props) {
    const [test3Options,setTest3Options] = useState([])
const [test9Options,setTest9Options] = useState([])
const [test13Options,setTest13Options] = useState([])
const [id, setId] = useState(() => {
        const obj = qs.parse(window.location.href.split('?')[1])
        return obj.id
    })
const [detail, setDetail] = useState({})

    const getDetail = async (id) => {
        const data = await get({url: Api.routePolicyDetail, params: {id}})
        if (data.success) {
            setDetail(data.data)
        }
    }
const confirmHandler = () => {
        actions.submit().then(async value => {
            let data = null
            let params = {
                channelList: value.values.channelList,
                remark: value.values.remark,
                name: value.values.name
            }
            if (id) {
                data = await post({url: Api.routePolicyUpdate, data: {...params, id}})
            } else {
                data = await post({url: Api.routePolicySave, data: {...params}})
            }
            if (!data) return
            if (data.success) {
                message.success(id ? '修改成功' : '新增成功')
                history.push('/routerManage/routerStrategy')
            } else {
                message.error(data.message)
            }
        })
    }
const cancelHandler = () => {
        history.push('/routerManage/routerStrategy')
    }
 useEffect(() => {
        if (id) {
            getDetail(id)
        }
    }, [id])

    return (
        <div className='add-test'>
  <div className='add-form-by-render'>
    <SchemaForm actions={actions} initialValues={detail}>
          <Field
        {...formItemLayout}
        name='test1'
        title='字段1'
        x-component='Input'
        x-component-props={{"placeholder":"请输入其他参数","allowClear":true}}/>
    <Field
        {...formItemLayout}
        name='test2'
        title='字段2'
        x-component='Select'
        x-component-props={{"placeholder":"请选择产品纬度","allowClear":true,"mode":"multiple","dataSource":[{"label":"是","value":"Y"},{"label":"否","value":"N"}]}}/>
    <Field
        {...formItemLayout}
        name='test3'
        title='字段3'
        x-component='Select'
        x-component-props={{"placeholder":"请选择产品纬度","allowClear":true,"mode":"multiple","dataSource":test3Options}}/>
    <Field
        {...formItemLayout}
        name='test4'
        title='字段4'
        x-component='DatePicker'
        x-component-props={{"placeholder":"请选择日期","allowClear":true}}/>
    <Field
        {...formItemLayout}
        name='test5'
        title='字段5'
        x-component='MonthPicker'
        x-component-props={{"placeholder":"请选择月份","allowClear":true}}/>
    <Field
        {...formItemLayout}
        name='test6'
        title='字段6'
        x-component='RangePicker'
        x-component-props={{"placeholder":"请选择时间区间","allowClear":true}}/>
    <Field
        {...formItemLayout}
        name='test7'
        title='字段7'
        x-component='YearPicker'
        x-component-props={{"placeholder":"请输入年份","allowClear":true}}/>
    <Field
        {...formItemLayout}
        name='test8'
        title='字段8'
        x-component='TimePicker'
        x-component-props={{"placeholder":"请输入时间","allowClear":true}}/>
    <Field
        {...formItemLayout}
        name='test9'
        title='字段9'
        x-component='Cascader'
        x-component-props={{"placeholder":"请选择","allowClear":true,"options":test9Options}}/>
    <Field
        {...formItemLayout}
        name='test10'
        title='字段10'
        x-component='CheckboxGroup'
        x-component-props={{"options":[{"label":"是","value":"Y"},{"label":"否","value":"N"}]}}/>
    <Field
        {...formItemLayout}
        name='test11'
        title='字段11'
        x-component='RadioGroup'
        x-component-props={{"options":[{"label":"是","value":"Y"},{"label":"否","value":"N"}]}}/>
    <Field
        {...formItemLayout}
        name='test12'
        title='字段12'
        x-component='InputNumber'
        x-component-props={{"allowClear":true}}/>
    <Field
        {...formItemLayout}
        name='test13'
        title='字段13'
        x-component='TreeSelect'
        x-component-props={{"placeholder":"请选择","allowClear":true,"treeData":test13Options}}/>
    <Field
        {...formItemLayout}
        name='test14'
        title='字段14'
        x-component='Switch'
        x-component-props={{}}/>

    </SchemaForm>
    <div className='btn-group'>
                <Button type='primary' onClick={confirmHandler}>保存</Button>
                <Button onClick={cancelHandler} style={{marginLeft: 10}}>取消</Button>
            </div>
</div>    
       </div>
    )
}