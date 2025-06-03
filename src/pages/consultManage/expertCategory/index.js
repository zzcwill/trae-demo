import React from "react";
import "./index.scss";
import { Tabs } from "dpl-react";
import ConsultScope from "./component/consultScope";
import Profession from "./component/profession";
import Category from "./component/category";

const TabPane = Tabs.TabPane;
export default function ExpertCategory(props) {
    return (
        <div className="expert-category-manage">
            <Tabs defaultActiveKey="1">
                <TabPane tab="咨询范围" key="1">
                    <ConsultScope />
                </TabPane>
                <TabPane tab="擅长行业" key="2">
                    <Profession />
                </TabPane>
                <TabPane tab="擅长领域" key="11">
                    <Category />
                </TabPane>
            </Tabs>
        </div>
    );
}
