import React, { useEffect, useState } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Modal, Switch, message } from "dpl-react";
import Guess from "./guess";
import AutoCustomerService from "./autoCustomerService";
import NoResultField from "./noResult";
import { post, get } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import RobotDelaySend from '@/components/robotDelaySend'

function CustomerSwitch(props) {
	const { value, onChange, ...rest } = props;
	return <Switch checked={value} onChange={onChange} {...rest} />;
}

const {
	SchemaMarkupForm: SchemaForm,
	SchemaMarkupField: Field,
	createFormActions,
	FormEffectHooks,
} = uForm;
const actions = createFormActions();
const { onFieldValueChange$ } = FormEffectHooks;

const formItemLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 15 },
};
export default function ManMachine(props) {
	const { visible, id, onCancel, onOk } = props;
	const [detail, setDetail] = useState(null);
	const [type, setType] = useState("0");
    const [delayTransmitEnable, setDelayTransmitEnable] = useState('N');

	const getDetail = async (id) => {
		const data = await get({
			url: Api.routeRuleInteractDetail,
			params: { ruleId: id },
		});
		if (data.success) {
			data.data.guessQuestionEnable = data.data.guessQuestionEnable === "Y";
			data.data.intelligentSuggestEnable =
				data.data.intelligentSuggestEnable === "Y";
			data.data.autoCustomerServiceEnable =
				data.data.autoCustomerService &&
				data.data.autoCustomerService.enable === "Y";
			data.data.intelligentAssistantEnable =
				data.data.intelligentAssistantEnable === "Y";
			data.data.guessQuestion = {
				switch: data.data.guessQuestionEnable,
				tips: data.data.guessQuestionTip,
			};
			data.data.autoCustomerServiceInfo = {
				multiRoundsEnable:
					data.data.autoCustomerService &&
					data.data.autoCustomerService.multiRoundsEnable === "Y",
				multiRoundsCount:
					data.data.autoCustomerService &&
					data.data.autoCustomerService.multiRoundsCount,
				multiRoundsTip:
					data.data.autoCustomerService &&
					data.data.autoCustomerService.multiRoundsTip,
			};
			data.data.robotTransmit = data.data.robotTransmit || {};
            data.data.robotTransmit.delayTransmitEnable = data.data.robotTransmit.delayTransmitEnable || 'N';
			
			data.data.getResultFail = {
				amount: data.data?.autoCustomerService?.multiMatchAnswerCount,
				tips: data.data?.autoCustomerService?.multiMatchAnswerTip,
			}
			setType(data.data.type);
			setDelayTransmitEnable(data.data.robotTransmit.delayTransmitEnable);
			setDetail(data.data);
		}
	};
	const doNotValid = () => {
		//type为全局配置时不校验
		onFieldValueChange$("type").subscribe((state) => {
			if (state.value == "0") {
				actions.setFieldState("*", (stateA) => {
					stateA.errors = [];
					stateA.valid = true;
					stateA.invalid = false;
					stateA.ruleErrors = [];
				});
			}
		});
	};

	useEffect(() => {
		if (visible) {
			getDetail(id);
		} else {
			setDetail(null);
		}
	}, [visible, id]);
	const okHandler = async () => {
		let params = {};
		if (type == "0") {
			params = {
				ruleId: id,
				type: type,
			};
		} else {
			let values = await actions.submit();
			values = values.values;
	
			params = {
				ruleId: id,
				type: values.type,
				guessQuestionEnable: values.guessQuestion.switch ? "Y" : "N",
				guessQuestionTip: values.guessQuestion.tips,
				intelligentSuggestEnable: values.intelligentSuggestEnable ? "Y" : "N",
				intelligentAssistantEnable: values.intelligentAssistantEnable
					? "Y"
					: "N",
				autoCustomerService: {
					enable: values.autoCustomerServiceEnable ? "Y" : "N",
					multiRoundsEnable:
						values.autoCustomerServiceInfo &&
						values.autoCustomerServiceInfo.multiRoundsEnable
							? "Y"
							: "N",
					multiRoundsCount:
						values.autoCustomerServiceInfo &&
						values.autoCustomerServiceInfo.multiRoundsCount,
					multiRoundsTip:
						values.autoCustomerServiceInfo &&
						values.autoCustomerServiceInfo.multiRoundsTip.trim(),
					multiMatchAnswerCount:values?.getResultFail?.amount,
					multiMatchAnswerTip:values?.getResultFail?.tips
				},
				robotTransmit: values.robotTransmit
			};
			if (params.guessQuestionEnable === "N") {
				delete params.guessQuestionTip;
			}
		}
		const response = await post({
			url: Api.routeRuleInteractSave,
			data: params,
		});
		if (response.success) {
			onOk();
			message.success("保存成功");
		} else {
			message.error(response.message);
		}
	};
	return (
		<Modal
			title="人机协作"
			visible={visible}
			width={800}
			className={"man-machine"}
			onCancel={onCancel}
			onOk={okHandler}
		>
			{detail && (
				<SchemaForm
					components={{ Guess, CustomerSwitch, AutoCustomerService, RobotDelaySend, NoResultField }}
					initialValues={detail}
					actions={actions}
					effects={() => {
						doNotValid();
					}}
					onChange={(values) => {
                        setDelayTransmitEnable(values.robotTransmit.delayTransmitEnable)
                    }}
				>
					<Field
						{...formItemLayout}
						type="string"
						title="是否使用全局设置"
						name="type"
						x-component="RadioGroup"
						x-component-props={{
							options: [
								{ label: "使用全局设置", value: "0" },
								{ label: "差异化设置", value: "1" },
							],
							onChange(e) {
								setType(e.target.value);
							},
						}}
						x-rules={[{ required: true, message: "请选择" }]}
					/>
					<Field
						{...formItemLayout}
						type="string"
						title="猜你想问"
						name="guessQuestion"
						x-component="Guess"
						x-component-props={{ disabled: type == "0" }}
						x-rules={(value) => {
							if (value.switch && !value.tips) {
								return {
									type: "error",
									message: "请输入提示",
								};
							}
						}}
					/>
					<Field
						name="intelligentSuggestEnable"
						type="string"
						title="智能联想"
						x-component="CustomerSwitch"
						x-component-props={{ disabled: type == "0" }}
						{...formItemLayout}
						x-rules={[{ required: true, message: "请选择" }]}
					/>
					<Field
						name="autoCustomerServiceEnable"
						type="string"
						title="自动转人工"
						x-component="CustomerSwitch"
						x-component-props={{ disabled: type == "0" }}
						{...formItemLayout}
						x-rules={[{ required: true, message: "请选择" }]}
					/>
					<Field
						name="intelligentAssistantEnable"
						type="string"
						title="智能助理"
						x-component="CustomerSwitch"
						x-component-props={{ disabled: type == "0" }}
						{...formItemLayout}
						x-rules={[{ required: true, message: "请选择" }]}
					/>
					<Field
						name="autoCustomerServiceInfo"
						type="string"
						title="机器人多次对话转人工"
						x-component="AutoCustomerService"
						x-component-props={{ disabled: type == "0" }}
						{...formItemLayout}
						x-rules={(value) => {
							if (
								value.multiRoundsEnable &&
								(!value.multiRoundsCount || !value.multiRoundsTip)
							) {
								return {
									type: "error",
									message: "有必填项未填，请检查",
								};
							}
						}}
					/>
                    <Field type='object' {...formItemLayout} name='robotTransmit' title='机器人回复延迟发送'
                        required={delayTransmitEnable === 'Y'}
						x-component-props={{ disabled: type == "0" }}
                        x-component='RobotDelaySend'
                        x-rules={(value) => {
                            if (value.delayTransmitEnable === 'Y' && !value.delayTransmitMilliseconds && value.delayTransmitMilliseconds !== 0) {
                                return {
                                    message: '请输入发送延迟时间',
                                    type: 'error'
                                }
                            }
                        }}
                    />
					<Field 
						type="object"
						name="getResultFail"
						{...formItemLayout}
						title="无法查到答案"
						x-component="NoResultField"
						x-component-props={{ disabled: type == "0" }}
						x-rules={(value) => {
							console.log('rules value', value);
							if (!value.amount && value.amount !== 0) {
								console.log('error value', value);
								return {
									type: "error",
									message: "有必填项未填，请检查",
								}
							}
						}}
					/>
				</SchemaForm>
			)}
		</Modal>
	);
}
