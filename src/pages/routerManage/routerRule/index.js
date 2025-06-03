import ModalSelect from "@/components/common/modalSelect";
import ChatTip from "@/pages/routerManage/routerRule/components/chatTip";
import ManMachine from "@/pages/routerManage/routerRule/components/manMachine";
import Satisfaction from "@/pages/routerManage/routerRule/components/satisfaction";
import WindowPage from "@/pages/routerManage/routerRule/components/windowPage";
import Api from "@/request/api-olhelpmanage";
import { get, post } from "@/request/request";
import { sendWarden } from "@/utils/warden";
import { uForm } from "dora";
import { Button, Checkbox, Loading, message, Modal, Table } from "dpl-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createDndContext, DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BatchEdit from "./components/batchEdit";
import RuleConfigFilter from "./components/ruleConfigFilter/index";
import WindowFilter from "./components/windowFilter";
import "./index.scss";

const maxCopyRuleListNum = 500;
const maxRuleListNum = 2000;
const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    Submit,
    FormButtonGroup,
    createAsyncFormActions,
    FormEffectHooks,
    Reset,
    Row,
    Col,
} = uForm;
const { onFieldValueChange$ } = FormEffectHooks;
const actions = createAsyncFormActions();

const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};

const formItemLayout1 = {
    labelCol: {span: 0},
    wrapperCol: {span: 24},
};

