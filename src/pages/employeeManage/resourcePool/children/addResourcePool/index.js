import React, { useEffect, useState, useRef, useCallback } from 'react'
import { uForm } from 'dora'
import WarnningRatio from '@/components/warnningRatio'
import Api from '@/request/api-callcentermanage'
import { get, post } from '@/request/request'
import './index.scss'
import { acceptanceChannelCode, callcenterCode, resourceConsultTypeList, ONLINE, INCALL } from '@/const/config'
import { Button, message, Divider, Row } from 'dpl-react'
import TextArea from '@/components/common/textArea'
import { formatDataSource, setDefaultValue } from '@/utils'
import CallGroupAllocation from './components/callGroupAllocation'
import AgentAllocation from './components/agentAllocation'
import qs from 'qs'
import history from '@/history'

const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormSlot } = uForm
const actions = createFormActions()
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 }
}
const validateAgentFn = (value, name) => {
	if (!value?.length) {
		return {
			message: '请添加当前资源池下可分配坐席',
			type: 'error'
		}
	}
	for (var idx = 0; idx < value.length; idx++) {
		const item = value[idx]
		if (!item.acceptedCapacity) {
			return {
				message: '第' + (idx + 1) + '条数据未填写完整, 受理能力必须选择',
				type: 'error'
			}
		}
	}
}

