/**
 * TODO 2020年8月27日去除了路由，ExpertCategory组件调整
 */
import React, { useEffect, useState } from "react";
import "./index.scss";
import { Tabs, message } from "dpl-react";
import ExpertCategory from "./components/expertCategory";
import BasicCategory from "./components/basicCategory";
import TaxCategory from "./components/taxCategory";
import { get } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { olhelpEnumOptionType } from "@/const/config";
const TabPane = Tabs.TabPane;
const tabsPageConfig = [
  {
    name: "专家财税分类页",
    component: ExpertCategory,
    key: "expert",
  },
  {
    name: "基础财税分类页",
    component: BasicCategory,
    key: "basic",
  },
  {
    name: "办税咨询分类页",
    component: TaxCategory,
    key: "tax",
  },
];

export default function CategoryPageConfig(props) {
  const [serviceTypeList, setServiceTypeList] = useState([]);
  const [serviceTypeMap, setServiceTypeMap] = useState({});
  /**
   * 获取服务类型
   */
  const getServiceTypeList = async () => {
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: olhelpEnumOptionType.OfficialServiceType, // 服务类型
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        if (
          item.groupName === olhelpEnumOptionType.OfficialServiceType &&
          item.options
        ) {
          let obj = {};
          item.options.forEach((item) => {
            obj[item.id] = item;
          });
          setServiceTypeMap(obj);
          setServiceTypeList(item.options);
        }
      });
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    getServiceTypeList();
  }, []);
  return (
    <div className="category-page-config-box">
      <Tabs defaultActiveKey={tabsPageConfig[0].key}>
        {/* <Tabs defaultActiveKey={"basic"}> */}
        {tabsPageConfig.map((item) => {
          return (
            <TabPane tab={item.name} key={item.key}>
              <item.component
                serviceTypeList={serviceTypeList}
                serviceTypeMap={serviceTypeMap}
              />
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}
