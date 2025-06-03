import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import LandingCard from "../landingCard";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import AddBox from "../addBox";
import { consultEntranceStatusMap, editTypeEnum } from "@/const/config";
import { Radio, message, Pagination, Modal } from "dpl-react";
import LandingTable from "../landingTable";
import UpdateStatus from "../updateStatus";
import classnames from "classnames";
import EntranceEditModal from "../entranceEditModal";
import qs from "qs";
import { uForm } from "dora";
import moment from "moment";
import 'moment/locale/zh-cn';
const {
	SchemaMarkupForm: SchemaForm,
	SchemaMarkupField: Field,
	useFormTableQuery,
	Submit,
	FormButtonGroup,
	Reset,
	createFormActions,
} = uForm;
const actions = createFormActions();
const RadioButton = Radio.Button;
const defaultPageIndex = 1;
const defaultPageSize = 10;
// 默认分页信息
const defaultPageInfo = {
	pageIndex: defaultPageIndex,
	pageSize: defaultPageSize,
	total: 0,
};
// 状态列表
const statusList = [
	{
		id: "all",
		name: "全部",
	},
	{
		id: consultEntranceStatusMap.ineffective,
		name: "未生效",
	},
	{
		id: consultEntranceStatusMap.effective,
		name: "已生效",
	},
	{
		id: consultEntranceStatusMap.invalid,
		name: "已失效",
	},
];
const defaultFormData = {
	status: statusList[0].id,
	pageIndex: defaultPageIndex,
	pageSize: defaultPageSize,
};
/**
 * 添加全部的select的option
 */
const allArea = {
	id: "0000",
	name: "全国",
};
const addAllOption = (options) => {
	return [].concat(allArea, options);
};

