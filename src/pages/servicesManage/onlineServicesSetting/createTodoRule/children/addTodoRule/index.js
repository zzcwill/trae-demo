/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-10-10 14:42:25
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-05-27 16:34:55
 * @FilePath: /askone-manage-pc/src/pages/servicesManage/onlineServicesSetting/createTodoRule/children/addTodoRule/index.js
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import UserFuzzyQuery from '@/components/common/userFuzzyQuery'
import {
  acceptanceChannelCode,
  callcenterCode,
  callcenterEnumOptionType,
  dictTypeEnum,
  HUMAN_CALL,
  INCALL,
  ONLINE,
  OVERALL_ANSWER_RATE,
  ROBOT,
  TODO_EXECUTE_PARTY,
  TRIGGER_SCENE
} from '@/const/config'
import history from '@/history'
import useParamsList from '@/hooks/useParamsList'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import OlhelpManageApi from '@/requestApi/yypt-olhelp-manage/api'
import { Button, Checkbox, Col, Form, Input, InputNumber, message, Modal, Radio, Row, Select } from 'dpl2-proxy'
import qs from 'qs'
import { useEffect, useState } from 'react'
import AllotRole from "../../components/allotRole"
import CreateToDoRuleConfig from '../../components/createToDoRuleConfig'
import BusinessCenterCascader from '@/components/common/businessCenterCascader'
import './index.scss'

const FormItem = Form.Item
const { Option } = Select
const GROUP = 'group' // 分配给组
const USER = 'user' // 分配给人
const ROLE = 'role' // 分配给角色
const CREATOR = 'creator' // 创建人
const MINUTES = 'minutes' // 分钟
const DAY = 'day' // 天
const consultWayList = [
	{
		label: '电话人工',
		value: INCALL
	},
	{
		label: '在线人工',
		value: ONLINE
	},
	{
		label: '机器人',
		value: ROBOT
	},
	{
		label: '人工外呼',
		value: HUMAN_CALL
	}
]
const todoCreateTypeList = [
	{
		label: '不追加，新建待办',
		value: 'new'
	},
	{
		label: '追加到当日的待办下',
		value: 'parent'
	}
]
const defaultTriggerScene = [
	{
		value: 'dissatisfied_feedback',
		label: '评价不满意'
	},
	{
		value: 'give_up_queuing_auto',
		label: '直接咨询排队放弃'
	},
	{
		value: 'give_up_queuing_transfer',
		label: '转接排队放弃'
	}
]
const groupNamesList = [
	// dictTypeEnum.trigger_scene,
	dictTypeEnum.consultBusinessType,
	dictTypeEnum.memberType,
	dictTypeEnum.productCategory,
	dictTypeEnum.condition_operator_type,
	dictTypeEnum.todo_business_type,
]
const defaultConditionList = [
	{
		conditionKey: '',
		operator: '',
		conditionValue: ''
	}
]
function checkDuplicate(array, propertyName) {
	const resultDicts = array.reduce((acc, obj) => {
		const key = obj[propertyName]
		acc[key] = (acc[key] || 0) + 1
		return acc
	}, {})
	return Object.keys(resultDicts).some((key) => resultDicts[key] > 1)
}

