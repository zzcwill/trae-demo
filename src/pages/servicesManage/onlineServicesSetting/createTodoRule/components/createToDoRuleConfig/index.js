import React, { useEffect, useState } from 'react'
import './index.scss'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import { Select, message } from 'dpl2-proxy'
import { useStoreState } from 'easy-peasy';
import LabelInput from '@/components/common/labelInput'
import { dictTypeEnum, INCALL, ONLINE, ROBOT, HUMAN_CALL, OVERALL_ANSWER_RATE, acceptanceChannelCode, CREATER_DEPARTMENT } from '@/const/config'
import ModalSelect from '@/components/common/modalSelect';
import CommonOrgTree from '@/components/common/commonOrgTree'
const groupNamesList = [
	dictTypeEnum.consultBusinessType,
	dictTypeEnum.memberType,
	dictTypeEnum.productCategory,
	dictTypeEnum.condition_operator_type
]
const Option = Select.Option

// overall_answer_rate:综合接通率;location:地区;business_center:经营中心;vip:VIP等级;business_type:业务类型;user_type:会员类型;cpdl:产品大类;
const paramCodeDefault = [
	{
		value: 'location',
		label: '地区'
	},
	{
		value: 'business_center',
		label: '经营中心'
	},
	{
		value: 'business_type',
		label: '业务类型'
	},
	{
		value: 'user_type',
		label: '会员类型'
	},
	{
		value: 'cpdl',
		label: '产品大类'
	}
]

const overAllIten = {
	value: OVERALL_ANSWER_RATE,
	label: '综合接通率'
}

const vipItem = {
	value: 'vip',
	label: 'VIP等级'
}

// let todoTypePromise = null;
// const getTodoTypeList = () => {
//   if (todoTypePromise) return todoTypePromise;
//   todoTypePromise = new Promise((resolve, reject) => {
// 		CallCenterManageApi.getTodoGetTodoType().then((data) => {
// 			if (data.success) {
// 				const array = data.data?.map((item) => {
// 					return { label: item.name, value: item.code }
// 				})
// 				resolve(array);
// 			} else {
// 				reject();
// 			}
// 		})
//   });
//   return todoTypePromise;
// };

