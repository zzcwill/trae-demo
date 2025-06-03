import FormFilter from '@/components/common/formFilter'
import useGetList from '@/components/common/hooks/useGetList'
import GroupCompanyAndOrg from '@/components/employeeManage/groupCompanyAndOrg'
import { acceptanceChannelCode, callcenterCode, callcenterEnumOptionType, dictTypeEnum } from '@/const/config'
import Api from '@/request/api-callcentermanage'
import { get, post } from '@/request/request'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import CallCenterManageConfig from '@/requestApi/callcentermanage/config'
import downloadFile from '@/utils/downloadFile'
import { checkIsNumber } from '@/utils/index'
import uploadFile from '@/utils/uploadFile'
import { Button, message, Modal, Pagination, Table } from 'dpl-react'
import qs from 'qs'
import { useEffect, useRef, useState } from 'react'
import CommonOrgTree from '@/components/common/commonOrgTree'
import sessionStorageHelper from "@/utils/sessionStorage";
import './index.scss'
import { multiply } from 'lodash'
// 默认页码
const defaultPageIndex = 1
// 默认页面大小
const defaultPageSize = 10
// 组状态为正常时对应的code
const normalStatusCode = '0'
// 查询组件中的特有组件对象
const otherComponentSConfig = {
	groupCompanyAndOrg: GroupCompanyAndOrg,
  commonOrgTree: CommonOrgTree
}

