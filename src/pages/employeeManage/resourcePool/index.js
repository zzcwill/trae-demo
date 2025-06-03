import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { uForm } from "dora";
import moment from "moment";
import { Table, message, Button, Checkbox, Pagination, Modal, Popover } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { acceptanceChannelCode, resourceConsultTypeList, INCALL, ONLINE } from "@/const/config";
import EmployeeSearch from "../agentManage/components/employeeSearch";
import WorkGroup from "@/pages/employeeManage/workTimeManage/components/workGroup";
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import history from "@/history";

const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    useFormTableQuery,
    Submit,
    FormButtonGroup,
    createFormActions,
    Reset,
} = uForm;
const actions = createFormActions()
const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
};
const defaultPageIndex = 1;
// todo:是否需要默认500
const defaultPageSize = 20;
const STATUS_OPEN = 'open';
const STATUS_STOP = 'stop';

export default function ResourcePool(props) {

    const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
        const res = await post({
            url: Api.getResourcePoolPage,
            data: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                name: values?.name?.trim(),
                resourcePoolEnStatus: values?.resourcePoolEnStatus,
                consultType: values.workGroup && values.workGroup.type === acceptanceChannelCode.online ? ONLINE : INCALL,
                groupIdList:  values.workGroup ? values.workGroup.groupIdList : undefined,
                trueIdList: values?.trueIdList,
                sortRuleList: [{
                    field: 'modify_time',
                    order: 'desc'
                }]
            },
        });
        return {
            dataSource: res.data.list,
            pageSize: res.data.pageSize,
            total: res.data.total,
            current: res.data.pageIndex,
        };
    };

    const deleteResourcePool = async (record) => {
        const res = await post({
            url: Api.resourcePoolDelete,
            data: {
                idList: [record.id],
                consultType: record.consultType || INCALL,
            },
        });
        if (res.success) {
            message.success('删除成功')
            actions.submit();
        } else {
            message.error(res.message)
        }
    }

    const changeResourcePoolStatus = async (record) => {
        const status = record.resourcePoolEnStatus;
        const res = await CallCenterManageApi.postResourcePoolUpdateStatus({
            id: record.id,
            resourcePoolEnStatus: status === STATUS_STOP ? STATUS_OPEN : STATUS_STOP,
        });
        if (res.success) {
            message.success(`${status === STATUS_STOP ? '启用' : '停用'}成功`)
            actions.submit();
        } else {
            message.error(res.message)
        }
    }

    const onDelete = (record) => {
        Modal.confirm({
            title: '是否确认删除？',
            onOk() {
                deleteResourcePool(record)
            }
        })
    }
    const statusChange = (record) => {
        Modal.confirm({
            title: `确认修改当前状态为${record.resourcePoolEnStatus === STATUS_STOP ? '启用' : '停用'}？`,
            onOk() {
                changeResourcePoolStatus(record);
            }
        })
    }

    const goDetail = (record) => {
        history.replace(`/employeeManage/resourcePool/modify${record?.id ? `?id=${record?.id}&consultType=${record?.consultType}` : ''}`);
    }

    const { form, table } = useFormTableQuery(service, { pagination: { 
        pageSize: defaultPageSize,
        showQuickJumper: true,
        showSizeChanger: true
    } });

    const columns = [
        {
            title: '咨询类型',
            dataIndex: "consultType",
            width: 100,
            align: "center",
            render(text) {
                return <div>{text === ONLINE ? '在线' : '来电'}</div>
            }
        },
        {
            title: '资源池名称',
            dataIndex: "name",
            width: 240,
            align: "center",
            render(val) {
                return <Popover overlayClassName="table-column-popover" content={val}><div className="limit-for">{val}</div></Popover>
            }
        },
        {
            title: "坐席资源",
            dataIndex: "agentNameList",
            width: 300,
            render(val) {
                return <Popover overlayClassName="table-column-popover" content={val}><div className="limit-for">{val?.join(',')}</div></Popover>
            }
        },
        {
            title: "适用组",
            dataIndex: "groupNameList",
            width: 300,
            render(val) {
                const ele = val?.map(groupName => (
                    <div>
                        {groupName}
                    </div>
                ))
                return <Popover overlayClassName="table-column-popover" content={ele}><div className="limit-for">{ele}</div></Popover>
            }
        },
        {
            title: "状态",
            dataIndex: "resourcePoolEnStatus",
            width: 300,
            render(val) {
                return <span>{ val === STATUS_STOP ? '停用' : '启用' }</span>
            }
        },
        {
            title: "最后修改人",
            dataIndex: "modifierName",
            width: 250,
            align: "center",
            render(val, record) {
                return <>
                    <div>{record.modifierName || ''}</div>
                    <div>{record.modifyTime ? moment(record.modifyTime).format('YYYY-MM-DD HH:mm') : ''}</div>
                </>
            }
        },
        {
            title: "操作",
            width: 120,
            align: "center",
            render: (text, record, index) => {
                const obj = {
                    children: (
                        <div className="table-option-box">
                            <span
                                onClick={() => {
                                    goDetail(record);
                                }}
                                className="option-button"
                            >
                                修改
                            </span>
                            <span
                                onClick={() => {
                                    statusChange?.(record);
                                }}
                                className="option-button"
                            >
                                {record.resourcePoolEnStatus === STATUS_STOP ? '启用' : '停用' }
                            </span>
                            <span
                                onClick={() => {
                                    onDelete?.(record);
                                }}
                                className="option-button"
                            >
                                删除
                            </span>
                        </div>
                    ),
                    props: {},
                };
                return obj;
            },
        },
    ];

    const initFunc = () => {
    };

    useEffect(() => {
        initFunc();
    }, []);

    return (
        <div className="resource-pool">
            <SchemaForm
                {...form}
                className="app-search-box"
                inline
                components={{ EmployeeSearch, WorkGroup, }}
                actions={actions}
                initialValues={{
                    workGroup: {
                        type: acceptanceChannelCode.call,
                        groupIdList: [],
                    },
                }}
            >
                <Field
                    {...formItemLayout}
                    name="name"
                    type="string"
                    title="资源池名称"
                    x-component="Input"
                />
                <Field
                type="Object"
                title="业务组"
                name="workGroup"
                x-component="WorkGroup"
                x-component-props={{
                    outerFetch: false,
                }}
                />
                <Field
                    type="string"
                    title="坐席"
                    name="trueIdList"
                    {...formItemLayout}
                    x-component="EmployeeSearch"
                    x-component-props={{
                        other: {
                            allowClear: true,
                            showSearch: true,
                            mode: "multiple",
                            maxTagCount: "2",
                            maxTagTextLength: "3",
                            placeholder: "请输入坐席名称、工号、账号"
                        }
                    }}
                />
                <Field
                    type="string"
                    title="状态"
                    {...formItemLayout}
                    name="resourcePoolEnStatus"
                    x-component="Select"
                    x-component-props={{
                        allowClear: true,
                        placeholder: "请选择",
                        dataSource: [{
                            label: "启用",
                            value: "open"
                        }, {
                            label: "停用",
                            value: STATUS_STOP
                        }],
                    }}
                />
                <FormButtonGroup>
                    <Reset>清空条件</Reset>
                    <Submit style={{ marginLeft: 8 }}>查询</Submit>
                </FormButtonGroup>
            </SchemaForm>
            <div className="table-box">
                <div className="table-btn">
                    <Button type="primary" onClick={() => goDetail()}>
                        新增资源池
                    </Button>
                </div>
                <Table className='table-wrap' {...table} columns={columns} />
            </div>
        </div>
    );
}
