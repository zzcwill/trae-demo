import React, { useState, useEffect, useRef } from 'react'
import './index.scss'
import { Form, Select, Button, Space, Tabs, Icon, message } from 'dpl2-proxy'
import AppTable from '@/components/common/betterTable'
import { debounce } from 'lodash';
import UserFuzzyQueryDpl2 from '@/components/userFuzzyQueryDpl2'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import downloadFile from '@/utils/downloadFile'
import useParamsList from '@/hooks/useParamsList'
import { dictTypeEnum } from '@/const/config'
import sessionStorageHelper from '@/utils/sessionStorage'

const finishImg = 'https://s.17win.com/snack/134/askone-manage-pc/%E6%89%93%E9%92%A9.png'
// 未完成图片
const unFinishImg = 'https://s.17win.com/snack/134/askone-manage-pc/%E6%89%93%E5%8F%89.png'
const bgImg = 'https://s.17win.com/snack/134/askone-manage-pc/result_bg.png'
const bgRightImg = 'https://s.17win.com/snack/134/askone-manage-pc/result_bg.png'
const popoverProps = {
	placement: 'topLeft',
	overlayClassName: 'data-management-table-popover' // 限制最大宽度，默认\n换行显示
}
// 分为我创建的、我的任务
const tabType = {
	created: 'created',
	myTask: 'myTask'
}
const tabList = [
	{
		label: '我创建的',
		key: tabType.created
	},
	{
		label: '我的任务',
		key: tabType.myTask
	}
]

