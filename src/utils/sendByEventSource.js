/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-04-18 11:11:52
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-04-22 15:13:42
 * @FilePath: /askone-manage-pc/src/utils/sendByEventSource.js
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
// 发起eventSource的长连接事件
const SendByEventSource = ({ apiUrl, onMessage, onComplete, onError }) => {
	const env = process.env.PHOENIX_BUILD_ENV
	// 创建 EventSource 对象连接服务器
	const sourceLink = new EventSource(apiUrl)

	// 连接成功后会触发 open 事件
	sourceLink.addEventListener(
		'open',
		() => {
			console.info('sourceLink_connected')
		},
		false
	)

	// 服务器发送信息到客户端时，如果没有 event 字段，默认会触发 message 事件
	sourceLink.addEventListener(
		'message',
		(e) => {
			let messageData = {}
			let { data } = e
			if (typeof data === 'string') {
				// data = data.replace(/\n/g, '');
				data = JSON.parse(data)
				messageData = {
					data
				}
			}
			onMessage({
				messageData,
				sourceLink
			})
		},
		false
	)

	// eslint-disable-next-line no-unused-vars
	sourceLink.addEventListener(
		'complete',
		(e) => {
			console.info('sourceLink_complete')
			onComplete && onComplete(sourceLink)
			sourceLink.close()
		},
		false
	)

	// 连接异常时会触发 error 事件并自动重连
	sourceLink.addEventListener(
		'error',
		(e) => {
			console.info('sourceLink_error')

			let messageData = {}
			let { data } = e
			if (typeof data === 'string') {
				// data = data.replace(/\n/g, '');
				data = JSON.parse(data)
				messageData = {
					data
				}
			}
			onError &&
				onError({
					messageData,
					sourceLink
				})
			// if (e?.target?.readyState === EventSource.CLOSED) {
			//   console.log('Disconnected');
			// } else if (e.target?.readyState === EventSource.CONNECTING) {
			//   console.log('Connecting...');
			// }

			// this.sendTrack('财税智能助理-出错埋点', {
			//   tip: '获取答案异常',
			// })
			// 需要手动关闭链接
			sourceLink.close()
		},
		false
	)

	// 自定义事件
	sourceLink.addEventListener(
		'close',
		(event) => {
			// close方法用于关闭连接。
			sourceLink.close()
			console.log('close', event)
		},
		false
	)

	return sourceLink
}

export default SendByEventSource
