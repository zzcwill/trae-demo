import React, { useEffect, useMemo, useState } from 'react'
import './index.scss'
import { uForm } from 'dora'
import { Button, Icon, message, Modal, Result, Spin, Table } from 'dpl-react'
import { get } from '@/request/request'
import uploadFile from '@/utils/uploadFile'
import AppTable from "@/components/common/table";
import Api from "@/request/api-olhelpmanage.js";
import history from "@/history";
import {
    classifyTypeEnum,
} from "@/const/config";
// import SchedualingDatePicker from '../../../components/schedulingManage/schedualingDatePicker'
import moment from 'moment'
import ExpertSchedulingManageModal from './components/expertSchedulingManageModal'
const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset, createFormActions } = uForm

const actions = createFormActions()
const renderList2String = (list = []) => {
    return (list || []).join(',');
}
export default function SchedulingList(props) {

    const [timeSource, setTimeSource] = useState([]);
    const [importResult, setImportResult] = useState({
        errorList: []
    });
    const [resultVisible, setResultVisible] = useState(false);
    const [importing, setImporting] = useState(false);
    const [serviceWaysList, setServiceWaysList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [bizAreaList, setBizAreaList] = useState([]);
    const [manageModal, setManageModal] = useState({
        visible: false,
        expert: {}
    });

    const fetchTimeSource = async (record, value) => {
        const dateString = (value || moment(new Date())).format('YYYY-MM-DD');
        const res = await get({
            url: Api.getExpertScheduleDetail,
            params: {
                expertId: record.expertId,
                serviceMode: record.serviceMode,
                startServiceDate: dateString,
                endServiceDate: dateString
            }
        })
        if (res.success) {
            setTimeSource(res.data?.dateStrList || [])
        }
    }

    const openScheduleManage = async (record) => {
        setManageModal({
            expert: record,
            visible: true
        });
    }

    const columns = [
        {
            title: "专家ID",
            dataIndex: "expertId",
            align: "center",
        },
        {
            title: "所属大区",
            dataIndex: "locationNameList",
            align: "center",
            render: renderList2String,
        },
        {
            title: "专家姓名",
            dataIndex: "expertName",
            align: "center",
        },
        // {
        //     title: "擅长行业",
        //     dataIndex: "skilledTradeName",
        //     align: "center",
        // },
        {
            title: "问诊方式",
            dataIndex: "serviceModeList",
            align: "center",
            render: (value) => {
                return renderList2String((value || []).map(v => v.name));
            },
        },
        {
            title: "服务地区",
            dataIndex: "serviceLocationNameList",
            align: "center",
            render: renderList2String,
        },
        {
            title: "操作",
            dataIndex: "action",
            align: "center",
            render: (_, record, index) => {
                return <>
                    {/* <SchedualingDatePicker 
                        onChange={(value) => fetchTimeSource(record, value)}
                        dataSource={timeSource}
                        onOpen={() => fetchTimeSource(record)}
                    /> */}
                    <Button.Text onClick={() => openScheduleManage(record)}><Icon type="calendar-o" style={{ marginRight: 4 }}/>维护排期</Button.Text>
                </>
            }
        },
    ]
    const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
        const data = await get({
            url: Api.getExpertScheduleListByPage,
            params: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                ...values,
                expertName: values.expertName?.trim()
            }
        })
        return {
            dataSource: (data.data.list || []).map(item => ({
                ...item,
                key: Math.random()
            })),
            pageSize: data.data.pageSize,
            total: data.data.total,
            current: data.data.pageIndex
        }
    }
    // 获取业务分类，获取全部，在预览是一同使用，避免多次查询
    const getClassificationList = async () => {
        const res = await get({
        url: Api.getClassifyList,
            params: {},
        });
        if (res.success) {
        const data = res.data;
        if (data && data.length) {
            let areaArray = [];
            let serviceWaysArray = [];
            let bizAreaArray = [];
            data.forEach((item) => {
            switch (item.type) {
                case classifyTypeEnum.inquiryArea:
                    areaArray = [].concat(item.list?.map(item => ({
                        label: item.name,
                        value: item.code
                    })));
                break;
                case classifyTypeEnum.inquiryServiceWays:
                    serviceWaysArray = [].concat(item.list?.map(item => ({
                        label: item.name,
                        value: item.code
                    })));
                break;
                case classifyTypeEnum.bizArea:
                    bizAreaArray = [].concat(item.list?.map(item => ({
                        label: item.name,
                        value: item.code
                    })));
                break;
                default:
                break;
            }
            });
            setServiceWaysList(serviceWaysArray);
            setAreaList(areaArray);
            setBizAreaList(bizAreaArray);
        }
        } else {
            message.error(res.message);
        }
    };

    useEffect(() => {
        getClassificationList();
    }, []);

    const importHandler = async () => {
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
        const res = await uploadFile(Api.postExpertScheduleImport, check)
        setImporting(false);
        if (!res.success) {
            message.error(res.message);
        } else {
            setImportResult({
                errorList: res?.data?.errorList || []
            })
            setResultVisible(true);
        }
    }

    const returnList = () => {
        setResultVisible(false);
        actions.submit();
    }

    const importResultContent = useMemo(() => {
        if (!importResult.errorList?.length) {
            const extra = <Button type="primary" onClick={returnList}>返回列表</Button>
            return (
                <div style={{width: '100%', padding: 48}}>
                    <Result
                        status='success'
                        title={(<>
                            <div className='import-success' >
                                <Icon type="circle-success" />
                            </div>
                            <div style={{fontSize: 24}}>
                                导入成功
                            </div>
                        </>)}
                        extra={extra}
                    />
                </div>
            )
        } else {
            const extra = <Button type='primary' onClick={returnList}>返回列表</Button>
            return (
                <>
                    <div style={{width: '100%', padding: 48}}>
                        <Result
                            status='fail'
                            title={(<>
                                <div className='import-fail'>
                                    <Icon type="circle-error" />
                                </div>
                                <div style={{fontSize: 24}}>
                                    导入失败
                                </div>
                            </>)}
                            subTitle={(
                                <div>
                                    <div>请核对并修改以下信息后，再重新提交。</div>
                                    <div className='import-error-wrap'>
                                        {importResult.errorList?.map(error => (
                                            <div className='import-error'>
                                                <Icon type="circle-error"/>{error}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            extra={extra}
                        />
                    </div>
                </>
            )
        }
    }, [importResult]);
    const { form, table } = useFormTableQuery(service, { pagination: { pageSize: 10 } })

    return <div className='app-bg-box scheduling-list'>
        {manageModal.visible && <ExpertSchedulingManageModal 
            visible={manageModal.visible}
            expert={manageModal.expert}
            onCancel={() => setManageModal({ visible: false, expert: {} })}
            footer={null}
            serviceWaysList={serviceWaysList}
            areaList={areaList}
            bizAreaList={bizAreaList}
        />}
        <Spin spinning={importing} tip={<div className='importing-spinning'>导入中......</div>}>
        <SchemaForm {...form} actions={actions} inline className='app-search-box'>
                <Field type='string'
                    title='专家名称'
                    name='expertName'
                    x-component='Input'
                    x-component-props={{ placeholder: '请输入' }} />
                <Field type='string'
                    title='服务地区'
                    name='serviceLocation'
                    x-component='Select'
                    x-component-props={{ placeholder: '全部', dataSource: areaList, allowClear: true }} />   
                <Field type='string'
                    title='问诊方式'
                    name='serviceMode'
                    x-component='Select'
                    x-component-props={{ placeholder: '全部', dataSource: serviceWaysList, allowClear: true }} />
                <FormButtonGroup>
                    <Submit style={{ marginRight: 10 }}>搜索</Submit>
                    <Reset style={{ marginRight: 10 }} />
                    <Button onClick={importHandler}>导入</Button>
                </FormButtonGroup>
            </SchemaForm>
            <AppTable rowKey="key" className='app-table-box' {...table} columns={columns} /> 
        </Spin>
        <Modal 
            visible={resultVisible} 
            footer={null}
            closable={false}
            className="schedule-import-modal"
        >
            {importResultContent}
        </Modal>
    </div>
}