// 将秒转换成X小时X分钟的格式，不足1小时的不显示小时，不足一分钟显示1分钟
function formatTime(seconds) {
	if (!seconds) {
		return '0分钟' // 如果总秒数为0，直接返回0min
	}
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	// 如果总秒数不足一分钟，直接返回1分钟
	if (seconds < 60) {
		return '0分钟'
	}
	if (hours > 0) {
		return `${hours}小时${minutes}分钟`
	}
	return `${minutes}分钟`
}
export default function TraineeResultList(props) {
	const [businessClassifyList] = useParamsList(
		[dictTypeEnum.ipt_business_classify],
		CallCenterManageApi.getCommonOptions
	)
	const [form] = Form.useForm()
	const [activeKey, setActiveTabKey] = useState(tabType.created)
  const activeKeyRef = useRef(activeKey)
  const [pageInfo, setPageInfo] = useState({
    pageIndex: 1,
    pageSize: 10,
  })
	const [total, setTotal] = useState(0)
	const [list, setList] = useState([])
	// 统计数据
	const [statistics, setStatistics] = useState({})
	const [loading, setLoading] = useState(false)
	const [taskIdList, setTaskIdList] = useState([]) // 任务id列表 -- 需要筛选

	const requestList = async (params) => {
		setLoading(true)
		const userInfo = sessionStorageHelper.getItem('__userInfo')
    const values = form.getFieldsValue();
		let newParams = {}
		if (activeKeyRef.current === tabType.created) {
			newParams = {
        ...pageInfo,
				...values,
        ...params,
				creatorIdList: [userInfo.id],
				traineeIdList: form.getFieldValue('traineeIdList') || [],
        calendarCodeList: [],

			}
		} else {
      newParams = {
        ...pageInfo,
				...values,
        ...params,
				traineeIdList: [userInfo.id],
				creatorIdList: [],
			}
		}
		const res = await CallCenterManageApi.postResultList(newParams)
		if (res.success) {
			const { statisticsResponse, pageResponse = {} } = res.data
			setStatistics(statisticsResponse)
			setList(pageResponse.list)
			setTotal(pageResponse.total)
		}
		setLoading(false)
	}

	const getTaskIdList = async (value) => {
		if (!value) {
			return
		}

    const userInfo = sessionStorageHelper.getItem('__userInfo') || {};
		const paramData = {
			keyword: value.trim(),
      creatorIdList: activeKey === tabType.created ? [userInfo.id] : undefined,
      traineeIdList: activeKey === tabType.myTask? [userInfo.id] : undefined,
      taskStatus: '1',
      pageIndex: 1,
      pageSize: -1,
		}
		try {
      const resData = await CallCenterManageApi.postTaskList(paramData)
      if (resData.success && Array.isArray(resData.data.list) && resData.data.list.length > 0) {
        let dataList = resData.data.list || []
        dataList = dataList?.map((itemQ) => {
          const newItem = {
            name: `[${itemQ.id}]${itemQ.taskName}`,
            value: itemQ.id
          }
          return newItem
        })
        setTaskIdList(dataList)
      } else {
        setTaskIdList([])
      }
		} catch (error) {
			console.error(error)
		}
	}

	const detailClick = (record) => {
		// 跳转到新页签
		window.open(`#/intelligentTraineeManage/traineeChat?id=${record.id}&type=result`, '_blank')
	}
	const downloadClick = async (record) => {
		const res = await CallCenterManageApi.getResultDownload({
			id: record.id
		})
		if (res.success && res.data) {
			downloadFile(res.data)
		} else {
			message.error(res.message)
		}
	}
	const columns = [
		{
			title: '任务ID',
			dataIndex: 'id',
			width: 100,
			ellipsis: true,
			align: 'center'
		},
		{
			title: '任务名称',
			dataIndex: 'taskName',
			width: 200,
			align: 'left',
			headerAlign: 'left',
			ellipsis: true,
			popover: popoverProps
		},
		{
			title: '业务分类',
			dataIndex: 'calendarCodeName',
			width: 100,
			align: 'left',
			headerAlign: 'left',
			ellipsis: true,
			popover: popoverProps
		},
		{
			title: '产品维度',
			dataIndex: 'dimensionCodeName',
			width: 100,
			align: 'left',
			headerAlign: 'left',
			ellipsis: true,
			popover: popoverProps
		},
		{
			title: activeKey === tabType.created ? '受训人' : '创建人',
			dataIndex: activeKey === tabType.created ? 'traineeName' : 'creatorName',
			width: 200,
			ellipsis: true,
			align: 'center',
			popover: popoverProps
		},
		{
			title: '训练时长',
			dataIndex: 'timeConsuming',
			width: 120,
			align: 'center',
			render: (text) => {
				return <span>{formatTime(text) || '--'}</span>
			}
		},
		{
			title: '案例数',
			dataIndex: 'caseNum',
			width: 100,
			align: 'center'
		},
		{
			title: '完成案例数',
			dataIndex: 'finishCaseNum',
			width: 100,
			align: 'center',
			render: (text, record, index) => {
				return <span>{`${text || 0} / ${record.caseNum || 0}` || '- -'}</span>
			}
		},
		{
			title: '平均得分',
			dataIndex: 'avgScore',
			width: 100,
			align: 'center'
		},
		{
			title: '操作',
			dataIndex: 'operate',
			minWidth: 100,
			ellipsis: true,
			align: 'center',
			render: (text, record, index) => {
				return (
					<div className="option-button-list">
						<span
							onClick={() => {
								detailClick(record)
							}}
							className="option-button"
						>
							查看
						</span>
						<span
							onClick={() => {
								downloadClick(record)
							}}
							className="option-button"
						>
							下载
						</span>
					</div>
				)
			}
		}
	]

	const innerColumns = [
		{
			title: 'id',
			dataIndex: 'id1',
			width: 100,
			align: 'left',
			headerAlign: 'left',
			popover: popoverProps
		},
		{
			title: '案例简介',
			dataIndex: 'overview',
			width: 200,
			align: 'left',
			headerAlign: 'left',
			ellipsis: true,
			popover: popoverProps,
			// 文案前面要加序号
			render: (text, record, index) => {
				return <span>{`${index + 1}、 ${text}` || '-'}</span>
			}
		},
		{
			title: '业务分类',
			dataIndex: 'calendarCodeName',
			width: 100,
			align: 'left',
			headerAlign: 'left',
			ellipsis: true
		},
		{
			title: '产品维度',
			dataIndex: 'dimensionCodeName',
			width: 100,
			align: 'left',
			headerAlign: 'left',
			ellipsis: true
			// popover: popoverProps
		},
		{
			title: activeKey === tabType.created ? '受训人' : '创建人',
			dataIndex: activeKey === tabType.created ? 'traineeName' : 'creatorName',
			width: 200,
			ellipsis: true,
			align: 'center',
			popover: popoverProps
		},
		{
			title: '训练时长',
			dataIndex: 'timeConsuming',
			width: 120,
			align: 'center',
			render: (text) => {
				return <span>{formatTime(text) || '--'}</span>
			}
		},
		{
			title: '案例数',
			dataIndex: 'caseNum',
			width: 100,
			align: 'center'
		},
		{
			title: '完成案例数',
			dataIndex: 'status',
			width: 100,
			align: 'center',
			render: (text, record, index) => {
				return (
					<span>
						<img className="finish-img" src={text === '1' ? finishImg : unFinishImg} />
					</span>
				)
			}
		},
		{
			title: '得分',
			dataIndex: 'score',
			width: 100,
			align: 'center',
			render: (text, record, index) => {
				return (
					<span>
						{text || '0'}
					</span>
				)
			}
		},
		{
			title: '操作',
			dataIndex: 'operate',
			minWidth: 100,
			ellipsis: true,
			align: 'center'
		}
	]
	const handlerSearchClick = (values) => {
    setPageInfo({
      ...pageInfo,
      pageIndex: 1,
    })
    requestList({
      pageIndex: 1,
    })
	}

	const resetClick = () => {
		form.resetFields()
    setPageInfo({
      pageIndex: 1,
      pageSize: 10,
    })
    requestList({
      pageIndex: 1,
      pageSize: 10,
    })
	}

	useEffect(() => {
		requestList()
	}, [])
	return (
		<div className="app-bg-box trainee-result-list">
			<Tabs
				className="trainee-result-list-tabs"
				defaultActiveKey={activeKey}
				items={tabList}
				onChange={(key) => {
          form.resetFields()
          activeKeyRef.current = key
					setActiveTabKey(key)
          setTaskIdList([])

          setPageInfo({
            ...pageInfo,
            pageIndex: 1,
          })
          requestList({
            pageIndex: 1,
          })

				}}
			/>
			<div className="app-search-box">
				<Form form={form} onFinish={handlerSearchClick} layout="inline" initialValues={{}}>
					<Form.Item label="任务名称：" name="taskIdList">
						<Select
							showSearch
							allowClear
							placeholder="请选择或输入任务名称"
							style={{ width: '240px' }}
							wait={200}
							mode="multiple"
							notFoundContent="暂无数据"
							virtual
							filterOption={() => true}
							onSearch={debounce(getTaskIdList, 600)}
						>
							{taskIdList.map((itemK) => {
								return (
									<Select.Option key={itemK.value} value={itemK.value}>
										{itemK.name}
									</Select.Option>
								)
							})}
						</Select>
						{/* <TaskSelectDpl2
							showSearch
							allowClear
							placeholder="请选择"
							style={{ width: '240px' }}
							wait={200}
							mode="multiple"
							notFoundContent="暂无数据"
							virtual
							filterOption={() => true}
						/> */}
					</Form.Item>
					{activeKey === tabType.created && (
						<Form.Item label="受训人：" name="traineeIdList">
							<UserFuzzyQueryDpl2
								showSearch
								allowClear
								placeholder="请选择或输入受训人"
								style={{ width: '240px' }}
								wait={200}
								mode="multiple"
								notFoundContent="暂无数据"
								virtual
								filterOption={() => true}
							/>
						</Form.Item>
					)}
					{activeKey === tabType.myTask && (
						<Form.Item label="业务分类" name="calendarCodeList">
							<Select
								virtual
								mode="multiple"
								allowClear
								showSearch
								placeholder="请选择"
								optionFilterProp="children"
								style={{ width: 200 }}
							>
								{businessClassifyList?.map((item) => (
									<Select.Option key={item.value} value={item.value}>
										{item.label}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					)}
					<Space style={{ marginBottom: 10 }}>
						<Button type="primary" htmlType="submit">
							查询
						</Button>
						<Button onClick={resetClick}>重置</Button>
					</Space>
				</Form>
			</div>
			<div className="statistics-view">
				<div className="left-view">
					<div className="value">
						<span className="score">{statistics.avgScore || '0'}</span>分
					</div>
					<div className="label">综合得分</div>
				</div>
				<div className="right-view">
					<div className="label margin-20">
						数据样本量：共<span className="orange ">{statistics.taskNum || '0'}</span>个任务，
						<span className="orange">{statistics.caseNum || '0'}</span>个案例
					</div>
					<div className="label">
						任务平均耗时：<span className="orange">{formatTime(statistics.taskAvgTime) || '0'}</span> ，案例平均耗时：
						<span className="orange">{formatTime(statistics.caseAvgTime) || '0'}</span>
					</div>
				</div>
				{/* 右侧加一个背景图片 */}
				{/* <img className="bg-img" src={bgImg} /> */}
			</div>
			<div className="app-table-box">
				<AppTable
					pagination={{
						current: pageInfo.pageIndex,
						pageSize: pageInfo.pageSize,
						total: total,
						onPageChange: (pageIndex, pageSize) => {
              setPageInfo({
                pageIndex,
                pageSize,
              })
							requestList({
								pageIndex,
								pageSize,
							})
						}
					}}
					columns={columns}
					dataSource={list}
					rowKey="id"
          bordered={false}
					expandable={{
						// defaultExpandAllRows: true,
						// 所有行都允许展开
						rowExpandable: (record) => {
							return true
						},
						// expandedRowKeys,
						expandedRowClassName: (record, index) => {
							return 'expanded-row'
						},
						expandIcon: (props) => {
							return (
								<span style={{ display: 'block', lineHeight: '14px' }}>
									{props.expanded ? <Icon type="down" /> : <Icon type="right" />}
								</span>
							)
						},
						expandedRowRender: (record) => {
							return (
								<AppTable
									rowKey="id"
									pagination={false}
									dataSource={record.caseList}
									columns={innerColumns.map((n) => ({
										...n,
										onCell: () => {
											return {
												style: { background: '#f0f0f0', borderRightColor: 'transparent' }
											}
										},
										onHeaderCell: () => {
											return {
												style: { display: 'none' }
											}
										}
									}))}
									style={{ margin: '-1px -1px 0 -1px ' }}
								/>
							)
						},
						onExpand: (expanded, record) => {
							console.log('onExpand', expanded, record)
						},
						onExpandedRowsChange: (expandedRows) => {
							console.log('onExpandedRowsChange', expandedRows)
							// setExpandedRowKeys(expandedRows)
						}
					}}
				/>
			</div>
		</div>
	)
}
