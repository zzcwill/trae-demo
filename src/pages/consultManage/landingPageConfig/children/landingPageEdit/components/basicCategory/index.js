import React, {useState, useEffect} from "react";
import "./index.scss";
import {get, post} from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import {modelType} from "@/const/config";
import {message, Modal} from "dpl-react";
import {
    valueChangeTypeEnum,
    officialType,
    errorType,
} from "../../../../config";
import {previewTypeMap, buttonSiteMap, configTypeMap} from "@/const/config";

import OfficialServiceCategory from "@/components/consultManage/officialServiceCategory";

// 默认的banner配置
const defaultBannerObj = {
    imageUrl: null,
    imageName: null,
};
// 默认的banner图个数
const defaultBannerLength = 1;

export default function BasicCategory(props) {
    const {
        serviceTypeList,
        serviceTypeMap,
        onPublish,
        onCancel,
        onPrevStep,
        businessId,
        loading,
        lastData,
        type,
    } = props;
    const [formData, setFormData] = useState({}); // 表单数据
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
    const getBasicPageConfig = async (businessId) => {
        const res = await get({
            url: Api.getOfficialServicePageConfig,
            params: {
                pageType: officialType.basicPage, // 页面类型（1：基础财税分类页；2：办税咨询分类页）
                configType: configTypeMap.landingPage,
                businessId,
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
            data.bannerImageList = list;
            setFormData(data);
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
        onPublish && onPublish(data);
    };

    // 数据检查
    const checkData = () => {
        if (!formData.officialServiceList || !formData.officialServiceList.length) {
            message.warning(errorType.officialServiceNull);
            return;
        }
        let result = {};
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
            if (businessId && type === modelType.basicCategory) {
                getBasicPageConfig(businessId);
            } else {
                let data = {};
                let list = [];
                for (let i = 0; i < defaultBannerLength; i++) {
                    list.push(defaultBannerObj);
                }
                data.bannerImageList = list;
                data.officialServiceList = [];
                setFormData(data);
            }
        }
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
                buttonSite={buttonSiteMap.bottom}
                showDescription={false}
                showName={true}
                showBrand={true}
                headerType={props.headerType}
            />
        </div>
    );
}
