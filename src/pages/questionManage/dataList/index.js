import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import AppLongText from "@/components/common/longText";
import AppTable from "@/components/common/table";
import useGetList from "@/components/common/hooks/useGetList";
import UserFuzzyQuery from "@/components/olhelpCommon/userFuzzyQuery";
import { get, post } from "@/request/request";
import { getQuestionSolveStatus } from "@/const/type";
import Api from "@/request/api-olhelpmanage";
import VoteDownModal from "./components/voteDown";
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

export default function DataList(props) {
    const formFilterRef = useRef(null);
    const [detail, setDetail] = useState([])
    const [showModel, setShowModel] = useState(false)
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
            url: Api.getAskQuestionDataList,
            params,
        });
    };


    const listFormat = (list) => {
        const newList = list.map(item => {
            const reply = item.reply;
            delete item.reply;
            return {
                ...item,
                ...reply
            }
        })
        return newList
    }
    // 封装的获取列表自定义hooks
    const { params, getList, loading, total, changeParams, list } = useGetList({
        queryFunc: getQuestionList,
        listFormat,
        defaultParam: queryParams,
        isUseQueryString: true,
        isSearchRightNow: true,
    });

    // 查询参数配置
    const filterConfig = [
        {
            type: "input", // string 组件类型 必填
            key: "mobile", // string 字段名称 必填
            label: "提问人", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            span: 6,
            other: {
                placeholder: "请输入提问人手机号",
            },
        },
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
            },
        },
        {
            type: "datePickerRangePicker",
            key: "askDate",
            label: "提问时间",
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
            type: "datePickerRangePicker",
            key: "replyDate",
            label: "问答时间",
        },
        {
            type: "select", // string 组件类型 必填
            key: "isSolve", // string 字段名称 必填
            label: "是否采纳", // string label名称 非必填 默认为空
            labelWidth: "100px", // number label的width值 非必填 默认为100
            span: 6,
            options: getQuestionSolveStatus(), // 选项
            other: {
                placeholder: "请选择是否采纳",
                allowClear: true,
            }, // input中的其他可取字段内容
        },

    ];
    const columns = [
        { title: '回答序号', dataIndex: 'replyId' },
        {
            title: "回答人",
            dataIndex: "replyRealName",
        },
        { title: '回答时间', dataIndex: 'replyTime' },
        { title: '问题序号', dataIndex: 'questionId' },
        {
            title: "问题标签",
            dataIndex: "labelList",
            className: 'lone-content',
            render: (text) => {
                const pre = text ? text.join(',') : '';
                return <AppLongText text={pre} maxWidth={250} />;
            }
        },
        {
            title: '问题性质', dataIndex: 'openStatus',
            render: (text) => (
                <span>{text === 'Y' ? '公开' : (text === 'N' ? '私密' : '')}</span>
            ),
        },
        { title: '提问时间', dataIndex: 'askTime' },
        { title: '提问人', dataIndex: 'mobile' },
        {
            title: '是否采纳', dataIndex: 'isSolve',
            render: (text) => (
                <span>{text === 'Y' ? '已采纳' : (text === 'N' ? '未采纳' : '')}</span>
            ),
        },
        { title: '顶', dataIndex: 'vote' },
        {
            title: '踩', dataIndex: 'voteDown',
            render: (text,record) => (
                <span className="option-button-list"
                >
                    {Number(text) > 0 && <span className="option-button" onClick={() => showDetail(record)}>{text}</span>}
                    {Number(text) == 0 && <span >{text}</span>}
                </span>
            ),
        },
    ]

    const showDetail = async (record) => {
        const data = await get({ url: Api.getAskQuestionVoteDownList, params: { replyId: record.replyId } })
        if (data.success) {
            if(Array.isArray(data.data)) {
                setDetail(data.data)
                setShowModel(true)
            }
        }
    }

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
                    columns={columns}
                    pagination={
                        {
                            current: parseInt(params.pageIndex),
                            pageSize: parseInt(params.pageSize),
                            total: total,
                            onPageChange: changePage
                        }
                    }
                    rowKey={"replyId"}
                    className="margin-top15"
                />
            </div>
            <VoteDownModal
                open={showModel}
                model={detail}
                onCancel={() => setShowModel(false)}
            />
        </div>
    );
}
