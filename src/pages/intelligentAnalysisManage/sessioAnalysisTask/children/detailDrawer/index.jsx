/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-03-01 19:11:50
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-12-18 18:35:58
 * @FilePath: /askone-manage-pc/src/pages/intelligentAnalysisManage/sessioAnalysisTask/children/detailDrawer/index.jsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState, useRef } from 'react'
import { Drawer, Tabs, Popover } from 'dpl2-proxy'
import { Alert } from 'dpl-react'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import AppTable from '@/components/common/betterTable'
import './index.scss'
import { makeUUID } from '@/utils'

function getDiyItemNums(taskTable) {
  if (taskTable.length > 0) {
    const taskConfig = taskTable[0]
    return (
      <div>
        {taskConfig.analysisItemSite}：
        <br />
        [{taskConfig.operator}]{taskConfig.analysisItemValue}的会话数
      </div>
    )
  }
  return '--'

}
const TabPane = Tabs.TabPane
function getTaskExecuteEnStatus(status) {
	const dict = {
		waiting_execute: {
			name: '待执行',
			className: 'gray-status'
		},
		executing: {
			name: '执行中',
			className: 'blue-status'
		},
		execute_failure: {
			name: '执行中断',
			className: 'orange-status'
		},
		execute_cancel: {
			name: '执行取消',
			className: 'orange-status'
		},
		execute_finish: {
			name: '执行完成',
			className: 'green-status'
		},
		execute_finish_part: {
			name: '部分完成',
			className: 'green-status'
		}
	}
	return (
		dict[status] || {
			name: '--',
			className: 'gray-status'
		}
	)
}

