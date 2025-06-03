/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-04-14 15:06:33
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-04-27 16:15:27
 * @FilePath: /askone-manage-pc/src/pages/intelligentTraineeManage/traineeChat/index.js
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Modal, message } from "dpl2-proxy"
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import WaitLoading from '@/components/waitLoading'
import { DialogueEventType, ChatMsgDirection, ChatStatus, TaskStatus } from '@/const/index'
import classNames from 'classnames'
import debounce from "lodash/debounce";
import qs from 'qs'
import './index.scss'
import VerticalTabs from './components/VerticalTabs'
import SendRecommendTextArea from './components/sendRecommendTextArea'
import useChatData from './hooks/useChatData'

const stopImg = 'https://s.17win.com/snack/134/askone-manage-pc/%E7%BB%93%E6%9D%9F.png'
const nextImg = 'https://s.17win.com/snack/134/askone-manage-pc/%E4%B8%8B%E4%B8%80%E9%A2%98.svg'
const nextGrayImg = 'https://s.17win.com/snack/134/askone-manage-pc/%E4%B8%8B%E4%B8%80%E9%A2%98-%E7%BD%AE%E7%81%B0.svg'
const evaluateImg =
	'https://s.17win.com/snack/134/askone-manage-pc/%E4%B8%8B%E4%B8%80%E9%A2%98.png'
const evaluateGrayImg =
	'https://s.17win.com/snack/134/askone-manage-pc/%E8%AF%84%E4%BB%B7%E5%BD%93%E5%89%8D%E6%A1%88%E4%BE%8B.svg'

function getFinishCaseIndex(caseList = []) {
  const finishList = caseList.filter((item) => [TaskStatus.finish, TaskStatus.processing].includes(item.status))
	return finishList?.length
}

// 将秒格式化成时分秒00:00:00的形式，然后没有时的时候只显示分秒
function formatTime(seconds) {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const secondsLeft = seconds % 60
	const formattedHours = hours < 10 ? `0${hours}` : hours
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
	const formattedSeconds = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
	if (hours > 0) {
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
	}
	return `${formattedMinutes}:${formattedSeconds}`
}

