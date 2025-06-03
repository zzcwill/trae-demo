import "./index.scss";
import { uForm } from "dora";
import React, { useState, useEffect, useRef } from "react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import useFormQueryNoChangeParams from "@/hooks/useFormQueryNoChangeParams";
import { Button, Table, Modal, message, Pagination, Popover } from "dpl-react";
import { olhelpEnumOptionType, workGroupType } from "@/const/config";
import EditModal from "./components/editModal";
import { modalType } from "./config";
// TODO 增加其他类型
const groupNamesList = [olhelpEnumOptionType.OperationActionMatter];
const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    useFormTableQuery,
    Submit,
    FormButtonGroup,
    Reset,
} = uForm;
const defaultPageIndex = 1;
const defaultPageSize = 20;
const defaultPageInfo = {
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize,
    total: 0,
};
const allLocation = {
    value: "ALL",
    label: "全部",
};
// 是否展示map
const isShowMap = {
    Y: {
        id: "Y",
        name: "显示",
    },
    N: {
        id: "N",
        name: "不显示",
    },
};

const isShowList = Object.keys(isShowMap).map((key) => isShowMap[key]);

/**
 * 格式化处理列表数据
 * @param {*} item
 * @param {*} options
 * @returns
 */
function formatItemData(item = {}, options = {}) {
    let result = {};
    const { operationMatterMap, onlineGroupMap, inCallGroupMap } = options;
    try {
        const {
            id,
            matterList = [],
            onlineGroupsList = [],
            incallGroupsList = [],
            isShowOnline,
            isShowIncall,
            code,
        } = item;
        result.id = id;
        result.isShowOnline = isShowOnline;
        result.isShowInCall = isShowIncall;
        result.operationList = code ? [code] : [];
        if (Array.isArray(matterList)) {
            result.operationMatterList = matterList
                .map((item) => {
                    if (operationMatterMap[item.matterCode]) {
                        return item.matterCode;
                    }
                })
                .filter((item) => item || item === 0);
        }
        if (Array.isArray(onlineGroupsList)) {
            result.onlineGroupList = onlineGroupsList
                .map((item) => {
                    if (onlineGroupMap[item.skillGroupId]) {
                        return item.skillGroupId;
                    }
                })
                .filter((item) => item || item === 0);
        }
        if (Array.isArray(incallGroupsList)) {
            result.inCallGroupList = incallGroupsList
                .map((item) => {
                    if (inCallGroupMap[item.skillGroupId]) {
                        return item.skillGroupId;
                    }
                })
                .filter((item) => item || item === 0);
        }
    } catch (e) {
        console.error(e);
    }
    return result;
}
export default function OperationManage(props) {
    const [operationList, setOperationList] = useState([]); // 运营动作列表
    const [operationMap, setOperationMap] = useState({}); // 运营动作map
    const [operationMatterList, setOperationMatterList] = useState([]); // 运营动作事项列表
    const [operationMatterMap, setOperationMatterMap] = useState({}); // 运营动作事项map
    const [onlineGroupList, setOnlineGroupList] = useState([]); // 在线业务组列表
    const [onlineGroupMap, setOnlineGroupMap] = useState({}); // 在线业务组Map
    const [inCallGroupList, setInCallGroupList] = useState([]); // 来电业务组列表
    const [inCallGroupMap, setInCallGroupMap] = useState({}); // 来电业务组Map
    const isResetForm = useRef(false); // 是否重置
    const isJsQueryRef = useRef(false); // 是否js调用查询的
    const pageInfoRef = useRef(defaultPageInfo);
    const [modalInfo, setModalInfo] = useState({
        type: modalType.add.type,
        title: modalType.add.name,
        data: {},
        visible: false,
    });

    const [dispatchAndNoChangeParams, queryParamsMiddleware] =
        useFormQueryNoChangeParams();

    /**
     * 获取枚举（渠道列表）
     */
    const getEnumOptions = async () => {
        const map = {
            [olhelpEnumOptionType.OperationActionMatter]: (list, map) => {
                setOperationMatterList(list);
                setOperationMatterMap(map);
            },
        };
        const res = await get({
            url: Api.getEnumOptions,
            params: {
                groupNames: groupNamesList.join(","),
            },
        });
        if (res.success) {
            const data = res.data;
            Array.isArray(data) &&
                data.forEach((item) => {
                    const func = map[item.groupName];
                    if (func) {
                        let obj = {};
                        let optionsList = [];
                        item.options &&
                            item.options.forEach((item) => {
                                obj[item.id] = item.name;
                                optionsList.push({
                                    ...item,
                                    label: item.name,
                                    value: item.id,
                                });
                            });
                        func(optionsList, obj);
                    }
                });
        } else {
            message.error(res.message);
        }
    };

    /**
     * 获取运营动作接口
     */
    const getOperationList = async () => {
        const res = await get({
            url: Api.getOperateActionOption,
            params: {},
        });
        if (res.success) {
            const data = res.data;
            let obj = {};
            let optionsList = [];
            Array.isArray(data) &&
                data.forEach((item) => {
                    obj[item.code] = item.name;
                    optionsList.push({
                        ...item,
                        label: item.name,
                        value: item.code,
                    });
                });
            setOperationList(optionsList);
            setOperationMap(obj);
        } else {
            message.error(res.message);
        }
    };

    /**
     * 获取业务组信息
     */
    const getGroupList = async (type) => {
        const map = {
            [workGroupType.online]: (list, map) => {
                setOnlineGroupList(list);
                setOnlineGroupMap(map);
            },
            [workGroupType.call]: (list, map) => {
                setInCallGroupList(list);
                setInCallGroupMap(map);
            },
        };
        const res = await get({
            url: Api.getCommonGroupList,
            params: {
                type,
            },
        });
        if (res.success) {
            const data = res.data;
            let obj = {};
            if (Array.isArray(data)) {
                data.forEach((item) => {
                    obj[item.id] = item.name;
                });
            }
            map[type] && map[type](data, obj);
        } else {
            message.error(res.message);
        }
    };

    /**
     * 获取在线组信息
     */
    const getOnlineGroupList = () => {
        getGroupList(workGroupType.online);
    };

    /**
     * 获取在线组信息
     */
    const getInCallGroupList = () => {
        getGroupList(workGroupType.call);
    };
    const columns = [
        {
            title: "code",
            dataIndex: "code",
            ellipsis: true,
            align: "center",
        },
        {
            title: "运营动作",
            dataIndex: "operateActionName",
            ellipsis: true,
            align: "center",
        },
        {
            title: "事项",
            dataIndex: "matterList",
            ellipsis: true,
            align: "center",
            render: function (text, record) {
                if (!Array.isArray(text)) {
                    return null;
                }
                let obj = {};
                const result = text
                    .map((item) => {
                        if (!obj[item.matterCode]) {
                            obj[item.matterCode] = item;
                            return item.matterName || item.matterCode;
                        }
                    })
                    .join(";");
                return <span>{result}</span>;
            },
        },
        {
            title: "在线组",
            dataIndex: "onlineGroupsList",
            ellipsis: true,
            align: "center",
            render: function (text, record) {
                if (!Array.isArray(text)) {
                    return null;
                }
                let obj = {};
                const groupNameList = text.map((item) => {
                    if (!obj[item.skillGroupId]) {
                        obj[item.skillGroupId] = item;
                        return item.skillGroupName;
                    }
                });
                return (
                    <span title={groupNameList.join(",")}>
                        {groupNameList.length > 0 &&
                            isShowMap[record.isShowOnline] && (
                                <span className="label">
                                    {isShowMap[record.isShowOnline].name}
                                </span>
                            )}
                        {groupNameList.length}
                    </span>
                );
            },
        },
        {
            title: "来电组",
            dataIndex: "incallGroupsList",
            ellipsis: true,
            align: "center",
            render: function (text, record) {
                if (!Array.isArray(text)) {
                    return null;
                }
                let obj = {};
                const groupNameList = text.map((item) => {
                    if (!obj[item.skillGroupId]) {
                        obj[item.skillGroupId] = item;
                        return item.skillGroupName;
                    }
                });
                return (
                    <span title={groupNameList.join(",")}>
                        {groupNameList.length > 0 &&
                            isShowMap[record.isShowIncall] && (
                                <span className="label">
                                    {isShowMap[record.isShowIncall].name}
                                </span>
                            )}
                        {groupNameList.length}
                    </span>
                );
            },
        },
        {
            title: "最后修改人",
            dataIndex: "modifierName",
            ellipsis: true,
            align: "center",
            render: function (text, record) {
                return (
                    <span className="modifier-box">
                        {record.lastModifier && (
                            <div>{record.lastModifier}</div>
                        )}
                        {record.lastModifyTime && (
                            <div>{record.lastModifyTime}</div>
                        )}
                    </span>
                );
            },
        },
        {
            title: "操作",
            dataIndex: "id",
            align: "center",
            width: 100,
            render: function (text, record) {
                return (
                    <div className="option-box">
                        <span
                            onClick={() => {
                                editOperationSetting(record);
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
        let params = {
            actionCodeList: values?.operateAction?.join(","),
            pageIndex: pagination.current || defaultPageIndex,
            pageSize: pagination.pageSize || defaultPageSize,
        };
        if (isJsQueryRef.current) {
            params.pageIndex = pageInfoRef.current.pageIndex;
            params.pageSize = pageInfoRef.current.pageSize;
        }
        const res = await get({
            url: Api.getOperationActionList,
            params,
        });

        if (res.success) {
            const data = res.data;
            pageInfoRef.current = {
                pageIndex: data.pageIndex,
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

    /**
     * 新增
     */
    const addOperationSetting = () => {
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
    const editOperationSetting = async (item) => {
        const { id } = item;
        if (!id && id != 0) {
            return;
        }
        const detailData = formatItemData(item, {
            onlineGroupMap,
            inCallGroupMap,
            operationMatterMap,
        });
        setModalInfo({
            type: modalType.edit.type,
            title: modalType.edit.name,
            data: detailData,
            visible: true,
        });
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
            dispatchAndNoChangeParams();
        }
    };

    /**
     * 删除方法
     */
    const deleteFunc = async (id) => {
        try {
            const data = await post({
                url: Api.postOperationActionDelete,
                data: { id },
            });
            if (data.success) {
                isJsQueryRef.current = true;
                dispatchAndNoChangeParams();
                message.success("删除成功");
            } else {
                message.error(data.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 删除点击
     */
    const deleteHandler = (id) => {
        Modal.confirm({
            title: "提示",
            content: "是否确定删除该记录",
            onOk: () => {
                deleteFunc(id);
            },
        });
    };

    /**
     * 初始化调用function
     */
    const initFunc = () => {
        getEnumOptions();
        getOperationList();
        getOnlineGroupList();
        getInCallGroupList();
    };

    useEffect(() => {
        initFunc();
    }, []);

    return (
        <div className="operation-manage">
            <SchemaForm {...form} inline className="form-wrap">
                <Field
                    name="operateAction"
                    title="运营动作名称"
                    x-component="Select"
                    x-component-props={{
                        placeholder: "请选择运营动作名称",
                        allowClear: true,
                        dataSource: operationList,
                        className: "inline-width-300",
                        showSearch: true,
                        optionFilterProp: "children",
                        mode: "multiple",
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
                        onClick={() => addOperationSetting()}
                    >
                        新增
                    </Button>
                </div>
                <Table
                    className="table-wrap"
                    {...table}
                    columns={columns}
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
                footer={null}
                title={modalInfo.title}
                visible={modalInfo.visible}
                onCancel={() => {
                    modalOnCancel();
                }}
                destroyOnClose={true}
                width={750}
                className="vip-edit-modal"
            >
                <EditModal
                    onlineGroupList={onlineGroupList}
                    inCallGroupList={inCallGroupList}
                    operationList={operationList}
                    operationMatterList={operationMatterList}
                    isShowList={isShowList}
                    isShowMap={isShowMap}
                    type={modalInfo.type}
                    data={modalInfo.data}
                    onCancel={modalOnCancel}
                />
            </Modal>
        </div>
    );
}
