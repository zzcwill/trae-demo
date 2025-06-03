import "./index.scss";
import React, { useEffect, useState } from "react";
import classnames from "classnames";
import {
    classifyTypeEnum,
    sceneList,
    subSceneList,
    serviceTypeMap,
} from "@/const/config";
import {
    formatPraiseRate
} from "@/utils/index";


/**
 * 获取场景信息
 * @param {string} target
 */
function getSceneType(target) {
    let value = "";
    sceneList.forEach((item) => {
        if (item.id === target) {
            value = item.showName;
        }
    });
    return value;
}
/**
 * 获取会员还是专项
 * @param {String} target
 */
function getSubSceneType(target) {
    let value = "";
    subSceneList.forEach((item) => {
        if (item.id === target) {
            value = item.showName;
        }
    });
    return value ? `-${value}` : value;
}

export default function ExpertCard(props) {
    const { onClick, data, className } = props;
    const [consultRange, setConsultRange] = useState([]);
    const [professionList, setProfessionList] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    // 支持在线服务才现在在线状态
    const [isShowOnlineStatus, setIsShowOnlineStatus] = useState(false);
    const bodyClass = classnames({
        "expert-card": true,
        [className]: className,
    });
    // 类型样式
    const sceneTypeClass = (scene) => {
        return classnames({
            "expert-scene-type": true,
            [`expert-scene-${String.prototype.toLowerCase.call(scene)}`]: true,
        });
    };

    // const getStatus = (item) => {
    //     const status = item.onlineStatus
    //     const dict = {
    //         "1": {
    //             text: '当前在线',
    //             className:'status-green'
    //         },
    //         "2": {
    //             text: '当前离线',
    //             className:'status-gray'
    //         },
    //         "3": {
    //             text: '繁忙中 ...',
    //             className:'status-orange'
    //         },
    //     }
    //     return dict[status] || {}

    // }
    // 当前在线状态样式
    // const statusClass = (item) => {
    //     return classnames({
    //         "expert-status": true,
    //         [`${getStatus(item).className}`]: true,
    //     });
    // };
    const clickHandler = () => {
        onClick && onClick();
    };

    const formatClassify = (list, maxLength, itemLengthFn, space = 0) => {
        let temp = 0;
        let result = [];
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let itemLength = itemLengthFn(item.name);
            if (temp + itemLength > maxLength) {
                break;
            }
            temp += itemLength + space;
            result.push(item.name);
        }
        return result;
    };
    const init = (classifyList, data) => {
        let map = {}
        if(data.subScene === 'INQUIRY'){
            map = {
                [classifyTypeEnum.inquiryRange]: {
                    format: (list) =>
                        formatClassify(list, 256, (item) => item.length * 12, 12),
                    setFn: setConsultRange,
                },
                [classifyTypeEnum.inquiryProfession]: {
                    format: (list) =>
                        formatClassify(list, 256, (item) => item.length * 12, 12),
                    setFn: setProfessionList,
                },
            };
        }else {
            map = {
                [classifyTypeEnum.classify]: {
                    format: (list) =>
                        formatClassify(list, 256, (item) => item.length * 12, 12),
                    setFn: setConsultRange,
                },
                [classifyTypeEnum.profession]: {
                    format: (list) =>
                        formatClassify(list, 256, (item) => item.length * 12, 12),
                    setFn: setProfessionList,
                },
            };
        }
        classifyList.forEach((item) => {
            let mapItem = map[item.type];
            mapItem && mapItem.setFn(mapItem.format(item.list));
        });
    };

    useEffect(() => {
        if (data) {
            if (data.classifyList) {
                init(data.classifyList, data);
            }
            if (Array.isArray(data.serviceWayList)) {
                let result = [];
                // let isShow = false;
                data.serviceWayList.forEach((item) => {
                    if (serviceTypeMap[item.serviceWay]) {
                        result.push(serviceTypeMap[item.serviceWay].name);
                    }
                    // if (item.serviceWay === "ONLINE_CHAT") {
                    //     isShow = true;
                    // }
                });
                // setIsShowOnlineStatus(isShow);
                setServiceList(result);
            }
        }
    }, [data]);
    return (
        <div className={bodyClass} onClick={clickHandler}>
            <div className="right-view">
                {data.scene && (
                    <div className={sceneTypeClass(data.scene)}>
                        {getSceneType(data.scene)}
                        {getSubSceneType(data.subScene)}
                    </div>
                )}
                {/* 审核通过 && 服务方式支持在线才会显示状态 未审核、审核不通过的放在最前面这期不做 */}
                {/* {data.status == 1 && isShowOnlineStatus && getStatus(data).text && 
                    <div className={statusClass(data)}>
                        {getStatus(data).text}
                    </div>
                } */}
            </div>

            <div className="message">
                <div className="message-left">
                    <img className="header" src={data.headImgUrl} />
                </div>
                <div className="message-right">
                    <div className="base">
                        <div className="name">{data.name}</div>
                    </div>
                    <div className="des">{data.description}</div>
                    <div className="numbers">
                        <div className="left">
                            <div className="label">
                                {formatPraiseRate(data.praiseRate )}
                            </div>
                            <div className="text">好评率</div>
                        </div>
                        <div className="right">
                            <div className="label">{data.consultNum}</div>
                            <div className="text">咨询量</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="category">
                <div className="item fanwei">
                    <div className="label">咨询范围：</div>
                    <div className="content">
                        {consultRange.map((item) => item).join("、")}
                    </div>
                </div>
                <div className="item hangye">
                    <div className="label">擅长行业：</div>
                    <div className="content">
                        {professionList.map((item) => item).join("、")}
                    </div>
                </div>
                <div className="item hangye">
                    <div className="label">服务方式：</div>
                    <div className="content">{serviceList.join("、")}</div>
                </div>
            </div>
        </div>
    );
}
