import AppTable from '@/components/common/betterTable'
import useGetList from '@/components/common/hooks/useGetList'
import ModalSelect from "@/components/common/modalSelect"
import { acceptanceChannelCode, callcenterEnumOptionType, dictTypeEnum } from '@/const/config'
import useParamsList from '@/hooks/useParamsList'
import { postWithReturn } from '@/request/request'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import OlhelpManageApi from '@/requestApi/yypt-olhelp-manage/api'
import { Button, Form, Input, InputNumber, Modal, Select, Space, message } from 'dpl2-proxy'
import { useEffect, useState } from 'react'
import './index.scss'

export default function CreateTodoRule(props) {
	const [form] = Form.useForm()
	const [
    consultWayList, 
    triggerSceneList, 
    consultBusinessList,
    memberTypeList,
    productCategoryList,
		todoExecutePartyList,
  ] = useParamsList(
		[
      dictTypeEnum.consult_task_rule_way,
      dictTypeEnum.trigger_scene, 
      dictTypeEnum.consultBusinessType,
      dictTypeEnum.memberType,
      dictTypeEnum.productCategory,
			dictTypeEnum.todo_execute_party
    ],
		CallCenterManageApi.getCommonOptions
	)
	
	const [areaList, setAreaList] = useState([])
  const [todoTypeList, setTodoTypeList] = useState([]); // 待办类型
	const [businessCenterTypeList, setBusinessCenterTypeList] = useState([]); // gb经营中心合并
	// 封装的获取列表自定义hooks
	const { params, changeParams, loading, total, list, getList } = useGetList({
		queryFunc: CallCenterManageApi.postConsulttaskrulePageList,
		defaultParam: {},
		isUseQueryString: false,
		isSearchRightNow: true
	})
	
	/**
	 * 获取地区
	 */
	const getAreaList = async () => {
		const res = await OlhelpManageApi.getCommonLocationList()
		if (res.success) {
			const data = res.data
			setAreaList(data)
		} else {
			message.error(res.message)
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

	/**
 * 获取地区
 */
	const getBusinessCenterList = async () => {
		const res = await CallCenterManageApi.getCommonOptions({
			groupNames: [callcenterEnumOptionType.GBusinessCenterType, callcenterEnumOptionType.BAdminCompanyType].join(',')
		})
		if (res.success) {
			const array = res.data || []
			// 将data数组里两项的options合并
			let newArray = []
			array.forEach(item => {
				if (item.options?.length > 0) {
					newArray = newArray.concat(item.options)
				}
			})
			setBusinessCenterTypeList(newArray)
		} else {
			message.error(res.message)
		}
	}
	const editClick = (record, type = 'edit') => {
		let url = "#/servicesManage/onlineServicesSetting/createTodoRule/addTodoRule"
		if (record.id) {
			url += `?id=${record.id}&type=${type}`
		}
		window.open(url);
	}
	const deleteClick = (record) => {
		Modal.confirm({
			title: `确认删除该条规则吗？`,
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				({
					id: record.id,
				})
					postWithReturn({
							options: {
									postFunc: CallCenterManageApi.postConsulttaskruleDeleteTaskRule,
									data: {
											id: record.id,
									}
							},
							successText: `删除成功`,
							onSuccess: () => {
								getList();
							},
					})
			},
	});
	}
	const columns = [
		{
			title: '规则ID',
			dataIndex: 'id',
			width: 100,
			align: 'center'
		},
		{
			title: '规则名称',
			dataIndex: 'ruleName',
			width: 100,
			align: 'center',
		},
		{
			title: '操作',
			width: 100,
			dataIndex: 'operate',
			align: 'right',
			render: (text, record, index) => {
				return (
					<div className="option-button-list">
						<span
							onClick={() => {
								editClick(record)
							}}
							className="option-button"
						>
							修改
						</span>
						<span
							onClick={() => {
								deleteClick(record)
							}}
							className="option-button"
						>
							删除
						</span>
						<span
							onClick={() => {
								editClick(record, 'copy')
							}}
							className="option-button"
						>
							复制
						</span>
					</div>
				)
			}
		},
		{
			title: '服务方式',
			width: 100,
			dataIndex: 'consultWayText',
			align: 'center'
		},
		{
			title: '适用条件',
			minWidth: 200,
			dataIndex: 'conditionInfos',
			align: 'center',
			render(conditionList, b) {
				return (
						<div className="condition-list">
								{Array.isArray(conditionList) &&
										conditionList.map((item) => {
												return (
														<div
																className="condition-list-item"
																key={item.id}
														>{`${item.conditionConfigurationText?.length > 0 ? item.conditionConfigurationText?.length + '个组的' : ''}${item.conditionKeyText}${item.operatorText}：${item.conditionValueText || item.conditionValue}`}</div>
												);
										})}
						</div>
				);
			},
		},
		{
			title: '分配给',
			width: 100,
			dataIndex: 'allotIdText',
			align: 'center'
		},
		{
			title: '待办信息',
			width: 200,
			dataIndex: 'todoContent',
			align: 'center',
			render(todoContent) {
				return (
						<div className="modifier-view">
							<div>待办名称：{todoContent.title}</div>
							<div>待办类型：{todoContent.todoTypeText}</div>
							<div>待办完成时间：{todoContent.finishType === 'minutes' ? `${todoContent.finishValue}分钟内` : `第${todoContent.finishValue}天下班前`}</div>
						</div>
				);
			},
		},
		{
			title: '最后修改人',
			width: 200,
			dataIndex: 'lastModifierName',
			align: 'center',
			render(text, record) {
				return (
						<div className="modifier-view">
							<div>{text}</div>
							<div>{record.modifyTime}</div>
						</div>
				);
			},
		}
	]

	const handlerSearchClick = (values) => {
		changeParams({
			...values,
			pageIndex: 1,
			pageSize: params.pageSize
		})
	}

	const resetClick = () => {
		form.resetFields()
		changeParams({
			pageIndex: 1,
			pageSize: params.pageSize
		})
	}

  useEffect(() => {
    getAreaList();
		getTodoTypeList();
		getBusinessCenterList();
  }, []);
	return (
		<div className="app-bg-box create-todo-rule">
			<div className="app-search-box">
				<Form form={form} onFinish={handlerSearchClick} layout="inline" initialValues={{}}>
					<Form.Item label="服务方式" name="consultWay">
						<Select
							virtual
							mode="multiple"
							allowClear
							showSearch
							placeholder="请选择"
							optionFilterProp="children"
							style={{ width: 200 }}
						>
							{consultWayList?.map((item) => (
								<Select.Option key={item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item label="触发场景" name="triggerScene">
						<Select
							virtual
							mode="multiple"
							allowClear
							showSearch
							placeholder="请选择"
							optionFilterProp="children"
							style={{ width: 200 }}
						>
							{triggerSceneList?.map((item) => (
								<Select.Option key={item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item label="经营中心" name="businessCenter">
						<Select
							virtual
							mode="multiple"
							allowClear
							showSearch
							placeholder="请选择"
							optionFilterProp="children"
							style={{ width: 200 }}
						>
							{businessCenterTypeList?.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item label="地区" name="location">
						<Select
							virtual
							mode="multiple"
							allowClear
							showSearch
							placeholder="请选择"
							optionFilterProp="children"
							style={{ width: 200 }}
						>
							{areaList?.map((item) => (
								<Select.Option key={item.id} value={item.id}>
									{item.name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
          <Form.Item label="业务类型" name="businessType">
						<Select
							virtual
							mode="multiple"
							allowClear
							showSearch
							placeholder="请选择"
							optionFilterProp="children"
							style={{ width: 200 }}
						>
							{consultBusinessList?.map((item) => (
								<Select.Option key={item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
          <Form.Item label="待办执行组" name="allotGroup">
            <ModalSelect
              groupType={acceptanceChannelCode.call}
              showCompanyDepartFilter
							outerFetchCompanyAndOrg={false}
              isNeedStringToNumber={true}
            />
					</Form.Item>
          <Form.Item label="会员类型" name="userType">
						<Select
							virtual
							mode="multiple"
							allowClear
							showSearch
							placeholder="请选择"
							optionFilterProp="children"
							style={{ width: 200 }}
						>
							{memberTypeList?.map((item) => (
								<Select.Option key={item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
          <Form.Item label="产品大类" name="cpdl">
						<Select
							virtual
							mode="multiple"
							allowClear
							showSearch
							placeholder="请选择"
							optionFilterProp="children"
							style={{ width: 200 }}
						>
							{productCategoryList?.map((item) => (
								<Select.Option key={item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
          <Form.Item label="VIP等级" name="vip">
						<InputNumber
						/>
					</Form.Item>
					<Form.Item label="规则名称" name="ruleName">
						<Input placeholder="请输入"/>
					</Form.Item>
					<Form.Item label="待办执行方" name="executePartyList">
						<Select
							virtual
							allowClear
							showSearch
							placeholder="请选择"
							optionFilterProp="children"
							style={{ width: 200 }}
						>
							{todoExecutePartyList?.map((item) => (
								<Select.Option key={item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Form.Item label="待办类型" name="todoTypeList">
						<Select
							virtual
							// mode="multiple"
							allowClear
							showSearch
							placeholder="请选择"
							optionFilterProp="children"
							style={{ width: 200 }}
						>
							{todoTypeList?.map((item) => (
								<Select.Option key={item.value} value={item.value}>
									{item.label}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<Space style={{ marginBottom: 10 }}>
						<Button type="primary" htmlType="submit">
							查询
						</Button>
						<Button onClick={resetClick}>重置</Button>
					</Space>
				</Form>
			</div>

			<div className="app-table-box">
				<div className="table-btn">
					<Button
							type="primary"
							onClick={editClick}
					>
						新增
					</Button>
				</div>
				<AppTable
					pagination={{
						current: params.pageIndex,
						pageSize: params.pageSize,
						total: total,
						onPageChange: (pageIndex, pageSize) => {
							changeParams({
								...params,
								pageIndex,
								pageSize
							})
						}
					}}
					columns={columns}
					dataSource={list}
					rowKey="id"
				/>
			</div>
		</div>
	)
}
