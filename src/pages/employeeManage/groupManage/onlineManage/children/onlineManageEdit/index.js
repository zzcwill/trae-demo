import React, { useEffect, useState } from 'react'
import './index.scss'
import qs from 'qs'
import {
	Form,
	message,
	Input,
	Row,
	Col,
	Select,
	Radio,
	InputNumber,
	Button,
	Loading,
	TreeSelect,
	Modal
} from 'dpl-react'
import Api from '@/request/api-callcentermanage'
import { get, post } from '@/request/request'
import {
	callcenterCode,
	callcenterEnumOptionType,
	defaultCallManageEditConfig,
	busyThresholdList,
	dictTypeEnum
} from '@/const/config'
import WarnningRatioSingle from '@/components/warnningRatioSingle'
const FormItem = Form.Item
// 单独表单项的布局
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 }
}
// 并列表单项的布局
const twoFormItemLayout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 }
}

function OnlineManageEdit(props) {
	const { form } = props
	const { getFieldDecorator, validateFieldsAndScroll, setFieldsValue, getFieldsValue } = form
	const [companyList, setCompanyList] = useState([]) // 受理机构
	const [orgList, setOrgList] = useState([]) // 受理部门
	const [areaList, setAreaList] = useState([]) // 地区
	const [assistGroupList, setAssistGroupList] = useState([]) // 辅助业务组列表
	const [title, setTitle] = useState(() => {
		const param = qs.parse(window.location.href.split('?')[1])
		return param.id ? '修改在线业务组' : '新增在线业务组'
	})
	const [loading, setLoading] = useState(false) // 不加载
	const [isDisabled, setIsDisabled] = useState(true) // 受理部门是否可以选中
	const [businessCenterList, setBusinessCenterList] = useState([]) // 经营中心列表
	const [memberTypeList, setMemberTypeList] = useState([]) // 会员类型
	const [productCategoryList, setProductCategoryList] = useState([]) // 产品大类
	const [businessTypeList, setBusinessTypeList] = useState([]) // 咨询业务类型
	const [sceneList, setSceneList] = useState([]) // 场景
	const [formData, setFormData] = useState({
		type: '1', // 组类型
		name: '', // 组名称
		companyId: undefined, // 受理机构id
		departId: undefined, // 受理部门id
		areaId: undefined, // 所属地区id
		onlineConfig: {
			assistGroupIdList: [] // 在线辅助组id列表
		}, // 在线配置信息
		alarmItem: {} // 告警条件列表，查询的时候需要格式化
	}) // 新增表单对象
	console.log(formData, 'formData')
	/**
	 * 格式化树节点，利用treeNode自行渲染
	 * @param {props} tree
	 * @param {props} formatObj
	 */
	function formatTree(tree, formatObj) {
		return tree.map((item) => {
			return (
				<TreeSelect.TreeNode
					key={item[formatObj['key']]}
					value={item[formatObj['value']]}
					title={item[formatObj['title']]}
				>
					{formatTree(item[formatObj['children']] || [], formatObj)}
				</TreeSelect.TreeNode>
			)
		})
	}

	/**
	 * 获取地区
	 */
	const getAreaList = async () => {
		const res = await get({
			url: Api.getAreaList
		})
		if (res.success) {
			let data = res.data
			setAreaList(
				[].concat(
					{
						id: '000000',
						name: '全国'
					},
					data
				)
			)
		} else {
			message.error(res.message)
		}
	}

	/**
	 * 获取枚举（排队满时处理策略、成员分配策略、组状态）
	 */
	const getEnumOptions = async () => {
		const array = [
			callcenterEnumOptionType.GBusinessCenterType,
			callcenterEnumOptionType.BAdminCompanyType,
			dictTypeEnum.consultBusinessType,
			dictTypeEnum.memberType,
			dictTypeEnum.productCategory,
			dictTypeEnum.consult_group_scene
		]
		const res = await get({
			url: Api.getEnumOption,
			params: {
				groupNames: array.join(',')
			}
		})
		if (res.success) {
			let centerList = []
			const data = res.data
			data.forEach((item) => {
				switch (item.groupName) {
					case callcenterEnumOptionType.GBusinessCenterType:
						centerList = centerList.concat(item.options)
						break
					case callcenterEnumOptionType.BAdminCompanyType:
						centerList = centerList.concat(item.options) // 拼接两个经营中心列表
						break
					case dictTypeEnum.consultBusinessType:
						setBusinessTypeList(item.options)
						break
					case dictTypeEnum.memberType:
						setMemberTypeList(item.options)
						break
					case dictTypeEnum.productCategory:
						setProductCategoryList(item.options)
						break
					case dictTypeEnum.consult_group_scene:
						setSceneList(item.options)
						break
					default:
						break
				}
			})
			setBusinessCenterList(centerList)
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

	/**
	 * 获取备用组
	 */
	const getAssistGroupList = async () => {
		const res = await get({
			url: Api.getWorkGroupList,
			params: {
				type: '2' // 1-电话组，2-在线组
			}
		})
		if (res.success) {
			const data = res.data
			setAssistGroupList(data)
		} else {
			message.error(res.message)
		}
	}

	/**
	 * 初始化方法
	 */
	const initFunc = () => {
		getAreaList()
		getCompanyList()
		getOrgList()
		getAssistGroupList()
		getEnumOptions()
	}

	/**
	 * 获取组管理详情
	 */
	const getGroupDetail = async (id) => {
		const res = await get({
			url: Api.getOnlineGroupDetail,
			params: {
				id
			}
		})
		if (res.success) {
			const data = res.data
			// 获取排队满时转接组id列表
			function getAssistGroupIdList(list) {
				let idList = []
				list.forEach((item) => {
					idList.push(item.id)
				})
				return idList
			}
			if (data.companyId === callcenterCode) {
				setIsDisabled(false)
			}
			setFormData({
				...data,
				alarmItem: {
					groupCallCompletingRateLowerThreshold: data.groupCallCompletingRateLowerThreshold,
					groupCallCompletingRateUpperThreshold: data.groupCallCompletingRateUpperThreshold
				},
				onlineConfig: {
					assistGroupIdList: getAssistGroupIdList(data.assistGroupList) // 排队满时转接组id列表
				} // 在线配置信息
			})
		} else {
			message.error(res.message)
		}
	}

	/**
	 * 受理机构改变
	 */
	const companyChange = (value) => {
		const data = value !== callcenterCode
		setIsDisabled(data)
		const param = getFieldsValue()
		setFieldsValue(
			Object.assign({}, param, {
				departId: undefined
			})
		)
	}

	/**
	 * 保存
	 */
	const save = () => {
		validateFieldsAndScroll((err, values) => {
			console.log(values, 'values')
			if (!err) {
				// 如果修改的时候名称最后没有[在线]标识的时候，手动添加
				const param = qs.parse(window.location.href.split('?')[1])
				let sendData = Object.assign({}, values, {
					type: '2', // 1-电话组，2-在线组
					name: values.name && values.name.trim(),
					...values.alarmItem
				})
				delete sendData.alarmItem

				if (param.id) {
					updateGroup(
						Object.assign(sendData, {
							id: param.id
						})
					)
				} else {
					saveGroup(sendData)
				}
			}
		})
	}

	/**
	 * 更新组信息接口
	 */
	const updateGroup = async (sendData) => {
		setLoading(true)
		try {
			const res = await post({
				url: Api.postUpdateGroup,
				data: sendData
			})
			if (res.success) {
				message.success('更新电话业务组信息成功!')
				let url = window.location.href.split('#')[0] + '#/employeeManage/groupManage/onlineManage'
				window.location.href = url
			} else {
				message.error(res.message)
			}
			setLoading(false)
		} catch (e) {
			console.error(e)
			message.error('系统出错请咨询管理员！')
			setLoading(false)
		}
	}

	/**
	 * 保存组信息接口
	 */
	const saveGroup = async (sendData) => {
		setLoading(true)
		try {
			const res = await post({
				url: Api.postSaveGroup,
				data: sendData
			})
			if (res.success) {
				message.success('新增电话业务组信息成功!')
				let url = window.location.href.split('#')[0] + '#/employeeManage/groupManage/onlineManage'
				window.location.href = url
			} else {
				message.error(res.message)
			}
			setLoading(false)
		} catch (e) {
			console.error(e)
			message.error('系统出错请咨询管理员！')
			setLoading(false)
		}
	}
	/**
	 * 取消
	 */
	const channel = () => {
		window.close()
	}

	useEffect(() => {
		initFunc()
		const param = qs.parse(window.location.href.split('?')[1])
		param.id && getGroupDetail(param.id)
	}, [])

	return (
		<div className="onlinemanage-edit-box">
			<div className="edit-box">
				<div className="edit-title">{title}</div>
				<div className="form-box">
					<Form>
						<Row>
							<Col span="24">
								<FormItem label="业务组名称" {...formItemLayout}>
									{getFieldDecorator('name', {
										rules: [
											{
												required: true,
												message: '请输入业务组名称'
											}
										],
										initialValue: formData.name
									})(<Input placeholder="请输入业务组名称" maxLength={50} autoComplete="off" />)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<FormItem label="受理机构" {...twoFormItemLayout}>
									{getFieldDecorator('companyId', {
										rules: [
											{
												required: true,
												message: '请选择受理机构'
											}
										],
										initialValue: formData.companyId
									})(
										<Select allowClear placeholder="请选择受理机构" onChange={companyChange}>
											{companyList.length > 0 &&
												companyList.map((item) => {
													return (
														<Select.Option key={item.id} value={item.id}>
															{item.name}
														</Select.Option>
													)
												})}
										</Select>
									)}
								</FormItem>
							</Col>
							<Col span="12">
								<FormItem label="受理部门" {...twoFormItemLayout}>
									{getFieldDecorator('departId', {
										rules: !isDisabled
											? [
													{
														required: true,
														message: '请选择受理部门'
													}
											  ]
											: [
													{
														required: false
													}
											  ],
										initialValue: formData.departId
									})(
										<Select
											allowClear
											placeholder="请选择受理部门"
											disabled={isDisabled}
											onChange={(value) => {
												setFieldsValue(
													Object.assign({
														departId: value
													})
												)
											}}
										>
											{orgList.length > 0 &&
												orgList.map((item) => {
													return (
														<Select.Option key={item.id} value={item.id}>
															{item.name}
														</Select.Option>
													)
												})}
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span="12">
								<FormItem label="地区" {...twoFormItemLayout}>
									{getFieldDecorator('areaId', {
										rules: [
											{
												required: true,
												message: '请选择地区'
											}
										],
										initialValue: formData.areaId
									})(
										<Select allowClear placeholder="请选择地区">
											{areaList.length > 0 &&
												areaList.map((item) => {
													return (
														<Select.Option key={item.id} value={item.id}>
															{item.name}
														</Select.Option>
													)
												})}
										</Select>
									)}
								</FormItem>
							</Col>
							<Col span={12}>
								<FormItem label="经营中心" {...twoFormItemLayout}>
									{getFieldDecorator('businessCenterCode', {
										rules: [
											{
												required: true,
												message: '请选择经营中心'
											}
										],
										initialValue: formData.businessCenterCode
									})(
										<Select allowClear placeholder="请选择经营中心">
											{businessCenterList.length > 0 &&
												businessCenterList.map((item) => {
													return (
														<Select.Option key={item.id} value={item.id}>
															{item.name}
														</Select.Option>
													)
												})}
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={12}>
								<FormItem label="咨询业务" {...twoFormItemLayout}>
									{getFieldDecorator('consultBusinessType', {
										rules: [
											{
												required: true,
												message: '请选择咨询业务'
											}
										],
										initialValue: formData.consultBusinessType
									})(
										<Select allowClear placeholder="请选择咨询业务">
											{businessTypeList.length > 0 &&
												businessTypeList.map((item) => {
													return (
														<Select.Option key={item.id} value={item.id}>
															{item.name}
														</Select.Option>
													)
												})}
										</Select>
									)}
								</FormItem>
							</Col>
							<Col span={12}>
								<FormItem label="会员类型" {...twoFormItemLayout}>
									{getFieldDecorator('memberType', {
										rules: [
											{
												required: true,
												message: '请选择会员类型'
											}
										],
										initialValue: formData.memberType
									})(
										<Select allowClear placeholder="请选择会员类型">
											{memberTypeList.length > 0 &&
												memberTypeList.map((item) => {
													return (
														<Select.Option key={item.id} value={item.id}>
															{item.name}
														</Select.Option>
													)
												})}
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={12}>
								<FormItem label="产品大类" {...twoFormItemLayout}>
									{getFieldDecorator('productCategory', {
										rules: [
											{
												required: true,
												message: '请选择产品大类'
											}
										],
										initialValue: formData.productCategory
									})(
										<Select allowClear placeholder="请选择产品大类">
											{productCategoryList.length > 0 &&
												productCategoryList.map((item) => {
													return (
														<Select.Option key={item.id} value={item.id}>
															{item.name}
														</Select.Option>
													)
												})}
										</Select>
									)}
								</FormItem>
							</Col>
							<Col span={12}>
								<FormItem label="场景" {...twoFormItemLayout}>
									{getFieldDecorator('scene', {
										rules: [
											{
												required: true,
												message: '请选择场景'
											}
										],
										initialValue: formData.scene
									})(
										<Select
											allowClear
											placeholder="请选择场景"
											mode="multiple"
										>
											{sceneList.length > 0 &&
												sceneList.map((item) => {
													return (
														<Select.Option key={item.id} value={item.id}>
															{item.name}
														</Select.Option>
													)
												})}
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							{/* 备注 */}
							<Col span={24}>
								<FormItem label="备注" {...formItemLayout}>
									{getFieldDecorator('remark', {
										initialValue: formData.remark
									})(<Input.TextArea placeholder="请输入备注" maxLength={1000} rows={4} />)}
								</FormItem>
							</Col>
						</Row>
						<div className="form-line"></div>
						<Row>
							<Col span={12}>
								<FormItem label="坐席在线情况告警" {...twoFormItemLayout}>
									{getFieldDecorator('alertSwitch', {
										rules: [
											{
												required: true,
												message: '请选择坐席在线情况告警'
											}
										],
										initialValue: formData.alertSwitch || defaultCallManageEditConfig.alertSwitch
									})(
										<Radio.Group>
											{busyThresholdList.map((item) => {
												return (
													<Radio key={item.id} value={item.id}>
														{item.name}
													</Radio>
												)
											})}
										</Radio.Group>
									)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col span={24}>
								<FormItem label="接通率阈值" {...formItemLayout}>
									{getFieldDecorator('alarmItem', {
										rules: [
											{
												validator: (rule, value, callback) => {
													if (
														value.groupCallCompletingRateLowerThreshold &&
														value.groupCallCompletingRateUpperThreshold
													) {
														if (
															value.groupCallCompletingRateLowerThreshold >= value.groupCallCompletingRateUpperThreshold
														) {
															return callback('低于的阈值不能大于等于高于的阈值')
														}
													}
													callback()
												}
											}
										],
										initialValue: formData.alarmItem
									})(<WarnningRatioSingle />)}
								</FormItem>
							</Col>
						</Row>
						<Row>
							<Col>
								<FormItem label="辅助服务组" {...formItemLayout}>
									{getFieldDecorator('onlineConfig.assistGroupIdList', {
										initialValue: formData.onlineConfig.assistGroupIdList
									})(
										<Select
											allowClear
											mode="multiple"
											className="online-assist-select"
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
											}
										>
											{assistGroupList.length > 0 &&
												assistGroupList.map((item) => {
													return (
														<Select.Option key={item.id} value={item.id} title={item.name}>
															{item.name}
														</Select.Option>
													)
												})}
										</Select>
									)}
								</FormItem>
							</Col>
						</Row>
					</Form>
					<div className="button-box">
						<Button
							type="primary"
							className="search-button"
							loading={loading}
							onClick={() => {
								save()
							}}
						>
							确定
						</Button>
						<div className="button-line-box"></div>
						<Button
							className="search-button"
							disabled={loading}
							onClick={() => {
								channel()
							}}
						>
							取消
						</Button>
					</div>
				</div>
			</div>
			<Loading text="处理中" visible={loading} />
		</div>
	)
}

export default Form.create()(OnlineManageEdit)
