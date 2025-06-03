import React, { useState, useEffect } from 'react'
import CallCenterManageApi from '@/requestApi/callcentermanage/api'
import './index.scss'
import { Form, Select, Button, DatePicker, message, Input, Radio } from 'dpl2-proxy'
import history from '@/history'
import qs from 'qs'

const FormItem = Form.Item
const { Option } = Select
const consultWayList = [
	{
		label: '电话人工',
		value: 'robot'
	},
	{
		label: '在线人工',
		value: 'online'
	},
	{
		label: '机器人',
		value: 'telphone'
	}
]

export default function __functionName(props) {
	const [form] = Form.useForm()
	const [id, setId] = useState(() => {
		const obj = qs.parse(window.location.href.split('?')[1])
		return obj.id
	})
	const [consultWay, setConsultWay] = useState('robot')
	const [detail, setDetail] = useState({
		consultWay: 'robot'
	})
	const [areaList, setAreaList] = useState([])
	const getDetail = async (id) => {
		const data = await CallCenterManageApi.getConsulttaskruleDetail({ id })
		if (data.success) {
			setDetail(data.data)
		}
	}
	const getAreaList = async () => {
		const res = await CallCenterManageApi.getCommonAreaList()
		if (res.success) {
			const data = res.data
			setAreaList(data)
		} else {
			message.error(res.message)
		}
	}
	const confirmHandler = () => {
		form
			.validateFields()
			.then(async (values) => {
				let data
				if (id) {
					data = await CallCenterManageApi.postConsulttaskruleModify({ ...values, id })
				} else {
					data = await CallCenterManageApi.postConsulttaskruleSave({ ...values })
				}
				if (!data) return
				if (data.success) {
					message.success(id ? '修改成功' : '新增成功')
				} else {
					message.error(data.message)
				}
			})
			.catch((err) => {
				console.log('err', err)
			})
	}
	const cancelHandler = () => {
		window.close()
	}
	useEffect(() => {
		if (id) {
			getDetail(id)
		}
	}, [id])
	useEffect(() => {
		getAreaList()
	}, [])
	return (
		<div className="detail-bg">
			<div className="detail-bg-content __className">
				<Form
					form={form}
					name="addSolutionForm"
					labelCol={{
						span: 6
					}}
					wrapperCol={{
						span: 18
					}}
					initialValues={detail}
				>
					<Form.Item label="咨询方式" name="consultWay" rules={[{ required: true, message: '交付状态不得为空' }]}>
						<Radio.Group
							onChange={(e) => {
								setConsultWay(e.target.value)
							}}
						>
							{consultWayList.map((item1) => (
								<Radio key={item1.value} value={item1.value}>
									{item1.label}
								</Radio>
							))}
						</Radio.Group>
					</Form.Item>
					<FormItem
						label="交付地区"
						name="locationCodeList"
						rules={[
							{
								required: true,
								message: '请选择交付地区'
							}
						]}
					>
						<Select
							placeholder="请选择"
							allowClear
							showSearch
							optionFilterProp="children"
							mode="multiple"
							filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
						>
							{areaList?.map((option) => (
								<Option value={option.id}>{option.name}</Option>
							))}
						</Select>
					</FormItem>
					<Form.Item
						label="预计停止交付时间"
						name="stopDeliveryStartDate"
						rules={[
							{
								required: true,
								message: '请选择预计停止交付时间'
							}
						]}
					>
						<DatePicker.RangePicker
							style={{
								width: '100%'
							}}
						/>
					</Form.Item>
					<Form.Item label="备注" name="remark">
						<Input.TextArea autosize={{ minRows: 4, maxRows: 6 }} placeholder="请输入备注" maxLength="500" />
					</Form.Item>
				</Form>
				<div className="app-buttons app-buttons-center">
					<Button className="app-button" type="primary" onClick={confirmHandler}>
						保存
					</Button>
					<Button className="app-button" onClick={cancelHandler}>
						取消
					</Button>
				</div>
			</div>
		</div>
	)
}
