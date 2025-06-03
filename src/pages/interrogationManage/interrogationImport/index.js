import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { uForm } from 'dora'
import { Modal, Button, Row, Spin,  Col, message } from 'dpl-react'
import { get, post } from '@/request/request'
import { getInterrogationImportBookMode, getInterrogationImportServiceMode, getInterrogationImportDeductStatus } from '@/const/type'
import downloadFile from '@/utils/downloadFile'
import uploadFile from '@/utils/uploadFile'
import AppTable from "@/components/common/table";
import Status from "@/components/common/status";
import CommentModal from "@/components/common/commentModal";
import UserFuzzyQuery from '@/components/olhelpCommon/userFuzzyQuery' 
import Api from '@/request/api-olhelpmanage'
const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset, createFormActions } = uForm

const actions = createFormActions()

const getRightShowText = (record) => {
    const total = record?.right?.total
    if(!total && total !== 0) return '暂无权益'
    if(total === -1) return '可预约'
    return `可用${total}次`
}

export default function InterrogationImport(props) {
    const [showModal, setShowModal] = useState({})
    const [importing, setImporting] = useState(false);
    const [areaList, setAreaList] = useState([]);
    const [loading, setLoading] = useState(false);
    const modalRef = useRef(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中列表

    
    const getOptionList = async () => {
        const res = await get(Api.classifyExpertTaxList);
        if (res.success) {
            const data = res.data;
            Array.isArray(data) &&
                data.forEach((item) => {
                    if (item.type == '6' && Array.isArray(item.list)) {//问诊地区类型
                        setAreaList(item.list.map(sub => {
                            return {
                                label: sub.name,
                                value: sub.code,
                            }
                        }))
                    }
                });
        } else {
            message.error(res.message);
        }
    };

    const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
        console.log('service', pagination );
        setSelectedRowKeys([]);
        const newValues = {
            pageSize: pagination.pageSize,
            pageIndex: pagination.current,
            ...values,
            customerLocationList: values?.customerLocationList ? values?.customerLocationList.join(',') : undefined,
            trueIdList: values?.trueIdList ? values?.trueIdList.join(',') : undefined,
            startCreateDate: values?.createDate?.[0],
            endCreateDate: values?.createDate?.[1],
            startServiceDate: values?.serviceDate?.[0],
            endServiceDate: values?.serviceDate?.[1],
        }
        delete newValues?.serviceDate
        delete newValues?.createDate
        const data = await get({
            url: Api.getExpertInquiryImportList,
            params: newValues
        })
        return {
            dataSource: data.data?.list || [],
            pageSize: data.data?.pageSize || 10,
            total: data.data?.total || 0,
            current: data.data?.pageIndex || 1
        }
    }
    const { form, table, trigger } = useFormTableQuery(service, { pagination: { pageSize: 10, pageSizeOptions: ['10'] } })

    const reasonClick = (record) => {
        if(!record.noneDeductReason) return
        modalRef.current = Modal.open({
            title: <strong>不扣次原因详情</strong>,
            content: record.noneDeductReason,
            onOk: () => { modalRef.current.destroy() }
            // okText: "知道了",
            // cancelText: "取消",
        });
    }


    const batchClick = () => {
        postBatchDeduct(selectedRowKeys)
    }


    const postBatchDeduct = async (ids) => {
        if (loading) return
        setLoading(true)
        const res = await post({
            url: Api.postExpertInquiryImportBatchDeductRecord,
            data: {
                idList: ids,
            },
        });
        setLoading(false)
        if (res.success) {
            setSelectedRowKeys([])
            trigger()
            const data = res.data
            // 展示扣次结果3条扣次成功，3条扣次失败，失败原因：a；b；c
            modalRef.current = Modal.open({
                title: <strong>扣次结果</strong>,
                className: "import-deduct-modal",
                content: <div className='deduct-content'>
                    {data.success && <div>
                        扣次成功
                    </div>}
                    {ids.length === 1 && data.success == false && <div>
                        扣次失败
                    </div>}
                    {ids.length > 1 && <div>
                        {data.successNum ? <div>{data.successNum}条扣次成功</div> : null}
                        {data.failNum ? <div>{data.failNum}条扣次失败</div> : null}
                    </div>}
                    {data.failMessageList && data.failMessageList.length > 0 && <div>
                        <strong>失败原因：</strong>
                        <div dangerouslySetInnerHTML={{ __html: data.failMessageList.join('<br/>')}}></div>
                    </div>}
                </div>,
                onOk: () => { modalRef.current.destroy() }
                // okText: "知道了",
                // cancelText: "取消",
            });
        } else {
            message.error(res.message);
        }
    }


    const postNoDeduct = async (remark) => {
        const res = await post({
            url: Api.postExpertInquiryImportNotDeductRecord,
            data: {
                id: showModal.id,
                noneDeductReason: remark
            },
        });
        if (res.success) {
            setModalVisible(false)
            setShowModal({})
            trigger()
        } else {
            message.error(res.message);
        }
    }

    const importClick = async () => {
        let check = (files) => {
            const excelReg = /\.xlsx?$/
            const name = files[0].name
            if (!excelReg.test(name)) {
                message.error('仅能导入.xlsx、.xls后缀的文件')
                return false
            }
            setImporting(true);
            return true;
        }
        const res = await uploadFile(Api.postExpertInquiryImport, check)
        setImporting(false);
        actions.submit();
        if (!res.success) {
            message.error(res.message);
        } else {
            const failMessageList = res?.data?.failMessageList || []
            if(failMessageList.length > 0) {
                modalRef.current = Modal.open({
                    title: <strong>导入失败原因</strong>,
                    className: "import-error-modal",
                    content: <div className='error-content' dangerouslySetInnerHTML={{ __html: failMessageList.join('<br/>') }}></div>,
                    onOk: () => { modalRef.current.destroy() }
                    // okText: "知道了",
                    // cancelText: "取消",
                });
            } else {
                message.success('导入成功');
            }
        }
    }
    const templateDownload = async () => {
        const res = await get({
            url: Api.getInquiryImportTemplateUrl,
        });
        if(res.success && res.data) {
            downloadFile(res.data, false)
        } else {
            message.error(res.message);
        }
    }
    const columns = [
        {
            title: "id",
            dataIndex: "id",
            align: "center",
        },
        {
            title: "导入时间",
            dataIndex: "createDate",
            align: "center",
        },
        {
            title: "问诊日期",
            dataIndex: "serviceDate",
            align: "center",
        },
        {
            title: "问诊时段",
            dataIndex: "inquiryTime",
            align: "center",
        },
        {
            title: "专家姓名",
            dataIndex: "expertName",
            ellipsis: true,
            width: 100,
            align: "center",
            className: 'remark-rows',
        },
        {
            title: "专家所属大区",
            dataIndex: "expertLocation",
            align: "center",
        },
        {
            title: "企业所属地区",
            dataIndex: "customerLocation",
            align: "center",
        },
        {
            title: "企业名称",
            dataIndex: "customerName",
            ellipsis: true,
            width: 150,
            align: "center",
            className: 'remark-rows',
        },
        {
            title: "问诊人姓名",
            dataIndex: "clientName",
            ellipsis: true,
            width: 100,
            align: "center",
            className: 'remark-rows',
        },
        {
            title: "问诊方式",
            dataIndex: "serviceModeName",
            align: "center",
        },
        {
            title: "手机号码",
            dataIndex: "clientMobile",
            align: "center",
        },
        {
            title: "预约方式",
            dataIndex: "bookMode",
            align: "center",
            render(text,record) {
                return <div>{getInterrogationImportBookMode(text)}</div>
            },
        },
        {
            title: "企业当前权益",
            dataIndex: "right",
            align: "center",
            render(text,record) {
                return <div>{getRightShowText(record)}</div>
            },
        },
        {
            title: "权益状态",
            dataIndex: "deductStatus",
            ellipsis: true,
            align: "center",
            render(text, record) {
                if(text === '01' || text === '99') { // 绿色
                    return <Status backgroundColor="#00CC66" text={record.deductStatusName} />
                }
                if(text === '02') {// 扣次失败 - 红
                    return <Status backgroundColor="#E52441" text={record.deductStatusName} />
                }
                if(text === '00') { // 未扣次 - 灰
                    return <Status backgroundColor="#666666" text={record.deductStatusName} />
                }
            },
        },
        {
            title: "导入人",
            dataIndex: "creatorName",
            align: "center",
        },
        {
            title: "操作",
            dataIndex: "operation",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div className="option-button-list">
                        {record.bookMode === '00' && (record.deductStatus === '00' || record.deductStatus === '02') && //失败
                            <span
                                onClick={() => postBatchDeduct([record.id])}
                                className="option-button"
                            >
                                扣次
                            </span>
                        }
                        {record.bookMode === '00' && (record.deductStatus === '00' || record.deductStatus === '02')  && //失败
                            <span
                                className="option-button"
                                onClick={() => {
                                    setShowModal(record)
                                    setModalVisible(true)
                                }}
                            >
                                不扣次
                            </span>
                        }
                        {record.bookMode === '00' && record.deductStatus === '99' && //无需扣次
                            <span
                                className="option-button"
                                onClick={() => reasonClick(record)}
                            >
                                不扣次原因
                            </span>
                        }                        
                    </div>
                );
            },
        },
    ]

    useEffect(() => {
        getOptionList()
    },[])

    return <div className='app-bg-box interrogation-import'>
        <Spin spinning={importing} tip={<div className='importing-spinning'>导入中......</div>}>
            <SchemaForm 
                {...form} 
                actions={actions} 
                inline 
                className='app-search-box' 
                components={{UserFuzzyQuery}}
            >
                <Field type='string'
                    title='企业名称'
                    name='customerName'
                    x-component='Input'
                    x-component-props={{ placeholder: '请输入' }} />
                <Field
                    type="array"
                    title="企业所属地区"
                    name="customerLocationList"
                    x-component="Select"
                    x-component-props={{
                        allowClear: true,
                        showSearch: true,
                        optionFilterProp: "children",
                        placeholder: '请选择企业所属地区',
                        dataSource: areaList,
                        mode: 'multiple',
                        // optionFormat: {
                        //     label: 'name',
                        //     value: 'code',
                        // },
                    }}
                />
                <Field
                    type="string"
                    title="导入人"
                    name="trueIdList"
                    x-component="UserFuzzyQuery"
                    x-component-props={{
                        mode: 'multiple',
                        maxTagCount: "1",
                        maxTagTextLength: "6",
                    }}
                />
                <Field
                    type="string"
                    title="问诊方式"
                    name="serviceMode"
                    x-component="Select"
                    x-component-props={{
                        allowClear: true,
                        placeholder: '请选择问诊方式',
                        dataSource: getInterrogationImportServiceMode(),
                        optionFormat: {
                            label: 'name',
                            value: 'id',
                        },
                    }}
                />               
                <Field
                    type="string"
                    title="预约方式"
                    name="bookMode"
                    x-component="Select"
                    x-component-props={{
                    allowClear: true,
                    placeholder: '请选择预约方式',
                    dataSource: getInterrogationImportBookMode(),
                    optionFormat: {
                        label: 'name',
                        value: 'id',
                    },
                    }}
                />
                <Field
                    title="导入日期"
                    name="createDate"
                    x-component='RangePicker'
                    x-component-props={{"placeholder": ["请选择", "请选择"], "allowClear": true}}
                />
                <Field
                    title="问诊日期"
                    name="serviceDate"
                    x-component='RangePicker'
                    x-component-props={{"placeholder": ["请选择", "请选择"], "allowClear": true}}
                />
                <Field
                    type="string"
                    title="权益状态"
                    name="deductStatus"
                    x-component="Select"
                    x-component-props={{
                    allowClear: true,
                    placeholder: '请选择权益状态',
                    dataSource: getInterrogationImportDeductStatus(),
                    optionFormat: {
                        label: 'name',
                        value: 'id',
                    },
                    }}
                />
                <FormButtonGroup>
                    <Submit style={{ marginRight: 10 }} />
                    <Reset />
                </FormButtonGroup>
            </SchemaForm>
            <Row>
                <Button style={{marginLeft: 10, float: 'left'}} disabled={selectedRowKeys.length === 0 || loading} type='primary' onClick={batchClick}>批量扣次</Button>
                <Button style={{marginLeft: 10, float: 'right'}} onClick={templateDownload}>模板下载</Button>
                <Button style={{marginLeft: 10, float: 'right'}} type='primary' onClick={importClick}>导入</Button>
            </Row>
            <AppTable 
                className='app-table-box' 
                {...table} 
                columns={columns} 
                rowKey="id" 
                // scroll={{ x: 1200 }}
                rowSelection={{
                    selectedRowKeys: selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                      setSelectedRowKeys(selectedRowKeys);
                    },
                    getCheckboxProps: (record) => ({
                      disabled: !record.id 
                      || record.bookMode === '01' 
                      || (record.bookMode === '00' && (record.deductStatus === '01' || record.deductStatus === '99') ), // Column configuration not to be checked
                      name: record.name,
                    }),
                }}
            /> 
        </Spin>
        <CommentModal
            open={modalVisible}
            submitClose={false}
            maxLength={100} //最大字符长度
            title={'不扣次原因'}//模态框名称
            label={'不扣次原因'}//项目名称
            prop="remark"//参数名称
            handleClose={() => setModalVisible(false)}
            handleClick={(remark) => postNoDeduct(remark)}
        />
    </div>
}