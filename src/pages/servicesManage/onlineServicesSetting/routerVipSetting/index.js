import "./index.scss";
import { uForm } from "dora";
import React, { useState, useEffect, useRef } from "react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import useFormQueryNoChangeParams from "@/hooks/useFormQueryNoChangeParams";
import { Button, Table, Modal, message, Pagination } from "dpl-react";
import { olhelpEnumOptionType } from "@/const/config";
import EditModal from "./components/editModal";
import MultiEditModal from "./components/multiEditModal";
import { modalType, tagTypeMap } from "./config";
// TODO 增加其他类型
const groupNamesList = [
  olhelpEnumOptionType.Channel,
  olhelpEnumOptionType.PersonalTag,
  olhelpEnumOptionType.CompanyTag,
  olhelpEnumOptionType.Gj,
  olhelpEnumOptionType.AgencyTag,
  olhelpEnumOptionType.CompanyGroupTag,
  olhelpEnumOptionType.AgencyGroupTag,
  olhelpEnumOptionType.PersonGroupTag
];
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
  createFormActions,
} = uForm;
const actions = createFormActions();

const defaultPageIndex = 0;
const defaultPageSize = 20;
const defaultPageInfo = {
  pageIndex: defaultPageIndex,
  pageSize: defaultPageSize,
  total: 0,
};
const allLocation = {
  value: "ALL",
  label: "全部",
};
export default function RouterVipSetting(props) {
  const [locationOptions, setLocationOptions] = useState([]); // 地区选项列表
  const [consultServiceList, setConsultServiceList] = useState([]); // 咨询产品配置列表
  const [locationOptionsMap, setLocationOptionsMap] = useState({}); // 地区选项map
  const [channelList, setChannelList] = useState([]); // 渠道选项列表
  const [channelListMap, setChannelListMap] = useState({}); // 渠道选项Map
  const [serviceList, setServiceList] = useState([]); // 服务构建列表
  const [tagList, setTagList] = useState([]);
  const [checkboxList, setCheckboxList] = useState([]); // 复选框列表
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [multiEditModalVisible, setMultiEditModalVisible] = useState(false); // 批量编辑弹窗
  const isResetForm = useRef(false); // 是否重置
  const isJsQueryRef = useRef(false); // 是否js调用查询的
  const pageInfoRef = useRef(defaultPageInfo);
  const [modalInfo, setModalInfo] = useState({
    type: modalType.add.type,
    title: modalType.add.name,
    data: {},
    visible: false,
  });

  const [dispatchAndNoChangeParams, queryParamsMiddleware] =
    useFormQueryNoChangeParams();

  /**
   * 获取当前登录者信息
   */
  const getCurrentUserInfo = async () => {
    try {
      const res = await get({
        url: Api.getCurrentUserInfo,
        params: {},
      });
      if (res.success) {
        const data = res.data;
        setCheckboxList([
          {
            label: "最后修改人是我",
            value: data.id,
          },
        ]);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 获取地区信息
   */
  const getLocationList = async () => {
    try {
      const res = await get({ url: Api.commonGetLocationList });
      if (res.success) {
        const data = res.data;
        if (Array.isArray(data)) {
          let map = { [allLocation.value]: allLocation };
          const result = [allLocation].concat(
            data.map((item) => {
              map[item.id] = item;
              return { label: item.name, value: item.id };
            })
          );
          setLocationOptions(result);
          setLocationOptionsMap(map);
        }
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
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
  /**
   * 获取枚举（渠道列表）
   */
  const getEnumOptions = async () => {
    let tagData = {
      ...tagTypeMap,
    };
    const map = {
      [olhelpEnumOptionType.Channel]: (list, map) => {
        setChannelList(list);
        setChannelListMap(map);
      },
      [olhelpEnumOptionType.PersonalTag]: (list, map) => {
        Object.assign(tagData[tagTypeMap.person.value], {
          list,
        });
      },
      [olhelpEnumOptionType.CompanyTag]: (list, map) => {
        Object.assign(tagData[tagTypeMap.company.value], {
          list,
        });
      },
      [olhelpEnumOptionType.AgencyTag]: (list, map) => {
        Object.assign(tagData[tagTypeMap.agency.value], {
          list,
        });
      },
      [olhelpEnumOptionType.Gj]: (list, map) => {
        setServiceList(list);
      },
      [olhelpEnumOptionType.CompanyGroupTag]: (list, map) => {
        Object.assign(tagData[tagTypeMap.companyGroup.value], {
          list,
        });
      },
      [olhelpEnumOptionType.AgencyGroupTag]: (list, map) => {
        Object.assign(tagData[tagTypeMap.agencyGroup.value], {
          list,
        });
      },
      [olhelpEnumOptionType.PersonGroupTag]: (list, map) => {
        Object.assign(tagData[tagTypeMap.personGroup.value], {
          list,
        });
      },      
    };
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: groupNamesList.join(","),
      },
    });
    if (res.success) {
      const data = res.data;
      Array.isArray(data) &&
        data.forEach((item) => {
          const func = map[item.groupName];
          if (func) {
            let obj = {};
            let optionsList = [];
            item.options &&
              item.options.forEach((item) => {
                obj[item.id] = item.name;
                optionsList.push({
                  label: item.name,
                  value: item.id,
                });
              });
            func(optionsList, obj);
          }
        });
      try {
        setTagList(
          Object.keys(tagData).map((key) => {
            return tagData[key];
          })
        );
      } catch (e) {
        console.error(e);
      }
    } else {
      message.error(res.message);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      ellipsis: true,
      align: "center",
    },
    {
      title: "地区",
      dataIndex: "location",
      ellipsis: true,
      align: "center",
      render: function (text, record) {
        if (!text) {
          return null;
        }
        return (
          <span>
            {(locationOptionsMap[text] && locationOptionsMap[text].name) ||
              text}
          </span>
        );
      },
    },
    {
      title: "咨询产品类型",
      dataIndex: "consultServiceName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "渠道",
      dataIndex: "channelName",
      ellipsis: true,
      align: "center",
    },
    { title: "模块", dataIndex: "module", ellipsis: true, align: "center" },
    {
      title: "标签类型",
      dataIndex: "tagTypeName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "标签",
      dataIndex: "tagName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "服务授权",
      dataIndex: "serviceEmpowerName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "国地类型",
      dataIndex: "taxTypeName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "VIP等级",
      dataIndex: "vip",
      ellipsis: true,
      align: "center",
    },
    {
      title: "接入优先级",
      dataIndex: "grade",
      ellipsis: true,
      align: "center",
    },
    {
      title: "备注",
      dataIndex: "remark",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "最后修改人",
      dataIndex: "modifierName",
      ellipsis: true,
      align: "center",
      render: function (text, record) {
        return (
          <span className="modifier-box">
            {record.modifierName && <div>{record.modifierName}</div>}
            {record.modifyDate && <div>{record.modifyDate}</div>}
          </span>
        );
      },
    },
    {
      title: "操作",
      dataIndex: "actions",
      align: "center",
      width: 100,
      render: function (text, record) {
        return (
          <div className="option-box">
            <span
              onClick={() => {
                editRouterVipSetting(record);
              }}
            >
              修改
            </span>
            <div className="button-line"></div>
            <span
              onClick={() => {
                deleteHandler(record.id);
              }}
            >
              删除
            </span>
          </div>
        );
      },
    },
  ];

  const onTableSelectedChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onTableSelectedChange,
    hideDefaultSelections: true,
  }

  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    let params = {
        ...values,
      pageIndex: pagination.current - 1 || defaultPageIndex,
      pageSize: pagination.pageSize || defaultPageSize,
      modifierId: values.modifierId && values.modifierId[0], // 修改人id
    };
    if (isJsQueryRef.current) {
      params.pageIndex = pageInfoRef.current.pageIndex - 1;
      params.pageSize = pageInfoRef.current.pageSize;
    }
    const res = await get({
      url: Api.getRoutePriorityList,
      params,
    });

    if (res.success) {
      const data = res.data;
      pageInfoRef.current = {
        pageIndex: data.pageIndex + 1,
        pageSize: data.pageSize,
        total: data.total,
      };
    } else {
      message.error(res.message);
    }
    return {
      dataSource: (res.data && res.data.list) || [],
      pageSize: (res.data && res.data.pageSize) || pagination.pageSize,
      total: res.data && res.data.total,
      current: (res.data && res.data.pageIndex + 1) || pagination.current,
    };
  };

  /**
   * uForm中间件
   */
  const middleware =
    () =>
    ({ context }) => ({
      onFormResetQuery(payload, next) {
        isResetForm.current = true;
        context.setPagination({
          ...context.pagination,
          current: 1,
        });
        context.setSorter({});
        context.setFilters({});
        return next({});
      },
      onPageQuery(payload, next) {
        isJsQueryRef.current = false;
        context.setPagination({
          ...context.pagination,
        });
        context.setSorter({});
        context.setFilters({});
        return next(isResetForm.current ? {} : payload);
      },
    });

  /**
   * 清除标记
   */
  const clearFlag = () => {
    isResetForm.current = false;
    isJsQueryRef.current = false;
  };

  const { form, table } = useFormTableQuery(
    service,
    {
      pagination: {
        pageSize: defaultPageSize,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    },
    [queryParamsMiddleware, middleware()]
  );

  /**
   * 分页
   * @param {*} pageIndex
   * @param {*} pageSize
   */
  const changePage = (pageIndex, pageSize) => {
    const pagination = Object.assign({}, table.pagination, {
      current: pageIndex,
      pageSize,
    });
    table.onChange(pagination, null, null);
  };

  /**
   * 新增
   */
  const addRouterVipSetting = () => {
    setModalInfo({
      type: modalType.add.type,
      title: modalType.add.name,
      data: {},
      visible: true,
    });
  };

  /**
   * 批量修改
   */
  const multiVipSetting = () => {
    if (!selectedRowKeys.length) {
      message.warning("请至少选择一条VIP优先级配置");
      return;
    }
    setMultiEditModalVisible(true);
  }

  /**
   * 批量修改内容提交
   */

  const confirmMultiVipSetting = async (values) => {
    try {
      const result = await post({
        url: Api.postPriorityBatchUpdate,
        data: {
          idList: selectedRowKeys,
          vip: values.vip,
          grade: values.grade,
          remark: values.remark,
        }
      })

      if (result.success) {
        message.success("批量修改成功");
        setMultiEditModalVisible(false);
        setSelectedRowKeys([]);
        actions.submit();
      } else {
        message.error(result.message || '批量修改失败');
      }
    } catch (error) {
      console.log(error);
    }

  };

  /**
   * 获取路由优先级详情
   */
  const getRoutePriorityDetail = async (id) => {
    let result = null;
    try {
      const res = await get({
        url: Api.getRoutePriorityDetail,
        params: { id },
      });
      if (res.success) {
        const data = res.data;
        result = Object.assign({}, data);
      }
    } catch (e) {
      console.error(e);
    }
    return result;
  };

  /**
   * 修改黑名单
   */
  const editRouterVipSetting = async (item) => {
    const { id } = item;
    if (!id && id != 0) {
      return;
    }
    const detailData = await getRoutePriorityDetail(id);
    if (!detailData) {
      return;
    }
    setModalInfo({
      type: modalType.edit.type,
      title: modalType.edit.name,
      data: {
        ...detailData,
      },
      visible: true,
    });
  };

  /**
   * 弹窗关闭
   */
  const modalOnCancel = (isRefresh) => {
    setModalInfo(
      Object.assign({}, modalInfo, {
        visible: false,
      })
    );
    if (isRefresh) {
      isJsQueryRef.current = true;
      dispatchAndNoChangeParams();
    }
  };

  /**
   * 删除方法
   */
  const deleteFunc = async (id) => {
    try {
      const data = await post({
        url: Api.postDeleteRoutePriority,
        data: { id },
      });
      if (data.success) {
        isJsQueryRef.current = true;
        dispatchAndNoChangeParams();
        message.success("删除成功");
      } else {
        message.error(data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /**
   * 删除点击
   */
  const deleteHandler = (id) => {
    Modal.confirm({
      title: "提示",
      content: "是否确定删除该记录",
      onOk: () => {
        deleteFunc(id);
      },
    });
  };

  /**
   * 初始化调用function
   */
  const initFunc = () => {
    getCurrentUserInfo();
    getLocationList();
    getEnumOptions();
    getConsultProductTypeList();
  };

  useEffect(() => {
    initFunc();
  }, []);

  return (
    <div className="router-vip-setting">
      <SchemaForm {...form} actions={actions} inline className="query-form-by-render">
        <Field
          name="location"
          title="地区"
          x-component="Select"
          x-component-props={{
            placeholder: "请选择地区",
            allowClear: true,
            dataSource: locationOptions,
            className: "inline-width-300",
            showSearch: true,
            optionFilterProp: "children",
          }}
        />
        <Field
          name="channel"
          title="渠道"
          x-component="Select"
          x-component-props={{
            placeholder: "请选择渠道",
            allowClear: true,
            dataSource: channelList,
            className: "inline-width-300",
            showSearch: true,
            optionFilterProp: "children",
          }}
        />
        <Field
          type="string"
          title="ID"
          name="id"
          x-component="Input"
          x-component-props={{ placeholder: "请输入" }}
        />
        <Field
          type="string"
          name="vip"
          x-component="InputNumber"
          title="VIP"
          x-rules={[{ message: "请输入"}]}
          x-component-props={{
            max: 99,
            min: 0,
            precision: 0,
            inputWidth: 100,
          }}
        />
        <Field
          type="string"
          name="grade"
          x-component="InputNumber"
          title="受理优先级"
          x-rules={[{ message: "请输入"}]}
          x-component-props={{
            max: 99,
            min: 0,
            precision: 0,
            inputWidth: 100,
          }}
        />
        <Field
          type="string"
          name="modifierId"
          x-component="CheckboxGroup"
          x-component-props={{
            options: checkboxList,
          }}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }} onClick={clearFlag}>
            查询
          </Submit>
          <Reset>清空条件</Reset>
        </FormButtonGroup>
      </SchemaForm>
      <div className="table-box">
        <div className="table-btn">
          <Button type="primary" onClick={() => addRouterVipSetting()}>
            新增
          </Button>
          <Button type="primary" onClick={() => multiVipSetting()} style={{ marginLeft: 10 }}>
            批量修改
          </Button>
        </div>
        <Table
          className="table-wrap"
          rowSelection={rowSelection}
          {...table}
          columns={columns}
          rowKey={"id"}
          pagination={false}
        />
        <div className="pagination-box">
          <Pagination
            showTotalInfo={false}
            current={Number(table.pagination.current)}
            pageSize={Number(table.pagination.pageSize)}
            total={Number(table.pagination.total)}
            showQuickJumper={true}
            showSizeChanger={true}
            pageSizeOptions={["10", "20", "50", "100"]}
            onShowSizeChange={changePage}
            onChange={changePage}
          />
        </div>
      </div>

      <Modal
        footer={null}
        title={modalInfo.title}
        visible={modalInfo.visible}
        onCancel={modalOnCancel}
        destroyOnClose={true}
        width={900}
        className="vip-edit-modal"
      >
        <EditModal
          locationList={locationOptions}
          consultServiceList={consultServiceList}
          type={modalInfo.type}
          data={modalInfo.data}
          serviceList={serviceList}
          channelList={channelList}
          tagTypeList={tagList}
          onCancel={modalOnCancel}
        />
      </Modal>
      <MultiEditModal 
        visible={multiEditModalVisible}
        onCancel={() => setMultiEditModalVisible(false)}
        onOk={confirmMultiVipSetting}
      />
    </div>
  );
}
