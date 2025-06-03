import React, {useEffect, useRef, useState} from 'react'
import './index.scss'
import {uForm} from "dora";
import {get} from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import TimeRangeSelect from "./timeRangeSelect";
import {Button, message, Table} from "dpl-react";
import qs from 'qs'
import ModalSelect from "@/components/common/modalSelect";

const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    useFormTableQuery,
    Submit,
    FormButtonGroup,
    Reset,
    createFormActions
} = uForm;
const actions = createFormActions()
export default function CancelWaitQueryManage(props) {
    const [groupList, setGroupList] = useState([])
    const [consultChannel, setConsultChannel] = useState([])
    const [locationList, setLocationList] = useState([])
    const isInit = useRef(false)
    const columns = [
        {
            title: "排队时间",
            dataIndex: "startQueueTime",
            ellipsis: true,
            width: 200,
        },
        {
            title: "logid",
            dataIndex: "logId",
            ellipsis: true,
            width: 200,
        },
        {
            title: "机构代码",
            dataIndex: "agencyCode",
            ellipsis: true,
            width: 200,
        },
        {
            title: "机构名称",
            dataIndex: "agencyName",
            ellipsis: true,
            width: 200,
        },
        {
            title: "企业税号",
            dataIndex: "enterpriseIrd",
            ellipsis: true,
            width: 200,
        },
        {
            title: "企业名称",
            dataIndex: "enterpriseName",
            ellipsis: true,
            width: 200,
        },
        {
            title: "个人账号",
            dataIndex: "personalAccount",
            ellipsis: true,
            width: 200,
        },
        {
            title: "个人名称",
            dataIndex: "personalName",
            ellipsis: true,
            width: 200,
        },
        {
            title: "所属地区",
            dataIndex: "locationName",
            ellipsis: true,
            width: 200,
        },
        {
            title: "接待组",
            dataIndex: "receptionGroupName",
            ellipsis: true,
            width: 200,
        },
        {
            title: "放弃时间",
            dataIndex: "endQueueTime",
            ellipsis: true,
            width: 200,
        },
        {
            title: "排队时长",
            dataIndex: "queueInterval",
            ellipsis: true,
            width: 200,
            render(text) {
                return text + 's';
            }
        },
        {
            title: "用户发送消息",
            dataIndex: "messages",
            ellipsis: true,
            width: 200,
        },
        {
            title: "来源渠道",
            dataIndex: "channelName",
            ellipsis: true,
            width: 200,
        },
        {
            title: "是否转接",
            dataIndex: "hasTransfer",
            ellipsis: true,
            width: 50,
            render(text) {
                return text === 'Y' ? '是' : '否'
            }
        },
        {
            title: "转接链路",
            dataIndex: "transferChain",
            ellipsis: true,
            width: 200,
        },
        {
            title: "放弃原因",
            dataIndex: "cancelReason",
            ellipsis: true,
            width: 200,
            render(text) {
                const map = {
                    '0': '默认放弃',
                    '1': '点击机器人服务',
                    '2': '点击对话输入框关闭按钮',
                    '3': '点击浏览器关闭按钮'
                }
                return map[text];
            }
        },
    ]
    const getGroupList = async () => {
        const res = await get({url: Api.getCommonGroupList, params: {type: '2'}})
        if (res.success) {
            setGroupList(res.data.map(item => {
                return {
                    value: item.id,
                    label: item.name,
                    ...item
                }
            }))
        }
    }
    const getConsultChannelList = async () => {
        const res = await get({
            url: Api.getEnumOptions, params: {
                groupNames: 'consult_channel'
            }
        })
        if (res.success) {
            res.data.forEach(item => {
                if (item.groupName === 'consult_channel') {
                    setConsultChannel(item.options.map(a => {
                        return {
                            value: a.id,
                            label: a.name,
                            ...a
                        }
                    }))
                }
            })
        }
    }
    const getLocationList = async () => {
        const data = await get({url: Api.commonGetLocationList, params: {type: '0'}});
        setLocationList(
            data.data.map((item) => {
                return {label: item.name, value: item.id};
            })
        );
    };
    const service = async ({
                               values,
                               pagination,
                               sorter = {},
                               filters = {},
                           }) => {
        const defaultReturn = {
            dataSource: [],
            pageSize: 10,
            total: 0,
            current: 1,
        }
        if (!isInit.current) {
            isInit.current = true
            return defaultReturn
        }
        if (!values.queueTimeStart) {
            return defaultReturn
        }
        const res = await get({
            url: Api.getQueueAbandonLogList, params: {
                queueTimeStart: values.queueTimeStart,
                queueTimeEnd: values.queueTimeEnd,
                abandonTimeStart: values.abandonTimeStart,
                abandonTimeEnd: values.abandonTimeEnd,
                locations: values.locations && values.locations.join(','),
                channels: values.channels && values.channels.join(','),
                groupIds: values.groupIds && values.groupIds.join(','),
                pageSize: pagination.pageSize,
                pageIndex: pagination.current
            }
        })
        return {
            dataSource: (res.data && res.data.list) || [],
            pageSize: res.data.pageSize,
            total: res.data.total,
            current: res.data.pageIndex,
        };
    };
    const {form, table, trigger} = useFormTableQuery(service, {
        pagination: {
            current: 1,
            pageSize: 10,
        }
    })
    useEffect(() => {
        getConsultChannelList()
        getGroupList()
        getLocationList()
    }, [])
    return (
        <div className='cancel-wait-query-manage'>
            <SchemaForm inline
                        className="form-wrap"
                        {...form}
                        components={{TimeRangeSelect,ModalSelect}}
                        actions={actions}
            >
                <Field
                    type="array"
                    title="排队时间"
                    name="[queueTimeStart,queueTimeEnd]"
                    x-component="TimeRangeSelect"
                    x-component-props={{
                        allowClear: true,
                        placeholder: "请选择排队时间",
                        showTime: true
                    }}
                    x-rules={(value) => {
                        if (value && value[0] && value[1]) return true
                        return '请选择排队时间'
                    }}
                />
                <Field
                    type="array"
                    title="放弃时间"
                    name="[abandonTimeStart,abandonTimeEnd]"
                    x-component="TimeRangeSelect"
                    x-component-props={{
                        allowClear: true,
                        placeholder: "请选择放弃时间",
                        showTime: true
                    }}
                    x-rules={(value) => {
                        if (value && value[0] && value[1]) return true
                        return '请选择放弃时间'
                    }}
                />
                <Field
                    type="array"
                    title="地区"
                    name="locations"
                    x-component="Select"
                    x-component-props={{
                        allowClear: true,
                        placeholder: "请选择地区",
                        dataSource: locationList,
                        mode: 'multiple',
                        filterOption(value, option) {
                            return option.props.title.indexOf(value) >= 0
                        }
                    }}
                />
                <Field
                    type="array"
                    title="渠道"
                    name="channels"
                    x-component="Select"
                    x-component-props={{
                        allowClear: true,
                        placeholder: "请选择渠道",
                        dataSource: consultChannel,
                        mode: 'multiple',
                        filterOption(value, option) {
                            return option.props.title.indexOf(value) >= 0
                        }
                    }}
                />
                <Field
                    type="array"
                    title="接待组"
                    name="groupIds"
                    x-component="ModalSelect"
                    x-component-props={{
                        allowClear: true,
                        placeholder: "请选择接待组",
                        list: groupList,
                        isShowModalClear:true,
                        isNeedStringToNumber:true,
                        modalTitle:'接待组'
                    }}
                />
                <FormButtonGroup>
                    <Button type='primary' style={{marginRight: 10}} onClick={() => {
                        actions.submit().then(values => {
                            values = values.values
                            const {pagination} = table
                            const params = {
                                queueTimeStart: values.queueTimeStart,
                                queueTimeEnd: values.queueTimeEnd,
                                abandonTimeStart: values.abandonTimeStart,
                                abandonTimeEnd: values.abandonTimeEnd,
                                locations: values.locations && values.locations.join(','),
                                channels: values.channels && values.channels.join(','),
                                groupIds: values.groupIds && values.groupIds.join(','),
                            }
                            window.open(Api.getQueueAbandonLogeExport + '?' + qs.stringify(params))
                        })
                    }}>导出</Button>
                    <Reset style={{marginRight: 10}}>清空条件</Reset>
                    <Submit>搜索</Submit>
                </FormButtonGroup>
            </SchemaForm>

            <Table className='table-wrap' {...table} columns={columns} scroll={{x: true}} bordered/>
        </div>
    )
}