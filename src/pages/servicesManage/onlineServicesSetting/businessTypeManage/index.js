import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Button, Table, Modal, message, Pagination } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import EditModal from "./components/editModal";
import { uForm } from "dora";
import BusinessType from "./components/businessType";
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
const defaultPageIndex = 1;
const defaultPageSize = 10;
const defaultPageInfo = {
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize,
    total: 0,
};
// 产品维度状态
const statusMap = {
    Y: {
        label: "有效",
        value: "Y",
    },
    N: {
        label: "无效",
        value: "N",
    },
};
/**
 * 是否是Y
 */
function isY(data) {
    return data === statusMap["Y"].value;
}
const statusList = Object.keys(statusMap).map((key) => {
    return statusMap[key];
});
const defaultParams = {
    status: statusMap["Y"].value,
};
export default function BusinessTypeManage(props) {
    const [checkboxList, setCheckboxList] = useState([]); // 复选框列表
    const [businessList, setBusinessList] = useState([]); // 业务类型列表
    const [brandList, setBrandList] = useState([]); // 产品维度列表
    const [isShowBusinessModal, setIsShowBusinessModal] = useState(false);
    const isResetForm = useRef(false); // 是否重置
    const isJsQueryRef = useRef(false); // 是否js调用查询的
    const isUseCache = useRef(false); // 是否使用缓存数据,用于手动调用trigger前，选项改变，会在最后server调用的时候带上参数，应该是formily的问题
    const [modalInfo, setModalInfo] = useState({
        data: {},
        visible: false,
    });
    const cacheParams = useRef({
        ...defaultPageInfo,
    });
    const isNeedGetBusinessList = useRef(false); // 是否需要重新获取业务类型列表

    /**
     * 获取当前登录者信息
     */
    const getCurrentUserInfo = async () => {
        try {
            const res = await get({
                url: Api.getCurrentUserInfo,
                params: {},
            });
            if (res.success) {
                const data = res.data;
                setCheckboxList([
                    {
                        label: "最后修改人是我",
                        value: data.id,
                    },
                ]);
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
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
    const getBrandList = async (params = {}) => {
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

    const columns = [
        {
            title: "序号",
            dataIndex: "id",
            ellipsis: true,
            align: "center",
            width: 100,
        },
        {
            title: "产品维度",
            dataIndex: "name",
            ellipsis: true,
            align: "center",
            width: 200,
        },
        {
            title: "业务类型",
            dataIndex: "brandTypeName",
            ellipsis: true,
            align: "center",
        },
        {
            title: "状态",
            dataIndex: "status",
            ellipsis: true,
            align: "center",
            width: 100,
            render: (text, record, index) => {
                return (
                    <span>
                        {(statusMap[text] && statusMap[text].label) ||
                            statusMap["N"].label}
                    </span>
                );
            },
        },
        {
            title: "最后修改人",
            dataIndex: "modifierName",
            ellipsis: true,
            align: "center",
            width: 180,
            render: (text, record, index) => {
                return (
                    <>
                        <span>{record.lastModifier}</span>
                        <br />
                        <span>{record.lastModifyTime}</span>
                    </>
                );
            },
        },
        {
            title: "操作",
            dataIndex: "id",
            ellipsis: true,
            align: "center",
            render: function (text, record) {
                return (
                    <div className="option-box">
                        <span
                            className={isY(record.status) ? "" : "disabled"}
                            onClick={() => {
                                editHandler(record);
                            }}
                        >
                            修改
                        </span>
                    </div>
                );
            },
        },
    ];
    const service = async ({
        values,
        pagination,
        sorter = {},
        filters = {},
    }) => {
        let sendParams = {
            // ids: values.ids && values.ids.join(','), // 产品维度id
            // TODO 暂时先单选，后续有需要可以调整
            ids: values.ids, // 产品维度id
            brandTypeIds: values.brandTypeIds, // 业务类型id
            status: values.status, // 产品维度状态
            modifierId: values?.modifierId?.[0], // 修改人id
            pageIndex: pagination.current || defaultPageIndex,
            pageSize: pagination.pageSize || defaultPageSize,
        };
        if (isUseCache.current) {
            sendParams.ids = cacheParams.current.ids;
            sendParams.brandTypeIds = cacheParams.current.brandTypeIds;
            sendParams.status = cacheParams.current.status;
            sendParams.modifierId = cacheParams.current.modifierId;
        }
        if (isJsQueryRef.current) {
            sendParams.pageIndex = cacheParams.current.pageIndex;
            sendParams.pageSize = cacheParams.current.pageSize;
        }
        let res = await getBrandList(sendParams);
        if (res.success) {
            const data = res.data;
            Object.assign(cacheParams.current, {
                ...sendParams,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
                total: data.total,
            });
        } else {
            message.error(res.message);
        }
        return {
            dataSource: res.data?.list || [],
            pageSize: res?.data?.pageSize || pagination.pageSize,
            total: res?.data?.total || pagination.total,
            current: res?.data?.pageIndex || pagination.current,
        };
    };
    const middleware =
        () =>
        ({ context }) => ({
            onFormResetQuery(payload, next) {
                isResetForm.current = true;
                isJsQueryRef.current = false;
                isUseCache.current = false;
                context.setPagination({
                    ...context.pagination,
                    current: defaultPageIndex,
                });
                context.setSorter({});
                context.setFilters({});
                return next(defaultParams);
            },
            onPageQuery(payload, next) {
                isJsQueryRef.current = false;
                context.setPagination({
                    ...context.pagination,
                });
                context.setSorter({});
                context.setFilters({});
                return next(isResetForm.current ? defaultParams : payload);
            },
        });

    const { form, table, trigger } = useFormTableQuery(
        service,
        {
            pagination: {
                pageSize: defaultPageSize,
                current: defaultPageIndex,
            },
        },
        [middleware()]
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

    /**
     * 弹窗关闭
     */
    const modalOnCancel = (isRefresh) => {
        setModalInfo(
            Object.assign({}, modalInfo, {
                data: {},
                visible: false,
            })
        );
        if (isRefresh) {
            isJsQueryRef.current = true;
            isUseCache.current = true;
            trigger();
        }
    };
    const clearFlag = () => {
        isResetForm.current = false;
        isJsQueryRef.current = false;
        isUseCache.current = false;
    };

    /**
     * 修改
     */
    const editHandler = async (item = {}) => {
        if (item.status !== statusMap["Y"].value) {
            return;
        }
        setModalInfo(
            Object.assign({}, modalInfo, {
                data: item,
                visible: true,
            })
        );
    };

    /**
     * 业务类型弹窗打开
     */
    const businessTypeHandler = () => {
        isNeedGetBusinessList.current = false;
        setIsShowBusinessModal(true);
    };
    // 业务类型维护弹窗关闭
    const businessModalOnCancel = async () => {
        setIsShowBusinessModal(false);
        if (isNeedGetBusinessList.current) {
            const businessData = await getBusinessTypeList();
            if (
                businessData?.data?.list &&
                Array.isArray(businessData.data.list)
            ) {
                setBusinessList(businessData.data.list);
            }
        }
    };

    /**
     *
     */
    const addCallbackFunc = (flag) => {
        isNeedGetBusinessList.current = flag;
    };

    /**
     * 初始化调用方法
     */
    const init = async () => {
        getCurrentUserInfo();
        // 获取全部的业务类型和产品维度
        const [businessData = {}, brandData = {}] = await Promise.all([
            getBusinessTypeList(),
            getBrandList(),
        ]);
        setBrandList(brandData?.data?.list || []);
        setBusinessList(businessData?.data?.list || []);
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="business-type-manage">
            <SchemaForm
                {...form}
                actions={actions}
                initialValues={defaultParams}
                inline
                className="form-wrap"
            >
                <Field
                    type="string"
                    title="业务类型"
                    name="brandTypeIds"
                    x-component="Select"
                    x-component-props={{
                        placeholder: "请选择业务类型",
                        allowClear: true,
                        dataSource: businessList,
                        showSearch: true,
                        optionFilterProp: "children",
                        style: {
                            width: 200,
                        },
                    }}
                />
                <Field
                    type="string"
                    title="产品维度"
                    name="ids"
                    x-component="Select"
                    x-component-props={{
                        placeholder: "请选择产品维度",
                        allowClear: true,
                        dataSource: brandList,
                        showSearch: true,
                        optionFilterProp: "children",
                        // mode:"multiple",
                        style: {
                            width: 300,
                        },
                    }}
                />
                <Field
                    type="string"
                    title="状态"
                    name="status"
                    x-component="RadioGroup"
                    x-component-props={{
                        options: statusList,
                    }}
                />
                <Field
                    type="string"
                    name="modifierId"
                    x-component="CheckboxGroup"
                    x-component-props={{
                        options: checkboxList,
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
                <div className="table-btn">
                    <Button
                        type="primary"
                        onClick={() => businessTypeHandler()}
                    >
                        业务类型维护
                    </Button>
                </div>
                <Table
                    className="table-wrap"
                    {...table}
                    columns={columns}
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
                footer={null}
                title="修改"
                visible={modalInfo.visible}
                onCancel={() => {
                    modalOnCancel();
                }}
                width={600}
                destroyOnClose={true}
            >
                <EditModal
                    data={modalInfo.data}
                    onCancel={modalOnCancel}
                    businessList={businessList}
                />
            </Modal>
            <Modal
                footer={null}
                title="业务类型维护"
                visible={isShowBusinessModal}
                onCancel={() => {
                    businessModalOnCancel();
                }}
                wrapClassName="business-type-modal"
                width={800}
                destroyOnClose={true}
            >
                <BusinessType addCallbackFunc={addCallbackFunc} />
            </Modal>
        </div>
    );
}
