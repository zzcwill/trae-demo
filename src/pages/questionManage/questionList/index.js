import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import AppLongText from "@/components/common/longText";
import AppTable from "@/components/common/table";
import useGetList from "@/components/common/hooks/useGetList";
import UserFuzzyQuery from "@/components/olhelpCommon/userFuzzyQuery";
import { get, post } from "@/request/request";
import { getQuestionStatus, getReplyAuditStatus } from "@/const/type";
import {
    previewStr
} from "@/utils/htmlToPlainText";
import Api from "@/request/api-olhelpmanage";
import { message, Button, Table, Pagination, Modal, TreeSelect } from "dpl-react";
import history from "@/history";

// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 10;
// 设置组优先级弹窗默认蚕食
const defaultEditModal = {
    isShow: false,
    id: undefined,
    name: "新增",
    QuestionListObj: undefined, // 具体信息
};

// 查询组件中的特有组件对象
const otherComponentSConfig = {
    employeeSearch: UserFuzzyQuery,
};

export default function QuestionList(props) {
    const formFilterRef = useRef(null);
    const [labels, setLabels] = useState([])

    useEffect(() => {
        getLabels()
    }, [])

    const [queryParams, setQueryParams] = useState(() => {
        let data = qs.parse(window.location.href.split("?")[1]);
        return Object.assign(
            {
                pageIndex: defaultPageIndex,
                pageSize: defaultPageSize,
            },
            data
        );
    }); // 查询参数

    const getLabels = async () => {
        const data = await get({ url: Api.getCommonLabels })
        if (data.success) {
            setLabels(data.data)
        }
    }

    /**
     * 查询列表Function
     * @param {Object} params // 查询参数
     */
    const getQuestionList = (params) => {
        return get({
            url: Api.getQuestionList,
            params,
        });
    };

    // 封装的获取列表自定义hooks
    const { params, getList, loading, total, changeParams, list } = useGetList({
        queryFunc: getQuestionList,
        defaultParam: queryParams,
        isUseQueryString: true,
        isSearchRightNow: true,
    });

    // 查询参数配置
    const filterConfig = [
        {
            type: "input", // string 组件类型 必填
            key: "question", // string 字段名称 必填
            label: "用户问题", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            span: 6,
            other: {
                placeholder: "请输入用户问题",
            }, // 组件中的其他可取字段内容
        },
        {
            type: "input", // string 组件类型 必填
            key: "mobile", // string 字段名称 必填
            label: "用户手机号", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            span: 6,
            other: {
                placeholder: "请输入用户手机号",
                type: "number"
            },
        },
        // {
        //     type: "treeSelect", // string 组件类型 必填
        //     key: "labelId", // string 字段名称 必填
        //     label: "问题标签", // string label名称 非必填 默认为空
        //     span: 6,
        //     orgTree: labels,
        //     treeNodeFilter: {
        //         key: "labelId",
        //         value: "labelId",
        //         title: "labelName",
        //         children: "children",
        //     },
        //     other: {
        //         placeholder: "请选择问题标签",
        //         // mode: "multiple",
        //         maxTagCount: "1",
        //         maxTagTextLength: "5",
        //         allowClear: true,
        //         // treeCheckable: true,
        //         showCheckedStrategy: TreeSelect.SHOW_CHILD,
        //         getPopupContainer: (triggerNode) => triggerNode.parentNode,
        //     }, // input中的其他可取字段内容
        // },
        {
            type: "cascader", // string 组件类型 必填
            key: "labelId", // string 字段名称 必填
            label: "问题标签", // string label名称 非必填 默认为空
            span: 6,
            options: labels,
            optionFormat: {
                key: "labelId",
                value: "labelId",
                title: "labelName",
                children: "children",
            },
            other: {
                placeholder: "请选择问题标签",
                allowClear: true,
                showSearch: true
            },
        },
        {
            type: "select", // string 组件类型 必填
            key: "questionStatus", // string 字段名称 必填
            label: "问题状态", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            span: 6,
            options: getQuestionStatus(), // 选项
            other: {
                placeholder: "请选择问题当前状态",
                allowClear: true,
            }, // input中的其他可取字段内容
        },
        {
            type: "datePickerRangePicker",
            key: "askDate",
            label: "提问时间",
        },
        {
            type: "datePickerRangePicker",
            key: "replyDate",
            label: "问答时间",
        },
        {
            type: "employeeSearch", // string 组件类型 必填
            key: "replyTrueId", // string 字段名称 必填
            label: "回答人", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            initialValue: queryParams.replyId || undefined,
            placeholder: "请选择回答人",
            other: {

            }, // input中的其他可取字段内容
        },
        {
            type: "select", // string 组件类型 必填
            key: "replyAuditStatus", // string 字段名称 必填
            label: "回答状态", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            span: 6,
            options: getReplyAuditStatus(), // 选项
            other: {
                placeholder: "请选择问题当前状态",
                allowClear: true,
            }, // input中的其他可取字段内容
        },
    ];

    /**
     * 表格配置
     */
    const tableConfig = [
        {
            title: "问题序号",
            dataIndex: "questionId",
        },
        {
            title: "用户问题",
            dataIndex: "question",
            className: 'lone-content',
            render: (text) => {
                return <AppLongText text={text} maxWidth={250}/>;
            }
        },
        {
            title: "问题标签",
            dataIndex: "labelList",
            className: 'lone-content',
            render: (text) => {
                const pre = text ? text.join(',') : '';
                return <AppLongText text={pre} maxWidth={250}/>;
            }
        },
        {
            title: "当前状态",
            dataIndex: "questionStatus",
            render: (text) => (
                <span>
                    {getQuestionStatus(text)}
                </span>
            ),
        },
        {
            title: "提问时间",
            dataIndex: "askTime",
        },
        {
            title: "提问用户手机号",
            dataIndex: "mobile",
        },
        {
            title: "操作",
            dataIndex: "option",
            align: "center",
            width: 120,
            render: (text, record, index) => {
                return (
                    <div className="option-button-list">
                        {record.questionStatus !== 'DELETE' &&
                            <span
                                onClick={() => gotoDetail('add', record)}
                                className="option-button"
                            >
                                新增回答
                            </span>
                        }
                        {record.questionStatus === 'DELETE' &&

                            <span
                                className="option-button option-button-gray"
                            >
                                新增回答
                            </span>
                        }
                    </div>
                );
            },
        },
    ];

    // 展开菜单配置

    const expandedRowRender = (record, index, indent, expanded) => {
        const columns = [
            { title: '回答序号', dataIndex: 'replyId' },
            {
                title: '回答内容', dataIndex: 'reply',
                render: (text) => {
                    const pre = previewStr(text, text.length)
                    return <AppLongText text={pre} />;
                }
            },
            {
                title: '适用地区',
                dataIndex: 'locationList',
                render: (text) => {
                    const pre = text ? text.map(item => item.name).join(',') : '无'
                    return <AppLongText text={pre} />;
                }
            },
            {
                title: '审核状态', dataIndex: 'replyAuditStatus',
                render: (text) => (
                    <span>{getReplyAuditStatus(text)}</span>
                ),
            },
            { title: '回答时间', dataIndex: 'replyTime' },
            { title: '回答人署名', dataIndex: 'replyName' },
            { title: '回答人', dataIndex: 'replyRealName' },
            {
                title: '操作',
                dataIndex: 'operation',
                align: "center",
                width: 120,
                render: (text, subRecord) => (
                    <div>
                        {record.questionStatus !== 'DELETE' && subRecord.replyAuditStatus !== 'AUDIT_PASS' &&
                            <div className="option-button-list">
                                <span
                                    onClick={() => gotoDetail('reply', subRecord)}
                                    className="option-button"
                                >
                                    编辑
                                </span>
                                <span
                                    onClick={() => {
                                        deleteSubRecord(subRecord)
                                    }}
                                    className="option-button"
                                >
                                    删除
                                </span>
                            </div>
                        }
                        {(record.questionStatus === 'DELETE' || subRecord.replyAuditStatus === 'AUDIT_PASS') &&
                            <div className="option-button-list">
                                <span
                                    className="option-button option-button-gray"
                                >
                                    编辑
                                </span>
                                <span
                                    className="option-button option-button-gray"
                                >
                                    删除
                                </span>
                            </div>
                        }
                    </div>
                ),
            },
        ];

        const data = record.replyList || [];
        return <Table columns={columns} dataSource={data} pagination={false} rowKey={"replyId"} bordered={false} />;
    };

    /**
     * 查询
     */
    const query = () => {
        const data = formFilterRef.current.getData();
        const param = Object.assign(
            {
                pageIndex: defaultPageIndex,
                pageSize: defaultPageSize,
            },
            data,
            {
                labelId: data.labelId ? data.labelId[data.labelId.length - 1] : undefined,
                questionStatus: data.questionStatus === "all" ? undefined : data.questionStatus,
                replyAuditStatus: data.replyAuditStatus === "all" ? undefined : data.replyAuditStatus,
                askDateBegin:
                    data.askDate && data.askDate.length > 0
                        ? data.askDate[0].format("YYYY-MM-DD")
                        : undefined, // 问题创建时间起（仅日期）
                askDateEnd:
                    data.askDate && data.askDate.length > 0
                        ? data.askDate[1].format("YYYY-MM-DD")
                        : undefined, // 	问题创建时间止（仅日期）
                replyDateBegin:
                    data.replyDate && data.replyDate.length > 0
                        ? data.replyDate[0].format("YYYY-MM-DD")
                        : undefined, // 问题创建时间起（仅日期）
                replyDateEnd:
                    data.replyDate && data.replyDate.length > 0
                        ? data.replyDate[1].format("YYYY-MM-DD")
                        : undefined, // 	问题创建时间止（仅日期）
            }
        );
        delete param.askDate;
        delete param.replyDate;
        changeParams(param);
    };

    const deleteSubRecord = (subRecord) => {
        console.log('删除', subRecord.replyId);
        Modal.confirm({
            title: "是否确定要删除",
            okText: "确认",
            cancelText: "取消",
            wait: true,
            onOk: async () => {
                const data = await post({
                    url: Api.postDeleteReply, data: {
                        id: subRecord.replyId
                    }
                })
                if (data.success) {
                    message.success("删除成功");
                    getList();
                } else {
                    message.error(data.message);
                }
            }
        })

    }

    const gotoDetail = (type, record) => {
        let url =
            window.location.href.split("#")[0] +
            "#/questionManage/questionList/addAnswer?type=edit&";
        if (type === 'add') {
            url += `questionId=${record.questionId}`
        } else {
            url += `questionId=${record.questionId}&replyId=${record.replyId}`
        }

        window.open(url);
    }

    /**
     * 重置
     */
    const resert = () => {
        formFilterRef.current.clearData();
        changeParams({
            pageIndex: defaultPageIndex,
            pageSize: defaultPageSize,
        });
    };

    /**
     * 分页
     */
    const changePage = (pageIndex, pageSize) => {
        changeParams(
            Object.assign({}, params, {
                pageIndex,
                pageSize,
            })
        );
    };



    return (
        <div className="app-bg-box question-bg-box">
            <div className="app-search-box">
                <FormFilter config={filterConfig} ref={formFilterRef} selfComponents={otherComponentSConfig} />
                <div className="app-buttons">
                    <Button
                        type="primary"
                        className="app-button"
                        loading={loading}
                        onClick={() => {
                            query();
                        }}
                    >
                        搜索
                    </Button>
                    <Button
                        className="app-button"
                        disabled={loading}
                        onClick={() => {
                            resert();
                        }}
                    >
                        清空条件
                    </Button>
                </div>
            </div>
            <div className="app-table-box">
                <AppTable 
                    dataSource={list}
                    loading={loading}
                    columns={tableConfig}
                    expandedRowRender={expandedRowRender}
                    pagination={
                        {
                            current: parseInt(params.pageIndex),
                            pageSize: parseInt(params.pageSize),
                            total: total,
                            onPageChange: changePage
                        }
                    }
                    rowKey={"questionId"}
                    className="margin-top15"
                />
            </div>
        </div>
    );
}
