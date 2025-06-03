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
import { getMemberBannerManageStatus } from "@/const/type";

const statusMap = {
    init: '0', // 未启动
}


export default function __functionName(props) {
    const [groupList, setGroupList] = useState([])
    const [officialList, setOfficialList] = useState([])
    const [
        displayTypeList,
    ] = useDictList([
            dictTypeEnum.marketCctivityDisplayType,
        ], Api.getEnumOptions);
    const formRef = useRef({})

    
    const [state] = useState({
        form: {}
    });

    const getGroupList = async () => {
        const res = await get({
          url: Api.getMarketActivityGroupInfoList,
        });
        if (res.success && Array.isArray(res.data) && res.data.length > 0 ) {
            setGroupList(res.data.map(item => {
                return {
                    value: item.groupCode,
                    label: item.groupName,
                }
            }));
        } else {
          message.error(res.message);
        }
    };
    const getOfficeList = async () => {
        const res = await get({
          url: Api.getOfficialServiceList,
          params: {
            consultService: '2',
            consultType: '1',
            pageIndex: 1,
            pageSize: 100, //这边直接 
            scene: 'web'
          }
        });
        if (res.success && res.data && res.data.total > 0 ) {
            setOfficialList(res.data.list.map(item => {
                return {
                    value: item.id,
                    label: item.name,
                }
            }));
        } else {
          message.error(res.message);
        }
    };

    const handleAction = (record, action, refreshList) => {
        const dict = {
            'delete': '删除'
        }

        const title = dict[action.type] || '操作';

        const message = {
            'delete': `确认${title}活动【${record.name}】吗？`
        }

        Modal.confirm({
            title: message[action.type],
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                postWithReturn({
                    options: {
                        url:  Api.postMarketActivityDelete ,
                        data: {
                            id: record.id,
                        }
                    },
                    successText: `${title}成功`,
                    onSuccess: () => {
                        refreshList();
                    },
                })
            },
        });
    }

    const columns = [
        {
            title: "活动名称",
            dataIndex: "name",
            ellipsis: true,
            align: "center",
            className: "remark-rows"
        },
        {
            title: "是否使用分群",
            dataIndex: "isGroup",
            ellipsis: true,
            align: "center",
            render(value, record) {
                return <span>{value ? (value === 'Y' ? '分群' : '不分群') : ''}</span>
            },
        },
        {
            title: "分群名称",
            dataIndex: "groupNameList",
            ellipsis: true,
            align: "center",
            width: 200,
            className: "remark-rows",
            render(value) {
                return <span>{value ? value.join(',') : ''}</span>
            },
        },
        {
            title: "展示权重",
            dataIndex: "weight",
            ellipsis: true,
            sorter: true,
            align: "center",
        },
        {
            title: "活动开启时间",
            dataIndex: "startTime",
            ellipsis: true,
            align: "center",
        },
        {
            title: "活动结束时间",
            dataIndex: "endTime",
            ellipsis: true,
            align: "center",
        },
        {
            title: "当前状态",
            dataIndex: "status",
            ellipsis: true,
            align: "center",
            render(value, record) {
                return <span>{value ? getMemberBannerManageStatus(value) : ''}</span>
            },
        },      
        {
            title: '操作',
            dataIndex: 'action',
            align: "center",
            render(_, record, index) {
                let extra = [{
                    type: 'browser',
                    desc: '查看',
                }];
                extra.push({
                    type: 'copy',
                    desc: '复制',
                })
                if (record.status === statusMap.init) {
                    extra.push({
                        type: 'delete',
                        desc: '删除',
                        handler: handleAction
                    })
                }
                return extra;
            }
        },
    ]
    const onMountedHandler = (type, form) => {
        const disabled = type !== 'add' && type !== 'copy';
        state.form = form;
        formRef.current = form
        setElements({
            name: {
                props: {
                    disabled: disabled,
                }
            },
            isGroup: {
                props: {
                    disabled: disabled,
                }
            },
            groupCode: {
                props: {
                    dataSource: groupList,
                    getPopupContainer: (triggerNode) => triggerNode.parentNode,
                    disabled: disabled,
                }
            },
            weight: {
                props: {
                    disabled: disabled,
                }
            },
            effectDate: {
                props: {
                    disabled: disabled,
                }
            },
        })
    }

    useEffect(() => {
        registerEvent('isGroup', 'onChange', () => {
            let isGroup = formRef.current.getFieldValue('isGroup');
            formRef.current.setFieldState(
                "groupCode",
                (state) => {
                    state.visible = isGroup === 'N' ? false : true
                }
            );
            setElements({
                groupCode: {
                    hidden: isGroup === 'Y' ? false : true,
                }
            })
        })

    }, [])
    useEffect(() => {
        getGroupList()
        getOfficeList()
    }, [])
    useEffect(() => {
        if(formRef.current) {
            subscribe((elementId, state) => {
                let isGroup = state.value;
                formRef.current.setFieldState(
                    "groupCode",
                    (state) => {
                        state.visible = isGroup === 'N' ? false : true
                    }
                );
                setElements({
                    groupCode: {
                        hidden: isGroup === 'Y' ? false : true,
                    }
                })
            }, 'isGroup')
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
            searchComponents={{
            }}
            searchConfig={[{
                type: 'Select',
                title: '展示位',
                name: 'displayType',
                props: {
                    placeholder: '请选择',
                    dataSource: displayTypeList,
                    allowClear: true
                }
            }, {
                type: 'Select',
                title: '当前状态',
                name: 'statusList',
                props: {
                    placeholder: '请选择状态',
                    allowClear: true,
                    mode: 'multiple',
                    showSearch: true,
                    dataSource: getMemberBannerManageStatus(),
                }
            }, {
                type: 'Input',
                title: '活动名称',
                name: 'name',
                props: {
                    placeholder: '请输入',
                    allowClear: true
                }
            }]}
            transformDetailData={(data) => {
                return {
                    ...data,
                    groupCode: data.groupCodeList,
                    imageUrl: data.imageUrl ? [data.imageUrl] : [],
                    effectDate: [data.startTime, data.endTime]
                };
            }}
            checkPostData={(data) => {
                if(data.jumpUrl && data.officialServiceId) {
                    message.error('上传链接跟选择实务咨询入口二者只可以填写一个')
                    return false
                }
            }}
            parsePostData={(data) => {
                return {
                    ...data,
                    imageUrl: data.imageUrl?.[0],
                    startTime: data.effectDate?.[0],
                    endTime: data.effectDate?.[1],
                }
            }}
            columns={columns}
            apiConfig={{
                fetchListUrl: Api.getMarketActivityList,
                postSaveUrl: Api.postMarketActivitySave,
            }}
        />
    </div>
}