export default function AddResourcePool() {
	const [id, setId] = useState(() => {
		const obj = qs.parse(window.location.href.split('?')[1])
		return obj.id
	})
	const [detail, setDetail] = useState({})
	const consultTypeRef = useRef(INCALL)
	const [consultType, setConsultType] = useState(consultTypeRef.current)

	const [companyList, setCompanyList] = useState([]) // 受理机构
	const [orgList, setOrgList] = useState([]) // 受理部门

	const getDetail = async function () {
		if (!id) {
			setDetail({
				alarmTimeInterval: 5,
				plusAgentTimeInterval: 1,
				consultType: INCALL
			})
			return
		}
		const obj = qs.parse(window.location.href.split('?')[1])
		const res = await get({
			url: Api.getResourcePoolDetail,
			params: {
				id: id,
				consultType: obj.consultType || INCALL
			}
		})
		if (res.success) {
			const data = res.data || {}
			// res.data = res.data || {};
			const groupInfoList = data.groupInfoList || []
			// res.data.groupInfoList?.map(group => {
			//     group.groupReusePriority = group.groupReusePriority || '0';
			//     group.groupSelfPriority = group.groupSelfPriority || '0';
			//     group.safetyConsultCount = group.safetyConsultCount || 10;
			// })
			consultTypeRef.current = data.consultType || INCALL
			setConsultType(consultTypeRef.current)
			setDetail({
				...data,
				[`${consultTypeRef.current}groupInfoList`]: groupInfoList,
				[`${consultTypeRef.current}agentInfoList`]: data.agentInfoList || [],
				consultType: consultTypeRef.current
			})
		} else {
			message.error(res.message)
		}
	}
	/**
	 * 获取受理机构
	 */
	const getCompanyList = async () => {
		const res = await get({
			url: Api.getCompanyList,
			params: {
				needRemoteCenter: true
			}
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
		const res = await get({
			url: Api.getDepartmentList,
			params: {
				companyId: callcenterCode
			}
		})
		if (res.success) {
			const data = res.data
			setOrgList(data)
		} else {
			message.error(res.message)
		}
	}

	const validateCallGroupFn = useCallback((value, name) => {
		if (!value?.length) {
			return {
				message: `请选择可以使用当前需求池中坐席的${consultTypeRef.current === ONLINE ? '在线' : '电话'}组`,
				type: 'error'
			}
		}
		for (var idx = 0; idx < value.length; idx++) {
			const item = value[idx]
			if (!item.plusAgentCallCompletingRateThreshold && !item.minusAgentCallCompletingRateThreshold) {
				return {
					message: '第' + (idx + 1) + '条数据未填写完整, 接通率值阈值必须填一个',
					type: 'error'
				}
			}
			if (!item.oncePlusOrMinusAgentCount) {
				return {
					message: '第' + (idx + 1) + '条数据未填写完整, 单次加减人数必须填写',
					type: 'error'
				}
			}
			if (!item.safetyConsultCount) {
				return {
					message: '第' + (idx + 1) + '条数据未填写完整, 保底咨询次数必须填写',
					type: 'error'
				}
			}
			// 在线保底人数必须 > 0
			if (consultTypeRef.current === ONLINE && (!item.safetyAgentCount || item.safetyAgentCount === 0)) {
				return {
					message: '第' + (idx + 1) + '条数据未填写完整, 保底人数必须填写',
					type: 'error'
				}
			}
		}
	}, [])

	const cancel = () => {
		history.replace(`/employeeManage/resourcePool`)
	}

	const submit = function () {
		actions.submit().then(async (data) => {
			const values = data?.values || {}
			const url = id ? Api.resourcePoolUpdate : Api.resourcePoolInsert
			const params = {
				id: id || undefined,
				...values,
				groupInfoList: values[`${consultType}groupInfoList`],
				name: values?.name?.trim(),
				agentInfoList: values[`${consultType}agentInfoList`].map((agentInfo) => {
					return {
						trueId: agentInfo.trueId,
						acceptedCapacity: agentInfo.acceptedCapacity,
						reuseFlag: agentInfo.reuseFlag || 'N'
					}
				})
			}
			delete params[`${ONLINE}groupInfoList`] // 删除没有用的字段
			delete params[`${INCALL}groupInfoList`]
			delete params[`${ONLINE}agentInfoList`]
			delete params[`${INCALL}agentInfoList`]

			const response = await post({
				url,
				data: params
			})
			if (response.success) {
				message.success(!id ? '新增成功' : '修改成功')
				cancel()
				setId(response?.data?.id)
			} else {
				console.log(response, 'response')
				if (response.messageCode === 'AGENT0002') {
					message.open({
						type: 'error',
						content: (
							<span
								dangerouslySetInnerHTML={{
									__html: response.message
								}}
							/>
						),
						bgColor: true,
						duration: 0,
						closable: true,
						getContainer: () => document.getElementById('add-resource-pool')
					})
				} else {
					message.error(response.message)
				}
			}
		})
	}

	useEffect(() => {
		getDetail()
		getCompanyList() // 获取受理机构
		getOrgList() // 获取受理部门
	}, [])

	return (
		<div className="add-resource-pool" id="add-resource-pool">
			{detail ? (
				<SchemaForm
					className="warnning-setting-form"
					components={{
						TextArea,
						CallGroupAllocation,
						AgentAllocation
					}}
					initialValues={detail}
					actions={actions}
				>
					<FormSlot>
						<div className="box-title">{id ? '修改' : '新增'}资源池</div>
					</FormSlot>
					<Field
						type="string"
						name="name"
						title="资源池名称"
						{...formItemLayout}
						x-component="Input"
						x-component-props={{
							maxLength: 200
						}}
						x-rules={[
							{
								required: true,
								message: '请输入资源池名称'
							}
						]}
					></Field>
					<Field
						type="string"
						name="remark"
						title="备注"
						{...formItemLayout}
						x-component="TextArea"
						x-component-props={{
							maxLength: 1000
						}}
					></Field>
					<Field
						{...formItemLayout}
						type="string"
						title="咨询类型"
						name="consultType"
						x-component="RadioGroup"
						x-component-props={{
							options: resourceConsultTypeList,
							disabled: !!id,
							onChange: (e) => {
								console.log(e, 'e')
								consultTypeRef.current = e.target.value
								setConsultType(consultTypeRef.current)
							}
						}}
						x-rules={[{ required: true, message: '请选择' }]}
					/>
					<FormSlot>
						<Divider />
					</FormSlot>
					<Field
						type="string"
						name="alarmTimeInterval"
						title=""
						className="inline-component"
						x-component="InputNumber"
						x-component-props={{
							min: 1,
							max: 99
						}}
						x-rules={[
							{
								required: true
							}
						]}
						x-render={({ renderComponent, props: innerProps }) => {
							const element = renderComponent()
							if (!element) return null
							return <Row>告警间隔：当资源池中无坐席可分配后并告警后，下一次告警需间隔{element}分钟</Row>
						}}
					></Field>
					<Field
						type="string"
						name="plusAgentTimeInterval"
						title=""
						className="inline-component"
						x-component="InputNumber"
						x-component-props={{
							min: 1,
							max: 99
						}}
						x-rules={[
							{
								required: true
							}
						]}
						x-render={({ renderComponent, props: innerProps }) => {
							const element = renderComponent()
							if (!element) return null
							return <Row>加人间隔：当组下已经加过人后，下一次加人需间隔{element}分钟</Row>
						}}
					></Field>
					{consultType === ONLINE && (
						<>
							<Field
								type="object"
								name={`${ONLINE}groupInfoList`}
								x-component="CallGroupAllocation"
								x-component-props={{
									groupType: acceptanceChannelCode.online,
									companyList,
									orgList
								}}
								x-rules={[validateCallGroupFn]}
							></Field>
							<Field
								type="object"
								name={`${ONLINE}agentInfoList`}
								x-component="AgentAllocation"
								x-rules={[validateAgentFn]}
								x-component-props={{
									groupType: consultType,
									companyList,
								}}
							></Field>
						</>
					)}
					{consultType === INCALL && (
						<>
						<Field
							type="object"
							name={`${INCALL}groupInfoList`}
							x-component="CallGroupAllocation"
							x-component-props={{
								groupType: acceptanceChannelCode.call,
								companyList,
								orgList
							}}
							x-rules={[validateCallGroupFn]}
						></Field>
						<Field
								type="object"
								name={`${INCALL}agentInfoList`}
								x-component="AgentAllocation"
								x-rules={[validateAgentFn]}
								x-component-props={{
									groupType: consultType,
									companyList,
								}}
							></Field>
						</>
					)}
				</SchemaForm>
			) : null}
			<div className="btn-group">
				<Button type="primary" onClick={submit}>
					提交
				</Button>
				<Button style={{ marginLeft: 8 }} onClick={cancel}>
					取消
				</Button>
			</div>
		</div>
	)
}
