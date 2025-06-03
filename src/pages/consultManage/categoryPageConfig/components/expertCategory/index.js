import React, { useState, useEffect } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { message, Modal } from "dpl-react";
import { valueChangeTypeEnum, errorType } from "../../config";
import { previewTypeMap, configTypeMap,classifyTypeEnum } from "@/const/config";
import { olhelpEnumOptionType } from "@/const/config";

import ExpertCategoryComponent from "@/components/consultManage/expertCategoryComponent";

// 默认的banner配置
const defaultBannerObj = {
  imageUrl: null,
  imageName: null,
};
// 默认的banner图个数
const defaultBannerLength = 1;

const defaultPageConfig = {
  bannerImageList: undefined,
  classifyInfo: [],
};

export default function ExpertCategory(props) {
  const [formData, setFormData] = useState(defaultPageConfig); // 表单数据
  const [classifyList, setClassifyList] = useState([]); // 咨询范围列表
  const [professionList, setProfessionList] = useState([]); // 咨询范围列表
  const [areaList, setAreaList] = useState([]); // 咨询地区列表
  const [serviceWaysList, setServiceWaysList] = useState([]); // 咨询范围列表
  const [loading, setLoading] = useState(false); // loading
  const [expertServiceList, setExpertServiceList] = useState([]); // 专家服务分类
  const [sourceData, setSourceData] = useState({}); // 原始数据

  // 获取业务分类，获取全部，在预览是一同使用，避免多次查询
  const getClassificationList = async () => {
    const res = await get({
      url: Api.getClassifyList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      if (data && data.length) {
        let classifyArray = [];
        let areaArray = [];
        let professionArray = [];
        let serviceWaysArray = [];
        data.forEach((item) => {
          switch (item.type) {
            case classifyTypeEnum.classify:
              classifyArray = [].concat(item.list);
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
        setServiceWaysList(serviceWaysArray);
        setAreaList(areaArray);
        setProfessionList(professionArray);
        setClassifyList(classifyArray);
      }
    } else {
      message.error(res.message);
    }
  };

  // 获取专家咨询页面配置
  const getExpertConfig = async () => {
    const res = await get({
      url: Api.getExpertPageConfig,
      params: {
        configType: configTypeMap.default,
      },
    });
    if (res.success) {
      const data = Object.assign({}, res.data);
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
      data.bannerImageList = list;
      setFormData(Object.assign({}, defaultPageConfig, data));
      setSourceData(res.data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取服务类型
   */
  const getExpertServiceTypeList = async () => {
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: olhelpEnumOptionType.ExpertServiceType, // 服务类型
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        if (
          item.groupName === olhelpEnumOptionType.ExpertServiceType &&
          item.options
        ) {
          const list = item.options.filter((item) => {
            return item.id !== classifyTypeEnum.classify;
          });
          setExpertServiceList(list);
        }
      });
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
      case valueChangeTypeEnum.expertClassify:
        obj.classifyInfo.classifyIdList = data;
        break;
      case valueChangeTypeEnum.expertService:
        obj.classifyInfo.classifyTypeList = data;
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
              sourceData.classifyInfo
            ) {
              updateExpertPageConfig(data);
            } else {
              saveExpertPageConfig(data);
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

  const checkData = () => {
    if (
      !formData.classifyInfo.classifyIdList ||
      !formData.classifyInfo.classifyIdList.length
    ) {
      message.warning(errorType.expertClassifyNull);
      return;
    }
    if (
      !formData.classifyInfo.classifyTypeList ||
      !formData.classifyInfo.classifyTypeList.length
    ) {
      message.warning(errorType.expertServiceTypeNull);
      return;
    }
    let result = {
      bannerImageList: null,
      classifyInfo: {},
    };
    let classifyIdList = [];
    let classifyTypeList = [];
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
    for (
      let i = 0, len = formData.classifyInfo.classifyIdList.length;
      i < len;
      i++
    ) {
      const value = formData.classifyInfo.classifyIdList[i];
      if (classifyIdList.indexOf(value) > -1) {
        message.warning(errorType.exportClassifyDouble);
        return;
      } else {
        if (value) {
          classifyIdList.push(value);
        }
      }
    }
    for (
      let i = 0, len = formData.classifyInfo.classifyTypeList.length;
      i < len;
      i++
    ) {
      const value = formData.classifyInfo.classifyTypeList[i];
      if (classifyTypeList.indexOf(value) > -1) {
        message.warning(errorType.exportServiceTypeDouble);
        return;
      } else {
        if (value) {
          classifyTypeList.push(value);
        }
      }
    }
    result.bannerImageList = bannerImageList;
    result.classifyInfo.classifyIdList = classifyIdList;
    result.classifyInfo.classifyTypeList = classifyTypeList;
    return result;
  };

  // 保存配置信息
  const saveExpertPageConfig = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postAddExpertPageConfig,
        data,
      });
      if (res.success) {
        message.success("发布成功！");
        getExpertConfig();
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // 修改配置信息
  const updateExpertPageConfig = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdateExpertPageConfig,
        data,
      });
      if (res.success) {
        message.success("发布成功！");
        getExpertConfig();
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // 初始化方法
  const initFunc = () => {
    getExpertServiceTypeList();
    getClassificationList();
    getExpertConfig();
  };

  const buttonList = [
    {
      name: "发布",
      onClick: publish,
    },
  ];

  useEffect(() => {
    initFunc();
  }, []);

  return (
    <div className="expert-category-box">
      <ExpertCategoryComponent
        formData={formData}
        previewTypeObj={previewTypeMap.expert}
        classifyTypeEnum={classifyTypeEnum}
        areaList={areaList}
        professionList={professionList}
        serviceWaysList={serviceWaysList}
        buttonList={buttonList}
        loading={loading}
        onValueChange={onValueChange}
        bannerChangeType={valueChangeTypeEnum.banner}
        classifyList={classifyList}
        expertClassifyCode={valueChangeTypeEnum.expertClassify}
        expertServiceList={expertServiceList}
        expertServiceCode={valueChangeTypeEnum.expertService}
      />
    </div>
  );
}