const defaultEditModal = {
	isShow: false,
	name: "新增",
	type: "add",
	data: {},
};
export default function EntranceConfig(props) {
	const { isSetData } = props;
	const [formData, setFormData] = useState(() => {
		const data = qs.parse(window.location.href.split("?")[1]);
		let result = Object.assign({}, defaultFormData, {
			name: data.name, // 默认落地页名称
			status: data.status || statusList[0].id, // 状态
			landingPageId: data.landingPageId && Number(data.landingPageId), // 落地页id
			modifyTime:
				(data.modifyTimeFrom &&
					data.modifyTimeTo && [data.modifyTimeFrom, data.modifyTimeTo]) ||
				undefined,
			pageIndex: (data.pageIndex && Number(data.pageIndex)) || defaultPageIndex,
			pageSize: (data.pageSize && Number(data.pageSize)) || defaultPageSize,
		});
		// 日期不知道是只有一个还是有多个
		return result;
	}); //表单数据
	const [areaList, setAreaList] = useState([]); // 地区列表
	const [isFirst, setIsFirst] = useState(true); //第一次进入
	const [areaMap, setAreaMap] = useState({}); // 地区Map
	const [landingPageList, setLandingPageList] = useState([]); //  落地页下拉列表
	const [configStatus, setConfigStatus] = useState(formData.status);
	const configStatusRef = useRef(formData.status); // 配置状态
	const isResetForm = useRef(false); // 是否重置了选择数据
	const [editModal, setEditModal] = useState(defaultEditModal);
	/**
	 * classnames
	 */
	const statusClass = (status) => {
		return classnames({
			"entrance-status": true,
			"entrance-status-effective": status == consultEntranceStatusMap.effective,
			"entrance-status-invalid": status == consultEntranceStatusMap.invalid,
		});
	};

	/**
	 * 获取地区列表接口
	 */

	const getAreaList = async () => {
		const res = await get({
			url: Api.getWdList,
			params: {},
		});
		if (res.success) {
			const data = res.data;
			if (data.location) {
				let map = {};
				data.location.forEach((item) => {
					map[item.id] = item;
				});
				setAreaMap(map);
				setAreaList([].concat(data.location));
			}
		} else {
			message.error(res.message);
		}
	};

	const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
		const params = {
			name: (values.name && values.name.trim()) || undefined, // 默认落地页名称
			landingPageId: values.landingPageId, // 落地页id
			status:
				configStatusRef.current == "all" ? undefined : configStatusRef.current, // 状态
			modelType: values.modelType, // 落地页类型
			modifyTimeFrom: values.modifyTime && values.modifyTime[0], // 最后修改时间起
			modifyTimeTo: values.modifyTime && values.modifyTime[1], // 最后修改时间止
			pageIndex: pagination.current || defaultPageIndex,
			pageSize: pagination.pageSize || defaultPageSize,
		};
		setHash(params);
		const res = await get({
			url: Api.getConsultEntranceList,
			params,
		});
		if (res.success) {
			const data = res.data;
		} else {
			message.error(res.message);
		}
		return {
			dataSource: (res.data && res.data.list) || [],
			pageSize: (res.data && res.data.pageSize) || pagination.pageSize,
			total: (res.data && res.data.total) || pagination.total,
			current: (res.data && res.data.pageIndex) || pagination.current,
		};
	};
	const submitClickFunc = () => {
		isResetForm.current = false;
	};
	//  formily 清空中间件
	const middleware = () => ({ context }) => ({
		onFormResetQuery(payload, next) {
			// 手动将表单数据清除，为了处理初始化的情况下，无法清除默认值的问题
			actions.setFormState((state) => (state.values = {}));
			isResetForm.current = true;
			context.setPagination({
				...context.pagination,
				current: 1,
			});
			context.setSorter({});
			context.setFilters({});
			return next({});
		},
		onPageQuery(payload, next) {
			// 手动将表单数据清除
			context.setPagination({
				...context.pagination,
			});
			context.setSorter({});
			context.setFilters({});
			return next(isResetForm.current ? {} : payload);
		},
	});

	const { form, table, trigger } = useFormTableQuery(
		service,
		{
			pagination: { current: formData.pageIndex, pageSize: formData.pageSize },
		},
		[middleware()]
	);

	/**
	 * 修改状态
	 */
	const updateStatus = async (data) => {
		const res = await post({
			url: Api.postUpdateStatusConsultEntrance,
			data,
		});
		if (res.success) {
			message.success("状态修改成功！");
			// const result = formatData(formData);
			trigger();
			// getConsultEntranceList(result);
		} else {
			message.error(res.message);
		}
	};

	/**
	 * 获取配置详情
	 */
	const getEntranceConfigDetail = async (id, callback) => {
		const res = await get({
			url: Api.getConsultEntranceDetail,
			params: {
				id,
			},
		});
		if (res.success) {
			const data = res.data;
			callback && callback(data);
		} else {
			message.error(res.message);
		}
	};

	/**
	 * 获取落地页配置列表
	 */
	const getLandingPageList = async () => {
		try {
			const res = await get({
				url: Api.getLandingPageList,
				params: {},
			});
			if (res.success) {
				const data = res.data;
				let result = [];
				if (Array.isArray(data)) {
					data.forEach((item) => {
						result.push({
							...item,
							label: item.name,
							value: item.id,
						});
					});
				}
				setLandingPageList(result);
			} else {
				message.error(res.message);
			}
		} catch (e) {
			console.error(e);
		}
	};

	// 状态改变
	const statusChange = (e) => {
		const value = e.target.value;
		configStatusRef.current = value;
		setConfigStatus(value);
		trigger();
	};

	const formatData = (data) => {
		return {
			...data,
			status: data.status == "all" ? undefined : data.status,
		};
	};

	// 额外
	const entranceExtra = (
		<Radio.Group value={configStatus} onChange={statusChange}>
			{statusList.map((item) => {
				return (
					<RadioButton key={item.id} value={item.id}>
						{item.name}
					</RadioButton>
				);
			})}
		</Radio.Group>
	);

	const columns = [
		{
			title: "渠道名称",
			dataIndex: "name",
			width: 250,
		},
		{
			title: "地区",
			dataIndex: "locationList",
			width: 100,
			center: true,
			render: (text, data) => {
				let list = [];
				data.locationList.forEach((item, index) => {
					if (areaMap[item]) {
						list.push(areaMap[item].name);
					}
				});
				return <span title={list.join(",")}>{list.join(",")}</span>;
			},
		},
		{
			title: "场景落地页",
			dataIndex: "landingPageName",
			width: 120,
		},
		{
			title: "配置人",
			dataIndex: "lastModifierName",
			width: 120,
		},
		{
			title: "配置时间",
			dataIndex: "lastModifyTime",
			width: 150,
		},
		{
			title: "配置状态",
			dataIndex: "status",
			width: 120,
			center: true,
			render: (text, data) => {
				return (
					<span className={statusClass(data.status)} title={data.statusName}>
						{data.statusName}
					</span>
				);
			},
		},
	];

	// 改变状态
	const changeStatus = (value, data) => {
		updateStatus({
			id: data.id,
			status: value,
		});
	};

	// 添加渠道
	const addEntrance = () => {
		setEditModal({
			isShow: true,
			type: editTypeEnum.add,
			name: "新增",
			data: {},
		});
	};

	const editConfig = (list) => {
		getEntranceConfigDetail(list[0].id, (result) => {
			setEditModal({
				isShow: true,
				type: editTypeEnum.edit,
				name: "编辑",
				data: result,
			});
		});
	};
	const optionComponent = (data) => {
		return (
			<div className="entrance-option-box">
				<UpdateStatus
					list={statusList.slice(2)}
					onClick={(item) => {
						changeStatus(item.key, data[0]);
					}}
				/>
				<div
					className="entrance-option-edit"
					onClick={() => {
						editConfig(data);
					}}
				>
					修改配置
				</div>
			</div>
		);
	};

	/**
	 * 分页
	 * @param {*} pageIndex
	 * @param {*} pageSize
	 */
	const changePage = (pageIndex, pageSize) => {
		const pagination = Object.assign({}, table.pagination, {
			current: pageIndex,
			pageSize,
		});
		table.onChange(pagination, null, null);
	};

	const closeModal = (isRefresh) => {
		setEditModal(defaultEditModal);
		if (isRefresh) {
			// const data = formatData(formData);
			// getConsultEntranceList(data);
			trigger();
		}
	};

	const setHash = (data) => {
		let hash = window.location.hash.split("#")[1];
		hash = hash.split("?")[0];
		let params = qs.parse(window.location.href.split("?")[1]);
		window.location.hash = `#${hash}?${qs.stringify(
			Object.assign(params, data)
		)}`;
		if (isFirst) {
			setIsFirst(false);
		}
	};

	useEffect(() => {
		if (isSetData && !isFirst) {
			const data = formatData(formData);
			setHash(data);
		}
	}, [isSetData]);

	useEffect(() => {
		getAreaList();
		getLandingPageList();
	}, []);
	return (
		<div className="entrance-config-box">
			<LandingCard title="渠道配置列表" extra={entranceExtra}>
				<div className="search-box">
					<SchemaForm
						actions={actions}
						{...form}
						initialValues={formData}
						inline
						className="form-wrap"
					>
						<Field
							type="string"
							title="渠道名称"
							name="name"
							x-component="Input"
							x-component-props={{
								allowClear: true,
								placeholder: "请输入渠道名称",
								style: {
									width: 250,
								},
							}}
						/>
						<Field
							type="string"
							title="场景落地页"
							name="landingPageId"
							x-component="Select"
							x-component-props={{
								allowClear: true,
								placeholder: "请选择场景落地页",
								dataSource: landingPageList,
								showSearch: true,
								optionFilterProp: "children",
								style: {
									width: 250,
								},
							}}
						/>
						<Field
							type="string"
							title="配置时间"
							name="modifyTime"
							x-component="RangePicker"
							x-component-props={{
								style: {
									width: 260,
								},
							}}
						/>
						<FormButtonGroup>
							<Submit style={{ marginRight: 10 }} onClick={submitClickFunc}>
								查询
							</Submit>
							<Reset>清空条件</Reset>
						</FormButtonGroup>
					</SchemaForm>
				</div>
				<AddBox context="添加渠道" onClick={addEntrance} />
				<div className="entrance-list-box">
					{table.dataSource.length > 0 &&
						table.dataSource.map((item) => {
							return (
								<LandingTable
									key={item.id}
									columns={columns}
									dataSource={[item]}
									optionComponent={optionComponent}
								/>
							);
						})}
				</div>
				<div className="pagination-box">
					<Pagination
						showTotalInfo={false}
						current={Number(table.pagination.current)}
						pageSize={Number(table.pagination.pageSize)}
						total={Number(table.pagination.total)}
						showQuickJumper={true}
						showSizeChanger={true}
						onShowSizeChange={changePage}
						onChange={changePage}
					/>
				</div>
			</LandingCard>
			<Modal
				title={editModal.name}
				visible={editModal.isShow}
				width={"800px"}
				className="entrance-config-edit-modal"
				destroyOnClose
				footer={null}
				onCancel={() => {
					closeModal();
				}}
			>
				<EntranceEditModal
					config={editModal}
					areaList={areaList}
					onCancel={closeModal}
					formData={editModal.data}
				/>
			</Modal>
		</div>
	);
}
