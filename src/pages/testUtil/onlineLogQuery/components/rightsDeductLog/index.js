import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import { uForm } from "dora";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { message, Modal, Table, Pagination } from "dpl-react";
import OperationBtn from "@/components/common/operationBtn";
import SelectOneDayTime, {
    getCurrentTime,
    dateKey,
    startTimeKey,
    endTimeKey,
} from "../selectOneDayTime";
import { olhelpEnumOptionType, workGroupType } from "@/const/config";
import useFormQueryNoChangeParams from "@/hooks/useFormQueryNoChangeParams";
import Copy from "../../copy";
import LogDetail from "../logDetail";
const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
    Row,
    Col,
    FormSlot,
    useFormTableQuery,
    FormButtonGroup,
    Submit,
    Reset,
    FormEffectHooks,
} = uForm;
const action = createFormActions();
// Y/N 标识
const transferMap = {
    Y: {
        code: "Y",
        name: "是",
    },
    N: {
        code: "N",
        name: "否",
    },
};
// 默认配置
const defaultPageIndex = 1;
const defaultPageSize = 20;
const defaultPageInfo = {
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize,
    total: 0,
};
// 默认日期
const defaultDate = (function () {
    const nowDateObj = getCurrentTime();
    const result = {
        [dateKey]: nowDateObj.date,
        [startTimeKey]: nowDateObj.startTime,
        [endTimeKey]: nowDateObj.endTime,
    };
    return result;
}());

const rightsTypeMap = {
    2: {
        code: "2",
        name: "财税实务咨询",
    },
    3: {
        code: "3",
        name: "财税专家咨询",
    },
};
const rightsTypeList = Object.keys(rightsTypeMap).map((key) => {
    return {
        ...rightsTypeMap[key],
        label: rightsTypeMap[key].name,
        value: rightsTypeMap[key].code,
    };
});
/**
 * 状态判断
 */
function stateTransform(val) {
    let result = "失败";
    if (val === "Y") {
        result = "成功";
    }
    return result;
}

// 详情展示配置
const logDetailConfig = [
    {
        name: "lie800接口日志",
        code: "deductFailList",
        dataKey: "failLogList",
    },
    {
        name: "权益接口日志",
        code: "deductInfoList",
        dataKey: "infoLogList",
    },
];

