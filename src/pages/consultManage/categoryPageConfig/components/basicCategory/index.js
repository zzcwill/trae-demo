import React, { useState, useEffect } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { message, Modal } from "dpl-react";
import { valueChangeTypeEnum, officialType, errorType } from "../../config";
import { previewTypeMap,configTypeMap } from "@/const/config";

import OfficialServiceCategory from "@/components/consultManage/officialServiceCategory";

// 默认的banner配置
const defaultBannerObj = {
  imageUrl: null,
  imageName: null,
};
// 默认的banner图个数
const defaultBannerLength = 1;

export default function BasicCategory(props) {
  const { serviceTypeList, serviceTypeMap } = props;
  const [formData, setFormData] = useState({}); // 表单数据
  const [loading, setLoading] = useState(false); // loading
  const [sourceData, setSourceData] = useState({}); // 原始数据

  const officialServiceListChange = (from, to) => {
    const resultList = [].concat(formData.officialServiceList);
    const swapData = resultList[from];
    resultList[from] = resultList[to];
    resultList[to] = swapData;
    const obj = Object.assign({}, formData);
    obj.officialServiceList = resultList;
    setFormData(obj);
  };

  // 获取专家咨询页面配置
  const getBasicPageConfig = async () => {
    const res = await get({
      url: Api.getOfficialServicePageConfig,
      params: {
        pageType: officialType.basicPage, // 页面类型（1：基础财税分类页；2：办税咨询分类页）
        configType: configTypeMap.default, 
      },
    });
    if (res.success) {
      let data = Object.assign({}, res.data);
      let list = [];
      if (data.bannerImageList) {
        for (let i = 0; i < defaultBannerLength; i++) {
          const obj = data.bannerImageList[i];
          if (obj) {
            list.push(obj);
          } else {
            list.push(defaultBannerObj);
          }
        }
      } else {
        for (let i = 0; i < defaultBannerLength; i++) {
          list.push(defaultBannerObj);
        }
      }
      // if (Array.isArray(data.classifyInfo.expertClassifyList)) {
      //   let classifyList = [];
      //   data.expertClassifyList.forEach((item) => {
      //     classifyList.push(item);
      //   });
      //   data.expertClassifyList = classifyList;
      // }
      // if (Array.isArray(data.classifyInfo.expertClassifyList)) {
      //   let serviceList = [];
      //   data.expertServiceList.forEach((item) => {
      //     serviceList.push(item);
      //   });
      //   data.expertServiceList = serviceList;
      // }
      data.bannerImageList = list;
      setFormData(data);
      setSourceData(res.data);
    } else {
      message.error(res.message);
    }
  };
  // 数据修改
  const onValueChange = (type, data) => {
    let obj = Object.assign({}, formData);
    switch (type) {
      case valueChangeTypeEnum.banner:
        let bannerImageList = [].concat(obj.bannerImageList);
        bannerImageList[data.index] = data.value;
        obj.bannerImageList = bannerImageList;
        break;
      case valueChangeTypeEnum.officialServiceClassifyDelete:
        let officialServiceList = [].concat(formData.officialServiceList);
        officialServiceList.splice(data.index, 1);
        obj.officialServiceList = officialServiceList;
        break;
      case valueChangeTypeEnum.officialServiceClassify:
        let list = [].concat(formData.officialServiceList, data);
        obj.officialServiceList = list;
        break;
      default:
        break;
    }
    setFormData(obj);
  };

  // 发布
  const publish = () => {
    const data = checkData();
    if (!data) {
      return;
    }
    Modal.confirm({
      title: (
        <div style={{ paddingLeft: "50px" }}>
          <p>
            <span>正在将编辑后的主页发布到生产环境</span>
          </p>
          <span style={{ color: "#D9001B" }}>该操作将会对用户产生影响</span>
          <p>
            <span style={{ color: "#999999" }}>你还要继续吗？</span>
          </p>
        </div>
      ),
      okText: "确认",
      cancelText: "取消",
      wait: true,
      onOk: () => {
        return new Promise((resolve) => {
          try {
            if (
              sourceData.bannerImageList.length > 0 ||
              sourceData.officialServiceList.length > 0
            ) {
              updateBasicCategoryPageConfig(data);
            } else {
              saveBasicCategoryPageConfig(data);
            }
            resolve();
          } catch (e) {
            console.error(e);
            message.error("系统出错请联系管理员！");
            resolve();
          }
        });
      },
    });
  };

  // 数据检查
  const checkData = () => {
    if (!formData.officialServiceList || !formData.officialServiceList.length) {
      message.warning(errorType.officialServiceNull);
      return;
    }
    let result = {
      pageType: officialType.basicPage,
    };
    let officialServiceList = [];
    let bannerImageList = [];
    for (let i = 0, len = formData.bannerImageList.length; i < len; i++) {
      const item = formData.bannerImageList[i];
      if (!item.imageUrl) {
        message.warning(errorType.banner);
        return;
      }
      bannerImageList.push({
        imageName: item.imageName,
        imageUrl: item.imageUrl,
        orderNum: i + 1,
      });
    }
    for (let i = 0, len = formData.officialServiceList.length; i < len; i++) {
      const item = formData.officialServiceList[i];
      if (officialServiceList.indexOf(item.id) > -1) {
        message.warning(item.name + errorType.nameDouble);
        return;
      }
      officialServiceList.push(item.id);
    }
    result.bannerImageList = bannerImageList;
    result.serviceIdList = officialServiceList;
    return result;
  };

  // 修改配置信息
  const updateBasicCategoryPageConfig = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdateOfficialServicePageConfig,
        data,
      });
      if (res.success) {
        message.success("发布成功！");
        getBasicPageConfig();
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // 保存配置信息
  const saveBasicCategoryPageConfig = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postAddOfficialServicePageConfig,
        data,
      });
      if (res.success) {
        message.success("发布成功！");
        getBasicPageConfig();
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const buttonList = [
    {
      name: "发布",
      onClick: publish,
    },
  ];

  useEffect(() => {
    getBasicPageConfig();
  }, []);

  return (
    <div className="basic-category-box">
      <OfficialServiceCategory
        formData={formData}
        onValueChange={onValueChange}
        loading={loading}
        bannerChangeType={valueChangeTypeEnum.banner}
        officialServiceChangeType={valueChangeTypeEnum.officialServiceClassify}
        officialServiceDeleteType={
          valueChangeTypeEnum.officialServiceClassifyDelete
        }
        officialServiceListChange={officialServiceListChange}
        officialTypeCode={officialType.basic}
        previewTypeObj={previewTypeMap.basic}
        serviceTypeMap={serviceTypeMap}
        serviceTypeList={serviceTypeList}
        buttonList={buttonList}
      />
    </div>
  );
}
