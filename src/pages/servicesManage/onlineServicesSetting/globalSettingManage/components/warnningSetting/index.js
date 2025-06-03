import React, { useEffect, useState } from 'react'
import { uForm } from 'dora'
import WarnningRatio from '@/components/warnningRatio';
import Api from '@/request/api-callcentermanage'
import { get, post } from '@/request/request'
import './index.scss';
import { callcenterEnumOptionType, dictTypeEnum } from "@/const/config";
import { Button, message } from 'dpl-react';
import { formatDataSource, setDefaultValue } from '@/utils';

const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormSlot } = uForm
const actions = createFormActions()
const formItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};

const validateFn = (value, name) => {
    const { alarmItemList = [] } = value;
    for (var idx = 0; idx < alarmItemList.length; idx++) {
        const alarmItem = alarmItemList[idx];
        if (!alarmItem.alarmItemCode) {
            return {
                message: "第" +
                    (idx + 1) + "条数据未填写完整, " + name + "必须选择",
                type: 'error'
            }
        }
        if (!alarmItem.groupCallCompletingRateLowerThreshold && !alarmItem.groupCallCompletingRateUpperThreshold) {
            return {
                message: "第" +
                    (idx + 1) + "条数据未填写完整,接通率值阈值必须填一个",
                type: 'error'
            }
        }
        if (
            ((alarmItem.groupCallCompletingRateLowerThreshold || alarmItem.groupCallCompletingRateLowerThreshold === 0)
                && (alarmItem.groupCallCompletingRateUpperThreshold || alarmItem.groupCallCompletingRateUpperThreshold === 0)) &&
            +alarmItem.groupCallCompletingRateLowerThreshold >= +alarmItem.groupCallCompletingRateUpperThreshold
        ) {
            return {
                message: "第" +
                    (idx + 1) + "条数据未填写有误, 低于的阈值不能大于等于高于的阈值",
                type: 'error'
            }
        }
    }
}

const indexMap = {
    businessCenter: 1,
    group: 2,
    consultBusinessType: 3,
    area: 4,
    '1': "businessCenter",
    '2': "group",
    '3': "consultBusinessType",
    '4': "area"
}

export default function WarnningSetting(props = {}) {
    const { groupType = "2" } = props;
    const [detail, setDetail] = useState({});
    const [businessCenterList, setBusinessCenterList] = useState([]); // 经营中心列表
    const [businessTypeList, setBusinessTypeList] = useState([]); // 自诩业务类型
    const [areaList, setAreaList] = useState([]); // 地区

    /**
     * 获取枚举
     */
    const getEnumOptions = async () => {
        const res = await get({
            url: Api.getEnumOption,
            params: {
                groupNames: [callcenterEnumOptionType.GBusinessCenterType, callcenterEnumOptionType.BAdminCompanyType, 'consult_business_type', 'member_type'].join(','), // FALLOCATION_STRATEGY：成员分配策略
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
        const data = await get({ url: Api.getGroupCompletingRateGlobalConfig, params: { groupType: groupType } })
        if (data.success) {
            let detailData = {};
            if (data.data) {
                detailData = data.data.groupCallCompletingRateAlarmGlobalConfigList.reduce((pre, cur) => {
                    if (!cur) return pre;
                    console.log(cur, cur.alarmType, indexMap);
                    return {
                        ...pre,
                        [indexMap[cur.alarmType]]: {
                            alarmSwitchEnable: cur.alarmSwitchEnable === 'Y',
                            alarmItemList: cur.alarmItemList
                        }
                    }
                }, {})
            }
            console.log(detailData, 'detailData');
            setDefaultValue(detailData, 'businessCenter.alarmSwitchEnable', false);
            setDefaultValue(detailData, 'businessCenter.alarmItemList', [{}]);
            setDefaultValue(detailData, 'consultBusinessType.alarmSwitchEnable', false);
            setDefaultValue(detailData, 'consultBusinessType.alarmItemList', [{}]);
            setDefaultValue(detailData, 'group.alarmSwitchEnable', false);
            setDefaultValue(detailData, 'area.alarmSwitchEnable', false);
            setDefaultValue(detailData, 'area.alarmItemList', [{}]);
            setDetail(detailData)
        } else {
            message.error(data.message)
        }
    }

    const submit = function () {
        actions.submit().then(async data => {
            console.log(data, 'data xxxyyy');
            const groupCallCompletingRateAlarmGlobalConfigList = Object.keys(data.values).map(key => {
                return {
                    alarmType: indexMap[key],
                    alarmSwitchEnable: data.values[key].alarmSwitchEnable === false ? "N" : "Y",
                    alarmItemList: data.values[key].alarmItemList
                }
            })
            const response = await post({
                url: Api.postSaveGroupCompletingRateGlobalConfig,
                data: {
                    groupType: groupType,
                    groupCallCompletingRateAlarmGlobalConfigList
                }
            })
            if (response.success) {
                message.success('修改成功')
            } else {
                message.error(response.message)
            }
        })
    }

    useEffect(() => {
        getEnumOptions();
        getAreaList();
        getDetail();
    }, [])

    return (
        <div
            className='warnning-setting'
        >
            {detail ? <SchemaForm
                className='warnning-setting-form'
                components={{
                    WarnningRatio
                }}
                initialValues={detail}
                actions={actions}
            >
                <FormSlot>
                    <div className='box-title'>接通率告警</div>
                </FormSlot>
                <Field
                    type='object'
                    name='businessCenter'
                    title=''
                    {...formItemLayout}
                    x-component='WarnningRatio'
                    x-component-props={{
                        title: '按经营中心告警',
                        dataSource: businessCenterList,
                        tip: '注：未配置接通率阈值的客群不会触发接通率告警。'
                    }}
                    x-rules={[(value) => validateFn(value, '经营中心')]}
                >
                </Field>
                <Field
                    type='object'
                    name='group'
                    title=''
                    {...formItemLayout}
                    x-component='WarnningRatio'
                    x-component-props={{
                        title: '按组告警',
                        showConditions: false,
                        tip: '注：开启按组接通率告警后，请到咨询中台-电话组管理中为需要告警的电话组配置接通率阈值。未配置接通率阈值的电话组不会触发接通率告警。'
                    }}
                >
                </Field>
                <Field
                    type='object'
                    name='consultBusinessType'
                    title=''
                    {...formItemLayout}
                    x-component='WarnningRatio'
                    x-component-props={{
                        title: '按咨询业务告警',
                        dataSource: businessTypeList,
                        tip: '注：未配置接通率阈值的咨询业务不会触发接通率告警。'
                    }}
                    x-rules={[(value) => validateFn(value, '咨询业务')]}
                >
                </Field>
                <Field
                    type='object'
                    name='area'
                    title=''
                    {...formItemLayout}
                    x-component='WarnningRatio'
                    x-component-props={{
                        title: '按地区告警',
                        dataSource: areaList,
                        tip: '注：未配置接通率阈值的地区不会触发接通率告警。'
                    }}
                    x-rules={[(value) => validateFn(value, '地区')]}
                >
                </Field>
            </SchemaForm> : null}
            <div className='btn-group'>
                <Button type='primary' onClick={submit}>提交</Button>
            </div>
        </div>
    )
}
