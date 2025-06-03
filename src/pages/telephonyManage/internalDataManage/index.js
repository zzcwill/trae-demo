import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  message,
  DatePicker,
  Select,
  Checkbox,
  Button,
  Table,
  Pagination,
  Modal,
} from "dpl-react";
import "./index.scss";
import { get, post } from "@/request/request";
import API from "@/request/api-callcentermanage";
import { enumOptionType } from "@/const";
import moment from "moment";
import EditModal from "./components/editModal";

const { RangePicker } = DatePicker;
/**
 * 默认布局
 */
const defaultLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const defaultModalConfig = {
  title: "新增", // title名称
  visible: false, // 是否关闭
  type: "add", // 类型
  detail: {}, // 详情
};

const defaultPageIndex = 1;
const defaultPageSize = 20;

/**
 * 初始化查询参数
 */
const initQueryForm = () => {
  const publishTimeStart = moment(moment().format("YYYY-MM-01 00:00:00"));
  const publishTimeEnd = moment(new Date());
  return {
    type: undefined, // 资料类型
    publishTime: [].concat(publishTimeStart, publishTimeEnd), // 发布时间
    selfPublish: false, // 仅查询自己发布的
    pageIndex: defaultPageIndex, // 页码
    pageSize: defaultPageSize, // 每页记录数
  };
};