const inputTextMultiple = ['initem', '!initem'] // 符合任一项、不符合任意项
export default function CreateToDoRuleConfig(props) {
	// ruleType不同，显示不同的配置项
	// outerFetch 是否外部获取数据 因为这边有好几个地方都需要用到这个组件，所以下拉列表需要从外部获取，这样只需要获取一次
	const {
		value = [],
		onChange,
		ruleType = INCALL,
		outerFetch = false,
		canAddRule = true,
		canDeleteRule = true,
		key
	} = props
  const userInfo = useStoreState(
    (state) => state.commonUserInfo.userInfo
  );
	const [paramCode, setParamCode] = useState(paramCodeDefault)
	const [consultBusinessList, setConsultBusinessList] = useState([])
	const [memberTypeList, setMemberTypeList] = useState([])
	const [productCategoryList, setProductCategoryList] = useState([]) // 产品大类
	const [operatorType, setOperatorType] = useState([])
	const [areaList, setAreaList] = useState([])
	const [companyList, setCompanyList] = useState([]) // 受理机构
	const [orgList, setOrgList] = useState([]) // 受理部门
	const [businessCenterTypeList, setBusinessCenterTypeList] = useState([]) // gb经营中心合并
	const [todoTypeList, setTodoTypeList] = useState([]); // 待办类型
	const getOptions = async () => {
		let optionsData = props.optionsData
		if (!optionsData && !outerFetch) {
			const data = await CallCenterManageApi.getCommonOptions({
				groupNames: groupNamesList.join(',')
			})
			optionsData = data.data
		}
		let map = {
			[dictTypeEnum.consultBusinessType]: setConsultBusinessList,
			[dictTypeEnum.memberType]: setMemberTypeList,
			[dictTypeEnum.productCategory]: setProductCategoryList,
			[dictTypeEnum.condition_operator_type]: setOperatorType
		}
		if (Array.isArray(optionsData) && optionsData.length) {
			optionsData.forEach((item) => {
				map[item.groupName] &&
					map[item.groupName](
						item.options.map((item) => {
							return { label: item.name, value: item.id }
						})
					)
			})
		}
	}
	const getLocationList = async () => {
		let locationListData = props.locationListData
		// if (!locationListData && !outerFetch) {
		//   const data = await get({ url: Api.commonGetLocationList });
		//   locationListData = data.data;
		// }
		setAreaList(
			locationListData.map((item) => {
				return { label: item.name, value: item.id }
			})
		)
	}
	const changeValue = (index, type, e) => {
		value[index][type] = e
		onChange && onChange([...value])
	}
	const optionsMap = {
		location: areaList, // 地区
		business_center: businessCenterTypeList, // 经营中心
		business_type: consultBusinessList, // 业务类型
		user_type: memberTypeList, // 会员类型
		cpdl: productCategoryList, // 产品大类
		todo_type: todoTypeList, // 待办类型
	}

  const showSelect = (index) => {
    const key = value[index].conditionKey;
    return Object.keys(optionsMap).includes(key)
  }
	const showLabelInput = (index) => {
		const key = value[index].conditionKey;
		return [OVERALL_ANSWER_RATE, 'vip', 'customer_fzgs'].includes(key);
	}
  

	const isMultiple = (index) => {
		return inputTextMultiple.includes(value[index].operator)
	}

	useEffect(() => {
		getLocationList()
	}, [props.locationListData])
	useEffect(() => {
		setBusinessCenterTypeList(
			props.businessCenterListData.map((item) => {
				return { label: item.name, value: item.id }
			})
		)
	}, [props.businessCenterListData])

	useEffect(() => {
		setCompanyList(props.companyListData)
	}, [props.companyListData])
	useEffect(() => {
		setOrgList(props.orgListData)
	}, [props.orgListData])
	useEffect(() => {
		setTodoTypeList(props.todoTypeListData || [])
	}, [props.todoTypeListData])
	useEffect(() => {
		getOptions()
	}, [props.optionsData])
	useEffect(() => {
		if (ruleType === INCALL) {
			setParamCode([...paramCodeDefault, overAllIten])
		} else if (ruleType === ONLINE) {
			setParamCode([...paramCodeDefault, overAllIten, vipItem])
		} else if (ruleType === HUMAN_CALL) {
			setParamCode([
				{
					value: CREATER_DEPARTMENT,
					label: '创建人所属部门'
				},
				{
					value: 'location',
					label: '地区'
				},
        {
          value: 'business_center',
          label: '经营中心'
        },
				{
					value: 'todo_type',
					label: '待办类型'
				},
				{
					value: 'cpdl',
					label: '产品大类'
				},
				// {
				// 	value: 'customer_fzgs',
				// 	label: '客户所属分公司'
				// }
			])
		} else {
			setParamCode([...paramCodeDefault, vipItem])
		}
	}, [ruleType])

	return (
		<div className="rule-config" key={props.id} id={props.id}>
			{canAddRule && (
				<span
					className="add"
					onClick={() => {
						onChange &&
							onChange(
								value.concat([
									{
										paramCode: '',
										operatorType: '',
										targetValue: ''
									}
								])
							)
					}}
				>
					添加条件
				</span>
			)}
			<div className="list">
				{value.map((item, index) => {
					return (
						<div key={index}>
							<div className="item rule-config-item">
								<div>
									<Select
										style={{ width: 200, marginRight: 10 }}
										placeholder="请选择条件"
										onChange={(e) => {
											changeValue(index, 'conditionKey', e)
											changeValue(index, 'operator', undefined)
											changeValue(index, 'conditionValue', undefined)
										}}
                    status={item.conditionKey ? 'success' : ''} // 校验跟form时机不一致
										// className={`rule-config-item-select ${item.conditionKey ? 'success' : ''}`}
										value={item.conditionKey}
										key={key}
									>
										{paramCode.map((code) => {
											return (
												<Option value={code.value} key={code.value}>
													{code.label}
												</Option>
											)
										})}
									</Select>
								</div>
								<div>
									<Select
										style={{ width: 200, marginRight: 10 }}
										placeholder="请选择"
										value={item.operator}
                    status={item.operator ? 'success' : ''}
                    // className={`rule-config-item-select ${item.operator ? 'success' : ''}`}
										onChange={(e) => {
											changeValue(index, 'operator', e)
											changeValue(index, 'conditionValue', undefined)
										}}
										key={key}
									>
										{operatorType.map((type) => {
											return (
												<Option value={type.value} key={type.value}>
													{type.label}
												</Option>
											)
										})}
									</Select>
								</div>
								{showLabelInput(index) && (
									<LabelInput
										value={item.conditionValue}
										className="rule-config-item-select"
										onChange={(e) => {
											changeValue(index, 'conditionValue', e)
										}}
										isMultiple={isMultiple(index)}
										key={key}
									/>
								)}
								{showSelect(index) && (
									<Select
										style={{ flex: 1 }}
										key={key}
										mode={isMultiple(index) ? 'multiple' : ''}
										placeholder="请选择"
                    status={item.conditionValue ? 'success' : ''}
                    // className={`rule-config-item-select ${item.conditionValue ? 'success' : ''}`}
										showSearch
										filterOption={(val, option) => {
											return option?.props?.children?.indexOf(val) > -1
										}}
										value={value[index].conditionValue ? value[index].conditionValue.split(',') : []}
										onChange={(e) => {
											value[index].conditionValue = Array.isArray(e) ? e.join(',') : e
											onChange && onChange([...value])
										}}
									>
										{Array.isArray(optionsMap[value[index].conditionKey]) &&
											optionsMap[value[index].conditionKey].map((item) => {
												return (
													<Option key={item.value} value={item.value}>
														{item.label}
													</Option>
												)
											})}
									</Select>
								)}
                {item.conditionKey === CREATER_DEPARTMENT && (
                  <div style={{
                    flex: 1
                  }}>
                    <CommonOrgTree
                      multiple={isMultiple(index) ? true : false}
                      treeDefaultExpandedKeys={userInfo?.businessCenterCode ? [userInfo?.businessCenterCode] : []}
                      value={value[index].conditionValue ? value[index].conditionValue.split(',') : []}
                      onChange={(e) => {
                        value[index].conditionValue = Array.isArray(e) ? e.join(',') : e
                        onChange && onChange([...value])
                      }}
                    />
                  </div>
                )}
								{canDeleteRule && (
									<div
										className="delete"
										onClick={() => {
											if (value.length <= 1) {
												message.error('至少需要一条配置')
												return
											}
											value.splice(index, 1)
											onChange && onChange([...value])
										}}
									>
										删除
									</div>
								)}
							</div>
							{/* 综合接通率下面有个组选择 */}
							{item.conditionKey === OVERALL_ANSWER_RATE && (
								<div className="list-out-box">
									<ModalSelect
                    showType="box"
                    showBoxClassName={item.conditionConfiguration?.length > 0 ? '' : 'error'}
										value={item.conditionConfiguration ? item.conditionConfiguration.split(',').map(item => Number(item)) : []}
                    selectBtnText={ruleType === INCALL ? '选择电话组' : '选择在线组'}
										groupType={ruleType === INCALL ? acceptanceChannelCode.call : acceptanceChannelCode.online}
										showCompanyDepartFilter
										companyList={companyList}
										orgList={orgList}
                    onChange={(value) => {
                      changeValue(index, 'conditionConfiguration', Array.isArray(value) ? value.join(',') : value)
                    }}
										isNeedStringToNumber={true}
									/>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}
