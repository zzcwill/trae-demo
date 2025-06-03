import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import qs from "qs";
import { Button, message, Modal, Tabs } from "dpl-react";
import history from "@/history";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { previewUrl } from "@/const/index";
import { editTypeMap } from "@/const/config";

const TabPane = Tabs.TabPane;
export default function ExpertDetail(props) {
	const [id, setId] = useState(() => {
		const obj = qs.parse(window.location.href.split("?")[1]);
		return obj.id;
	});
	const [detail, setDetail] = useState({});
	const deleteHandler = (id) => {
		Modal.confirm({
			title: "正在执行删除操作",
			content: "删除后的服务将无法恢复，你还要继续吗",
			onOk: async () => {
				const data = await post(Api.expertInstitutionBatchDelete, {
					data: { idList: [id] },
				});
				if (data.success) {
					message.success("删除成功");
					history.push("/consultManage/expertManage");
				} else {
					message.error(data.message);
				}
			},
		});
	};
	const getDetail = async (id) => {
		const data = await get(Api.expertInstitutionDetail, { params: { id } });
		if (data.success) {
			setDetail(data.data);
		}
	};
	const detailIframeRef = useRef(null);
	const cardIframeRef = useRef(null);
	const editHandler = () => {
		const sendData = {
			id,
			type: editTypeMap.edit.code,
		};
		history.push(
			`/consultManage/expertManage/expertAdd?${qs.stringify(sendData)}`
		);
	};
	useEffect(() => {
		if (id) {
			getDetail(id);
		}
	}, [id]);
	return (
		<div className="expert-detail-box">
			<div className="title">
				<div className="title-text">{detail.name}——财税咨询</div>
				<div className="btn-group">
					<Button
						type="primary"
						style={{ marginRight: 10 }}
						onClick={() => {
							editHandler();
						}}
					>
						编辑服务
					</Button>
					{/*  <Button onClick={() => {
                        deleteHandler(id)
                    }}>删除服务</Button>*/}
				</div>
			</div>
			<div className="preview-box">
				<Tabs defaultActiveKey="1">
					<TabPane tab="详情页预览" key="1">
						<iframe
							ref={detailIframeRef}
							src={previewUrl + "expertDetail/preview?" + Date.now()}
							height={500}
							width={"100%"}
							onLoad={(a) => {
								detailIframeRef.current.contentWindow.postMessage(
									{
										type: "expert-detail-preview",
										data: detail,
									},
									"*"
								);
							}}
						/>
					</TabPane>
					<TabPane tab="卡片预览" key="2">
						<iframe
							ref={cardIframeRef}
							src={previewUrl + "expertPage/previewCard"}
							height={400}
							width={"100%"}
							onLoad={(a) => {
								cardIframeRef.current.contentWindow.postMessage(
									{
										type: "expert-page-preview-card",
										data: detail,
									},
									"*"
								);
							}}
						/>
					</TabPane>
				</Tabs>
			</div>
		</div>
	);
}
