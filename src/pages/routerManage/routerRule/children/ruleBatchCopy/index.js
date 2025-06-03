import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react'
import './index.scss'
import { uForm } from "dora";
import { Button, Form, Input, Loading, message, Modal, Select } from 'dpl-react'
import { get, post } from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import RuleConfig from "../../components/ruleConfig";
import { paramCodeType } from '../../config'
import { olhelpEnumOptionType, callcenterEnumOptionType } from "@/const/config";
import Card from './card';
import qs from 'querystring';
import PolicyConfig from './policyConfig';
import FastInput from './fastInput';
import history from '@/history';

const groupNamesList = [
    olhelpEnumOptionType.RouterRuleParamCode,
    olhelpEnumOptionType.RouterRuleOperatorType,
    olhelpEnumOptionType.Channel,
    callcenterEnumOptionType.region_company_code,
];
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
};
const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormEffectHooks, FormSpy } = uForm
const filterParamCodeList = [paramCodeType.brand]

const loopNum = 1;
const loopArr = [];
for (let idx = 0; idx < loopNum; idx++) {
    loopArr.push(idx);
}



// const HighDebounceComponent = (Comp) => {
//     return (props) => {
//         const { onChange, ...rest } = props;
//         const onChangeHandler = throttle((value) => {
//             onChange?.(value);
//         }, 300)

//         return <Comp 
//             {...rest}
//             onChange={onChangeHandler}
//         />
//     }
// }

// const HighSelect = HighDebounceComponent(Select);

// const HighInput = (props) => {
//     const { onChange, ...rest } = props;
//     const onChangeHandler = throttle((value) => {
//         onChange?.(value);
//     }, 100)
//     return <Input 
//         {...rest}
//         onChange={(e) => {
//             onChangeHandler(e.target.value)
//         }}
//     />
// }

const HighInput = FastInput;
const HighSelect = Select;
let policyMap = {};

