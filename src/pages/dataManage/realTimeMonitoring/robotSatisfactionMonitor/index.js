import React, { useState, useEffect, useRef } from "react";
import { Button, message, Loading } from "dpl-react";
import { get } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import Category from "./components/category";
import "./index.scss";
import { uForm } from "dora";
import BusinessBrand from "./components/businessBrand";
const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    useFormTableQuery,
    Submit,
    FormButtonGroup,
    Reset,
    createFormActions,
} = uForm;
const actions = createFormActions();
const examplesList = [
    {
        color: "#60ACFC",
        name: "评价量",
    },
    {
        color: "#FA806D",
        name: "不满意数",
    },
    {
        color: " #FEB64D",
        name: "满意数",
    },
    {
        color: "#5BC49F",
        name: "非常满意数",
    },
];
const wdListInfo = ["location", "usertype"];
const defaultData = {
    brandInfo: {
        brandType: "all",
        brandValues: undefined,
    },
    usertypes: undefined,
    locations: undefined,
};

/**
 * 不是null或undefined
 * @param {*} data
 * @param {*} key
 * @returns
 */
function isNotNullOrUndefined(data, key) {
    if (data?.[key] || data[key] === 0) {
        return true;
    }
    return false;
}

/**
 * 是否是Y
 */
function isY(data) {
    return data === "Y";
}
export default function RobotSatisfactionMonitor() {
    const [list, setList] = useState([]); // 国税展示的数据
    const [loading, setLoading] = useState(false); // loading
    const [businessTree, setBusinessTree] = useState([]);
    const [userTypeList, setUserTypeList] = useState([]); // 会员等级列表
    const [locationList, setLocationList] = useState([]); // 地区信息
    const listDomRef = useRef(null);

    /**
     * 获取满意度情况
     */
    const getStatistics = async (params) => {
        // 整体loading
        setLoading(true);
        const res = await get({
            url: Api.getStatistics,
            params,
        });
        if (res.success) {
            const data = res.data;
            let result = [];
            data.forEach((item) => {
                result = result.concat(item.statsList);
            });
            result = initEchartsData(result, "");
            setList(result);
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };

    /**
     * 格式化数据
     */
    const initEchartsData = (data, str) => {
        const lineNum = Math.floor((listDomRef.current.clientWidth - 20) / 220);
        const len = lineNum - (data.length % lineNum);
        let list = data.map((item, index) => {
            return {
                key: new Date().getTime().toString() + str + index,
                title: item.locationName,
                status: item.alarm,
                label: formatList(Object.keys(item.intervalData)),
                data: [
                    {
                        product: "近" + item.interval + "分钟",
                        ...item.intervalData,
                    },
                    {
                        product: "当天",
                        ...item.dailyData,
                    },
                ],
            };
        });
        for (let i = 0; i < len; i++) {
            list.push({
                key: new Date().getTime().toString() + str + "extra" + i,
                type: "extra",
                title: "",
                status: "N",
                label: [],
                data: [],
            });
        }
        return list;
    };

    const formatList = (keys) => {
        let list = [];
        keys.forEach((item) => {
            if (list !== "total") {
                list.push(item);
            }
        });
        list.unshift("total");
        return list;
    };

    /**
     * 获取业务类型
     */
    const getBusinessTypeList = async (params = {}) => {
        try {
            const res = await get({
                url: Api.getBrandTypeList,
                params,
            });
            if (res.success) {
                const data = res.data;
                if (Array.isArray(data.list)) {
                    data.list.forEach((item = {}) => {
                        Object.assign(item, {
                            label: item?.name,
                            value: item?.id,
                        });
                    });
                }
                return res;
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
        return {};
    };

    /**
     * 获取产品维度
     */
    const getBrandList = async (
        params = {
            status: "Y",
        }
    ) => {
        try {
            const res = await get({
                url: Api.getBrandList,
                params,
            });
            if (res.success) {
                const data = res.data;
                if (Array.isArray(data.list)) {
                    data.list.forEach((item = {}) => {
                        Object.assign(item, {
                            label: item?.name,
                            value: item?.value,
                        });
                    });
                }
                return res;
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
        return {};
    };

    /**
     * 获取业务类型和产品维度树
     */
    const getBusinessTree = async () => {
        const [businessData = {}, brandData = {}] = await Promise.all([
            getBusinessTypeList(),
            getBrandList(),
        ]);
        let result = [];
        let businessMapFromBrand = {}; // 业务类型下的产品维度列表
        if (Array.isArray(brandData?.data?.list)) {
            brandData.data.list.forEach((brand) => {
                if (
                    isNotNullOrUndefined(brand, "brandTypeId") &&
                    isY(brand.status)
                ) {
                    if (businessMapFromBrand[brand.brandTypeId]) {
                        businessMapFromBrand[brand.brandTypeId].push(brand);
                    } else {
                        businessMapFromBrand[brand.brandTypeId] = [].concat(
                            brand
                        );
                    }
                }
            });
        }
        if (businessData?.data?.list && Array.isArray(businessData.data.list)) {
            businessData.data.list.forEach((business) => {
                if (business?.id || business.id === 0) {
                    if (businessMapFromBrand[business.id]) {
                        result.push({
                            ...business,
                            children: businessMapFromBrand[business.id] || [],
                        });
                    }
                }
            });
        }
        setBusinessTree(result);
    };

    // 获取维度、地区、用户等级列表
    const getWdList = async () => {
        try {
            const map = {
                [wdListInfo[0]]: (list, map) => {
                    setLocationList(list);
                },
                [wdListInfo[1]]: (list, map) => {
                    setUserTypeList(list);
                },
            };
            const res = await get({
                url: Api.getWdList,
            });
            if (res.success) {
                const data = res.data;
                if (data) {
                    Object.keys(data).forEach((key) => {
                        if (
                            wdListInfo.indexOf(key) > -1 &&
                            Array.isArray(data[key])
                        ) {
                            const func = map[key];
                            if (func) {
                                let obj = {};
                                let optionsList = [];
                                data[key].forEach((item) => {
                                    obj[item.id] = item.name;
                                    optionsList.push({
                                        label: item.name,
                                        value: item.id,
                                    });
                                });
                                func(optionsList, obj);
                            }
                        }
                    });
                }
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 查询
     */
    const confirmHandler = () => {
        actions.submit().then(({ values }) => {
            let sendData = {
                usertypes: values?.usertypes?.join(","),
                locations: values?.locations?.join(","),
            };
            if (values?.brandInfo) {
                sendData.brandType =
                    values.brandInfo.brandType !== "all"
                        ? values.brandInfo.brandType
                        : undefined;
                sendData.brandValues = values.brandInfo.brandValues?.join(",");
            }
            getStatistics(sendData);
        });
    };

    /**
     * 清空
     */
    const resetHandler = () => {
        actions.reset();
    };

    /**
     * 初始化
     */
    const init = () => {
        getBusinessTree();
        getStatistics();
        getWdList();
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="satisfaction-monitor">
            <SchemaForm
                actions={actions}
                inline
                className="form-wrap"
                components={{
                    BusinessBrand,
                }}
                initialValues={defaultData}
            >
                <Field
                    type="string"
                    title="产品维度"
                    name="brandInfo"
                    x-component="BusinessBrand"
                    x-component-props={{
                        options: businessTree,
                        style: {
                            width: 400,
                        },
                    }}
                />
                <Field
                    type="string"
                    title="会员等级"
                    name="usertypes"
                    x-component="Select"
                    x-component-props={{
                        placeholder: "请选择会员等级",
                        allowClear: true,
                        dataSource: userTypeList,
                        showSearch: true,
                        optionFilterProp: "children",
                        mode: "multiple",
                        maxTagCount: "1",
                        style: {
                            width: 200,
                        },
                    }}
                />
                <Field
                    type="string"
                    title="显示地区"
                    name="locations"
                    x-component="Select"
                    x-component-props={{
                        placeholder: "请选择显示地区",
                        allowClear: true,
                        dataSource: locationList,
                        showSearch: true,
                        optionFilterProp: "children",
                        mode: "multiple",
                        maxTagCount: "1",
                        style: {
                            width: 200,
                        },
                    }}
                />
                <div className="button-box">
                    <Button
                        type="primary"
                        className="button-item"
                        onClick={() => {
                            confirmHandler();
                        }}
                        disabled={loading}
                    >
                        查询
                    </Button>
                    <div className="line-box"></div>
                    <Button
                        className="button-item"
                        onClick={() => {
                            resetHandler();
                        }}
                        disabled={loading}
                    >
                        清空条件
                    </Button>
                </div>
            </SchemaForm>
            <div className="table-box">
                <div className="examples">
                    {examplesList.map((item) => {
                        return (
                            <div className="line-examples" key={item.color}>
                                <div
                                    style={{ backgroundColor: item.color }}
                                    className="examples-box"
                                ></div>
                                <span>{item.name}</span>
                            </div>
                        );
                    })}
                </div>
                <div className="nation-box" ref={listDomRef}>
                    {list.length > 0 &&
                        list.map((item) => {
                            return (
                                <Category
                                    key={item.key}
                                    title={item.title}
                                    label={item.label}
                                    data={item.data}
                                    isWarning={
                                        item.status === "Y" ? true : false
                                    }
                                    isExtra={
                                        item.type && item.type === "extra"
                                            ? true
                                            : false
                                    }
                                />
                            );
                        })}
                </div>
            </div>

            <Loading text="加载中" visible={loading} />
        </div>
    );
}
