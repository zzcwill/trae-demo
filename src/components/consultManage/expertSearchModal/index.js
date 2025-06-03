import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Button, Pagination, message, Modal, TreeSelect } from "dpl-react";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import ExpertManageCard from "./components/expertManageCard";
import {
    expertStatus,
    sceneList,
    subSceneList,
    serviceTypeList,
    classifyTypeEnum,
} from "@/const/config";

// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 9;

export default function ExpertSearchModal(props) {
    const {
        multiple = false, //默认单选
        type = 'entrance', // pool 是专家池 默认落地页
        scene = sceneList[1].id, //默认工具场景
        value = [], //有默认选中的
        onCancel,
        onChange,
    } = props;
    const [params, setParams] = useState({
        pageSize: defaultPageSize,
        pageIndex: defaultPageIndex,
        scene: scene,
        subScene: type === 'entrance' ? subSceneList[0].id : '',
    });
    const [consultScopeList,setConsultScopeList] = useState([]) //咨询类别
    const [industryList, setIndustryList] = useState([])//擅长行业
    const [areaList, setAreaList] = useState([]); // 咨询地区列表
    const [inquiryConsultScopeList,setInquiryConsultScopeList] = useState([]) //问诊咨询类别 - 后续根据咨询类别去变更
    const [inquiryIndustryList, setInquiryIndustryList] = useState([])//问诊擅长行业 - 后续根据咨询类别去变更
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false); // loading
    const [page, setPage] = useState({
        current: 1,
        total: 0,
        pageSize: 9,
    });
    const [selectRows, setSelectRows] = useState([...value]);
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
            key: "locationList", // string 字段名称 必填
            label: "地区", // string label名称 非必填 默认为空
            labelWidth: "80px", // number label的width值 非必填 默认为100
            orgTree: areaList,
            treeNodeFilter: {
                key: "code",
                value: "code",
                title: "name",
                children: "children",
            },
            other: {
                placeholder: "请选择地区",
                mode: "multiple",
                maxTagCount: 1,
                maxTagTextLength: 5,
                allowClear: true,
                treeCheckable: true,
                showCheckedStrategy: TreeSelect.SHOW_PARENT,
                getPopupContainer: (triggerNode) => triggerNode.parentNode,
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
                className: "test",
                placeholder: "请选择咨询范围",
                mode: "multiple",
                maxTagCount: 1,
                maxTagTextLength: 5,
                allowClear: true,
                treeCheckable: true,
                showCheckedStrategy: TreeSelect.SHOW_PARENT,
                getPopupContainer: (triggerNode) => triggerNode.parentNode,
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
                maxTagCount: 1,
                maxTagTextLength: 5,
                allowClear: true,
                treeCheckable: true,
                showCheckedStrategy: TreeSelect.SHOW_PARENT,
                getPopupContainer: (triggerNode) => triggerNode.parentNode,
            }, // input中的其他可取字段内容
        },
        {
            type: "select", // string 组件类型 必填
            key: "serviceWay", // string 字段名称 必填
            label: "服务方式", // string label名称 非必填 默认为空
            labelWidth: "80px", // number label的width值 非必填 默认为100
            options: serviceTypeList, // 选项
            other: {
                placeholder: "请选择服务方式",
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
      // 获取业务分类，获取全部，在预览是一同使用，避免多次查询
  const getClassificationList = async () => {
    const res = await get({
      url: Api.classifyExpertTaxList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      if (data && data.length) {

        data.forEach((item) => {
          switch (item.type) {
            case classifyTypeEnum.classify:
                setConsultScopeList([...item.list])
              break;
            case classifyTypeEnum.profession:
                setIndustryList([...item.list])
              break;
            case classifyTypeEnum.area:
                setAreaList([...item.list])
                break;
            case classifyTypeEnum.inquiryRange:
                setInquiryConsultScopeList([...item.list])
              break;
            case classifyTypeEnum.inquiryProfession:
                setInquiryIndustryList([...item.list])
              break;
            default:
              break;
          }
        });
      }
    } else {
      message.error(res.message);
    }
  };
  
    const fetchList = async (params) => {
        setLoading(true);
        try {
            const data = await post(Api.expertInstitutionList, {
                data: { ...params, status: expertStatus.examinePass },
            });
            if (data.success) {
                setList(data.data.list);
                setPage({
                    total: data.data.total,
                    current: data.data.pageIndex,
                    pageSize: data.data.pageSize,
                });
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
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
        data.pageIndex = defaultPageIndex;
        data.pageSize = defaultPageSize;
        let params = {
            name: data.name,
            scene: scene,
            subScene: data.subScene,
            classifyIdList: classifyIdList,
            locationList: data.locationList,
            serviceWay: data.serviceWay,
            pageIndex: defaultPageIndex,
            pageSize: defaultPageSize,
        };
        setParams(params);
    };
    const clearHandler = () => {
        formFilterRef.current.clearData();
        setParams({
            scene: scene,
            // subScene: subSceneList[0].id,
            pageSize: defaultPageSize,
            pageIndex: defaultPageIndex,
        });
    };

    const checkedHandler = (item, flag) => {
        if(multiple) {
            const index = selectRows.findIndex(inner => inner.id === item.id)
            if(index === -1) {
                selectRows.push(item)  
            }else {
                selectRows.splice(index, 1)
            }
            setSelectRows([...selectRows]);
        }else {
            setSelectRows([item]);
        }
    };

    // 配置
    const save = () => {
        if (!selectRows.length) {
            Modal.confirm({
                title: "请至少选择一条数据进行添加操作！",
                okText: "确认",
                cancelText: "取消",
            });
            return;
        }
        onChange && onChange(selectRows);
        onCancel();
    };
    useEffect(() => {
        fetchList(params);
    }, [params]);

    // useEffect(() => {
    //     setSelectRows(value)
    // }, [value])
    useEffect(() => {
        getClassificationList()
    },[])
    return (
        <div className="expert-search-modal-box">
            <div className="form-filter-wrap">
                <FormFilter defaultValue={params} config={filterConfig} ref={formFilterRef} />
                <div className="btn-group">
                    <Button type="primary" onClick={searchHandler}>
                        查询
                    </Button>
                    <Button style={{ marginLeft: 10 }} onClick={clearHandler}>
                        清空条件
                    </Button>
                </div>
            </div>
            <div className="table-content">
                <div className="btn-group">
                    <div className="total">
                        共找到符合条件的专家&机构<span>{page.total}</span>条
                    </div>
                </div>
                <div className="expert-content">
                    {list.map((item) => {
                        // console.log('selectRows',selectRows, selectRows.filter(inner => inner.id === item.id).length);
                        return (
                            <ExpertManageCard
                                key={item.id}
                                data={item}
                                checked={selectRows.filter(inner => inner.id === item.id).length > 0}
                                onCheck={(flag) => {
                                    checkedHandler(item, flag);
                                }}
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
            <div className="button-box">
                <Button
                    type="primary"
                    className="button-item"
                    loading={loading}
                    onClick={() => {
                        save();
                    }}
                >
                    确定
                </Button>
                <div className="line-box"></div>
                <Button
                    className="button-item"
                    disabled={loading}
                    onClick={() => {
                        onCancel();
                    }}
                >
                    取消
                </Button>
            </div>
        </div>
    );
}
