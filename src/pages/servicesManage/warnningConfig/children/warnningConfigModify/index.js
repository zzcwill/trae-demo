import React, { useEffect, useMemo, useRef, useState } from 'react'
import { uForm } from 'dora'
import Api from '@/request/api-callcentermanage'
import Api2 from '@/request/api-olhelpmanage'
import { get, post } from '@/request/request'
import WarnningRatioSingle from '../../../../../components/warnningRatioSingle';
import './index.scss';
import { callcenterEnumOptionType, consultTypeList, dictTypeEnum, yesnoList } from "@/const/config";
import { Button, Loading, message, Modal } from 'dpl-react';
import qs from 'querystring'
import { formatDataSource, setDefaultValue } from '@/utils';
import history from '@/history'

const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormSlot } = uForm
const actions = createFormActions()
const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 13 },
};

const validateFn = (value) => {
    if (!value?.callCompletingRateLowerThreshold && !value?.callCompletingRateUpperThreshold) {
        return {
            message: "请输入接通率告警阈值",
            type: 'error'
        }
    }
    if (+value?.callCompletingRateLowerThreshold >= +value?.callCompletingRateUpperThreshold) {
        return {
            message: "低于的阈值不能大于等于高于的阈值",
            type: 'error'
        }
    }
}

export default function WarnningConfigModify() {
    const [id, setId] = useState(() => {
        const obj = qs.parse(window.location.href.split("?")[1]);
        return obj.id;
    });
    const [loading, setLoading] = useState(false);
    const [areaList, setAreaList] = useState([]); // 咨询地区列表
    const [businessTypeList, setBusinessTypeList] = useState([]); // 咨询业务
    const [businessCenterList, setBusinessCenterList] = useState([]); // 经营中心列表
    const [warnPeriodTypeList, setWarnPeriodTypeList] = useState([]); // 告警周期列表
    const [groupList, setGroupList] = useState([]); // 接待组列表
    const [specialFollowGroupFlag, setSpecialFollowGroupFlag] = useState(); // 是否特别关注组
    const [detail, setDetail] = useState();
    const [groupListParams, setGroupListParams] = useState({});
    const ref = useRef(null);

    /**
     * 获取枚举
     */
    const getEnumOptions = async () => {
        const res = await get({
            url: Api.getEnumOption,
            params: {
                groupNames: [
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

    const getDetail = async function () {
        if (!id) {
            setDetail({
                specialFollowGroupFlag: 'N'
            })
            setSpecialFollowGroupFlag('N')
            return;
        }
        try {
            const data = await get({ url: Api2.getWarnningConfigDetail, params: { id } })
            if (data.success) {
                setDetail({
                    ...(data.data || {}),
                    groupIds: data.data?.groupIds?.split(','),
                    consultBusinessTypeList: data.data?.consultBusinessType,
                    typeList: data.data?.type,
                    businessCenterCodeList: data.data?.businessCenterCode,
                    areaIdList: data.data?.areaId,
                    ratio: {
                        callCompletingRateLowerThreshold: data.data.callCompletingRateLowerThreshold,
                        callCompletingRateUpperThreshold: data.data.callCompletingRateUpperThreshold
                    }
                })
                setGroupListParams({
                    consultBusinessTypeList: data.data?.consultBusinessType,
                    typeList: data.data?.type,
                    businessCenterCodeList: data.data?.businessCenterCode,
                    areaIdList: data.data?.areaId,
                });
                setSpecialFollowGroupFlag(data.data.specialFollowGroupFlag);
            } else {
                message.error(data.message)
                setDetail({
                    specialFollowGroupFlag: 'N'
                })
                setSpecialFollowGroupFlag('N')
            }
        } catch {
            setDetail({
                specialFollowGroupFlag: 'N'
            })
            setSpecialFollowGroupFlag('N')
        }
    }

    const onCancel = () => {
        history.push('/servicesManage/warnningConfig')
    }

    const postSave = async (data) => {
        setLoading(true)
        const ratio = data.ratio || {};
        delete data.ratio;
        let postData = {
            ...(data || {}),
            ...(ratio || {})
        }
        if (id) {
            postData = {
                warnPeriod: data.warnPeriod,
                ...(ratio || {})
            }
        }
        postData.groupIds = data.groupIds?.join(',')
        postData.id = id;
        try {
            const response = await post({
                url: id ? Api2.postWarnningConfigUpdate : Api2.postWarnningConfigAdd,
                data: postData
            })
            setLoading(false)
            if (response.success) {
                message.success(response?.data?.message || '保存成功')
                onCancel();
            } else {
                message.error(response.message || '保存失败')
            }
        } catch {
            setLoading(false)
        }
    }

    const submit = function () {
        actions.submit().then(async data => {
            const { specialFollowGroupFlag, consultBusinessTypeList, typeList, businessCenterCodeList, areaIdList } = (data.values || {});
            console.log(data, 'data');
            if (specialFollowGroupFlag === 'N' && !id) {
                Modal.confirm({
                    content: `按照所填写内容将根据条件自动拆分为${consultBusinessTypeList?.length * typeList?.length * businessCenterCodeList?.length * areaIdList?.length}条规则，系统只保存未重复的记录，是否确认`,
                    onOk() {
                        postSave(data.values);
                    }
                })
            } else {
                postSave(data.values)
            }
        })
    }

    const getAgentGroupList = async (values) => {
        const res = await get({
            url: Api.getAgentGroupList,
            params: {
                status: 0,
                consultBusinessTypeList: specialFollowGroupFlag === 'N' ? values?.consultBusinessTypeList?.join(',') : values?.consultBusinessTypeList,
                typeList: specialFollowGroupFlag === 'N' ? values?.typeList?.join(',') : values?.typeList,
                businessCenterCodeList: specialFollowGroupFlag === 'N' ? values?.businessCenterCodeList?.join(',') : values?.businessCenterCodeList,
                areaIdList: specialFollowGroupFlag === 'N' ? values?.areaIdList?.join(',') : values?.areaIdList
            }
        });
        if (res.success) {
            const data = res.data;
            setGroupList(formatDataSource(data, true));
        } else {
            message.error(res.message);
        }
    }

    useEffect(() => {
        if (!id) {
            actions.setFieldValue('groupIds', undefined);
        }
    }, [JSON.stringify(groupListParams)])

    useEffect(() => {
        if (specialFollowGroupFlag === 'Y') {
            getAgentGroupList(groupListParams);
        } 
    }, [JSON.stringify(groupListParams), specialFollowGroupFlag])

    useEffect(() => {
        getEnumOptions();
        getAreaList();
        getDetail();
    }, [])

    const disabled = useMemo(() => {
        return !!id;
    }, [id])

    return (
        <div
            className='warnning-config-modify'
        >
            <Loading text={"保存中..."} visible={loading} />
            <div className='page-title'>{`${id ? '修改' : '新增'}告警内容`}</div>
            {detail ? <SchemaForm
                className='warnning-config-modify-form'
                components={{
                    WarnningRatioSingle
                }}
                initialValues={detail}
                actions={actions}
                onChange={(values) => {
                    if (!id) {
                        if (specialFollowGroupFlag !== values.specialFollowGroupFlag) {
                            actions.setFieldValue('consultBusinessTypeList', undefined);
                            actions.setFieldValue('typeList', undefined);
                            actions.setFieldValue('businessCenterCodeList', undefined);
                            actions.setFieldValue('areaIdList', undefined);
                            actions.setFieldValue('specialFollowGroupName', undefined);
                            actions.setFieldValue('groupIds', undefined);
                            setGroupListParams({
                                consultBusinessTypeList: undefined,
                                typeList: undefined,
                                businessCenterCodeList: undefined,
                                areaIdList: undefined
                            })
                            setSpecialFollowGroupFlag(values.specialFollowGroupFlag)
                        } else {
                            setGroupListParams({
                                consultBusinessTypeList: values.consultBusinessTypeList,
                                typeList: values.typeList,
                                businessCenterCodeList: values.businessCenterCodeList,
                                areaIdList: values.areaIdList
                            })
                        }
                    }
                }}
            >
                <FormSlot>
                    <div className='box-title'>告警规则</div>
                </FormSlot>
                <Field
                    type='string'
                    name='specialFollowGroupFlag'
                    title='是否特别关注组'
                    {...formItemLayout}
                    x-component='RadioGroup'
                    x-component-props={{ options: yesnoList, disabled }}
                    required
                    x-rules={[{ required: true, message: '请选择是否特别关注组' }]}
                >
                </Field>
                <Field
                    type='string'
                    title='咨询业务'
                    name='consultBusinessTypeList'
                    x-component='Select'
                    {...formItemLayout}
                    x-component-props={{
                        placeholder: '请选择',
                        dataSource: businessTypeList,
                        allowClear: true,
                        showSearch: true,
                        optionFilterProp: "children",
                        multiple: specialFollowGroupFlag === 'N' && !id,
                        disabled
                    }}
                    required
                    x-rules={[{ required: true, message: '请选择咨询业务' }]}
                />
                <Field type='string'
                    title='咨询方式'
                    name='typeList'
                    x-component='Select'
                    {...formItemLayout}
                    x-component-props={{
                        placeholder: '请选择',
                        dataSource: consultTypeList,
                        allowClear: true,
                        showSearch: true,
                        optionFilterProp: "children",
                        multiple: specialFollowGroupFlag === 'N' && !id,
                        disabled
                    }} 
                    required
                    x-rules={[{ required: true, message: '请选择咨询方式' }]}
                />
                <Field
                    type='string'
                    title='经营中心'
                    name='businessCenterCodeList'
                    x-component='Select'
                    {...formItemLayout}
                    x-component-props={{
                        placeholder: '请选择',
                        dataSource: businessCenterList,
                        allowClear: true,
                        showSearch: true,
                        optionFilterProp: "children",
                        multiple: specialFollowGroupFlag === 'N' && !id,
                        disabled
                    }}
                    required
                    x-rules={[{ required: true, message: '请选择经营中心' }]}
                />
                <Field
                    type='string'
                    title='地区'
                    name='areaIdList'
                    className="area-controller"
                    x-component='Select'
                    {...formItemLayout}
                    x-component-props={{
                        placeholder: '请选择',
                        dataSource: areaList,
                        allowClear: true,
                        showSearch: true,
                        optionFilterProp: "children",
                        multiple: specialFollowGroupFlag === 'N' && !id,
                        disabled
                    }}
                    required
                    x-rules={[{ required: true, message: '请选择地区' }]}
                />
                {specialFollowGroupFlag === 'Y' && <Field
                    type='string'
                    title='特别关注组名称'
                    name='specialFollowGroupName'
                    x-component='Input'
                    {...formItemLayout}
                    x-component-props={{
                        placeholder: '请输入',
                        disabled,
                        maxLength: 54
                    }}
                    required
                    x-rules={[{ required: true, message: '请输入特别关注组名称' }]}
                />}
                {specialFollowGroupFlag === 'Y' && <Field
                    type='string'
                    title='接待组'
                    name='groupIds'
                    x-component='Select'
                    {...formItemLayout}
                    x-component-props={{
                        placeholder: '请选择',
                        dataSource: groupList,
                        allowClear: true,
                        showSearch: true,
                        optionFilterProp: "children",
                        multiple: true,
                    }}
                    required
                    x-rules={[{ required: true, message: '请选择接待组' }]}
                />}
                <Field
                    type='string'
                    title='告警周期'
                    name='warnPeriod'
                    className="warn-period"
                    x-component='Select'
                    {...formItemLayout}
                    x-component-props={{
                        placeholder: '请选择',
                        dataSource: warnPeriodTypeList,
                    }}
                    required
                    x-rules={[{ required: true, message: '请选择告警周期' }]}
                />
                <Field
                    type='object'
                    name='ratio'
                    required
                    title='接通率阈值'
                    {...formItemLayout}
                    x-component='WarnningRatioSingle'
                    x-component-props={{
                        lowKey: 'callCompletingRateLowerThreshold',
                        upperKey: 'callCompletingRateUpperThreshold'
                    }}
                    x-rules={[(value) => validateFn(value)]}
                >
                </Field>
            </SchemaForm> : null}
            <div className='btn-group'>
                <Button type='primary' onClick={submit}>提交</Button>
                <Button onClick={onCancel}>取消</Button>
            </div>
        </div>
    )
}