function DetailDrawer(props) {
	const { open, detail, onOpenChange } = props
	const [tabKey, setTabKey] = useState('1')
	const [showCollect, setShowCollect] = useState(false)
	const [summaryData, setSummaryData] = useState({})
	const [taskTable, setTaskTable] = useState([]) // 按任务查看汇总结果
	const [agentTable, setAgentTable] = useState([]) // 按员工查看汇总结果
  // 坐席名称、分析会话数、质检结果汇总：[等于]合格的会话数、会话占比、汇总情况
  const agentColumns = [
		{
			title: '坐席名称',
			dataIndex: 'agentName',
			minWidth: 100,
			align: 'left',
			headerAlign: 'left'
		},
		{
			title: '分析会话数',
			dataIndex: 'msgNums',
			minWidth: 100,
			align: 'left',
			headerAlign: 'left'
		},
		{
			title: getDiyItemNums(taskTable),
			dataIndex: 'diyItemNums', // 取taskTable第一条的数据来显示
			minWidth: 100,
			align: 'left',
			headerAlign: 'left'
		},
		{
			title: '会话占比',
			dataIndex: 'percent',
			width: 100,
			align: 'left',
			headerAlign: 'left',
			render: (text, record) => {
				return <span>{`${text || '0'}%`}</span>
			}
		},
		{
			title: '汇总情况',
			dataIndex: 'operate',
			width: 100,
			align: 'center',
			render: (text, record) => {
				return (
					<Popover
						trigger={'click'}
						padding="large"
            placement="right"
						overlayClassName="table-popover"
						content={popContent}
            // hiddenTriangle
					>
						<span className="blue-btn" onClick={() => detailClick(record)}>详情</span>
					</Popover>
				)
			}
		}
	];
	const popDictRef = useRef({}) // 弹窗字典缓存，按taskId_agentId缓存, 没有就请求之后缓存
  const [popTableData, setPopTableData] = useState([]) // 弹窗表格数据
  
	const drawerClose = () => {
		setTabKey('1')
		setShowCollect(false)
	}
	// 请求分析数据
	const requestAnalysisData = () => {
		CallCenterManageApi.getSummaryMsgId({
			taskId: detail.id
		}).then((res) => {
			console.log('res', res)
			if (res.success) {
				setSummaryData(res.data)
			}
		})
		CallCenterManageApi.getAnalysisItem({
			taskId: detail.id
		}).then((res) => {
			console.log('res', res)
			if (res.success) {
        // 添加id 
        const newArray = res.data.map(item => { return { ...item, id: makeUUID() } })
				setTaskTable(newArray)
			}
		})
		CallCenterManageApi.getAnalysisAgent({
			taskId: detail.id
		}).then((res) => {
			console.log('res', res)
			if (res.success) {
				setAgentTable(res.data)
			}
		})
	}

  const requestPopTableData = async (taskId, agentId) => {
    // 优先取缓存
    if (popDictRef.current[`${taskId}_${agentId}`]) {
      return popDictRef.current[`${taskId}_${agentId}`]
    }
    const res = await CallCenterManageApi.getAgentItem({
      taskId,
      agentId
    })
    if (res.success) {
      const newArray = res.data.map(item => { return { ...item, id: makeUUID() } })
      popDictRef.current[`${taskId}_${agentId}`] = newArray
      return res.data
    }
  }

  const detailClick = async (record) => {
    const popData = await requestPopTableData(detail.id, record.agentId);
    setPopTableData(popData || [])
  }
	// 分析项、分析值、会话数、会话占比
	const columns = [
		{
			title: '分析项',
			dataIndex: 'analysisItemSite',
			minWidth: 100,
			align: 'left',
			headerAlign: 'left'
		},
		{
			title: '分析值',
			dataIndex: 'analysisItemValue',
			minWidth: 100,
			align: 'left',
			headerAlign: 'left',
      render: (text, record) => {
				return <span >{record.operator ? `[${record.operator}]` : ''}{text || '0'}</span>
			}
		},
		{
			title: '会话数',
			dataIndex: 'msgNums',
			width: 100,
			align: 'left',
			headerAlign: 'left',
			render: (text, record) => {
				return <span className={`${record.redFlag === 'Y' && 'red'}`}>{text || '0'}</span>
			}
		},
		{
			title: '会话占比',
			dataIndex: 'percent',
			width: 100,
			align: 'left',
			headerAlign: 'left',
			render: (text, record) => {
				// 假如是redFlag是Y的话，就显示红色
				return <span className={`${record.redFlag === 'Y' && 'red'}`}>{`${text || '0'}%`}</span>
			}
		}
	]
  const popContent = (
    <AppTable pagination={false} columns={columns} dataSource={popTableData} rowKey="id" />
  )
	useEffect(() => {
		if (
			detail?.showSummaryInfo === true
		) {
			setShowCollect(true)
			requestAnalysisData()
		} else {
			setShowCollect(false)
		}
	}, [detail])
	return (
		<Drawer
			className="task-detail-drawer"
			open={open}
			showMask={true}
			maskClosable={false}
			width={800}
			title="会话分析任务详情"
			hideHeader
			onOpenChange={(open) => {
				onOpenChange(open)
			}}
			onClose={() => {
				drawerClose()
				onOpenChange(false)
			}}
		>
			<div className="task-detail-content">
				<Tabs defaultActiveKey={tabKey} onChange={setTabKey}>
					<TabPane tab="会话分析任务详情" key="1"></TabPane>
					{showCollect && <TabPane tab="任务汇总结果" key="2"></TabPane>}
				</Tabs>
				{tabKey === '1' && (
					<div className="content-view">
						<div className="task-top-view">
							<div className="task-view">
								<div className="task-title limit-one" title={detail.name}>
									{detail.name}
								</div>
								<div className={`status ${getTaskExecuteEnStatus(detail.taskExecuteEnStatus).className}`}>
									{detail.taskExecuteEnStatusName}
								</div>
							</div>
							<div className="sub-list">
								<div className="sub-text">
									ID：<span className="text limit-one">{detail.id}</span>
								</div>
								<div className="sub-text">
									任务类型：<span className="text limit-one">{detail.taskTypeText || '--'}</span>
								</div>
								<div className="sub-text">
									指定大模型：<span className="text limit-one">{detail.fmttModelEnCode || '--'}</span>
								</div>
								<div className="sub-text">
									调用APPID：<span className="text limit-one">{detail.fmttAppName || '--'}</span>
								</div>
								<div className="sub-text">
									关联方案：
									<span className="text limit-one" title={detail.planName}>
										{detail.planName}
									</span>
								</div>
								<div className="sub-text">
									已分析数量：<span className="text limit-one">{detail.analysisNum || '--'}</span>
								</div>
								<div className="sub-text">
									任务开始时间：<span className="text limit-one">{detail.taskStartTime || '--'}</span>
								</div>
								<div className="sub-text">
									任务结束时间：<span className="text limit-one">{detail.taskEndTime || '--'}</span>
								</div>
								<div className="sub-text">
									创建人：
									<span className="text limit-one" title={detail.creatorName}>
										{detail.creatorName || '--'}
									</span>
								</div>
								<div className="sub-text">
									创建时间：<span className="text limit-one">{detail.createDate || '--'}</span>
								</div>
							</div>
						</div>
						<div className="task-preview-view">
							<h3 className="preview-title">方案内容（提示词）</h3>
							<Alert
								message="温馨提示：仅展示执行任务时的分析方案内容，如后续方案内容发生变更，以【会话分析方案】列表里方案详情为准"
								type="warm"
								showIcon
							/>
							<div className="preview-content whitespace-pre-line">
								<div dangerouslySetInnerHTML={{ __html: detail.planSnapshotPreview }} />
							</div>
						</div>
					</div>
				)}
				{tabKey === '2' && (
					<div className="content-view">
						<div className="top-text">
							本次共需要分析<span className="red">{summaryData.allNums || 0}</span>个会话，分析成功
							<span className="red">{summaryData.successNums || 0}</span>个会话
						</div>
						<div className="top-text">按任务查看汇总结果：</div>
						<AppTable pagination={false} columns={columns} dataSource={taskTable} rowKey="id"/>
						<div className="top-text" style={{ marginTop: 20 }}>
							按员工查看汇总结果：
						</div>
						<AppTable pagination={false} columns={agentColumns} dataSource={agentTable} />
					</div>
				)}
			</div>
		</Drawer>
	)
}

export default DetailDrawer
