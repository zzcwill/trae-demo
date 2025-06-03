import React, { useState, useEffect } from 'react'
import './index.scss'
import { uForm } from 'dora'
import { get } from '@/request/request'
import AppTable from "@/components/common/table";
import AppLongText from "@/components/common/longText";
import Api from '@/request/api-olhelpmanage'
import moment from 'moment'
import useYearList from '../hooks/useYearList'
import history from "@/history";

const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset } = uForm
export default function ConsultUserList(props) {
    const [channelList, setChannelList] = useState([]);
    const [locationList, setLocationList] = useState([]);
    // const [yearList, setYearList] = useState([]);
    const [params, setParams] = useState({}); //默认参数
    const { yearList, getYearStartEnd } = useYearList({ needYearList: true})

    const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
        let date = ''
        if (values.year) {
            date = values.year
            delete values.year
        }
        const data = await get({
            url: Api.getDmPersonaList,
            params: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                startDate: getYearStartEnd(date).startDate,
                endDate: getYearStartEnd(date).endDate,
                
                ...values,
                location: values.location && values.location.join(','),
                channel: values.channel && values.channel.join(','),
            }
        })
        return {
            dataSource: data.data?.list || [],
            pageSize: data.data?.pageSize || 20,
            total: data.data?.total || 0,
            current: data.data?.pageIndex || 1
        }
    }

    const asyncDefaultMiddleware = service => ({ actions }) => ({
        async onFormFirstQuery(payload, next) {
          await service(actions)
          return next(payload)
        }
      })

    const { form, table } = useFormTableQuery(service, { pagination: { pageSize: 20 } },
        // [
        //     asyncDefaultMiddleware(async actions => {
        //         actions.setFieldState('year', state => {
        //             state.value = 2023
        //         })
        //     })
        // ]
        )


    const columns = [
        {
            title: "手机号",
            dataIndex: "mobile",
        },
        {
            title: "姓名",
            dataIndex: "name",
            render: (text, record) => {
                return <span>{text || record.mobile}</span>;
            }
        },
        {
            title: "地区",
            dataIndex: "location",
            className: 'lone-content',
            render: (text) => {
                const pre = text ? text.join(',') : '';
                return <AppLongText text={pre} maxWidth={250} />;
            }
        },
        {
            title: "来源渠道",
            dataIndex: "channel",
            className: 'lone-content',
            render: (text) => {
                const pre = text ? text.join(',') : '';
                return <AppLongText text={pre} maxWidth={250} />;
            }
        },
        {
            title: "最近财税咨询时间",
            dataIndex: "lastConsultTime",
        },
        {
            title: "今年财税咨询次数",
            dataIndex: "consultNum",
        }, {
            title: "今年办税咨询次数",
            dataIndex: "taxConsultNum",
        },
        {
            title: '操作', dataIndex: 'operation',
            render: (text, record) => (
                <span className="option-button-list"
                >
                    <span className="option-button" onClick={() => showDetail(record)}>查看详情</span>
                </span>
            ),
        },
    ]

    const showDetail = async (record) => {
        let url =
            window.location.href.split("#")[0] +
            `#/dataStatisticsManage/consultUserList/userDetail?mobile=${record.mobile}`;
        window.open(url);
        // history.push(
        //     `/dataStatisticsManage/consultUserList/userDetail?mobile=${record.mobile}`
        // );

    }

    const getLabel = async () => {
        const data = await get({
            url: Api.getEnumOptions,
            params: { groupNames: "consult_channel" },
        });
        if (data.success) {
            data.data.forEach((item) => {
                if (item.groupName === "consult_channel") {
                    setChannelList(item.options.map(item => {
                        return { label: item.name, value: item.id }
                    }) || []);
                }
            });
        }
    };

    const getLocationList = async () => {
        const data = await get({
            url: Api.commonGetLocationList,
            params: {
                type: 0 //只要机器人地区
            }
        });
        setLocationList(
            data.data.map((item) => {
                return { label: item.name, value: item.id };
            })
        );
    };

    const getYearList = async () => {
        const data = await get({
            url: Api.getDmConsultGetYearTag,
        })
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            // setYearList(data.data.map((item) => {
            //     return { label: item.year, value: item.year };
            // }))
            setYearList(data.data)
            setParams({ year:  data.data[0].year })
        }
    }

    useEffect(() => {
        if(yearList && yearList.length >0) {
            setParams({ year: yearList[0].year })
        }
    }, [yearList]);


    useEffect(() => {
        getLabel();
        getLocationList();
        // getYearList()
    }, []);

    return <div className='app-bg-box consult-user-list'>
        <SchemaForm 
            initialValues={params}  
            {...form} inline className='app-search-box'
        >
            <Field type='array'
                title='地区'
                name='location'
                x-component='Select'
                x-component-props={{
                    placeholder: '请选择地区',
                    dataSource: locationList,
                    allowClear: true,
                    showSearch: true,
                    mode: 'multiple',
                    filterOption: function (input, option) {
                        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                }} />
            <Field type='string'
                title='手机号'
                name='mobile'
                x-component='Input'
                x-component-props={{ placeholder: '请输入手机号' }} />
            <Field type='array'
                title='来源渠道'
                name='channel'
                x-component='Select'
                x-component-props={{
                    placeholder: '请选择来源渠道',
                    dataSource: channelList,
                    allowClear: true,
                    showSearch: true,
                    mode: 'multiple',
                    filterOption: function (input, option) {
                        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                }} />
            <Field type='number'
                title='年度'
                name='year'
                x-component='Select'
                x-component-props={{
                    placeholder: '请选择年度',
                    optionFormat: {
                        label: 'year',
                        value: 'year',
                    },
                    dataSource: yearList,
                    allowClear: false,
                    showSearch: true,
                }} />
            <Field type='string'
                title='企业名称'
                name='companyName'
                x-component='Input'
                x-component-props={{ placeholder: '请输入企业名称' }} />
            <FormButtonGroup>
                <Submit style={{ marginRight: 10 }}>搜索</Submit>
                <Reset />
            </FormButtonGroup>
        </SchemaForm>
        <AppTable className='app-table-box' {...table} columns={columns} rowKey={'mobile'} />
    </div>
}