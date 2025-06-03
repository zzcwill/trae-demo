import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import getRegion from "@/utils/getRegion";
import { message, Button, Table, Pagination, Modal } from "dpl-react";
import EditModal from "./components/editModal";
import OptionBox from "./components/optionBox";
// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 10;

const defaultEditModal = {
  isShow: false,
  // isShow: true,
  name: "新增",
  type: "add",
  id: undefined, // id
  data: {},
};

export default function BannerManage(props) {
  const [areaList, setAreaList] = useState([]); // 地区
  const [areaListMap, setAreaListMap] = useState({}); // 地区

  const formFilterRef = useRef(null); // formRef
  const tableRef = useRef(null); // 表格ref
  const [editModal, setEditModal] = useState(defaultEditModal); // 弹窗输入

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
  const getBannerList = (params) => {
    return get({
      url: Api.getSearchBannerList,
      params,
    });
  };

  // 封装的获取列表自定义hooks
  const { params, getList, loading, total, changeParams, list } = useGetList({
    queryFunc: getBannerList,
    defaultParam,
    isUseQueryString: false,
    isSearchRightNow: true,
  });

  // 查询表单
  const filterConfig = [
    {
      type: "select", // string 组件类型 必填
      key: "regionCodes", // string 字段名称 必填
      label: "地区", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      isShowTitle: true, // 下拉列表是否展示hit
      options: areaList, // 选项
      other: {
        placeholder: "请选择地区",
        mode: "multiple",
        maxTagCount: 1,
        maxTagTextLength: 8,
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      },
      // 组件中的其他可取字段内容
    },
    {
      type: "input", // string 组件类型 必填
      key: "name", // string 字段名称 必填
      label: "名称", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      isShowTitle: true, // 下拉列表是否展示hit
      other: {
        placeholder: "请输入轮播图组名称",
        allowClear: true,
      }, // 组件中的其他可取字段内容
    },
  ];

  // 表格
  const tableConfig = [
    {
      title: "名称",
      align: "center",
      width:450,
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <span
            onClick={() => {
              editBannerConfig("detail", record.id);
            }}
            className="banner-table-name"
            title={record.name}
          >
            {record.name}
          </span>
        );
      },
    },
    {
      title: "地区",
      dataIndex: "regionCode",
      align: "center",
      width: 180,
      ellipsis: true,
      render: (text, record, index) => {
        const regionList = record.regionCode.split(",");
        const showList = regionList.map((item) => {
          return areaListMap[item];
        });
        return <span title={showList.join(",")}>{showList.join(",")}</span>;
      },
    },
    {
      title: "最后修改人",
      dataIndex: "lastModifyName",
      align: "center",
    },
    {
      title: "最后修改时间",
      dataIndex: "lastModifyTime",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      render: (text, record, index) => {
        return (
          <OptionBox
            record={record}
            editBannerConfig={editBannerConfig}
            deleteBannerConfigButton={deleteBannerConfigButton}
          />
        );
      },
    },
  ];

  /**
   * 编辑弹窗
   */
  const editBannerConfig = async (type, id) => {
    let data = {};
    switch (type) {
      case "add":
        setEditModal({
          isShow: true,
          name: "新增",
          type: "add",
          id: undefined, // id
          data: {
            name: "",
            regionCode: [],
            loopInterval: 5,
            imageInfoList: [],
          },
        });
        break;
      case "edit":
        data = await getBannerDetail(id);
        setEditModal({
          isShow: true,
          name: "修改",
          type: "edit",
          id, // id
          data,
        });
        break;
      default:
        data = await getBannerDetail(id);
        setEditModal({
          isShow: true,
          name: "详情",
          type: "detail",
          id,
          data,
        });
        break;
    }
  };

  /**
   * 获取详情
   */
  const getBannerDetail = async (id) => {
    try {
      const res = await get({
        url: Api.getBannerDetail,
        params: {
          id,
        },
      });
      if (res.success) {
        let data = res.data;
        data.regionCode = data.regionCode.split(",");
        return data;
      } else {
        message.error(res.message);
        return {};
      }
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const deleteBannerConfigButton = (id) => {
    Modal.confirm({
      title: "是否确定要删除该宣传图配置",
      okText: "确认",
      cancelText: "取消",
      wait: true,
      onOk: () => {
        return new Promise((resolve) => {
          try {
            deleteBannerConfig(id);
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

  // 删除入口配置
  const deleteBannerConfig = async (id) => {
    const res = await post({
      url: Api.postDeleteBanner,
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

  const getAreaList = async () => {
    const res = await getRegion("province");
    if (res) {
      const regionList = res["000000"];
      let areaMap = {};
      regionList.forEach((item) => {
        areaMap[item.id] = item.name;
      });
      setAreaListMap(areaMap);
      setAreaList(regionList);
    }
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

  // 格式化
  const formatParams = (data) => {
    return {
      regionCodes:
        data.regionCodes && data.regionCodes.length > 0
          ? data.regionCodes.join(",")
          : undefined,
      name: (data.name && data.name.trim()) || undefined,
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
    formFilterRef.current.clearData({});
  };

  useEffect(() => {
    getAreaList();
  }, []);
  return (
    <div className="banner-manage-box">
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
          <Button type="primary" onClick={() => editBannerConfig("add")}>
            新增
          </Button>
        </div>
        <Table
          dataSource={list}
          loading={loading}
          columns={tableConfig}
          pagination={false}
          rowKey="trueId"
          ref={tableRef}
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
        width="900px"
        className="channel-enter-edit-modal"
        destroyOnClose
        footer={null}
        onCancel={() => {
          closeBtachModal();
        }}
      >
        <EditModal
          areaList={areaList}
          formData={editModal.data}
          config={editModal}
          onCancel={closeBtachModal}
        />
      </Modal>
    </div>
  );
}
