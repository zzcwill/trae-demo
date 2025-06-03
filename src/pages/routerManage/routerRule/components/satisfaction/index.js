import React, { useEffect, useState, useRef, useMemo } from 'react'
import './index.scss'
import { uForm } from 'dora'
import { Modal, Switch, message } from 'dpl-react'
import { set } from 'lodash'
import { post, get } from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import { EvaluateType } from './evaluateType'
import FeedbackComponent, { feedbackRulesFunc, submitType } from '@/components/servicesManage/feedback'
import { setDefaultValue, setYNBooleanValue } from '@/utils'

function CustomerSwitch(props) {
	const { value, onChange, ...rest } = props
	return <Switch checked={value} onChange={onChange} {...rest} />
}

const batchOptionList = [
	{ label: '满意度评价', value: 'evaluation' },
	{ label: '解决情况', value: 'solution' },
	{ label: '不满意/未解决信息采集项', value: 'evaluationAndSolutionCollection' },
	{ label: '打分情况', value: 'score' },
	{ label: '自定义问题', value: 'customQuestion' },
	{ label: '评价方式', value: 'feedbackTypeOptionList' }
]
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 16 }
}
const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, createFormActions, FormEffectHooks, FormSlot } = uForm
const { onFieldValueChange$ } = FormEffectHooks
const actions = createFormActions()
export default function Satisfaction(props) {
	const { visible, onOk, onCancel, setLoading, id, idList = [], batchUpdate = false } = props
	const [type, setType] = useState('0') // 0: 全局配置, 1: 差异化配置
	const [fieldMap, setFieldMap] = useState({}) // 选中的项才允许操作
	const fieldMapRef = useRef({})
	const [detail, setDetail] = useState(null)

	const feedbackRef = useRef(null)
	const feedbackDataRef = useRef({})

	const getDetail = async (id) => {
		const data = await get({
			url: Api.routeRuleFeedbackDetail,
			params: { ruleId: id }
		})
		if (data.success && data.data) {
			const indicatorSet = data.data.indicatorSet

			if (!indicatorSet) {
				return
			}

			// setDefaultValue(tempData, 'evaluation.feedbackDefaultOption', '1');
			setDefaultValue(indicatorSet, 'evaluation.userInfoRequired', true)
			setDefaultValue(indicatorSet, 'evaluation.dissatisfiedReasonRequired', true)
			// setDefaultValue(tempData, 'solution.solvedDefaultOption', '1');
			// 采集未解决用户信息
			setDefaultValue(indicatorSet, 'solution.unsolvedUserInfo.userInfoEnable', false)
			setDefaultValue(indicatorSet, 'solution.unsolvedUserInfo.userInfoOptionList', ['0', '1'])
			setDefaultValue(indicatorSet, 'solution.unsolvedUserInfo.userInfoRequired', true)
			setDefaultValue(indicatorSet, 'solution.unsolvedUserInfo.userInfoTip', '')
			// 采集未解决原因
			setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonEnable', false)
			setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonMultipleEnable', true)
			setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonRequired', true)
			setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonTip', '')
			setDefaultValue(indicatorSet, 'solution.unsolvedReason.unsolvedReasonOptionList', [''])

			if (indicatorSet.evaluation) {
				data.data.indicatorSet.evaluation.evaluationOrder = data.data.indicatorSet.evaluation.evaluationOrder || 0
				data.data.indicatorSet.evaluation.dissatisfiedReasonEnable =
					data.data.indicatorSet.evaluation.dissatisfiedReasonEnable === 'Y'
				data.data.indicatorSet.evaluation.dissatisfiedReasonMultipleEnable =
					data.data.indicatorSet.evaluation.dissatisfiedReasonMultipleEnable === 'Y'
				data.data.indicatorSet.evaluation.userInfoEnable = data.data.indicatorSet.evaluation.userInfoEnable === 'Y'
				if (
					!data.data.indicatorSet.evaluation.dissatisfiedReasonOptionList ||
					data.data.indicatorSet.evaluation.dissatisfiedReasonOptionList.length === 0
				) {
					//不满意原因选项初始给个空
					data.data.indicatorSet.evaluation.dissatisfiedReasonOptionList = ['']
				}
				data.data.indicatorSet.evaluation.evaluationEnable = data.data.indicatorSet.evaluation.evaluationEnable === 'Y'

				if (!data.data.indicatorSet.solution.solutionOptionList) {
					data.data.indicatorSet.solution.solutionOptionList = []
				}
				if (!data.data.indicatorSet.solution.solutionOptionConfigList) {
					data.data.indicatorSet.solution.solutionOptionConfigList = []
				}
				if (!data.data.indicatorSet.solution.solutionCollectionOptionList) {
					data.data.indicatorSet.solution.solutionCollectionOptionList = []
				}
			}

			if (indicatorSet.solution) {
				data.data.indicatorSet.solution.solutionOrder = data.data.indicatorSet.solution.solutionOrder || 0
				data.data.indicatorSet.solution.solutionEnable = data.data.indicatorSet.solution.solutionEnable === 'Y'
				data.data.indicatorSet.solution.solutionOptionRequired =
					data.data.indicatorSet.solution.solutionOptionRequired || 'Y'
				data.data.indicatorSet.score.scoreEnable = data.data.indicatorSet.score.scoreEnable === 'Y'
				data.data.indicatorSet.score.scoreOrder = data.data.indicatorSet.score.scoreOrder || 0

				if (!data.data.indicatorSet.solution.solutionOptionList) {
					data.data.indicatorSet.solution.solutionOptionList = []
				}
				if (!data.data.indicatorSet.solution.solutionOptionConfigList) {
					data.data.indicatorSet.solution.solutionOptionConfigList = []
				}
				if (!data.data.indicatorSet.solution.solutionCollectionOptionList) {
					data.data.indicatorSet.solution.solutionCollectionOptionList = []
				}
			}

			const applicationSet = data.data.applicationSet
			let feedbackTypeOptionList = []
			if (applicationSet.feedbackTypeOptionList) {
				feedbackTypeOptionList = applicationSet.feedbackTypeOptionList
			}
			data.data.applicationSet = {
				feedbackTypeOptionList
			}

			const defaultQuestionList = [
				{
					questionTip: '',
					multipleEnable: 'Y',
					solutionOptionRequired: 'N',
					questionOptionList: ['']
				}
			]
			let customQuestion = indicatorSet.customQuestion
			if (customQuestion) {
				customQuestion.customQuestionEnable = customQuestion.customQuestionEnable === 'Y'
				if (!customQuestion.questionList || customQuestion.questionList.length == 0) {
					customQuestion.questionList = defaultQuestionList
				}
			} else {
				customQuestion = {
					//初始值
					customQuestionEnable: false,
					customQuestionOrder: 0,
					displayNum: 1,
					questionList: defaultQuestionList
				}
			}
			data.data.indicatorSet.customQuestion = customQuestion

			// data.data.indicatorSet = {
			//   evaluation: data.data.evaluation,
			//   solution: data.data.solution,
			//   score: data.data.score,
			//   customQuestion
			// };
			// 不满意未解决信息采集项-start
			const initEvaluationAndSolutionCollection = {
				collectionEnable: false,
				order: 0,
				evaluationAndSolutionUserInfoCollection: {
					userInfoEnable: false,
					userInfoOptionList: [],
					userInfoRequired: true,
					userInfoTip: ''
				},
				evaluationAndSolutionReasonCollection: {
					reasonEnable: false,
					reasonMultipleEnable: true,
					reasonRequired: true,
					reasonTip: '',
					reasonOptionList: ['']
				}
			}

			const { evaluationAndSolutionCollection } = data.data.indicatorSet
			if (!evaluationAndSolutionCollection) {
				data.data.indicatorSet.evaluationAndSolutionCollection = initEvaluationAndSolutionCollection
			} else {
				let evaluationAndSolutionUserInfoCollection =
					evaluationAndSolutionCollection.evaluationAndSolutionUserInfoCollection

				if (!evaluationAndSolutionUserInfoCollection) {
					evaluationAndSolutionUserInfoCollection = {
						userInfoEnable: '',
						userInfoOptionList: [],
						userInfoRequired: '',
						userInfoTip: ''
					}
				}

				let evaluationAndSolutionReasonCollection =
					evaluationAndSolutionCollection.evaluationAndSolutionReasonCollection
				if (!evaluationAndSolutionReasonCollection) {
					evaluationAndSolutionReasonCollection = {
						reasonEnable: false,
						reasonMultipleEnable: true,
						reasonRequired: true,
						reasonTip: '',
						reasonOptionList: []
					}
				}

				data.data.indicatorSet.evaluationAndSolutionCollection = {
					collectionEnable: evaluationAndSolutionCollection.collectionEnable === 'Y',
					order: evaluationAndSolutionCollection.order || 0,
					evaluationAndSolutionUserInfoCollection: {
						userInfoEnable: evaluationAndSolutionUserInfoCollection.userInfoEnable === 'Y',
						userInfoOptionList: evaluationAndSolutionUserInfoCollection.userInfoOptionList,
						userInfoRequired: evaluationAndSolutionUserInfoCollection.userInfoRequired !== 'N',
						userInfoTip: evaluationAndSolutionUserInfoCollection.userInfoTip
					},
					evaluationAndSolutionReasonCollection: {
						reasonEnable: evaluationAndSolutionReasonCollection.reasonEnable === 'Y',
						reasonMultipleEnable: evaluationAndSolutionReasonCollection.reasonMultipleEnable !== 'N',
						reasonRequired: evaluationAndSolutionReasonCollection.reasonRequired !== 'N',
						reasonTip: evaluationAndSolutionReasonCollection.reasonTip,
						reasonOptionList:
							evaluationAndSolutionReasonCollection.reasonOptionList &&
							evaluationAndSolutionReasonCollection.reasonOptionList.length === 0
								? ['']
								: evaluationAndSolutionReasonCollection.reasonOptionList
					}
				}
			}
			// 不满意未解决信息采集项-end

			setType(data.data.type)
			console.info('getDetail', data.data)
			setDetail(data.data)
		}
	}

	const initData = async () => {
		const defaultQuestionList = [
			{
				questionTip: '',
				multipleEnable: 'Y',
				solutionOptionRequired: 'N',
				questionOptionList: ['']
			}
		]
		const detail = {
			indicatorSet: {
				evaluation: {
					userInfoEnable: false, // 采集不满意用户信息
					dissatisfiedReasonEnable: false, // 不满意原因
					dissatisfiedReasonMultipleEnable: false, // 不满意原因多选
					dissatisfiedReasonOptionList: [''] // 不满意原因选项
				}, //评价
				solution: {
					solutionEnable: false,
					unsolvedUserInfo: {
						userInfoEnable: false
						// userInfoRequired: true,
						// userInfoOptionList: ['0', '1']
					},
					unsolvedReason: {
						unsolvedReasonEnable: false,
						// unsolvedReasonRequired: true,
						unsolvedReasonMultipleEnable: false,
						unsolvedReasonOptionList: ['']
					}
				}, // 解决情况
				evaluationAndSolutionCollection: {
					// 不满意未解决信息采集项
					collectionEnable: false,
					order: 0,
					evaluationAndSolutionUserInfoCollection: {
						userInfoEnable: false,
						userInfoOptionList: [],
						userInfoRequired: false,
						userInfoTip: ''
					},
					evaluationAndSolutionReasonCollection: {
						reasonEnable: false,
						reasonMultipleEnable: false,
						// reasonRequired: false,
						reasonTip: '',
						reasonOptionList: ['']
					}
				},
				customQuestion: {
					// 自定义问题
					customQuestionEnable: false,
					customQuestionOrder: 0,
					displayNum: 1,
					questionList: defaultQuestionList
				},
				score: {
					scoreEnable: false
				} //评分
			},
			applicationSet: {
				feedbackTypeOptionList: []
			}
		}
		const data = await get({
			url: Api.getRouteRuleOptionConfigList,
			params: {
				optionTypeList: ['feedback', 'solution'].join(',')
			}
		})
		if (data.success && Array.isArray(data.data)) {
			data.data.forEach((option) => {
				if (option.optionType === 'feedback') {
					detail.indicatorSet.evaluation.feedbackOptionConfigList = option.optionConfigList
				} else if (option.optionType === 'solution') {
					detail.indicatorSet.solution.solutionOptionConfigList = option.optionConfigList
				}
			})
		}
		console.log('datail', detail)
		setDetail(detail);
		setType('1'); // 差异化配置
	}
	const dealData = async (values) => {
		const submitPost = async (updateData) => {
			setLoading(true)
			const newRes = await post({
				url: Api.postFeedbackBatchUpdate,
				data: updateData
			})
			setLoading(false)
			if (newRes.success) {
				message.success(`批量更新成功`)
				onOk && onOk()
			} else if (newRes.message) {
				message.error(newRes.message)
			}
		}

		const res = await post({
			url: Api.postCheckGlobalConfig,
			data: {
				ruleIdList: idList,
				checkType: 'feedback'
			}
		})
		if (res.success) {
			const updateData = {
				ruleIdList: idList,
				fieldList: Object.keys(fieldMapRef.current),
				routeRuleFeedback: {
					applicationSet: values.applicationSet,
					indicatorSet: values.indicatorSet
				}
			}
			if (!res.data?.checkSuccess) {
				Modal.confirm({
					title: '有规则使用全局设置，请确认是否继续修改，如果确定以下规则会调整为差异化配置',
					width: 560,
					content: (
						<div
							className="tips-content"
							style={{
								maxHeight: '560px',
								overflowY: 'auto'
							}}
							dangerouslySetInnerHTML={{
								__html: res.data?.failureMsgList.join('，')
							}}
						></div>
					),
					onOk: async () => {
						submitPost(updateData)
					},
					onCancel: () => {}
				})
			} else {
				submitPost(updateData)
			}
		}
	}

	const okHandler = async () => {
		let params = {}
		let values = {}
		if (type == '0') {
			params = {
				ruleId: id,
				type: type
			}
		} else {
			values = await actions.submit()
			values = values.values
			console.info('schemaForm_submit', values)
			if (values.indicatorSet.evaluation) {
				Object.assign(values.indicatorSet.evaluation, feedbackDataRef.current.evaluation)
				values.indicatorSet.evaluation.userInfoEnable = values.indicatorSet.evaluation.userInfoEnable ? 'Y' : 'N'
				values.indicatorSet.evaluation.dissatisfiedReasonEnable = values.indicatorSet.evaluation
					.dissatisfiedReasonEnable
					? 'Y'
					: 'N'
				values.indicatorSet.evaluation.dissatisfiedReasonMultipleEnable = values.indicatorSet.evaluation
					.dissatisfiedReasonMultipleEnable
					? 'Y'
					: 'N'
				values.indicatorSet.evaluation.evaluationEnable = values.indicatorSet.evaluation.evaluationEnable ? 'Y' : 'N'
				values.indicatorSet.evaluation.userInfoOptionList = values.indicatorSet.evaluation.userInfoOptionList
				values.indicatorSet.evaluation.userInfoTip = values.indicatorSet.evaluation.userInfoTip
					? values.indicatorSet.evaluation.userInfoTip.trim()
					: ''
				values.indicatorSet.evaluation.dissatisfiedReasonTip = values.indicatorSet.evaluation.dissatisfiedReasonTip
					? values.indicatorSet.evaluation.dissatisfiedReasonTip.trim()
					: ''
				values.indicatorSet.evaluation.dissatisfiedReasonOptionList = Array.isArray(
					values.indicatorSet.evaluation.dissatisfiedReasonOptionList
				)
					? values.indicatorSet.evaluation.dissatisfiedReasonOptionList.filter((item) => item)
					: []
				values.indicatorSet.evaluation.feedbackDefaultOption = values.indicatorSet.evaluation.feedbackDefaultOption?.[0]
			}
			if (values.indicatorSet.score) {
				Object.assign(values.indicatorSet.score, feedbackDataRef.current.score)
				values.indicatorSet.score.scoreEnable = values.indicatorSet.score.scoreEnable ? 'Y' : 'N'
				values.indicatorSet.score.scoreTip = values.indicatorSet.score.scoreTip
					? values.indicatorSet.score.scoreTip.trim()
					: ''
			}
			if (values.indicatorSet.solution) {
				Object.assign(values.indicatorSet.solution, feedbackDataRef.current.solution)
				values.indicatorSet.solution.solutionEnable = values.indicatorSet.solution.solutionEnable ? 'Y' : 'N'
				values.indicatorSet.solution.solutionTip = values.indicatorSet.solution.solutionTip
					? values.indicatorSet.solution.solutionTip.trim()
					: ''
				values.indicatorSet.solution.solutionOptionYesContent = values.indicatorSet.solution.solutionOptionYesContent
					? values.indicatorSet.solution.solutionOptionYesContent.trim()
					: ''
				values.indicatorSet.solution.solutionOptionNoContent = values.indicatorSet.solution.solutionOptionNoContent
					? values.indicatorSet.solution.solutionOptionNoContent.trim()
					: ''
				values.indicatorSet.solution.solvedDefaultOption = values.indicatorSet.solution.solvedDefaultOption?.[0]
			}
			if (values.indicatorSet.customQuestion) {
				delete feedbackDataRef.current.customQuestion.displayNum
				Object.assign(values.indicatorSet.customQuestion, feedbackDataRef.current.customQuestion)
				values.indicatorSet.customQuestion.customQuestionEnable = values.indicatorSet.customQuestion
					.customQuestionEnable
					? 'Y'
					: 'N'
				if (!values.indicatorSet.customQuestion.customQuestionEnable) {
					values.indicatorSet.customQuestion.questionList = []
				}
			}
			setYNBooleanValue(values.indicatorSet, 'evaluation.userInfoRequired')
			setYNBooleanValue(values.indicatorSet, 'evaluation.dissatisfiedReasonRequired')
			setYNBooleanValue(values.indicatorSet, 'solution.unsolvedUserInfo.userInfoEnable')
			setYNBooleanValue(values.indicatorSet, 'solution.unsolvedUserInfo.userInfoRequired')
			setYNBooleanValue(values.indicatorSet, 'solution.unsolvedReason.unsolvedReasonEnable')
			setYNBooleanValue(values.indicatorSet, 'solution.unsolvedReason.unsolvedReasonMultipleEnable')
			setYNBooleanValue(values.indicatorSet, 'solution.unsolvedReason.unsolvedReasonRequired')

			// 不满意未解决信息采集项-start
			if (values.indicatorSet.evaluationAndSolutionCollection) {
				Object.assign(
					values.indicatorSet.evaluationAndSolutionCollection,
					feedbackDataRef.current.evaluationAndSolutionCollection
				)
			}
			setYNBooleanValue(values.indicatorSet, 'evaluationAndSolutionCollection.collectionEnable')
			setYNBooleanValue(
				values.indicatorSet,
				'evaluationAndSolutionCollection.evaluationAndSolutionUserInfoCollection.userInfoEnable'
			)
			setYNBooleanValue(
				values.indicatorSet,
				'evaluationAndSolutionCollection.evaluationAndSolutionUserInfoCollection.userInfoRequired'
			)
			setYNBooleanValue(
				values.indicatorSet,
				'evaluationAndSolutionCollection.evaluationAndSolutionReasonCollection.reasonEnable'
			)
			setYNBooleanValue(
				values.indicatorSet,
				'evaluationAndSolutionCollection.evaluationAndSolutionReasonCollection.reasonMultipleEnable'
			)
			setYNBooleanValue(
				values.indicatorSet,
				'evaluationAndSolutionCollection.evaluationAndSolutionReasonCollection.reasonRequired'
			)
			// 不满意未解决信息采集项-end

			// 评价方式-过滤全局的配置
			const applicationSet = values.applicationSet
			if (applicationSet.feedbackTypeOptionList) {
				values.applicationSet.feedbackTypeOptionList = applicationSet.feedbackTypeOptionList.filter(
					(item) => item === '4'
				)
			}
			params = {
				ruleId: id,
				type: values.type,
				...values
			}
		}
		if (batchUpdate) {
			Modal.confirm({
				title: `是否批量修改满意度评价？`,
				okText: '确认',
				cancelText: '取消',
				onOk: () => {
					dealData(values)
				}
			})
		} else {
			const data = await post({
				url: Api.routeRuleFeedbackSave,
				data: params
			})
			if (data && data.success) {
				message.success('保存成功')
				onOk && onOk()
			} else {
				message.error(data.message)
			}
		}
	}
	const doNotValid = () => {
		//type为全局配置时不校验
		onFieldValueChange$('type').subscribe((state) => {
			if (state.value == '0') {
				actions.setFieldState('*', (stateA) => {
					stateA.errors = []
					stateA.valid = true
					stateA.invalid = false
					stateA.ruleErrors = []
				})
			}
		})
	}

	const fieldListChange = (e) => {
		const oldfieldMapKeys = Object.keys(fieldMapRef.current)
		const map = e.reduce((pre, cur) => {
			pre[cur] = true
			return pre
		}, {})
		// 把oldfieldMap里面有 但是map里面没有的项挑出来
		const diffKeys = oldfieldMapKeys.filter((key) => !map[key])
		if (diffKeys?.length > 0) {
			const changeDict = {
				evaluation: 'indicatorSet.evaluation.evaluationEnable',
				solution: 'indicatorSet.solution.solutionEnable',
				evaluationAndSolutionCollection: 'indicatorSet.evaluationAndSolutionCollection.collectionEnable',
				score: 'indicatorSet.score.scoreEnable',
				customQuestion: 'indicatorSet.customQuestion.customQuestionEnable'
			}
			diffKeys.forEach((key) => {
				if (changeDict[key]) {
					setDetail((pre) => {
						const newPre = { ...pre }
						set(newPre, changeDict[key], false)
						return newPre
					})
				}
			})
		}
		console.log('map', map)
		setFieldMap({ ...map })
		fieldMapRef.current = map
	}
	// 校验
	const feedbackRules = async (value) => {
		const res = await feedbackRef.current.submit()
		const result = feedbackRulesFunc(value, res, batchUpdate === true ? false : true)
		const batchUpdateKeys = Object.keys(fieldMapRef.current)
		// 批量修改的时候勾选最后一个不需要校验
		if (
			(batchUpdate === false ||
				(batchUpdate &&
					batchUpdateKeys.length > 0 &&
					batchUpdateKeys.some((key) => key !== 'feedbackTypeOptionList'))) &&
			result.type === submitType.error
		) {
			return result.data
		} else {
			let data = {}
			if (Array.isArray(res)) {
				res.forEach((resultData) => {
					if (resultData.data) {
						Object.assign(data, resultData.data)
					}
				})
			}
			feedbackDataRef.current = data
		}
	}
	const setComponentRef = (el) => {
		feedbackRef.current = el.current
	}
	useEffect(() => {
		if (visible) {
			if (id) {
				getDetail(id)
			} else {
				initData()
			}
		} else {
			setFieldMap({})
			fieldMapRef.current = {}
			setDetail(null)
		}
	}, [visible, id])
	return (
		<div className="satisfaction">
			<Modal
				title="满意度评价"
				visible={visible}
				onCancel={onCancel}
				onOk={okHandler}
				width={900}
				className="satisfaction-modal"
			>
				{detail && (
					<SchemaForm
						components={{ CustomerSwitch, FeedbackComponent, EvaluateType }}
						initialValues={detail}
						actions={actions}
						effects={() => {
							doNotValid()
						}}
					>
						{!batchUpdate && (
							<Field
								{...formItemLayout}
								type="string"
								title="是否使用全局设置"
								name="type"
								x-component="RadioGroup"
								x-component-props={{
									options: [
										{ label: '使用全局设置', value: '0' },
										{ label: '差异化设置', value: '1' }
									],
									onChange(e) {
										setType(e.target.value)
									}
								}}
								x-rules={[{ required: true, message: '请选择' }]}
							/>
						)}
						{batchUpdate && (
							<Field
								{...formItemLayout}
								name="fieldList"
								type="array"
								title="批量修改项"
								x-component="CheckboxGroup"
								x-component-props={{
									options: batchOptionList,
									disabled: false,
									onChange(e) {
										fieldListChange(e)
									}
								}}
								style={{ marginTop: 20 }}
								x-rules={[
									{
										required: true,
										message: '请选择要采集的用户信息'
									}
								]}
							/>
						)}
						<FormSlot>
							<div className="box-title">指标设置</div>
						</FormSlot>
						<Field
							type="Object"
							name="indicatorSet"
							x-component="FeedbackComponent"
							x-props={{
								setComponentRef,
								batchUpdate,
								disabled: type == 0,
								allowMap: JSON.stringify(fieldMap),
								formItemLayout
							}}
							x-rules={feedbackRules}
						/>
						<FormSlot>
							<div className="box-line"></div>
							<div className="box-title">应用设置</div>
						</FormSlot>
						<Field type="object" name="applicationSet">
							<Field
								type="object"
								name="feedbackTypeOptionList"
								x-component="EvaluateType"
								x-props={{
									disabled: batchUpdate ? !fieldMap['feedbackTypeOptionList'] : type == 0
								}}
								title="评价方式"
								{...formItemLayout}
							/>
						</Field>
					</SchemaForm>
				)}
			</Modal>
		</div>
	)
}
