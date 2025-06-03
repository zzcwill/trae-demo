import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import LandingCard from "../../components/landingCard";
import history from "@/history";
import FormEdit from "./components/formEdit";
import {
  olhelpEnumOptionType,
  modelTypeMap,
  modelType,
  landingPageTypeMap,
  landingPageTyp,
  classifyTypeEnum,
} from "@/const/config";
import { message } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import BasicCategory from "./components/basicCategory";
import ExpertCategory from "./components/expertCategory";
import ExpertDetail from "./components/expertDetail";
import OfficialService from "./components/officialService";
import TaxCategory from "./components/taxCategory";
import HomePage from "./components/homePage";
import { tabPaneMap, editTypeMap } from "../../config";
import qs from "qs";
import { useStoreState } from "easy-peasy";
const defaultTitle = "落地页配置";
const stepMap = {
  first: "1",
  second: "2",
};
// 枚举groupName列表
const groupNameList = [
  olhelpEnumOptionType.OfficialServiceType,
  olhelpEnumOptionType.ExpertServiceType,
];
const defaultFormData = {
  type: landingPageTyp.default,
};
const lastDataKeyMap = {
  basicCategoryData: "basicCategoryData",
  expertCategoryData: "expertCategoryData",
  expertDetailData: "expertDetailData",
  officialServiceData: "officialServiceData",
  taxCategoryData: "taxCategoryData",
  homePageData: "homePageData",
  expertDetailServiceData: "expertDetailServiceData",
};
const defaultLastData = {
  [lastDataKeyMap.basicCategoryData]: undefined,
  [lastDataKeyMap.expertCategoryData]: undefined,
  [lastDataKeyMap.expertDetailData]: undefined,
  [lastDataKeyMap.officialServiceData]: undefined,
  [lastDataKeyMap.taxCategoryData]: undefined,
  [lastDataKeyMap.homePageData]: undefined,
  [lastDataKeyMap.expertDetailServiceData]: undefined,
};

