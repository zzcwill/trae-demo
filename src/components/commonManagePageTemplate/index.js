import React, { useEffect, useMemo, useRef, useState } from 'react'
import './index.scss'
import { uForm } from 'dora'
import { Button, Icon, message, Modal, Result, Spin, Table } from 'dpl-react'
import { get, post } from '@/request/request'
import DynamicForm from '@/components/dynamicForm';
import { createFormActions as createFormInstance  , setFormValues } from '@/components/dynamicForm/core'
import AppTable from "@/components/common/betterTable";
const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset, createFormActions } = uForm

const actions = createFormActions()
const formInstance = createFormInstance();

const renderList2String = (list = []) => {
    return (list || []).join(',');
}
/**
 * @description 通用管理页面
 */
export default function CommonManagePageTemplate({
    columns = [],
    modalWidth = 560,
    searchConfig = [],
    searchComponents = {},
    modalConfig = {},
    addable = true,
    addText = '新增',
    apiConfig = {},
    transformParams,
    primaryKey = 'id',
    postSavePrimaryKey = 'id',
    onPostSaveSuccess,
    transformDetailData,
    parsePostData,
    checkPostData, //检查传入参数假如传入了且返回false就不发送报错请求
    serviceChange,
    submitClick,
    resetClick,
    pageSize = 10,
    onAddTransformFlag = true
}) {
    const [addVisible, setAddVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [type, setType] = useState('');
    const [modalData, setModalData] = useState({});
    const { schema, ...modalRest } = modalConfig;
    const { fetchListUrl, postSaveUrl, updateSaveUrl, fetchDetailUrl } = apiConfig;
    const pageRef = useRef({}) //缓存page

    // 对字段进行清洗
    const washParamsField = (values = {}) => {
        return Object.entries(values)?.reduce((pre, [key, value]) => {
            let valStr = value;
            if(typeof value === 'string') {
                valStr = `${value}`.trim() 
            }else if(Array.isArray(value)) {
                valStr = value.join(',')
            }
            return {
                ...pre,
                [key]: valStr
            }
        }, {});
    }

    const refreshList = () => {
        actions.submit();
    }

    const service = async (options = {}) => {
        const { values, pagination, sorter = {}, filters = {} } = options
        serviceChange && serviceChange({ ...options })
        console.log('pagination', pagination, sorter);
        if (sorter.field && sorter.order) {
            values.sortField = sorter.field
            values.sortOrder = sorter.order === 'ascending' ? 'ASC' : 'DESC'
        } 

        pageRef.current = Object.assign({},pageRef.current, pagination)
        const data = await get({
            url: fetchListUrl,
            params: {
                pageSize: pageRef.current.pageSize,
                pageIndex: pageRef.current.current,
                ...washParamsField(transformParams ? transformParams(values) : values)
            }
        })
        return {
            dataSource: (data?.data?.list || []).map(item => ({
                ...item,
                key: item[primaryKey] || Math.random()
            })),
            pageSize: data?.data?.pageSize,
            total: data?.data?.total,
            current: data?.data?.pageIndex
        }
    }

    const onPostSave = async (values = {}) => {
        console.log('onPostSave-values', values);
        const res = await post({
            url: updateSaveUrl && modalData[primaryKey] ? updateSaveUrl : postSaveUrl,
            data: {
                [postSavePrimaryKey || primaryKey]: modalData[primaryKey],
                ...washParamsField(parsePostData ? parsePostData(values) : values),
            }
        })
        if (res.success) {
            message.success(`${modalTitle}成功`)
            setModalData({});
            setAddVisible(false);
            setModalTitle('');
            onPostSaveSuccess?.();
            refreshList();
        } else {
            message.error(res.message);
        }
    }

    const onPostSaveHandler = async () => {
        if(type === 'browser') {
            setAddVisible(false);
            return
        }
        const res = await formInstance.submit();  
        if(checkPostData && typeof checkPostData === 'function') {
            const checkResult = checkPostData(res.values)
            if(checkResult === false) return
        }
        onPostSave(res.values)
    }



    const onEditHandler = async (modalData, modalTitle, type = 'add') => {
        setModalTitle(modalTitle);
        setAddVisible(true);
        modalConfig.onOpen?.(type, formInstance, modalData);
        setType(type);
        let result = modalData
        if(type === 'copy') {//复制删除主键
            delete result[primaryKey]
        }
        const primaryKeyValue = result[primaryKey];
        if (primaryKeyValue && fetchDetailUrl) {
            const res = await get({
                url: fetchDetailUrl,
                params: {
                    [postSavePrimaryKey || primaryKey]: result[primaryKey]
                }
            })
            if (res.success) {
                result = res.data
            } else {
                message.error(res.message);
            }
        }
        
        if(result) { //格式化参数
            const formatData =  transformDetailData && (type !== 'add' || onAddTransformFlag) ? transformDetailData(result, type) : result
            console.log('formatData',formatData);
            setModalData(formatData);
            setTimeout(() => {
                setFormValues(formatData);
            }, 300)
        }
    }

    // 默认用这个 onEditHandler
    const actionTypeMap = {
        edit: {
            text: '修改',
            onClick: onEditHandler
        },
        browser: {
            text: '查看',
        },
        copy: {
            text: '新建',
        },
    }

    const actionColumns = useMemo(() => {
        return columns?.map(column => {
            if (column.dataIndex === 'action') {
                return  {
                    title: "操作",
                    dataIndex: "action",
                    align: column.align || "left",
                    render: (_, record, index) => {
                        const actionConfig = column.render?.(_, record);
                        return <>
                            {actionConfig?.map((action, index) => {
                                const { type, handler } = action;
                                return  (
                                    <Button.Text 
                                        onClick={() => {
                                            const defaultAction = actionTypeMap[type];
                                            if (defaultAction && !handler) {
                                                const text = defaultAction.text //文字
                                                const actionHandler = defaultAction.onClick || onEditHandler //处理方法
                                                actionHandler(record, text, type);
                                            } else {
                                                handler?.(record, action, refreshList);
                                            }
                                        }}
                                        key={action.desc}
                                    >
                                        {action.icon}{action.desc}
                                    </Button.Text>
                                )
                            })}
                        </>
                    }
                }
            }
            if (column.listType) {
                return {
                    ...column,
                    render: (_, record, index) => {
                        if (column.objKey) {
                            return renderList2String(_?.map(val => val[column.objKey]))
                        }
                        return renderList2String(_);
                    },
                }
            }
            return column;
        })
    }, [columns]);

    const onMountedHandler = () => {
        modalConfig.onMounted?.(type, formInstance, modalData);
    }

    const { form, table } = useFormTableQuery(service, { pagination: { pageSize: pageSize || 10 } })
    return <div className='app-bg-box common-manage-page-template'>
        <SchemaForm {...form} actions={actions} inline className='app-search-box' components={searchComponents}>
            {searchConfig?.map(field => {
                const {
                    name,
                    title,
                    type,
                    props
                } = field;
                return  <Field type='string'
                    title={title}
                    key={name}
                    name={name}
                    x-component={type}
                    x-component-props={props} 
                />
            })}
            <FormButtonGroup>
                <Submit style={{ marginRight: 10 }} onClick={() => submitClick && submitClick()}>搜索</Submit>
                <Reset style={{ marginRight: 10 }} onClick={() => resetClick && resetClick()}/>
            </FormButtonGroup>
        </SchemaForm>
        {addable && <div className='btn-wrap'>
            <Button 
                type='primary' 
                onClick={() => {
                    setAddVisible(true);
                    modalConfig.onOpen?.('add', formInstance);
                    onEditHandler({}, addText, 'add')
                }}
            >
                {addText}
            </Button>
        </div>}
        <AppTable rowKey="id" className='app-table-box' {...table} columns={actionColumns} scroll={{ x: 1500 }}/> 
        <Modal 
            visible={addVisible} 
            className="add-modal"
            destroyOnClose
            onCancel={() => {
                setAddVisible(false);
            }}
            onOk={onPostSaveHandler}
            title={modalTitle}
            width={modalWidth}
        >
            <DynamicForm 
                schema={schema}
                actions={formInstance}
                {...modalRest}
                onMounted={onMountedHandler}
            />
        </Modal>
    </div>
}
