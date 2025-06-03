import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import CommonManagePageTemplate from '@/components/commonManagePageTemplate'
import Api from "@/request/api-olhelpmanage.js";
import schema from './schema'
import { get, postFile } from '@/request/request'

import { setElements } from '@/components/dynamicForm/core';
import {
    classifyTypeEnum,
    dictTypeEnum
} from "@/const/config";
import { postWithReturn } from '@/request/request';
import useDictList from '@/hooks/useDictList';
import { Modal, message} from 'dpl-react';
import { registerEvent, subscribe } from '../../../components/dynamicForm/core';
import { getMemberBannerManageDisplayType, getMemberBannerManageStatus } from "@/const/type";
import UserFuzzyQuery from '@/components/olhelpCommon/userFuzzyQuery' 
import { UploadImage } from "dora";

const statusMap = {
    init: '0', // 未启动
    noBegin: '1',// 未开始
    past: '2', // 过期
    using: '3', // 使用中
    finish: '4', // 已结束
    manualFinish: '5', // 下架
}

const iconDict = {
    '1': '推荐尺寸：宽600px * 高216px',
    '2': '推荐尺寸：宽600px * 高216px',
    '3': '推荐尺寸：宽1220px * 高90px',
    '4': '推荐尺寸：宽686px * 高128px',       
}

export default function MemberBannerManage(props) {
    const [groupList, setGroupList] = useState([])
    const [officialList, setOfficialList] = useState([])
    const [sortOrder, setSortOrder] = useState('');
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
            'ON': '上架',
            'OFF': '下架',
            'delete': '删除'
        }

        const title = dict[action.type] || '操作';

        const message = {
            'ON': '活动上架后，当活动时间到达将在前台进行展示，您确认是否上架活动？',
            'OFF': '下架后活动将停止，不可恢复，您确认要将该活动下架吗',
            'delete': `确认${title}活动【${record.name}】吗？`
        }


        Modal.confirm({
            title: message[action.type],
            okText: "确认",
            cancelText: "取消",
            onOk: () => {
                postWithReturn({
                    options: {
                        url: action.type === 'delete' ? Api.postMarketActivityDelete : Api.postMarketActivityOnShelf,
                        data: {
                            id: record.id,
                            onShelf: action.type === 'ON' ? '1' : '2'
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
            title: "展示位",
            dataIndex: "displayName",
            ellipsis: true,
            align: "center",
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
                return <span title={value ? value.join(',') : ''}>{value ? value.join(',') : ''}</span>
            },
        },
        {
            title: "展示权重",
            dataIndex: "weight",
            ellipsis: true,
            // sorter: true,
            sortable: 'custom',
            align: "center",
            sortOrder
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
            title: "编辑人",
            dataIndex: "modifierName",
            ellipsis: true,
            align: "center",
        },
        {
            title: "编辑时间",
            dataIndex: "modifyTime",
            ellipsis: true,
            align: "center",
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
                if (record.status === statusMap.init) { //1-上架 2-下架
                    extra.push({
                        type: 'ON',
                        desc: '上架',
                        handler: handleAction
                    })
                }
                if (record.status === statusMap.noBegin || record.status === statusMap.using) { //1-上架 2-下架
                    extra.push({
                        type: 'OFF',
                        desc: '下架',
                        handler: handleAction
                    })
                }
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
    const uploadHandler = async (files) => {
        const data = await postFile(Api.saveImage, {
            data: { file: files[0] },
        });
        return [data.data.domain + data.data.imageUrl];
    };

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
            displayType: {
                props: {
                    dataSource: displayTypeList,
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
            imageUrl: {
                props: {
                    onUpload: uploadHandler,
                    disabled: disabled,
                }
            },
            jumpUrl: {
                props: {
                    disabled: disabled,
                }
            },
            officialServiceId:  {
                props: {
                    dataSource: officialList,
                    disabled: disabled,
                }
            },
        })
    }

    // const onOpenHandler = (type, form)  => {
    //     setElements({
    //         name: {
    //             props: {
    //                 // 编辑时不可修改产品包id
    //                 disabled: type !== 'add' && type !== 'copy'
    //             },
    //         }
    //     })
    // }

    const serviceChangeHandler = ({ values, pagination, sorter = {}, filters = {} }) => {
        if(sorter && sorter.columnKey && sorter.field === 'weight') {
            setSortOrder(sorter.order)
        }
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
        registerEvent('displayType', 'onChange', () => {
            let displayType = formRef.current.getFieldValue('displayType');
            setElements({
                imageUrl: {
                    props: {
                        introTip: iconDict[displayType],
                    }
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
            subscribe((elementId, state) => {
                let displayType = state.value;
                setElements({
                    imageUrl: {
                        props: {
                            introTip: iconDict[displayType],
                        }
                    }
                })
            }, 'displayType')
        }
    },[formRef.current])

    return <div className='app-bg-box member-banner-manage-list'>
        <CommonManagePageTemplate
            serviceChange={serviceChangeHandler}
            modalWidth={800}
            modalConfig={{
                schema,
                components: {
                    UploadImage,
                },
                onMounted: onMountedHandler,
            }}
            searchComponents={{
                UserFuzzyQuery
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
                title: '分群名称',
                name: 'groupCode',
                props: {
                    placeholder: '请选择分群',
                    allowClear: true,
                    mode: 'multiple',
                    showSearch: true,
                    dataSource: groupList,
                }
            }, {
                type: 'UserFuzzyQuery',
                title: '编辑人',
                name: 'modifierId',
                props: {
                    placeholder: '请选择',
                    allowClear: true,
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
            submitClick={() => setSortOrder('')}
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