export default function AddTodoRule(props) {
	const [form] = Form.useForm()
	const [query, setQuery] = useState(() => {
		const obj = qs.parse(window.location.href.split('?')[1])
		return obj || {}
	})
	const [todoExecutePartyList] = useParamsList([dictTypeEnum.todo_execute_party], CallCenterManageApi.getCommonOptions)
	const [consultWay, setConsultWay] = useState(INCALL)
	const [allotType, setAllotType] = useState(GROUP)
	const [finishTypeValueMinutes, setFinishTypeMinutes] = useState()
	const [finishTypeValueDay, setFinishTypeValueDay] = useState()
	const [detail, setDetail] = useState({
		consultWay: INCALL,
		allotType: GROUP,
		[`conditionList${INCALL}`]: defaultConditionList,
		[`conditionList${ONLINE}`]: defaultConditionList,
		[`conditionList${ROBOT}`]: defaultConditionList,
		[`conditionList${HUMAN_CALL}`]: defaultConditionList
	})
	const [areaList, setAreaList] = useState([])
	// 必填的一些字段
	const [requiredArray, setRequiredArray] = useState([])

	const [optionsData, setOptionsData] = useState([])
	const [businessCenterTypeList, setBusinessCenterTypeList] = useState([]) // gb经营中心合并
	const [companyList, setCompanyList] = useState([]) // 受理机构
	const [orgList, setOrgList] = useState([]) // 受理部门
	const [callGroupList, setCallGroupList] = useState([]) // 电话组
	const [triggerSceneList, setTriggerSceneList] = useState(defaultTriggerScene)

	const [todoTypeList, setTodoTypeList] = useState([]) // 待办类型
  const [regionList, setRegionList] = useState([]) // 经营中心+大区
	// 业务
	const [businessList, setBusinessList] = useState([])

	const optionsMap = {
		todo_execute_party: todoExecutePartyList // 执行方
	}

	const getDetail = async (id) => {
		const data = await CallCenterManageApi.getConsulttaskruleDetail({ id })
		if (data.success) {
			const newDetail = data.data
			const conditionList = []
			if (newDetail.conditionInfos?.length > 0) {
				for (let index = 0; index < newDetail.conditionInfos.length; index++) {
					const condition = newDetail.conditionInfos[index];
				// 把conditionList里面trigger_scene以及todo_execute_party拿出来放到detail外层
					if ([TRIGGER_SCENE, TODO_EXECUTE_PARTY].includes(condition.conditionKey)) {
						newDetail[condition.conditionKey] =  condition.conditionValue.split(',')
					} else {
						// 不提出来的数据放到conditionList中
						conditionList.push(condition)
					}
				}
			}
			newDetail[`conditionList${newDetail.consultWay}`] = conditionList
			// 特殊处理一下conditionList, 赋值给其中一个，其他设置默认值，这样处理是为了条件选择的数据按服务方式隔离
			const defaultList = [INCALL, ONLINE, ROBOT, HUMAN_CALL].filter((item) => item !== newDetail.consultWay || newDetail[`conditionList${item}`]?.length === 0)
			defaultList.forEach((consultWayItem) => {
				newDetail[`conditionList${consultWayItem}`] = defaultConditionList
			})
			delete newDetail.conditionInfos
			if (newDetail.allotType === GROUP) {
				newDetail[`allot${GROUP}`] = Number(newDetail.allotId) // 因为后端会格式化成字符串
			}else if (newDetail.allotType === ROLE) {
				newDetail[`allot${ROLE}`] = {
					roleId: newDetail.allotId,
					businessId: newDetail.todoContent.roleBusinessType,
					companyId: newDetail.todoContent.roleFzgsdm,
					undercoverPerson: newDetail.todoContent.undercoverPerson ? {
						trueId: newDetail.todoContent.undercoverPerson,
						userName: newDetail.todoContent.undercoverPersonName
					} : null 
				}
			} else {
				newDetail[`allot${USER}`] = {
					trueId: newDetail.allotId,
					userName: newDetail.allotIdText
				}
			}
			newDetail[`finishTypeValue${newDetail.todoContent.finishType}`] = newDetail.todoContent.finishValue
			if (newDetail.todoContent.finishType === MINUTES) {
				setFinishTypeMinutes(newDetail.todoContent.finishValue)
			} else {
				setFinishTypeValueDay(newDetail.todoContent.finishValue)
			}
			setDetail(newDetail)
			setConsultWay(newDetail.consultWay)
			setAllotType(newDetail.allotType)
			form.setFieldsValue(newDetail) // 重新设置一遍表单
		}
	}
	const getAreaList = async () => {
		const res = await OlhelpManageApi.getCommonLocationList()
		if (res.success) {
			const data = res.data
			setAreaList(data)
		} else {
			message.error(res.message)
		}
	}
	const getSelectOptions = async () => {
		const data = await CallCenterManageApi.getCommonOptions({
			groupNames: groupNamesList.join(',')
		})
		const list = data.data || []
		list.forEach((item) => {
			if(item.groupName === dictTypeEnum.todo_business_type){
				setBusinessList(item.options)
			}
		})
		setOptionsData([...list])
	}
	const getBusinessCenterList = async () => {
		const res = await CallCenterManageApi.getCommonOptions({
			groupNames: [callcenterEnumOptionType.GBusinessCenterType, callcenterEnumOptionType.BAdminCompanyType].join(',')
		})
		if (res.success) {
			const array = res.data || []
			// 将data数组里两项的options合并
			let newArray = []
			array.forEach((item) => {
				if (item.options?.length > 0) {
					newArray = newArray.concat(item.options)
				}
			})
			setBusinessCenterTypeList(newArray)
		} else {
			message.error(res.message)
		}
	}
	/**
	 * 获取受理机构、也是分子公司
	 */
	const getCompanyList = async () => {
		const res = await CallCenterManageApi.getOrgCompanyList({
			needRemoteCenter: true
		})
		if (res.success) {
			const data = res.data
			setCompanyList(data)
		} else {
			message.error(res.message)
		}
	}

	/**
	 * 获取受理部门
	 */
	const getOrgList = async () => {
		const res = await CallCenterManageApi.getOrgDepartmentList({
			companyId: callcenterCode
		})
		if (res.success) {
			const data = res.data
			setOrgList(data)
		} else {
			message.error(res.message)
		}
	}
	// 获取业务组信息
	const getWorkGroupList = async (type) => {
		try {
			const res = await CallCenterManageApi.getCommonListGroup({
				type
			})
			if (res.success) {
				if (type === acceptanceChannelCode.call) {
					setCallGroupList(res.data)
				} else {
					// setOnlineGroupList(res.data)
				}
			} else {
				message.error(res.message)
			}
		} catch (e) {
			console.error(e)
		}
	}

	// 获取业务组信息
	const getTodoTypeList = async () => {
		try {
			const res = await CallCenterManageApi.getTodoGetTodoType();
			if (res.success) {
				const array = res.data?.map((item) => {
					return { label: item.name, value: item.code }
				})
				setTodoTypeList(array || []);
			}
		} catch (e) {
			console.error(e);
		}
	};
  const getRegionList = async () => {
    const res = await CallCenterManageApi.getOrgGetRegionTreeByCode();
    if (res.success && Array.isArray(res.data)) {
      setRegionList(res.data || []);
    }
  }
	const checkTime = (type, value) => {
		const finishType = form.getFieldValue(['todoContent', 'finishType'])
		if (!finishType || type !== finishType || (finishType === type && value)) {
			return 'success'
		}
		return ''
	}
	const submit = async (values) => {
		let conditionInfos = values[`conditionList${consultWay}`] || []
		conditionInfos = JSON.parse(JSON.stringify(conditionInfos)) // 深拷贝
		const newId = query.id && query.type === 'edit' ? query.id : null;
		//  把触发场景、执行方放到conditionInfos中
		[TRIGGER_SCENE, TODO_EXECUTE_PARTY].forEach((key) => {
			if (values[key] && values[key].length > 0) {
				const itemValue = Array.isArray(values[key]) ? values[key].join(',') : values[key];
				conditionInfos.push({
					conditionKey: key,
					operator: Array.isArray(values[key]) ? 'initem' : '==', // 多选是符合任一项, 单选是等于
					conditionValue: itemValue
				})
			}
		})

		const newValues = {
			id: newId,
			conditionInfos,
			consultWay,
			allotType,
			ruleName: values.ruleName,
			remark: values.remark || undefined,
			todoContent: {
				...values.todoContent,
				finishValue: values.todoContent.finishType === MINUTES ? finishTypeValueMinutes : finishTypeValueDay
			}
		}
		// 特殊处理allotId信息
		if (allotType === USER) {
			newValues.allotId = values[`allot${allotType}`]?.trueId
		} else if(allotType === ROLE) {
			newValues.allotId = values[`allot${allotType}`]?.roleId
			newValues.todoContent.roleBusinessType = values[`allot${ROLE}`]?.businessId
			newValues.todoContent.roleFzgsdm = values[`allot${ROLE}`]?.companyId
			newValues.todoContent.undercoverPerson = values[`allot${ROLE}`]?.undercoverPerson?.trueId
			newValues.todoContent.undercoverPersonName = values[`allot${ROLE}`]?.undercoverPerson?.userName
		} else {
			newValues.allotId = values[`allot${allotType}`]
		}
		let data
		if (newId) {
			data = await CallCenterManageApi.postConsulttaskruleModify(newValues)
		} else {
			data = await CallCenterManageApi.postConsulttaskruleSave(newValues)
		}
		if (!data) return
		if (data.success) {
			message.success(newId ? '修改成功' : '新增成功')
			// window.close()
			history.push('/servicesManage/onlineServicesSetting/createTodoRule')
		} else {
			message.error(data.message)
		}
	}
	const confirmHandler = () => {
		form
			.validateFields()
			.then(async (values) => {
				const conditionInfos = values[`conditionList${consultWay}`] || []
				// 判断conditionInfos中的conditionKey不可重复
				if (checkDuplicate(conditionInfos, 'conditionKey')) {
					return message.error('条件不可重复，请检查配置')
				}

				Modal.confirm({
					title: '提示',
					content: '确认要保存当前配置？',
					async onOk() {
						submit(values)
					},
					onCancel() {}
				})
			})
			.catch((err) => {
				console.log('err', err)
			})
	}
	const cancelHandler = () => {
		window.close()
	}
	useEffect(() => {
		if (query.id) {
			getDetail(query.id)
		}
	}, [query])
	useEffect(() => {
		form.setFieldsValue({
			trigger_scene: []
		})
		setRequiredArray([])
		if (consultWay === ROBOT) {
			setTriggerSceneList(defaultTriggerScene.filter((item) => item.value === 'dissatisfied_feedback')) // 机器人只要评价不满意
		} else if (consultWay === HUMAN_CALL) {
      form.setFieldValue(['todoContent', 'todoType'], undefined)
			setTriggerSceneList([
				{
					value: 'incall_online_create_todo',
					label: '来电在线咨询创建待办'
				},
				{
					value: 'reservation_create_todo',
					label: '云记账预约迁账创建待办'
				}
			]) // 人工外呼只要直接咨询排队放弃
			setRequiredArray([
				{
					label: '执行方',
					key: 'todo_execute_party'
				}
			])
		} else {
			setTriggerSceneList(defaultTriggerScene)
		}
	}, [consultWay])
  useEffect(() => {
    if (consultWay === HUMAN_CALL && allotType === CREATOR) {
      form.setFieldValue(['todoContent', 'allowCompany'], undefined)
    }
  }, [consultWay,allotType])
	useEffect(() => {
		getSelectOptions()
		getAreaList()
		getBusinessCenterList()
		getCompanyList()
		getOrgList()
		getWorkGroupList(acceptanceChannelCode.call)
		getTodoTypeList()
    getRegionList()
	}, [])
	return (
		<div className="detail-bg">
			<div className="detail-bg-content add-todo-rule">
				<Form
					form={form}
					name="addSolutionForm"
					labelCol={{
						span: 6
					}}
					wrapperCol={{
						span: 18
					}}
					initialValues={detail}
				>
					<FormItem label="规则名称" name="ruleName" rules={[{ required: true, message: '规则名称不得为空' }]}>
						<Input placeholder="请输入" maxLength={100} />
					</FormItem>
					<FormItem label="备注" name="remark">
						<Input.TextArea placeholder="请输入备注" maxLength={1000} rows={4} />
					</FormItem>
					<FormItem label="服务方式" name="consultWay" rules={[{ required: true, message: '交付状态不得为空' }]}>
						<Radio.Group
							disabled={query.id && query.type === 'edit' ? true : false}
							onChange={(e) => {
								const newConsultWay = e.target.value
								setConsultWay(newConsultWay)
							}}
						>
							{consultWayList.map((item1) => (
								<Radio key={item1.value} value={item1.value}>
									{item1.label}
								</Radio>
							))}
						</Radio.Group>
					</FormItem>
					<FormItem label="触发场景" name="trigger_scene" rules={[{ required: true, message: '触发场景不得为空' }]}>
						<Checkbox.Group>
							{triggerSceneList.map((item1) => (
								<Checkbox key={item1.value} value={item1.value}>
									{item1.label}
								</Checkbox>
							))}
						</Checkbox.Group>
					</FormItem>
					{requiredArray.map((item) => (
						<FormItem label={item.label} name={item.key} rules={[{ required: true, message: `${item.label}不得为空` }]}>
							<Select
								virtual
								allowClear
								mode={item.mode}
								placeholder="请选择"
								optionFilterProp="children"
								style={{ width: 200 }}
							>
								{Array.isArray(optionsMap[item.key]) &&
									optionsMap[item.key].map((item) => {
										return (
											<Option key={item.value} value={item.value}>
												{item.label || item.name}
											</Option>
										)
									})}
							</Select>
						</FormItem>
					))}
					<FormItem
						label="规则配置"
						name={`conditionList${consultWay}`}
						rules={[
							{
								required: true,
								message: '请配置规则'
							},
							{
								validator: (rule, value, callback) => {
									try {
										let indexArr = []
										Array.isArray(value) &&
											value.forEach((item, index) => {
												if (
													!item.operator ||
													!item.conditionKey ||
													!item.conditionValue ||
													(item.conditionKey === OVERALL_ANSWER_RATE &&
														(!item.conditionConfiguration || item.conditionConfiguration.length === 0))
												) {
													indexArr.push(index + 1)
												}
											})
										if (indexArr.length > 0) {
											throw new Error('第' + indexArr.join(',') + '条规则有未填项，请检查')
										}
									} catch (err) {
										callback(err)
									}
									callback()
								}
							}
						]}
					>
						<CreateToDoRuleConfig
							key={`conditionList${consultWay}`}
							placeholder="请输入"
							ruleType={consultWay}
							outerFetch
							optionsData={optionsData}
							locationListData={areaList}
							businessCenterListData={businessCenterTypeList}
							companyListData={companyList}
							orgListData={orgList}
							todoTypeListData={todoTypeList}
						/>
					</FormItem>
					<FormItem label="分配给" name="allotType" rules={[{ required: true, message: '不得为空' }]}>
						<Radio.Group
							onChange={(e) => {
								setAllotType(e.target.value)
							}}
						>
							<Radio key={GROUP} value={GROUP}>
								组
							</Radio>
							<Radio key={USER} value={USER}>
								人
							</Radio>
							<Radio key={ROLE} value={ROLE}>
								角色
							</Radio>
							{/* 当选择人工外呼时才有创建人 */}
							{consultWay === HUMAN_CALL && (
								<Radio key={CREATOR} value={CREATOR}>
									创建人
								</Radio>
							)}
						</Radio.Group>
					</FormItem>
					{allotType === GROUP && (
						<FormItem
							name={`allot${GROUP}`}
							label="分配组"
							rules={[
								{
									required: true,
									message: '请选择分配组'
								}
							]}
						>
							<Select
								placeholder="请选择"
								allowClear
								showSearch
								optionFilterProp="children"
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								{callGroupList?.map((option) => (
									<Option value={option.id} key={option.id}>
										{option.name}
									</Option>
								))}
							</Select>
						</FormItem>
					)}
					{allotType === USER && (
						<FormItem
							name={`allot${USER}`}
							label="分配给人"
							rules={[
								{
									required: true,
									message: '请选择'
								}
							]}
						>
							<UserFuzzyQuery
								delay={300}
								placeholder="请输入后选择"
								valueFarmat={{
									value: 'trueId',
									label: 'userName'
								}}
							/>
						</FormItem>
					)}
					{allotType === ROLE && (
						<FormItem
							name={`allot${ROLE}`}
							label="分配给角色"
							rules={[
								{
									validator: (rule, value, callback) => {
										try {
											console.log('role-value', value);
											if (!value?.roleId) {
												throw new Error('请选择角色')
											}
										} catch (err) {
											callback(err)
										}
										callback()
									}
								}
							]}
						>
							<AllotRole
								regionList={regionList} 
							/>
						</FormItem>
					)}
					<Row>
						<Col className="form-title" offset={4}>
							任务信息：
						</Col>
					</Row>
					<Form.Item
						name={['todoContent', 'title']}
						label="待办名称"
						rules={[
							{
								required: true,
								message: '请输入待办名称'
							}
						]}
					>
						<Input placeholder="请输入" maxLength={100} />
					</Form.Item>
					<FormItem
						label="待办类型"
						name={['todoContent', 'todoType']}
						rules={consultWay === HUMAN_CALL ? [] :[
							{
								required: true,
								message: '请选择待办类型'
							}
						]}
					>
						{consultWay === HUMAN_CALL ? (
							<div>直接使用创建回电待办时选择的待办类型</div>
						) : (
							<Select
								placeholder="请选择"
								allowClear
								showSearch
								optionFilterProp="children"
								filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								{todoTypeList?.map((option) => (
									<Option value={option.value} key={option.value}>
										{option.label}
									</Option>
								))}
							</Select>
						)}
					</FormItem>
					<FormItem
						label="完成时间"
						name={['todoContent', 'finishType']}
						rules={[
							{ required: true, message: '完成时间不得为空' },
							{
								validator: (rule, value, callback) => {
									try {
										const finishTypeValue = form.getFieldValue(`finishTypeValue${value}`)

										if (!finishTypeValue && finishTypeValue !== 0) {
											throw new Error('时间必填')
										}
									} catch (err) {
										callback(err)
									}
									callback()
								}
							}
						]}
					>
						<Radio.Group onChange={(e) => {}}>
							<Radio key={MINUTES} value={MINUTES}>
								<InputNumber
									value={finishTypeValueMinutes}
									status={checkTime(MINUTES, finishTypeValueMinutes)}
									min={0}
									max={999}
									precision={0}
									onChange={(value) => {
										setFinishTypeMinutes(value)
										form.setFieldValue(`finishTypeValue${MINUTES}`, value)
										form.validateFields([['todoContent', 'finishType']])
									}}
									style={{ marginRight: 30 }}
								/>
								分钟内
							</Radio>
							<Radio key={DAY} value={DAY}>
								第{' '}
								<InputNumber
									value={finishTypeValueDay}
									status={checkTime(DAY, finishTypeValueDay)}
									min={0}
									max={999}
									precision={0}
									onChange={(value) => {
										setFinishTypeValueDay(value)
										form.setFieldValue(`finishTypeValue${DAY}`, value)
										form.validateFields([['todoContent', 'finishType']])
									}}
									style={{ marginRight: 30 }}
								/>
								天下班前
							</Radio>
						</Radio.Group>
					</FormItem>
					<FormItem
						label="归属大区"
						name={['todoContent', 'allowCompany']}
						rules={allotType === CREATOR ? [] : [
							{
								required: true,
								message: '请选择归属大区'
							}
						]}
					>
						{allotType === CREATOR ? <div>使用创建人所属大区</div> : (
              <BusinessCenterCascader
                regionList={regionList}
              />
						)}
					</FormItem>
					<FormItem label="是否追加" name={['todoContent', 'todoCreateEnType']} rules={[{ required: true, message: '不得为空' }]}>
						<Radio.Group>
							{todoCreateTypeList.map((item1) => (
								<Radio key={item1.value} value={item1.value}>
									{item1.label}
								</Radio>
							))}
						</Radio.Group>
					</FormItem>
				</Form>
				<div className="app-buttons app-buttons-center">
					<Button className="app-button" type="primary" onClick={confirmHandler}>
						保存
					</Button>
					<Button className="app-button" onClick={cancelHandler}>
						取消
					</Button>
				</div>
			</div>
		</div>
	)
}