export default function TraineeChat() {
	// 获取url中的id
	const query = useMemo(() => {
		const searchParams = qs.parse(window.location.href.split("?")[1]) || {};
		return searchParams;
	}, [])
	const {
		activeIndex,
		setActiveIndex,
		task,
		caseList = [],
		currentCase = {},
    currentTimeConsuming,
		chatList = [],
		answerLoading,
		welcomeInfo,
		insertMessage,
		requestSSEAnswer,
    answerOutputingCountRef,
    changeToNextCase
	} = useChatData({ id: query.id })

	const [sendKeyword, setSendKeyword] = useState('') // 输入框关键字
	const chatRef = useRef(null) // 聊天框ref

	const handleTabChange = useCallback((value) => {
		setActiveIndex(value)
	}, [])

	const chatScrollToBottom = useCallback(() => {
		// 将聊天框滚动到底部
		chatRef.current?.scrollTo({
			top: chatRef.current.scrollHeight,
			behavior: 'smooth'
		})
	}, [chatRef.current])
	const sendClick = debounce(async (params) => {
		if (params.eventType === DialogueEventType.dialogue) {
			setSendKeyword('')
		}
		const evaluationText = welcomeInfo.evaluationFixedContent || '评价当前案例'
    if (params.question.includes(evaluationText)) { // 假如输入的内容包含评价当前案例，那么就将eventType设置为evaluation
      params.eventType = DialogueEventType.evaluation
    }
		insertMessage({
			eventType: params.eventType,
			msgContent: params.question
		})
		requestSSEAnswer({
			dialogueEvent: params.eventType || DialogueEventType.dialogue,
			content: params.question,
			traineeTaskCaseId: currentCase.id
		})
	}, 200)

	const contentBtnClick = (e, eventType) => {
		// 假如点击的父试图元素className包含btn-disabled，那么就不执行下面的代码
		if (e.target.parentElement.className.includes('btn-disabled')) {
			return
		}
		if (eventType === 'next') {
			console.log('下一题', currentCase)
      // 判断当前案例是否完成，未完成提示
      if (currentCase.status!== TaskStatus.finish) {
        Modal.feedback({
          title: '请先评价后再进入下一题',
          icon: 'warning',
          content: '您尚未完成当前案例评分，请点击【评价当前案例】按钮完成评价后，再点击下一题进行对练',
          okText: '我知道了',
          // onOk: () => {
          // 	contentBtnClick(e, 'evaluation')
          // }
        })   
        return
      }
      changeToNextCase()
		} else if (eventType === 'evaluation') {
			sendClick({
				eventType: DialogueEventType.evaluation,
				question: welcomeInfo.evaluationFixedContent || '评价当前案例'
			})
		}
	}

  const stopClick = () => {
    // 完成之后的跳转
    const finishSkip = () => {
      setTimeout(() => {
        if (query.type === 'task') {
          window.location.hash = '/intelligentTraineeManage/traineeTaskList'   
        } else {
          window.close()
        }
      }, 500);
    }
    // 判断当前任务是否已经完成或者所有案例未开始，假如完成就将当前页面切换到
    const allCaseUnStart = caseList.every((item) => item.status === TaskStatus.notStart)
    const allCaseFinish = caseList.every((item) => item.status === TaskStatus.finish)
    if (task.status === TaskStatus.finish || allCaseUnStart || allCaseFinish) {
      finishSkip()
      return
    }
    // 弹框提示
    Modal.confirm({
      title: '确认是否退出本次任务训练',
      content: '你还未完成所有案例训练，退出后将不能再进行二次训练',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // 调用接口停止任务
        CallCenterManageApi.getTaskStop({
          id: query.id
        }).then((res) => {
          if (res.success) {
            message.success('操作成功')
            finishSkip()
          } else {
            message.error(res.message)
          }
        })
      }
    })
  }
	useEffect(() => {
		chatScrollToBottom()
	}, [chatList?.length, answerLoading, answerOutputingCountRef.current])
  // console.log('chatList', chatList);
  
  useEffect(() => {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('用户切屏或切换到其他标签页');
      } else {
        console.log('用户回到当前页面');
      }
    });
  }, [])
	return (
		<div className="trainee-chat-page">
			<div className="trainee-left-view">
				<VerticalTabs
					disabled={answerLoading}
					task={task}
					caseList={caseList}
					value={activeIndex}
					onChange={handleTabChange}
				/>
			</div>
			<div className="trainee-right-container">
				<div className="trainee-right-view">
					<div className="trainee-right-view-header">
						<div className="title-view">
							<img
								className="logo-img"
								src="https://s.17win.com/snack/134/yqconsult-web-pc/assistant_logo_%20transparency.png"
							/>
							<div className="left-title">智能 AI 财税陪练助理</div>
						</div>
						{/* 当前已完成评价置灰 */}
						<div className="operate-view">
              <div className="task-duration">当前案例训练时长：{formatTime(currentTimeConsuming)}</div>
							<div className="schedule">
								训练进度 <span className="orange">{getFinishCaseIndex(caseList) || 0}</span>/
								{caseList.length || 0}
							</div>
							<div
								className={classNames('btn-view', {
									'btn-disabled': answerLoading || !currentCase?.id || currentCase.status !== TaskStatus.processing
								})}
								onClick={(e) => contentBtnClick(e, 'evaluation')}
							>
								<img
									className="evaluate-img"
									src={answerLoading || !currentCase?.id || currentCase.status !== TaskStatus.processing ? evaluateGrayImg : evaluateImg}
								/>
								<span className="btn-text">评价当前案例</span>
							</div>
							{/* 当前任务已经完成下一题置灰 */}
							<div
								className={classNames('btn-view', {
									'btn-disabled':
										answerLoading || task.status === TaskStatus.finish || currentCase.status === TaskStatus.notStart || caseList[activeIndex + 1]?.status !== TaskStatus.notStart
								})}
								onClick={(e) => contentBtnClick(e, 'next')}
							>
								<img
									className="next-img"
									src={
										answerLoading || task.status === TaskStatus.finish || currentCase.status === TaskStatus.notStart || caseList[activeIndex + 1]?.status !== TaskStatus.notStart
											? nextGrayImg
											: nextImg
									}
								/>
								<span className="btn-text">下一题</span>
							</div>
						</div>
            <div className="btn-view stop-btn" onClick={stopClick}>
              <img className="stop-img" src={stopImg} />
              <span className="btn-text">结束对练</span>
            </div>
					</div>
					<div className="trainee-right-chat-view" ref={chatRef}>
						{activeIndex === 0 && welcomeInfo?.welcome && (
							<div className="chat-item left-item">
								<div className="common-item">
									<div className="chat-content">{welcomeInfo.welcome}</div>
									<div className="chat-btn-view">
										<div
											className={classNames('chat-btn', { 'btn-disabled': currentCase.status !== TaskStatus.notStart })}
											onClick={() =>
												sendClick({
													eventType: DialogueEventType.start,
													question: welcomeInfo.startFixedContent || '开始对练'
												})
											}
										>
											开始对练
										</div>
									</div>
								</div>
							</div>
						)}
						{chatList.map((item, index) => (
							<div
								key={item.msgId}
								className={classNames('chat-item', {
									'left-item': item.msgDirection === ChatMsgDirection.assistant_to_user,
									'right-item': item.msgDirection === ChatMsgDirection.user_to_assistant
								})}
							>
								<div className="common-item">
									{item.status === ChatStatus.loading && <WaitLoading loadingText={item.loadingText} />}
									{item.status !== ChatStatus.loading && (
										<>
											<div className="chat-content">{item.msgContent}</div>
											{item.btnText && (
												<div className="chat-btn-view">
													<div
														className={classNames('chat-btn', {
															'btn-disabled':
																item.btnEventType === 'next'
																	? task.status === TaskStatus.finish
																	: currentCase.status !== TaskStatus.notStart
														})}
														onClick={(e) => contentBtnClick(e, item.btnEventType)}
													>
														{item.btnText}
													</div>
												</div>
											)}
										</>
									)}
								</div>
							</div>
						))}
					</div>
					{[TaskStatus.notStart, TaskStatus.processing].includes(currentCase.status) && (
            <div className="text-area-container">
              <SendRecommendTextArea
                disabled={answerLoading || currentCase.status === TaskStatus.notStart}
                value={sendKeyword}
                onChange={setSendKeyword}
                onClick={sendClick}
              />
            </div>
					)}
				</div>
			</div>
		</div>
	)
}
