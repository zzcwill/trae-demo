import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import {
  message,
  Button,
  Table,
  Pagination,
  Modal,
  Checkbox,
  Icon,
} from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { editTypeEnum } from "./config";
import OfficialServiceCard from "@/components/consultManage/officialServiceCard";
import DeleteSvg from "./components/deleteSvg";
import EditModal from "./components/editModal";
import { olhelpEnumOptionType, sceneOfficialList, serviceConfigCardTypeEnum } from "@/const/config";

// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 9;

const defaultEditModal = {
  isShow: false,
  name: "新增",
  type: "add",
  id: undefined, // id
  data: {},
};

export default function OfficialServiceManage(props) {
  const formFilterRef = useRef(null); // formRef
  const [defaultParam, setDefaultParam] = useState(() => {
    const data = qs.parse(window.location.href.split("?")[1]);
    return Object.assign(
      {
        pageIndex: defaultPageIndex,
        pageSize: defaultPageSize,
      },
      data
    );
  }); // 查询参数

  const [selectAll, setSelectAll] = useState({
    indeterminate: false,
    checkAll: false,
  }); // 是否全选

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选择列表
  const [defaultCheckList, setDefaultCheckList] = useState([]); // 选择列表
  const [brandList, setBrandList] = useState([]); // 维度
  const [editModal, setEditModal] = useState(defaultEditModal);
  const [serviceList, setServiceList] = useState([]); // 服务类型
  const [serviceTypeMap, setServiceTypeMap] = useState({});
  const [rightsServiceList, setRightsServiceList] = useState([]); //权益服务类型
  const listRef = useRef(null); // 展示数据列表ref

  // 获取维度、地区、用户等级列表
  const getWdList = async () => {
    const res = await get({
      url: Api.getWdList,
    });
    if (res.success) {
      const data = res.data;
      setBrandList([].concat(data.brand));
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取服务类型
   */
  const getServiceTypeList = async () => {
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: `${olhelpEnumOptionType.OfficialServiceType}`, // 服务类型
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        if (
          item.groupName === olhelpEnumOptionType.OfficialServiceType &&
          item.options
        ) {
          let obj = {};
          item.options.forEach((item) => {
            obj[item.id] = item;
          });
          setServiceTypeMap(obj);
          setServiceList(item.options);
        }
      });
    } else {
      message.error(res.message);
    }
  };

    /**
   * 查询咨询产品配置列表
   */
    const getConsultProductTypeList = async () => {
      const res = await get({
      url: Api.getServiceConfigQueryServiceConfigList,
      params: {
          cardTypes: serviceConfigCardTypeEnum.offcial, 
      },
      });
      if (res.success && Array.isArray(res.data)) {
          setRightsServiceList(res.data.map(item => {
              return {
                  id: item.consultService,
                  name: item.consultServiceName,
              }
          }))
      } else {
      message.error(res.message);
      }
  };

  /**
   * 查询列表Function
   * @param {Object} params // 查询参数
   */
  const getOfficialServiceList = (params) => {
    return get({
      url: Api.getOfficialServiceList,
      params,
    });
  };
  const beforeQuery = (data) => {
    let obj = {};
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === "string") {
        obj[key] = data[key].trim();
      } else {
        obj[key] = data[key];
      }
    });
    return obj;
  };

  // 封装的获取列表自定义hooks
  const { params, getList, loading, total, changeParams, list } = useGetList({
    queryFunc: getOfficialServiceList,
    defaultParam,
    isUseQueryString: true,
    isSearchRightNow: true,
    beforeQuery,
    elRef: listRef,
  });

  // 查询表单
  const filterConfig = [
    {
      type: "input", // string 组件类型 必填
      key: "name", // string 字段名称 必填
      label: "服务名称", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      span: 8,
      initialValue: defaultParam.name || undefined,
      other: {
        placeholder: "请输入服务名称",
        allowClear: true,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "type", // string 字段名称 必填
      label: "咨询类别", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      span: 8,
      options: serviceList,
      initialValue:
        (defaultParam.type && defaultParam.type.split(",")) || undefined,
      other: {
        placeholder: "请选择咨询类别",
        allowClear: true,
        mode: "multiple",
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "scene", // string 字段名称 必填
      label: "卡片类型", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      span: 8,
      options: sceneOfficialList,
      initialValue: defaultParam.scene || undefined,
      other: {
        placeholder: "请选择卡片类型",
        allowClear: true,
        getPopupContainer:(triggerNode) => triggerNode.parentNode
      }, // 组件中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "brand", // string 字段名称 必填
      label: "产品维度", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      span: 8,
      options: brandList,
      initialValue: defaultParam.brand || undefined,
      other: {
        placeholder: "请选择产品维度",
        allowClear: true,
        showSearch:true,
        optionFilterProp: "children",
        getPopupContainer:(triggerNode) => triggerNode.parentNode
      }, // 组件中的其他可取字段内容
    },
  ];

  /**
   * 全选
   */
  const selectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      let idList = [];
      list.forEach((item) => {
        idList.push(item.id);
      });
      setSelectedRowKeys(idList);
    } else {
      setSelectedRowKeys([]);
    }
    setSelectAll({
      indeterminate: false,
      checkAll: checked,
    });
  };

  /**
   * 单个checkBox点击
   */
  const checkChange = (e, record) => {
    const checked = e.target.checked;
    const index = selectedRowKeys.indexOf(record.id);
    if (checked) {
      if (index < 0) {
        let list = [...selectedRowKeys, record.id];
        setSelectedRowKeys(list);
        setSelectAll({
          indeterminate: !!list.length && list.length < defaultCheckList.length,
          checkAll: list.length === defaultCheckList.length,
        });
      }
    } else {
      if (index >= 0) {
        selectedRowKeys.splice(index, 1);
        setSelectedRowKeys([...selectedRowKeys]);
        setSelectAll({
          indeterminate:
            !!selectedRowKeys.length &&
            selectedRowKeys.length < defaultCheckList.length,
          checkAll: selectedRowKeys.length === defaultCheckList.length,
        });
      }
    }
  };

  // 批量删除
  const batchDelete = (list) => {
    if (!list || !list.length) {
      Modal.confirm({
        title: "请至少选择一条数据进行删除操作！",
        okText: "确认",
        cancelText: "取消",
      });
      return;
    }
    Modal.confirm({
      title: "是否确定要删除",
      okText: "确认",
      cancelText: "取消",
      wait: true,
      onOk: () => {
        return new Promise((resolve) => {
          try {
            postBatchDeleteOfficialService(list);
            resolve();
          } catch (e) {
            console.error(e);
            message.error("系统出错请联系管理员！");
            resolve();
          }
        });
      },
    });
  };
  // 批量删除接口
  const postBatchDeleteOfficialService = async (idList) => {
    const res = await post({
      url: Api.postBatchDeleteOfficialService,
      data: {
        idList,
      },
    });
    if (res.success) {
      message.success("删除成功！");
      clearSelect();
      getList();
    } else {
      message.error(res.message);
    }
  };

  // 格式化
  const formatParams = (data) => {
    let sendData = {
      name: (data.name && data.name.trim()) || undefined,
      scene: data.scene,
      brand: data.brand,
      type: data.type && data.type.length > 0 ? data.type.join(",") : undefined,
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
    };
    return sendData;
  };

  const query = () => {
    const data = formFilterRef.current.getData();
    const param = formatParams(data);
    clearSelect();
    changeParams(param);
  };

  // 清空
  const reset = () => {
    //清楚条件按钮
    formFilterRef.current.clearData();
    clearSelect();
    changeParams({
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
    });
  };

  /**
   * 关闭批量设置弹窗
   */
  const closeModal = (type) => {
    setEditModal(defaultEditModal);
    switch (type) {
      case editTypeEnum.edit:
        clearSelect();
        getList();
        break;
      case editTypeEnum.add:
        formFilterRef.current.clearData();
        clearSelect();
        // 判断使用getList 还是changeParams, 满足新增后跳转到第一页的需求
        let isUseGetList = true;
        Object.keys(params).forEach((key) => {
          switch (key) {
            case "pageIndex":
              if (params[key] != defaultPageIndex) {
                isUseGetList = false;
              }
              break;
            case "pageSize":
              if (params[key] != defaultPageSize) {
                isUseGetList = false;
              }
              break;
            default:
              if (params[key]) {
                isUseGetList = false;
              }
              break;
          }
        });
        if (isUseGetList) {
          getList();
        } else {
          changeParams({
            pageIndex: defaultPageIndex,
            pageSize: defaultPageSize,
          });
        }
        break;
      default:
        break;
    }
  };

  /**
   * 分页
   */
  const changePage = (pageIndex, pageSize) => {
    clearSelect();
    changeParams(
      Object.assign({}, params, {
        pageIndex,
        pageSize,
      })
    );
  };
  const clearSelect = () => {
    setSelectedRowKeys([]);
    setSelectAll({
      indeterminate: false,
      checkAll: false,
    });
  };

  // 编辑操作
  const editOfficialService = async (type, id) => {
    switch (type) {
      case editTypeEnum.add:
        setEditModal({
          isShow: true,
          name: "新增",
          type,
          id: undefined,
          data: undefined,
        });
        break;
      case editTypeEnum.edit:
      default:
        if (id || id == "0") {
          const data = await getOfficialServiceDetail(id);
          if (data) {
            setEditModal({
              isShow: true,
              name: type === editTypeEnum.edit ? "编辑" : "详情",
              type,
              id,
              data,
            });
          }
        } else {
          message.warning("id不存在！");
        }
        break;
    }
  };

  // 获取详情
  const getOfficialServiceDetail = async (id) => {
    let result = null;
    try {
      const res = await get({
        url: Api.getOfficialServiceDetail,
        params: {
          id,
        },
      });
      if (res.success) {
        const data = res.data;
        result = Object.assign({}, data);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("系统出错请联系管理员！");
    }
    return result;
  };

  // 初始化方法
  const initFunc = () => {
    getWdList();
    getServiceTypeList();
    getConsultProductTypeList()
  };

  useEffect(() => {
    setDefaultCheckList(list);
  }, [list]);

  useEffect(() => {
    initFunc();
  }, []);

  return (
    <div className="offical-service-manage-box">
      <div className="content-box">
        <div className="search-box">
          <FormFilter config={filterConfig} ref={formFilterRef} />
          <div className="search-button-box">
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
                reset();
              }}
            >
              重置
            </Button>
          </div>
        </div>
        <div className="option-box">
          <Checkbox
            indeterminate={selectAll.indeterminate}
            checked={selectAll.checkAll}
            onChange={selectAllChange}
            className="select-all"
          >
            全选
          </Checkbox>
          <div className="line"></div>
          <Button
            type="primary"
            icon="plus"
            loading={loading}
            onClick={() => {
              editOfficialService(editTypeEnum.add);
            }}
          >
            新增服务
          </Button>
          <div className="line"></div>
          <Button
            loading={loading}
            type="primary-bordered"
            onClick={() => {
              batchDelete(selectedRowKeys);
            }}
          >
            批量删除
          </Button>
          <div className="line"></div>
          <div className="total-box">
            共找到符合条件的问答数量:&nbsp;{total}&nbsp;条
          </div>
        </div>
        <div className="data-list-box" ref={listRef}>
          {list.length > 0 &&
            list.map((item) => {
              return (
                <div className="offical-service-item" key={item.id}>
                  <OfficialServiceCard
                    isShowDelete={false}
                    isShowConsult={false}
                    value={item}
                    typeIcon={item.type}
                    imageUrl={item.imageUrl}
                    serviceTypeMap={serviceTypeMap}
                    showDescription={false}
                    showName={true}
                    showBrand={true}
                  />
                  <div className="card-option">
                    <Checkbox
                      checked={selectedRowKeys.indexOf(item.id) >= 0}
                      onChange={(e) => {
                        checkChange(e, item);
                      }}
                      className="card-option-item select"
                    >
                      选中
                    </Checkbox>
                    <div className="line"></div>
                    <div
                      className="card-option-item edit"
                      onClick={() => {
                        editOfficialService(editTypeEnum.edit, item.id);
                      }}
                    >
                      <Icon type="pen-o" />
                      <div className="text-line"></div>
                      <span>编辑</span>
                    </div>
                    <div className="line"></div>
                    <div
                      className="card-option-item delete"
                      onClick={() => {
                        batchDelete([].concat(item.id));
                      }}
                    >
                      <DeleteSvg />
                      <div className="text-line"></div>
                      <span>删除</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {list.length > 0 && (
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
        title={editModal.name}
        visible={editModal.isShow}
        width={"800px"}
        className="offical-service-edit-modal"
        destroyOnClose
        footer={null}
        onCancel={() => {
          closeModal();
        }}
      >
        <EditModal
          brandList={brandList}
          serviceList={serviceList}
          rightsServiceList={rightsServiceList}
          formData={editModal.data}
          config={editModal}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
}
