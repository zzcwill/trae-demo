import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import classnames from "classnames";
import OnlineChatServiceDateItem from "../onlineChatServiceDateItem";
import { valueEnum } from "../../config";
import { Button } from "dpl-react";

const defaultConfig = {
    [valueEnum.locationList]: undefined,
    [valueEnum.serviceDateBegin]: undefined,
    [valueEnum.serviceDateEnd]: undefined,
    [valueEnum.serviceTimeBegin]: undefined,
    [valueEnum.serviceTimeEnd]: undefined,
};

function OnlineChatServiceDate(props) {
    const {
        value,
        onChange,
        areaList = [],
        className,
        style,
        disabled,
    } = props;
    const [list, setList] = useState([]); // 列表
    const [configValue, setConfigValue] = useState([]);
    const valueDataRef = useRef(null);
    const bodyClassName = classnames({
        "online-chat-service-date": true,
        [className]: className,
    });

    const valueOnChange = (data, index) => {
        let list = [].concat(value);
        list[index] = data;
        onChange && onChange(list);
    };

    const deleteOnlineChatServiceDateItem = (e, index) => {
        let list = [].concat(value);
        list.splice(index, 1);
        onChange && onChange(list);
    };

    const addOnlineChatServiceDateItem = (e) => {
        let list = value ? [].concat(value) : [];
        list.push({
            ...defaultConfig,
        });
        setConfigValue(list);
        onChange && onChange(list);
    };

    useEffect(() => {
        valueDataRef.current = value;
        setConfigValue(value);
    }, [value]);

    useEffect(() => {
        if (Array.isArray(areaList) && Array.isArray(valueDataRef.current)) {
            let result = [];
            let needUpdate = false;
            let areaListResult = [];
            areaList.forEach((item) => {
                if (areaListResult.indexOf(item.value) < 0) {
                    areaListResult.push(item.value);
                }
            });
            valueDataRef.current.forEach((item) => {
                if (Array.isArray(item.locationList)) {
                    let locationList = [];
                    item.locationList.forEach((location) => {
                        if (areaListResult.indexOf(location) > -1) {
                            locationList.push(location);
                        } else {
                            if (!needUpdate) {
                                needUpdate = true;
                            }
                        }
                    });
                    result.push({
                        ...item,
                        locationList,
                    });
                }
            });
            if (needUpdate) {
                setConfigValue(result);
                onChange && onChange(result);
            }
        }
        setList(areaList);
    }, [areaList]);
    return (
        <div className={bodyClassName} style={style}>
            {Array.isArray(configValue) && configValue.length > 0 && (
                <div className="online-chat-service-date-list">
                    {configValue.map((item, index) => {
                        return (
                            <div className="item-box" key={index}>
                                <OnlineChatServiceDateItem
                                    value={item}
                                    onChange={valueOnChange}
                                    index={index}
                                    disabled={disabled}
                                    areaList={areaList}
                                />
                                <Button
                                    type="primary-bordered"
                                    onClick={(e) => {
                                        deleteOnlineChatServiceDateItem(
                                            e,
                                            index
                                        );
                                    }}
                                >
                                    删除
                                </Button>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="online-chat-service-date-add">
                <div
                    className="add-text"
                    onClick={addOnlineChatServiceDateItem}
                >
                    + 添加服务时间配置
                </div>
            </div>
        </div>
    );
}

export default OnlineChatServiceDate;