const InternalDataManage = React.forwardRef((props, ref) => {
  const { form } = props;
  const { getFieldDecorator, setFieldsValue, getFieldsValue } = form;
  const [queryForm, setQueryForm] = useState(initQueryForm()); // 查询参数
  const [total, setTotal] = useState(null); // 总条数
  const [internalDataTypeList, setInternalDataTypeList] = useState([]); // 内部资料类别
  const [loading, setLoading] = useState(false); // loading
  const [internalTypeList, setInternalTypeList] = useState([]); // 内部资料列表
  const [modalConfig, setModalConfig] = useState(defaultModalConfig); // 弹窗配置
  const [internalDataTypeMap, setInternalDataType] = useState({}); // 内部资料类别Map

  // 表格配置文件
  const tableConfig = [
    {
      title: "标题",
      dataIndex: "title",
      width: 400,
      ellipsis: true,
    },
    {
      title: "发布人",
      dataIndex: "publisherName",
      align: "center",
      width: 150,
    },
    {
      title: "类别",
      dataIndex: "type",
      align: "center",
      width: 150,
      render: (text, record, index) => {
        return <div>{internalDataTypeMap[record.type]}</div>;
      },
    },
    {
      title: "发布时间",
      dataIndex: "publishTime",
      align: "center",
      width: 150,
    },
    {
      title: "操作",
      width: 150,
      align: "center",
      render: (text, record, index) => {
        return (
          <div>
            <span
              className="detail-button option-button"
              onClick={() => {
                openModal("detail", record);
              }}
            >
              查看详情
            </span>
            <div className="line-box"></div>
            <span
              className="delete-button option-button"
              onClick={() => {
                deleteModal(record);
              }}
            >
              删除
            </span>
          </div>
        );
      },
    },
  ];

  /**
   * 获取内部资料类别
   */
  const getEnumOption = async () => {
    const res = await get({
      url: API.getEnumOption,
      params: {
        groupNames: enumOptionType.InternalData,
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        if (item.groupName === enumOptionType.InternalData) {
          setInternalDataTypeList(item.options);
          let obj = {};
          item.options.forEach((item) => {
            obj[item.id] = item.name;
          });
          setInternalDataType(obj);
        }
      });
    } else {
      message.error(res.message);
    }
  };

  /**
   * 重置搜索内容
   */
  const resert = () => {
    const formParma = initQueryForm();
    // setQueryForm(formParma);
    setFieldsValue(formParma);
  };

  /**
   * 查询
   */
  const query = () => {
    const values = getFieldsValue();
    const params = initParams(values, defaultPageIndex, defaultPageSize);
    setQueryForm(
      Object.assign({}, queryForm, {
        ...values,
        pageSize: defaultPageSize,
        pageIndex: defaultPageIndex,
      })
    );
    getInternalDataList(params);
  };

  /**
   * 拼装参数
   * @param {Object} item
   * @param {Number} pageIndex
   * @param {Number} pageSize
   */
  const initParams = (item, pageIndex, pageSize) => {
    let obj = {
      publishTimeBegin:
        item.publishTime.length > 0
          ? item.publishTime[0].format("YYYY-MM-DD")
          : "", // 发布时间起
      publishTimeEnd:
        item.publishTime.length > 0
          ? item.publishTime[1].format("YYYY-MM-DD")
          : "", // 发布时间止
      selfPublish: item.selfPublish[0] || false, // 仅查询自己发布的
      type: item.type, // 资料类型，01：价格政策及定义，02：协作规则，03：技能组信息，04：培训计划
    };
    if (pageIndex) {
      obj.pageIndex = pageIndex; // 当前页码
    }
    if (pageSize) {
      obj.pageSize = pageSize; // 每页条数, // 当前页码
    }
    return obj;
  };

  /**
   * 获取内部资料列表
   * @param {Objec} params
   */
  const getInternalDataList = async (params) => {
    setLoading(true);
    const res = await get({
      url: API.getInternalDataList,
      params,
    });
    if (res.success) {
      const data = res.data;
      setInternalTypeList(data.list);
      setTotal(data.total);
    } else {
      message.error(res.message);
    }
    setLoading(false);
  };

  /**
   * 删除弹窗
   * @param {Object} item
   */
  const deleteModal = (item) => {
    Modal.confirm({
      title: "确定要删除该内部资料吗？",
      content: "删除后无法恢复",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteInternalData(item);
      },
    });
  };
  /**
   * 删除内部资料
   * @param {Object}} item
   */
  const deleteInternalData = async (item) => {
    setLoading(true);
    const res = await post({
      url: API.deleteInternalDataList,
      data: {
        id: item.id,
      },
    });
    if (res.success) {
      message.success("删除成功");
      closeModal(true);
    } else {
      message.error(res.message);
    }
    setLoading(false);
  };

  /**
   * 分页
   */
  const changePage = (pageIndex, pageSize) => {
    const params = initParams(queryForm, pageIndex, pageSize);
    setQueryForm(
      Object.assign({}, queryForm, {
        pageIndex,
        pageSize,
      })
    );
    getInternalDataList(params);
  };

  /**
   * 获取内部资料详情
   * @param {String} id
   */
  const getDetail = async (type, id) => {
    const res = await get({
      url: API.getInternalDataDetail,
      params: {
        id,
      },
    });
    if (res.success) {
      setModalConfig({
        title: type === "add" ? "新增" : "详情",
        visible: true, // 是否关闭
        type, // 类型
        detail: res.data,
      });
    } else {
      message.error(res.message);
    }
  };

  /**
   * 打开弹窗
   */
  const openModal = (type, detail) => {
    if (detail) {
      getDetail(type, detail.id);
    } else {
      setModalConfig({
        title: type === "add" ? "新增" : "详情",
        visible: true, // 是否关闭
        type, // 类型
      });
    }
  };

  /**
   * 关闭弹窗
   */
  const closeModal = (isSearch) => {
    setModalConfig(defaultModalConfig);
    if (isSearch) {
      const param = initParams(
        queryForm,
        queryForm.pageIndex,
        queryForm.pageSize
      );
      getInternalDataList(param);
    }
  };

  useEffect(() => {
    getEnumOption();
  }, []);

  return (
    <div className="internal-data-manage" ref={ref}>
      <div className="query-box">
        <Form>
          <Row>
            <Col span={8}>
              <Form.Item label="发布日期：" {...defaultLayout} colon={false}>
                {getFieldDecorator("publishTime", {
                  initialValue: queryForm.publishTime,
                })(
                  <RangePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="类别：" {...defaultLayout} colon={false}>
                {getFieldDecorator("type", {
                  initialValue: queryForm.type,
                })(
                  <Select placeholder="请选择内部资料类型" allowClear>
                    {internalDataTypeList.length > 0 &&
                      internalDataTypeList.map((type) => {
                        return (
                          <Select.Option key={type.id} value={type.id}>
                            {type.name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={6} offset={2}>
              <Form.Item>
                {getFieldDecorator("selfPublish", {
                  initialValue: queryForm.selfPublish,
                })(
                  <Checkbox.Group>
                    <Checkbox value={true}>仅我发布的内容</Checkbox>
                  </Checkbox.Group>
                )}
              </Form.Item>
            </Col>
          </Row>
          <div className="center">
            <Button
              type="primary"
              className="search-button"
              size="small"
              loading={loading}
              onClick={() => {
                query();
              }}
            >
              查询
            </Button>
            <div className="line-box"></div>
            <Button
              type="primary"
              className="search-button"
              size="small"
              disabled={loading}
              onClick={() => {
                resert();
              }}
            >
              重置
            </Button>
          </div>
        </Form>
      </div>
      <div className="table">
        <div className="add-box">
          <Button
            type="primary"
            size="small"
            onClick={() => {
              openModal("add");
            }}
          >
            新增
          </Button>
        </div>
        <Table
          className="table-box"
          dataSource={internalTypeList}
          loading={loading}
          columns={tableConfig}
          pagination={false}
        />
        <div className="pagination-wrap">
          <Pagination
            showTotalInfo={true}
            current={parseInt(queryForm.pageIndex)}
            pageSize={parseInt(queryForm.pageSize)}
            total={total}
            showQuickJumper={true}
            showSizeChanger={true}
            onChange={changePage}
            pageSizeOptions={['10','20','50','100']}
            onShowSizeChange={changePage}
          />
        </div>
        <Modal
          title={modalConfig.title}
          visible={modalConfig.visible}
          onCancel={() => {
            closeModal();
          }}
          className="edit-modal-box"
          width={"80%"}
          footer={null}
          destroyOnClose={true}
        >
          <EditModal
            type={modalConfig.type}
            detail={modalConfig.detail}
            onCancel={closeModal}
            typeList={internalDataTypeList}
          />
        </Modal>
      </div>
    </div>
  );
});

export default Form.create()(InternalDataManage);
