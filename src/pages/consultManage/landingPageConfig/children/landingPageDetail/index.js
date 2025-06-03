/**
 * TODO 这里直接调用的前台的落地页和详情页，如果前台做了登录校验需要修改
 */
import React, {useState, useEffect} from "react";
import "./index.scss";
import qs from "qs";
import {get} from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import {previewTypeMap} from "@/const/config";
import history from "@/history";
import {message, Button} from "dpl-react";
import {previewUrl, preViewPageUrl} from "@/const/index";
import {useStoreState} from "easy-peasy";
import {tabPaneMap} from "../../config";

export default function LandingPageDetail(props) {
    const [urlParams, setUrlParams] = useState(null);
    const [iframeUrl, setIframeUrl] = useState(""); // 链接地址
    const pageInfo = useStoreState(
        (state) => state.consultManageLandingPageConfig.landingConfigPageInfo
    );
    // 取消
    const onCancel = () => {
        history.push(
            `/consultManage/landingPageConfig?tabKey=${tabPaneMap.landing}&pageIndex=${pageInfo.pageIndex}&pageSize=${pageInfo.pageSize}`
        );
    };

    // 编辑
    const onEdit = () => {
        history.push(
            `/consultManage/landingPageConfig/edit?modelType=${urlParams.modelType}&id=${urlParams.id}`
        );
    };

    const getLandingPageExportDetail = async (businessId) => {
        const res = await get({
            url: Api.getLandingPageExportDetail,
            params: {
                businessId,
            },
        });
        if (res.success) {
            const data = res.data;
            let url = `${previewUrl}${
                preViewPageUrl[previewTypeMap.expertDetailGround.type]
            }?id=${data.id}&businessId=${businessId}`;
            setIframeUrl(url);
        } else {
            message.error(res.message);
        }
    };

    // 获取具体的模板详情
    const getModelDetail = (type, businessId) => {
        if (type === previewTypeMap.expertDetailGround.code) {
            getLandingPageExportDetail(businessId);
            return;
        }
        let url = "";
        switch (type) {
            case previewTypeMap.taxGround.code:
                url = `${previewUrl}${
                    preViewPageUrl[previewTypeMap.taxGround.type]
                }?businessId=${businessId}`;
                break;
            case previewTypeMap.basicGround.code:
                url = `${previewUrl}${
                    preViewPageUrl[previewTypeMap.basicGround.type]
                }?businessId=${businessId}`;
                break;
            case previewTypeMap.expertGround.code:
                url = `${previewUrl}${
                    preViewPageUrl[previewTypeMap.expertGround.type]
                }?businessId=${businessId}`;
                break;
            case previewTypeMap.homeGround.code:
                url = `${previewUrl}${
                    preViewPageUrl[previewTypeMap.homeGround.type]
                }?businessId=${businessId}`;
                break;
            default:
                break;
        }
        setIframeUrl(url);
    };

    const buttonList = [
        {
            name: "编辑落地页",
            onClick: onEdit,
            type: "primary",
        },
        {
            name: "取消",
            onClick: onCancel,
        },
    ];

    useEffect(() => {
        const data = qs.parse(window.location.href.split("?")[1]);
        if (data.id && data.modelType) {
            setUrlParams(data);
            getModelDetail(data.modelType, data.id);
        }
    }, []);
    return (
        <div className="landing-page-detail-box">
            <div className="button-box">
                {buttonList &&
                buttonList.length > 0 &&
                buttonList.map((item, index) => {
                    return (
                        <>
                            <Button
                                className="button-item"
                                key={item.name}
                                type={item.type}
                                onClick={() => {
                                    item.onClick();
                                }}
                            >
                                {item.name}
                            </Button>
                            {index < buttonList.length - 1 && (
                                <div className="line-box"></div>
                            )}
                        </>
                    );
                })}
            </div>
            {iframeUrl && (
                <div className="iframe-ground-box">
                    <iframe
                        title="亿企咨询"
                        src={iframeUrl + '&headerType=' + urlParams.headerType}
                        height={"100%"}
                        width={"100%"}
                    />
                </div>
            )}
        </div>
    );
}