export default function RightsDeductLog(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const isResetForm = useRef(false); // 是否重置
    const isJsQueryRef = useRef(false); // 是否js调用查询的
    const pageInfoRef = useRef(defaultPageInfo);
    const [logDetail, setLogDetail] = useState({}); // 日志详情

    /*
     * 获取日志详情
     * @param {*} params
     * @returns
     */
    const getLogDetail = async (params) => {
        let result = {};
        try {
            const res = await get({
                url: Api.getRightDeductDetail,
                params,
            });
            if (res.success) {
                const data = res.data;
                result = data;
            }
        } catch (e) {
            console.error(e);
        }
        return result;
    };

    /**
     * 查看详情
     */
    const checkDetail = async (item) => {
        const result = await getLogDetail({
            id: item.id,
        });
        setLogDetail(result);
        setModalVisible(true);
    };
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            width: 100,
            align: "center",
            fixed: "left",
        },
        {
            title: "创建时间",
            dataIndex: "createDate",
            width: 150,
            align: "center",
            fixed: "left",
            render(text, record, index) {
                return <Copy copyContent={text}>{text}</Copy>;
            },
        },
        {
            title: "操作",
            dataIndex: "id",
            width: 100,
            align: "center",
            fixed: "left",
            render(text, record, index) {
                return (
                    <div className="option-box">
                        <span
                            onClick={() => {
                                checkDetail(record);
                            }}
                        >
                            查看详情
                        </span>
                    </div>
                );
            },
        },
        {
            title: "logId",
            dataIndex: "accessLogId",
            align: "center",
            width: 150,
        },
        {
            title: "msgId",
            dataIndex: "msgId",
            align: "center",
            width: 150,
        },
        {
            title: "客户名称",
            dataIndex: "userName",
            align: "center",
            width: 150,
        },
        {
            title: "权益类型",
            dataIndex: "rightTypeName",
            align: "center",
            width: 150,
        },
        {
            title: "扣除前剩余权益次数",
            dataIndex: "beforeDeductNumber",
            align: "center",
            width: 150,
        },
        {
            title: "应扣次数",
            dataIndex: "needDeductNumber",
            align: "center",
            width: 150,
        },
        {
            title: "成功次数",
            dataIndex: "successNumber",
            align: "center",
            width: 150,
        },
        {
            title: "咨询时长",
            dataIndex: "consultInterval",
            align: "center",
            width: 150,
        },
        {
            title: "是否有转接",
            dataIndex: "isTransfer",
            align: "center",
            width: 150,
            render(text, record, index) {
                return (
                    <span>
                        {transferMap[text]?.name || transferMap["N"].name}
                    </span>
                );
            },
        },
        {
            title: "转接链路",
            dataIndex: "describe",
            align: "center",
            width: 150,
        },
    ];

    const [dispatchAndNoChangeParams, queryParamsMiddleware] =
        useFormQueryNoChangeParams();

    const service = async ({
        values,
        pagination,
        sorter = {},
        filters = {},
    }) => {
        let params = {
            msgId: values?.msgId?.trim() || '',
            accessLogId: values?.accessLogId?.trim() || '',
            rightType: values.rightType,
            startDate: `${values?.selectDate?.date} ${values?.selectDate?.startTime}`,
            endDate: `${values?.selectDate?.date} ${values?.selectDate?.endTime}`,
            pageIndex: pagination.current || defaultPageIndex,
            pageSize: pagination.pageSize || defaultPageSize,
        };
        if (isJsQueryRef.current) {
            params.pageIndex = pageInfoRef.current.pageIndex;
            params.pageSize = pageInfoRef.current.pageSize;
        }
        const res = await get({
            url: Api.getRightDeductQuery,
            params,
        });

        if (res.success) {
            const data = res.data;
            pageInfoRef.current = {
                pageIndex: data.pageIndex + 1,
                pageSize: data.pageSize,
                total: data.total,
            };
        } else {
            message.error(res.message);
        }
        return {
            dataSource: res?.data?.list || [],
            pageSize: res?.data?.pageSize || pagination.pageSize,
            total: res?.data?.total,
            current: res?.data?.pageIndex || pagination.current,
        };
    };

    /**
     * uForm中间件
     */
    const middleware =
        () =>
        ({ context }) => ({
            onFormResetQuery(payload, next) {
                isResetForm.current = true;
                context.setPagination({
                    ...context.pagination,
                    current: 1,
                });
                context.setSorter({});
                context.setFilters({});
                return next({
                    selectDate: defaultDate,
                });
            },
            onPageQuery(payload, next) {
                isJsQueryRef.current = false;
                context.setPagination({
                    ...context.pagination,
                });
                context.setSorter({});
                context.setFilters({});
                return next(
                    isResetForm.current ? { selectDate: defaultDate } : payload
                );
            },
        });

    /**
     * 清除标记
     */
    const clearFlag = () => {
        isResetForm.current = false;
        isJsQueryRef.current = false;
    };

    const { form, table } = useFormTableQuery(
        service,
        {
            pagination: {
                pageSize: defaultPageSize,
                showQuickJumper: true,
                showSizeChanger: true,
            },
        },
        [queryParamsMiddleware, middleware()]
    );

    /**
     * 分页
     * @param {*} pageIndex
     * @param {*} pageSize
     */
    const changePage = (pageIndex, pageSize) => {
        const pagination = Object.assign({}, table.pagination, {
            current: pageIndex,
            pageSize,
        });
        table.onChange(pagination, null, null);
    };
    return (
        <div className="rights-deduct-log">
            <SchemaForm
                {...form}
                inline
                initialValues={{
                    selectDate: defaultDate,
                }}
                className="form-wrap"
                actions={action}
                components={{ SelectOneDayTime }}
            >
                <Field
                    type="string"
                    name="selectDate"
                    title="选择时间"
                    x-component="SelectOneDayTime"
                    x-component-props={{}}
                />
                <Field
                    type="string"
                    name="accessLogId"
                    title="logId"
                    x-component="Input"
                    x-component-props={{
                        placeholder: "请输入logId",
                        allowClear: true,
                    }}
                />
                <Field
                    type="string"
                    name="msgId"
                    title="msgId"
                    x-component="Input"
                    x-component-props={{
                        placeholder: "请输入msgId",
                        allowClear: true,
                    }}
                />
                <Field
                    type="string"
                    name="rightType"
                    title="权益类型"
                    x-component="RadioGroup"
                    x-component-props={{
                        options: rightsTypeList,
                    }}
                />
                <FormButtonGroup>
                    <Submit style={{ marginRight: 10 }} onClick={clearFlag}>
                        查询
                    </Submit>
                    <Reset>清空条件</Reset>
                </FormButtonGroup>
            </SchemaForm>
            <div className="table-box">
                <Table
                    className="table-wrap"
                    {...table}
                    columns={columns}
                    scroll={{ x: 1850 }}
                    rowKey={"id"}
                    pagination={false}
                />
                <div className="pagination-box">
                    <Pagination
                        showTotalInfo={false}
                        current={Number(table.pagination.current)}
                        pageSize={Number(table.pagination.pageSize)}
                        total={Number(table.pagination.total)}
                        showQuickJumper={true}
                        showSizeChanger={true}
                        pageSizeOptions={["10", "20", "50", "100"]}
                        onShowSizeChange={changePage}
                        onChange={changePage}
                    />
                </div>
            </div>
            <Modal
                visible={modalVisible}
                title="日志详情"
                className="rights-deduct-log-detail-modal"
                destroyOnClose={true}
                onCancel={() => {
                    setModalVisible(false);
                }}
                onOk={() => {
                    setModalVisible(false);
                }}
            >
                <div className="rights-deduct-log-detail">
                    {Array.isArray(logDetailConfig) &&
                        logDetailConfig.map((logType) => {
                            return (
                                <div className="log-type-item">
                                    <div className="log-type-title">
                                        {logType.name}
                                    </div>
                                    <div className="log-type-data">
                                        {Array.isArray(
                                            logDetail[logType.code]
                                        ) &&
                                            logDetail[logType.code].map(
                                                (data) => {
                                                    return (
                                                        <LogDetail
                                                            keys={logType.keys}
                                                            data={
                                                                data[
                                                                    logType
                                                                        .dataKey
                                                                ]
                                                            }
                                                        />
                                                    );
                                                }
                                            )}
                                        {Array.isArray(
                                            logDetail[logType.code]
                                        ) &&
                                            logDetail[logType.code].length ===
                                                0 && <div className='empty-text'>没有该日志信息</div>}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </Modal>
        </div>
    );
}
