import React, { useState, useRef, useEffect, useMemo } from "react";
import "./index.scss";
import FormFilter from "@/components/common/formFilter";
import ExpertSelect from "./component/expertSelect";
import { Button, Pagination, message, Modal, TreeSelect } from "dpl-react";
import Api from "@/request/api-olhelpmanage";
import { get, post } from "@/request/request";
import history from "@/history";
import ExpertManageCard from "./component/expertManageCard";
import { sceneList, editTypeMap, subSceneList,serviceTypeList } from "@/const/config";
import { getSceneType, getSubSceneType } from "@/pages/consultManage/common/tools"
import { galaxyConfig } from "@/utils";
import BatchEditTime from "./component/batchEditTime";
import qs from "qs";
import { set } from "lodash";
import useDictList from "@/hooks/useDictList";

const defaultPageSize = 9;
const otherComponentSConfig = {
    modalSelect: ExpertSelect,
  };
export default function ExpertManage(props) {
    const [regionList, setRegionList] = useState([]);
    const [consultScopeList, setConsultScopeList] = useState([]);
    const [industryList, setIndustryList] = useState([]);
    const [batchEditTimeShow, setBatchEditTimeShow] = useState(false)//批量编辑时间弹框
    const [batchEditList, setBatchEditList] = useState([])
    const [
        expertTypeList,
    ] = useDictList([
    "expert_type"
    ], Api.getEnumOptions);
    const [params, setParams] = useState({
        pageSize: defaultPageSize,
        pageIndex: 1,
    });
    const [allExpertList, setAllExpertList] = useState([]); // 所有专家列表
    const [list, setList] = useState([]);
    const [page, setPage] = useState({
        current: 1,
        total: 0,
        pageSize: defaultPageSize,
    });
    console.log(expertTypeList, 'expertTypeList');
    const [selectIds, setSelectIds] = useState([]);
    const filterConfig = [
        {
            type: "modalSelect", // string 组件类型 必填
            key: "idList", // string 字段名称 必填
            label: "专家&机构名称", // string label名称 非必填 默认为空
            labelWidth: "120px", // number label的width值 非必填 默认为100
            other: {
                placeholder: "请选择专家&机构名称",
                list: allExpertList,
                allowClear: true,
                isNeedStringToNumber:true,
                modalTitle: "专家&机构名称",
                showType:'box',
                format:{
                    label: "label",
                    value: "value",
                }
            }, // input中的其他可取字段内容
        },
        // {
        //     type: "input", // string 组件类型 必填
        //     key: "name", // string 字段名称 必填
        //     label: "专家&机构名称", // string label名称 非必填 默认为空
        //     labelWidth: "120px", // number label的width值 非必填 默认为100
        //     other: {
        //         placeholder: "请输入专家&机构名称",
        //         allowClear: true,
        //     }, // input中的其他可取字段内容
        // },
        {
            type: "treeSelect", // string 组件类型 必填
            key: "locationList", // string 字段名称 必填
            label: "地区", // string label名称 非必填 默认为空
            labelWidth: "80px", // number label的width值 非必填 默认为100
            orgTree: regionList,
            treeNodeFilter: {
                key: "name",
                value: "code",
                title: "name",
                children: "children",
            },
            other: {
                placeholder: "请选择地区",
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
            labelWidth: "120px", // number label的width值 非必填 默认为100
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
            labelWidth: "80px", // number label的width值 非必填 默认为100
            options: sceneList,
            other: {
                placeholder: "请选择卡片类型",
                allowClear: true,
            }, // input中的其他可取字段内容
        },
        {
            type: "select", // string 组件类型 必填
            key: "expertType", // string 字段名称 必填
            label: "专家类型", // string label名称 非必填 默认为空
            labelWidth: "80px", // number label的width值 非必填 默认为100
            options: expertTypeList?.map(item => {
                return {
                    id: item.value,
                    name: item.label,
                    showName: item.label
                }
            }),
            other: {
                placeholder: "请选择专家类型",
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
        {
            type: "select", // string 组件类型 必填
            key: "serviceWay", // string 字段名称 必填
            label: "服务方式", // string label名称 非必填 默认为空
            labelWidth: "120px", // number label的width值 非必填 默认为100
            options: serviceTypeList, // 选项
            other: {
                placeholder: "请选择服务方式",
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
        const data = await get(Api.classifyExpertTaxList);
        data.data.forEach((item) => {
            map[item.type] &&
                map[item.type](item.list || item.classifyList || []);
        });
    };
    const getAllExpert = async () => {
        const data = await get({
            url: Api.expertServiceExpertList,
            params: {
                type: "0",
            }
        });
        if (data.success) {
            const newList = data.data.map((item) => ({ 
                value: item.id, 
                label: `${item.name}(${item.sceneName}-${item.subSceneName})` 
                // label: `${item.name}(${getSceneType(sceneList, item.scene)}${getSubSceneType(subSceneList, item.subScene)})` 
            }))
            setAllExpertList(newList);
        }
    }

    const fetchList = async (params) => {
        const data = await post(Api.expertInstitutionList, { 
            data: params
         });
        if (data.success) {
            setList(data.data.list);
            setPage({
                total: data.data.total,
                current: data.data.pageIndex,
                pageSize: data.data.pageSize,
            });
        }
    };
    const pageChange = (pageIndex, pageSize) => {
        setSelectIds([]);
        setParams(
            { ...params,
            pageSize,
                pageIndex,}
        );
    };

    const searchHandler = () => {
        let data = formFilterRef.current.getData();
        let classifyIdList = [];
        console.log('searchHandler', data);
        if (data.consultScopeList) {
            // data.consultScopeList = data.consultScopeList.join(',')
            classifyIdList = classifyIdList.concat(data.consultScopeList);
        }
        if (data.industryList) {
            //   data.industryList = data.industryList.join(',')
            classifyIdList = classifyIdList.concat(data.industryList);
        }
        data.pageIndex = 1;
        data.pageSize = params.pageSize;
        let newParams = {
            name: data.name,
            scene: data.scene,
            subScene: data.subScene,
            idList: data.idList,
            classifyIdList: classifyIdList,
            locationList: data.locationList,
            serviceWay:data.serviceWay,
            expertType: data.expertType,
            pageIndex: 1,
            pageSize: data.pageSize,
        };
        setParams(newParams);
    };
    const clearHandler = () => {
        formFilterRef.current.clearData();
        setParams({ pageSize: pageSize, pageIndex: 1 });
    };
    const addHandler = () => {
        Modal.confirm({
            title: "请确认是否已经开通账号",
            content: (
                <div>
                    <span>专家&机构新增前请先在</span>
                    <a href={galaxyConfig.employeeUrl} target="_blank" rel="noreferrer">
                        【员工账户中心】
                    </a>
                    中开通账号
                </div>
            ),
            onOk() {
                history.push(
                    "/consultManage/expertManage/expertAdd?type=" +
                        editTypeMap.add.code
                );
            },
            okText: "继续",
        });
    };
    const allSelectHandler = () => {
        if (selectIds.length === list.length) {
            setSelectIds([]);
        } else {
            setSelectIds(list.map((item) => item.id));
        }
    };
    const allDeleteHandler = async () => {
        if (selectIds.length === 0) {
            message.error("请至少选择一位专家");
            return;
        }
        Modal.confirm({
            title: "正在执行删除操作",
            content: "删除后的服务将无法恢复，你还要继续吗",
            onOk: async () => {
                const data = await post(Api.expertInstitutionBatchDelete, {
                    data: { idList: selectIds },
                });
                if (data.success) {
                    message.success("删除成功");
                    setSelectIds([]);
                    fetchList(params);
                } else {
                    message.error(data.message);
                }
            },
        });
    };

    const batchSetTimeHandler = () => {
        if (selectIds.length === 0) {
            message.error("请至少选择一条记录");
            return;
        }
        if (selectIds.length > 200) {
            message.error("最多只能选择200条记录");
            return;
        }
        // 设置给详情编辑的专家数据
        const selectList = list.filter((item) => selectIds.includes(item.id));
        const resultList = selectList.map((item) => {
            return {
                id: item.id,
                name: item.name,
                label: `${item.name}(${getSceneType(sceneList, item.scene)}${getSubSceneType(subSceneList, item.subScene)})`,
                scene: item.scene, 
                subScene: item.subScene,
            }
        });
        setBatchEditList(resultList);
        setBatchEditTimeShow(true);

    }
    const deleteHandler = (id) => {
        Modal.confirm({
            title: "正在执行删除操作",
            content: "删除后的服务将无法恢复，你还要继续吗",
            onOk: async () => {
                const data = await post(Api.expertInstitutionBatchDelete, {
                    data: { idList: [id] },
                });
                if (data.success) {
                    message.success("删除成功");
                    setSelectIds([]);
                    fetchList(params);
                } else {
                    message.error(data.message);
                }
            },
        });
    };
    const editHandler = (item, type) => {
        const sendData = {
            id: item.id,
            type,
        };
        history.push(
            `/consultManage/expertManage/expertAdd?${qs.stringify(sendData)}`
        );
    };
    const checkedHandler = (id, flag) => {
        if (selectIds.indexOf(id) < 0) {
            selectIds.push(id);
            setSelectIds([...selectIds]);
        } else {
            setSelectIds(selectIds.filter((item) => id !== item));
        }
    };

    useEffect(() => {
        getTreeDate();
        getAllExpert();
    }, []);
    useEffect(() => {
        fetchList(params);
    }, [params]);

    console.log(filterConfig, 'filterConfig');
    return (
        <div className="expert-manage-box">
            <div className="content-box">
                <div className="form-filter-wrap">
                    <FormFilter config={filterConfig} ref={formFilterRef} selfComponents={otherComponentSConfig} />
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
                          onClick={addHandler}
                        >
                            新增服务
                        </Button>
                        <Button
                          style={{ marginRight: 10 }}
                          onClick={allSelectHandler}
                        >
                            全选
                        </Button>
                        <Button
                          type="primary"
                          style={{ marginRight: 10 }}
                          onClick={allDeleteHandler}
                        >
                            批量删除
                        </Button>
                        <Button
                          type="primary"
                          style={{ marginRight: 10 }}
                          onClick={batchSetTimeHandler}
                        >
                            批量设置专家时间
                        </Button>                    
                        <div className="total">
                            共找到符合条件的专家&机构<span>{page.total}</span>条
                        </div>
                    </div>
                    <div className="expert-content">
                        {list.map((item) => {
                            return (
                                <ExpertManageCard
                                  data={item}
                                  checked={selectIds.indexOf(item.id) >= 0}
                                  onDelete={() => {
                                        deleteHandler(item.id);
                                    }}
                                  onCheck={(flag) => {
                                        checkedHandler(item.id, flag);
                                    }}
                                  onEdit={() => {
                                        editHandler(
                                            item,
                                            editTypeMap.edit.code
                                        );
                                    }}
                                  onCopy={() => {
                                        editHandler(
                                            item,
                                            editTypeMap.copy.code
                                        );
                                    }}
                                  key={item.id}
                                  onClick={() => {
                                        history.push(
                                            "/consultManage/expertManage/expertDetail?id=" +
                                                item.id
                                        );
                                    }}
                                />
                            );
                        })}
                    </div>
                    <div className="page-wrap">
                        <Pagination
                            className="pagination-overwrite"
                            {...page}
                            pageSizeOptions={["9", "20", "100", "200"]}
                            showQuickJumper
                            showSizeChanger
                            onChange={pageChange}
                            onShowSizeChange={pageChange}
                        />
                    </div>
                </div>
            </div>
            <BatchEditTime 
                visible={batchEditTimeShow} 
                expertList={batchEditList}
                onOk={() => setBatchEditTimeShow(false)}
                onCancel={() => setBatchEditTimeShow(false)}
            />
        </div>
    );
}
