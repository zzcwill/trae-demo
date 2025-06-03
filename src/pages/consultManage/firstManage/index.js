import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Table, Button, message, Modal, TreeSelect } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { serviceTypeMap } from "@/const/config";

const formItemLayout = {
	labelCol: { span: 6 },
	wrapperCol: { span: 18 },
};
const {
	SchemaMarkupForm: SchemaForm,
	SchemaMarkupField: Field,
	useFormTableQuery,
	Submit,
	FormButtonGroup,
	Reset,
	createFormActions,
} = uForm;
const firstArr = [];
for (let i = 1; i <= 10; i++) {
	firstArr.push({ label: i + "级", value: i });
}
export default function FirstManage(props) {
	const [regionList, setRegionList] = useState([]);
	const [consultScopeList, setConsultScopeList] = useState([]);
	const [industryList, setIndustryList] = useState([]);
	const [total, setTotal] = useState(0);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [regionMap, setRegionMap] = useState({});
	const columns = [
		{
			title: "优先级",
			dataIndex: "priority",
			ellipsis: true,
			align: "center",
		},
		{
			title: "专家&机构名称",
			dataIndex: "name",
			ellipsis: true,
			align: "center",
		},
		{
			title: "咨询范围",
			dataIndex: "_range",
			ellipsis: true,
			align: "center",
		},
		{
			title: "在线咨询服务地区",
			ellipsis: true,
			align: "center",
			dataIndex: "_onlineChatLocation",
			render(text) {
				let data = "";
				if (Array.isArray(text)) {
					data = getLocation(text);
				}
				return <span>{data}</span>;
			},
		},
		{
			title: "线上咨询服务地区",
			ellipsis: true,
			align: "center",
			dataIndex: "_onlineVideoLocation",
			render(text) {
				let data = "";
				if (Array.isArray(text)) {
					data = getLocation(text);
				}
				return <span>{data}</span>;
			},
		},
		{
			title: "线下咨询服务地区",
			ellipsis: true,
			align: "center",
			dataIndex: "_offlineLocation",
			render(text) {
				let data = "";
				if (Array.isArray(text)) {
					data = getLocation(text);
				}
				return <span>{data}</span>;
			},
		},
		{
			title: "行业",
			dataIndex: "_goodAt",
			ellipsis: true,
			align: "center",
		},
	];
	const actions = createFormActions();

	const getLocation = (list) => {
		let result = [];
		if (Array.isArray(list)) {
			list.forEach((locationCode) => {
				if (regionMap[locationCode]) {
					result.push(regionMap[locationCode].name);
				}
			});
		}
		return result.join(",");
	};

	const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
		setSelectedRowKeys([]);
		let classifyIdList = [];
		if (values.consultScopeList) {
			classifyIdList = classifyIdList.concat(values.consultScopeList);
		}
		if (values.industryList) {
			classifyIdList = classifyIdList.concat(values.industryList);
		}
		const data = await get({
			url: Api.expertServiceListForPriority,
			params: {
				pageSize: pagination.pageSize,
				pageIndex: pagination.current,
				name: values.name,
				locationList:
					(values.locationList && values.locationList.join(",")) || undefined,
				classifyIdList: classifyIdList.join(","),
				priorityList: values.priorityList
					? values.priorityList.join(",")
					: undefined,
			},
		});
		data.data.list.forEach((item) => {
			item._range = getClassifyType(item.classifyList, "0")
				.map((item) => item.name)
				.join(","); //行业
			item._goodAt = getClassifyType(item.classifyList, "1")
				.map((item) => item.name)
				.join(","); // 擅长行业
			if (Array.isArray(item.serviceWayList)) {
				item.serviceWayList.forEach((serviceWayItem) => {
					switch (serviceWayItem.serviceWay) {
						case serviceTypeMap.ONLINE_VIDEO.id:
							item._onlineVideoLocation = serviceWayItem.locationList;
							break;
						case serviceTypeMap.ONLINE_CHAT.id:
							item._onlineChatLocation = serviceWayItem.locationList;
							break;
						case serviceTypeMap.OFFLINE.id:
							item._offlineLocation = serviceWayItem.locationList;
							break;
						default:
							break;
					}
				});
			}
		});
		setTotal(data.data.total);
		return {
			dataSource: data.data.list,
			pageSize: data.data.pageSize,
			total: data.data.total,
			current: data.data.pageIndex,
		};
	};

	const { form, table, trigger } = useFormTableQuery(service, {
		pagination: { pageSize: 10 },
	});

	function getClassifyType(list, type) {
		let result = [];
		list.forEach((item) => {
			if (item.type === type) {
				result = item.list;
			}
		});
		return result;
	}

	const getTreeDate = async () => {
		let map = {
			0: (list, map) => {
				setConsultScopeList(list);
			},
			1: (list, map) => {
				setIndustryList(list);
			},
			2: (list, map) => {
				setRegionList(list);
				setRegionMap(map);
			},
		};

		function walk(arr, obj, type) {
			arr.forEach((item) => {
				obj[item.code] = item;
				item.label = item.name;
				item.value = type == 2 ? item.code : item.id;
				Array.isArray(item.children) && walk(item.children, obj, type);
			});
		}

		const res = await get(Api.classifyExpertTaxList);
		if (res.success) {
			const data = res.data;
			Array.isArray(data) &&
				data.forEach((item) => {
					const func = map[item.type];
					if (func) {
						let obj = {};
						Array.isArray(item.list) && walk(item.list, obj, item.type);
						func(item.list, obj);
					}
				});
		} else {
			message.error(res.message);
		}
	};
	const editHandler = () => {
		if (selectedRowKeys.length === 0) {
			message.error("至少选择一条数据");
		} else {
			setShowModal(true);
		}
	};
	const okHandler = () => {
		actions.submit().then(async (values) => {
			const data = await post({
				url: Api.batchUpdatePriority,
				data: {
					idList: selectedRowKeys,
					priority: values.values ? values.values.priority : undefined,
				},
			});
			if (data.success) {
				message.success("修改成功");
				setShowModal(false);
				trigger();
			} else {
				message.error(data.message);
			}
		});
	};
	useEffect(() => {
		getTreeDate();
	}, []);
	return (
		<div className="first-manage">
			<SchemaForm {...form} inline className="form-wrap">
				<Field
					type="string"
					title="优先级"
					name="priorityList"
					x-component="Select"
					x-component-props={{
						placeholder: "请选择优先级",
						dataSource: firstArr,
						mode: "multiple",
					}}
				/>
				<Field
					type="string"
					title="专家&机构名称"
					name="name"
					x-component="Input"
					x-component-props={{ placeholder: "请输入专家&机构名称" }}
				/>
				<Field
					type="string"
					title="行业"
					name="industryList"
					x-component="TreeSelect"
					x-component-props={{
						placeholder: "请选择行业",
						treeData: industryList,
						mode: "multiple",
						maxTagCount: "2",
						maxTagTextLength: "5",
						allowClear: true,
						treeCheckable: true,
						showCheckedStrategy: TreeSelect.SHOW_PARENT,
					}}
				/>
				<Field
					type="string"
					title="地区"
					name="locationList"
					x-component="TreeSelect"
					x-component-props={{
						placeholder: "请选择地区",
						treeData: regionList,
						mode: "multiple",
						maxTagCount: "2",
						maxTagTextLength: "5",
						allowClear: true,
						treeCheckable: true,
						showCheckedStrategy: TreeSelect.SHOW_PARENT,
					}}
				/>
				<Field
					type="string"
					title="咨询范围"
					name="consultScopeList"
					x-component="TreeSelect"
					x-component-props={{
						placeholder: "请选择咨询范围",
						treeData: consultScopeList,
						mode: "multiple",
						maxTagCount: "2",
						maxTagTextLength: "5",
						allowClear: true,
						treeCheckable: true,
						showCheckedStrategy: TreeSelect.SHOW_PARENT,
					}}
				/>
				<FormButtonGroup>
					<Submit style={{ marginRight: 10 }}>查询</Submit>
					<Reset>清空条件</Reset>
				</FormButtonGroup>
			</SchemaForm>
			<div className="total">
				<Button type="primary" onClick={editHandler}>
					修改优先级
				</Button>
				<p className="total-box">共找到符合条件的专家&机构数量：{total}条</p>
			</div>
			<Table
				className="table-wrap"
				{...table}
				columns={columns}
				rowKey={"id"}
				rowSelection={{
					selectedRowKeys: selectedRowKeys,
					onChange(selectedRowKeys) {
						setSelectedRowKeys(selectedRowKeys);
					},
				}}
			/>
			<Modal
				title="批量编辑-专家&机构优先级"
				visible={showModal}
				onCancel={() => {
					setShowModal(false);
				}}
				onOk={okHandler}
			>
				{showModal && (
					<SchemaForm actions={actions}>
						<Field
							type="string"
							title="选择优先级"
							name="priority"
							x-component="Select"
							x-component-props={{
								placeholder: "请选择优先级",
								dataSource: firstArr,
							}}
							x-rules={[{ message: "请选择优先级", required: true }]}
							{...formItemLayout}
						/>
					</SchemaForm>
				)}
			</Modal>
		</div>
	);
}
