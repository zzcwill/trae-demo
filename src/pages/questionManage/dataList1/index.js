import React,{ useState, useEffect } from 'react'
import './index.scss'
import { uForm } from 'dora'
import { Table } from 'dpl-react'
import { get } from '@/request/request'
import AppTable from "@/components/common/table";
import Api from '@/request/api-olhelpmanage'
import AppLongText from "@/components/common/longText";
import UserFuzzyQuery from "@/components/olhelpCommon/userFuzzyQuery";

const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset } = uForm
export default function DataList(props) {

    const [labels, setLabels] = useState([])

    useEffect(() => {
        getLabels()
    }, [])

    const getLabels = async () => {
        const data = await get({ url: Api.getCommonLabels })
        if (data.success) {
            
            setLabels(data.data)
        }
    }

    const columns = [
        { title: '回答序号', dataIndex: 'replyId' },
        {
            title: "回答人",
            dataIndex: "replyRealName",
        },
        { title: '回答时间', dataIndex: 'replyTime' },
        { title: '问题序号', dataIndex: 'questionId' },
        {
            title: "问题标签",
            dataIndex: "labelList",
            className: 'lone-content',
            render: (text) => {
                const pre = text ? text.join(',') : '';
                return <AppLongText text={pre} maxWidth={250} />;
            }
        },
        {
            title: '问题性质', dataIndex: 'openStatus',
            render: (text) => (
                <span>{text === 'Y' ? '公开' : (text === 'N' ? '私密' : '')}</span>
            ),
        },
        { title: '提问时间', dataIndex: 'askTime' },
        { title: '提问人', dataIndex: 'mobile' },
        {
            title: '是否采纳', dataIndex: 'isSolve',
            render: (text) => (
                <span>{text === 'Y' ? '已采纳' : (text === 'N' ? '未采纳' : '')}</span>
            ),
        },
        { title: '顶', dataIndex: 'vote' },
        {
            title: '踩', dataIndex: 'voteDown',
            render: (text) => (
                <span className="option-button-list"
                >
                    {Number(text) > 0 && <span className="option-button" onClick={() => gotoDetail('audit', record)}>{text}</span>}
                    {Number(text) == 0 && <span >{text}</span>}
                </span>
            ),
        },
    ]

    function formatList(list = []) {
        return list.map(item => {
            return {
                ...item,
                ...item.reply
            }
        })
    }
    const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
        // 这边处理values的数据
        const data = await get({
            url: Api.getAskQuestionDataList,
            params: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                ...values
            }
        })
        return {
            dataSource: formatList(data.data.list),
            pageSize: data.data.pageSize || 10,
            total: data.data.total || 0,
            current: data.data.pageIndex || 1
        }
    }
    const { form, table } = useFormTableQuery(service, { pagination: { pageSize: 10 } })
    return <div className='app-bg-box data-list'>
        <SchemaForm {...form} inline className='app-search-box'
            components={{ UserFuzzyQuery }}
        >
            <Field type='string'
                title='用户问题'
                name='question'
                x-component='Input'
                x-component-props={{ placeholder: '请输入' }} />
            <Field type='string'
                title='回答人'
                name='auditor'
                x-component="UserFuzzyQuery"
                x-component-props={{ placeholder: '请输入' }} />
            <Field
                title='问题标签'
                name='labelId'
                x-component='Cascader'
                x-component-props={{"placeholder": "请选择", "allowClear": true, "options": labels}}/>
            <Field type='string'
                title='回答人'
                name='auditor'
                x-component="UserFuzzyQuery"
                x-component-props={{ placeholder: '请输入' }} />
            <FormButtonGroup>
                <Submit style={{ marginRight: 10 }} />
                <Reset />
            </FormButtonGroup>
        </SchemaForm>
        <AppTable className='app-table-box' {...table} columns={columns} rowKey={"questionId"} /> 
    </div>
}