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
	const { onEditHandler } = props;
	const [id, setId] = useState(() => {
		const obj = qs.parse(window.location.href.split("?")[1]);
		return obj.expertId;
	});
	const [detail, setDetail] = useState({});
	const locationRef = useRef(null);
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
			expertId: id,
			location: locationRef.current,
		};
		onEditHandler && onEditHandler(sendData);
	};

	useEffect(() => {
		const obj = qs.parse(window.location.href.split("?")[1]);
		locationRef.current = obj.location;
	}, []);
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
