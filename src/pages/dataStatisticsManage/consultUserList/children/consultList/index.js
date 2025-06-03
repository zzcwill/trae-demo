import React,{ useState, useEffect } from 'react'
import './index.scss'
import { uForm } from 'dora'
import { Breadcrumb } from 'dpl-react'
import { get } from '@/request/request'
import AppTable from "@/components/common/table";
import Api from '@/request/api-olhelpmanage'
import qs from "qs";
import history from "@/history";
import AppLongText from "@/components/common/longText";
import moment from 'moment'
import useYearList from '../../../hooks/useYearList'

const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset } = uForm
export default function ConsultList(props) {
    const obj = qs.parse(window.location.href.split("?")[1]) || {};
    const { getYearStartEnd } = useYearList({ needYearList: false })

    const columns = [
        {
            title: "咨询时间",
            dataIndex: "consultDate",
        },
        {
            title: "地区",
            dataIndex: "location",
        },
        {
            title: "企业名称",
            dataIndex: "companyName",
            className: 'lone-content',
            render: (text) => {
                return <AppLongText text={text} maxWidth={250} />;
            }
        },
        {
            title: "机构",
            dataIndex: "agencyName",
            className: 'lone-content',
            render: (text) => {
                return <AppLongText text={text} maxWidth={250} />;
            }
        },
        {
            title: "用户问",
            dataIndex: "userQuestion",
            className: 'lone-content',
            render: (text) => {
                return <AppLongText text={text} maxWidth={350} />;
            }
        },
        {
            title: "问题类型",
            dataIndex: "questionType",
        },
        {
            title: "业务范围",
            dataIndex: "business",
        },
        {
            title: "场景",
            dataIndex: "scene",
        },
        {
            title: "疑似岗责",
            dataIndex: "position",
        },
        {
            title: "来源渠道",
            dataIndex: "channel",
        },
        {
            title: "满意度",
            dataIndex: "satisfied",
        },
        {
            title: "解决情况",
            dataIndex: "solution",
        },
        {
            title: "企业所属行业",
            dataIndex: "industry",
        },
        {
            title: "纳税人类型",
            dataIndex: "taxpayerType",
        },
        {
            title: "受理人",
            dataIndex: "agentName",
        },
        {
            title: "受理组",
            dataIndex: "groupName",
        },
    ]
    const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
        const currentYear = obj.year ? moment().year(obj.year) : moment();
        const data = await get({
            url: Api.getDmPersonaConsultList,
            params: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                ...values,
                // startDate: currentYear.dayOfYear(1).format('YYYY-MM-DD'),
                // endDate: currentYear.format('YYYY-MM-DD'),
                startDate: getYearStartEnd(obj.year).startDate ,
                endDate: getYearStartEnd(obj.year).endDate,
                mobile: obj.mobile
            }
        })
        return {
            dataSource: data.data?.list || [],
            pageSize: data.data?.pageSize || 20,
            total: data.data?.total || 0,
            current: data.data?.pageIndex || 1
        }
    }

    const push = (url) => {
        history.push(url)
    }
    const { form, table } = useFormTableQuery(service, { pagination: { pageSize: 20 } })
    return <div className='app-bg-box consult-list'>
          <Breadcrumb style={{marginBottom: '20px'}}>
            <Breadcrumb.Item onClick={() => push('/dataStatisticsManage/consultUserList')}>咨询用户画像</Breadcrumb.Item>
            <Breadcrumb.Item onClick={() => push(`/dataStatisticsManage/consultUserList/userDetail?mobile=${obj.mobile}`)}>{obj.name || obj.mobile || '默认名称'}</Breadcrumb.Item>
            <Breadcrumb.Item>咨询明细</Breadcrumb.Item>
        </Breadcrumb>
        <SchemaForm {...form} inline>
            {/* <Field type='string'
                title='手机号'
                name='mobile'
                x-component='Input'
                x-component-props={{ placeholder: '请输入手机号' }} />

            <FormButtonGroup>
                <Submit style={{ marginRight: 10 }} />
                <Reset />
            </FormButtonGroup> */}
        </SchemaForm>
        <AppTable className='app-table-box' {...table} columns={columns} rowKey={(record) => record.userQuestion + record.consultDate} scroll={{ x: 2500 }}/> 
    </div>
}