export default function CallManage(props) {
	const [areaList, setAreaList] = useState([]) // 地区
	const [waitFullState, setWaitFullState] = useState([]) // 排队满时处理状态
	const [memberDistributeState, setMemberDistributeState] = useState([]) // 成员分配策略
	const [groupState, setGroupState] = useState([]) // 组状态
	const [companyList, setCompanyList] = useState([]) // 受理机构
	const [orgList, setOrgList] = useState([]) // 受理部门
	const [businessTypeList, setBusinessTypeList] = useState([]) // 咨询业务类型
	const [businessCenterList, setBusinessCenterList] = useState([]) // 经营中心列表
	const [selectedRowKeys, setSelectedRowKeys] = useState([])
	const formFilterRef = useRef(null)
	const [importing, setImporting] = useState(false)
	const modalRef = useRef(null)
	const [queryParams, setQueryParams] = useState(() => {
		let data = qs.parse(window.location.href.split('?')[1])
		if (data.id) {
			data.id = checkIsNumber(data.id)
		}
		if (data.bigRegionCodeList) {
			data.bigRegionCodeList = data.bigRegionCodeList.split(',')
		}

		return Object.assign(
			{
				pageIndex: defaultPageIndex,
				pageSize: defaultPageSize,
				status: normalStatusCode
			},
			data
		)
	}) // 查询参数
  const userInfo = sessionStorageHelper.getItem('__userInfo')
  const treeDefaultExpandedKeys = userInfo && userInfo.regionCompanyCode ? [userInfo.regionCompanyCode] : [];

	/**
	 * 查询列表Function
	 * @param {Object} params // 查询参数
	 */
	const getInCallList = (params) => {
		return get({
			url: Api.getInCallList,
			params
		})
	}

	// 封装的获取列表自定义hooks
	const { params, getList, loading, total, changeParams, list } = useGetList({
		queryFunc: getInCallList,
		defaultParam: queryParams,
		isUseQueryString: true,
		isSearchRightNow: true
	})

	/**
	 * 获取地区
	 */
	const getAreaList = async () => {
		const res = await get({
			url: Api.getAreaList
		})
		if (res.success) {
			const data = res.data
			setAreaList(data)
		} else {
			message.error(res.message)
		}
	}

	/**
	 * 添加全部的select的option
	 */
	const addAllOption = (options) => {
		return [].concat(
			{
				id: 'all',
				name: '全部'
			},
			options
		)
	}

	/**
	 * 获取枚举（排队满时处理策略、成员分配策略、组状态）
	 */
	const getEnumOptions = async () => {
		const array = [
			'GROUP_STATUS', // 组状态
			'FULL_QUEUE_STRATEGY', // 排队满时处理策略
			'ALLOCATION_STRATEGY', // 成员分配策略
			'consult_business_type',
			callcenterEnumOptionType.GBusinessCenterType,
			callcenterEnumOptionType.BAdminCompanyType
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
					// 排队满时处理策略
					case callcenterEnumOptionType.FullQueueStartegy:
						setWaitFullState(item.options)
						break
					//成员分配策略
					case callcenterEnumOptionType.AllocationStartegy:
						setMemberDistributeState(item.options)
						break
					// 组状态
					case callcenterEnumOptionType.GroupStatus:
						setGroupState(item.options)
						break
					case callcenterEnumOptionType.GBusinessCenterType:
						centerList = centerList.concat(item.options)
						break
					case callcenterEnumOptionType.BAdminCompanyType:
						centerList = centerList.concat(item.options) // 拼接两个经营中心列表
						break
					case dictTypeEnum.consultBusinessType:
						setBusinessTypeList(item.options)
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
	 * 查询模块配置
	 */
	const filterConfig = [
		{
			type: 'inputNumber', // string 组件类型 必填
			key: 'id', // string 字段名称 必填
			label: '组ID', // string label名称 非必填 默认为空
			labelWidth: '90px', // number label的width值 非必填 默认为100
			initialValue: queryParams.id || undefined,
			other: {
				placeholder: '请输入组ID',
				allowClear: true
			} // input中的其他可取字段内容
		},
		{
			type: 'select', // string 组件类型 必填
			key: 'fullQueueStrategy', // string 字段名称 必填
			label: '排队满时处理', // string label名称 非必填 默认为空
			labelWidth: '110px', // number label的width值 非必填 默认为100
			options: addAllOption(waitFullState), // 选项
			initialValue: queryParams.fullQueueStrategy || 'all', // any 默认值 该情况
			other: {
				placeholder: '请选择排队满时处理状态'
			} // input中的其他可取字段内容
		},
		{
			type: 'select', // string 组件类型 必填
			key: 'status', // string 字段名称 必填
			label: '组状态', // string label名称 非必填 默认为空
			labelWidth: '90px', // number label的width值 非必填 默认为100
			options: groupState, // 选项
			initialValue: queryParams.status || normalStatusCode, // any 默认值 该情况
			other: {
				placeholder: '请选择组状态',
				allowClear: true
			} // input中的其他可取字段内容
		},
		{
			type: 'input', // string 组件类型 必填
			key: 'name', // string 字段名称 必填
			label: '组名称', // string label名称 非必填 默认为空
			labelWidth: '90px', // number label的width值 非必填 默认为100
			initialValue: queryParams.name || undefined,
			other: {
				placeholder: '请输入组名称',
				allowClear: true
			} // input中的其他可取字段内容
		},
		{
			type: 'select', // string 组件类型 必填
			key: 'allocationStrategy', // string 字段名称 必填
			label: '成员分配策略', // string label名称 非必填 默认为空
			labelWidth: '110px', // number label的width值 非必填 默认为100
			options: addAllOption(memberDistributeState), // 选项
			initialValue: queryParams.allocationStrategy || 'all', // any 默认值 该情况
			other: {
				placeholder: '请选择成员分配策略'
			} // input中的其他可取字段内容
		},
		{
			type: 'select', // string 组件类型 必填
			key: 'areaId', // string 字段名称 必填
			label: '地区', // string label名称 非必填 默认为空
			labelWidth: '90px', // number label的width值 非必填 默认为100
			initialValue: queryParams.areaId || undefined,
			options: areaList, // 选项
			other: {
				placeholder: '请选择地区',
				allowClear: true
			} // input中的其他可取字段内容
		},
		{
			type: 'select', // string 组件类型 必填
			key: 'consultBusinessType', // string 字段名称 必填
			label: '咨询业务', // string label名称 非必填 默认为空
			labelWidth: '90px', // number label的width值 非必填 默认为100
			initialValue: queryParams.consultBusinessType || undefined,
			options: businessTypeList, // 选项
			other: {
				placeholder: '请选择',
				allowClear: true
			} // input中的其他可取字段内容
		},
		{
			type: 'select', // string 组件类型 必填
			key: 'businessCenterCode', // string 字段名称 必填
			label: '经营中心', // string label名称 非必填 默认为空
			labelWidth: '110px', // number label的width值 非必填 默认为100
			initialValue: queryParams.businessCenterCode || undefined,
			options: businessCenterList, // 选项
			other: {
				placeholder: '请选择',
				allowClear: true
			} // input中的其他可取字段内容
		},
		// {
		// 	type: 'groupCompanyAndOrg', // string 组件类型 必填
		// 	key: 'companyObj', // string 字段名称 必填
		// 	span: 16,
		// 	initialValue: {
		// 		companyId: queryParams.companyId || undefined,
		// 		departIdList: (queryParams.departIdList && queryParams.departIdList.split(',')) || []
		// 	},
		// 	other: {
		// 		companyList,
		// 		orgList
		// 	} // input中的其他可取字段内容
		// },
		{
			type: 'commonOrgTree',
			key: 'bigRegionCodeList',
			label: '受理机构',
			labelWidth: '90px',
      multiple: true, // 是否多选
      initialValue: queryParams.bigRegionCodeList || [],
      showSearch: true, // 是否显示搜索框
      treeDefaultExpandedKeys,
		}
	]

	/**
	 * 表格配置
	 */
	const tableConfig = [
		{
			title: '组ID',
			dataIndex: 'id',
			align: 'center',
			width: 60
		},
		{
			title: '组名称',
			dataIndex: 'name',
			width: 160,
			ellipsis: true
		},
		{
			title: '操作',
			dataIndex: 'option',
			align: 'center',
			width: 100,
			render: (text, record, index) => {
				if (record.status == normalStatusCode) {
					return (
						<div className="table-option-box">
							<span
								onClick={() => {
									editWorkGroup(record.id)
								}}
								className="option-button"
							>
								修改
							</span>
							<span
								onClick={() => {
									stopWorkGroup(record.id)
								}}
								className="option-button"
							>
								停用
							</span>
						</div>
					)
				} else {
					return (
						<div className="table-option-box">
							<span
								onClick={() => {
									startWorkGroup(record.id)
								}}
								className="option-button"
							>
								启用
							</span>
						</div>
					)
				}
			}
		},
		{
			title: '成员数',
			dataIndex: 'memberCount',
			align: 'center',
			width: 70
		},
		{
			title: '成员分配策略',
			dataIndex: 'allocationStrategyName',
			align: 'center',
			width: 120,
			ellipsis: true
		},
		{
			title: '允许排队长度',
			dataIndex: 'maxQueueSize',
			align: 'center'
			// width: 120
		},
		{
			title: '排队满时处理',
			dataIndex: 'fullQueueStrategyName',
			align: 'center',
			width: 110,
			ellipsis: true
		},
		{
			title: '繁忙阈值',
			dataIndex: 'busyThreshold',
			align: 'center',
			width: 80
		},
		{
			title: '代客排队',
			dataIndex: 'helpQueueSwitchName',
			align: 'center'
			// width: 100
		},
		// {
		// 	title: '受理机构',
		// 	dataIndex: 'companyName',
		// 	align: 'center'
		// },
		{
			title: '状态',
			dataIndex: 'statusName',
			align: 'center',
			width: 60
		}
	]

	/**
	 * 格式化查询参数
	 */
	const formatParams = (data) => {
		const newData = {
			...data,
			fullQueueStrategy: data.fullQueueStrategy === 'all' ? undefined : data.fullQueueStrategy,
			allocationStrategy: data.allocationStrategy === 'all' ? undefined : data.allocationStrategy,
			// companyId: data.companyObj && data.companyObj.companyId,
      bigRegionCodeList: data.bigRegionCodeList.length ? data.bigRegionCodeList.join(',') : undefined,
			// departIdList: data.companyObj && data.companyObj.departIdList && data.companyObj.departIdList.join(','),
			name: (data.name && data.name.trim()) || undefined,
			id: (data.id && data.id.trim()) || undefined,
			pageIndex: defaultPageIndex,
			pageSize: defaultPageSize
		}
		// delete newData.companyObj
		return newData
	}

	/**
	 * 查询
	 */
	const query = () => {
		const data = formFilterRef.current.getData()
    console.info('query', data)
		const param = formatParams(data)
		changeParams({
			...param
		})
	}

	/**
	 * 重置
	 */
	const resert = () => {
		formFilterRef.current.clearData({
			status: normalStatusCode,
			fullQueueStrategy: 'all',
			allocationStrategy: 'all',
			// companyObj: {
			// 	companyId: undefined,
			// 	departIdList: []
			// }
      bigRegionCodeList: [],
		})
		changeParams({
			status: normalStatusCode,
			pageIndex: defaultPageIndex,
			pageSize: defaultPageSize
		})
	}

	/**
	 * 分页
	 */
	const changePage = (pageIndex, pageSize) => {
		changeParams(
			Object.assign({}, params, {
				pageIndex,
				pageSize
			})
		)
	}

	/**
	 * 初始化页面调用方法
	 */
	const initFunc = () => {
		getAreaList() // 获取地区
		getEnumOptions() // 获取枚举（排队满时处理策略、成员分配策略、组状态）
		getCompanyList() // 获取受理机构
		getOrgList() // 获取受理部门
	}

	/**
	 * 编辑业务组
	 */
	const editWorkGroup = (id) => {
		let url = window.location.href.split('#')[0] + '#/employeeManage/groupManage/callManage/edit'
		if (id || id === 0) {
			url = url + '?id=' + id
		}
		window.open(url)
	}
	const batchStopClick = (ids) => {
		if (!ids || ids.length === 0) {
			message.error('请选择至少选择一个组')
			return
		}
		Modal.confirm({
			title: `是否确认要停用选中的组？`,
			okText: '确认',
			cancelText: '取消',
			onOk: async () => {
				const checkRes = await CallCenterManageApi.postDeleteCheck({
					idList: ids,
					type: acceptanceChannelCode.call
				})
				if (checkRes.success) {
					/* checkRes.data是一个数组[{
							"canDeleted": true,
							"groupList": [],
							"tips": ""
					}]
				然后要遍历数组每次都要弹出一个确认框,点确定再弹出数组第二个的提示，直到结束 */
					const tipsArray = checkRes.data || []
					const showTips = (index) => {
						if (index >= tipsArray.length) {
							groupDelete(ids)
							return
						}
						const { canDeleted, tips, groupList } = tipsArray[index]
						let confirmText = tips
						if (groupList.length > 0) {
							confirmText = `${tips}：${groupList.map((item) => item.name).join('，')}`
						}
						// 提示
						if (canDeleted) {  // canDeleted现在都是true
							if (tips) {
								Modal.confirm({
									title: confirmText,
									okText: '确认',
									cancelText: '取消',
									onOk: async () => {
										showTips(index + 1)
									}
								})
							} else {
								groupDelete(ids)
							}
						} else { // 下面的else现在都不会执行
							if (tips) {
								Modal.feedback({
									title: confirmText,
									icon: 'warning'
								})
							}
						}
					}
					showTips(0)
				} else {
					message.error(checkRes.message)
				}
			}
		})
	}
	const importClick = async () => {
		let check = (files) => {
			const excelReg = /\.xlsx?$/
			const name = files[0].name
			if (!excelReg.test(name)) {
				message.error('仅能导入.xlsx、.xls后缀的文件')
				return false
			}
			setImporting(true)
			return true
		}
		const url = CallCenterManageConfig.getExcelImport.baseURL + CallCenterManageConfig.getExcelImport.url
		const res = await uploadFile(url, check)
		setImporting(false)
		getList()
		if (res.success) {
			const { successNum, failNum, failDownloadUrl } = res.data || {}
			modalRef.current = Modal.open({
				title: <strong>导入完成</strong>,
				className: 'import-error-modal',
				content: (
					<div className="error-content">
						导入成功 <span className="green-text">{successNum || 0}</span> 条
						{failNum > 0 && (
							<span>
								，导入失败&nbsp;{' '}
								<span className="link-btn" onClick={() => downloadFile(failDownloadUrl)}>
									{' '}
									{failNum}
								</span>{' '}
								条
							</span>
						)}
					</div>
				),
				onOk: () => {
					modalRef.current.destroy()
				}
				// okText: "知道了",
				// cancelText: "取消",
			})
		} else {
			message.error(res.message)
		}
	}
	const exportClick = async () => {
		if (list.length === 0) {
			message.error('暂无数据可导出')
			return
		}
		const res = await CallCenterManageApi.getListExport({
			...params
		})
		if (res.success && res.data) {
			downloadFile(res.data)
		} else {
			message.error(res.message || '导出失败')
		}
	}
	const downloadTemplate = async () => {
		const res = await CallCenterManageApi.getImportTemplate({
			type: '1'
		})
		if (res.success) {
			downloadFile(res.data, false)
		} else {
			message.error(res.message)
		}
	}
	/**
	 * 停用组
	 */
	const stopWorkGroup = (id) => {
		Modal.confirm({
			title: '是否确定要停用该受理组',
			okText: '确认',
			cancelText: '取消',
			wait: true,
			onOk: () => {
				return new Promise((resolve) => {
					try {
						groupSingleDelete(id)
						resolve()
					} catch (e) {
						console.error(e)
						message.error('系统出错请联系管理员！')
						resolve()
					}
				})
			}
		})
	}

	const startWorkGroup = async (id) => {
		Modal.confirm({
			title: '是否确定要启用该受理组',
			okText: '确认',
			cancelText: '取消',
			wait: true,
			onOk: async () => {
				const data = await post({
					url: Api.groupEnable,
					data: {
						id
					}
				})
				if (data.success) {
					message.success('启用成功！')
					getList()
				} else {
					message.error(data.message)
				}
			}
		})
	}

	/**
	 * 停用组接口调用
	 */
	const groupDelete = async (ids) => {
		const res = await CallCenterManageApi.postBatchDelete({
			idList: ids,
			type: acceptanceChannelCode.call
		})
		if (res.success) {
			message.success('停用成功！')
			getList()
		} else {
			message.error(res.message)
		}
	}

	/**
	 * 停用组接口调用
	 */
	const groupSingleDelete = async (id) => {
		const res = await CallCenterManageApi.postGroupDelete({
			id
		})
		if (res.success) {
			message.success('停用成功！')
			getList()
		} else {
			message.error(res.message)
		}
	}

	useEffect(() => {
		setSelectedRowKeys([])
	}, [list])
	useEffect(() => {
		initFunc() // 获取地区
	}, [])

	return (
		<div className="call-manage-box">
			<div className="search-box">
				<FormFilter config={filterConfig} ref={formFilterRef} selfComponents={otherComponentSConfig} />
				<div className="search-button-box">
					<Button
						type="primary"
						className="search-button"
						loading={loading}
						onClick={() => {
							query()
						}}
					>
						搜索
					</Button>
					<div className="line-box"></div>
					<Button
						className="search-button"
						disabled={loading}
						onClick={() => {
							resert()
						}}
					>
						清空条件
					</Button>
				</div>
			</div>
			<div className="table-box">
				<div className="table-btn">
					<Button type="primary" onClick={() => editWorkGroup()} style={{ marginRight: 10 }}>
						新增业务组
					</Button>
					<Button
						type="primary"
						style={{ marginRight: 10 }}
						onClick={() => {
							batchStopClick(selectedRowKeys)
						}}
					>
						批量停用
					</Button>
					<Button type="primary" style={{ marginRight: 10 }} onClick={exportClick}>
						导出
					</Button>
					<Button disabled={importing} type="primary" style={{ marginRight: 10 }} onClick={importClick}>
						导入
					</Button>
					<Button style={{ marginRight: 10 }} onClick={downloadTemplate}>
						下载导入模板
					</Button>
				</div>
				<Table
					dataSource={list}
					loading={loading}
					columns={tableConfig}
					pagination={false}
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						onChange(selectedRowKeys) {
							setSelectedRowKeys(selectedRowKeys)
						}
					}}
					rowKey={'id'}
					className="call-manage-table"
				/>
				<div className="pagination-box">
					<Pagination
						showTotalInfo={true}
						current={parseInt(params.pageIndex)}
						pageSize={parseInt(params.pageSize)}
						total={total}
						showQuickJumper={true}
						onChange={changePage}
					/>
				</div>
			</div>
		</div>
	)
}
