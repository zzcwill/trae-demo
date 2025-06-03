import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import FormFilter from "@/components/common/formFilter";
import {
    Button,
    Pagination,
    message,
    Modal,
    TreeSelect,
    Select,
    Form,
} from "dpl-react";
import Api from "@/request/api-olhelpmanage";
import { get, post } from "@/request/request";
import ExpertManageCard from "./component/expertManageCard";
import qs from "qs";
import { sceneList, editTypeMap, subSceneList } from "@/const/config";
import { removeAll } from "@/utils";
const FormItem = Form.Item;

function ReservationManageList(props) {
    const { onEdit, form, serviceWay } = props;
    const { getFieldDecorator, validateFields } = form;
    const [regionList, setRegionList] = useState([]);
    const [noAllRegionList, setNoAllRegionList] = useState([]);
    const [consultScopeList, setConsultScopeList] = useState([]);
    const [industryList, setIndustryList] = useState([]);
    const [params, setParams] = useState({
        pageSize: 9,
        pageIndex: 1,
    });
    const [showModal, setShowModal] = useState(true); // 展示弹窗
    const [list, setList] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        total: 0,
        pageSize: 9,
    });
    const [selectIds, setSelectIds] = useState([]);
    const areaRef = useRef(null);
    const filterConfig = [
        {
            type: "input", // string 组件类型 必填
            key: "name", // string 字段名称 必填
            label: "专家&机构名称", // string label名称 非必填 默认为空
            labelWidth: "120px", // number label的width值 非必填 默认为100
            other: {
                placeholder: "请输入专家&机构名称",
                allowClear: true,
            }, // input中的其他可取字段内容
        },
        {
            type: "treeSelect", // string 组件类型 必填
            key: "consultScopeList", // string 字段名称 必填
            label: "咨询范围", // string label名称 非必填 默认为空
            labelWidth: "80px", // number label的width值 非必填 默认为100
            orgTree: consultScopeList, // 选项
            treeNodeFilter: {
                key: "name",
                value: "id",
                title: "name",
                children: "children",
            },
            other: {
                placeholder: "请选择咨询范围",
                mode: "multiple",
                maxTagCount: "1",
                maxTagTextLength: "5",
                allowClear: true,
                treeCheckable: true,
                showCheckedStrategy: TreeSelect.SHOW_PARENT,
            }, // input中的其他可取字段内容
        },
        {
            type: "treeSelect", // string 组件类型 必填
            key: "industryList", // string 字段名称 必填
            label: "行业", // string label名称 非必填 默认为空
            labelWidth: "80px", // number label的width值 非必填 默认为100
            orgTree: industryList, // 选项
            treeNodeFilter: {
                key: "name",
                value: "id",
                title: "name",
                children: "children",
            },
            other: {
                placeholder: "请选择行业",
                mode: "multiple",
                maxTagCount: "1",
                maxTagTextLength: "5",
                allowClear: true,
                treeCheckable: true,
                showCheckedStrategy: TreeSelect.SHOW_PARENT,
            }, // input中的其他可取字段内容
        },
        {
            type: "select", // string 组件类型 必填
            key: "scene", // string 字段名称 必填
            label: "卡片类型", // string label名称 非必填 默认为空
            labelWidth: "120px", // number label的width值 非必填 默认为100
            options: sceneList,
            other: {
                placeholder: "请选择卡片类型",
                allowClear: true,
            }, // input中的其他可取字段内容
        },
        {
            type: "select", // string 组件类型 必填
            key: "subScene", // string 字段名称 必填
            label: "咨询类别", // string label名称 非必填 默认为空
            labelWidth: "80px", // number label的width值 非必填 默认为100
            options: subSceneList,
            other: {
                placeholder: "请选择咨询类别",
                allowClear: true,
            }, // input中的其他可取字段内容
        },
    ];
    const formFilterRef = useRef(null);
    const getTreeDate = async () => {
        let map = {
            0: setConsultScopeList,
            1: setIndustryList,
            2: setRegionList,
        };
        const res = await get(Api.classifyExpertTaxList);
        if (res.success && Array.isArray(res.data)) {
            res.data.forEach((item) => {
                map[item.type] &&
                    map[item.type](item.list || item.classifyList || []);
            });
        }
    };
    const fetchList = async (params = {}) => {
        const data = await post(Api.expertInstitutionList, { 
            data:{
            ...params,
            serviceWay,
        } });
        if (data.success) {
            setList(data.data.list);
            setPage({
                total: data.data.total,
                current: data.data.pageIndex,
                pageSize: data.data.pageSize,
            });
        }
    };
    const searchHandler = () => {
        let data = formFilterRef.current.getData();
        let classifyIdList = [];
        if (data.consultScopeList) {
            // data.consultScopeList = data.consultScopeList.join(',')
            classifyIdList = classifyIdList.concat(data.consultScopeList);
        }
        if (data.industryList) {
            //   data.industryList = data.industryList.join(',')
            classifyIdList = classifyIdList.concat(data.industryList);
        }
        data.pageIndex = 1;
        data.pageSize = 9;
        let params = {
            name: data.name,
            scene: data.scene,
            subScene: data.subScene,
            locationList: [areaRef.current],
            classifyIdList: classifyIdList,
            pageIndex: 1,
            pageSize: 9,
        };
        setParams(params);
    };
    const clearHandler = () => {
        formFilterRef.current.clearData();
        if (!areaRef.current) {
            setShowModal(true);
        }
        setParams({
            locationList:areaRef.current,
            pageSize: 9,
            pageIndex: 1,
        });
    };

    const editHandler = (item, type) => {
        const sendData = {
            expertId: item.id,
            location: areaRef.current,
        };
        onEdit && onEdit(sendData);
    };

    const areaSubmit = () => {
        validateFields((err, values) => {
            if (!err) {
                if (values.area) {
                    areaRef.current = values.area;
                    setHash({
                        location: areaRef.current,
                    });
                    setShowModal(false);
                    searchHandler();
                }
            }
        });
    };

    const setHash = (data) => {
        let hash = window.location.hash.split("#")[1];
        hash = hash.split("?")[0];
        let params = qs.parse(window.location.href.split("?")[1]);
        window.location.hash = `#${hash}?${qs.stringify(
            Object.assign(params, data)
        )}`;
    };

    useEffect(() => {
        const queryParams = qs.parse(window.location.href.split("?")[1]);
        if (queryParams.location) {
            areaRef.current = queryParams.location;
            setParams({
                ...params,
                locationList: queryParams.location,
            });
            setShowModal(false);
        }
        getTreeDate();
    }, []);

    useEffect(() => {
        if (areaRef.current && params && params.locationList) {
            fetchList(params);
        }
    }, [params]);
    useEffect(() => {
        const result = removeAll(regionList,'code');
        setNoAllRegionList(result);
    }, [regionList]);
    return (
        <div className="reservation-manage-list-box">
            <div className="content-box">
                <div className="form-filter-wrap">
                    <FormFilter config={filterConfig} ref={formFilterRef} />
                    <div className="btn-group">
                        <Button type="primary" onClick={searchHandler}>
                            查询
                        </Button>
                        <Button
                            style={{ marginLeft: 10 }}
                            onClick={clearHandler}
                        >
                            清空条件
                        </Button>
                    </div>
                </div>
                <div className="table-content">
                    <div className="btn-group">
                        <Button
                            type="primary"
                            style={{ marginRight: 10 }}
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            切换地区
                        </Button>
                    </div>
                    <div className="expert-content">
                        {list.map((item, index) => {
                            return (
                                <ExpertManageCard
                                    data={item}
                                    checked={selectIds.indexOf(item.id) >= 0}
                                    onEdit={() => {
                                        editHandler(
                                            item,
                                            editTypeMap.edit.code
                                        );
                                    }}
                                    key={`${item.id}${index}`}
                                />
                            );
                        })}
                    </div>
                    <div className="page-wrap">
                        <Pagination
                            className="pagination-overwrite"
                            {...page}
                            showQuickJumper
                            onChange={(pageIndex, pageSize) => {
                                setSelectIds([]);
                                setParams(
                                    Object.assign({}, params, {
                                        pageSize,
                                        pageIndex,
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
            </div>
            <Modal
                footer={null}
                title="地区选择"
                visible={showModal}
                closable={false}
                width={580}
            >
                <div className="area-select-box">
                    <div className="warning-box">
                        <div className="icon-box">
                            <div className="icon" />
                        </div>
                        <div className="warning-text">
                            <span>
                                地区选择会直接影响您可以编辑的专家范围，请谨慎选择您的所属地区；
                            </span>
                        </div>
                    </div>
                    <div className="content-box">
                        <div className="item">
                            <div className="label">
                                <span>选择地区</span>
                            </div>
                            <div className="content">
                                <Form>
                                    <FormItem>
                                        {getFieldDecorator("area", {
                                            initialValue: areaRef.current,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: "请选择地区",
                                                },
                                            ],
                                        })(
                                            <Select
                                                placeholder="请选择地区"
                                                className="select-item"
                                            >
                                                {Array.isArray(noAllRegionList) &&
                                                    noAllRegionList.map((item) => {
                                                        return (
                                                            <Select.Option
                                                                value={item.code}
                                                                key={item.code}
                                                            >
                                                                {item.name}
                                                            </Select.Option>
                                                        );
                                                    })}
                                            </Select>
                                        )}
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="button-box">
                        <Button
                            type="primary"
                            className="button-item"
                            onClick={() => {
                                areaSubmit();
                            }}
                        >
                            确定
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Form.create()(React.forwardRef(ReservationManageList));
