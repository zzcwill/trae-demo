import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Pagination, Button, Checkbox, Modal, message } from "dpl-react";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import OfficialServiceCard from "@/components/consultManage/officialServiceCard";
// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 9;

export default function OfficialSearchModal(props) {
  const {
    type,
    onChange,
    serviceTypeList = [],
    onCancel,
    serviceTypeMap,
    editModalConfig,
    serviceTypeDisabled = true,
    sceneType,
  } = props;
  const formFilterRef = useRef(null); // formRef
  const [defaultParam, setDefaultParam] = useState(() => {
    return {
      type,
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
    };
  }); // 查询参数
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选择列表
  const [selectedRows, setSelectRows] = useState([]); // 选择列表
  const [brandList, setBrandList] = useState([]); // 维度

  /**
   * 查询列表Function
   * @param {Object} params // 查询参数
   */
  const getOfficialServiceList = (params) => {
    return get({
      url: Api.getOfficialServiceList,
      params: {
        ...params,
        excludeIdList: editModalConfig.selectList
          ? editModalConfig.selectList.join(",")
          : undefined,
        scene: sceneType, // 默认传工具场景
      },
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

  // 封装的获取列表自定义hooks
  const { params, getList, loading, total, changeParams, list } = useGetList({
    queryFunc: getOfficialServiceList,
    defaultParam,
    isUseQueryString: false,
    isSearchRightNow: false,
    beforeQuery,
  });

  // 查询表单
  const filterConfig = [
    {
      type: "input", // string 组件类型 必填
      key: "name", // string 字段名称 必填
      label: "官方服务名称", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      span: 8,
      other: {
        placeholder: "请输入官方服务名称",
      }, // 组件中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "type", // string 字段名称 必填
      label: "咨询类别", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      span: 8,
      initialValue: type || undefined,
      options: serviceTypeList,
      other: {
        placeholder: "请选择咨询类别",
        disabled: serviceTypeDisabled,
        getPopupContainer:(triggerNode) => triggerNode.parentNode
      }, // 组件中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "brand", // string 字段名称 必填
      label: "产品维度", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      span: 8,
      initialValue: undefined,
      options: brandList,
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
   * 单个checkBox点击
   */
  const checkChange = (e, record) => {
    const checked = e.target.checked;
    const index = selectedRowKeys.indexOf(record.id);
    if (checked) {
      if (index < 0) {
        let list = [].concat(record.id);
        let objList = [].concat(record);
        setSelectedRowKeys(list);
        setSelectRows(objList);
      }
    } else {
      if (index >= 0) {
        selectedRowKeys.splice(index, 1);
        selectedRows.splice(index, 1);
        setSelectedRowKeys([].concat(selectedRowKeys));
        setSelectRows([].concat(selectedRows));
      }
    }
  };

  // 清楚选中
  const clearSelect = () => {
    setSelectRows([]);
    setSelectedRowKeys([]);
  };

  // 格式化
  const formatParams = (data) => {
    let sendData = {
      name: (data.name && data.name.trim()) || undefined,
      type: data.type || undefined,
      brand: data.brand || undefined,
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
    };
    return sendData;
  };

  // 查询
  const query = () => {
    const data = formFilterRef.current.getData();
    const param = formatParams(data);
    clearSelect();
    changeParams(param);
  };

  // 清空
  const reset = () => {
    //清楚条件按钮
    formFilterRef.current.clearData({
      type,
    });
    clearSelect();
    changeParams({
      type,
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
    });
  };

  // 配置
  const save = () => {
    if (!selectedRowKeys.length) {
      Modal.confirm({
        title: "请至少选择一条数据进行添加操作！",
        okText: "确认",
        cancelText: "取消",
      });
      return;
    }
    onChange && onChange(selectedRows);
    clearSelect();
    onCancel();
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

  useEffect(() => {
    if (editModalConfig.isShow) {
      getWdList();
      getList();
    }
  }, [editModalConfig]);

  return (
    <div className="offical-search-modal-box">
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
          <div className="total-box">
            共找到符合条件的问答数量:&nbsp;{total}&nbsp;条
          </div>
        </div>
        <div className="data-list-box">
          {list.length > 0 &&
            list.map((item) => {
              return (
                <div
                  className="offical-service-item"
                  key={item.id}
                  draggable={false}
                >
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
                  </div>
                </div>
              );
            })}
        </div>
        {total > 0 && (
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
