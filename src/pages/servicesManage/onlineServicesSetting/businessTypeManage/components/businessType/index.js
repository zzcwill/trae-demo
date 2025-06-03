import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import {
    Form,
    Button,
    message,
    Checkbox,
    Table,
    Input,
    Pagination,
    Modal,
} from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
const defaultPageIndex = 1;
const defaultPageSize = 20;
const defaultPageInfo = {
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize,
    total: 0,
};
// 布局
const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const FormItem = Form.Item;
function BusinessType(props) {
    const { addCallbackFunc, form } = props;
    const { getFieldDecorator, validateFields, resetFields } = form;
    const [businessList, setBusinessList] = useState([]); // 业务类型列表
    const [pageInfo, setPageInfo] = useState(defaultPageInfo);
    const [loading, setLoading] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);

    /**
     * 删除方法
     */
    const deleteFunc = async (id) => {
        try {
            const data = await post({
                url: Api.getBrandTypeDelete,
                data: { id },
            });
            if (data.success) {
                message.success("删除成功");
                getBusinessTypeList();
                addCallbackFunc && addCallbackFunc(true);
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
        if (pageInfo.total < 2) {
            message.warning("业务类型至少需要保留一条");
            return;
        }
        Modal.confirm({
            title: "提示",
            content: "是否确定删除该配置",
            onOk: () => {
                deleteFunc(id);
            },
        });
    };

    /**
     * 更新
     */
    const updateHandler = async (e, item) => {
        if (!item.id) return;
        if (item.defaultFlag === "Y") return;
        try {
            const data = await post({
                url: Api.postBrandTypeUpdate,
                data: {
                    id: item.id,
                    name: item.name,
                    defaultFlag: e.target.checked ? "Y" : "N",
                },
            });
            if (data.success) {
                message.success("设置业务类型为默认类型成功");
                getBusinessTypeList();
            } else {
                message.error(data.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const columns = [
        {
            title: "业务类型",
            dataIndex: "name",
            ellipsis: true,
            align: "center",
        },
        {
            title: "默认类型",
            dataIndex: "defaultFlag",
            ellipsis: true,
            align: "center",
            width: 200,
            render: (text, record, index) => {
                return (
                    <Checkbox
                        checked={text === "Y"}
                        onChange={(e) => {
                            updateHandler(e, record);
                        }}
                    >
                        新增产品维度默认该类型
                    </Checkbox>
                );
            },
        },
        {
            title: "操作",
            dataIndex: "id",
            ellipsis: true,
            align: "center",
            width: 100,
            render: function (text, record) {
                return (
                    <div className="option-box">
                        <span
                            onClick={() => {
                                deleteHandler(text);
                            }}
                        >
                            删除
                        </span>
                    </div>
                );
            },
        },
    ];
    /**
     * 获取业务类型
     */
    const getBusinessTypeList = async (
        params = {
            pageIndex: pageInfo.pageIndex,
            pageSize: pageInfo.pageSize,
        }
    ) => {
        setLoading(true);
        try {
            const res = await get({
                url: Api.getBrandTypeList,
                params,
            });
            if (res.success) {
                const data = res.data;
                if (Array.isArray(data.list)) {
                    setBusinessList(data.list);
                    setPageInfo({
                        pageIndex: data.pageIndex,
                        pageSize: data.pageSize,
                        total: data.total,
                    });
                }
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    /**
     * 分页
     */
    const changePage = (pageIndex, pageSize) => {
        getBusinessTypeList({
            pageIndex,
            pageSize,
        });
    };

    /**
     * 新增方法
     */
    const addFunc = async (data) => {
        setSaveLoading(true);
        try {
            const res = await post({
                url: Api.postBrandTypeSave,
                data,
            });
            if (res.success) {
                resetFields();
                setIsShowModal(false);
                getBusinessTypeList()
                message.success("新增成功");
                addCallbackFunc && addCallbackFunc(true);
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
        setIsShowModal(false);
    };

    /**
     * 新增
     */
    const saveHandler = () => {
        validateFields(async (err, values) => {
            if (!err) {
                console.log(values);
                const sendData = {
                    name: values.name,
                    defaultFlag: values.defaultFlag && values.defaultFlag[0] ? "Y" : "N",
                };
                addFunc(sendData);
            }
        });
    };

    const addHandler = () => {
        setIsShowModal(true);
    };

    useEffect(() => {
        getBusinessTypeList();
    }, []);

    return (
        <div className="business-type-box">
            <div className="table-btn">
                <Button type="primary" onClick={() => addHandler()}>
                    新增
                </Button>
            </div>
            <div className="business-table">
                <Table
                    columns={columns}
                    pagination={false}
                    dataSource={businessList}
                    loading={loading}
                    scroll={{ fixedY: 270 }}
                ></Table>
            </div>
            {Number(pageInfo.total) > defaultPageSize && (
                <div className="pagination-box">
                    <Pagination
                        showTotalInfo={false}
                        current={Number(pageInfo.pageIndex)}
                        pageSize={Number(pageInfo.pageSize)}
                        total={Number(pageInfo.total)}
                        showQuickJumper={true}
                        // showSizeChanger={true}
                        // pageSizeOptions={["10", "20", "50", "100"]}
                        // onShowSizeChange={changePage}
                        onChange={changePage}
                    />
                </div>
            )}
            <Modal
                footer={null}
                title="新增业务类型"
                visible={isShowModal}
                onCancel={() => {
                    setIsShowModal(false);
                }}
                width={400}
            >
                <div className="business-add">
                    <Form>
                        <FormItem label="业务类型名称" {...formItemLayout}>
                            {getFieldDecorator("name", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入业务类型名称",
                                        whitespace:true
                                    },
                                ],
                            })(
                                <Input
                                    placeholder="请输入业务类型名称"
                                    style={{ width: "100%" }}
                                    autoComplete="off"
                                    maxLength="10"
                                />
                            )}
                        </FormItem>
                        <FormItem label="是否为默认类型" {...formItemLayout}>
                            {getFieldDecorator("defaultFlag")(
                                <Checkbox.Group>
                                    <Checkbox value={true}>新增产品维度默认该类型</Checkbox>
                                </Checkbox.Group>
                            )}
                        </FormItem>
                    </Form>
                    <div className="button-box">
                        <Button
                            type="primary"
                            className="button-item"
                            disabled={loading}
                            onClick={() => {
                                saveHandler();
                            }}
                        >
                            保存
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Form.create()(React.forwardRef(BusinessType));
