import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { Form, Button, message } from "dpl-react";
import InputNumber from "@/components/olhelpCommon/inputNumber";
import ExpireData from "../expireDate";
import { modalType, effectiveType } from "../../config";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";

const FormItem = Form.Item;
// 布局
const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 15 },
};

function EditModal(props, refs) {
	const { form, data = {}, type, onCancel } = props;
	const { getFieldDecorator, validateFields, setFieldsValue } = form;
	const [loading, setLoading] = useState(false); // loading

	/**
	 * 保存点击
	 */
	const confirmHandler = () => {
		validateFields(async (err, values) => {
			if (!err) {
				let sendData = {
					expireDate:
						values.expireDateInfo.type === effectiveType.effective.id
							? values.expireDateInfo.expireDate
							: "",
				};
				if (type === modalType.add.type) {
					sendData.mobile = values.mobile;
					add(sendData);
				}
				if (type === modalType.edit.type) {
					sendData.id = data.id;
					update(sendData);
				}
			}
		});
	};

	/**
	 * 新增
	 */
	const add = async (data) => {
		try {
			setLoading(true);
			const res = await post({
				url: Api.postInsertForbid,
				data,
			});
			if (res.success) {
				message.success("新增成功！");
				onCancel && onCancel(true);
			} else {
				message.error(res.message);
			}
			setLoading(false);
		} catch (e) {
			console.error(e);
			setLoading(false);
		}
	};

	/**
	 * 修改
	 */
	const update = async (data) => {
		try {
			setLoading(true);
			const res = await post({
				url: Api.postUpdateForbid,
				data,
			});
			if (res.success) {
				message.success("修改成功！");
				onCancel && onCancel(true);
			} else {
				message.error(res.message);
			}
			setLoading(false);
		} catch (e) {
			console.error(e);
			setLoading(false);
		}
	};

	/**
	 * 取消
	 */
	const cancelHandler = () => {
		onCancel && onCancel();
	};

	return (
		<div className="edit-blacklist-modal-box">
			<Form>
				<FormItem {...formItemLayout} label="手机号">
					{getFieldDecorator("mobile", {
						initialValue: data.mobile,
						rules: [
							{ required: true, message: [] },
							{
								validator: (rule, value, callback) => {
									const res = /^1[0-9]{10}$/;
									if (!value) {
										callback("手机号不能为空！");
									} else if (!res.test(value)) {
										callback("请输入正确的手机号！");
									} else {
										callback();
									}
								},
							},
						],
					})(
						<InputNumber
							placeholder="请输入手机号"
							maxLength="11"
							disabled={type === modalType.edit.type || loading}
						/>
					)}
				</FormItem>
				<FormItem {...formItemLayout} label="黑名单有效期">
					{getFieldDecorator("expireDateInfo", {
						initialValue: {
							expireDate: data.expireDate,
							type: data.type,
						},
						rules: [
							{
								validator: (rule, value, callback) => {
									if (!value.type) {
										callback("请选择黑名单有效期！");
									} else if (
										value.type === effectiveType.effective.id &&
										!value.expireDate
									) {
										callback("请选择失效日期！");
									} else {
										callback();
									}
								},
							},
						],
					})(<ExpireData />)}
				</FormItem>
			</Form>
			<div className="button-box">
				<Button
					type="primary"
					className="button-item"
					loading={loading}
					onClick={() => {
						confirmHandler();
					}}
				>
					保存
				</Button>
				<div className="line-box"></div>
				<Button
					className="button-item"
					disabled={loading}
					onClick={() => {
						cancelHandler();
					}}
				>
					取消
				</Button>
			</div>
		</div>
	);
}

export default Form.create()(React.forwardRef(EditModal));
