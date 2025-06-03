import React from 'react'
import './index.scss'
import { uForm } from 'dora'
import { Table, Tabs } from 'dpl-react'
import { get, post } from '@/request/request'
import AppTable from "@/components/common/table";
import Api from '@/request/api-olhelpmanage'
const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset } = uForm
export default function YearPreview(props) {
    const columns = [
        {
            title: "汇总月份",
            dataIndex: "effectMonth",
            ellipsis: true,
            align: "center",
            render(text, record, index) {
                return {
                    children: text,
                    props: {
                        rowSpan: record.rowSpan || 0
                    }
                }
            }
        },
        {
            title: "主题名称",
            dataIndex: "businessTopicName",
            ellipsis: true,
            align: "center",
        },
        {
            title: "主题代码",
            dataIndex: "businessTopicCode",
            ellipsis: true,
            align: "center",
        },{
            title: "主题类型",
            dataIndex: "topicTypeName",
            ellipsis: true,
            align: "center",
            // render(text) {
            //     return text == '1' ? '业务类' : '工具类';
            // }
        },{
            title: "生效月份",
            dataIndex: "effectMonthList",
            ellipsis: true,
            align: "center",
            render(text) {
                return text?.join(',')
            }
        },{
            title: "适用地区",
            dataIndex: "locationList",
            ellipsis: true,
            align: "center",
            render(text) {
                return text?.map(t => {
                    return t.locationName
                })?.join(',')
            }
        },{
            title: "展示顺序",
            dataIndex: "topicOrder",
            ellipsis: true,
            align: "center",
        },
    ]
    const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
        const data = await get({
            url: Api.getFinancialTaxConfigListSummary,
            data: {
                ...values
            }
        })
        data.data.sort((o1, o2) => {
            return o1.effectMonth - o2.effectMonth;
        })
        console.log(data.data, 'data.data');
        return {
            dataSource: data.data?.reduce((pre, pItem) => {
                const { effectMonth, consultFinancialTaxConfigBaseVOList = [] } = pItem || {};
                if (consultFinancialTaxConfigBaseVOList?.[0]) {
                    consultFinancialTaxConfigBaseVOList[0].rowSpan = consultFinancialTaxConfigBaseVOList?.length;
                }
                return [
                    ...pre,
                    ...consultFinancialTaxConfigBaseVOList?.map(item => {
                        item.effectMonth = effectMonth;
                        return item;
                    })
                ]
            }, [])
        }
    }
    const { form, table } = useFormTableQuery(service, { pagination: { pageSize: 10 } })
    return <div className='app-bg-box year-preview'>
        <SchemaForm {...form} inline className='app-search-box'>
            <FormButtonGroup>
                <Submit style={{ marginRight: 10 }}>刷新</Submit>
            </FormButtonGroup>
        </SchemaForm>
        <AppTable className='app-table-box' {...table} columns={columns} rowKey="id" pagination={false} />
    </div>
}