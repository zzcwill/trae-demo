/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-11-12 14:12:40
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-12-23 14:56:20
 * @FilePath: /askone-manage-pc/src/components/consultRecordList/index.js
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react'
import Cookies from 'js-cookie'
import AppTable from '@/components/common/betterTable'
import CallCenterWebApi from '@/requestApi/callcenterweb/api'
import { ONLINE, INCALL, EXPERT } from '@/const/config'
import { loadGalaxyConfig } from '@/utils'
import moment from 'moment'
import { Popover } from 'dpl2-proxy'
import '@/assets/styles/global.scss'

const defaultPageInfo = {
	pageIndex: 1,
	pageSize: 10
}

const CONSULT_CONTENT = 'consultContent'
function getOperationActionFollowRecordText(recordList) {
	if (!recordList || recordList.length === 0) {
		return '/'
	}
	// 拼接方式【运营动作1名称】：【事项1名称】、【事项2名称】，【跟进内容】
	const recordListText = recordList.map((item) => {
		let text = item.actionName
		let matterText = ''
		if (item.matterList && item.matterList.length > 0) {
			matterText = item.matterList.map((matter) => matter.name).join('、')
		}
		if (matterText || item.followContent) {
			if (matterText && item.followContent) {
				// 事项和跟进内容都有中间加逗号
				text += `：${matterText}，${item.followContent}`
			} else {
				text += `：${matterText || item.followContent || ''}`
			}
		}

		return text || '/'
	})
	return recordListText.join('\n')
}
function getConsultRecordResListText(consultRecord) {
	// 组装格式： 用户问题：【问题】\n 服务记录：【服务记录】
	let content = ''
	if (consultRecord?.questionList?.length > 0) {
		let questionText = '用户问题：'
		consultRecord.questionList.forEach((question, index) => {
			if (question) {
				questionText += `${index + 1}、${question}；`
			}
		})
		content += questionText
	}
	if (consultRecord?.content) {
		content += `\n服务记录：【${consultRecord.content}】`
	}
	return content
}
function ConsultRecordList(props = {}, ref) {
	const { token = Cookies.get('sso-epctoken'), pageInfo = defaultPageInfo, paramsExtra = {}, tableProps = {}, detailClick } = props

	const detailClickHandler = async (key, record) => {
		if (key === CONSULT_CONTENT) {
			// 加载配置
			const galaxyConfig = await loadGalaxyConfig()
      const isInBiz = location.host.indexOf('17win.com') >= 0;
			window.open(`${isInBiz ? galaxyConfig?.outerConsultChatUrl : galaxyConfig?.consultChatUrl}?msgId=${record.recordId}&sso-epctoken=${token}`)
		}
	}
	const [columns, setColums] = useState([
		{
			title: '咨询场景',
			dataIndex: 'consultScene',
			minWidth: 100,
			align: 'center'
		}
	]) // 不然loading的时候样式顶部不显示样式会出问题
	const [list, setList] = useState([])
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState(false)
	const [params, setParams] = useState(pageInfo)

	const getList = async (params) => {
		setLoading(true)
		const res = await CallCenterWebApi.getRecordList({
			...params,
			...paramsExtra
		})
		setLoading(false)
		if (res.success) {
			const { recordList, configColumn } = res.data
			const newConfigColumn = configColumn ? JSON.parse(configColumn) : []
			setList(recordList.list)
			setTotal(recordList.total)
			if (newConfigColumn && newConfigColumn.length > 0) {
				const customColumnDict = {
					consultTime: {
						render: (text, record) => {
							// 日期格式化到YYYY-MM-DD  HH:MM不要秒
							const formatDate = text ? moment(text).format('YYYY-MM-DD HH:mm') : ''
							return <span>{formatDate || '/'}</span>
						}
					},
					consultUserName: {
						render: (text, record) => {
							return (
								<div>
									<div>{record.consultUserName || '--'}</div>
									<div>{record.mobile || '--'}</div>
								</div>
							)
						}
					},
					operationActionFollowRecordList: {
						align: 'left',
						render: (text, record, index) => {
							const formatText = getOperationActionFollowRecordText(record.operationActionFollowRecordList)
							return (
								<Popover
									placement="topRight"
									content={formatText || '/'}
									overlayClassName="data-management-table-popover"
									arrowPointAtCenter={true}
								>
									<p className="limit-three" style={{ whiteSpace: 'pre-wrap' }}>
										{formatText || '/'}
									</p>
								</Popover>
							)
						}
					},
					consultRecord: {
						minWidth: 185,
						// align: 'left',
						// headerAlign: 'left',
						render: (text, record, index) => {
							let expertConsultContent = ''
							if (record.dataSource === EXPERT) {
								expertConsultContent = getConsultRecordResListText(record.consultRecord)
							}
							return (
								<>
									{record.dataSource === ONLINE && (
										<div className="option-button-list" style={{ textAlign: 'center' }}>
											<span
												onClick={() => {
													if (detailClick && typeof detailClick === 'function') {
														detailClick(CONSULT_CONTENT, record)
													} else {
														detailClickHandler(CONSULT_CONTENT, record)
													}
												}}
												className="option-button"
											>
												查看内容
											</span>
										</div>
									)}
									{record.dataSource === INCALL && '/'}
									{record.dataSource === EXPERT && (
										<Popover
											placement="topRight"
											content={expertConsultContent || '/'}
											overlayClassName="data-management-table-popover"
											arrowPointAtCenter={true}
										>
											<p className="limit-three" style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}>
												{expertConsultContent || '/'}
											</p>
										</Popover>
									)}
								</>
							)
						}
					}
				}
				const columns = newConfigColumn.map((item) => {
					const customItem = customColumnDict[item.dataIndex] || {}
					return {
						...item, // title, dataIndex, width
						render: (text, record) => {
							return <span>{text || '/'}</span>
						},
						...customItem
					}
				})

				setColums(columns)
			}
		}
	}
	useEffect(() => {
		getList(params)
	}, [params, JSON.stringify(paramsExtra)])

	useImperativeHandle(ref, () => {
		return {
			getParams: () => {
				return params
			},
			changeParams: (params) => {
				setParams(params)
			},
			refreshList: (outParams) => {
				getList({
					...params,
					...outParams
				})
			}
		}
	})

	return (
		<AppTable
			loading={loading}
			pagination={{
				current: params.pageIndex,
				pageSize: params.pageSize,
				total: total,
				onPageChange: (pageIndex, pageSize) => {
					setParams({
						...params,
						pageIndex,
						pageSize
					})
				}
			}}
			columns={columns}
			dataSource={list}
			rowKey="id"
      // scroll={{ maxHeight: '1000vh' }} // 这边为了处理横向滚动条不出现
			{...tableProps}
		/>
	)
}

export default forwardRef(ConsultRecordList)
