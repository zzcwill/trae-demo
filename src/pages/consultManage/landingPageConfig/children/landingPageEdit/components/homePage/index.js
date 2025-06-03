import React, { useState, useEffect } from "react";
import { message, Modal } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { valueChangeTypeEnum, validatorList } from "../../../../config";
import HomePageComponent from "@/components/consultManage/homePageComponent";
import {
  configTypeMap,
  modelType,
  buttonSiteMap,
  jumpTypeList,
} from "@/const/config";
import OfficialService
  from "@/pages/consultManage/landingPageConfig/children/landingPageEdit/components/officialService";
// 默认的banner配置
const defaultBannerObj = {
  imageName: null,
  imageUrl: null,
  jumpUrlName: null,
  jumpUrl: null,
  orderNum: null,
  jumpType: jumpTypeList[0].id,
  jumpBusinessId: null,
};
// 默认模块配置
const defaultModuleConfig = {
  location: undefined,
  orderNum: undefined,
  uncheckedImageUrl: undefined,
  checkedImageUrl: undefined,
  jumpType: undefined,
  jumpBusinessId: undefined,
  jumpUrl: undefined,
};
// banner的数量
const defaultBannerLength = 3;
export default function HomePageConfig(props) {
  const {
    onPublish,
    onCancel,
    onPrevStep,
    businessId,
    loading,
    lastData,
    type,
    landingType,
  } = props;
  const [formData, setFormData] = useState({});
  const [landingPageList, setLandingPageList] = useState([]);
  // 获取落地页列表
  const getLandingPageList = async (type) => {
    const res = await get({
      url: Api.getLandingPageList,
      params: {
        type,
      },
    });
    if (res.success) {
      setLandingPageList(res.data);
    } else {
      message.error(res.message);
    }
  };

  // 获取配置信息
  const getConfig = async (businessId) => {
    const res = await get({
      url: Api.getHomePageConfig,
      params: {
        configType:
          businessId || businessId == 0
            ? configTypeMap.landingPage
            : configTypeMap.default,
        businessId,
      },
    });
    if (res.success) {
      let data = Object.assign({}, res.data);
      let list = [];
      if (businessId && data.bannerImageList) {
        for (let i = 0; i < defaultBannerLength; i++) {
          const obj = Object.assign({}, data.bannerImageList[i]);
          if (obj.imageUrl) {
            delete obj.id;
            list.push(obj);
          } else {
            list.push(
              Object.assign({}, defaultBannerObj, {
                orderNum: i + 1,
              })
            );
          }
        }
      } else {
        for (let i = 0; i < defaultBannerLength; i++) {
          list.push(defaultBannerObj);
        }
      }
      data.bannerImageList = list;
      data.homeModuleInfoList = data.moduleInfoList;
      setFormData(data);
    } else {
      message.error(res.message);
    }
  };

  // 发布
  const publish = () => {
    const data = checkData();
    if (!data) {
      return;
    }
    onPublish && onPublish(data);
  };

  // 检查数据
  const checkData = () => {
    let result = {};
    let bannerImageList = [];
    let leftModuleList = [];
    let rightModuleList = [];
    let index = 1;
    for (let i = 0, len = formData.bannerImageList.length; i < len; i++) {
      const item = formData.bannerImageList[i];
      if (i === 0 && !item.imageUrl) {
        message.warning(`Banner图${i + 1}不能为空！`);
        return;
      }
      if (item.imageUrl) {
        if (
          item.jumpType === jumpTypeList[1].id &&
          !item.jumpBusinessId &&
          item.jumpBusinessId != 0
        ) {
          message.warning(
            `Banner图${i + 1}跳转页面类型为落地页时，落地页配置不能为空！`
          );
          return;
        }
        if (
          item.jumpType === jumpTypeList[2].id &&
          !item.jumpUrl &&
          item.jumpUrl != 0
        ) {
          message.warning(
            `Banner图${i + 1}跳转页面类型为外部链接时，外部链接不能为空！`
          );
          return;
        }
        bannerImageList.push({
          imageName: item.imageName,
          imageUrl: item.imageUrl,
          jumpUrlName: undefined,
          jumpUrl:
            item.jumpType === jumpTypeList[2].id
              ? item.jumpUrl && item.jumpUrl.trim()
              : undefined,
          orderNum: index,
          jumpType: item.jumpType,
          jumpBusinessId:
            item.jumpType === jumpTypeList[1].id
              ? item.jumpBusinessId
              : undefined,
        });
        index++;
      }
    }
    for (
      let j = 0, configLen = formData.homeModuleInfoList.length;
      j < configLen;
      j++
    ) {
      const data = formData.homeModuleInfoList[j];
      for (
        let index = 0, length = validatorList.length;
        index < length;
        index++
      ) {
        const item = validatorList[index];
        const isSuccess = item.checkFunc(data[item.key], data);
        if (!isSuccess) {
          message.warning(`模块配置${j + 1}${item.message}`);
          return;
        }
      }
      if (data.location == "1") {
        rightModuleList.push(data);
      } else {
        leftModuleList.push(data);
      }
    }
    if (rightModuleList.length < 1 || leftModuleList.length < 1) {
      message.warning(`页面至少需要配置1个中间模块和1个右侧模块`);
      return;
    }
    result.bannerImageList = bannerImageList;
    result.homeModuleInfoList = [].concat(rightModuleList, leftModuleList);
    return result;
  };

  // 数据改变
  const onValueChange = (type, data) => {
    let obj = Object.assign({}, formData);
    switch (type) {
      case valueChangeTypeEnum.banner:
        let bannerImageList = [].concat(obj.bannerImageList);
        bannerImageList[data.index] = data.value;
        obj.bannerImageList = bannerImageList;
        break;
      case valueChangeTypeEnum.homePageModule:
        let homeModuleInfoList = [].concat(obj.homeModuleInfoList);
        homeModuleInfoList[data.index] = data.value;
        obj.homeModuleInfoList = homeModuleInfoList;
        break;
      case valueChangeTypeEnum.homePageModuleDelete:
        obj.homeModuleInfoList.splice(data.index, 1);
        break;
      default:
        break;
    }
    setFormData(obj);
  };
  const buttonList = [
    {
      name: "发布落地页",
      onClick: publish,
      type: "primary",
    },
    {
      name: "上一步",
      onClick: () => {
        onPrevStep(formData);
      },
      type: "primary",
    },
    {
      name: "取消",
      onClick: onCancel,
    },
  ];

  useEffect(() => {
    getLandingPageList(landingType);
  }, [landingType]);

  useEffect(() => {
    if (lastData) {
      setFormData(lastData);
    } else {
      if (businessId && type === modelType.homePage) {
        getConfig(businessId);
      } else {
        let data = {};
        let list = [];
        for (let i = 0; i < defaultBannerLength; i++) {
          list.push(defaultBannerObj);
        }
        data.bannerImageList = list;
        data.homeModuleInfoList = [defaultModuleConfig];
        setFormData(data);
      }
    }
  }, []);

  return (
    <div className="home-page-box">
      <HomePageComponent
        loading={loading}
        formData={formData}
        landingType={landingType}
        buttonList={buttonList}
        landingPageList={landingPageList}
        valueChangeTypeEnum={valueChangeTypeEnum}
        onValueChange={onValueChange}
        buttonSite={buttonSiteMap.bottom}
        defaultModuleConfig={defaultModuleConfig}
        headerType={props.headerType}
      />
    </div>
  );
}
