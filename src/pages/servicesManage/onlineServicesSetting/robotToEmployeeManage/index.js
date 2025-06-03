import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { addAllOption } from "@/utils";
import { message, Button, Table, Pagination, Modal } from "dpl-react";
import EditModal from "./components/editModal";
// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 10;
const defaultEditModal = {
  isShow: false,
  name: "新增",
  type: "add",
  data: {},
};
export default function RobotToEmployeeManage(props) {
  const [loactionList, setLocationList] = useState([]); // 地区
  const [brandList, setBrandList] = useState([]); // 维度
  const [loactionMap, setLocationMap] = useState({}); // loactiontionMap
  const [brandMap, setBrandMap] = useState({}); // loactiontionMap
  const [editModal, setEditModal] = useState(defaultEditModal); // 弹窗
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

  /**
   * 查询列表Function
   * @param {Object} params // 查询参数
   */
  const getRobotInteractConfigList = (params) => {
    return get({
      url: Api.getRobotInteractConfigList,
      params,
    });
  };

  // 封装的获取列表自定义hooks
  const { params, getList, loading, total, changeParams, list } = useGetList({
    queryFunc: getRobotInteractConfigList,
    defaultParam,
    isUseQueryString: true,
    isSearchRightNow: true,
  });

  // 查询表单
  const filterConfig = [
    {
      type: "select", // string 组件类型 必填
      key: "location", // string 字段名称 必填
      label: "地区", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      options: addAllOption(loactionList),
      initialValue: defaultParam.location || "all", // any 默认值 该情况
      other: {
        placeholder: "请选择地区",
        showSearch: true,
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "brand", // string 字段名称 必填
      label: "产品维度", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      initialValue: defaultParam.brand || "all", // any 默认值 该情况
      options: addAllOption(brandList),
      other: {
        placeholder: "请选择产品维度",
        showSearch: true,
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      }, // 组件中的其他可取字段内容
    },
  ];

  // 表格
  const tableConfig = [
    {
      title: "地区",
      align: "center",
      dataIndex: "locationName",
    },
    {
      title: "产品维度",
      align: "center",
      dataIndex: "brandName",
    },
    {
      title: "满意度阈值",
      align: "center",
      dataIndex: "satisfactionModelThreshold",
    },
    {
      title: "最后修改人",
      width: 200,
      align: "center",
      dataIndex: "lastModifyTime",
      render: (text, record, index) => {
        return (
          <>
            <span>{record.lastModifierName}</span>
            <br />
            <span>{record.lastModifyTime}</span>
          </>
        );
      },
    },
    {
      title: "操作",
      width: 200,
      align: "center",
      render: (text, record, index) => {
        return (
          <div className="table-option-box">
            <span
              onClick={() => {
                editRobotInteractConfig(record);
              }}
              className="option-button"
            >
              修改
            </span>
            <span
              onClick={() => {
                deleteRobotInteractConfigButton(record.id);
              }}
              className="option-button"
            >
              删除
            </span>
          </div>
        );
      },
    },
  ];

  /**
   * 删除按钮
   */
  const deleteRobotInteractConfigButton = (id) => {
    Modal.confirm({
      title: "是否确定要删除",
      okText: "确认",
      cancelText: "取消",
      wait: true,
      onOk: () => {
        return new Promise((resolve) => {
          try {
            deleteRobotInteractConfig(id);
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

  /**
   * 删除设置
   */
  const deleteRobotInteractConfig = async (id) => {
    const res = await post({
      url: Api.postDeleteRobotInteractConfig,
      data: {
        id,
      },
    });
    if (res.success) {
      message.success("删除成功！");
      getList();
    } else {
      message.error(res.message);
    }
  };

  /**
   * 编辑
   */
  const editRobotInteractConfig = (data) => {
    if (data) {
      setEditModal({
        isShow: true,
        name: "修改",
        type: "edit",
        data: {
          id: data.id,
          satisfactionModelThreshold: data.satisfactionModelThreshold,
          locationList: data.location,
          brandList: data.brand,
        },
      });
      return;
    }
    setEditModal({
      isShow: true,
      name: "新增",
      type: "add",
      data: {},
    });
  };

  // 获取维度、地区、列表
  const getWdList = async () => {
    const res = await get({
      url: Api.getWdList,
    });
    if (res.success) {
      const data = res.data;
      let locationObj = {};
      let brandObj = {};
      data.location &&
        data.location.forEach((item) => {
          locationObj[item.id] = item.name;
        });
      data.brand &&
        data.brand.forEach((item) => {
          brandObj[item.id] = item.name;
        });
      locationObj[""] = "全部";
      brandObj[""] = "全部";
      setLocationMap(locationObj);
      setBrandMap(brandObj);
      setLocationList([].concat(data.location));
      setBrandList([].concat(data.brand));
    } else {
      message.error(res.message);
    }
  };

  /**
   * 格式化
   */
  const formatParams = (data) => {
    return {
      location: data.location === "all" ? undefined : data.location,
      brand: data.brand === "all" ? undefined : data.brand,
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
    };
  };

  // 查询
  const query = () => {
    const data = formFilterRef.current.getData();
    const param = formatParams(data);
    changeParams(param);
  };

  // 清空
  const reset = () => {
    formFilterRef.current.clearData({
      location: "all",
      brand: "all",
    });
  };

  /**
   * 分页
   */
  const changePage = (pageIndex, pageSize) => {
    changeParams(
      Object.assign({}, params, {
        pageIndex,
        pageSize,
      })
    );
  };

  /**
   * 关闭弹窗
   */
  const closeBatchModal = (isRefresh) => {
    setEditModal(defaultEditModal);
    if (isRefresh) {
      getList();
    }
  };

  useEffect(() => {
    getWdList();
  }, []);
  return (
    <div className="robot-to-employee-manage-box">
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
      <div className="table-box">
        <div className="table-btn">
          <Button type="primary" onClick={() => editRobotInteractConfig()}>
            新增
          </Button>
        </div>
        <Table
          dataSource={list}
          loading={loading}
          columns={tableConfig}
          pagination={false}
          rowKey="trueId"
          className="call-manage-table"
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
        title={editModal.name}
        visible={editModal.isShow}
        width={"800px"}
        className="channel-enter-edit-modal"
        destroyOnClose
        footer={null}
        onCancel={() => {
          closeBatchModal();
        }}
      >
        <EditModal
          location={addAllOption(loactionList)}
          brand={addAllOption(brandList)}
          formData={editModal.data}
          config={editModal}
          onCancel={closeBatchModal}
        />
      </Modal>
    </div>
  );
}
