import React, { useState, useEffect, useRef } from 'react'
import './index.scss'
import { Button, Modal, Input, Checkbox, Popover, Icon, Select, message } from 'dpl-react'
import classnames from 'classnames'
import Api from '@/request/api-callcentermanage'
import { get, post } from '@/request/request'
import { isPlainObject } from '@/utils/index'
import { acceptanceChannelCode, callcenterCode, dictTypeEnum } from '@/const/config'
import CommonOrgTree from '@/components/common/commonOrgTree'
import sessionStorageHelper from "@/utils/sessionStorage";
const Option = Select.Option

const defaultFunctionModal = {
	isShow: false
}
// 渲染列表
const contentElement = (nameList) => {
	return nameList.map((item) => {
		return (
			<div className="name-list-item">
				<span title={item}>{item}</span>
			</div>
		)
	})
}
const defaultModalTitle = '选择'
const defaultPlaceholder = '请选择'
const defaultModalWidth = '500'
const showTypeMap = {
	input: 'input', // input框中展示
	box: 'box', // 单独的box展示
	button: 'button', // 只展示选择按钮
	buttonBox: 'buttonBox' // 按钮+按钮下的box展示
}
const defaultFormat = {
	label: 'name',
	value: 'id'
}

/**
 * 获取选项列表
 */
function getOptionsList(targetList, optionsMap = {}) {
	let optionsList = []
	if (Array.isArray(targetList) && isPlainObject(optionsMap)) {
		targetList.forEach((item) => {
			const data = optionsMap[item]
			if (data) {
				optionsList.push(data)
			}
		})
	}
	return optionsList
}

