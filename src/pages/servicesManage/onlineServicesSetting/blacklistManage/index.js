import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { uForm } from "dora";
import { message, Table, Pagination, Button, Modal } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import InputNumber from "@/components/olhelpCommon/inputNumber";
import UserFuzzyQuery from "@/components/olhelpCommon/userFuzzyQuery";
import EditModal from "./components/editModal";
import { modalType, effectiveType, typeMap } from "./config";
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
const defaultPageIndex = 1;
const defaultPageSize = 10;
const statusType = {
	effective: {
		id: "Y",
		name: "有效",
		buttonName: "失效",
	},
	invalid: {
		id: "N",
		name: "失效",
		buttonName: "启用",
	},
};
const defaultPageInfo = {
	pageIndex: defaultPageIndex,
	pageSize: defaultPageSize,
	total: 0,
};
const typeList = [typeMap.callCenter, typeMap.SubCompanyCode].join(","); //
export default function BlacklistManage(props) {
	const [orgList, setOrgList] = useState([]); // 组织机构列表
	const [checkboxList, setCheckboxList] = useState([]); // 复选框列表
	const isResetForm = useRef(false); // 是否重置
	const isJsQueryRef = useRef(false); // 是否js调用查询的
	const pageInfoRef = useRef(defaultPageInfo);
	const [modalInfo, setModalInfo] = useState({
		type: modalType.add.type,
		title: modalType.add.name,
		data: {},
		visible: false,
	});
	const firstRef = useRef(true); // 第一次的ref
	const orgListRef = useRef(null); // 组织机构列表

	/**
	 * 获取当前登录者信息
	 */
	const getCurrentUserInfo = async () => {
		try {
			const res = await get({
				url: Api.getCurrentUserInfo,
				params: {},
			});
			if (res.success) {
				const data = res.data;
				setCheckboxList([
					{
						label: "最后修改人是我",
						value: data.id,
					},
				]);
				if (Array.isArray(orgListRef.current)) {
					for (let i = 0, len = orgListRef.current.length; i < len; i++) {
						const item = orgListRef.current[i];
						if (item.code === data.branchCode) {
							actions.setFieldState(
								"branchCode",
								(state) => {
									state.value = data.branchCode;
								},
								true
							);
							break;
						}
					}
				}
				trigger();
			} else {
				message.error(res.message);
			}
			firstRef.current = false;
		} catch (e) {
			console.error(e);
			firstRef.current = false;
		}
	};
	/**
	 * 获取组织机构列表
	 */
	const getOrgList = async () => {
		try {
			const res = await get({
				url: Api.getOrgList,
				params: {
					typeList,
				},
			});
			if (res.success) {
				const data = res.data;
				let result = [];
				if (Array.isArray(data)) {
					data.forEach((item) => {
						result.push({
							...item,
							label: item.shortName,
							value: item.code,
						});
					});
				}
				orgListRef.current = result;
				setOrgList(result);
			} else {
				message.error(res.message);
			}
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * 初始化调用方法
	 */
	const init = async () => {
		await getOrgList();
		getCurrentUserInfo();
	};

	const clearFlag = () => {
		isResetForm.current = false;
		isJsQueryRef.current = false;
	};

	/**
	 * 更新状态
	 */
	const updateForbidStatusFunc = (item) => {
		Modal.confirm({
			title: `确定要${
				item.status === statusType.effective.id
					? statusType.effective.buttonName
					: statusType.invalid.buttonName
			}该条记录吗？`,
			onOk: async () => {
				const sendData = {
					id: item.id,
					status:
						item.status === statusType.effective.id
							? statusType.invalid.id
							: statusType.effective.id,
				};
				try {
					const res = await post({
						url: Api.postUpdateForbidStatus,
						data: sendData,
					});
					if (res.success) {
						message.success("状态更新成功！");
						isJsQueryRef.current = true;
						trigger();
					} else {
						message.error(res.message);
					}
				} catch (e) {
					console.error(e);
				}
			},
		});
	};

	const columns = [
		{
			title: "手机号",
			dataIndex: "mobile",
			ellipsis: true,
			align: "center",
			width: 150,
		},
		{
			title: "操作",
			ellipsis: true,
			align: "center",
			width: 100,
			render(text, record, index) {
				return (
					<div className="option-box">
						<span
							onClick={() => {
								updateForbidStatusFunc(record);
							}}
						>
							{record.status === statusType.effective.id
								? statusType.effective.buttonName
								: statusType.invalid.buttonName}
						</span>
						<div className="button-line"></div>
						<span
							onClick={() => {
								editBlacklist(record);
							}}
						>
							修改
						</span>
					</div>
				);
			},
		},
		{
			title: "有效期",
			dataIndex: "expireDate",
			ellipsis: true,
			align: "center",
		},
		{
			title: "状态",
			dataIndex: "status",
			ellipsis: true,
			align: "center",
			render(text, record) {
				return (
					<span>
						{text === statusType.effective.id
							? statusType.effective.name
							: statusType.invalid.name}
					</span>
				);
			},
		},
		{
			title: "最后修改人",
			dataIndex: "modifierName",
			ellipsis: true,
			align: "center",
		},
		{
			title: "最后修改时间",
			dataIndex: "modifyDate",
			ellipsis: true,
			align: "center",
		},
		{
			title: "创建人",
			dataIndex: "creatorName",
			ellipsis: true,
			align: "center",
		},
		{
			title: "创建时间",
			dataIndex: "createDate",
			ellipsis: true,
			align: "center",
		},
		{
			title: "创建人所属分公司",
			dataIndex: "branchName",
			ellipsis: true,
			align: "center",
		},
	];
	const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
		let sendParams = {
			mobile: values.mobile && values.mobile.trim(), // 手机号，模糊查询
			branchCode: values.branchCode, // 分子公司代码
			creatorId: values.creatorId, // 创建人id
			modifierId: values.modifierId && values.modifierId[0], // 修改人id
			pageIndex: pagination.current || defaultPageIndex,
			pageSize: pagination.pageSize || defaultPageSize,
		};
		if (isJsQueryRef.current) {
			sendParams.pageIndex = pageInfoRef.current.pageIndex;
			sendParams.pageSize = pageInfoRef.current.pageSize;
		}
		let res = {};
		if (!firstRef.current) {
			res = await get({
				url: Api.getForbidList,
				params: sendParams,
			});
			if (res.success) {
				const data = res.data;
				pageInfoRef.current = {
					pageIndex: data.pageIndex,
					pageSize: data.pageSize,
					total: data.total,
				};
			} else {
				message.error(res.message);
			}
		}
		return {
			dataSource: (res.data && res.data.list) || [],
			pageSize: (res.data && res.data.pageSize) || pagination.pageSize,
			total: (res.data && res.data.total) || pagination.total,
			current: (res.data && res.data.pageIndex) || pagination.current,
		};
	};
	const middleware = () => ({ context }) => ({
		onFormResetQuery(payload, next) {
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
			isJsQueryRef.current = false;
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
			pagination: { pageSize: defaultPageSize, current: defaultPageIndex },
		},
		[middleware()]
	);

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

	/**
	 * 弹窗关闭
	 */
	const modalOnCancel = (isRefresh) => {
		setModalInfo(
			Object.assign({}, modalInfo, {
				visible: false,
			})
		);
		if (isRefresh) {
			isJsQueryRef.current = true;
			trigger();
		}
	};

	/**
	 * 新增黑名单
	 */
	const addBlacklist = () => {
		setModalInfo({
			type: modalType.add.type,
			title: modalType.add.name,
			data: {},
			visible: true,
		});
	};
	/**
	 * 修改黑名单
	 */
	const editBlacklist = (item) => {
		setModalInfo({
			type: modalType.edit.type,
			title: modalType.edit.name,
			data: {
				id: item.id,
				mobile: item.mobile,
				type: item.expireDate
					? effectiveType.effective.id
					: effectiveType.foreverEffective.id,
				expireDate: item.expireDate,
			},
			visible: true,
		});
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<div className="blacklist-manage-box">
			<SchemaForm
				{...form}
				inline
				actions={actions}
				className="form-wrap"
				components={{ InputNumber, UserFuzzyQuery }}
			>
				<Field
					type="string"
					title="手机号"
					name="mobile"
					x-component="InputNumber"
					x-component-props={{
						placeholder: "请输入手机号",
						maxLength: "11",
						allowClear: true,
						style: {
							width: 160,
						},
					}}
				/>
				<Field
					type="string"
					title="创建人"
					name="creatorId"
					x-component="UserFuzzyQuery"
					x-component-props={{
						placeholder: "请输入关键字搜索",
						allowClear: true,
						style: {
							width: 200,
						},
					}}
				/>
				<Field
					type="string"
					title="创建人所属分公司"
					name="branchCode"
					x-component="Select"
					x-component-props={{
						placeholder: "请选择分子公司",
						allowClear: true,
						dataSource: orgList,
						showSearch: true,
						optionFilterProp: "children",
						style: {
							width: 160,
						},
					}}
				/>
				<Field
					type="string"
					name="modifierId"
					x-component="CheckboxGroup"
					x-component-props={{
						options: checkboxList,
					}}
				/>
				<FormButtonGroup>
					<Submit style={{ marginRight: 10 }} onClick={clearFlag} >查询</Submit>
					<Reset />
				</FormButtonGroup>
			</SchemaForm>
			<div className="table-box">
				<div className="table-btn">
					<Button type="primary" onClick={() => addBlacklist()}>
						新增
					</Button>
				</div>
				<Table
					className="table-wrap"
					{...table}
					columns={columns}
					pagination={false}
					bordered
				/>
				<div className="pagination-box">
					<Pagination
						showTotalInfo={false}
						current={Number(table.pagination.current)}
						pageSize={Number(table.pagination.pageSize)}
						total={Number(table.pagination.total)}
						showQuickJumper={true}
						showSizeChanger={true}
						pageSizeOptions={['10','20','50','100']}
						onShowSizeChange={changePage}
						onChange={changePage}
					/>
				</div>
			</div>
			<Modal
				footer={null}
				title={modalInfo.title}
				visible={modalInfo.visible}
				onCancel={modalOnCancel}
				destroyOnClose={true}
			>
				<EditModal
					type={modalInfo.type}
					data={modalInfo.data}
					onCancel={modalOnCancel}
				/>
			</Modal>
		</div>
	);
}