export default function LandingPageEdit(props) {
  const [title, setTitle] = useState(defaultTitle);
  const [step, setStep] = useState(stepMap.first); // 步数
  const [formData, setFormData] = useState(defaultFormData); //提交数据
  const [loading, setLoading] = useState(false); // loading
  const [lastData, setLastData] = useState(defaultLastData); // 历史数据保存对象
  const [urlParams, setUrlParams] = useState({}); // url参数信息
  const [serviceTypeList, setServiceTypeList] = useState([]); // 官方服务类型
  const [serviceTypeMap, setServiceTypeMap] = useState({}); // 官方服务map
  const [limitList, setLimitList] = useState([]); // 咨询范围列表
  const [classifyList, setClassifyList] = useState([]); // 咨询范围列表
  const [professionList, setProfessionList] = useState([]); // 咨询范围列表
  const [areaList, setAreaList] = useState([]); // 咨询地区列表
  const [serviceWaysList, setServiceWaysList] = useState([]); // 咨询方式列表
  const [expertServiceList, setExpertServiceList] = useState([]); // 专家服务分类
  const pageInfo = useStoreState(
    (state) => state.consultManageLandingPageConfig.landingConfigPageInfo
  );

  const lastFormData = useRef({}); // 上一次的数据

  /**
   * 获取官方服务类型、专家分类类型
   */
  const getServiceTypeList = async () => {
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: groupNameList.join(","), // 服务类型
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        switch (item.groupName) {
          case olhelpEnumOptionType.OfficialServiceType:
            let obj = {};
            item.options.forEach((item) => {
              obj[item.id] = item;
            });
            setServiceTypeMap(obj);
            setServiceTypeList(item.options);
            break;
          case olhelpEnumOptionType.ExpertServiceType:
            setExpertServiceList(item.options);
            break;
          default:
            break;
        }
      });
    } else {
      message.error(res.message);
    }
  };
  // 获取业务分类，获取全部，在预览是一同使用，避免多次查询
  const getClassificationList = async () => {
    const res = await get({
      url: Api.getClassifyList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      if (data && data.length) {
        let limitArray = [];
        let areaArray = [];
        let professionArray = [];
        let serviceWaysArray = [];
        data.forEach((item) => {
          switch (item.type) {
            case classifyTypeEnum.classify:
              limitArray = [].concat(item.list);
              break;
            case classifyTypeEnum.profession:
              professionArray = [].concat(item.list);
              break;
            case classifyTypeEnum.area:
              areaArray = [].concat(item.list);
              break;
            case classifyTypeEnum.serviceWays:
              serviceWaysArray = [].concat(item.list);
              break;
            default:
              break;
          }
        });
        setServiceWaysList(serviceWaysArray); // 咨询方式
        setAreaList(areaArray); // 地区
        setProfessionList(professionArray); // 行业
        setLimitList(limitArray); // 咨询范围
        setClassifyList(data); // 全部
      }
    } else {
      message.error(res.message);
    }
  };

  // 获取落地页详情
  const getLandingPageConfigDetail = async (id) => {
    try {
      const res = await get({
        url: Api.getLandingPageConfigDetail,
        params: {
          id,
        },
      });
      if (res.success) {
        const data = res.data;
        setFormData(data);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("服务异常，请联系管理员");
    }
  };

  // 取消
  const onCancel = () => {
    history.goBack();
  };

  // 下一步
  const onNextStep = () => {
    setStep(stepMap.second);
  };

  // 上一步
  const onPrevStep = (type, data) => {
    setStep(stepMap.first);
    lastFormData.current = Object.assign({}, formData);
    setLastData(
      Object.assign({}, lastData, {
        [type]: data,
      })
    );
  };

  // 数据改变
  const valueChange = (data, step) => {
    const result = Object.assign({}, formData, {
      ...data,
    });
    setFormData(result);
    if (step === stepMap.first) {
      setTitle(`${defaultTitle}-${modelTypeMap[result.modelType].name}`);
    }
  };

  // 发布落地页
  const onPublish = (data) => {
    const result = Object.assign({}, formData, {
      ...data,
    });
    if (urlParams.id) {
      postUpdateLandingPageConfig(result);
    } else {
      postSaveLandingPageConfig(result);
    }
  };

  // 跳转列表页
  const gotoTablePage = () => {
    history.push(
      `/consultManage/landingPageConfig?tabKey=${tabPaneMap.landing}&pageIndex=${pageInfo.pageIndex}&pageSize=${pageInfo.pageSize}`
    );
  };

  // 新增落地页
  const postSaveLandingPageConfig = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postSaveLandingPageConfig,
        data,
      });
      if (res.success) {
        message.success("新增落地页成功！");
        gotoTablePage();
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("服务异常，请联系管理员");
    }
    setLoading(false);
  };

  // 修改落地页
  const postUpdateLandingPageConfig = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdateLandingPageConfig,
        data,
      });
      if (res.success) {
        message.success("修改落地页成功！");
        gotoTablePage();
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("服务异常，请联系管理员");
    }
    setLoading(false);
  };

  // 编辑页面render方法
  const editModalRender = () => {
    if (formData) {
      switch (formData.modelType) {
        case modelType.basicCategory:
          return (
            <BasicCategory
              serviceTypeList={serviceTypeList}
              serviceTypeMap={serviceTypeMap}
              onPublish={onPublish}
              onCancel={onCancel}
              onPrevStep={(data) => {
                onPrevStep(lastDataKeyMap.basicCategoryData, data);
              }}
              lastData={lastData[lastDataKeyMap.basicCategoryData]}
              loading={loading}
              businessId={urlParams.id}
              type={urlParams.modelType}
              headerType={formData.headerType}
            />
          );
        case modelType.taxCategory:
          return (
            <TaxCategory
              serviceTypeList={serviceTypeList}
              serviceTypeMap={serviceTypeMap}
              onPublish={onPublish}
              onCancel={onCancel}
              lastData={lastData[lastDataKeyMap.taxCategoryData]}
              onPrevStep={(data) => {
                onPrevStep(lastDataKeyMap.taxCategoryData, data);
              }}
              loading={loading}
              businessId={urlParams.id}
              type={urlParams.modelType}
              headerType={formData.headerType}
            />
          );
        case modelType.expertCategory:
          return (
            <ExpertCategory
              classifyList={classifyList}
              classifyTypeEnum={expertServiceList}
              onPublish={onPublish}
              onCancel={onCancel}
              lastData={lastData[lastDataKeyMap.expertCategoryData]}
              onPrevStep={(data) => {
                onPrevStep(lastDataKeyMap.expertCategoryData, data);
              }}
              loading={loading}
              businessId={urlParams.id}
              type={urlParams.modelType}
              headerType={formData.headerType}
            />
          );
        case modelType.expertDetail:
          return (
            <ExpertDetail
              classifyList={limitList}
              professionList={professionList}
              areaList={areaList}
              onPublish={onPublish}
              onCancel={onCancel}
              lastData={lastData[lastDataKeyMap.expertDetailData]}
              onPrevStep={(data) => {
                onPrevStep(lastDataKeyMap.expertDetailData, data);
              }}
              loading={loading}
              businessId={urlParams.id}
              moduleTypeCode={modelType.expertDetail}
              type={urlParams.modelType}
              headerType={formData.headerType}
            />
          );
        case modelType.officialService:
          return (
            <OfficialService
              serviceTypeList={serviceTypeList}
              serviceTypeMap={serviceTypeMap}
              onPublish={onPublish}
              onCancel={onCancel}
              lastData={lastData[lastDataKeyMap.officialServiceData]}
              onPrevStep={(data) => {
                onPrevStep(lastDataKeyMap.officialServiceData, data);
              }}
              loading={loading}
              businessId={urlParams.id}
              type={urlParams.modelType}
              headerType={formData.headerType}
            />
          );
        case modelType.homePage:
          // 切换分类之后需要将原先的落地页配置页面的jumpBusinessId 清空，因为专属和通用查询不同的落地页
          let sendData = lastData[lastDataKeyMap.homePageData];
          if (
            lastFormData.current.type &&
            lastFormData.current.type != formData.type &&
            sendData.homeModuleInfoList
          ) {
            sendData.homeModuleInfoList = sendData.homeModuleInfoList.map(
              (item) => {
                item.jumpBusinessId = null;
                return item;
              }
            );
            sendData.bannerImageList = sendData.bannerImageList.map(
              (item) => {
                item.jumpBusinessId = null;
                return item;
              }
            );
          }
          return (
            <HomePage
              onPublish={onPublish}
              onCancel={onCancel}
              lastData={sendData}
              onPrevStep={(data) => {
                onPrevStep(lastDataKeyMap.homePageData, data);
              }}
              landingType={formData.type}
              loading={loading}
              businessId={urlParams.id}
              type={urlParams.modelType}
              headerType={formData.headerType}
            />
          );
        case modelType.expertDetailService:
          return (
            <ExpertDetail
              classifyList={limitList}
              professionList={professionList}
              areaList={areaList}
              onPublish={onPublish}
              onCancel={onCancel}
              lastData={lastData[lastDataKeyMap.expertDetailServiceData]}
              onPrevStep={(data) => {
                onPrevStep(lastDataKeyMap.expertDetailServiceData, data);
              }}
              loading={loading}
              businessId={urlParams.id}
              moduleTypeCode={modelType.expertDetailService}
              type={urlParams.modelType}
            />
          );
        default:
          return;
      }
    }
  };

  const initFunc = () => {
    getServiceTypeList();
    getClassificationList();
  };

  useEffect(() => {
    initFunc();
    const data = qs.parse(window.location.href.split("?")[1]);
    if (data.id) {
      setUrlParams(data);
      getLandingPageConfigDetail(data.id);
    }
  }, []);
  return (
    <div className="landing-page-edit-box">
      <LandingCard title={title}>
        {step === stepMap.first && (
          <div className="landing-page-edit-form">
            <FormEdit
              onCancel={onCancel}
              formData={formData}
              onChange={(value) => {
                valueChange(value, stepMap.first);
              }}
              type={urlParams.id ? editTypeMap.edit : editTypeMap.add}
              onNextStep={onNextStep}
            />
          </div>
        )}
        {step === stepMap.second && (
          <div className="landing-page-edit-model">{editModalRender()}</div>
        )}
      </LandingCard>
    </div>
  );
}
