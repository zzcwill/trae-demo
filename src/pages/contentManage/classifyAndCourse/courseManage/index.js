import React, {useEffect, useState, useRef} from "react";
import "./index.scss";
import {message, Button, Table, Pagination, Modal} from "dpl-react";
import useGetList from "@/hooks/useGetList";
import OperationBtn from "@/components/common/operationBtn/index";
import {get, post} from "@/request/request";
import API from "@/request/api";
import FormFilter from "@/components/common/formFilter";
import confirmModal from "./components/confirmModal";
import qs from "qs";
import moment from "moment";
import CourseEdit from "./components/courseEdit";
import {makeUUID} from '@/utils/index'
// 默认页码等
const defaultPageIndex = 1;
const defaultPageSize = 10;

/**
 * 弹窗默认配置
 */
const defaultModalConfig = {
    title: "新增课程", // title名称
    visible: false, // 是否展示
    type: "add", // 类型，默认为新增
    questionId: undefined // 问题Id
};

function CourseManage(props) {
    const [selectList, setSelectList] = useState([]); // 选择的列表
    const [rowSelectKeys, setRowSelectKeys] = useState([]); // 选择的列表
    const [modalConfig, setModalConfig] = useState(defaultModalConfig); // 弹窗配置
    const [courseDetail, setCourseDetail] = useState({}); // 课程详情
    const [hotQuestionMap, setHotquestionMap] = useState([]); // 热点问题统计周期

    /**
     * 默认参数
     */
    const [defaultFilter, setDefaultFilter] = useState(() => {
        const queryData = qs.parse(window.location.href.split("?")[1]);
        let data = {
            hotQuestionTime:
                (queryData.hotQuestionTimeBegin &&
                    queryData.hotQuestionTimeEnd &&
                    queryData.hotQuestionTimeBegin +
                    "&" +
                    queryData.hotQuestionTimeEnd) ||
                undefined, // 热门问题时间选择
            name: queryData.name || undefined, // 课程名称
            teacherName: queryData.teacherName || undefined, // 讲师
            pageIndex: queryData.pageIndex || undefined, // 页号
            pageSize: queryData.pageSize || undefined, // 页码
            type: 1
        };
        return data;
    });

    /**
     * 获取热门问题时间枚举列表
     */
    const getHotQuestionOption = async obj => {
        if (hotQuestionMap.length < 1) {
            const res = await get({
                url: API.getHotQuestionOptions
            });
            if (res.success) {
                const data = res.data;
                if (data.length > 0) {
                    const list = data.map(item => {
                        return {
                            id: item.hotQuestionTimeBegin + "&" + item.hotQuestionTimeEnd,
                            name: item.hotQuestionTimeBegin + "-" + item.hotQuestionTimeEnd,
                            ...item
                        };
                    });
                    setHotquestionMap(list);
                    if (!defaultFilter.hotQuestionTime) {
                        setDefaultFilter(
                            Object.assign({}, defaultFilter, {
                                hotQuestionTime:
                                    list[0].hotQuestionTimeBegin +
                                    "&" +
                                    list[0].hotQuestionTimeEnd
                            })
                        );
                        return Object.assign({}, obj, {
                            hotQuestionTimeBegin: list[0].hotQuestionTimeBegin,
                            hotQuestionTimeEnd: list[0].hotQuestionTimeEnd
                        });
                    }
                }
            } else {
                message.error(res.message);
            }
        }
        return null;
    };
    const listFormat = (list) => {
        list.forEach(item => {
            item.uuid = makeUUID()
        })
        return list
    }
    const {params, getList, loading, total, changeParams, list} = useGetList(
        API.getCourseList,
        listFormat,
        null,
        getHotQuestionOption
    );

    /**
     * 表单配置
     */
    const filterConfig = [
        {
            type: "select",
            key: "hotQuestionTime",
            label: "热点问题统计周期",
            placeholder: "请选择热点问题统计周期",
            options: hotQuestionMap,
            span: 10,
            other: {
                labelWidth: 150,
                allowClear: false
            }
        },
        {
            type: "input",
            key: "name",
            label: "课程名称",
            span: 7,
            labelWidth: '80px',
            other: {
                placeholder: "输入课程名称",
                maxLength: 30,
                allowClear: true
            }
        },
        {
            type: "input",
            key: "teacherName",
            label: "讲师",
            span: 7,
            labelWidth: '80px',
            other: {
                placeholder: "输入讲师姓名",
                maxLength: 10,
                allowClear: true
            }
        }
    ];

    /**
     * 操作列表基础内容
     */
    const operationDetail = [
        {
            name: "查看详情",
            callback: async (text, record, index) => {
                // 调用获取详情接口
                const isExist = await getCoursesDetail(record.id);
                if (isExist) {
                    // 修改弹窗参数
                    setModalConfig({
                        title: "查看详情", // title名称
                        visible: true, // 是否展示
                        type: "detail", // 类型
                        questionId: record.questionId // 问题Id
                    });
                }
            }
        },
        {
            name: "编辑",
            callback: async (text, record, index) => {
                // 调用获取详情接口
                const isExist = await getCoursesDetail(record.id);
                if (isExist) {
                    // 修改弹窗参数
                    setModalConfig({
                        title: "编辑课程", // title名称
                        visible: true, // 是否展示
                        type: "edit", // 类型
                        questionId: record.questionId // 问题Id
                    });
                }
            }
        },
        {
            name: "删除",
            callback: (text, record, index) => {
                confirmModal.render({
                    text: "正在进行删除课程的操作",
                    descript: (
                        <div style={{color: "#6a6a6a", paddingRight: "16px"}}>
                            <span style={{color: "#FF3B30"}}>删除后的课程不可恢复</span>
                            ，你还要继续吗？
                        </div>
                    ),
                    okText: "继续",
                    width: 360,
                    closable: false,
                    onOk: () => {
                        deleteCourse([record.id]);
                    },
                    onCancel: () => {
                        confirmModal.close();
                    }
                });
            }
        }
    ];

    /**
     * 操作里面查新增操作
     */
    const operationAdd = {
        name: "新增",
        callback: async (text, record, index) => {
            // 课程详情置为空
            setCourseDetail({});
            // 修改弹窗参数
            setModalConfig({
                title: "新增课程", // title名称
                visible: true, // 是否展示
                type: "add", // 类型
                questionId: record.questionId // 问题Id
            });
        }
    };

    /**
     * 表格配置
     */
    const tableConfig = [
        {
            title: "标准问",
            dataIndex: "questionResume",
            width: 240,
            ellipsis: true
        },
        {
            title: "课程名称",
            dataIndex: "name",
            width: 200,
            ellipsis: true,
            render: (text, record, index) => {
                if (!record.id) {
                    return <span title="">无</span>;
                } else {
                    return <span title={text}>{text}</span>;
                }
            }
        },
        {
            title: "讲师",
            dataIndex: "teacherName",
            align: "center",
            render: (text, record, index) => {
                if (!record.id) {
                    return <div>无</div>;
                } else {
                    return <div>{text}</div>;
                }
            }
        },
        {
            title: "创建时间",
            dataIndex: "createTime",
            align: "center",
            render: (text, record, index) => {
                if (!record.id) {
                    return <div>无</div>;
                } else {
                    return <div>{text}</div>;
                }
            }
        },
        {
            title: "课程编辑人",
            dataIndex: "lastModifier",
            align: "center",
            render: (text, record, index) => {
                if (!record.id) {
                    return <div>无</div>;
                } else {
                    return <div>{text}</div>;
                }
            }
        },
        {
            title: "操作",
            width: 165,
            align: "center",
            render: (text, record, index) => {
                let operation = [];
                if (record.id) {
                    operation = [].concat(operationDetail);
                } else {
                    operation = [].concat(operationAdd);
                }
                return (
                    <OperationBtn
                        className="center"
                        data={operation}
                        text={text}
                        record={record}
                        index={index}
                    />
                );
            }
        }
    ];

    const formFilterRef = useRef(null);

    /**
     * 获取课程详情
     */
    const getCoursesDetail = async id => {
        const res = await get({
            url: API.getCourseDetail,
            params: {
                id
            }
        });
        if (res.success) {
            const data = res.data;
            setCourseDetail(data);
            return true;
        } else {
            message.error(res.message);
            if (res.messageCode == "api.course.not_exist") {
                // 接口调用失败的时候则原条件查询，刷新列表
                getList();
            }
            return false;
        }
    };

    /**
     * 查询
     */
    const query = () => {
        const param = formFilterRef.current.getData();
        const hotQuestionTimeList =
            (param.hotQuestionTime && param.hotQuestionTime.split("&")) || [];
        changeParams(
            Object.assign(
                {},
                {
                    hotQuestionTimeBegin:
                        hotQuestionTimeList.length > 0 && hotQuestionTimeList[0],
                    hotQuestionTimeEnd:
                        hotQuestionTimeList.length > 0 && hotQuestionTimeList[1],
                    name: (param.name && param.name.trim()) || "",
                    teacherName: (param.teacherName && param.teacherName.trim()) || "",
                    pageIndex: defaultPageIndex,
                    pageSize: defaultPageSize
                }
            )
        );
        // 查询时将选中列表重置
        setSelectList([]);
        setRowSelectKeys([]);
    };

    /**
     * 重置搜索内容
     */
    const resert = () => {
        formFilterRef.current.clearData({
            hotQuestionTime:
                hotQuestionMap[0].hotQuestionTimeBegin +
                "&" +
                hotQuestionMap[0].hotQuestionTimeEnd,
            type: 1
        });
        changeParams({
            hotQuestionTimeBegin: hotQuestionMap[0].hotQuestionTimeBegin,
            hotQuestionTimeEnd: hotQuestionMap[0].hotQuestionTimeEnd
        });
        // 查询时将选中列表重置
        setSelectList([]);
        setRowSelectKeys([]);
    };

    /**
     * 分页
     */
    const changePage = (pageIndex, pageSize) => {
        const data = Object.assign({}, params, {
            pageIndex,
            pageSize
        });
        setSelectList([]);
        setRowSelectKeys([]);
        changeParams(data);
    };

    /**
     * 弹窗名称改变
     */
    const modalTitleChange = config => {
        setModalConfig(Object.assign({}, modalConfig, config));
    };

    /**
     * 批量删除课程
     */
    const batchDelete = () => {
        if (selectList.length > 0) {
            confirmModal.render({
                text: "正在进行批量删除课程的操作",
                descript: (
                    <div style={{color: "#6a6a6a", paddingRight: "20px"}}>
            <span style={{color: "#FF3B30"}}>
              选中的多条内容将会被删除，删除后的课程不可恢复
            </span>
                        ，你还要继续吗？
                    </div>
                ),
                okText: "继续",
                width: 360,
                closable: false,
                onOk: () => {
                    deleteCourse(selectList);
                },
                onCancel: () => {
                    confirmModal.close();
                }
            });
        } else {
            message.warning("请选择课程后再执行删除操作！");
        }
    };

    /**
     * 关闭弹窗
     */
    const closeModal = isSearch => {
        setModalConfig(defaultModalConfig);
        if (isSearch) {
            getList();
        }
    };

    /**
     *
     * @param {删除课程} list
     */
    const deleteCourse = async list => {
        const res = await post({
            url: API.deleteCourse,
            data: {
                idList: list
            }
        });
        if (res.success) {
            message.success("删除成功！");
            // 删除成功后选中列表设置为空,并且查询列表
            setSelectList([]);
            setRowSelectKeys([]);
            getList();
            confirmModal.close();
        } else {
            message.error(res.message);
            confirmModal.close();
        }
    };

    useEffect(() => {
        // getHotQuestionOption();
    }, []);

    return (
        <div className="course-manage">
            <div className="query-box">
                <FormFilter
                    config={filterConfig}
                    ref={formFilterRef}
                    defaultValue={defaultFilter}
                />
                <div className="right">
                    <Button
                        type="primary"
                        className="search-button"
                        loading={loading}
                        onClick={() => {
                            query();
                        }}
                    >
                        查询
                    </Button>
                    <div className="line-box"></div>
                    <Button
                        className="search-button"
                        disabled={loading}
                        onClick={() => {
                            resert();
                        }}
                    >
                        清空条件
                    </Button>
                </div>
            </div>
            <div className="table-box">
                <div className="table-btn">
                    <Button type="primary" onClick={batchDelete}>
                        批量删除课程
                    </Button>
                </div>
                <Table
                    dataSource={list}
                    loading={loading}
                    columns={tableConfig}
                    pagination={false}
                    rowSelection={{
                        selectedRowKeys: rowSelectKeys,
                        onChange: (selectedRowKeys, selectedRows) => {
                            let list = [];
                            selectedRows.forEach(item => {
                                list.push(item.id);
                            });
                            setSelectList(list);
                            setRowSelectKeys(selectedRowKeys);
                        },
                        getCheckboxProps: record => ({
                            disabled: !record.id, // Column configuration not to be checked
                            name: record.name
                        })
                    }}
                    rowKey={"uuid"}
                />
                {total > defaultPageSize && (
                    <div className="pagination-box">
                        <Pagination
                            showTotalInfo={false}
                            current={parseInt(params.pageIndex)}
                            pageSize={parseInt(params.pageSize)}
                            total={total}
                            showQuickJumper={true}
                            onChange={changePage}
                        />
                    </div>
                )}
            </div>
            <Modal
                title={modalConfig.title}
                visible={modalConfig.visible}
                onCancel={() => {
                    closeModal();
                }}
                className="course-edit-modal"
                width={"80%"}
                style={{height: "90%"}}
                footer={null}
                destroyOnClose={true}
            >
                <CourseEdit
                    detail={courseDetail}
                    onCancel={closeModal}
                    questionId={modalConfig.questionId}
                    type={modalConfig.type}
                    modalTitleChange={modalTitleChange}
                />
            </Modal>
        </div>
    );
}

export default CourseManage;
