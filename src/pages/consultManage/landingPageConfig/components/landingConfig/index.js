import React, {useState, useEffect, useRef} from "react";
import "./index.scss";
import LandingCard from "../landingCard";
import {get, post} from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import AddBox from "../addBox";
import {Radio, message, Pagination, Modal, Row, Col} from "dpl-react";
import LandingTable from "../landingTable";
import {
    modelTypeMap,
    modelType,
    landingPageTypeMap,
    olhelpEnumOptionType,
    landingPageTypeList,
    modelTypeList,
} from "@/const/config";
import qs from "qs";
import history from "@/history";
import classnames from "classnames";
import {uForm} from "dora";
// 引入store
import {useStoreState, useStoreActions} from "easy-peasy";

const RadioButton = Radio.Button;
const defaultPageIndex = 1;
const defaultPageSize = 10;
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

// 默认查询条件
const defaultFormData = {
    name: undefined, // 默认落地页名称
    modelType: undefined, // 落地页类型
    modifyTime: undefined, // 最后修改时间
    pageIndex: defaultPageIndex,
    pageSize: defaultPageSize,
};

const disabledModelTypeList = [
    modelType.officialService,
    modelType.expertDetailService,
];
// 落地页类型
const landingTypeList = landingPageTypeList.map((item) => {
    return {
        value: item.id,
        label: item.name,
    };
});
export default function EntranceConfig(props) {
    const {isSetData} = props;
    const [formData, setFormData] = useState(() => {
        const data = qs.parse(window.location.href.split("?")[1]);
        let result = Object.assign({}, defaultFormData, {
            name: data.name, // 默认落地页名称
            type: data.type, // 落地页类型
            modelType: data.modelType, // 模板类型
            modifyTime:
                (data.modifyTimeFrom &&
                    data.modifyTimeTo && [data.modifyTimeFrom, data.modifyTimeTo]) ||
                undefined,
            pageIndex:
                (data.pageIndex && parseInt(data.pageIndex)) || defaultPageIndex,
            pageSize: (data.pageSize && parseInt(data.pageSize)) || defaultPageSize,
        });
        // 日期不知道是只有一个还是有多个
        return result;
    }); //表单数据
    const [isFirst, setIsFirst] = useState(true); //第一次进入
    const isResetForm = useRef(false); // 是否重置了选择数据
    const [moduleTypeList, setModuleTypeList] = useState(() => {
        let list = [];
        modelTypeList.forEach((item) => {
            list.push({
                value: item.id,
                label: item.name,
            });
        });
        return list;
    }); // 模块类型
    const setStorePageInfo = useStoreActions(
        (actions) => actions.consultManageLandingPageConfig.setLandingConfigPageInfo
    );

    const service = async ({values, pagination, sorter = {}, filters = {}}) => {
        const params = {
            name: (values.name && values.name.trim()) || undefined, // 默认落地页名称
            type: values.type,
            modelType: values.modelType, // 落地页类型
            modifyTimeFrom: values.modifyTime && values.modifyTime[0], // 最后修改时间起
            modifyTimeTo: values.modifyTime && values.modifyTime[1], // 最后修改时间止
            pageIndex: pagination.current || defaultPageIndex,
            pageSize: pagination.pageSize || defaultPageSize,
        };
        setHash(params);
        const res = await get({
            url: Api.getLandingPageConfigList,
            params,
        });
        if (res.success) {
            const data = res.data;
            setStorePageInfo({
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
            pagination: {current: formData.pageIndex, pageSize: formData.pageSize},
        },
        [middleware()]
    );

    // 复制落地页
    const cloneLandingPage = async (id) => {
        const res = await post({
            url: Api.postCloneLandingPage,
            data: {
                id,
            },
        });
        if (res.success) {
            message.success("复制落地页成功！");
            trigger();
        } else {
            message.error(res.message);
        }
    };
    // 复制按钮点击事件
    const cloneLandingPageClick = (data) => {
        if (data && (data.id || data.id == 0)) {
            Modal.confirm({
                title: "是否确定要复制当前落地页",
                okText: "确认",
                cancelText: "取消",
                wait: true,
                onOk: () => {
                    return new Promise((resolve) => {
                        try {
                            cloneLandingPage(data.id);
                            resolve();
                        } catch (e) {
                            console.error(e);
                            message.error("系统出错请联系管理员！");
                            resolve();
                        }
                    });
                },
            });
        }
    };

    // 表格的列
    const columns = [
        {
            title: "落地页名称",
            dataIndex: "name",
            width: 250,
        },
        {
            title: "配置人",
            dataIndex: "lastModifierName",
            width: 90,
        },
        {
            title: "配置时间",
            dataIndex: "lastModifyTime",
            width: 150,
        },
        {
            title: "落地页类型",
            dataIndex: "type",
            width: 100,
            render: (text, data) => {
                return (
                    <span
                        title={
                            (landingPageTypeMap[data.type] &&
                                landingPageTypeMap[data.type].name) ||
                            ""
                        }
                    >
						{(landingPageTypeMap[data.type] &&
                            landingPageTypeMap[data.type].name) ||
                        ""}
					</span>
                );
            },
        },
        {
            title: "模板页面",
            dataIndex: "modelType",
            width: 200,
            render: (text, data) => {
                return (
                    <span
                        title={
                            (modelTypeMap[data.modelType] &&
                                modelTypeMap[data.modelType].name) ||
                            ""
                        }
                    >
						{(modelTypeMap[data.modelType] &&
                            modelTypeMap[data.modelType].name) ||
                        ""}
					</span>
                );
            },
        },
        {
            title: "备注信息",
            dataIndex: "description",
            width: 150,
            center: true,
        },
    ];

    // 预览样式
    const previewClass = (data) => {
        return classnames({
            "landing-option-item": true,
            "landing-option-item-disabled":
                data && disabledModelTypeList.indexOf(data.modelType) > -1,
        });
    };

    // 操作内容
    const optionComponent = (data) => {
        return (
            <div className="landing-option-box">
                <div
                    className={previewClass(data[0])}
                    onClick={() => {
                        preview(data[0]);
                    }}
                >
                    预览
                </div>
                <div className="landing-option-line"></div>
                <div
                    className="landing-option-item"
                    onClick={() => {
                        editConfig(data[0]);
                    }}
                >
                    编辑
                </div>
                <div className="landing-option-line"></div>
                <div
                    className="landing-option-item"
                    onClick={() => {
                        cloneLandingPageClick(data[0]);
                    }}
                >
                    复制
                </div>
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

    const preview = (data) => {
        if (disabledModelTypeList.indexOf(data.modelType) > -1) {
            return;
        }
        history.push(
            `/consultManage/landingPageConfig/detail?modelType=${data.modelType}&id=${data.id}&headerType=${data.headerType || 'Y'}`
        );
    };

    const editConfig = (data) => {
        history.push(
            `/consultManage/landingPageConfig/edit?modelType=${data.modelType}&id=${data.id}`
        );
    };
    const addLandingPageConfig = () => {
        history.push(`/consultManage/landingPageConfig/edit`);
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

    useEffect(() => {
        if (isSetData && !isFirst) {
            setHash(formData);
        }
    }, [isSetData]);

    useEffect(() => {
        // getModuleTypeList();
    }, []);

    return (
        <div className="landing-config-box">
            <LandingCard title="落地页列表">
                <div className="search-box">
                    <SchemaForm
                        actions={actions}
                        {...form}
                        initialValues={formData}
                        inline
                        className="form-wrap"
                    >
                        <Field
                            type="string"
                            title="落地页名称"
                            name="name"
                            x-component="Input"
                            x-component-props={{
                                allowClear: true,
                                placeholder: "请输入落地页名称",
                                style: {
                                    width: 250,
                                },
                            }}
                        />
                        <Field
                            type="string"
                            title="落地页类型"
                            name="type"
                            x-component="Select"
                            x-component-props={{
                                allowClear: true,
                                placeholder: "请选择落地页类型",
                                dataSource: landingTypeList,
                                style: {
                                    width: 250,
                                },
                            }}
                        />
                        <Field
                            type="string"
                            title="模板类型"
                            name="modelType"
                            x-component="Select"
                            x-component-props={{
                                allowClear: true,
                                placeholder: "请选择模板类型",
                                dataSource: moduleTypeList,
                                style: {
                                    width: 250,
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
                                    width: 260,
                                },
                            }}
                        />
                        <FormButtonGroup>
                            <Submit style={{marginRight: 10}} onClick={submitClickFunc}>
                                查询
                            </Submit>
                            <Reset>清空条件</Reset>
                        </FormButtonGroup>
                    </SchemaForm>
                </div>
                <AddBox context="添加落地页" onClick={addLandingPageConfig}/>
                <div className="landing-list-box">
                    {table.dataSource &&
                    table.dataSource.length > 0 &&
                    table.dataSource.map((item) => {
                        return (
                            <LandingTable
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
            </LandingCard>
        </div>
    );
}
