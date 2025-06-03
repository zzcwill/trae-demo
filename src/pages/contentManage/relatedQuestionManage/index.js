import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import qs from "qs";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/components/common/hooks/useGetList";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import {
  message,
  Button,
  Table,
  Pagination,
  Modal,
  Checkbox,
  Icon,
} from "dpl-react";
import { olhelpEnumOptionType } from "@/const/config";
import { addAllOption } from "@/utils";
import EditModal from "./components/editModal";
import SystemAndFunction from "./components/systemAndFunction";
import SelectAll from "./components/selectAll";
import InputNumber from "@/components/common/inputNumber";
// 默认页码
const defaultPageIndex = 1;
// 默认页面大小
const defaultPageSize = 10;

const defaultEditModal = {
  isShow: false,
  name: "新增",
  type: "add",
  id: undefined, // id
  data: {},
};
const otherComponents = {
  systemAndFunction: SystemAndFunction,
  selectAll: SelectAll,
};
// 默认优先级参数
const defaultPriorityObj = {
  priority: 0, // 优先级
  questionId: undefined, // 问题id
};
export default function RelatedQuestionManage(props) {
  const [systemList, setSystemList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [usertypeList, setUsertypeList] = useState([]);
  const [locationMap, setLocationMap] = useState({}); // locationMap
  const [brandMap, setBrandMap] = useState({}); // brandMap
  const [usertypeMap, setUsertypeMap] = useState({}); // usertypeMap
  const [systemMap, setSystemMap] = useState({}); // systemMap
  const [editModal, setEditModal] = useState(defaultEditModal);
  const [priorityObj, setPriorityObj] = useState(defaultPriorityObj);
  const formFilterRef = useRef(null); // formRef
  const inputRef = useRef(null); // formRef
  const [isAvailable, setIsAvailable] = useState([]); // 查询条件
  const [sourcePriorityObj, setSourcePriorityObj] = useState(
    defaultPriorityObj
  ); // 原始值
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
  const getQuestionList = (params) => {
    return get({
      url: Api.getQuestionList,
      params,
    });
  };

  // 封装的获取列表自定义hooks
  const { params, getList, loading, total, changeParams, list } = useGetList({
    queryFunc: getQuestionList,
    defaultParam,
    isUseQueryString: false,
    isSearchRightNow: true,
  });
  

  // 修改优先级
  const priorityChange = (value) => {
    const sendData = Object.assign({}, priorityObj, {
      priority: value,
    });
    setPriorityObj(sendData);
  };
  // 双击方法
  const dblclickFunc = (obj) => {
    const sendData = {
      priority: obj.priority,
      questionId: obj.id,
    };
    setPriorityObj(sendData);
    setSourcePriorityObj(sendData);
    setTimeout(() => {
      inputRef.current.input.focus();
    }, 0);
  };

  /**
   * 失去焦点
   */
  const priorityOnBlur = () => {
    if (!priorityObj.priority) {
      setPriorityObj(defaultPriorityObj);
      return;
    }
    if (priorityObj.priority === sourcePriorityObj.priority) {
      setPriorityObj(defaultPriorityObj);
      return;
    }
    let sendData = Object.assign({}, priorityObj);
    if (/^0*\d/.test(priorityObj.priority.toString())) {
      let num = priorityObj.priority.toString().replace(/^0*/, "");
      if (!num) {
        sendData.priority = 1;
      } else {
        sendData.priority = parseInt(num);
      }
    }
    updatePriority(sendData.priority, sendData.questionId);
    setPriorityObj(defaultPriorityObj);
  };

  const updatePriority = async (priority, questionId) => {
    const res = await post({
      url: Api.postUpdateQuestionPriority,
      data: {
        questionId,
        priority,
      },
    });
    if (res.success) {
      message.success("修改优先级成功！");
      getList();
    } else {
      message.error("优先级修改失败！");
    }
  };

  // 查询表单
  const filterConfig = [
    {
      type: "systemAndFunction", // string 组件类型 必填
      key: "systemFucntion", // string 字段名称 必填
      labelWidth: "100px", // number label的width值 非必填 默认为100
      span: 16,
      initialValue: {
        systemId: undefined,
        functionIdList: [],
      },
      other: {
        placeholder: "请选择入口类型",
        labelWidth: 100,
        systemList,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "selectAll", // string 组件类型 必填
      key: "locationList", // string 字段名称 必填
      label: "地区维度", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      options: addAllOption(locationList),
      initialValue: ["all"], // any 默认值 该情况
      other: {
        placeholder: "请选择地区维度",
        mode: "multiple",
        maxTagCount: 1,
        maxTagTextLength: 10,
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "selectAll", // string 组件类型 必填
      key: "brandList", // string 字段名称 必填
      label: "产品维度", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      initialValue: ["all"], // any 默认值 该情况
      options: addAllOption(brandList),
      other: {
        placeholder: "请选择产品维度",
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
        mode: "multiple",
        maxTagCount: 1,
        maxTagTextLength: 10,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "selectAll", // string 组件类型 必填
      key: "usertypeList", // string 字段名称 必填
      label: "会员等级", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      initialValue: ["all"], // any 默认值 该情况
      options: addAllOption(usertypeList),
      other: {
        placeholder: "请选择会员等级",
        mode: "multiple",
        maxTagCount: 1,
        maxTagTextLength: 10,
        optionFilterProp: "children",
        filterOption: (input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      }, // 组件中的其他可取字段内容
    },
    {
      type: "input", // string 组件类型 必填
      key: "question", // string 字段名称 必填
      label: "标准问", // string label名称 非必填 默认为空
      labelWidth: "100px", // number label的width值 非必填 默认为100
      other: {
        placeholder: "请输入内容",
        allowClear: true,
        maxlength: "200",
      }, // 组件中的其他可取字段内容
    },
  ];
  // 表格
  const tableConfig = [
    {
      title: "地区维度",
      width: 100,
      render: (text, record, index) => {
        return <span>{locationMap[record.location]}</span>;
      },
    },
    {
      title: "功能",
      width: 150,
      render: (text, record, index) => {
        return (
          <>
            <span>{systemMap[record.systemId]}</span>
            <br />
            <span>{record.functionName}</span>
          </>
        );
      },
    },
    {
      title: "标准问",
      width: 150,
      dataIndex: "question",
      render: (text, record, index) => {
        return (
          <>
            {record.available === "N" && (
              <Icon type="circle-warn" style={{ color: "#ff9090" }} />
            )}
            <span>{record.question}</span>
          </>
        );
      },
    },
    {
      title: "产品维度",
      width: 100,
      render: (text, record, index) => {
        return <span>{brandMap[record.brand]}</span>;
      },
    },
    {
      title: "会员等级",
      width: 100,
      render: (text, record, index) => {
        return <span>{usertypeMap[record.usertype]}</span>;
      },
    },
    {
      title: "最后修改",
      width: 150,
      dataIndex: "lastModifyTime",
      render: (text, record, index) => {
        return (
          <>
            <span>{record.lastModifyUserName}</span>
            <br />
            <span>{record.lastModifyTime}</span>
          </>
        );
      },
    },
    {
      title: "优先级",
      width: 150,
      dataIndex: "priority",
      align: "center",
      render: (text, record, index) => {
        if (record.id === priorityObj.questionId) {
          return (
            <InputNumber
              ref={inputRef}
              value={priorityObj.priority}
              onChange={(value) => {
                priorityChange(value);
              }}
              maxLength={4}
              onBlur={priorityOnBlur}
            />
          );
        } else {
          return (
            <div
              className="table-priority-box"
              onDoubleClick={() => {
                dblclickFunc(record);
              }}
            >
              {record.priority}
            </div>
          );
        }
      },
    },
    {
      title: "操作",
      width: 150,
      render: (text, record, index) => {
        return (
          <div className="table-option-box">
            <span
              onClick={() => {
                editQuestionConfig(record);
              }}
              className="option-button"
            >
              修改
            </span>
            <span
              onClick={() => {
                deleteQuestionConfigButton(record.id);
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

  // 编辑
  const editQuestionConfig = (data) => {
    if (data) {
      setEditModal({
        isShow: true,
        name: "修改",
        type: "edit",
        id: data.id,
        data,
      });
      return;
    }
    setEditModal({
      isShow: true,
      name: "新增",
      type: "add",
      id: undefined,
      data: {},
    });
  };

  // 获取维度、地区、用户等级列表
  const getWdList = async () => {
    const res = await get({
      url: Api.getWdList,
    });
    if (res.success) {
      const data = res.data;
      let loactionObj = {};
      let brandObj = {};
      let usertypeObj = {};
      data.location &&
        data.location.forEach((item) => {
          loactionObj[item.id] = item.name;
        });
      data.brand &&
        data.brand.forEach((item) => {
          brandObj[item.id] = item.name;
        });
      data.usertype &&
        data.usertype.forEach((item) => {
          usertypeObj[item.id] = item.name;
        });
      loactionObj[""] = "全部";
      brandObj[""] = "全部";
      usertypeObj[""] = "全部";
      setLocationMap(loactionObj);
      setBrandMap(brandObj);
      setUsertypeMap(usertypeObj);
      setLocationList([].concat(data.location));
      setBrandList([].concat(data.brand));
      setUsertypeList([].concat(data.usertype));
    } else {
      message.error(res.message);
    }
  };

  // 获取系统列表
  const getSystemList = async () => {
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: olhelpEnumOptionType.QuestionSystem,
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        switch (item.groupName) {
          // 入口类型
          case olhelpEnumOptionType.QuestionSystem:
            let systemObj = {};
            item.options.forEach((item) => {
              systemObj[item.id] = item.name;
            });
            setSystemMap(systemObj);
            setSystemList(item.options);
            break;
          default:
            break;
        }
      });
    } else {
      message.error(res.message);
    }
  };

  //删除
  const deleteQuestionConfigButton = (id) => {
    Modal.confirm({
      title: "是否确定要删除",
      okText: "确认",
      cancelText: "取消",
      wait: true,
      onOk: () => {
        return new Promise((resolve) => {
          try {
            deleteQuestion(id);
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
  // 删除方法
  const deleteQuestion = async (id) => {
    const res = await post({
      url: Api.postDeleteQuestion,
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
   * 关闭批量设置弹窗
   */
  const closeBtachModal = (isRefresh) => {
    setEditModal(defaultEditModal);
    if (isRefresh) {
      getList();
    }
  };

  // 无法匹配到答案的checkbox改变
  const isAvailableChange = (value) => {
    setIsAvailable(value);
  };
  // 格式化
  const formatParams = (data) => {
    let sendData = {
      systemId:
        data.systemFucntion.systemId === "all"
          ? undefined
          : data.systemFucntion.systemId,
      functionIdList:
        data.systemFucntion.functionIdList &&
        data.systemFucntion.functionIdList.length > 0
          ? data.systemFucntion.functionIdList.join(",")
          : undefined,
      locationList:
        data.locationList && data.locationList.length > 0
          ? data.locationList.join(",")
          : undefined,
      brandList:
        data.brandList && data.brandList.length > 0
          ? data.brandList.join(",")
          : undefined,
      usertypeList:
        data.usertypeList && data.usertypeList.length > 0
          ? data.usertypeList.join(",")
          : undefined,
      question: (data.question && data.question.trim()) || undefined,
      available: isAvailable[0] === "Y" ? "N" : undefined,
      pageIndex: defaultPageIndex,
      pageSize: defaultPageSize,
    };
    if (sendData.locationList === "all") {
      sendData.locationList = undefined;
    }
    if (sendData.brandList === "all") {
      sendData.brandList = undefined;
    }
    if (sendData.usertypeList === "all") {
      sendData.usertypeList = undefined;
    }
    return sendData;
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
      systemFucntion: {
        systemId: undefined,
        functionIdList: [],
      },
      locationList: ["all"],
      usertypeList: ["all"],
      brandList: ["all"],
    });
    setIsAvailable([]);
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

  const initFunc = () => {
    getSystemList();
    getWdList();
  };

  useEffect(() => {
    initFunc();
  }, []);

  return (
    <div className="related-question-manage-box">
      <div className="search-box">
        <FormFilter
          config={filterConfig}
          ref={formFilterRef}
          selfComponents={otherComponents}
        />
        <div className="extral-box">
          <Checkbox.Group value={isAvailable} onChange={isAvailableChange}>
            <Checkbox value={"Y"}>无法匹配到答案</Checkbox>
          </Checkbox.Group>
        </div>
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
          <Button type="primary" onClick={() => editQuestionConfig()}>
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
          closeBtachModal();
        }}
      >
        <EditModal
          systemList={systemList}
          locationList={addAllOption(locationList)}
          brandList={addAllOption(brandList)}
          usertypeList={addAllOption(usertypeList)}
          formData={editModal.data}
          config={editModal}
          onCancel={closeBtachModal}
        />
      </Modal>
    </div>
  );
}
