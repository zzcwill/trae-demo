import React, { useState, useEffect } from "react";
import {
    Form,
    Row,
    Col,
    Input,
    DatePicker,
    Button,
    Table,
    Select,
    message,
    Pagination,
} from "dpl-react";
import { get, getFile } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import "./index.scss";
import moment from "moment";
import { servicesMap, robotFlagMap } from "@/const/index";
import Product from "./components/product";
import qs from "qs";
import "moment/locale/zh-cn";
import { YES_NO_MAP } from "@/const/config";
moment.locale("zh-cn");
const RangePicker = DatePicker.RangePicker;
/**
 * 三列布局
 */
const colThreeLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
};

const defaultLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
// 表格配置文件
const tableConfig = [
    {
        title: "session_id",
        dataIndex: "sessionId",
        key: "sessionId",
        width: 150,
        ellipsis: true,
        align: "center",
    },
    {
        title: "咨询时间",
        dataIndex: "zxsj",
        key: "zxsj",
        width: 160,
        align: "center",
    },
    {
        title: "税号",
        dataIndex: "yhdm",
        key: "yhdm",
        width: 120,
        align: "center",
    },
    {
        title: "用户名称",
        dataIndex: "yhmc",
        key: "yhmc",
        width: 120,
        ellipsis: true,
        align: "center",
    },
    {
        title: "地区维度",
        dataIndex: "locationName",
        key: "locationName",
        width: 100,
        align: "center",
    },
    {
        title: "产品维度",
        dataIndex: "brandName",
        key: "brandName",
        width: 120,
        align: "center",
    },
    {
        title: "会员等级",
        dataIndex: "usertypeName",
        key: "usertypeName",
        width: 100,
        align: "center",
    },
    {
        title: "服务提供者",
        dataIndex: "robotFlagName",
        key: "robotFlagName",
        width: 120,
        align: "center",
    },
    {
        title: "关键字",
        dataIndex: "keyword",
        key: "keyword",
        width: 120,
        ellipsis: true,
        align: "center",
    },
    {
        title: "匹配问题",
        dataIndex: "question",
        key: "question",
        width: 120,
        ellipsis: true,
        align: "center",
    },
    {
        title: "答案对应问题",
        dataIndex: "answerQuestion",
        key: "answerQuestion",
        width: 120,
        ellipsis: true,
        align: "center",
    },
    {
        title: "相似度",
        dataIndex: "similarity",
        key: "similarity",
        width: 120,
        align: "center",
    },
    {
        title: "查询结果",
        dataIndex: "result",
        key: "result",
        width: 100,
        align: "center",
    },
    {
        title: "评价结果",
        dataIndex: "servicesName",
        key: "servicesName",
        width: 100,
        align: "center",
    },
    {
        title: "反馈内容",
        dataIndex: "comment",
        key: "comment",
        width: 120,
        ellipsis: true,
        align: "center",
    },
    {
        title: "不满意原因",
        dataIndex: "dissatisfiedReason",
        key: "dissatisfiedReason",
        width: 150,
        ellipsis: true,
        align: "center",
    },
    {
        title: "称呼",
        dataIndex: "personalName",
        key: "personalName",
        width: 150,
        ellipsis: true,
        align: "center",
    },
    {
        title: "电话",
        dataIndex: "phone",
        key: "phone",
        width: 150,
        ellipsis: true,
        align: "center",
    },
    {
        title: "解决情况",
        dataIndex: "solutionName",
        key: "solutionName",
        width: 100,
        align: "center",
    },
    {
        title: "打分情况",
        dataIndex: "score",
        key: "score",
        width: 100,
        align: "center",
    },
    {
        title: "评价时间",
        dataIndex: "evaluationTime",
        key: "evaluationTime",
        width: 160,
        align: "center",
    },
    {
        title: "问题类型",
        dataIndex: "questionType",
        key: "questionType",
        width: 160,
        align: "center",
    },
    {
        title: "问题提问方式",
        dataIndex: "questionOrigin",
        key: "questionOrigin",
        width: 160,
        align: "center",
    },
    {
        title: "推荐问题",
        dataIndex: "recommendQuestion",
        key: "recommendQuestion",
        width: 160,
        align: "center",
    },
    {
        title: "是否延迟发送",
        dataIndex: "delayTransmitEnable",
        key: "delayTransmitEnable",
        width: 160,
        align: "center",
        render(text) {
            return YES_NO_MAP[text] || text;
        }
    },
    {
        title: "延迟发送时间",
        dataIndex: "delayTransmitMilliseconds",
        key: "delayTransmitMilliseconds",
        width: 160,
        align: "center",
    },
];

