import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { callcenterEnumOptionType } from "@/const/config";
import { message, Button, Table, Pagination, Modal } from "dpl-react";
import moment from "moment";
import Eidt from "./components/edit";
import { addAllOption } from "@/utils";

// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 20;
// 设置组优先级弹窗默认蚕食
const defaultEditModal = {
  isShow: false,
  id: undefined,
  name: "新增",
  ExtensionObj: undefined, // 具体信息
};

const groupNames = [
  callcenterEnumOptionType.ExtNumberType,
  callcenterEnumOptionType.ExtNumberState,
];

export default function ExtensionManage(props) {
  const formFilterRef = useRef(null);
  const [queryParams, setQueryParams] = useState(() => {
    let data = qs.parse(window.location.href.split("?")[1]);
    return Object.assign(
      {
        pageIndex: defaultPageIndex,
        pageSize: defaultPageSize,
      },
      data
    );
  }); // 查询参数
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选中列表
  const [editModal, setEditModal] = useState(defaultEditModal); //
  const [typeList, setTypeList] = useState([]); // 电话类型列表
  const [stateList, setStateList] = useState([]); // 状态列表

  /**
   * 查询列表Function
   * @param {Object} params // 查询参数
   */
  const getExtensionList = (params) => {
    return get({
      url: Api.getExtNumberList,
      params,
    });
  };

  // 封装的获取列表自定义hooks
  const { params, getList, loading, total, changeParams, list } = useGetList({
    queryFunc: getExtensionList,
    defaultParam: queryParams,
    isUseQueryString: true,
    isSearchRightNow: true,
  });

  // 查询参数配置
  const filterConfig = [
    {
      type: "inputNumber", // string 组件类型 必填
      key: "telephone", // string 字段名称 必填
      label: "电话号码", // string label名称 非必填 默认为空
      labelWidth: "90px", // number label的width值 非必填 默认为100
      initialValue: queryParams.telephone || undefined,
      other: {
        placeholder: "请输入电话号码",
        allowClear: true,
      }, // input中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "type", // string 字段名称 必填
      label: "电话类型", // string label名称 非必填 默认为空
      labelWidth: "90px", // number label的width值 非必填 默认为100
      initialValue: queryParams.type || "all",
      options: addAllOption(typeList),
      other: {
        placeholder: "请选择电话类型",
      }, // input中的其他可取字段内容
    },
    {
      type: "select", // string 组件类型 必填
      key: "bindState", // string 字段名称 必填
      label: "状态", // string label名称 非必填 默认为空
      labelWidth: "90px", // number label的width值 非必填 默认为100
      initialValue: queryParams.bindState || "all",
      options: addAllOption(stateList),
      other: {
        placeholder: "请选择状态",
      }, // input中的其他可取字段内容
    },
  ];

  /**
   * 表格配置
   */
  const tableConfig = [
    {
      title: "电话号码",
      dataIndex: "telephone",
    },
    {
      title: "电话类型",
      dataIndex: "typeName",
    },
    {
      title: "状态",
      dataIndex: "bindStateName",
    },
    {
      title: "操作",
      dataIndex: "option",
      align: "center",
      width: 120,
      render: (text, record, index) => {
        return (
          <div className="table-option-box">
            <span
              onClick={() => {
                editExtension(record);
              }}
              className="option-button"
            >
              修改
            </span>
            <span
              onClick={() => {
                batchDeleteExtension([record.id]);
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
   * 获取电话类型和绑定状态
   */
  const getEnumOptions = async () => {
    const res = await get({
      url: Api.getEnumOption,
      params: {
        groupNames: groupNames.join(","), // 电话类型和绑定状态
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        switch (item.groupName) {
          // 组状态
          case callcenterEnumOptionType.ExtNumberType:
            setTypeList(item.options);
            break;
          case callcenterEnumOptionType.ExtNumberState:
            setStateList(item.options);
            break;
          default:
            break;
        }
      });
    } else {
      message.error(res.message);
    }
  };

  // 表格选择
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedlist) => {
      setSelectedRowKeys(selectedlist);
    },
  };

  /**
   * 编辑操作
   */
  const editExtension = (item = {}) => {
    const data = {
      isShow: true,
      id: item.id === 0 || item.id ? item.id : undefined,
      name: item.id === 0 || item.id ? "修改" : "新增",
      ExtensionObj: {
        telephone: item.telephone,
        type: item.type,
      }, // 具体信息
    };
    setEditModal(data);
  };

  const batchDelete = () => {
    if (!selectedRowKeys.length) {
      Modal.warning({
        content: "必须选中一个分机",
        okText: "确定",
      });
      return;
    }
    batchDeleteExtension(selectedRowKeys);
  };

  /**
   * 批量删除
   */
  const batchDeleteExtension = (list) => {
    Modal.confirm({
      title: "正在进行删除操作",
      content: "删除后数据不可恢复，你还要继续吗？",
      onOk: async () => {
        const data = await post({
          url: Api.postBatchDeleteExtNumber,
          data: { idList: list },
        });
        if (data.success) {
          message.success("删除成功");
          setSelectedRowKeys([]);
          getList();
        } else {
          message.error(data.message);
        }
      },
    });
  };

  /**
   * 查询
   */
  const query = () => {
    const data = formFilterRef.current.getData();
    const param = {
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
      type: data.type === "all" ? undefined : data.type,
      bindState: data.bindState === "all" ? undefined : data.bindState,
      telephone: data.telephone || undefined,
    };
    changeParams(param);
    setSelectedRowKeys([]);
  };

  /**
   * 重置
   */
  const resert = () => {
    formFilterRef.current.clearData({
      type: "all",
      bindState: "all",
    });
    changeParams({
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
    });
    setSelectedRowKeys([]);
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
    setSelectedRowKeys([]);
  };

  /**
   * 关闭批量设置弹窗
   */
  const closeBtachModal = (isRefresh) => {
    setEditModal(defaultEditModal);
    if (isRefresh) {
      setSelectedRowKeys([]);
      getList();
    }
  };

  useEffect(() => {
    getEnumOptions();
  }, []);

  return (
    <div className="extension-box">
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
            搜索
          </Button>
          <div className="line-box"></div>
          <Button
            className="search-button"
            disabled={loading}
            onClick={() => {
              resert();
            }}
          >
            清空条件
          </Button>
        </div>
      </div>
      <div className="table-box">
        <div className="table-btn">
          <Button type="primary" onClick={() => editExtension()}>
            新增
          </Button>
          <div className="button-line"></div>
          <Button type="primary" onClick={() => batchDelete()}>
            批量删除
          </Button>
        </div>
        <Table
          dataSource={list}
          loading={loading}
          columns={tableConfig}
          pagination={false}
          rowKey={"id"}
          className="extension-table"
          rowSelection={rowSelection}
        />
        <div className="pagination-box">
          <Pagination
            showTotalInfo={true}
            current={parseInt(params.pageIndex)}
            pageSize={parseInt(params.pageSize)}
            total={total}
            showQuickJumper={true}
            showSizeChanger={true}
            pageSizeOptions={["20", "40", "60", "80"]}
            onChange={changePage}
            onShowSizeChange={changePage}
          />
        </div>
      </div>
      <Modal
        title={editModal.name}
        visible={editModal.isShow}
        width={600}
        footer={null}
        className="extension-edit-modal"
        destroyOnClose
        onCancel={() => {
          closeBtachModal();
        }}
      >
        <Eidt
          id={editModal.id}
          data={editModal.ExtensionObj}
          onCancel={closeBtachModal}
          typeList={typeList}
        />
      </Modal>
    </div>
  );
}
