import React, { useState, useEffect } from "react";
import "./index.scss";
import { Tabs } from "dpl-react";
import EntranceConfig from "./components/entranceConfig";
import LandingConfig from "./components/landingConfig";
import { tabPaneMap } from "./config";
import qs from "qs";
import "moment/locale/zh-cn";
const TabPane = Tabs.TabPane;
export default function LandingPageConfig(props) {
	const [tabValue, setTabValue] = useState(() => {
		const data = qs.parse(window.location.href.split("?")[1]);
		return data.tabKey || tabPaneMap.entrance;
	});
	const tabValueChange = (value) => {
		const params = {
			tabKey: value,
		};
		let hash = window.location.hash.split("#")[1];
		hash = hash.split("?")[0];
		window.location.hash = `#${hash}?${qs.stringify(params)}`;
		setTabValue(value);
	};
	return (
		<div className="landing-page-config-box">
			<div className="landing-page-tabs-box">
				<div className="body-box">
					<Tabs activeKey={tabValue} onChange={tabValueChange}>
						<TabPane tab="渠道配置" key={tabPaneMap.entrance}>
							<EntranceConfig isSetData={tabValue === tabPaneMap.entrance} />
						</TabPane>
						<TabPane tab="落地页配置" key={tabPaneMap.landing}>
							<LandingConfig isSetData={tabValue === tabPaneMap.landing} />
						</TabPane>
					</Tabs>
				</div>
			</div>
		</div>
	);
}