const defaultPageIndex = 1; // 默认页码
const defaultPageSize = 20; // 默认大小

const initForm = () => {
    const currentStart = moment(moment().format("YYYY-MM-DD 00:00:00"));
    const currentEnd = moment(new Date());
    return {
        queryTime: [].concat(currentStart, currentEnd), // 咨询时间
        location: [], // 地区维度
        brandObj: {
            brandTypeId: "all", //
            brand: [], //
        }, // 产品维度
        evaluationTime: [].concat(currentStart, currentEnd), // 满意度评价时间
        robotFlag: undefined, // 服务提供者
        services: undefined, // 满意度评价
        userType: undefined, // 会员等级
        keyword: '', // 关键字
        questionOriginList: undefined, // 提问方式
        solution: undefined, // 解决情况
        pageIndex: defaultPageIndex, // 页码
        pageSize: defaultPageSize, // 展示条数
    };
};

// 将 [id, name] 列表项直接转换为option List返回
const renderOptionListFromList = (dataList = []) => {
    return dataList?.map(({ id, name }) => (
        <Select.Option key={id} value={id}>
            {name}
        </Select.Option>
    ));
}

const SOLUTION_LIST = [{
    name: '已解决',
    id: 'Y'
}, {
    name: '未解决',
    id: 'N'
}]