function BatchCopy(props) {
    const { form } = (props || {});
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsValue, setFieldsValue, validateFields } = form;
    const [groupList, setGroupList] = useState([]) //在线组
    const [acceptanceMode, setAcceptanceMode] = useState([])// 受理模式
    const [brand, setBrand] = useState([]) // 产品维度
    const [brandMap, setBrandMap] = useState({}) // 产品维度map
    const [optionsData, setOptionsData] = useState([]);
    const [locationListData, setLocationListData] = useState([]);
    const [orgTreeData, setOrgTreeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const [allRuleGroup, setAllRuleGroup] = useState([]);
    const [ruleIds] = useState(() => {
        const params = qs.parse(window.location.href.split("?")[1]);
        return params.ruleIds?.split(',');
    });

    const allRuleList = useMemo(() => {
        policyMap = {};
        return allRuleGroup.reduce((pre, cur) => {
            if (!cur.ruleList?.length) return pre;
            return [
                ...pre,
                ...cur.ruleList?.map(rule => {
                    if (!ruleIds.includes(`${rule.id}`)) {
                        return null;
                    }
                    policyMap[cur.id] = true;
                    return {
                        ...rule,
                        policyName: cur.name,
                        policyId: cur.id
                    }
                }).filter(Boolean)
            ]
        }, [])
    }, [allRuleGroup]);

    const getWdList = async () => {
        const data = await get({ url: Api.getWdList })
        if (data.success) {
            let brandList = []
            let brandMap = {}
            brandList = data.data.brand.map(item => {
                brandMap[item.id] = item
                return { label: item.name, value: item.id }
            })
            setBrand(brandList)
            setBrandMap(brandMap)
        }
    }


    const getDetailList = async (ids) => {
        setLoading(true)
        setLoadingText("加载中")
        try {
            const data = await post({ url: Api.routeRuleList, data: { ruleIdList: ids } })
            setLoading(false)
            setLoadingText("")
            if (data.success) {
                setAllRuleGroup(data.data);
            }
        } catch (error) {
            setLoading(false)
            setLoadingText("")
            message.error("服务异常，数据加载失败")
        }
    }
    const getGroupList = async () => {
        const data = await get({ url: Api.getCommonGroupList, params: { type: '2' } })
        if (data.success) {
            setGroupList(data.data.map(item => {
                return { label: item.name, value: item.id }
            }))
        }
    }
    const getOptions = async () => {
        const data = await get({
            url: Api.getEnumOptions, params: {
                groupNames: 'route_rule_acceptance_mode'
            }
        })
        let map = {
            'route_rule_acceptance_mode': setAcceptanceMode
        }
        if (Array.isArray(data.data)) {
            data.data.forEach(item => {
                map[item.groupName] && map[item.groupName](item.options.map(item => {
                    return { label: item.name, value: item.id }
                }))
            })
        }
    }

    const formatPostData = (values) => {
        return {
            copyToPolicyId: values.policyConfig.policy,
            routeRuleBaseCopyJOList: allRuleList.map(item => {
                const { id, policyId } = item;
                console.log(item, 'item');
                return {
                    ruleId: id,
                    policyId,
                    name: values[`name${item.id}`],
                    remark: values[`remark${item.id}`],
                    groupId: values[`groupId${item.id}`],
                    acceptanceMode: values[`acceptanceMode${item.id}`],
                    conditionList: values[`conditionList${item.id}`]
                }
            })
        };
    }

    const submitPost = async (postData) => {
        setLoading(true)
        setLoadingText("路由规则复制中...")
        const res = await post({
            url: Api.postBatchOperateCopy,
            data: postData
        }).catch(() => {
            setLoading(false)
            setLoadingText("")
        })
        setLoading(false)
        setLoadingText("")
        if (res.success) {
            message.success('批量复制成功')
            history.replace('/routerManage/routerRule');
        } else {
            message.error(res.message || "批量复制失败")
        }
    }

    const scrollToDom = (domId, err) => {
        let  dom = document.getElementById(domId);
        if (domId.indexOf('conditionList') > -1) {
            console.log(err, 'err');
            const errMessage = err.errors?.[0]?.message;
            console.log(errMessage, 'errMessage');
            const index = errMessage.substring(errMessage.indexOf('第') + 1, errMessage.indexOf('条'));
            const errorItem = dom.querySelectorAll('.list .rule-config-item')?.[index - 1];
            dom = errorItem;
            console.log(errorItem, 'errorItem');
        }
        if (!dom) return;
        dom.scrollIntoViewIfNeeded();
    }

    const confirmHandler = () => {
        validateFields((errs, values) => {
            console.log(errs, 'err');
            if (!Object.keys(errs || {})?.length) {
                const postData = formatPostData(values);
                let title = '';
                if (values.policyConfig.mode == '1') {
                    title = '确定保存批量复制的规则么？'
                } else {
                    if (values.policyConfig.mode === '2') {
                        const keys = Object.keys(policyMap);
                        // 判断选择的策略是否有多个，如果有多个，提示“您选择的规则属于不同策略，确定要都复制到该策略下吗？”，否则提示“确定保存批量复制的规则么？”
                        if (keys?.length > 1) {
                            title = "您选择的规则属于不同策略，确定要都复制到该策略下吗？";
                        } else {
                            title = '确定保存批量复制的规则么？'
                        }
                    }
                }
                Modal.confirm({
                    content: title,
                    onOk: () => {
                        submitPost(postData)
                    }
                })
            } else {
                const errorItemKeys = Object.keys(errs);
                const scrollToDomId = errorItemKeys?.[0];
                if (scrollToDomId !== 'policyConfig') {
                    scrollToDom(scrollToDomId, errs[scrollToDomId])
                } else {
                    const scrollToDomId = errorItemKeys?.[1];
                    if (scrollToDomId) {
                        scrollToDom(scrollToDomId, errs[scrollToDomId])
                    }
                }
            }
        })
        // console.log(form.getFieldsValue(), 'form.getFieldsValue()');
    }

    const getSelectOptions = async () => {
        const data = await get({
            url: Api.getEnumOptions,
            params: {
                groupNames: groupNamesList.join(","),
            },
        });
        setOptionsData(data.data);
    };
    const getLocationList = async () => {
        const data = await get({ url: Api.commonGetLocationList });
        setLocationListData(data.data);
    };

    const getOrgTree = async () => {
        try {
            const res = await get({ url: Api.getOrgTree });
            setOrgTreeData(res.data)
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        console.log(brandMap, ruleIds, 'ruleIds');
        if (ruleIds && Object.keys(brandMap)?.length > 0) {
            getDetailList(ruleIds)
        }
    }, [ruleIds, brandMap])
    useEffect(() => {
        getGroupList()
        getOptions()
        getWdList()
        getSelectOptions()
        getLocationList()
        getOrgTree()
    }, [])

    const formatConditionList = (detail) => {
        if (Array.isArray(detail.conditionList) && detail.conditionList.length > 0) {
            let newData = Object.assign({}, detail)
            const conditionList = [].concat(detail.conditionList);
            if (Array.isArray(conditionList)) {
                const dataMap = {
                    [paramCodeType.brand]: brandMap
                }
                conditionList.forEach((item, index) => {
                    if (filterParamCodeList.indexOf(item.paramCode) > -1) {
                        let newValue = [];
                        try {
                            item.targetValue && item.targetValue.split(',').forEach((code) => {
                                if (dataMap[item.paramCode][code] && newValue.indexOf(code) < 0) {
                                    newValue.push(code)
                                }
                            })
                        } catch (e) {
                            console.error(e)
                        }
                        item.targetValue = newValue.join(',')
                    }
                })
            }
            newData.conditionList = conditionList
            return newData;
        }
        return detail;
    }

    useLayoutEffect(() => {
        const formValues = allRuleList.reduce((pre, cur) => {
            if (!cur) return pre;
            const item = formatConditionList(cur);
            return {
                ...pre,
                [`name${item.id}`]: item.name,
                [`remark${item.id}`]: item.remark,
                [`conditionList${item.id}`]: item.conditionList,
                [`groupId${item.id}`]: item.groupId,
                [`acceptanceMode${item.id}`]: item.acceptanceMode
            }
        }, {})
        setFieldsValue(formValues);
    }, [allRuleList]);

    const formValues = getFieldsValue();

    return (
        <div className='copy-rule'>
            <Loading text={loadingText} visible={loading} />
            <div className="title">路由规则 / 批量复制</div>
            <div className='rule-form-list'>
                <Form form={form}>
                    <div className='policy-config-box'>
                        <Form.Item
                            label="规则复制位置"
                            required
                        >
                            {getFieldDecorator('policyConfig', {
                                initialValue: { mode: undefined, policy: undefined },
                                rules: [{
                                    validator: (rule, value, callback) => {
                                        try {
                                            if (!value.mode) {
                                                throw new Error('请选择规则复制位置');
                                            }
                                            if (value.mode === '2' && !value.policy) {
                                                throw new Error('请选择您想复制到的路由策略');
                                            }

                                        } catch (err) {
                                            callback(err);
                                        }
                                        callback()
                                    }
                                }]
                            })(<PolicyConfig policyList={allRuleGroup} />)}
                        </Form.Item>
                    </div>
                    <div className='rule-content'>
                        {allRuleList.map((item, index) => {
                            const groupRequired = formValues[`acceptanceMode${item.id}`] != 0 && formValues[`acceptanceMode${item.id}`] != 4;
                            return (
                                <Card key={`policy${item.policyId}-rule${item.id}`} className='form-area-row' title={`规则所属策略：${item.policyName}`}>
                                    <Form.Item
                                        label="规则名称"
                                        key={`name${item.id}`}
                                    >
                                        {getFieldDecorator(`name${item.id}`, {
                                            rules: [{
                                                required: true,
                                                message: "请输入规则名称"
                                            }]
                                        })(<HighInput
                                            placeholder='请输入规则名称'
                                            maxLength={20}
                                            key={`name${item.id}`}
                                        />)}
                                    </Form.Item>
                                    <Form.Item
                                        label="备注"
                                        key={`remark${item.id}`}
                                    >
                                        {getFieldDecorator(`remark${item.id}`, {})(<HighInput
                                            placeholder='请输入备注'
                                            maxLength={100}
                                            key={`remark${item.id}`}
                                        />)}
                                    </Form.Item>
                                    <Form.Item
                                        label="规则配置"
                                        key={`conditionList${item.id}`}
                                    >
                                        {getFieldDecorator(`conditionList${item.id}`, {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请配置规则",
                                                }, {
                                                    validator: (rule, value, callback) => {
                                                        try {
                                                            let indexArr = []
                                                            Array.isArray(value) && value.forEach((item, index) => {
                                                                if (!item.operatorType || !item.paramCode || !item.targetValue) {
                                                                    indexArr.push(index + 1)
                                                                }
                                                            })
                                                            if (indexArr.length > 0) {
                                                                throw new Error('第' + indexArr.join(',') + '条规则有未填项，请检查')
                                                            }
                                                        } catch (err) {
                                                            callback(err);
                                                        }
                                                        callback()
                                                    }
                                                }
                                            ],
                                        })(<RuleConfig
                                            placeholder="请输入"
                                            brand={brand}
                                            optionsData={optionsData}
                                            locationListData={locationListData}
                                            orgTreeData={orgTreeData}
                                            key={`conditionList${item.id}`}
                                        />)}
                                    </Form.Item>
                                    {groupRequired ? <Form.Item
                                        label="分配给组"
                                        key={`groupId${item.id}`}
                                        className={'required'}
                                    >
                                        {getFieldDecorator(`groupId${item.id}`, {
                                            rules: [{
                                                required: true,
                                                message: '请选择分配给组'
                                            }]
                                        })(<HighSelect
                                            placeholder='请选择在线组'
                                            showSearch
                                            allowClear
                                            key={`groupId${item.id}`}
                                            filterOption={(input, option) => {
                                                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }}
                                            id={`groupId${item.id}`}
                                        >
                                            {groupList.map(({ label, value }) => {
                                                return <Select.Option value={value} key={value}>{label}</Select.Option>
                                            })}
                                        </HighSelect>)}
                                    </Form.Item> : <Form.Item
                                        label="分配给组"
                                        key={`groupId${item.id}`}
                                        className={'not-required'}
                                    >
                                        {getFieldDecorator(`groupId${item.id}`, {})(<HighSelect
                                            placeholder='请选择在线组'
                                            showSearch
                                            allowClear
                                            key={`groupId${item.id}`}
                                            filterOption={(input, option) => {
                                                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }}
                                            id={`groupId${item.id}`}
                                        >
                                            {groupList.map(({ label, value }) => {
                                                return <Select.Option value={value} key={value}>{label}</Select.Option>
                                            })}
                                        </HighSelect>)}
                                    </Form.Item>}
                                    <Form.Item
                                        label="受理模式"
                                        key={`acceptanceMode${item.id}`}
                                    >
                                        {getFieldDecorator(`acceptanceMode${item.id}`, {
                                            rules: [{
                                                required: true,
                                                message: "请选择受理模式"
                                            }]
                                        })(<HighSelect
                                            placeholder='请选择受理模式'
                                            key={`acceptanceMode${item.id}`}
                                            showSearch
                                            allowClear
                                            filterOption={(input, option) => {
                                                return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }}
                                            onChange={() => {
                                                validateFields([`groupId${item.id}`])
                                            }}
                                            id={`acceptanceMode${item.id}`}
                                        >
                                            {acceptanceMode.map(({ label, value }) => {
                                                return <Select.Option value={value} key={value}>{label}</Select.Option>
                                            })}
                                        </HighSelect>)}
                                    </Form.Item>
                                    {formValues[`acceptanceMode${item.id}`] == '4' && <FormSpy>
                                        <div className='tips' >注：机器人与人工都不启用时，请到对话提示中设置无服务提示语。</div>
                                    </FormSpy>}
                                </Card>
                            )
                        })}
                    </div>
                </Form>
            </div>
            <div className='btn-group'>
                <Button type='primary' onClick={confirmHandler} loading={loading}>保存</Button>
            </div>
        </div>
    )
}

export default Form.create()(BatchCopy)
