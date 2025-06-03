import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { olhelpEnumOptionType } from "@/const/config";
import { Button, Table, Modal, message, Pagination } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import EditModal from "./components/editModal";
import { modalType } from "./config";
import { uForm } from "dora";
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
const groupNameList = [olhelpEnumOptionType.EmpowerService];
export default function VipLevelManage(props) {
    const [empowerServiceList, setEmpowerServiceList] = useState([]); // 授权列表
    const [empowerServiceMap, setEmpowerServiceMap] = useState({}); // 授权map
    const [userTypeList, setUserTypeList] = useState([]); // 会员等级列表
    const [userTypeMap, setUserTypeMap] = useState({}); // 会员等级map
    const [checkboxList, setCheckboxList] = useState([]); // 复选框列表
    const isResetForm = useRef(false); // 是否重置
    const isJsQueryRef = useRef(false); // 是否js调用查询的
    const isUseCache = useRef(false); // 是否使用缓存数据,用于手动调用trigger前，选项改变，会在最后server调用的时候带上参数，应该是formily的问题
    const [modalInfo, setModalInfo] = useState({
        type: modalType.add.type,
        title: modalType.add.name,
        data: {},
        visible: false,
    });
    const cacheParams = useRef({
        ...defaultPageInfo,
    });

    /**
     * 获取公共枚举项
     */
    const getCommonOptions = async () => {
        try {
            const res = await get({
                url: Api.getEnumOptions,
                params: {
                    groupNames: groupNameList.join(","),
                },
            });
            if (res.success) {
                const data = res.data;
                data.forEach((item) => {
                    let obj = {};
                    if (
                        item.groupName &&
                        groupNameList.indexOf(item.groupName) > -1
                    ) {
                        item.options &&
                            item.options.forEach((item) => {
                                item.label = item.name;
                                item.value = item.id;
                                obj[item.id] = item.name;
                            });
                    }
                    switch (item.groupName) {
                        // 授权列表
                        case olhelpEnumOptionType.EmpowerService:
                            setEmpowerServiceList(item.options);
                            setEmpowerServiceMap(obj);
                            break;
                        default:
                            break;
                    }
                });
            }
        } catch (e) {
            console.error(e);
        }
    };

    // 获取维度、地区、用户等级列表
    const getWdList = async () => {
        try {
            const res = await get({
                url: Api.getWdList,
            });
            if (res.success) {
                const data = res.data;

                if (data && Array.isArray(data.usertype)) {
                    let obj = {};
                    data.usertype.forEach((item) => {
                        item.label = item.name;
                        item.value = item.id;
                        obj[item.id] = item.name;
                    });
                    setUserTypeList(data.usertype);
                    setUserTypeMap(obj);
                }
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

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
    const columns = [
        {
            title: "序号",
            dataIndex: "id",
            ellipsis: true,
            align: "center",
            width: 100,
        },
        {
            title: "授权",
            dataIndex: "empowerName",
            ellipsis: true,
            align: "center",
            width: 200,
        },
        {
            title: "会员等级",
            dataIndex: "usertypeName",
            ellipsis: true,
            align: "center",
        },
        {
            title: "备注",
            dataIndex: "remark",
            ellipsis: true,
            align: "center",
            width: 400,
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
                        <span>{record.modifierName}</span>
                        <br />
                        <span>{record.modifyDate}</span>
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
                            onClick={() => {
                                editHandler(record);
                            }}
                        >
                            修改
                        </span>
                        <div className="button-line"></div>
                        <span
                            onClick={() => {
                                deleteHandler(record.id);
                            }}
                        >
                            删除
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
            empowerCode: values.empowerCode, // 服务授权代码
            usertype: values.usertype, // 会员等级
            modifierId: values.modifierId && values.modifierId[0], // 修改人id
            pageIndex: pagination.current || defaultPageIndex,
            pageSize: pagination.pageSize || defaultPageSize,
        };
        if (isUseCache.current) {
            sendParams.empowerCode = cacheParams.current.empowerCode;
            sendParams.usertype = cacheParams.current.usertype;
            sendParams.modifierId = cacheParams.current.modifierId;
        }
        if (isJsQueryRef.current) {
            sendParams.pageIndex = cacheParams.current.pageIndex;
            sendParams.pageSize = cacheParams.current.pageSize;
        }
        let res = await get({
            url: Api.getVipLevelList,
            params: sendParams,
        });
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
            dataSource: (res.data && res.data.list) || [],
            pageSize: (res.data && res.data.pageSize) || pagination.pageSize,
            total: (res.data && res.data.total) || pagination.total,
            current: (res.data && res.data.pageIndex) || pagination.current,
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
                return next({});
            },
            onPageQuery(payload, next) {
                isJsQueryRef.current = false;
                context.setPagination({
                    ...context.pagination,
                });
                context.setSorter({});
                context.setFilters({});
                return next(isResetForm.current ? {} : payload);
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
     * 获取详情
     */
    const getDetail = async (id) => {
        let result = null;
        try {
            if (id || id == 0) {
                const res = await get({
                    url: Api.getVipLevelDetail,
                    params: {
                        id,
                    },
                });
                if (res.success) {
                    result = res.data;
                } else {
                    message.warning(res.message);
                }
            }
        } catch (e) {
            console.error(e);
            message.error("程序出错，请联系管理员！");
        }
        return result;
    };
    /**
     * 删除方法
     */
    const deleteHandler = (id) => {
        Modal.confirm({
            title: "提示",
            content: "是否确定删除该配置",
            onOk: async () => {
                const data = await post({
                    url: Api.postVipLevelDelete,
                    data: { id },
                });
                if (data.success) {
                    isUseCache.current = true;
                    trigger();
                    message.success("删除成功");
                } else {
                    message.error(data.message);
                }
            },
        });
    };

    /**
     * 新增
     */
    const addHandler = () => {
        setModalInfo({
            type: modalType.add.type,
            title: modalType.add.name,
            data: {},
            visible: true,
        });
    };
    /**
     * 修改
     */
    const editHandler = async (item = {}) => {
        const data = await getDetail(item.id);
        if (data) {
            if (
                empowerServiceMap[data.empowerCode] &&
                userTypeMap[data.usertype]
            ) {
                setModalInfo({
                    type: modalType.edit.type,
                    title: modalType.edit.name,
                    data,
                    visible: true,
                });
            } else {
                message.warning(
                    "会员等级或授权不在当前可选列表中，请刷新后重试！"
                );
            }
        }
    };

    /**
     * 初始化调用方法
     */
    const init = async () => {
        getCommonOptions();
        getWdList();
        getCurrentUserInfo();
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="vip-level-manage">
            <SchemaForm
                {...form}
                actions={actions}
                inline
                className="form-wrap"
            >
                <Field
                    type="string"
                    title="授权"
                    name="empowerCode"
                    x-component="Select"
                    x-component-props={{
                        placeholder: "请选择授权",
                        allowClear: true,
                        dataSource: empowerServiceList,
                        showSearch: true,
                        optionFilterProp: "children",
                        style: {
                            width: 300,
                        },
                    }}
                />
                <Field
                    type="string"
                    title="会员等级"
                    name="usertype"
                    x-component="Select"
                    x-component-props={{
                        placeholder: "请选择会员等级",
                        allowClear: true,
                        dataSource: userTypeList,
                        showSearch: true,
                        optionFilterProp: "children",
                        style: {
                            width: 150,
                        },
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
                    <Button type="primary" onClick={() => addHandler()}>
                        新增
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
                title={modalInfo.title}
                visible={modalInfo.visible}
                onCancel={() => {
                    modalOnCancel();
                }}
                width={600}
                destroyOnClose={true}
            >
                <EditModal
                    type={modalInfo.type}
                    data={modalInfo.data}
                    onCancel={modalOnCancel}
                    empowerServiceList={empowerServiceList}
                    empowerServiceMap={empowerServiceMap}
                    userTypeList={userTypeList}
                    userTypeMap={userTypeMap}
                />
            </Modal>
        </div>
    );
}