const RobotLogQuery = React.forwardRef((props, ref) => {
    const { form } = props;
    const { getFieldDecorator, setFieldsValue, getFieldsValue, getFieldValue } =
        form;

    const [queryForm, setQueryForm] = useState(initForm()); // 查询参数
    const [businessTree, setBusinessTree] = useState([]); // 产品维度
    const [areaCodeList, setAreaCodeList] = useState([]); // 地区维度
    const [userTypeList, setUserTypeList] = useState([]); // 会员等级
    const [questionOriginList, setQuestionOriginList] = useState([]); // 提问方式
    const [loading, setLoading] = useState(false); // loading
    const [exporting, setExporting] = useState(false); // exporting
    const [logList, setLogList] = useState([]); // 表格数据
    const [total, setTotal] = useState(0); // 总条数
    const [pageInfo, setPageInfo] = useState({
        pageIndex: defaultPageIndex,
        pageSize: defaultPageSize,
        total: 0,
    });
    const [dates, setDates] = useState([]);


    /**
     * 获取提问方式
     */
    const getQuestionOriginList = async () => {
        const GROUP_NAME = "question_origin";
        const res = await get({
            url: Api.getEnumOptions,
            params: {
                groupNames: GROUP_NAME,
            },
        });
        if (res.success) {
            const data = res.data || [];
            const groupData = data.find(item => item.groupName === GROUP_NAME);
            setQuestionOriginList(groupData?.options || []);
        } else {
            message.error(res.message);
        }
    }

    /**
     * 获取地区维度
     */
    const getAreaCode = async () => {
        const res = await get({
            url: Api.getWdList,
        });

        if (res.success) {
            const data = res.data;
            setAreaCodeList(data.location);
            setUserTypeList(data.usertype || []);
        } else {
            message.error(res.message);
        }
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
        if (brandData?.data?.list && Array.isArray(brandData.data.list)) {
            brandData.data.list.forEach((brand) => {
                if (
                    (brand?.brandTypeId || brand.brandTypeId === 0) &&
                    brand.status === "Y"
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

    /**
     *  获取日志记录
     * @param {Object} params
     */
    const getLogList = async (params) => {
        setLoading(true);
        const res = await get({
            url: Api.getLogList
                .replace("{startTime}", params.startTime)
                .replace("{endTime}", params.endTime)
                .replace("{evaluationStartTime}", params.evaluationStartTime)
                .replace("{evaluationEndTime}", params.evaluationEndTime),
            params: {
                locationList: params.location, // 地区维度
                brandTypeId: params.brandTypeId, // 产品类型
                brandList: params.brand, // 产品维度
                robotFlag: params.robotFlag, // 服务提供者
                services: params.services, // 满意度评价
                pageIndex: params.pageIndex, // 当前页码
                pageSize: params.pageSize, // 每页条数
                userType: params.userType, // 会员等级
                keyword: params.keyword?.trim(), // 关键字，去掉前后空格
                questionOriginList:  params.questionOriginList, // 提问方式
                solution: params.solution // 解决情况
            },
        });
        if (res.success) {
            const data = res.data;
            setLogList(data.list);
            // setTotal(data.total);
            setPageInfo({
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                total: data.total,
            });
        } else {
            message.error(res.message);
        }
        setLoading(false);
    };

    /**
     * 导出
     */
    const exportExcel = async () => {
        if (pageInfo.total >= 10000) {
            message.error("最大条数不能超过10000条！");
            return;
        }
        setExporting(true);
        const params = initParams(queryForm);
        const url =
            Api.getExportExcel
                .replace("{startTime}", params.startTime)
                .replace("{endTime}", params.endTime)
                .replace("{evaluationStartTime}", params.evaluationStartTime)
                .replace("{evaluationEndTime}", params.evaluationEndTime) +
            qs.stringify({
                locationList: params.location,
                brandTypeId: params.brandTypeId,
                brandList: params.brand,
                robotFlag: params.robotFlag,
                services: params.services,
                userType: params.userType, // 会员等级
                keyword: params.keyword?.trim(), // 关键字
                questionOriginList:  params.questionOriginList, // 提问方式
                solution: params.solution // 解决情况
            });
        window.open(url);
        setExporting(false);
        // const reader = new FileReader();
        // reader.addEventListener('loadend', function() {
        //   try {
        //     const res = JSON.parse(reader.result);
        //     message.error(res.message);
        //   } catch {
        //     const url = window.URL.createObjectURL(res.data);
        //     const elink = document.createElement('a');
        //     elink.target = '_new';
        //     elink.download = getFileName(res.headers);
        //     elink.href = url;
        //     elink.style.display = 'none';
        //     document.body.appendChild(elink);
        //     elink.click();
        //     elink.stopPropagation();
        //     document.body.removeChild(elink);
        //   }
        //
        // });
        // reader.readAsText(res.data, { encoding: 'utf8' });
    };

    /**
     * 获取headers里面的fileName
     * @param {response headers} headers
     */
    const getFileName = (headers) => {
        if (headers["content-disposition"] === undefined)
            return "机器人匹配日志.xlsx";
        const list = headers["content-disposition"].split(";");
        for (let i = 0, len = list.length; i < len; i++) {
            const item = list[i];
            if (item.indexOf("filename=") === 0) {
                try {
                    return decodeURIComponent(item.replace("filename=", ""));
                } catch (e) {
                    return item.replace("filename=", "");
                }
            }
        }
        return "机器人匹配日志.xlsx";
    };

    const disabledDate = (current) => {
        if (!dates || dates.length === 0) {
            return false;
        }
        return !(
            current.valueOf() <
                moment(dates[0]).add(7, "days").startOf("day").valueOf() &&
            current.valueOf() >
                moment(dates[0]).subtract(7, "days").startOf("day").valueOf()
        );
    };

    /**
     * 查询
     */
    const query = async () => {
        const values = getFieldsValue();
        const params = initParams(values, defaultPageIndex, defaultPageSize);
        setQueryForm(setInitForm(values, defaultPageIndex, defaultPageSize));
        getLogList(params);
    };

    /**
     * 重置
     */
    const reset = async () => {
        const form = initForm();
        setQueryForm(form);
        setFieldsValue(form);
    };

    /**
     * 分页
     */
    const changePage = (pageIndex, pageSize) => {
        const params = initParams(queryForm, pageIndex, pageSize);
        getLogList(params);
    };

    /**
     * 拼装参数
     * @param {Object} item
     * @param {Number} pageIndex
     * @param {Number} pageSize
     */
    const initParams = (item, pageIndex, pageSize) => {
        let obj = {
            ...item, // 中间数据处理有重复处理的情况，现在改为全量处理，最终输出到业务场景使用的时候才最终决定使用哪些参数，要不然改的地方太多了，每次改动都要改好几个地方
            startTime:
                item.queryTime.length > 0
                    ? item.queryTime[0].format("YYYY-MM-DD HH:mm:ss")
                    : "", // 咨询时间起
            endTime:
                item.queryTime.length > 0
                    ? item.queryTime[1].format("YYYY-MM-DD HH:mm:ss")
                    : "", // 咨询时间止
            location: item.location.join(","), // 地区维度
            brandTypeId:
                item.brandObj.brandTypeId === "all"
                    ? ""
                    : item.brandObj.brandTypeId, // 产品类型
            brand: item.brandObj.brand.join(","), // 产品维度
            robotFlag: item.robotFlag ? item.robotFlag : "", // 服务提供者
            services: item.services ? item.services : "", // 满意度评价
            evaluationStartTime:
                item.evaluationTime.length > 0
                    ? item.evaluationTime[0].format("YYYY-MM-DD HH:mm:00")
                    : "", // 满意度评价时间起
            evaluationEndTime:
                item.evaluationTime.length > 0
                    ? item.evaluationTime[1].format("YYYY-MM-DD HH:mm:00")
                    : "", // 满意度评价时间止
            questionOriginList: item?.questionOriginList?.toString()
        };
        if (pageIndex) {
            obj.pageIndex = pageIndex; // 当前页码
        }
        if (pageSize) {
            obj.pageSize = pageSize; // 每页条数, // 当前页码
        }
        return obj;
    };

    /**
     * 格式化form表单
     */
    const setInitForm = (item, pageIndex, pageSize) => {
        // 中间数据处理有重复处理的情况，现在改为全量处理，最终输出到业务场景使用的时候才最终决定使用哪些参数，要不然改的地方太多了，每次改动都要改好几个地方
        return {
            ...item,
            queryTime:
                item.queryTime.length !== 0
                    ? [].concat(item.queryTime[0], item.queryTime[1])
                    : [], // 咨询时间
            location: item.location, // 地区维度
            brandObj: {
                brandTypeId: item.brandObj.brandTypeId,
                brand: item.brandObj.brand,
            }, // 产品维度
            robotFlag: item.robotFlag, // 服务提供者
            services: item.services, // 满意度评价
            pageIndex: pageIndex, // 页码
            pageSize: pageSize, // 展示条数
            evaluationTime:
                item.evaluationTime.length !== 0
                    ? [].concat(item.evaluationTime[0], item.evaluationTime[1])
                    : [], // 满意度评价时间
            questionOriginList: item?.questionOriginList?.toString()
        };
    };

    useEffect(() => {
        getAreaCode(); // 这里不仅获得地区维度了，现在还要在wdlist接口中获取会员等级，名字暂时没改内部加了逻辑
        getBusinessTree();
        getQuestionOriginList();
    }, []);


    return (
        <div className="robot-log-query">
            <div className="search">
                <Form>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="咨询时间："
                                {...defaultLayout}
                                colon={false}
                            >
                                {getFieldDecorator("queryTime", {
                                    initialValue: queryForm.queryTime,
                                })(
                                    <RangePicker
                                        showTime
                                        allowClear={false}
                                        onCalendarChange={(value) => {
                                            setDates(value);
                                        }}
                                        disabledDate={disabledDate}
                                        format="YYYY-MM-DD HH:mm:ss"
                                        style={{ width: "100%" }}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="地区维度："
                                {...colThreeLayout}
                                colon={false}
                            >
                                {getFieldDecorator("location", {
                                    initialValue: queryForm.location,
                                })(
                                    <Select
                                        placeholder="请选择地区"
                                        allowClear
                                        mode="multiple"
                                        maxTagCount={1}
                                        optionFilterProp="children"
                                    >
                                        {areaCodeList.length > 0 &&
                                            areaCodeList.map((item) => {
                                                return (
                                                    <Select.Option
                                                        key={item.name}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </Select.Option>
                                                );
                                            })}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="服务提供者："
                                {...colThreeLayout}
                                colon={false}
                            >
                                {getFieldDecorator("robotFlag", {
                                    initialValue: queryForm.robotFlag,
                                })(
                                    <Select
                                        placeholder="请选择服务提供者"
                                        allowClear
                                    >
                                        {robotFlagMap.length > 0 &&
                                            robotFlagMap.map((item) => {
                                                return (
                                                    <Select.Option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </Select.Option>
                                                );
                                            })}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="产品维度："
                                {...defaultLayout}
                                colon={false}
                            >
                                {getFieldDecorator("brandObj", {
                                    initialValue: queryForm.brandObj,
                                })(
                                    <Product
                                        firstPlaceholder="测试"
                                        options={businessTree}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="满意度评价："
                                {...colThreeLayout}
                                colon={false}
                            >
                                {getFieldDecorator("services", {
                                    initialValue: queryForm.services,
                                })(
                                    <Select
                                        placeholder="请选择满意度评价"
                                        allowClear
                                    >
                                        {servicesMap.length > 0 &&
                                            servicesMap.map((item) => {
                                                return (
                                                    <Select.Option
                                                        key={item.id}
                                                        value={item.id}
                                                    >
                                                        {item.name}
                                                    </Select.Option>
                                                );
                                            })}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="评价时间："
                                {...colThreeLayout}
                                colon={false}
                            >
                                {getFieldDecorator("evaluationTime", {
                                    initialValue: queryForm.evaluationTime,
                                })(
                                    <RangePicker
                                        showTime={{
                                            format: "YYYY-MM-DD HH:mm:00",
                                        }}
                                        allowClear
                                        format="YYYY-MM-DD HH:mm:00"
                                        style={{ width: "100%" }}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="会员等级："
                                {...defaultLayout}
                                colon={false}
                            >
                                {getFieldDecorator("userType", {
                                    initialValue: queryForm.userType,
                                })(
                                    <Select
                                        placeholder="全部"
                                        allowClear
                                    >
                                    {userTypeList.length > 0 && renderOptionListFromList(userTypeList)}

                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="关键字："
                                {...colThreeLayout}
                                colon={false}
                            >
                                {getFieldDecorator("keyword", {
                                    initialValue: queryForm.keyword,
                                })(
                                    <Input placeholder="请输入关键字" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="提问方式："
                                {...colThreeLayout}
                                colon={false}
                            >
                                {getFieldDecorator("questionOriginList", {
                                    initialValue: queryForm.questionOriginList,
                                })(
                                    <Select
                                        placeholder="全部"
                                        allowClear
                                        multiple
                                        maxTagCount={1}
                                    >
                                        {renderOptionListFromList(questionOriginList)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item
                                label="解决情况："
                                {...defaultLayout}
                                colon={false}
                            >
                                {getFieldDecorator("solution", {
                                    initialValue: queryForm.solution,
                                })(
                                    <Select
                                        placeholder="全部"
                                        allowClear
                                    >
                                        {renderOptionListFromList(SOLUTION_LIST)}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <div className="center">
                        <Button
                            type="primary"
                            className="search-button"
                            size="small"
                            loading={loading}
                            disabled={exporting}
                            onClick={() => {
                                query();
                            }}
                        >
                            查询
                        </Button>
                        <div className="line-box"></div>
                        <Button
                            type="primary"
                            className="search-button"
                            size="small"
                            disabled={loading || exporting}
                            onClick={() => {
                                reset();
                            }}
                        >
                            重置
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="table">
                <div className="export">
                    <Button
                        type="primary"
                        className="export-button"
                        size="small"
                        loading={exporting}
                        disabled={loading}
                        onClick={() => {
                            exportExcel();
                        }}
                    >
                        导出
                    </Button>
                </div>

                <Table
                    className="table-box"
                    dataSource={logList}
                    loading={loading}
                    columns={tableConfig}
                    pagination={false}
                    scroll={{ x: "3080px", y: `calc(100vh - 265px)` }}
                />
                <Pagination
                    showTotalInfo
                    className="pagination-box"
                    current={pageInfo.pageIndex}
                    pageSize={pageInfo.pageSize}
                    total={pageInfo.total}
                    showQuickJumper
                    showSizeChanger
                    pageSizeOptions={["10", "20", "50", "100"]}
                    onChange={changePage}
                    onShowSizeChange={changePage}
                />
            </div>
        </div>
    );
});
export default Form.create()(RobotLogQuery);
