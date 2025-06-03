import React, { useState, useEffect } from 'react'
import './index.scss'
import { uForm } from 'dora'
import { get, post } from '@/request/request'
import AppTable from "@/components/common/table";
import Api from "@/request/api-callcentermanage";
import Api2 from "@/request/api-olhelpmanage";
import { callcenterEnumOptionType, consultTypeList, dictTypeEnum, statusList, yesnoList } from '@/const/config';
import { formatDataSource } from '@/utils';
import { Button, Loading, message, Modal } from 'dpl-react';
import PeriodModal from './components/periodModal';
import ThresholdModal from './components/thresholdModal';
import { render } from '@hot-loader/react-dom/cjs/react-dom.production.min';

const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset, createFormActions } = uForm
const actions = createFormActions();

export default function ConsultUserList(props) {
    const [areaList, setAreaList] = useState([]); // 咨询地区列表
    const [businessTypeList, setBusinessTypeList] = useState([]); // 咨询业务
    const [businessCenterList, setBusinessCenterList] = useState([]); // 经营中心列表
    const [warnPeriodTypeList, setWarnPeriodTypeList] = useState([]); // 告警周期列表
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [periodModalVisible, setPeriodModalVisible] = useState(false);
    const [thresholdModalVisible, setThresholdModalVisible] = useState(false);
    /**
     * 获取枚举
     */
    const getEnumOptions = async () => {
        const res = await get({
            url: Api.getEnumOption,
            params: {
                groupNames: 
                [
                  callcenterEnumOptionType.GBusinessCenterType, 
                  callcenterEnumOptionType.BAdminCompanyType, 
                  dictTypeEnum.consultBusinessType, 
                  dictTypeEnum.warnPeriodType
                ].join(','), // FALLOCATION_STRATEGY：成员分配策略
            },
        });
        if (res.success) {
            let centerList = []
            const data = res.data;
            data.forEach((item) => {
                switch (item.groupName) {
                    case dictTypeEnum.consultBusinessType:
                        setBusinessTypeList(formatDataSource(item.options))
                        break;
                    case dictTypeEnum.warnPeriodType:
                        setWarnPeriodTypeList(formatDataSource(item.options))
                        break;
                    case callcenterEnumOptionType.GBusinessCenterType:
                        centerList = centerList.concat(item.options)
                        break;
                    case callcenterEnumOptionType.BAdminCompanyType:
                        centerList = centerList.concat(item.options) // 拼接两个经营中心列表
                        break;
                    default:
                        break;
                }
            });
            setBusinessCenterList(formatDataSource(centerList))
        } else {
            message.error(res.message);
        }
    };


    /**
     * 获取地区
     */
    const getAreaList = async () => {
        const res = await get({
            url: Api.getAreaList,
        });
        if (res.success) {
            const data = res.data;
            setAreaList(formatDataSource(
                [].concat(
                    {
                        id: "000000",
                        name: "全国",
                    },
                    data
                )
            ));
        } else {
            message.error(res.message);
        }
    };

    const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
        const data = await get({
            url: Api2.getWarnningConfigListByPage,
            params: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                ...values,
                areaIdList: values.areaIdList && values.areaIdList.join(','),
                typeList: values.typeList && values.typeList.join(','),
                businessCenterCodeList: values.businessCenterCodeList && values.businessCenterCodeList.join(','),
                consultBusinessTypeList: values.consultBusinessTypeList && values.consultBusinessTypeList.join(','),
            }
        })
        return {
            dataSource: data.data?.list || [],
            pageSize: data.data?.pageSize || 20,
            total: data.data?.total || 0,
            current: data.data?.pageIndex || 1
        }
    }

    const { form, table } = useFormTableQuery(service, { pagination: { pageSize: 20 } })

    const goModify = async (record) => {
        let url =
            window.location.href.split("#")[0] +
            `#/servicesManage/warnningConfig/modify?${record.id ? `id=${record.id}` : ''}`;
        window.open(url);
    }

    const batchUpdateStatus = async (status, idList) => {
        const text = status == 0 ? '启用' : '停用';
        try {
            setLoading(true);
            setLoadingText(`批量${text}中...`)
            const res = await post({
                url: Api2.postWarnningConfigBatchUpdateStatus,
                data: {
                    idList,
                    status
                },
            });
            if (res.success) {
                message.success(`批量${text}成功！`);
                actions.submit();
                setSelectedRowKeys([]);
            } else {
                message.error(res.message);
            }
            setLoading(false);
            setLoadingText("")
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    const confirmUpdate = (status, idList) => {
        if (idList.length <= 0) {
            message.error("请至少选择一条规则")
            return;
        }
        const text = status == 0 ? '启用' : '停用';
        Modal.confirm({
            content: `确认后对应规则状态变为${text}，是否确认？`,
            onOk() {
                batchUpdateStatus(status, idList)
            }
        })
    }

    const batchModify = async (values) => {
        const text = values.controlType == 1 ? '批量修改告警周期' : '批量修改阈值';
        try {
            setLoading(true);
            setLoadingText(`${text}中...`)
            const res = await post({
                url: Api2.postWarnningConfigbatchUpdate,
                data: {
                    ...values,
                    idList: selectedRowKeys
                },
            });
            if (res.success) {
                message.success(`${text}成功！`);
                actions.submit();
                setSelectedRowKeys([]);
                if (values.controlType == 1) {
                    setPeriodModalVisible(false);
                } else {
                    setThresholdModalVisible(false);
                }
            } else {
                message.error(res.message);
            }
            setLoading(false);
            setLoadingText("")
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    }

    const confirmModify = (values) => {
        Modal.confirm({
            content: `确认后对应规则状态变为停用，需要重新启用，是否确认？`,
            onOk() {
                batchModify(values);
            }
        })
    }

    const columns = [
        {
            title: "规则id",
            dataIndex: "id",
            className: 'remark-rows',
            render(text) {
                return <div title={text}>{text}</div>
            }
        },
        {
            title: "咨询业务",
            dataIndex: "consultBusinessTypeName",
            className: 'remark-rows',
            render(text) {
                return <div title={text}>{text}</div>
            }
        },
        {
            title: "咨询方式",
            dataIndex: "typeName",
            className: 'remark-rows',
            render(text) {
                return <div title={text}>{text}</div>
            }
        },
        {
            title: "经营中心",
            dataIndex: "businessCenterCodeName",
            className: 'remark-rows',
            render(text) {
                return <div title={text}>{text}</div>
            }
        },
        {
            title: "地区",
            dataIndex: "areaIdName",
            className: 'remark-rows',
            width: 80,
            render(text) {
                return <div title={text}>{text}</div>
            }
        },
        {
            title: "是否特别关注组",
            dataIndex: "specialFollowGroupFlag",
            render: (text) => {
                return text === 'Y' ? '是' : text === 'N' ? '否' : text;
            }
        },
        {
            title: "特别关注组名称",
            dataIndex: "specialFollowGroupName",
            className: 'remark-rows',
            render(text) {
                return <div title={text}>{text}</div>
            }
        },
        {
            title: "接待组数量",
            dataIndex: "groupCount",
            render(text) {
                return <div title={text}>{text}</div>
            }
        },
        {
            title: "状态",
            dataIndex: "status",
            width: 80,
            render: (text) => {
                return text == 1 ? '停用' : '正常';
            }
        },
        {
            title: "修改人",
            dataIndex: "modifierName",
            className: 'remark-rows',
            width: 80,
            render(text) {
                return <div title={text}>{text}</div>
            }
        },
        {
            title: "修改时间",
            dataIndex: "modifyDate",
            className: 'remark-rows',
            render(text) {
                return <div title={text}>{text}</div>
            }
        },
        {
            title: '操作', dataIndex: 'operation',
            render: (text, record) => {
                return (<div className="table-option-box">
                    <span
                        onClick={() => {
                            goModify(record);
                        }}
                        className="option-button"
                    >
                        修改
                    </span>
                    <span
                        onClick={() => {
                            confirmUpdate(record.status == 1 ? '0' : '1', [record.id])
                        }}
                        className="option-button"
                    >
                        {record.status == 1 ? '启用' : '停用'}
                    </span>
                </div>)
            }
        },
    ]

    useEffect(() => {
        getAreaList();
        getEnumOptions();
    }, []);

    return <div className='app-bg-box warnning-config'>
        <Loading text={loadingText} visible={loading} />
        <SchemaForm
            {...form} inline className='app-search-box' actions={actions}
        >
            <Field
                type='string'
                title='咨询业务'
                name='consultBusinessTypeList'
                x-component='Select'
                x-component-props={{
                    placeholder: '请选择',
                    dataSource: businessTypeList,
                    allowClear: true,
                    showSearch: true,
                    optionFilterProp: "children",
                    multiple: true,
                    maxTagCount: 1,
                    maxTagTextLength: 6
                }}
            />
            <Field type='array'
                title='咨询方式'
                name='typeList'
                x-component='Select'
                x-component-props={{
                    placeholder: '请选择',
                    dataSource: consultTypeList,
                    allowClear: true,
                    showSearch: true,
                    optionFilterProp: "children",
                    multiple: true,
                    maxTagCount: 2,
                    maxTagTextLength: 3
                }} />
            <Field
                type='string'
                title='经营中心'
                name='businessCenterCodeList'
                x-component='Select'
                x-component-props={{
                    placeholder: '请选择',
                    dataSource: businessCenterList,
                    allowClear: true,
                    showSearch: true,
                    optionFilterProp: "children",
                    multiple: true,
                    maxTagCount: 1,
                    maxTagTextLength: 6
                }}
            />
            <Field
                type='string'
                title='地区'
                name='areaIdList'
                className="area-controller"
                x-component='Select'
                x-component-props={{
                    placeholder: '请选择',
                    dataSource: areaList,
                    allowClear: true,
                    showSearch: true,
                    optionFilterProp: "children",
                    multiple: true,
                    maxTagCount: 2,
                    maxTagTextLength: 3
                }}
            />
            <Field
                type='string'
                title='状态'
                name='status'
                x-component='Select'
                x-component-props={{
                    placeholder: '请选择',
                    dataSource: statusList,
                    allowClear: true,
                }}
            />
            <Field
                type='string'
                title='是否特别关注组'
                name='specialFollowGroupFlag'
                x-component='Select'
                x-component-props={{
                    placeholder: '请选择',
                    dataSource: yesnoList,
                    allowClear: true,
                }}
            />
            <FormButtonGroup>
                <Submit style={{ marginRight: 10 }}>搜索</Submit>
                <Reset />
            </FormButtonGroup>
        </SchemaForm>
        <div className="button-box">
            <Button
                type="primary"
                onClick={() => {
                    goModify({});
                }}
            >
                新建
            </Button>
            <Button
                onClick={() => {
                    confirmUpdate('1', selectedRowKeys);
                }}
            >
                批量停用
            </Button>
            <Button
                onClick={() => {
                    confirmUpdate('0', selectedRowKeys);
                }}
            >
                批量启用
            </Button>
            <Button
                onClick={() => {
                    if (selectedRowKeys.length <= 0) {
                        message.error("请至少选择一条规则")
                        return;
                    }
                    setPeriodModalVisible(true);
                }}
            >
                批量修改告警周期
            </Button>
            <Button
                onClick={() => {
                    if (selectedRowKeys.length <= 0) {
                        message.error("请至少选择一条规则")
                        return;
                    }
                    setThresholdModalVisible(true);
                }}
            >
                批量修改阈值
            </Button>
        </div>
        <AppTable 
            className='app-table-box' 
            {...table} 
            columns={columns} 
            rowKey={'id'} 
            rowSelection={{
                selectedRowKeys: selectedRowKeys,
                onChange: e => {
                    setSelectedRowKeys(e);
                }
            }}
        />
        <PeriodModal
            warnPeriodTypeList={warnPeriodTypeList}
            visible={periodModalVisible}
            onCancel={() => {
                setPeriodModalVisible(false)
            }}
            onOk={(values) => {
                confirmModify({
                    ...values,
                    controlType: 1
                })
            }}
        ></PeriodModal>
        <ThresholdModal
            visible={thresholdModalVisible}
            onCancel={() => {
                setThresholdModalVisible(false)
            }}
            onOk={(values) => {
                confirmModify({
                    ...values,
                    controlType: 2
                })
            }}
        ></ThresholdModal>
    </div>
}