function ModalSelect(props, ref) {
	const {
		value,
		onChange,
		list = [], // showCompanyDepartFilter=false,不显示受理机构跟受理部门必传，因为要实时筛选展示列表，其他情况不需要传
		format = defaultFormat,
		placeholder = defaultPlaceholder,
		beforeClick,
		disabled,
		modalTitle = defaultModalTitle,
		modalWidth = defaultModalWidth,
		onModalButtonClick,
		showType = showTypeMap.input,
		showBoxClassName,
		showButton = true,
		className,
		modalClassName,
		style,
		isShowModalClear = false,
		isNeedAllSelect = true,
		isNeedStringToNumber = false,
		groupType, // 当前是来电组还是在线组
		boxDesc = '',
		showCompanyDepartFilter = false, // 是否展示查询受理部门和受理机构，目前工作时间、特殊日需要手动配置
    outerFetchCompanyAndOrg = true, // 是否外部请求受理机构跟受理部门
		companyList, // 不传入内部请求受理机构
		orgList, // 不传入内部请求受理部门
		selectBtnText = '选择',
		showConsultBusinessType = false, // 显示咨询业务
		showProductCategory = false, // 显示产品大类
		keywordDesc = ''
	} = props
	const [isShowModal, setIsShowModal] = useState(false) // 是否展示弹窗
	const [selectedRowKeys, setSelectedRowKeys] = useState(() => {
		return value || []
	}) // 选中列表
	const [selectValue, setSelectValue] = useState('') // 过滤查询参数
	const [selectCompanyId, setSelectCompanyId] = useState() // 过滤查询参数
  const [bigRegionCode, setBigRegionCode] = useState() // 查询条件-受理机构列表
	const [selectDepartId, setSelectDepartId] = useState() // 过滤查询参数
	const [queryList, setQueryList] = useState([]) // 通过搜索按钮查询出来的接口组数据
	const [innerCompanyList, setInnerCompanyList] = useState([]) // 机构列表
	const [innerOrgList, setInnerOrgList] = useState([]) // 部门列表
	const [lastSelectRowKeys, setLastSelectRowKeys] = useState([]) // 上一次选择
	const [isComposition, setIsComposition] = useState(false) // 是否中文输入
	const [selectList, setSelectList] = useState([]) // 过滤的列表
	const [nameList, setNameList] = useState([]) // 选中的名字列表
	const [isChecked, setIsChecked] = useState(false) // 是否选中
	const [selectRowOptions, setSelectRowOptions] = useState([]) // 选中的选项
	const [searched, setSearched] = useState(false)
	const [productCategoryList, setProductCategoryList] = useState([]) // 产品大类
	const [businessTypeList, setBusinessTypeList] = useState([]) // 咨询业务类型
	const [consultBusinessType, setConsultBusinessType] = useState('') // 选择的咨询业务
	const [productCategory, setProductCategory] = useState('') // 选择的产品大类
	const listMap = useRef({})
	const selectListMap = useRef({}) // 选中列表map
	const showSearchButton = showCompanyDepartFilter
  const userInfo = sessionStorageHelper.getItem('__userInfo')
  const treeDefaultExpandedKeys = userInfo && userInfo.regionCompanyCode ? [userInfo.regionCompanyCode] : [];    

	const isBox = () => {
		return [showTypeMap.box, showTypeMap.buttonBox].includes(showType)
	}

	const showTypeBoxClass = classnames({
		'name-list-context': true,
		'name-list-input': showType === showTypeMap.input,
		'name-list-box': isBox(),
		'name-list-box-disabled': isBox() && disabled,
		'name-list-box-active': isBox() && !disabled,
		[showBoxClassName]: showBoxClassName
	})

	const bodyClass = classnames({
		'modal-select-box': true,
		[className]: className
	})

	const modalSelectInputElClass = classnames({
		'modal-select-input-el': true,
		'modal-select-input-el-clear': nameList && nameList.length > 0
	})

	// 是否展示下拉
	const isShowPopover = (nameList) => {
		if (nameList.length > 0) {
			return false
		}
		return true
	}
	// 选择功能
	const selectFunction = () => {
		let flag = true
		if (typeof beforeClick === 'function') {
			flag = beforeClick()
		}
		if (flag) {
			setIsShowModal(true)
		}
	}

	const compositionStartFunc = () => {
		setIsComposition(true)
	}

	/**
	 * 中文输入时的调用方法
	 */
	const compositionEndFunc = (e) => {
		setIsComposition(false)
		selectValueChange(e, false)
	}

	//  过滤查询字段改变
	const selectValueChange = (e, flag) => {
		let data = e.target.value
		flag = typeof flag === 'undefined' ? isComposition : flag
		if (flag) {
			setSelectValue(data)
			return
		}
		if (!showSearchButton) {
			if (data) {
				let newList = []
				let resultObj = {}
				list.forEach((item) => {
					if (item[format.label].indexOf(data) > -1) {
						newList.push(item)
						resultObj[item[format.value]] = item
					}
				})
				setSelectList(newList)
				selectListMap.current = resultObj
			} else {
				setSelectList(list)
				selectListMap.current = listMap.current
			}
		}
		setSelectValue(data)
	}

	// 复选框选中
	const selectChange = (data) => {
		setSelectedRowKeys(data)
	}

	// 关闭
	const closeModal = () => {
		// 关闭的同时将状态初始化
		selectListMap.current = listMap.current
		setIsShowModal(false)
		setSelectValue(undefined)
		if (showSearchButton) {
			setSelectCompanyId(undefined)
			setSelectDepartId(undefined)
			setConsultBusinessType(undefined)
			setProductCategory(undefined)
			queryGroupData({
				name: undefined,
				companyId: undefined,
				departIdList: undefined,
				consultBusinessType: undefined,
				productCategory: undefined
			})
		} else {
			setSelectList(list)
		}
		if (isShowModalClear) {
			setSelectedRowKeys(lastSelectRowKeys)
		}
	}

	// 弹窗确定按钮
	const changeFunction = () => {
		let data = [].concat(selectedRowKeys)
		if (onModalButtonClick && typeof onModalButtonClick == 'function') {
			data = onModalButtonClick(selectedRowKeys)
		}
		if (showSearchButton) {
			onChange(
				data.filter((key) => selectListMap?.current?.[key]),
				selectRowOptions
			)
		} else {
			onChange(data, selectRowOptions)
		}
		closeModal()
	}

	// 清空
	const clearInput = (e) => {
		onChange([], [])
	}

	// 弹窗清空
	const clearSelect = () => {
		setSelectedRowKeys([])
	}

	/**
	 * 清除选中的选项,主要在showType是box的场景下使用
	 */
	const clearSelectRowKey = (item) => {
		if (Array.isArray(selectedRowKeys) && item) {
			const list = [].concat(selectedRowKeys)
			const optionList = [].concat(selectRowOptions)
			const index = list.findIndex((id) => id == item[format.value])
			if (index > -1) {
				list.splice(index, 1)
				optionList.splice(index, 1)
			}
			onChange && onChange(list, optionList)
		}
	}

	/**
	 * 选中全部
	 */
	const selectAllClick = () => {
		let result = [].concat(selectedRowKeys)
		if (Array.isArray(selectList)) {
			selectList.forEach((item) => {
				const resultData = item[format.value]
				if ((resultData || resultData === 0) && !result.includes(resultData)) {
					result.push(resultData)
				}
			})
		}
		setSelectedRowKeys(result)
	}

	/**
	 * 清楚全部
	 */
	const clearAllClick = () => {
		let result = [].concat(selectedRowKeys)
		if (Array.isArray(selectList)) {
			selectList.forEach((item) => {
				const resultData = item[format.value]
				if (resultData || resultData === 0) {
					const index = result.indexOf(resultData)
					if (index > -1) {
						result.splice(index, 1)
					}
				}
			})
		}
		setSelectedRowKeys(result)
	}

	/**
	 * 全选按钮点击
	 */
	const allOnClick = (e) => {
		const isChecked = e.target.checked
		if (isChecked) {
			selectAllClick()
		} else {
			clearAllClick()
		}
	}

	const renderElDom = () => {
		if (showType === showTypeMap.button) {
			return (
				<Button
					type="primary"
					onClick={() => {
						selectFunction()
					}}
					className="modal-select-input-button"
					disabled={disabled}
				>
					{selectBtnText}
				</Button>
			)
		}

		if (showType === showTypeMap.buttonBox) {
			return (
				<>
					{boxDesc}
					<Button
						type="primary"
						onClick={() => {
							selectFunction()
						}}
						disabled={disabled}
						style={{ minWidth: `60px`, marginLeft: 24 }}
					>
						{selectBtnText}
					</Button>
					<div className="modal-select-type-box" style={{ paddingRight: 0, marginTop: 16 }}>
						<div className={showTypeBoxClass} style={{ minHeight: 48 }}>
							{nameList && nameList.length > 0 && (
								<>
									<ul className="select-box-context">
										{nameList.map((item) => {
											return (
												<li className="select-box-item" title={item[format.label] || ''}>
													<div className="item-text">{item[format.label]}</div>
													{!disabled && (
														<Icon
															type="pure-close"
															className="item-close-icon"
															onClick={() => {
																clearSelectRowKey(item)
															}}
														></Icon>
													)}
												</li>
											)
										})}
									</ul>
									<Icon type="circle-error" className="select-box-clear" onClick={clearInput} />
								</>
							)}
						</div>
					</div>
				</>
			)
		}

		return showType !== showTypeMap.box ? (
			<div className="modal-select-type-input">
				<Popover
					content={contentElement(nameList)}
					disabled={isShowPopover(nameList)}
					placement="bottomLeft"
					overlayClassName="model-select-popover-box"
					getPopupContainer={(triggerNode) => triggerNode.parentNode}
				>
					<div className="modal-select-input">
						<Input
							placeholder={placeholder}
							value={nameList.join(',')}
							readOnly="readonly"
							className={modalSelectInputElClass}
						/>
						{nameList && nameList.length > 0 && (
							<Icon type="circle-error" className="modal-select-input-icon" onClick={clearInput} />
						)}
					</div>
				</Popover>
				<Button
					type="primary"
					onClick={() => {
						selectFunction()
					}}
					className="modal-select-input-button"
					disabled={disabled}
				>
					{selectBtnText}
				</Button>
			</div>
		) : (
			<div className="modal-select-type-box">
				<div className={showTypeBoxClass}>
					{nameList && nameList.length > 0 && (
						<>
							<ul className="select-box-context">
								{nameList.map((item) => {
									return (
										<li className="select-box-item" title={item[format.label] || ''}>
											<div className="item-text">{item[format.label]}</div>
											{!disabled && (
												<Icon
													type="pure-close"
													className="item-close-icon"
													onClick={() => {
														clearSelectRowKey(item)
													}}
												></Icon>
											)}
										</li>
									)
								})}
							</ul>
							<Icon type="circle-error" className="select-box-clear" onClick={clearInput} />
						</>
					)}
				</div>
				{showButton && (
					<Button
						type="primary"
						onClick={() => {
							selectFunction()
						}}
						disabled={disabled}
						style={{ minWidth: `60px` }}
					>
						{selectBtnText}
					</Button>
				)}
			</div>
		)
	}

	/**
	 * 获取枚举
	 */
	const getEnumOptions = async () => {
		const array = ['consult_business_type', 'product_category']
		const res = await get({
			url: Api.getEnumOption,
			params: {
				groupNames: array.join(',')
			}
		})
		if (res.success) {
			const data = res.data
			data.forEach((item) => {
				switch (item.groupName) {
					case dictTypeEnum.consultBusinessType:
						setBusinessTypeList(item.options)
						break
					case dictTypeEnum.productCategory:
						setProductCategoryList(item.options)
						break
					default:
						break
				}
			})
		} else {
			message.error(res.message)
		}
	}

	const getCompanyListList = async () => {
		let companyListData = props.companyList
		if ((!companyListData || companyListData?.length === 0) && !outerFetchCompanyAndOrg) {
			const res = await get({
				url: Api.getCompanyList,
				params: {
					needRemoteCenter: true
				}
			})
			companyListData = res.data
		}
		setInnerCompanyList(companyListData);
	}

    const getOrgListList = async () => {
		let orgListData = props.orgList
		if ((!orgListData || orgListData?.length === 0) && !outerFetchCompanyAndOrg) {
            const res = await get({
                url: Api.getDepartmentList,
                params: {
                  companyId: callcenterCode,
                },
              });            
			orgListData = res.data
		}
		setInnerOrgList(orgListData);
	}

	// list 变化要重新构建map
	useEffect(() => {
		if (!showSearchButton || !searched) {
			let map = {}
			list.forEach((item) => {
				map[item[format.value]] = item
			})
			listMap.current = map
			selectListMap.current = map
			setSelectList(list)
		}
	}, [JSON.stringify(list), showSearchButton, searched])

	// list 变化要重新构建map
	useEffect(() => {
		if (showSearchButton && searched) {
			let map = {}
			queryList.forEach((item) => {
				map[item[format.value]] = item
			})
			if (!selectValue && !selectCompanyId && !selectDepartId && !consultBusinessType && !showProductCategory) {
				listMap.current = map
			}
			selectListMap.current = map
			setSelectList(queryList)
		}
	}, [queryList, showSearchButton, searched])

	// value发生变化了，需要生成对应的nameList用于展示
	useEffect(() => {
		if (value) {
			let nameList = []
			if (showType === showTypeMap.input) {
				value.forEach((item) => {
					if (item || item === 0) {
						// 第一次重新渲染的时候，实际上是没有值的，但是list改变的时候，会重新触发，所以最后nameList会存在值
						if (listMap.current[item]) {
							nameList.push(listMap.current[item][format.label])
						}
					}
				})
			} else {
				nameList = getOptionsList(value, listMap.current)
			}
			setNameList(nameList)
		} else {
			setNameList([])
		}
	}, [value, listMap.current])

	// value发生变化，selectedRowKeys的状态发生改变，并且lastSelectRowKey发生改变
	useEffect(() => {
		setSelectedRowKeys(value || [])
		setLastSelectRowKeys(value || [])
	}, [value])

	// 根据selectRowKeys变化，构建涉及的选项内容
	useEffect(() => {
		const optionsList = getOptionsList(selectedRowKeys, listMap.current)
		setSelectRowOptions(optionsList)
	}, [selectedRowKeys, listMap.current])

	// 根据当前的选择列表判断是否全部选中
	useEffect(() => {
		if (isNeedAllSelect && selectListMap.current) {
			const keyList = Object.keys(selectListMap.current)
			let isSelectAll = true
			if (keyList.length && Array.isArray(selectedRowKeys) && selectedRowKeys.length) {
				try {
					keyList.forEach((key) => {
						if (isNeedStringToNumber) {
							key = Number(key)
						}
						if (!selectedRowKeys.includes(key)) {
							isSelectAll = false
							throw ''
						}
					})
				} catch (e) {}
			} else {
				isSelectAll = false
			}
			setIsChecked(isSelectAll)
		}
	}, [selectListMap.current, selectedRowKeys])

	const queryGroupData = async (params) => {
		// 根据传入的组类型：1、电话组 2、在线组。调用不同接口获取数据
		const url = groupType === acceptanceChannelCode.call ? Api.getInCallList : Api.getOnlineGroupList
		const res = await get({
			url,
			params: {
				name: selectValue?.trim(),
				// companyId: selectCompanyId,
				// departIdList: selectDepartId,
        bigRegionCode,
				productCategory,
				consultBusinessType,
				pageSize: 9999999,
				pageIndex: 1,
				status: 0,
				...(params || {})
			}
		})
		if (res.success) {
			setSearched(true)
			setQueryList(res?.data?.list || [])
		} else {
			message.error(res.message)
		}
	}

	useEffect(() => {
		queryGroupData()
	}, [groupType])

    useEffect(() => {
        getCompanyListList()
    }, [JSON.stringify(props.companyList)])

    useEffect(() => {
        getOrgListList()
    }, [JSON.stringify(props.orgList)])

	useEffect(() => {
		// 开启咨询业务或者产品大类搜索查询项的时候才需要调用
		if (showConsultBusinessType || showProductCategory) {
			getEnumOptions()
		}
	}, [showConsultBusinessType, showProductCategory])

	/**
	 * 受理机构改变
	 */
	const companyChange = (id) => {
		// setSelectCompanyId(id)
		// setSelectDepartId(undefined)
    setBigRegionCode(id)
	}

	return (
		<div className={bodyClass} style={style}>
			{renderElDom()}
			<Modal
				title={modalTitle}
				visible={isShowModal}
				width={`${modalWidth}px`}
				className={classnames('modal-select-modal', modalClassName)}
				footer={null}
				destroyOnClose
				onCancel={() => {
					closeModal()
				}}
			>
				<div className="modal-select-modal-search">
					{showCompanyDepartFilter ? (
						<>
							<div className="filter-row">
								<div className="filter-row-label">受理机构：</div>
                <CommonOrgTree 
                  className="filter-row-select"
                  showSearch // 是否显示搜索框
                  treeDefaultExpandedKeys={treeDefaultExpandedKeys}
									onChange={companyChange}
									value={bigRegionCode}                                  
                />
							</div>
							{/* <div className="filter-row">
								<div className="filter-row-label">受理机构1：</div>
								<Select
									className="filter-row-select"
									onChange={companyChange}
									value={selectCompanyId}
									allowClear
									placeholder="请选择受理机构"
								>
									{innerCompanyList.map((item) => {
										return (
											<Option key={item.id} value={item.id}>
												{item.name}
											</Option>
										)
									})}
								</Select>
							</div>
							<div className="filter-row">
								<div className="filter-row-label">受理部门：</div>
								<Select
									className="filter-row-select"
									onChange={(value) => {
										setSelectDepartId(value)
									}}
									value={selectDepartId}
									// 未选择机构无法选择部门
									disabled={!selectCompanyId || selectCompanyId !== callcenterCode}
									allowClear
									placeholder="请选择受理部门"
								>
									{innerOrgList.map((item) => {
										return (
											<Option key={item.id} value={item.id}>
												{item.name}
											</Option>
										)
									})}
								</Select>
							</div> */}
							{showConsultBusinessType ? (
								<div className="filter-row">
									<div className="filter-row-label">咨询业务：</div>
									<Select
										className="filter-row-select"
										onChange={(value) => {
											setConsultBusinessType(value)
										}}
										value={consultBusinessType}
										allowClear
										placeholder="请选择咨询业务"
									>
										{businessTypeList.map((item) => {
											return (
												<Option key={item.id} value={item.id}>
													{item.name}
												</Option>
											)
										})}
									</Select>
								</div>
							) : null}
							{showProductCategory ? (
								<div className="filter-row">
									<div className="filter-row-label">产品大类：</div>
									<Select
										className="filter-row-select"
										onChange={(value) => {
											setProductCategory(value)
										}}
										value={productCategory}
										// 未选择机构无法选择部门
										allowClear
										placeholder="请选择产品大类"
									>
										{productCategoryList.map((item) => {
											return (
												<Option key={item.id} value={item.id}>
													{item.name}
												</Option>
											)
										})}
									</Select>
								</div>
							) : null}
						</>
					) : null}
					<div className="filter-row">
						{keywordDesc && <div className="filter-row-label">{keywordDesc}</div>}
						<Input
							style={{ marginRight: 4 }}
							value={selectValue}
							autoComplete="off"
							onCompositionStart={compositionStartFunc}
							onCompositionEnd={compositionEndFunc}
							onChange={selectValueChange}
							onPressEnter={() => {
								if (showSearchButton) {
									queryGroupData()
								}
							}}
							allowClear
						/>
						{showSearchButton ? (
							<Button
								type="primary"
								onClick={() => {
									queryGroupData()
								}}
							>
								搜索
							</Button>
						) : null}
						{isShowModalClear && (
							<Button
								style={{ marginLeft: 8 }}
								type="primary"
								onClick={() => {
									clearSelect()
								}}
							>
								清空
							</Button>
						)}
					</div>
				</div>
				<div className="modal-select-checkbox">
					{isNeedAllSelect && selectList.length > 0 && (
						<Checkbox checked={isChecked} className="modal-select-checkbox-item" onClick={allOnClick}>
							全选
						</Checkbox>
					)}
					<Checkbox.Group value={selectedRowKeys} onChange={selectChange}>
						{selectList.length > 0 &&
							selectList.map((item) => {
								return (
									<Checkbox key={item[format.value]} value={item[format.value]} className="modal-select-checkbox-item">
										{item[format.label]}
									</Checkbox>
								)
							})}
					</Checkbox.Group>
				</div>
				<div className="button-box">
					<Button
						type="primary"
						className="button-item"
						onClick={() => {
							changeFunction()
						}}
					>
						确定
					</Button>
					<div className="line-box"></div>
					<Button
						className="button-item"
						onClick={() => {
							closeModal()
						}}
					>
						取消
					</Button>
				</div>
			</Modal>
		</div>
	)
}
export default ModalSelect