const formItemLayout2 = {
    labelCol: {span: 12},
    wrapperCol: {span: 12},
};
const type = "DragableBodyRow";
const DragableBodyRow = ({
    index,
    dropRouterStrategy,
    currentDragRouterStrategy,
    moveRow,
    onDragStart,
    className,
    style,
    ...restProps
}) => {
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
            let isOver = false;
            if (dropRouterStrategy && currentDragRouterStrategy) {
                //解决跨表格拖拽
                isOver =
                    monitor.isOver() &&
                    dropRouterStrategy.id === currentDragRouterStrategy.id;
            } else {
                isOver = monitor.isOver();
            }
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: isOver,
                dropClassName:
                    dragIndex < index
                        ? " drop-over-downward"
                        : " drop-over-upward",
            };
        },
        drop: (item) => {
            moveRow(item.index, index, dropRouterStrategy);
        },
    });
    const [, drag] = useDrag({
        item: { type, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ""}`}
            style={{ cursor: "move", ...style }}
            {...restProps}
            onDragStart={onDragStart}
        />
    );
};

const isNotArrayParamCode = (paramCode) => {
    return (
        paramCode !== "location" &&
        paramCode !== "agencyLocation" &&
        paramCode !== "channel" &&
        paramCode !== "brand" &&
        paramCode !== "agencyBusinessCenter" &&
        paramCode !== "companyBusinessCenter" &&
        paramCode !== "store"
    );
};

const RNDContext = createDndContext(HTML5Backend);
export default function RouterRule(props) {
    const [channel, setChannel] = useState([]); //策略适用渠道
    const [groupList, setGroupList] = useState([]); //在线组
    const [brand, setBrand] = useState([]) // 产品维度
    const [acceptanceMode, setAcceptanceMode] = useState([]); // 受理模式
    const [customTypeList, setCustomTypeList] = useState([]); // 窗口设置
    const [typeDisabled, setTypeDisabled]  = useState(true);
    const [params, setParams] = useState({});
    const [filterExpanded, setFilterExpanded] = useState(true);
    const [list, setList] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [bacthEditVisible, setBatchEditVisible] = useState(false);
    const [currentDragRouterStrategy, setCurrentDragRouterStrategy] =
        useState(null); //当前拖动的路由策略
    const switchArr = [
        { label: "启用", value: "Y" },
        { label: "不启用", value: "N" },
    ];
    const [manMachineVisible, setManMachineVisible] = useState(false);
    const [satisfactionVisible, setSatisfactionVisible] = useState(false); //满意度评价
    const [currentRule, setCurrentRule] = useState(null); //当前操作的元素
    const [windowPageVisible, setWindowPageVisible] = useState(false);
    const [chatTipVisible, setChatTipVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [bannerList, setBannerList] = useState([]); //宣传图轮播组列表

    const maxRuleListNumResult = useMemo(() => {
        const arrayList = list.reduce((pre, cur) => {
            if (!cur?.ruleList?.length) return pre;
            return [
                ...pre,
                ...cur?.ruleList
            ]
        }, [])
        return Math.min(arrayList.length, maxRuleListNum);
    }, [list]);

    // console.log(maxRuleListNumResult, 'maxRuleListNumResult', selectedRowKeys, 'selectedRowKeys');

    // const [copyModalVisible, setCopyModalVisible] = useState(false);
    const columns = useMemo(() => {
        return [
            {
                title: "规则Id",
                dataIndex: "id",
                ellipsis: true,
                align: "center",
                width: 100,
            },
            {
                title: "规则名",
                dataIndex: "name",
                ellipsis: true,
                align: "center",
                width: 200,
            },
            {
                title: "适用规则",
                dataIndex: "conditionList",
                ellipsis: true,
                align: "left",
                render(conditionList, b) {
                    return (
                        <div className="condition-list">
                            {Array.isArray(conditionList) &&
                                conditionList.map((item) => {
                                    return (
                                        <div
                                            className="condition-list-item"
                                            key={item.id}
                                        >{`${item.paramName}${item.operatorTypeName}：${item.targetValueName}`}</div>
                                    );
                                })}
                        </div>
                    );
                },
            },
            {
                title: "分配给",
                dataIndex: "groupName",
                ellipsis: true,
                align: "center",
                width: 150,
            },
            {
                title: "受理模式",
                dataIndex: "acceptanceModeName",
                ellipsis: true,
                align: "center",
                width: 200,
            },
            {
                title: "操作",
                dataIndex: "operate",
                ellipsis: true,
                align: "left",
                width: 300,
                render(text, record) {
                    return (
                        <div className="operation-list">
                            <div
                                className="item"
                                onClick={() => {
                                    window.open(
                                        window.location.href.split("#")[0] +
                                        "#/routerManage/routerRule/addRule?policyId=" +
                                        record.policyId +
                                        "&id=" +
                                        record.id
                                    );
                                }}
                            >
                                修改
                            </div>
                            <div
                                className="item"
                                onClick={() => {
                                    Modal.confirm({
                                        title: "删除提示",
                                        content: "是否确定删除该记录",
                                        onOk: async () => {
                                            const data = await post({
                                                url: Api.routeRuleDelete,
                                                data: { id: record.id },
                                            });
                                            if (data.success) {
                                                message.success("删除成功");
                                                getList(params);
                                            } else {
                                                message.error(data.message);
                                            }
                                        },
                                    });
                                }}
                            >
                                删除
                            </div>
                            <div
                                className="item"
                                onClick={() => {
                                    setCurrentRule(record);
                                    setChatTipVisible(true);
                                }}
                            >
                                对话提示
                            </div>
                            <div
                                className="item"
                                onClick={() => {
                                    setCurrentRule(record);
                                    setSatisfactionVisible(true);
                                }}
                            >
                                满意度评价
                            </div>
                            <div
                                className="item"
                                onClick={() => {
                                    setCurrentRule(record);
                                    setWindowPageVisible(true);
                                }}
                            >
                                窗口界面
                            </div>
                            <div
                                className="item"
                                onClick={() => {
                                    setCurrentRule(record);
                                    setManMachineVisible(true);
                                }}
                            >
                                人机协作
                            </div>
                        </div>
                    );
                },
            },
        ];
    }, []);
    const components = {
        body: {
            row: DragableBodyRow,
        },
    };
    const manager = useRef(RNDContext);
    const getWdList = async () => {
        const data = await get({ url: Api.getWdList })
        if (data.success) {
            let brandList = []
            let brandMap = {}
            brandList = data.data.brand.map(item => {
                brandMap[item.id] = item
                return { label: item.name, value: item.id }
            })
            setBrand(brandList)
        }
    }
    const getGroupList = async () => {
        const data = await get({
            url: Api.getCommonGroupList,
            params: { type: "2" },
        });
        if (data.success) {
            setGroupList(
                data.data.map((item) => {
                    return { label: item.name, value: item.id };
                })
            );
        }
    };
    const getBannerList = async () => {
        const data = await get({url: Api.getSearchBannerList, params: {pageSize: 0}})
        if (data.success) {
            setBannerList(data.data.list)
        }
    }
    const getOptions = async () => {
        const data = await get({
            url: Api.getEnumOptions,
            params: {
                groupNames: [
                    "consult_channel", 
                    'route_rule_acceptance_mode',
                    'route_rule_custom_type', // 窗口界面
                ].join(","),
            },
        });
        let map = {
            consult_channel: setChannel,
            route_rule_acceptance_mode: setAcceptanceMode,
            route_rule_custom_type: setCustomTypeList,
        };
        if (Array.isArray(data.data)) {
            data.data.forEach((item) => {
                map[item.groupName] &&
                    map[item.groupName](
                        item.options.map((item) => {
                            return { label: item.name, value: item.id };
                        })
                    );
            });
        }
    };
    const getList = async (params = {}) => {
        setLoading(true);
        const paramJo = params.ruleConditionParamJO;
        const customTypeList = params.customTypeList || {};
        const isNotArray = isNotArrayParamCode(paramJo?.paramCode);
        console.log(paramJo, 'paramJo');
        const data = await post({
            url: Api.routeRuleList,
            data: { 
                ...params,
                sliderImageIdList: params.sliderImageIdList? params.sliderImageIdList : undefined,
                customTypeList: customTypeList.customTypeList?.length > 0 ? customTypeList.customTypeList : undefined,
                type: customTypeList.type || undefined,
                ruleConditionParamJO: !paramJo?.targetValue?.trim?.() ? undefined : {
                    ...paramJo,
                    targetValueList: paramJo?.targetValue?.trim?.() ? (isNotArray ? [paramJo?.targetValue?.trim?.()] : paramJo?.targetValue?.split(',')) : undefined,
                    targetValue: undefined,
                    queryType: isNotArray ? '2' : '1'
                },
            },
        });
        data &&
            Array.isArray(data.data) &&
            data.data.forEach((item) => {
                Array.isArray(item.ruleList) &&
                    item.ruleList.forEach((rule) => {
                        rule.policyId = item.id;
                    });
            });
        setLoading(false);
        if (data.success) {
            setList(data.data);
            // 重新拉取列表以后，需要重制100条选择
            setSelectedRowKeys([])
        }
    };
    const ruleSort = async (ruleList, start, end) => {
      sendWarden('路由管理-路由拖拽排序')
        const data = await post({
            url: Api.routeRuleSort,
            data: {
                id: ruleList[start].id,
                targetOrderNum: ruleList[end].orderNum,
            },
        });
        if (data.success) {
            getList(params);
        } else {
            message.error(data.message);
        }
    };

    const batchEdit = async () => {
        if (!selectedRowKeys?.length) {
            message.error("至少选择一条路由规则!")
            return
        }
        setBatchEditVisible(true);
    }

    const batchEditAll = (type) => {
        if (!selectedRowKeys?.length) {
            message.error("至少选择一条路由规则!")
            return
        }
        setCurrentRule(null);
        if (type === 'feedback') {
            setSatisfactionVisible(true);
        }
    }
    const batchCopy = async () => {
        if (!selectedRowKeys?.length) {
            message.error("至少选择一条路由规则!")
            return
        }
        if (selectedRowKeys?.length > maxCopyRuleListNum) {
            setSelectedRowKeys(selectedRowKeys.slice(0, maxCopyRuleListNum))
            message.error(`最多选择${maxCopyRuleListNum}条路由规则!`)
            return
        }
        window.open(
            window.location.href.split("#")[0] +
            "#/routerManage/routerRule/ruleBatchCopy?ruleIds=" +
            selectedRowKeys?.join(',')
        );
        // setCopyModalVisible(true);
    }
    useEffect(() => {
        getGroupList();
        getOptions();
        getBannerList();
        getWdList();
    }, []);
    useEffect(() => {
        getList(params);
    }, [params]);

    const selectAllClick = () => {
        if (selectedRowKeys.length >= maxRuleListNumResult) {
            setSelectedRowKeys([])
            return;
        }
        const totalRemind = maxRuleListNumResult - selectedRowKeys.length;
        const needAdded = list?.reduce((pre, cur) => {
            if (pre?.length >= totalRemind) return pre;
            if (!cur) return pre;
            const realAddList = cur.ruleList.filter(item => !selectedRowKeys.includes(item.id));
            const lengthRemind = totalRemind - pre.length;
            // 仅增加剩余部分
            return [
                ...pre,
                ...realAddList.slice(0, lengthRemind).map(item => item.id)
            ]
        }, []);
        setSelectedRowKeys([
            ...needAdded,
            ...selectedRowKeys
        ])
    }

    const getRowSelection = (tableSource) => {
        const tableKeys = tableSource?.map(item => item.id);
        const tableSelectedKeys = selectedRowKeys.filter(key => tableKeys.includes(key));
        return {
            selectedRowKeys: tableSelectedKeys,
            onChange: (keys, selectedRows) => {
                const unCheckedList = tableSelectedKeys.filter(key => !keys.includes(key));
                if (unCheckedList.length) {
                    setSelectedRowKeys(selectedRowKeys.filter(key => !unCheckedList.includes(key)));
                    return;
                }
                const totalRemind = maxRuleListNumResult - selectedRowKeys.length;
                const needAdded = [selectedRows].reduce((pre, cur) => {
                    if (pre?.length >= totalRemind) return pre;
                    if (!cur) return pre;
                    const realAddList = cur.filter(item => !selectedRowKeys.includes(item.id));
                    const lengthRemind = totalRemind - pre.length;
                    console.log(realAddList, lengthRemind, 'lengthRemind');
                    // 仅增加剩余部分
                    return [
                        ...pre,
                        ...realAddList.slice(0, lengthRemind).map(item => item.id)
                    ]
                }, []);
                setSelectedRowKeys([
                    ...needAdded,
                    ...selectedRowKeys
                ])
            },
            onSelectAll: (state, a, b) => {
            },
            getCheckboxProps: record => ({
                disabled: selectedRowKeys.length >= maxRuleListNumResult && !selectedRowKeys.includes(record.id),
                name: record.name,
            }),
        };
    }

    const changeExpanded = () => {
        setFilterExpanded(!filterExpanded);
    };

    const effectsFunc = () => {
        // onFieldValueChange$("customTypeList").subscribe(({ value }) => {
        //     actions.setFieldState('type', state => {
        //         if (!value || value.length === 0) {
        //             setTypeDisabled(true);
        //             state.value = undefined;
        //         } else {
        //             setTypeDisabled(false);
        //         }
        //     })
        // });
    };

    useEffect(() => {
        if (loading) {
            Loading.show({
                container: document.getElementById('loadingContainer'),
                text: '加载中',
                showMask: false,
                coloured: true,
            });
        } else {
            Loading.hide();
        }
    }, [loading]);
    return (
        <>
            <div className="router-rule">
                <div className="filter-box">
                    <SchemaForm
                        inline
                        className={`form-wrap ${filterExpanded ? 'show' : 'hide'}`}
                        onSubmit={(data) => {
                            data.groupIdList = Array.isArray(data.groupIdList)
                                ? data.groupIdList
                                : undefined;
                            setParams(data);
                        }}
                        components={{ ModalSelect, RuleConfigFilter, WindowFilter }}
                        onReset={() => {
                            setParams(undefined);
                        }}
                        initialValues={{
                            ruleConditionParamJO: {},
                            robotDelayTransmitEnable: ""
                        }}
                        actions={actions}
                        effects={effectsFunc}
                    >
                        <Field
                            type="string"
                            title="策略名称"
                            name="policyName"
                            x-component="Input"
                            x-component-props={{ placeholder: "请输入策略名称" }}
                        />
                        <Field
                            type="string"
                            title="策略适用渠道"
                            name="channel"
                            x-component="Select"
                            x-component-props={{
                                placeholder: "请选择策略使用渠道",
                                dataSource: channel,
                                allowClear: true,
                            }}
                        />
                        <Field
                            type="string"
                            title="规则名称"
                            name="ruleName"
                            x-component="Input"
                            x-component-props={{ placeholder: "请输入规则名称" }}
                        />
                        <Field
                            type="string"
                            title="在线组"
                            name="groupIdList"
                            x-component="ModalSelect"
                            x-component-props={{
                                placeholder: "请选择在线组",
                                list: groupList,
                                allowClear: true,
                                isShowModalClear: true,
                                isNeedStringToNumber: true,
                                modalTitle: "在线组",
                                format: {
                                    label: "label",
                                    value: "value",
                                }
                            }}
                        />
                        <Field
                            type="string"
                            title="受理模式"
                            name="acceptanceMode"
                            x-component="Select"
                            x-component-props={{
                                placeholder: "请选择受理模式",
                                dataSource: acceptanceMode,
                                allowClear: true,
                            }}
                        />
                        <Field
                            type="string"
                            title="自动转人工"
                            name="autoCustomerServiceEnable"
                            x-component="Select"
                            x-component-props={{
                                placeholder: "请选是否启用自动转人工",
                                dataSource: switchArr,
                                allowClear: true,
                            }}
                        />
                        <Field
                            type="string"
                            title="智能助理"
                            name="intelligentAssistantEnable"
                            x-component="Select"
                            x-component-props={{
                                placeholder: "请选择是否启用智能助理",
                                dataSource: switchArr,
                                allowClear: true,
                            }}
                        />
                        <Field
                            type="object"
                            title="规则条件"
                            name="ruleConditionParamJO"
                            x-component="RuleConfigFilter"
                            style={{ minWidth: 600 }}
                            x-component-props={{
                                canAddRule: false,
                                canDeleteRule: false,
                                brand
                            }}
                        />
                        <Field
                            type="string"
                            title="延迟发送"
                            name="robotDelayTransmitEnable"
                            x-component="Select"
                            x-component-props={{
                                placeholder: "请选择是否延迟发送",
                                allowClear: true,
                                dataSource: [
                                    { label: "启用", value: "Y" },
                                    { label: "不启用", value: "N" },
                                ],
                            }}
                        />
                        <Field
                            type="string"
                            title="转人工按钮"
                            name="customerServiceButtonEnable"
                            x-component="Select"
                            {...formItemLayout}
                            x-component-props={{
                                placeholder: "请选择是否展示",
                                allowClear: true,
                                dataSource: [
                                    { label: "展示", value: "Y" },
                                    { label: "不展示", value: "N" },
                                ],
                            }}
                        />
                        <Field
                            type="object"
                            name="customTypeList"
                            x-component="WindowFilter"
                            style={{ width: 600 }}
                            {...formItemLayout1}
                            x-component-props={{
                                customTypeList
                            }}
                        /> 
                        <Field
                            type="string"
                            title="广告图"
                            name="sliderImageIdList"
                            x-component="Select"
                            {...formItemLayout}
                            x-component-props={{
                                placeholder: "请选择",
                                dataSource: bannerList,
                                showSearch: true,
                                optionFilterProp: "children",
                                allowClear: true,
                                mode: 'multiple',
                                optionFormat: {
                                    label: 'name',
                                    value: 'id'
                                }
                            }}
                        />
                        <Field
                            type="string"
                            title="跑马灯"
                            name="carousel"
                            x-component="Input"
                            {...formItemLayout}
                            x-component-props={{ placeholder: "请输入" }}
                        />
                        <div style={{ textAlign: 'right' }}>
                            <FormButtonGroup>
                                <Submit style={{ marginRight: 10 }} showLoading={true}>
                                    查询
                                </Submit>
                                <Reset>清空条件</Reset>
                            </FormButtonGroup>
                        </div>                                         
                    </SchemaForm>
                    {/* {!filterExpanded && <Icon type="single-down-arrow" className="icon-expand" onClick={changeExpanded} />}
                {filterExpanded && <Icon type="single-up-arrow" className="icon-expand" onClick={changeExpanded} />} */}
                </div>
                {/* {loading && <Loading text="加载中" visible={true} />} */}
                <div className="rule-box">
                    {list.map((item) => {
                        return (
                            <div className="rule-box-item" key={item.id}>
                                <div className="header">
                                    <div className="title">
                                        {item.name} <span>({item.id})</span>
                                    </div>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            window.open(
                                                window.location.href.split("#")[0] +
                                                "#/routerManage/routerRule/addRule?policyId=" +
                                                item.id
                                            );
                                        }}
                                    >
                                        新增规则
                                    </Button>
                                </div>
                                <DndProvider
                                    manager={manager.current.dragDropManager}
                                >
                                    <Table
                                        columns={columns}
                                        dataSource={item.ruleList}
                                        className="table"
                                        rowKey={"id"}
                                        pagination={false}
                                        components={components}
                                        rowSelection={getRowSelection(item.ruleList)}
                                        onRow={(record, index) => {
                                            return {
                                                currentDragRouterStrategy:
                                                    currentDragRouterStrategy,
                                                dropRouterStrategy: item,
                                                index,
                                                onDragStart() {
                                                    setCurrentDragRouterStrategy(
                                                        item
                                                    );
                                                },
                                                moveRow(dragIndex, hoverIndex) {
                                                    if (!currentDragRouterStrategy) return;
                                                    if (
                                                        item.id !==
                                                        currentDragRouterStrategy.id
                                                    ) return;
                                                    ruleSort(
                                                        item.ruleList,
                                                        dragIndex,
                                                        hoverIndex
                                                    );
                                                },
                                            };
                                        }}
                                    />
                                </DndProvider>
                            </div>
                        );
                    })}
                </div>
                <ManMachine
                    visible={manMachineVisible}
                    id={currentRule ? currentRule.id : undefined}
                    onOk={() => {
                        setManMachineVisible(false);
                    }}
                    onCancel={() => {
                        setManMachineVisible(false);
                    }}
                />
                <Satisfaction
                    visible={satisfactionVisible}
                    id={currentRule ? currentRule.id : undefined}
                    idList={selectedRowKeys}
                    batchUpdate={currentRule?.id ? false : true}
                    onOk={() => {
                        setSatisfactionVisible(false);
                    }}
                    onCancel={() => {
                        setSatisfactionVisible(false);
                    }}
                    setLoading={setLoading}
                />
                <WindowPage
                    visible={windowPageVisible}
                    id={currentRule ? currentRule.id : undefined}
                    onOk={() => {
                        setWindowPageVisible(false);
                    }}
                    onCancel={() => {
                        setWindowPageVisible(false);
                    }}
                />
                <ChatTip
                    visible={chatTipVisible}
                    id={currentRule ? currentRule.id : undefined}
                    onOk={() => {
                        setChatTipVisible(false);
                    }}
                    onCancel={() => {
                        setChatTipVisible(false);
                    }}
                />
                {/* <BatchCopyModal
                visible={copyModalVisible}
                onCancel={() => setCopyModalVisible(false)}
            /> */}
                <BatchEdit 
                    visible={bacthEditVisible}
                    idList={selectedRowKeys}
                    onCancel={() => setBatchEditVisible(false)}
                    setLoading={setLoading}
                    />
            </div>

            <div className="router-rule-bottom-toolbar">
                <Checkbox onClick={() => selectAllClick()} checked={selectedRowKeys.length === maxRuleListNumResult}>全选(最多选择{maxRuleListNum}条)</Checkbox>
                <Button type="primary" onClick={batchCopy}>批量复制</Button>
                <Button type="primary" style={{ marginLeft: '15px' }} onClick={batchEdit}>批量修改</Button>
                <Button type="primary" style={{ marginLeft: '15px' }} onClick={() => batchEditAll('feedback')}>批量修改满意度评价</Button>
            </div>
        </>
    );
}
