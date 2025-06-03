import React, { useState, useEffect } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { message, Modal } from "dpl-react";
import { modelType } from "@/const/config";
import { valueChangeTypeEnum, errorType } from "../../../../config";
import { previewTypeMap, buttonSiteMap } from "@/const/config";
import ExpertCategoryComponent from "@/components/consultManage/expertCategoryComponent";
import TaxCategory from "@/pages/consultManage/landingPageConfig/children/landingPageEdit/components/taxCategory";

// 默认的banner配置
const defaultBannerObj = {
  imageUrl: null,
  imageName: null,
};
// 默认的banner图个数
const defaultBannerLength = 1;

const defaultPageConfig = {
  bannerImageList: undefined,
  classifyInfoList: [],
};
const defaultClassifyInfoConfig = {
  type: undefined,
  location: undefined,
  name: undefined,
  idList: [],
};

export default function ExpertCategory(props) {
  const {
    classifyList,
    classifyTypeEnum,
    onPublish,
    onCancel,
    onPrevStep,
    businessId,
    loading,
    lastData,
    type,
  } = props;

  const [formData, setFormData] = useState(defaultPageConfig); // 表单数据

  // 获取专家咨询页面配置
  const getExpertConfig = async (businessId) => {
    const res = await get({
      url: Api.getExpertPageConfig,
      params: {
        businessId,
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
      case valueChangeTypeEnum.classifyInfoList:
        obj.classifyInfoList[data.index] = data.value;
        break;
      case valueChangeTypeEnum.classifyInfoListDelete:
        obj.classifyInfoList.splice(data.index, 1);
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
    onPublish && onPublish(data);
  };

  // 校验参数
  const checkData = () => {
    if (!formData.classifyInfoList || !formData.classifyInfoList.length) {
      message.warning(errorType.expertClassifyNull);
      return;
    }
    let result = {
      bannerImageList: null,
      classifyInfoList: [],
    };
    let bannerImageList = [];
    let classifyInfoList = [];
    let locationTypeList = [];
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
    for (let i = 0, len = formData.classifyInfoList.length; i < len; i++) {
      const categoryItem = formData.classifyInfoList[i];
      if (locationTypeList.indexOf(categoryItem.location) > -1) {
        message.warning(
          `第${i + 1}个${errorType.exportClassifyLocationDouble}`
        );
        return;
      }
      let obj = {
        type: categoryItem.type,
        location: categoryItem.location,
        name: categoryItem.name,
        idList: [],
      };
      // 校验筛选栏位置不能为空
      if (!categoryItem.location) {
        message.warning(`第${i + 1}个${errorType.expertClassifyLocationNull}`);
        return;
      }
      // 校验分类类型不能为空
      if (!categoryItem.type) {
        message.warning(`第${i + 1}个${errorType.expertClassifyTypeNull}`);
        return;
      }
      // 校验筛选栏名称不能为空
      if (
        !categoryItem.name ||
        (categoryItem.name && !categoryItem.name.trim())
      ) {
        message.warning(`第${i + 1}个${errorType.expertClassifyNameNull}`);
        return;
      }
      // 校验分类id不能重复
      const idListLength = categoryItem.idList && categoryItem.idList.length;
      if (!idListLength) {
        message.warning(`第${i + 1}个${errorType.expertClassifyIdListNull}`);
        return;
      }
      let classifyIdList = [];
      for (let j = 0; j < idListLength; j++) {
        const value = categoryItem.idList[j];
        if (classifyIdList.indexOf(value) > -1) {
          message.warning(`第${i + 1}个${errorType.exportClassifyDouble}`);
          return;
        } else {
          if (value) {
            classifyIdList.push(value);
          }
        }
      }
      obj.idList = classifyIdList;
      locationTypeList.push(obj.location);
      classifyInfoList.push(obj);
    }
    result.bannerImageList = bannerImageList;
    result.classifyInfoList = classifyInfoList;
    return result;
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
    if (lastData) {
      setFormData(lastData);
    } else {
      if (businessId && type === modelType.expertCategory) {
        getExpertConfig(businessId);
      } else {
        let data = {};
        let list = [];
        for (let i = 0; i < defaultBannerLength; i++) {
          list.push(defaultBannerObj);
        }
        data.bannerImageList = list;
        data.classifyInfoList = [defaultClassifyInfoConfig];
        setFormData(data);
      }
    }
  }, []);

  return (
    <div className="expert-category-box">
      <ExpertCategoryComponent
        formData={formData}
        previewTypeObj={previewTypeMap.expert}
        buttonList={buttonList}
        loading={loading}
        onValueChange={onValueChange}
        bannerChangeType={valueChangeTypeEnum.banner}
        classifyTypeEnum={classifyTypeEnum}
        classifyList={classifyList}
        buttonSite={buttonSiteMap.bottom}
        classifyChangeType={valueChangeTypeEnum.classifyInfoList}
        classifyDeleteType={valueChangeTypeEnum.classifyInfoListDelete}
        defaultClassifyInfoConfig={defaultClassifyInfoConfig}
        headerType={props.headerType}
      />
    </div>
  );
}
