import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { message, Button, Table, Pagination, Modal } from "dpl-react";
import { get, post } from "@/request/request";
import API from "@/request/api-callcentermanage";
import useGetList from "@/components/common/hooks/useGetList";
import { enumOptionType } from "@/const/index";
import FormFilter from "@/components/common/formFilter";
import OperationBtn from "@/components/telephonyManage/operationBtn";
import EmailTemplateEdit from "./components/emailTemplateEdit";
// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 20;

/**
 * 弹窗默认配置
 */
const defaultModalConfig = {
    title: "新增", // title名称
    visible: false, // 是否展示
    type: "add", // 类型，默认为新增
    emailId: undefined, // 邮件Id
};

export default function EmailTemplateManage(props) {
    const [areaList, setAreaList] = useState([]) // 地区
    const [emailTypeList, setEmailTypeList] = useState([]); // 邮件类型列表
    const [queryParams, setQueryParams] = useState({
        pageIndex: defaultPageIndex,
        pageSize: defaultPageSize,
    }); // 查询参数
    const [modalConfig, setModalConfig] = useState(defaultModalConfig); // 弹窗配置
    const [emailTemplateDetail, setEmailTemplateDetail] = useState({}); // 邮件配置详情

    /**
     * 获取邮件配置列表
     * @param {Object} params
     */
    const getEmailConfigList = (params) => {
        return get({
            url: API.getEmailConfigList,
            params,
        });
    };

    // 封装的获取列表自定义hooks
    const { params, getList, loading, total, changeParams, list } = useGetList({
        queryFunc: getEmailConfigList,
        defaultParam: queryParams,
    });

    const formFilterRef = useRef(null);

    /**
     * 模板名称点击事件
     */
    const templateCilck = async (id) => {
        await getEmailTemplateDetail(id);
        setModalConfig({
            title: "查看详情", // title名称
            visible: true, // 是否detail展示
            type: "detail", // 类型
            emailId: id, // 问题Id
        });
    };

    /**
     * 下载附件
     */
    const downloadAttachment = (file) => {
        const url =
            window.location.origin +
            API.downloadFile.replace(
                "${path}",
                encodeURIComponent(encodeURIComponent(file.filePath))
            );
        window.open(url);
    };

    /**
     * 添加全部的select的option
     */
    const addAllOption = (options) => {
        return [].concat(
            {
                id: "all",
                name: "全部",
            },
            options
        );
    };

    /**
     * 查询模块配置
     */
    const filterConfig = [
        {
            type: "select", // string 组件类型 必填
            key: "areaCode", // string 字段名称 必填
            label: "地区", // string label名称 非必填 默认为空
            labelWidth: 100, // number label的width值 非必填 默认为100
            options: areaList, // 选项
            other: {
                placeholder: "请选择地区",
                multiple: true,
                allowClear: true,
                maxTagCount: 1,
            }, // input中的其他可取字段内容
        },
        {
            type: "select", // string 组件类型 必填
            key: "emailTypeCode", // string 字段名称 必填
            label: "邮件类型", // string label名称 非必填 默认为空
            labelWidth: 100, // number label的width值 非必填 默认为100
            options: addAllOption(emailTypeList), // 选项
            initialValue: "all", // any 默认值 该情况
            other: {
                placeholder: "请选择邮件类型",
            }, // input中的其他可取字段内容
        },
        {
            type: "input", // string 组件类型 必填
            key: "templateName", // string 字段名称 必填
            label: "模板名称", // string label名称 非必填 默认为空
            labelWidth: 100, // number label的width值 非必填 默认为100
            initialValue: "", // any 默认值 该情况
            other: {
                placeholder: "请输入邮件模板名称",
            }, // input中的其他可取字段内容
        },
    ];

    /**
     * 操作按钮配置
     */
    const operation = [
        {
            name: "修改",
            callback: async (text, record, index) => {
                await getEmailTemplateDetail(record.id);
                setModalConfig({
                    title: "修改", // title名称
                    visible: true, // 是否展示
                    type: "edit", // 类型
                    emailId: record.id, // 问题Id
                });
            },
        },
        {
            name: "删除",
            color: "#ff0000",
            callback: async (text, record, index) => {
                Modal.confirm({
                    title: "正在进行删除邮件模板操作",
                    content: (() => {
                        return (
                            <div
                                style={{
                                    color: "#6a6a6a",
                                    paddingRight: "20px",
                                }}
                            >
                                <span style={{ color: "#FF0000" }}>
                                    删除后的模板不可恢复
                                </span>
                                ，你还要继续吗？
                            </div>
                        );
                    })(),
                    width: 420,
                    onOk: () => {
                        return new Promise((resolve) => {
                            try {
                                deleteEmailTemplate(record.id);
                                resolve();
                            } catch (e) {
                                console.error(e);
                                message.error("系统出错请联系管理员！");
                                resolve();
                            }
                        });
                    },
                    destroyOnClose: true,
                });
            },
        },
    ];

    /**
     * 表格配置
     */
    const tableConfig = [
        {
            title: "地区",
            dataIndex: "areaCodeNameList",
            align: "center",
            render: (text, record, index) => {
                const result = (text && text.join(",")) || "";
                return <span title={result}>{result}</span>;
            },
        },
        {
            title: "邮件类型",
            dataIndex: "emailTypeName",
            align: "center",
        },
        {
            title: "模板名称",
            dataIndex: "templateName",
            width: 200,
            ellipsis: true,
            render: (text, record, index) => {
                return (
                    <span
                        onClick={() => {
                            templateCilck(record.id);
                        }}
                        title={record.templateName}
                        className="template-name"
                    >
                        {record.templateName}
                    </span>
                );
            },
        },
        {
            title: "附件",
            width: 200,
            ellipsis: true,
            align: "center",
            render: (text, record, index) => {
                return (
                    <div className="attachment-list">
                        {record.attachmentList.length > 0 &&
                            record.attachmentList.map((item) => {
                                return (
                                    <div
                                        className="attachment-link"
                                        title={item.name}
                                        onClick={() => {
                                            downloadAttachment(item);
                                        }}
                                        key={item.filePath}
                                    >
                                        {item.name}
                                    </div>
                                );
                            })}
                    </div>
                );
            },
        },
        {
            title: "操作",
            width: 200,
            align: "center",
            render: (text, record, index) => {
                return (
                    <OperationBtn
                        data={operation}
                        text={text}
                        record={record}
                        index={index}
                    />
                );
            },
        },
    ];

    /**
     * 获取地区
     */
    const getAreaList = async () => {
      const res = await get({
        url: API.getAreaList
      })
      if (res.success) {
        const data = res.data
        setAreaList(data)
      } else {
        message.error(res.message)
      }
    }

    /**
     * 获取邮件类型
     */
    const getEmailTypeList = async () => {
        const res = await get({
            url: API.getEnumOption,
            params: {
                groupNames: enumOptionType.EmailType, // 邮件类型
            },
        });
        if (res.success) {
            const data = res.data;
            data.forEach((item) => {
                if (
                    item.groupName === enumOptionType.EmailType &&
                    item.options
                ) {
                    setEmailTypeList(item.options);
                }
            });
        } else {
            message.error(res.message);
        }
    };

    /**
     * 获取邮件模板详情
     * @param {String} id
     */
    const getEmailTemplateDetail = async (id) => {
        const res = await get({
            url: API.getEmailTemplateDetail,
            params: {
                id,
            },
        });
        if (res.success) {
            const data = res.data;
            setEmailTemplateDetail(data);
        } else {
            message.error(res.message);
        }
    };

    /**
     * 格式化查询条件
     * @param {Object} data
     * @param {Number} pageIndex
     * @param {Number} pageSize
     */
    const initParam = (data, pageIndex, pageSize) => {
        let queryData = {
            areaCode: data.areaCode?.join(','), // 分子公司代码
            emailTypeCode:
                data.emailTypeCode === "all" ? undefined : data.emailTypeCode, // 邮件模板
            templateName: data.templateName || undefined, // 模板名称
        };
        if (pageIndex) {
            queryData["pageIndex"] = pageIndex;
        }
        if (pageSize) {
            queryData["pageSize"] = pageSize;
        }
        return queryData;
    };

    /**
     * 查询方法
     */
    const query = () => {
        const param = formFilterRef.current.getData();
        changeParams(initParam(param, defaultPageIndex, defaultPageSize));
    };

    /**
     * 清空方法
     */
    const resert = () => {
        formFilterRef.current.clearData({
            areaCode: "all",
            emailTypeCode: "all",
            templateName: null,
        });
        changeParams({
            pageIndex: defaultPageIndex,
            pageSize: defaultPageSize,
        });
    };

    /**
     * 删除邮件模板
     */
    const deleteEmailTemplate = async (id) => {
        const res = await post({
            url: API.deleteEmailTemplate,
            data: {
                id,
            },
        });
        if (res.success) {
            message.success("邮件模板删除成功！");
            getList();
        } else {
            message.error(res.message);
        }
    };

    /**
     * 分页
     */
    const changePage = (pageIndex, pageSize) => {
        const data = Object.assign({}, params, {
            pageIndex,
            pageSize,
        });
        changeParams(data);
    };

    /**
     * 关闭弹窗
     */
    const closeModal = (isSearch) => {
        setModalConfig(defaultModalConfig);
        if (isSearch) {
            getList();
        }
    };

    /**
     * 新增邮件配置
     */
    const addEmailConfig = () => {
        setModalConfig({
            title: "新增", // title名称
            visible: true, // 是否展示
            type: "add", // 类型
            emailId: null, // 问题Id
        });
        setEmailTemplateDetail({});
    };

    useEffect(() => {
      getAreaList();
      getEmailTypeList();
    }, []);

    return (
        <div className="email-manage">
            <div className="query-box">
                <FormFilter config={filterConfig} ref={formFilterRef} />
                <div className="center">
                    <Button
                        type="primary"
                        className="search-button"
                        loading={loading}
                        size="small"
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
                        size="small"
                        onClick={() => {
                            resert();
                        }}
                    >
                        重置
                    </Button>
                </div>
            </div>
            <div className="table-box">
                <div className="table-btn">
                    <Button
                        type="primary"
                        onClick={addEmailConfig}
                        size="small"
                    >
                        新增
                    </Button>
                </div>
                <Table
                    dataSource={list}
                    loading={loading}
                    columns={tableConfig}
                    pagination={false}
                    rowKey={"id"}
                    className="email-table"
                />
                <div className="pagination-box">
                    <Pagination
                        showTotalInfo={true}
                        current={parseInt(params.pageIndex)}
                        pageSize={parseInt(params.pageSize)}
                        total={total}
                        showQuickJumper={true}
                        onChange={changePage}
                    />
                </div>
            </div>
            <Modal
                title={modalConfig.title}
                visible={modalConfig.visible}
                onCancel={() => {
                    closeModal();
                }}
                className="email-edit-modal"
                footer={null}
                destroyOnClose={true}
            >
                <EmailTemplateEdit
                    emailId={modalConfig.emailId}
                    type={modalConfig.type}
                    onCancel={closeModal}
                    detail={emailTemplateDetail}
                    areaList={areaList}
                    emailType={emailTypeList}
                />
            </Modal>
        </div>
    );
}
