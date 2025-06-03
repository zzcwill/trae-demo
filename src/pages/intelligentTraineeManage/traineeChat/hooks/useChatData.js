/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-04-15 16:45:07
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-04-27 15:31:24
 * @FilePath: /askone-manage-pc/src/pages/intelligentTraineeManage/traineeChat/hooks/useChatData.js
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
// 封装一个hooks主要用于会话消息的管理，有insertMessage和updateLastChat等功能
import { useState, useRef, useCallback, useEffect } from 'react'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import { DialogueEventType, ChatMsgDirection, ChatMsgType, ChatStatus, TaskStatus } from '@/const/index'
import { makeUUID, galaxyConfig } from '@/utils'
import SendByEventSource from '@/utils/sendByEventSource'

function formatStatus(status) {
  const statusMap = {
    "message": ChatStatus.outputing,
    'done': ChatStatus.done,
    'error': ChatStatus.error,
  }
	return statusMap[status]
}
/**
 * chatList: 聊天内容列表
 * msgContent: 聊天内容
 * msgId: 消息id
 * msgType: 消息类型
 * eventType: 事件类型
 * msgDirection: 消息方向
 * sendTime: 发送时间
 * status: 消息状态
 * btnText: 按钮文本
 */
const useChatData = ({ id }) => {
	const [activeIndex, setActiveIndex] = useState(0) // 当前选中的案例
	const [chatList, setChatList] = useState([]) // 聊天内容列表
	const chatListRef = useRef([]) // 聊天内容列表
	const lastChatItemRef = useRef(null) // 最后一条聊天内容
	const sourceLinkRef = useRef(null) // eventSource对象
	const [answerLoading, setAnswerLoading] = useState(false) // 答案生成中
	const [task, setTask] = useState({}) // 任务信息
	const [caseList, setCaseList] = useState([]) // 案例列表
	const [currentCase, setCurrentCase] = useState({}) // 当前案例
  const currentCaseRef = useRef({}) // 当前案例
  const [currentTimeConsuming, setCurrenttimeConsuming] = useState(0) // 当前案例的耗时
  const timeConsumingRef = useRef({}) // 记录进行中案例的耗时，key为index，value为耗时
  const timerRef = useRef(null) // 定时器
  const taskLoadingRef = useRef(false) // 任务加载中
  const answerOutputingCountRef = useRef(0) // 答案输出次数 -- 为了处理生成中自动往下
	const [welcomeInfo, setWelcomeInfo] = useState({}) // 欢迎语信息

	const insertMessage = (item) => {
		const newItem = {
			...item,
			eventType: item.eventType || DialogueEventType.dialogue, // 默认为对话事件
			status: item.status || ChatStatus.done, // 默认为成功状态
			sendTime: item.sendTime || new Date(), // 默认为当前时间
			msgDirection: item.msgDirection || ChatMsgDirection.user_to_assistant,
			msgType: item.msgType || ChatMsgType.text,
			msgId: item.msgId || makeUUID()
		}
		lastChatItemRef.current = newItem // 更新lastChatItemRef的data
		chatListRef.current = [...chatListRef.current, newItem] // 更新chatListRef的data
		setChatList(chatListRef.current)
	}

	const updateLastChat = (lastItem) => {
		chatListRef.current[chatListRef.current.length - 1] = lastItem
		setChatList([...chatListRef.current])
	}

	const updateChatStatus = (status, message = '') => {
		lastChatItemRef.current.status = status
		setAnswerLoading(false)
		if (status === ChatStatus.empty) {
			// 如果是done状态但是没有内容，就是空了
			lastChatItemRef.current.msgContent = message || '抱歉，服务器出错，请稍后重新尝试~'
		} else if (status === ChatStatus.error) {
			// this.sendTrack('财税智能助理-出错埋点', {
			//   tip: '请求消息回答出错'
			// });
			lastChatItemRef.current.msgContent = message || '抱歉，服务器出错，请稍后重新尝试~'
		}

		updateLastChat(lastChatItemRef.current)
	}

  const requestMessageList = async (caseId) => {
  	const res = await CallCenterManageApi.getChatMessage({
  		traineeTaskCaseId: caseId
  	});
    // 如果请求的案例id不是当前的案例id，不更新chatList
    if (currentCaseRef.current.id !== caseId) {
      return
    }
  	if (res.success && Array.isArray(res.data) && res.data.length > 0) {
  		chatListRef.current = res.data.map(item => {
  			return {
  				...item,
  				msgDirection: item.msgDirectionEnCode || ChatMsgDirection.user_to_assistant,
  				msgType: item.msgEnType || ChatMsgType.text,
  			}
  		})
  		setChatList(chatListRef.current);
  	}
  }
	/**
	 * @description 通过SSE请求大模型答案,开启的时候会插入一条轮询的消息
	 * @param options
	 * @param errorCallback
	 * @returns
	 */
	const requestSSEAnswer = (params, errorCallback) => {
    console.log('requestSSEAnswer',params);
    answerOutputingCountRef.current = 0
    if (params?.dialogueEvent === DialogueEventType.start) {
      // 修改当前案例的状态、更新caseList
      caseList[activeIndex].status = TaskStatus.processing
      setCaseList([...caseList])
    } else if (params?.dialogueEvent === DialogueEventType.evaluation && timerRef.current) {
      // 停止计时器
      clearInterval(timerRef.current)
      timerRef.current = null
      // 把时间同步到caseList
      caseList[activeIndex].timeConsuming = currentTimeConsuming
      setCaseList([...caseList])
    }

		if (EventSource) {
			insertMessage({
				status: ChatStatus.loading,
        loadingText: '',
				msgContent: '',
				msgType: ChatMsgType.text, // buttonSelect:按钮选择;form:表单;text:文本;markdown:markdown;html:html;
				msgDirection: ChatMsgDirection.assistant_to_user // user_to_assistant:用户发给助手;assistant_to_user:助手发给用户
			})
			setAnswerLoading(true)

			// 埋点
			// this.sendTrack('财税智能助理-开始调用答案接口', {
			//   aiLlmMsgId
			// })

			try {
        // params转换成键值对
        const paramsStr = Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&')
				sourceLinkRef.current = SendByEventSource({
          // 需要跟当前网页请求域名一致不然会被拦截掉
          apiUrl: `/callcentermanage/ipt/trainee/task/case/dialogue?${paramsStr}`,
					// eslint-disable-next-line no-unused-vars
					onMessage: ({ messageData, sourceLink }) => {
						const { data } = messageData
						// 对返回的数据按照卡片类型进行格式化渲染
						const { streamEvent, dialogueEvent, content, msgId } = data
            answerOutputingCountRef.current += 1;
            // streamEvent: 流事件 message:消息 done:完成 error:错误
            // dialogueEvent: 对话事件 start:开始对练 dialogue：正常对话 ，evaluation：评价案例
						// console.log('data.streamEvent', streamEvent, data.msgContent);
            lastChatItemRef.current.dialogueEvent = dialogueEvent
						lastChatItemRef.current.status = formatStatus(streamEvent)
						lastChatItemRef.current.msgId = msgId
            // lastChatItemRef.current.msgType = ChatMsgType.text
            // debugger
            if (content) {
              lastChatItemRef.current.msgContent += content
            }
            updateLastChat(lastChatItemRef.current)
					},
					onComplete: () => {
						updateChatStatus(ChatStatus.done)
            // lastChatItemRef.current?.dialogueEvent === DialogueEventType.evaluation
            if (params?.dialogueEvent === DialogueEventType.evaluation) {
              // 修改当前案例的状态、更新caseList
              caseList[activeIndex].status = TaskStatus.finish
              setCaseList([...caseList])
              // 假如任务一个未完成，就插入一条引导进入下一题的消息
              if (caseList.some(item => item.status !== TaskStatus.finish)) {
                insertMessage({
                  status: ChatStatus.done,
                  msgContent: welcomeInfo.conclusion || '您可以开启下一题的训练了，是否立即开始训练？',
                  msgDirection: ChatMsgDirection.assistant_to_user,
                  msgType: ChatMsgType.text,
                  btnText: '下一题',
                  btnEventType: 'next',
                })
              }
            }
					},
					onError: ({ messageData }) => {
            const { data } = messageData
            updateChatStatus(ChatStatus.error, data?.content || '网络异常，请稍后再试')
						errorCallback && errorCallback(data?.content || '网络异常，请稍后再试', ChatStatus.error)
					}
				})
			} catch (error) {
				updateChatStatus(ChatStatus.error)
				errorCallback && errorCallback('网络异常，请稍后再试', ChatStatus.error)
			}
		} else {
			// this.sendTrack('财税智能助理-出错埋点', {
			// 	id: params.traineeTaskCaseId,
			// 	tip: '浏览器不支持',
			// 	errorMsg: '您的浏览器不支持 SSE，无法使用服务端推送'
			// })
			console.error("Your browser doesn't support SSE")
		}
	}

	const requestTask = useCallback(async () => {
    if (taskLoadingRef.current) {
      return
    }
    taskLoadingRef.current = true
		// 调用接口获取任务信息
		const res = await CallCenterManageApi.getTaskView({
			id
		})
    taskLoadingRef.current = false
		if (res.success) {
			if (res.data.simpleTask?.id && Array.isArray(res.data.traineeTaskCaseList)) {
          const simpleTask = res.data.simpleTask;
          setTask(simpleTask)
  
          if (res.data.traineeTaskCaseList?.length > 0) {
            if (task?.id) {
              // 假如已经请求过了，只更新当前案例信息
              setCurrenttimeConsuming(res.data.traineeTaskCaseList[activeIndex].timeConsuming || 0)
            } else {
              setCaseList(res.data.traineeTaskCaseList)
              // 进行中的要设置到当前案例
              if (res.data.traineeTaskCaseList[simpleTask.caseFinishIndex].status === TaskStatus.processing || simpleTask.status !== TaskStatus.finish) {
                // 把当前案例的状态设置成进行中
                setActiveIndex(simpleTask.caseFinishIndex)
              }
            }
          }
			}
		}
	}, [id, task, activeIndex])
	const requestWelcomeInfo = useCallback(async () => {
		// 调用接口获取欢迎语信息
		const res = await CallCenterManageApi.getTaskWelcome({
			id
		})
		if (res.success) {
			if (res.data) {
				setWelcomeInfo(res.data)
			}
		}
	}, [id])
 
  const changeToNextCase = useCallback(() => {
  	// 清空当前会话区域
    chatListRef.current = []
    setChatList([])

    // 发送下一题的会话请求
    insertMessage({
			eventType: DialogueEventType.start,
			msgContent: welcomeInfo.startFixedContent || '开始对练',
		})

    requestSSEAnswer({
      dialogueEvent: DialogueEventType.start,
      content: welcomeInfo.startFixedContent || '开始对练',
      traineeTaskCaseId: caseList[activeIndex + 1].id
    })
    // 把下一个案例的状态设置成进行中
    setActiveIndex(activeIndex + 1)
    caseList[activeIndex].status = TaskStatus.finish
    caseList[activeIndex + 1].status = TaskStatus.processing
    setCaseList([...caseList])
  }, [activeIndex, caseList, welcomeInfo])
  // 所有案例的状态是已完成或者未完成时，将task的状态设置为已完成
  useEffect(() => {
    if (caseList.length === 0 && task.status !== TaskStatus.finish) {
      const isAllFinish = caseList.every(item => item.status === TaskStatus.finish || item.status === TaskStatus.unFinish)
      if (isAllFinish) {
        setTask({
          ...task,
          status: TaskStatus.finish
        })
      }
    }
  }, [caseList])
	useEffect(() => {
		if (caseList.length > 0) {
      const caseItem = caseList[activeIndex];
      if ([TaskStatus.processing, TaskStatus.finish].includes(caseItem.status) && caseItem.id !== currentCaseRef.current.id) {
        requestMessageList(caseItem.id)
      }
      currentCaseRef.current = caseItem;
			setCurrentCase({
        ...currentCaseRef.current
      })
      setCurrenttimeConsuming(caseList[activeIndex].timeConsuming || 0)
		}
	}, [caseList, activeIndex])

  useEffect(() => {
    if (caseList.length > 0 && caseList[activeIndex]?.status === TaskStatus.processing) {
      requestTask() // 这是为了前后端任务状态、时间同步
    }
  }, [activeIndex])
  useEffect(() => {
    if (currentCase?.status === TaskStatus.processing) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      // 开启定时器，每1秒更新currenttimeConsuming
      timerRef.current = setInterval(() => {
        setCurrenttimeConsuming(prev => prev + 1)
      }, 1000)
    }
    if (timerRef.current && currentCase?.status !== TaskStatus.processing) {
      // 清除定时器
      clearInterval(timerRef.current)
    }
    return () => {
      return () => clearInterval(timerRef.current)
    }
  }, [currentCase])

	useEffect(() => {
		requestTask()
		requestWelcomeInfo()
	}, [])

	return {
		chatList,
		activeIndex,
		setActiveIndex,
		currentCase,
    currentTimeConsuming,
		caseList,
		task,
		welcomeInfo,
		answerLoading,
		insertMessage,
    requestSSEAnswer,
    answerOutputingCountRef,
    changeToNextCase
	}
}

export default useChatData
