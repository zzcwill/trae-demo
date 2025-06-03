import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Button, message, Modal, Table } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { acceptanceChannelCode, callcenterCode } from "@/const/config";
import WorkGroup from "@/pages/employeeManage/workTimeManage/components/workGroup";
import useFormQueryNoChangeParams from "@/hooks/useFormQueryNoChangeParams";
import AddSpecialDayModal from "@/pages/employeeManage/specialDayManage/components/addModal";
import moment from "moment";
import SpecialDayEditModal from "@/pages/employeeManage/specialDayManage/components/editModal";
import { workFlagType } from "@/pages/employeeManage/workTimeManage/config";
import GroupCompanyAndOrg from "@/components/employeeManage/groupCompanyAndOrg";
import CommonOrgTree from '@/components/common/commonOrgTree'
import sessionStorageHelper from "@/utils/sessionStorage";
const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    useFormTableQuery,
    Submit,
    FormButtonGroup,
    Reset,
} = uForm;
const defaultFormData = {
  workGroup: {
      type: acceptanceChannelCode.call,
      groupIdList: [],
  },
  // companyAndOrg: {
  //     companyId: undefined,
  //     departIdList: undefined,
  // },
  bigRegionCodeList: [],
};
const isLastModifierOption = [
    {
        value: "1",
        label: "最后修改人是我",
    },
];
const defaultEditModalInitValue = {
    _groupView: [],
    workTime: {
        workFlag: "1",
        workTime: [
            {
                beginTime: moment(new Date("2020/07/09 08:30")),
                endTime: moment(new Date("2020/07/09 17:30")),
            },
        ],
    },
};
const defaultPageIndex = 1;
export default function SpecialDayManage(props) {
    const [callGroup, setCallGroup] = useState([]); // 电话组
    const [callGroupMap, setCallGroupMap] = useState({}); // 电话组map
    const [onlineGroup, setOnlineGroup] = useState([]); // 在线组
    const [onlineGroupMap, setOnlineGroupMap] = useState({}); // 在线组map
    const [groupMap, setGroupMap] = useState({}); // 组map
    const [companyList, setCompanyList] = useState([]); // 受理机构
    const [orgList, setOrgList] = useState([]); // 受理部门
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editModalInitValue, setEditModalInitValue] = useState(
        defaultEditModalInitValue
    );
    const [isBatchEdit, setIsBatchEdit] = useState(false);
    const [currentEditItem, setCurrentEditItem] = useState({});
    const userInfo = sessionStorageHelper.getItem('__userInfo')
    const treeDefaultExpandedKeys = userInfo && userInfo.regionCompanyCode ? [userInfo.regionCompanyCode] : [];    

    const isResetForm = useRef(false); // 是否重置了选择数据
    // 获取业务组信息
    const getWorkGroupList = async (type) => {
        try {
            const res = await get({
                url: Api.getWorkGroupList,
                params: {
                    type,
                },
            });
            if (res.success) {
                const data = res.data;
                let dataMap = {};
                data.forEach((item) => {
                    dataMap[item.id] = Object.assign({}, item);
                });
                if (type === acceptanceChannelCode.call) {
                    setCallGroup(data);
                    setCallGroupMap(dataMap);
                } else {
                    setOnlineGroup(data);
                    setOnlineGroupMap(dataMap);
                }
                setGroupMap((state) => {
                    return Object.assign({}, state, dataMap);
                });
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 获取受理机构
     */
    const getCompanyList = async () => {
        const res = await get({
            url: Api.getCompanyList,
            params: {
                needRemoteCenter: true,
            },
        });
        if (res.success) {
            const data = res.data;
            setCompanyList(data);
        } else {
            message.error(res.message);
        }
    };

    /**
     * 获取受理部门
     */
    const getOrgList = async () => {
        const res = await get({
            url: Api.getDepartmentList,
            params: {
                companyId: callcenterCode,
            },
        });
        if (res.success) {
            const data = res.data;
            setOrgList(data);
        } else {
            message.error(res.message);
        }
    };

    const columns = [
        {
            title: "名称",
            dataIndex: "groupName",
            ellipsis: true,
            align: "center",
        },
        {
            title: "操作",
            dataIndex: "id",
            ellipsis: true,
            align: "center",
            render(text, record) {
                return (
                    <div className="operation">
                        <div
                            onClick={() => {
                                setShowEditModal(true);
                                setIsBatchEdit(false);
                                setCurrentEditItem(record);
                                let workTime = [];
                                if (
                                    Array.isArray(record.workTime) &&
                                    record.workTime.length > 0
                                ) {
                                    workTime = record.workTime.map((item) => {
                                        return {
                                            beginTime: moment(
                                                "2020/07/10 " + item.beginTime
                                            ),
                                            endTime: moment(
                                                "2020/07/10 " + item.endTime
                                            ),
                                        };
                                    });
                                } else {
                                    workTime = [
                                        {
                                            beginTime: moment(
                                                new Date("2020/07/09 08:30")
                                            ),
                                            endTime: moment(
                                                new Date("2020/07/09 17:30")
                                            ),
                                        },
                                    ];
                                }
                                setEditModalInitValue({
                                    _groupView: [record.groupName],
                                    workTime: {
                                        workFlag: record.workFlag,
                                        workTime: workTime,
                                    },
                                });
                            }}
                        >
                            修改
                        </div>
                        <div
                            onClick={() => {
                                deleteHandler([text]);
                            }}
                        >
                            删除
                        </div>
                    </div>
                );
            },
        },
        {
            title: "类型",
            dataIndex: "type",
            ellipsis: true,
            align: "center",
            render(text) {
                return <div>{text === "1" ? "电话组" : "在线组"}</div>;
            },
        },
        {
            title: "特殊日",
            dataIndex: "specialDay",
            ellipsis: true,
            align: "center",
        },
        {
            title: "是否上班",
            dataIndex: "workFlag",
            ellipsis: true,
            align: "center",
            render(text) {
                return <div>{text == "0" ? "是" : "否"}</div>;
            },
        },
        {
            title: "上班时间",
            dataIndex: "workTime",
            ellipsis: true,
            align: "center",
            render(text) {
                return (
                    <div>
                        {Array.isArray(text)
                            ? text.map((item) => {
                                  return (
                                      <div>
                                          {item.beginTime}-{item.endTime}
                                      </div>
                                  );
                              })
                            : ""}
                    </div>
                );
            },
        },
    ];

    const submitClickFunc = () => {
        isResetForm.current = false;
    };

    const middleware = ({ context }) => ({
        onFormWillQuery(payload, next) {
            setSelectedRowKeys([]);
            return next(payload);
        },
        onFormResetQuery(payload, next) {
            setSelectedRowKeys([]);
            isResetForm.current = true;
            context.setPagination({
                ...context.pagination,
                current: defaultPageIndex,
            });
            // type 不能为空，所以重置的时候手动设置一个type
            return next({
                ...defaultFormData,
                ...payload,
            });
        },
        onPageQuery(payload, next) {
            // 手动将表单数据清除
            context.setPagination({
                ...context.pagination,
            });
            return next(isResetForm.current ? { ...defaultFormData } : payload);
        },
    });
    const [dispatchNoChangeParams, noChangeParamsMiddleware] =
        useFormQueryNoChangeParams();
    const service = async ({
        values,
        pagination,
        sorter = {},
        filters = {},
    }) => {
        const data = await post({
            url: Api.specialDayList,
            data: {
                pageSize: pagination.pageSize,
                pageIndex: pagination.current,
                type: values.workGroup.type,
                groupIdList: values.workGroup.groupIdList.join(","),
                lastModifierFlag:
                    values.lastModifierFlag && values.lastModifierFlag[0]
                        ? "1"
                        : "0",
                // companyId:
                //     (values.companyAndOrg && values.companyAndOrg.companyId) ||
                //     undefined,
                // departId:
                //     (values.companyAndOrg &&
                //         values.companyAndOrg.departIdList) ||
                //     undefined,
                bigRegionCodeList: values.bigRegionCodeList
            },
        });
        return {
            dataSource: data.data.list,
            pageSize: data.data.pageSize,
            total: data.data.total,
            current: data.data.pageIndex,
        };
    };
    const { form, table } = useFormTableQuery(
        service,
        {
            isUseQueryBySubmit: true,
            pagination: {
                // todo:是否需要修改默认500
                pageSize: 20,
                showSizeChanger: true,
                showQuickJumper: true,
            },
        },
        [middleware, noChangeParamsMiddleware]
    );
    const batchDeleteHandler = () => {
        if (selectedRowKeys.length <= 0) {
            message.error("至少选择一条记录");
            return;
        }
        deleteHandler(selectedRowKeys);
    };
    const deleteHandler = (ids) => {
        Modal.confirm({
            title: "删除提示",
            content: "是否确定要删除",
            onOk: async function () {
                const data = await post({
                    url: Api.specialBatchBatchDelete,
                    data: { idList: ids, type: table.dataSource[0].type },
                });
                if (data.success) {
                    message.success("删除成功");
                    dispatchNoChangeParams();
                } else {
                    message.error(data.message);
                }
            },
        });
    };
    const addHandler = async (values) => {
        try {
            let params = {
                type: values.type,
                groupIdList: values.groupIdList,
                specialDate: [],
            };
            values.specialDate.forEach((item) => {
                let obj = {
                    beginDay: item.beginDay.format("YYYY-MM-DD"),
                    endDay: item.endDay.format("YYYY-MM-DD"),
                    workFlag: item.workFlag,
                    workTime: [],
                };
                if (item.workFlag == "0") {
                    item.workTime.forEach((workTime) => {
                        obj.workTime.push({
                            beginTime: workTime.beginTime.format("HH:mm"),
                            endTime: workTime.endTime.format("HH:mm"),
                        });
                    });
                }
                params.specialDate.push(obj);
            });
            const data = await post({ url: Api.specialDaySave, data: params });
            if (data.success) {
                message.success("添加成功");
                setShowAddModal(false);
                dispatchNoChangeParams();
            } else {
                message.error(data.message);
            }
        } catch (e) {
            message.error("未知异常，请刷新页面重试");
        }
    };
    const initFunc = () => {
        getWorkGroupList(acceptanceChannelCode.call);
        getWorkGroupList(acceptanceChannelCode.online);
        getCompanyList(); // 获取受理机构
        getOrgList(); // 获取受理部门
    };
    const editHandler = async (value) => {
        try {
            value = value.workTime;

            let params = {
                type: table.dataSource[0].type,
                idList: [],
                workFlag: value.workFlag,
                workTime: [],
            };
            if (isBatchEdit) {
                params.idList = selectedRowKeys;
            } else {
                params.idList = [currentEditItem.id];
            }

            if (params.workFlag == "0") {
                params.workTime = value.workTime.map((item) => {
                    return {
                        beginTime: item.beginTime.format("HH:mm"),
                        endTime: item.endTime.format("HH:mm"),
                    };
                });
            }
            const data = await post({
                url: Api.specialBatchUpdate,
                data: params,
            });
            if (data.success) {
                message.success("修改成功");
                dispatchNoChangeParams();
                setShowEditModal(false);
            } else {
                message.error(data.message);
            }
        } catch (e) {
            message.error("未知异常，请刷新页面重试");
        }
    };
    useEffect(() => {
        initFunc();
    }, []);

    return (
        <div className="special-day-manage">
            <SchemaForm
                {...form}
                inline
                className="form-wrap"
                initialValues={defaultFormData}
                components={{
                    workGroupComponent: WorkGroup,
                    GroupCompanyAndOrg,
                    CommonOrgTree,
                }}
            >
                {/* <Field
                    type="Object"
                    name="companyAndOrg"
                    x-component="GroupCompanyAndOrg"
                    x-component-props={{
                        style: { width: 900 },
                        other: { companyList, orgList, multiple: false },
                    }}
                /> */}
                <Field
                  type="Array"
                  title="受理机构"
                  name="bigRegionCodeList"
                  x-component="CommonOrgTree"
                  x-component-props={{
                    style: { width: 340 },
                    multiple: true, // 是否多选
                    showSearch: true, // 是否显示搜索框
                    treeDefaultExpandedKeys,
                  }}
                />
                <Field
                    type="Object"
                    title="业务组"
                    name="workGroup"
                    x-component="workGroupComponent"
                    x-component-props={{
                        groupMap: groupMap,
                        callGroupList: callGroup,
                        onlineGroupList: onlineGroup,
                        companyList,
                        orgList
                    }}
                />

                <Field
                    type="string"
                    name="lastModifierFlag"
                    x-component="CheckboxGroup"
                    x-component-props={{
                        options: isLastModifierOption,
                    }}
                />
                <FormButtonGroup>
                    <Submit
                        style={{ marginRight: 10 }}
                        onClick={submitClickFunc}
                    />
                    <Reset />
                </FormButtonGroup>
            </SchemaForm>
            <div className="btn-group">
                <Button
                    type="primary"
                    onClick={() => {
                        setShowAddModal(true);
                    }}
                >
                    新增
                </Button>
                <Button
                    type="primary"
                    style={{ marginLeft: 10, marginRight: 10 }}
                    onClick={() => {
                        if (selectedRowKeys.length <= 0) {
                            message.error("至少选择一条记录");
                            return;
                        }
                        setShowEditModal(true);
                        setIsBatchEdit(true);
                        let groupName = table.dataSource
                            .filter(
                                (item) => selectedRowKeys.indexOf(item.id) >= 0
                            )
                            .map((item) => item.groupName);
                        setEditModalInitValue(
                            Object.assign({}, defaultEditModalInitValue, {
                                _groupView: groupName,
                            })
                        );
                    }}
                >
                    批量修改
                </Button>
                <Button type="primary" onClick={batchDeleteHandler}>
                    批量删除
                </Button>
            </div>
            <Table
                className="table-wrap"
                {...table}
                onChange={(pagination, filters, sorter) => {
                    table.onChange(pagination, null, null);
                }}
                pagination={{
                    ...table.pagination,
                    pageSizeOptions: ["10", "20", "50", "100", "500"],
                }}
                columns={columns}
                rowKey={"id"}
                rowSelection={{
                    onChange(selectedRowKeys) {
                        setSelectedRowKeys(selectedRowKeys);
                    },
                    selectedRowKeys: selectedRowKeys,
                }}
            />
            <AddSpecialDayModal
                visible={showAddModal}
                callList={callGroup}
                callMap={callGroupMap}
                onlineList={onlineGroup}
                onlineMap={onlineGroupMap}
                companyList={companyList}
                orgList={orgList}
                onCancel={() => {
                    setShowAddModal(false);
                }}
                onOk={addHandler}
            />
            <SpecialDayEditModal
                visible={showEditModal}
                onCancel={() => {
                    setShowEditModal(false);
                }}
                initialValues={editModalInitValue}
                onOk={editHandler}
            />
        </div>
    );
}
