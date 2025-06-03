import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { message, Button, Table, Pagination, Modal } from "dpl-react";
import { olhelpEnumOptionType } from "@/const/config";
import { addAllOption } from "@/utils";
import EditModal from "./components/editModal";

// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 10;
// 枚举参数
const groupNamesList = [
  olhelpEnumOptionType.EnterType,
  olhelpEnumOptionType.Gjlx,
  olhelpEnumOptionType.ConsultService,
];
// 默认的入口类型
let defaultEnterTypeCode = null;
// 设置组优先级弹窗默认蚕食
const defaultEditModal = {
  isShow: false,
  // isShow: true,
  name: "新增",
  type: "add",
  id: undefined, // id
  data: {
    entryType: "", // 入口类型
    location: "", // 地区
    cpdm: "", // 产品代码
    channel: "", // 来源渠道
    module: "", // 模块
    entryAmount: 2, // 人口数量
    entryList: [], // 入口配置
  },
};

export default function ChannelEnterManage(props) {
  const [enterTypeList, setEnterTypeList] = useState([]); // 入口类型
  const [enterTypeMap, setEnterTypeMap] = useState({}); // 入口类型对象
  const [consultServiceList, setConsultServiceList] = useState([]); // 构建类型
  const [editModal, setEditModal] = useState(defaultEditModal); // 弹窗输入
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
  const getAgentList = (params) => {
    return get({
      url: Api.getEnterConfigList,
      params,
    });
  };

  // 封装的获取列表自定义hooks
  const { params, getList, loading, total, changeParams, list } = useGetList({
    queryFunc: getAgentList,
    defaultParam,
    isUseQueryString: false,
    isSearchRightNow: true,
  });

  // 查询表单
  const filterConfig = [
    {
      type: "select", // string 组件类型 必填
      key: "entryType", // string 字段名称 必填
      label: "入口类型", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      isShowTitle: true, // 下拉列表是否展示hit
      options: addAllOption(enterTypeList), // 选项
      initialValue: defaultParam.entryType || "all", // any 默认值 该情况
      other: {
        placeholder: "请选择入口类型",
      }, // 组件中的其他可取字段内容
    },
    {
      type: "input", // string 组件类型 必填
      key: "location", // string 字段名称 必填
      label: "地区", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      isShowTitle: true, // 下拉列表是否展示hit
      initialValue: defaultParam.location, // any 默认值 该情况
      other: {
        placeholder: "请输入地区",
        allowClear: true,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "input", // string 组件类型 必填
      key: "cpdm", // string 字段名称 必填
      label: "产品代码", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      isShowTitle: true, // 下拉列表是否展示hit
      initialValue: defaultParam.cpdm, // any 默认值 该情况
      other: {
        placeholder: "请输入产品代码",
        allowClear: true,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "input", // string 组件类型 必填
      key: "channel", // string 字段名称 必填
      label: "来源渠道", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      isShowTitle: true, // 下拉列表是否展示hit
      initialValue: defaultParam.channel, // any 默认值 该情况
      other: {
        placeholder: "请输入来源渠道",
        allowClear: true,
      }, // 组件中的其他可取字段内容
    },
  ];

  // 表格
  const tableConfig = [
    {
      title: "入口类型",
      align: "center",
      width: 130,
      ellipsis: true,
      render: (text, record, index) => {
        return <span>{enterTypeMap[record.entryType]}</span>;
      },
    },
    {
      title: "地区",
      dataIndex: "location",
      align: "center",
    },
    {
      title: "产品代码",
      dataIndex: "cpdm",
      align: "center",
      width: 200,
      ellipsis: true,
    },
    {
      title: "来源渠道",
      dataIndex: "channel",
      align: "center",
      width: 100,
      ellipsis: true,
    },
    {
      title: "模块",
      dataIndex: "module",
      align: "center",
    },
    {
      title: "入口数量",
      dataIndex: "entryAmount",
      align: "center",
      width: 100,
      ellipsis: true,
    },
    {
      title: "最后修改人",
      dataIndex: "lastModifyName",
      width:100,
      ellipsis: true,
      align: "center",
      render: (text, record, index) => {
        return <span>{text || "--"}</span>;
      },
    },
    {
      title: "最后修改时间",
      dataIndex: "lastModifyTime",
      align: "center",
      width: 180,
      ellipsis: true,
    },
    {
      title: "操作",
      width: 130,
      align: "center",
      render: (text, record, index) => {
        return (
          <div className="table-option-box">
            <span
              onClick={() => {
                editEnterConfig(record.id);
              }}
              className="option-button"
            >
              修改
            </span>
            <span
              onClick={() => {
                deleteEnterConfigButton(record.id);
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
   * 获取枚举（入口类型、构建类型）
   */
  const getEnumOptions = async () => {
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: groupNamesList.join(","),
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        switch (item.groupName) {
          // 入口类型
          case olhelpEnumOptionType.EnterType:
            let obj = {};
            item.options &&
              item.options.forEach((item) => {
                obj[item.id] = item.name;
                if (item.name === "客户端") {
                  defaultEnterTypeCode = item.id;
                }
              });
            setEnterTypeList(item.options);
            setEnterTypeMap(obj);
            break;
          //构建类型
          // case olhelpEnumOptionType.ConsultService:
          //   setGjlxList(item.options);
          //   break;
          default:
            break;
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
      params: {},
    });
    if (res.success && Array.isArray(res.data)) {
        setConsultServiceList(
          res.data.map((item) => {
            return {
              value: item.consultService,
              label: item.consultServiceName,
            };
          })
        );
    } else {
      message.error(res.message);
    }
  };

  // 初始化方法
  const initFunc = () => {
    getEnumOptions();
    getConsultProductTypeList();
  };

  // 格式化
  const formatParams = (data) => {
    return {
      entryType: data.entryType === "all" ? undefined : data.entryType,
      location: data.location || undefined,
      cpdm: data.cpdm || undefined,
      channel: data.channel || undefined,
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
  const resert = () => {
    formFilterRef.current.clearData({
      entryType: "all",
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

  // 编辑入口配置按钮
  const editEnterConfig = async (id) => {
    if (id) {
      const res = await get({
        url: Api.getEnterConfigDetail,
        params: {
          id,
        },
      });
      if (res.success) {
        const data = res.data;
        const list = data.entryList.map((item) => {
          item.vipEntranceFlag =
            item.vipEntranceFlag === "N" ? [] : [item.vipEntranceFlag];
          return item;
        });
        setEditModal({
          isShow: true,
          name: "修改",
          type: "edit",
          id,
          data: Object.assign({}, data, {
            entryList: list,
          }),
        });
      } else {
        message.error(res.message);
      }
    } else {
      setEditModal({
        isShow: true,
        name: "新增",
        type: "add",
        id: undefined,
        data: Object.assign({}, defaultEditModal.data, {
          entryType: defaultEnterTypeCode,
        }),
      });
    }
  };

  // 删除入口配置
  const deleteEnterConfig = async (id) => {
    const res = await post({
      url: Api.postDeleteEnterConfig,
      data: {
        idList: [].concat(id),
      },
    });
    if (res.success) {
      message.success("删除成功！");
      getList();
    } else {
      message.error(res.message);
    }
  };

  // 删除入口配置按钮

  const deleteEnterConfigButton = (id) => {
    Modal.confirm({
      title: "是否确定要删除该咨询入口配置",
      okText: "确认",
      cancelText: "取消",
      wait: true,
      onOk: () => {
        return new Promise((resolve) => {
          try {
            deleteEnterConfig(id);
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
   * 关闭批量设置弹窗
   */
  const closeBtachModal = (isRefresh) => {
    setEditModal(defaultEditModal);
    if (isRefresh) {
      getList();
    }
  };

  useEffect(() => {
    initFunc();
  }, []);


  console.log(editModal.data, 'editModal.data');

  return (
    <div className="channel-enter-box">
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
              resert();
            }}
          >
            重置
          </Button>
        </div>
      </div>
      <div className="table-box">
        <div className="table-btn">
          <Button type="primary" onClick={() => editEnterConfig()}>
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
        width={"calc(100% - 100px)"}
        className="channel-enter-edit-modal"
        destroyOnClose
        footer={null}
        onCancel={() => {
          closeBtachModal();
        }}
      >
        <EditModal
          enterTypeList={addAllOption(enterTypeList)}
          formData={editModal.data}
          consultServiceList={consultServiceList}
          config={editModal}
          onCancel={closeBtachModal}
        />
      </Modal>
    </div>
  );
}
