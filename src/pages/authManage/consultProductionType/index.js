import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import CommonManagePageTemplate from '@/components/commonManagePageTemplate'
import Api from "@/request/api-olhelpmanage.js";
import schema from './schema'
import { get } from '@/request/request'

import { setElements } from '@/components/dynamicForm/core';
import {
    dictTypeEnum
} from "@/const/config";
import { postWithReturn } from '@/request/request';
import useDictList from '@/hooks/useDictList';
import { Modal, message} from 'dpl-react';
import { registerEvent, subscribe } from '@/components/dynamicForm/core';
import { getConsultProductionTypeStatus } from "@/const/type";
import moment from 'moment';

const statusMap = {
    valid: '1', // 有效
    forbidden: '2' //禁用
}


export default function ConsultProductionType(props) {
    const [
        consultServiceCategoryList,
    ] = useDictList([
            dictTypeEnum.consultServiceCategory,
        ], Api.getEnumOptions);
    const formRef = useRef({})

    
    const [state] = useState({
        form: {}
    });

    const handleAction = (record, action, refreshList) => {
        const dict = {
            'disabled': '禁用'
        }

        Modal.confirm({
            title: `确认要${dict[action.type]}【${record.consultServiceName}】吗？`,
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                postWithReturn({
                    options: {
                        url:  Api.postServiceConfigDisable,
                        data: {
                            id: record.id,
                            status: statusMap.forbidden //1：有效; 2：禁用
                        }
                    },
                    successText: `${dict[action.type]}成功`,
                    onSuccess: () => {
                        refreshList();
                    },
                })
            },
        });
    }

    const columns = [
        {
            title: "咨询产品类型ID",
            dataIndex: "consultService",
            align: "center",
        },
        {
            title: "咨询产品类型",
            ellipsis: true,
            dataIndex: "consultServiceName",
            align: "center",
        },
        {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            render(_, record, index) {
                let extra = [];
                if (record.status === statusMap.valid) {
                    extra.push({
                        type: 'edit',
                        desc: '修改'
                    })
                    extra.push({
                        type: 'disabled',
                        desc: '禁用',
                        handler: handleAction
                    })
                }
                return extra;
            }
        },
        {
            title: "是否判断授权",
            dataIndex: "checkRightsFlag",
            ellipsis: true,
            align: "center",
            render(value, record) {
                const text = value ? (value === '1' ? '判断授权' : '不判断授权') : ''
                return <span title={text}>{text}</span>
            },
        },
        {
            title: "授权判断优先级",
            dataIndex: "priorityType",
            ellipsis: true,
            align: "center",
            render(value, record) {
                const text = value ? (value === '1' ? '优先判断限次授权' : '优先判断不限次授权') : ''
                return <span title={text}>{text}</span>
            },
        },
        {
            title: "咨询产品大类",
            dataIndex: "categoryName",
            ellipsis: true,
        },
        {
            title: "适用卡片",
            dataIndex: "cardTypes",
            ellipsis: true,
            align: "center",
            render(value, record) {
                const cardTypeNames = (value || []).map(obj => obj.cardTypeName).join(',');
                return <span title={cardTypeNames}>{cardTypeNames || ''}</span>
            },
        },
        {
            title: "状态",
            dataIndex: "status",
            ellipsis: true,
            align: "center",
            render(value, record) {
                return <span>{value ? getConsultProductionTypeStatus(value): ''}</span>
            },
        },
        {
            title: "最后修改人",
            dataIndex: "lastChange",
            ellipsis: true,
            align: "center",
            width: 200,
            render(value, record) {
                return <span>
                    <div>{record.modifierName}</div>
                    <div>{record.modifyDate ? moment(record.modifyDate).format('YYYY-MM-DD HH:mm') : ''}</div>
                </span>
            },
        },    

    ]

    const changePriorityTypeFormState = (checkRightsFlag) => {
        setElements({
            priorityType: {
                props: {
                    disabled: checkRightsFlag == 2,
                },
                formProps: {
                    name: 'priorityType',
                    title: '授权判断优先级',
                    rules: [{
                      required: checkRightsFlag == 1,
                      message: checkRightsFlag == 1 ? '请选择授权判断优先级' : '',
                    }],
                }
            }
        })
    }

    const onMountedHandler = (type, form, modalData) => {
        state.form = form;
        formRef.current = form;
        setElements({
            category: {
                props: {
                    dataSource: consultServiceCategoryList
                }
            }
        })
        let checkRightsFlag = modalData.checkRightsFlag;
        console.log(checkRightsFlag, 'checkRightsFlag');
        changePriorityTypeFormState(checkRightsFlag);
    }

    useEffect(() => {
        registerEvent('checkRightsFlag', 'onChange', () => {
            let checkRightsFlag = formRef.current.getFieldValue('checkRightsFlag');
            state.form.setFieldValue('priorityType', '')
            changePriorityTypeFormState(checkRightsFlag);
            setTimeout(() => {
                state.form.validate('priorityType');
            }, 0)
        })

    }, [])
    useEffect(() => {
        // getGroupList()
    }, [])
    useEffect(() => {
        if(formRef.current) {
            // subscribe((elementId, state) => {
            //     let isGroup = state.value;
            //     formRef.current.setFieldState(
            //         "groupCode",
            //         (state) => {
            //             state.visible = isGroup === 'N' ? false : true
            //         }
            //     );
            //     setElements({
            //         groupCode: {
            //             hidden: isGroup === 'Y' ? false : true,
            //         }
            //     })
            // }, 'isGroup')
        }
    },[formRef.current])

    return <div className='app-bg-box member-banner-manage-list'>
        <CommonManagePageTemplate
            modalWidth={800}
            modalConfig={{
                schema,
                components: {
                },
                onMounted: onMountedHandler,
            }}
            onAddTransformFlag={false}
            searchComponents={{
            }}
            searchConfig={[{
                type: 'Input',
                title: '咨询产品类型',
                name: 'consultServiceName',
                props: {
                    placeholder: '请输入',
                    allowClear: true
                }
            }, {
                type: 'Select',
                title: '当前状态',
                name: 'status',
                props: {
                    placeholder: '请选择状态',
                    allowClear: true,
                    showSearch: true,
                    dataSource: getConsultProductionTypeStatus(),
                }
            }]}
            checkPostData={(data) => {
                // if(data.jumpUrl && data.officialServiceId) {
                //     message.error('上传链接跟选择实务咨询入口二者只可以填写一个')
                //     return false
                // }
            }}
            transformDetailData={(data) => {
                const cardTypes = data.cardTypes?.map(cardType => cardType.cardTypeCode);
                return {
                    ...data,
                    cardTypes
                };
            }}
            parsePostData={(data) => {
                return {
                    ...data,
                    cardTypes: data.cardTypes ? data.cardTypes.join(',') : ''
                }
            }}
            columns={columns}
            apiConfig={{
                fetchListUrl: Api.getServiceConfigQuery,
                postSaveUrl: Api.postServiceConfigSave,
                updateSaveUrl: Api.postServiceConfigUpdate,
            }}
        />
    </div>
}