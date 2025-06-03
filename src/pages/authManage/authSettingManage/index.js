import React, { useEffect, useState, useRef } from 'react'
import './index.scss'
import CommonManagePageTemplate from '@/components/commonManagePageTemplate'
import Api from "@/request/api-olhelpmanage.js";
import schema from './schema'
import { setElements , registerEvent, setFormValues } from '@/components/dynamicForm/core';
import useDictList from '@/hooks/useDictList';
import {
    classifyTypeEnum,
    dictTypeEnum,
    serviceConfigCardTypeEnum
} from "@/const/config";
import { get, postWithReturn } from '@/request/request';
import { message, Modal } from 'dpl-react';
import moment from 'moment';
import { matchNotCN } from '@/utils';

const hiddenConfig = {
    1: ['label', 'productionTypeLabel', 'text', 'noteLabel'],
    2: ['saasCode', 'saasId', 'saasName', 'productionType', 'limitFlag', 'note']
}

export default function AuthSettingManage(props) {

    const [state] = useState({
        form: {},
        preSaasCode: '',
        preSaasId: '',
    });
    const [
        controlTypeList,
        labelCodeList,
        consultWayList,
    ] = useDictList([
        dictTypeEnum.controlType,
        dictTypeEnum.consultLabel,
        dictTypeEnum.consultWay,
    ], Api.getEnumOptions);
    const [consultServiceList, setConsultServiceList] = useState([]);
    const consultServiceListRef = useRef([]);
    const handleAction = (record, action, refreshList) => {
        Modal.confirm({
            title: `确认删除【${record.name}】吗？`,
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                postWithReturn({
                    options: {
                        url: Api.postConsultRightConfigDelete,
                        data: {
                            id: record.id,
                        }
                    },
                    successText: `删除成功`,
                    onSuccess: () => {
                        refreshList();
                    },
                })
            },
        });
    }
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            ellipsis: true,
            align: "center",
            className: "remark-rows",
            width: 160,
        },
        {
            title: "构件ID",
            dataIndex: "componentId",
            ellipsis: true,
            align: "center",
            className: "remark-rows",
            width: 180,
        },
        {
            title: "名称",
            dataIndex: "name",
            ellipsis: true,
            align: "center",
            className: "remark-rows",
            width: 250,
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            render(_, record, index) {
                let extra = [{
                    type: 'edit',
                    desc: '修改'
                }, {
                    type: 'delete',
                    desc: '删除',
                    handler: handleAction
                }];
                return extra;
            }
        },
        {
            title: "控制类型",
            dataIndex: "controlTypeName",
            ellipsis: true,
            align: "center"
        },
        {
            title: "适用咨询产品",
            dataIndex: "consultServiceName",
            ellipsis: true,
            align: "center",
        },
        {
            title: "是否限次",
            dataIndex: "limitFlag",
            ellipsis: true,
            align: "center",
            render(val) {
                return val === 'Y' ? '是' : '否';
            }
        },
        {
            title: "最后修改人",
            dataIndex: "modifierName",
            minWidth: 143,
            ellipsis: true,
            align: "center",
            render(val, record) {
                return <>
                    <div>{record.modifierName || ''}</div>
                    <div>{record.modifyDate ? moment(record.modifyDate).format('YYYY-MM-DD HH:mm') : ''}</div>
                </>
            }
        },
    ]

    const getHiddenConfig = (controlType) => {
        const hiddenElements = hiddenConfig[+(controlType || 0)] || [];
        const showElements = hiddenConfig[3 - +(controlType || 0)] || [];
        return {
            hiddenConfig: hiddenElements.reduce((pre, elementId) => {
                return {
                    ...pre,
                    [elementId]: {
                        hidden: true
                    }
                }
            }, {}),
            showConfig: showElements.reduce((pre, elementId) => {
                return {
                    ...pre,
                    [elementId]: {
                        hidden: false
                    }
                }
            }, {})
        }
    }

    const changeFormVisible = (controlType) => {
        const config = getHiddenConfig(controlType);
        const consultService = state.form.getFieldValue(controlType === "1" ? 'consultService' : 'consultServiceLabel'); 
        state.form.setFieldValue('consultWayEnCodeList', [])
        setElements({
            ...config.hiddenConfig,
            ...config.showConfig,
            consultWayEnCodeList: { 
                hidden: consultWayEnCodeListHidden(consultService),
            }

        })
    }

     /**
     * 查询咨询产品配置列表
     */
    const getConsultProductTypeList = async () => {
        const res = await get({
        url: Api.getServiceConfigQueryServiceConfigList,
        params: {
            // cardTypes: `${serviceConfigCardTypeEnum.expert},${serviceConfigCardTypeEnum.offcial}`
        },
        });
        if (res.success && Array.isArray(res.data)) {
            const array = res.data.filter(Boolean).map((item) => {
                return {
                    value: item.consultService,
                    label: item.consultServiceName,
                    category: item.category,
                };
            })
            setConsultServiceList(array);
            consultServiceListRef.current = array;
        } else {
            message.error(res.message);
        }
    };

    const consultWayEnCodeListHidden = (consultService) => {
        const category = consultServiceListRef.current?.find(item => item.value == consultService)?.category;
        return category === '0001' ? false : true // 会员咨询
    }

    useEffect(() => {
        registerEvent('controlType', 'onChange', () => {
            const controlType = state.form.getFieldValue('controlType');
            changeFormVisible(controlType)
        })
        registerEvent('productionType', 'onChange', () => {
            const consultService = state.form.getFieldValue('consultService');
            setElements({
                consultWayEnCodeList: {
                    hidden: consultWayEnCodeListHidden(consultService)
                }
            })
        })
        registerEvent('productionTypeLabel', 'onChange', () => {
            const consultService = state.form.getFieldValue('consultServiceLabel');
            setElements({
                consultWayEnCodeList: {
                    hidden: consultWayEnCodeListHidden(consultService)
                }
            })
        })
        registerEvent('saasCode', 'onChange', (elementId, element) => {
            const saasCode = state.form.getFieldValue('code');
            if (!matchNotCN(saasCode)) {
                state.form.setFieldValue('code', state.preSaasCode)
            } else {
                state.preSaasCode = saasCode;
            }
        })
        registerEvent('saasId', 'onChange', (elementId, element) => {
            const saasId = state.form.getFieldValue('componentId');
            if (!matchNotCN(saasId)) {
                state.form.setFieldValue('componentId', state.preSaasId)
            } else {
                state.preSaasId = saasId;
            }
        })
        getConsultProductTypeList();
    }, [])

    const onMountedHandler = (type, form, values = {}) => {
        state.form = form;
        const disabled = type === 'edit';
        const config = type !== 'edit' ? getHiddenConfig(1) : getHiddenConfig(+(values.controlType || 0));
        // const consultService = values.controlType === "1" ? values.consultService : values.consultServiceLabel; 
        const mergedConfig = {
            ...config.hiddenConfig,
            ...config.showConfig,
            consultWayEnCodeList: { 
                hidden: consultWayEnCodeListHidden(values.consultService)
            }
        }
        mergedConfig.saasCode = {
            ...mergedConfig.saasCode,
            props: {
                disabled
            }
        }
        mergedConfig.saasName = {
            ...mergedConfig.saasName,
            props: {
                disabled
            }
        }
        mergedConfig.productionType = {
            ...mergedConfig.productionType,
            props: {
                dataSource: consultServiceList
            }
        }
        mergedConfig.consultWayEnCodeList = {
            ...mergedConfig.consultWayEnCodeList,
            props: {
                dataSource: consultWayList,
            }
        }
        mergedConfig.label = {
            ...mergedConfig.label,
            props: {
                dataSource: labelCodeList,
                disabled
            }
        }
        mergedConfig.productionTypeLabel = {
            ...mergedConfig.productionTypeLabel,
            props: {
                dataSource: consultServiceList
            }
        }
        setTimeout(() => {
            setElements({
                controlType: {
                    props: {
                        dataSource: controlTypeList,
                        disabled
                    }
                },
                ...mergedConfig
            })
        }, 0)
    }

    return <div className='app-bg-box auth-setting-manage'>
        <CommonManagePageTemplate
            pageSize={10}
            modalConfig={{
                schema,
                // onMounted: onMountedHandler,
                onOpen: onMountedHandler
            }}
            onAddTransformFlag
            searchConfig={[{
                type: 'Input',
                title: '名称',
                name: 'name',
                props: {
                    placeholder: '请输入',
                    allowClear: true
                }
            }, {
                type: 'Select',
                title: '咨询产品类型',
                name: 'consultService',
                props: {
                    placeholder: '请选择',
                    dataSource: consultServiceList,
                    allowClear: true,
                    mode: 'multiple',
                    showSearch: true,
                }
            }, {
                type: 'Select',
                title: '控制类型',
                name: 'controlType',
                props: {
                    placeholder: '请选择',
                    allowClear: true,
                    dataSource: controlTypeList,
                }
            }]}
            transformDetailData={(data, type) => {
                if (type === 'add') {
                    return {
                        controlType: '1'
                    }
                }
                return {
                    ...data,
                    consultServiceLabel: data.consultService,
                    consultWayEnCodeList: data.consultWayList?.map(item => item.consultWayEnCode),
                    remarkLabel: data.remark,
                    codeLabel: data.code
                };
            }}
            parsePostData={(values) => {
                const isLabel = values.controlType == 2;
                return {
                    ...values,
                    componentId: isLabel ? undefined : values.componentId,
                    name: isLabel ? labelCodeList?.find(label => label.value == values[`code${isLabel? 'Label': ''}`])?.label : values.name,
                    limitFlag: isLabel ? 'N' : values.limitFlag,
                    code: values[`code${isLabel? 'Label': ''}`],
                    consultService: values[`consultService${isLabel? 'Label': ''}`],
                    remark: values[`remark${isLabel? 'Label': ''}`],
                    codeLabel: undefined,
                    consultServiceLabel: undefined,
                    remarkLabel: undefined
                }
            }}
            columns={columns}
            apiConfig={{
                fetchListUrl: Api.getConsultRightConfigListByPage,
                postSaveUrl: Api.postConsultRightConfigAdd,
                updateSaveUrl: Api.postConsultRightConfigUpdate,
                fetchDetailUrl: Api.getConsultRightConfigDetail,
            }}
        />
    </div>
}
