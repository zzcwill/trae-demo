import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import ModalSelect from "@/components/common/modalSelect";
import classnames from "classnames";
import { Form, Button, message, Select, Radio } from "dpl-react";

function GroupSelect(props) {
    const {
        value,
        onChange,
        className,
        style,
        isShowList = [],
        isShowMap = {},
        groupList = [],
        modalTitle,
        loading = false,
        placeholder = "请选择",
    } = props;
    const [isShow, setIsShow] = useState(undefined); // 是否展示
    const [selectGroupList, setSelectGroupList] = useState([]); // 选择的组信息
    const cacheDataRef = useRef({
        [isShowMap["N"].id]: null,
        [isShowMap["Y"].id]: null,
    }); // 缓存信息
    const bodyClassName = classnames("group-select-box", {
        [className]: className,
    });

    /**
     * 是否展示切换
     */
    const onRadioChange = (e) => {
        const value = e.target.value;
        let sendData = {
            isShow: value,
            groupList: cacheDataRef.current[value] || [],
        };
        updateValue(sendData);
    };

    /**
     * 更新数据
     */
    const updateValue = (obj) => {
        const result = Object.assign({}, value, obj);
        if (result.isShow) {
            cacheDataRef.current[result.isShow] = result.groupList;
        }
        onChange && onChange(result);
    };

    /**
     * 选择组改变
     */
    const onModalSelectChange = (data) => {
        updateValue({
            groupList: data,
        });
    };

    useEffect(() => {
        let isShowData = value.isShow || isShowMap["N"].id;
        let list = value.groupList || [];
        setIsShow(isShowData);
        setSelectGroupList(list);
        cacheDataRef.current[isShowData] = list;
    }, [value]);
    return (
        <div className={bodyClassName}>
            <div className="group-select-radio">
                <Radio.Group
                    disabled={loading}
                    value={isShow}
                    onChange={onRadioChange}
                >
                    {Array.isArray(isShowList) &&
                        isShowList.map((item) => {
                            return (
                                <Radio value={item.id}>
                                    {item.name}运营动作
                                </Radio>
                            );
                        })}
                </Radio.Group>
            </div>
            <div className="group-select-module-select">
                <ModalSelect
                    placeholder={placeholder}
                    disabled={loading}
                    allowClear={true}
                    modalTitle={modalTitle}
                    list={groupList}
                    isShowModalClear={true}
                    value={selectGroupList}
                    onChange={onModalSelectChange}
                    isNeedStringToNumber={true}
                ></ModalSelect>
            </div>
        </div>
    );
}

export default GroupSelect;
