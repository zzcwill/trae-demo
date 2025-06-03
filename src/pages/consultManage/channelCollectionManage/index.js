import React, {useEffect, useState, useRef} from "react";
import "./index.scss";
import {get, post} from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import {
    Input,
    DatePicker,
    message,
    Button,
    Modal,
    Pagination,
} from "dpl-react";
import AddBox from "@/components/consultManage/addBox";
import ModuleTable from "@/components/consultManage/moduleTable";
import qs from "qs";
import history from "@/history";
import {editTypeMap} from "./config";
import {createUrl} from "./utils";
import ClipboardButton from "./component/clipboardButton";
import {uForm} from "dora";
import moment from "moment";
import 'moment/locale/zh-cn';
import UserFuzzyQuery from '@/components/olhelpCommon/userFuzzyQuery'

const defaultPageIndex = 1; // 默认页码
const defaultPageSize = 10; // 默认分页大小
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

const defaultFormData = {
    name: undefined,
    url: undefined,
    modifyTime: undefined,
    pageIndex: defaultPageSize,
    pageSize: defaultPageSize,
};

export default function ChannelCollectionManage(props) {
    const [formData, setFormData] = useState(() => {
        const data = qs.parse(window.location.href.split("?")[1]);
        let result = Object.assign({}, defaultFormData, {
            nameKeyword: data.nameKeyword, // 渠道名称
            originalUrlKeyword: data.originalUrlKeyword, // 原始链接
            modifierId: data.modifierId,
            modifyTime:
                (data.modifyDateBegin &&
                    data.modifyDateEnd && [
                        data.modifyDateBegin,
                        data.modifyDateEnd,
                    ]) ||
                undefined,
            pageIndex:
                (data.pageIndex && parseInt(data.pageIndex)) ||
                defaultPageIndex,
            pageSize:
                (data.pageSize && parseInt(data.pageSize)) || defaultPageSize,
        });
        // 日期不知道是只有一个还是有多个
        return result;
    }); //表单数据
    const [isFirst, setIsFirst] = useState(true); //第一次进入
    const isResetForm = useRef(false); // 是否重置了选择数据
    const [pageInfo, setPageInfo] = useState({
        pageIndex: defaultPageIndex,
        pageSize: defaultPageSize,
    });

    const service = async ({
                               values,
                               pagination,
                               sorter = {},
                               filters = {},
                           }) => {
        const params = {
            nameKeyword:
                (values.nameKeyword && values.nameKeyword.trim()) || undefined, // 渠道名称
            originalUrlKeyword:
                (values.originalUrlKeyword &&
                    values.originalUrlKeyword.trim()) ||
                undefined, // 原始链接
            modifyDateBegin: values.modifyTime && values.modifyTime[0], // 最后修改时间起
            modifyDateEnd: values.modifyTime && values.modifyTime[1], // 最后修改时间止
            pageIndex: pagination.current || defaultPageIndex,
            pageSize: pagination.pageSize || defaultPageSize,
            modifierId: values.modifierId,
            promotionUrlKeyword: (values.promotionUrlKeyword || '').trim() || undefined
        };
        setHash(params);
        const res = await get({
            url: Api.getPromotionChannelList,
            params,
        });
        if (res.success) {
            const data = res.data;
            if (Array.isArray(data.list)) {
                data.list.forEach((item) => {
                    item["publicityUrl"] = createUrl(item.originalUrl, {
                        sourceId: item.promotionId,
                    });
                });
            }
            setPageInfo({
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
            });
        } else {
            message.error(res.message);
        }
        return {
            dataSource: (res.data && res.data.list) || [],
            pageSize: res.data.pageSize,
            total: res.data.total,
            current: res.data.pageIndex,
        };
    };

    const submitClickFunc = () => {
        isResetForm.current = false;
    };

    //  formily 清空中间件
    const middleware = () => ({context}) => ({
        onFormResetQuery(payload, next) {
            // 手动将表单数据清除，为了处理初始化的数据
            actions.setFormState((state) => (state.values = {}));
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
            // 手动将表单数据清除
            context.setPagination({
                ...context.pagination,
            });
            context.setSorter({});
            context.setFilters({});
            return next(isResetForm.current ? {} : payload);
        },
    });

    const {form, table, trigger} = useFormTableQuery(
        service,
        {
            pagination: {
                current: formData.pageIndex,
                pageSize: formData.pageSize,
            },
        },
        [middleware()]
    );

    // 表格的列
    const columns = [
        {
            title: "序号",
            dataIndex: "id",
            width: 60,
            center: true,
        },
        {
            title: "渠道名称",
            dataIndex: "name",
            width: 180,
        },
        {
            title: "原始链接",
            dataIndex: "originalUrl",
            width: 150,
        },
        {
            title: "推广链接",
            dataIndex: "publicityUrl",
        },
        {
            title: "配置人",
            dataIndex: "modifierName",
            width: 150,
        },
        {
            title: "配置时间",
            dataIndex: "modifyDate",
            width: 150,
            center: true,
        },
        {
            title: "备注",
            dataIndex: "remark",
            width: 180,
            center: true,
        },
    ];

    /**
     * 删除渠道
     */
    const deleteChannel = async (id) => {
        try {
            const res = await post({
                url: Api.postPromotionChannelDelete,
                data: {id},
            });
            if (res.success) {
                trigger();
                message.success("渠道配置删除成功");
            } else {
                message.error(res.message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * 删除点击
     */
    const deleteHandler = (data) => {
        Modal.confirm({
            title: "提示",
            content: "是否确定删除该渠道配置",
            onOk: () => {
                deleteChannel(data.id);
            },
        });
    };

    // 操作内容
    const optionComponent = (data) => {
        return (
            <div className="channel-collection-option-box">
                <ClipboardButton
                    url={(data[0] && data[0].publicityUrl) || ""}
                    type="primary-bordered"
                >
                    复制推广链接
                </ClipboardButton>
                <div className="option-line"></div>
                <Button
                    type="primary-bordered"
                    onClick={() => {
                        deleteHandler(data[0]);
                    }}
                >
                    删除
                </Button>
                <div className="option-line"></div>
                <Button
                    type="primary-bordered"
                    onClick={() => {
                        editConfig(data[0]);
                    }}
                >
                    编辑
                </Button>
            </div>
        );
    };

    /**
     * 分页
     * @param {*} pageIndex
     * @param {*} pageSize
     */
    const changePage = async (pageIndex, pageSize) => {
        const pagination = Object.assign({}, table.pagination, {
            current: pageIndex,
            pageSize,
        });
        table.onChange(pagination, null, null);
    };

    const editConfig = (data) => {
        history.push(
            `/consultManage/channelCollectionManage/edit?id=${data.id}&type=${editTypeMap.edit.type}`
        );
    };
    const addChannelCollectionConfig = () => {
        history.push(
            `/consultManage/channelCollectionManage/edit?type=${editTypeMap.add.type}`
        );
    };

    const setHash = (data) => {
        let hash = window.location.hash.split("#")[1];
        hash = hash.split("?")[0];
        let params = qs.parse(window.location.href.split("?")[1]);
        window.location.hash = `#${hash}?${qs.stringify(
            Object.assign(params, data)
        )}`;
        if (isFirst) {
            setIsFirst(false);
        }
    };

    const exportList = () => {
        actions.getFormState((data) => {
            const origin = window.location.origin
            const values  =data.values
            const obj = {
                nameKeyword: (values.nameKeyword && values.nameKeyword.trim()) || undefined, // 渠道名称
                originalUrlKeyword: (values.originalUrlKeyword && values.originalUrlKeyword.trim()) || undefined, // 原始链接
                modifyDateBegin: values.modifyTime && values.modifyTime[0], // 最后修改时间起
                modifyDateEnd: values.modifyTime && values.modifyTime[1], // 最后修改时间止
                pageIndex: pageInfo.pageIndex || defaultPageIndex,
                pageSize: pageInfo.pageSize || defaultPageSize,
                modifierId: values.modifierId,
                promotionUrlKeyword: (values.promotionUrlKeyword || '').trim() || undefined
            }
            const params = qs.stringify(obj)
            window.open(origin + Api.getPromotionChannelExport + '?' + params)
        })
    }
    return (
        <div className="channel-collection-manage">
            <div className="content">
                <div className="search-box">
                    <SchemaForm
                        actions={actions}
                        {...form}
                        initialValues={formData}
                        inline
                        className="form-wrap"
                        components={{UserFuzzyQuery}}
                    >
                        <Field
                            type="string"
                            title="渠道名称"
                            name="nameKeyword"
                            x-component="Input"
                            x-component-props={{
                                allowClear: true,
                                placeholder: "请输入渠道名称",
                                style: {
                                    width: 160,
                                },
                            }}
                        />
                        <Field
                            type="string"
                            title="原始链接"
                            name="originalUrlKeyword"
                            x-component="Input"
                            x-component-props={{
                                allowClear: true,
                                placeholder: "请输入原始链接",
                                style: {
                                    width: 200,
                                },
                            }}
                        />
                        <Field
                            type="string"
                            title="推广链接"
                            name="promotionUrlKeyword"
                            x-component="Input"
                            x-component-props={{
                                allowClear: true,
                                placeholder: "请输入推广链接",
                                style: {
                                    width: 200,
                                },
                            }}
                        />
                        <Field
                            type="string"
                            title="修改时间"
                            name="modifyTime"
                            x-component="RangePicker"
                            x-component-props={{
                                style: {
                                    width: 240,
                                },
                                format: "YYYY/MM/DD",
                            }}
                        />
                        <Field
                            type="string"
                            title="配置人"
                            name="modifierId"
                            x-component="UserFuzzyQuery"
                            x-component-props={{
                                style: {width: 200}
                            }}
                        />
                        <FormButtonGroup>
                            <Reset style={{marginRight: 10}}>清空条件</Reset>
                            <Submit onClick={submitClickFunc}>搜索</Submit>
                            <Button type='primary' style={{marginLeft: 10}} onClick={exportList}>导出excel</Button>
                        </FormButtonGroup>
                    </SchemaForm>
                </div>
                <AddBox
                    context="添加渠道埋点"
                    onClick={addChannelCollectionConfig}
                />
                <div className="list-box">
                    {table.dataSource &&
                    table.dataSource.length > 0 &&
                    table.dataSource.map((item) => {
                        return (
                            <ModuleTable
                                key={item.id}
                                columns={columns}
                                dataSource={[item]}
                                optionComponent={optionComponent}
                            />
                        );
                    })}
                </div>
                <div className="pagination-box">
                    <Pagination
                        showTotalInfo={false}
                        current={Number(table.pagination.current)}
                        pageSize={Number(table.pagination.pageSize)}
                        total={Number(table.pagination.total)}
                        showQuickJumper={true}
                        showSizeChanger={true}
                        onShowSizeChange={changePage}
                        onChange={changePage}
                    />
                </div>
            </div>
        </div>
    );
}
