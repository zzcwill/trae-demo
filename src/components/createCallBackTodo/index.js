/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-01-20 14:29:35
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-04-27 14:42:41
 * @FilePath: /askone-manage-pc/src/components/createCallBackTodo/index.js
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import { dictTypeEnum } from '@/const/config'
import useParamsList from '@/hooks/useParamsList'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import CallCenterWebApi from '@/requestApi/callcenterweb/api'
import { checkPhone, loadGalaxyConfig, isMobile, isInWeCom } from '@/utils'
import { AutoComplete, Button, Col, Form, Icon, Input, message, Modal, Radio, Row, Select } from 'dpl2-proxy'
import Cookies from 'js-cookie'
import { debounce } from 'lodash'
import qs from 'qs'
import { useCallback, useEffect, useRef, useState, useMemo } from 'react'
import './index.scss'

const FormItem = Form.Item
const { Option } = Select

const tipContent = (
  <div>
    自动分配回电待办执行人失败，可能是以下原因导致，是否打开待办创建界面手动创建待办？<br/>
    1、无法找到分配规则<br/>
    2、企业机构下固话超过5个无法添加固话<br/>
    3、待办创建系统故障</div>
)

export default function CreateCallBackTodo(props = {}) {
	const { className, mobileType = isMobile() ||  isInWeCom()} = props
  const searchTypeList = useMemo(() => {
    return [
      {
        label: mobileType ? '企业' : '查企业',
        value: 'company'
      },
      {
        label: mobileType ? '机构' : '查机构/个代',
        value: 'agency'
      }
    ]
  }, [mobileType]) 
	const rootClassName = ['create-call-back-todo', mobileType ? 'mobile-padding' : undefined, className].join(' ')
	const [form] = Form.useForm()
	const [options, setOptions] = useState([])
	const searchTypeRef = useRef(searchTypeList[0].value)
	const [selectCompanyInput, setSelectCompanyInput] = useState('')
	const [selectCompany, setSelectCompany] = useState({})
	const [todoTypeList, setTodoTypeList] = useState([])
	const [searchLoading, setSearchLoading] = useState(false)
	const [uploadLoading, setUploadLoading] = useState(false) // 提交loading
	const isTemCompanyRef = useRef(false) // 是否是临时企业
	const offset = mobileType ? 0 : 2 // 移动端不需要偏移量
	const [todoExecutePartyList, productCategoryList] = useParamsList(
		[
			dictTypeEnum.todo_execute_party, // 执行方
			dictTypeEnum.productCategory // 咨询产品大类
		],
		CallCenterManageApi.getCommonOptions
	)

	const validateCustomRule = (_, value) => {
		if (!value) {
			// 为空不校验
			return Promise.resolve()
		}
		var regx = /^1\d{10}$/
		if (!regx.test(value.trim())) {
			// 需要校验手机号
			return Promise.reject(new Error('手机号格式错误！'))
		}
		return Promise.resolve()
	}

	const handleSearch = useCallback(
		debounce(async (value) => {
			console.log('date', new Date().getTime())
			setSearchLoading(true)
			let results = []
			if (!value) {
				results = []
				setOptions([])
			} else {
				if (searchTypeRef.current === 'company') {
					const res = await CallCenterWebApi.getCustomerPortalSearchCustomer({
						yhlx: 0,
						yhmc: value,
						caseSensitive: false
					})
					if (res.success && Array.isArray(res.data?.yhList)) {
						results = res.data.yhList.map((item) => {
							// 企业
							return {
								...item,
								customerId: item.yhid,
								customerType: item.yhlx || '0', // 0：单位用户，1：代理商或事务所，2：个人代理
								code: item.yhdm,
								name: item.yhmc,
								xzqhMc: item.xzqhMc,
								fzgsdm: item.fzgsDm || item.fzgsdm,
								statusMc: item.statusMc
							}
						})
					} else {
						message.error(res.message || '查询失败')
					}
				} else {
					const res = await CallCenterWebApi.getAgencySearchNonCloudAgency({
						keyword: value,
						caseSensitive: false
					})
					if (res.success && Array.isArray(res.data)) {
						results = res.data.map((item) => {
							// 机构/个代
							return {
								...item,
								customerId: item.id,
								customerType: item.groupType,
								code: item.agencyCode,
								name: item.fullName,
								xzqhMc: item.xzqhMc,
								fzgsdm: item.branchCode,
								statusMc: item.statusMc
							}
						})
					} else {
						message.error(res.message || '查询失败')
					}
				}
			}
			setSearchLoading(false)
			setOptions(results)
		}, 500),
		[]
	)
	const getTodoTypeList = async () => {
		const res = await CallCenterManageApi.getTodoGetTodoType()
		if (res.success) {
			const array = res.data?.map((item) => {
				return { label: item.name, value: item.code }
			})
			setTodoTypeList(array || [])
		}
	}

	const oldCreateTodo = async (values) => {
		const res = await CallCenterWebApi.getTodoTaskUploadTodoReportData({
			bizId: selectCompany.customerId,
			customerType: selectCompany.customerType
		})
		if (res.success && res.data) {
			const params = {
				token: Cookies.get('sso-epctoken'),
				companyIds: selectCompany.customerType === '0' ? [selectCompany.customerId] : [],
				institutionIds: selectCompany.customerType !== '0' ? [selectCompany.customerId] : [],
				rwlyid: res.data,
				bringPersonName: selectCompany.name,
				source: 'consult_online',
				todoProperty: selectCompany.customerType === '0' ? 'company' : 'institution',
				fzgsdm: selectCompany.fzgsdm,
				controlSaveOnce: true
			}
			// 判断个人手机号是否存在，如果存在的话切为1开头的11位数字，就带入手机号
			if (values.contactsPhone && checkPhone(values.contactsPhone)) {
				params.bringMobile = values.contactsPhone
			}
			const galaxyConfig = await loadGalaxyConfig()
			const isInBiz = location.host.indexOf('17win.com') >= 0
			const url = `${isInBiz ? galaxyConfig.outCreateTodoUrl : galaxyConfig.createTodoUrl}?${qs.stringify(params)}`
			console.log('process.env.PHOENIX_BUILD_ENV', process.env.PHOENIX_BUILD_ENV, 'url', url, params)
      if (isMobile()) {
        // 移动端打开新窗口
        // 这种方式在企微里面不会产生底部的导航栏
        location.href = url
      } else {
        window.open(url) //因为这个链接live800的框打不开
      }
		} else {
			message.error(res.message || '获取待办数据失败')
		}
	}

	const onFinish = async (values) => {
		if (!selectCompany.customerId) {
			return message.error('请查询并确认客户信息')
		}
    // 校验手机号跟联系人要么都必填要么都不必填
    if (values.contactsPhone && !values.contactsName) {
      return message.error('联系人不能为空')
    }
    if (!values.contactsPhone && values.contactsName) {
      return message.error('联系号码不能为空')
    }
		// 企业+临时企业或者机构需要校验手机号
		if ((searchTypeRef.current === 'company' && isTemCompanyRef.current) || searchTypeRef.current === 'agency') {
			try {
				await validateCustomRule(null, values.contactsPhone)
			} catch (error) {
				if (searchTypeRef.current === 'company') {
					return message.error('临时企业必须使用手机号创建回电待办')
				} else {
					return message.error(error.message)
				}
			}
		}

		setUploadLoading(true)
		const res = await CallCenterWebApi.postConsulttaskruletodoCallbackCreateTodo({
			...values,
			customerId: selectCompany.customerId,
			customerType: selectCompany.customerType
		})
		setUploadLoading(false)
		if (res.success && res.data) {
			message.success('创建成功')
			// 清空表单
			form.resetFields()
		} else {
			Modal.confirm({
				title: '提交失败',
        width: mobileType ? '90%' : 420,
				content: tipContent,
				async onOk() {
					// 抄在线一户式逻辑
					oldCreateTodo(values)
				},
				onCancel() {}
			})
		}
	}

	useEffect(() => {
		if (selectCompany?.customerId && selectCompany.customerType === '0') {
			// 企业 - 空的去重
      const params = [selectCompany.dssh, selectCompany.gssh, selectCompany.shxydm, selectCompany.code].filter(Boolean);
			CallCenterWebApi.postCompanyCheckTemporaryCompanyConfig(params).then((res) => {
				if (res.success) {
					isTemCompanyRef.current = res.data
				}
			})
		}
	}, [selectCompany])
	useEffect(() => {
		getTodoTypeList()
	}, [])
	return (
		<div className={rootClassName}>
			<Row className="search-view">
				<Col offset={offset} span={offset ? 4 : 7}>
					<Select
						defaultValue={searchTypeList[0].value}
						onChange={(val) => {
							searchTypeRef.current = val
							setOptions([])
							setSelectCompanyInput('')
							setSelectCompany({})
						}}
						placeholder="请选择"
						optionFilterProp="children"
						style={{ width: '100%' }}
					>
						{searchTypeList?.map((option) => (
							<Option value={option.value} key={option.value}>
								{option.label}
							</Option>
						))}
					</Select>
				</Col>
				<Col span={17} style={{ position: 'relative' }}>
					<AutoComplete
						style={{ width: '100%' }}
						value={selectCompanyInput}
						placeholder="请税输入税号或名称查询"
						onSearch={handleSearch}
						options={options}
						getPopupContainer={(triggerNode) => triggerNode.parentNode}
						onChange={(val) => {
							setSelectCompanyInput(val)
						}}
						optionRender={(option) => {
							const item = option.data
							return (
								<div
									key={item.id}
									onClick={() => {
										console.log('onClick', item.name)
										setSelectCompanyInput('') // 选中之后直接同步到下面
										setSelectCompany(item)
									}}
								>
									{mobileType ? (
										<Row className="complete-item">
											<Col span={24} className="limit-one" title={item.code}>
												{item.code}
											</Col>
											<Col span={24} className="limit-one" title={item.name}>
												{item.name}
											</Col>
										</Row>
									) : (
										<Row className="complete-item">
											<Col span={8} className="limit-one" title={item.code}>
												{item.code}
											</Col>
											<Col span={8} className="limit-one" title={item.name}>
												{item.name}
											</Col>
											<Col span={5} className="limit-one" title={item.xzqhMc}>
												{item.xzqhMc}
											</Col>
											<Col offset={1} span={2} className="limit-one" title={item.statusMc}>
												{item.statusMc}
											</Col>
										</Row>
									)}
								</div>
							)
						}}
						notFoundContent={searchLoading ? <Icon type="loading" spin /> : null}
					/>
				</Col>
			</Row>
			{mobileType ? (
				<>
					{selectCompany.name && (
						<Row style={{ margin: '10px 0' }}>
							<Col span={24}>
								{selectCompany.name}
								{/* {selectCompany.qytype && <span>（{selectCompany.qytype}）</span>} */}
							</Col>
						</Row>
					)}
					<Row style={{ margin: '10px 0' }}>
						<Col span={24}>{selectCompany.code}</Col>
					</Row>
				</>
			) : (
				<Row style={{ margin: '10px 0' }}>
					<Col offset={offset} span={8}>
						{selectCompany.name}
						{/* {selectCompany.qytype && <span>（{selectCompany.qytype}）</span>} */}
					</Col>
					<Col span={8}>{selectCompany.code}</Col>
				</Row>
			)}
			{selectCompany.xzqhMc && (
				<Row style={{ margin: '10px 0' }}>
					<Col offset={offset}>所属地区：{selectCompany.xzqhMc}</Col>
				</Row>
			)}
			<Form
				form={form}
				initialValues={{
					executeParty: 'remote_center'
				}}
				name="createCallBackForm"
				labelCol={{
					span: 7
				}}
				wrapperCol={{
					span: 15
				}}
				onFinish={onFinish}
			>
				<FormItem label="咨询产品大类" name="consultCpdl" rules={[{ required: true, message: `咨询产品大类不得为空` }]}>
					<Select style={{ width: '100%' }} virtual allowClear placeholder="请选择" optionFilterProp="children">
						{productCategoryList?.map((item) => {
							return (
								<Option key={item.value} value={item.value}>
									{item.label || item.name}
								</Option>
							)
						})}
					</Select>
				</FormItem>
				<FormItem label="待办类型" name="todoType" rules={[{ required: true, message: `待办类型不得为空` }]}>
					<Select style={{ width: '100%' }} virtual allowClear placeholder="请选择" optionFilterProp="children">
						{todoTypeList?.map((item) => {
							return (
								<Option key={item.value} value={item.value}>
									{item.label || item.name}
								</Option>
							)
						})}
					</Select>
				</FormItem>
				<FormItem label="执行方" name="executeParty" rules={[{ required: true, message: '执行方不得为空' }]}>
					<Radio.Group>
						{todoExecutePartyList?.map((item1) => (
							<Radio key={item1.value} value={item1.value}>
								{item1.label}
							</Radio>
						))}
					</Radio.Group>
				</FormItem>
				<FormItem label="联系人" name="contactsName">
					<Input style={{ width: '100%' }} maxLength={20} placeholder="请输入" />
				</FormItem>
				<FormItem label="联系号码" name="contactsPhone">
					<Input style={{ width: '100%' }} placeholder="请输入" />
				</FormItem>
				<FormItem label="任务描述" name="taskDescription">
					<Input.TextArea placeholder="请输入备注" maxLength={500} rows={4} />
				</FormItem>
				<Form.Item
					wrapperCol={{
						offset: 7,
						span: 15
					}}
				>
					<Button type="primary" htmlType="submit" loading={uploadLoading}>
						提交
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}
