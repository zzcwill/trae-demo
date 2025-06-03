import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { message, Button, Table, Pagination, Modal, Input } from "dpl-react";
import useGetList from "@/hooks/useGetList";
import { get, post } from "@/request/request";
import API from "@/request/api";
import { enumOptionType } from "@/const/index";
import { sortMap } from "@/const/config";
import FormFilter from "@/components/common/formFilter";
import CorrectDetail from "./components/correctDetail";
import qs from "qs";
import moment from "moment";
import {
  htmlToPlainText,
  clearImage,
} from "@/components/common/ueditor/htmlToPlainText";
import CommonOptions from "@/components/contentManage/commonOptions";
const defaultPageIndex = 1;
const defaultPageSize = 10;

// 查询组件中的特有组件对象
const otherComponentSConfig = {
  auditor: CommonOptions.Auditor,
  auditUser: CommonOptions.AuditUser,
};

/**
 * 纠错状态枚举
 */
const correctStateMap = [
  {
    id: "0",
    name: "未处理",
  },
  {
    id: "1",
    name: "已采纳",
  },
  {
    id: "2",
    name: "未采纳",
  },
];

/**
 * 弹窗默认配置
 */
const defaultModalConfig = {
  title: "纠错详情", // title名称
  visible: false, // 是否关闭
};

/**
 * 审核状态
 */
const CorrectState = (props) => {
  const { iconColor, text } = props;
  return (
    <div className="card-status">
      <span className="icon" style={{ background: iconColor }}></span>
      <p className="text">{text}</p>
    </div>
  );
};

function CorrectManage(props) {
  const [correctTypeMap, setCorrectTypeMap] = useState({}); // 纠错类型
  const [modalConfig, setModalConfig] = useState(defaultModalConfig); // 弹窗配置
  const [correctDetail, setCorrectDetail] = useState({}); // 弹窗配置
  const [sortedInfo, setSortedInfo] = useState(() => {
    const queryData = qs.parse(window.location.href.split("?")[1]);
    if (queryData.orderType) {
      return {
        columnKey: "createTime",
        order: sortMap[queryData.orderType],
      };
    } else {
      return null;
    }
  }); // 排序信息
  const [openLoading, setOpenLoading] = useState(false);
  /**
   * 默认参数
   */
  const [defaultFilter, setDefaultFilter] = useState(() => {
    const queryData = qs.parse(window.location.href.split("?")[1]);
    let data = {
      correctStatus: queryData.correctStatus || undefined, // 纠错状态（0：未处理；1：采纳；2：不采纳；）
      search: {
        correctReason: queryData.correctReason || "all", // 纠错原因（01：标准问歧义；02：错别字；03：答案不严谨；04：答案不正确；05：政策依据失效；06：其他；）
        keyword: queryData.keyword && queryData.keyword, // 纠错内容关键字
      },
      operate: {
        type: queryData.operatorType || "all", // 操作人类型（0：答案审核人；1：纠错发布人）
        value: undefined, // 操作人列表（逗号分隔）
      },
      // orderBy: item.orderBy || undefined, // 排序字段（create_time: 创建时间、last_modify_time: 最后修改时间）
      orderType: queryData.orderType || undefined, // 排序类型（ASC，DESC）
      pageIndex: queryData.pageIndex || undefined, // 页号
      pageSize: queryData.pageSize || undefined, // 页码
      type: 1,
    };
    data.correctCreateTime =
      queryData.correctCreateTimeBegin && queryData.correctCreateTimeEnd
        ? [
            moment(queryData.correctCreateTimeBegin),
            moment(queryData.correctCreateTimeEnd),
          ]
        : undefined;
    console.log(data);
    return data;
  });

  /**
   * 表单配置
   */
  const filterConfig = [
    {
      type: "select",
      key: "correctStatus",
      label: "纠错状态",
      options: correctStateMap,
      other: {
        placeholder: "请选择纠错状态",
      },
    },
    {
      type: "auditor",
      key: "search",
      label: "检索",
      span: 16,
      other: {
        col: 8,
        inputMaxLength: 100,
        maxLength: 3,
      },
    },
    {
      type: "datePickerRangePicker",
      key: "correctCreateTime",
      label: "发布时间",
    },
    {
      type: "auditUser",
      key: "operate",
      span: 16,
      label: "操作人",
      maxLength: 3,
      other: {
        col: 8,
        maxLength: 3,
        placeholder: "请输入",
      },
    },
  ];
  const formFilterRef = useRef(null);

  /**
   * 表格展示
   */
  const tableConfig = [
    {
      title: "标准问",
      dataIndex: "questionResume",
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <span
            className="detail-button"
            onClick={() => {
              openModal(record);
            }}
            style={{
              fontSize: 14,
              color: "#2c85d9",
              cursor: "pointer",
            }}
            title={text}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "错误类型",
      dataIndex: "correctReason",
      width: 150,
      render: (text, record, index) => {
        return (
          <div title={correctTypeMap[record.correctReason]}>
            {correctTypeMap[record.correctReason]}
          </div>
        );
      },
    },
    {
      title: "纠错详情",
      dataIndex: "correctDesc",
      ellipsis: true,
      width: 150,
      render(text, record, index) {
        const s = htmlToPlainText(clearImage(record.correctDesc));
        return <div title={s}>{s}</div>;
      },
    },
    {
      title: "操作",
      align: "center",
      width: 100,
      render: (text, record, index) => {
        return (
          <div>
            <span
              className="detail-button"
              onClick={() => {
                openModal(record);
              }}
            >
              查看详情
            </span>
          </div>
        );
      },
    },
    {
      title: "答案审核人",
      dataIndex: "auditorName",
      align: "center",
      width: 150,
      ellipsis: true,
    },
    {
      title: "纠错发布人",
      dataIndex: "creatorName",
      align: "center",
      width: 150,
      ellipsis: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      ellipsis: true,
      width: 120,
      sorter: true,
      render(text) {
        return <span title={text}>{text ? text.split(" ")[0] : ""}</span>;
      },
      sortOrder:
        sortedInfo && sortedInfo.columnKey === "createTime" && sortedInfo.order,
    },
    {
      title: "纠错状态",
      align: "center",
      width: 100,
      render: (text, record, index) => {
        // 不用switch是为了避免服务端传来的是init类型导致全匹配错误
        if (record.correctStatus == "2") {
          return <CorrectState iconColor={"#FF3A30"} text="未采纳" />;
        } else if (record.correctStatus == "1") {
          return <CorrectState iconColor={"#00CC66"} text="已采纳" />;
        } else {
          return <CorrectState iconColor={"#FF9500"} text="未处理" />;
        }
      },
    },
  ];

  /**
   * 查询参数处理
   * @param {Objec} params
   */
  const paramsFormat = (params) => {
    return Object.assign({}, params, {
      correctReason:
        params.correctReason === "all" ? undefined : params.correctReason,
    });
  };

  const { params, getList, loading, total, changeParams, list } = useGetList(
    API.GetCorrectList,
    null,
    paramsFormat,

  );

  /**
   * 获取纠错类型
   */
  const getCorrectType = async () => {
    const res = await get({
      url: API.getCommonOptions,
      params: {
        groupNames: enumOptionType.CORRECT_REASON, // CORRECT_REASON：纠错原因
      },
    });
    if (res.success) {
      const data = res.data;
      data.forEach((item) => {
        if (item.groupName === enumOptionType.CORRECT_REASON) {
          let obj = {};
          item.options.forEach((option) => {
            obj[option.id] = option.name;
          });
          setCorrectTypeMap(obj);
        }
      });
    } else {
      message.error(res.message);
    }
  };

  /**
   * 拼装参数
   * @param {Object} item
   * @param {Number} pageIndex
   * @param {Number} pageSize
   */
  const initParams = (item, pageIndex, pageSize) => {
    let obj = {
      correctStatus: item.correctStatus || undefined, // 纠错状态（0：未处理；1：采纳；2：不采纳；）
      correctReason:
        item.search &&
        (item.search.correctReason === "all"
          ? undefined
          : item.search.correctReason), // 纠错原因（01：标准问歧义；02：错别字；03：答案不严谨；04：答案不正确；05：政策依据失效；06：其他；）
      keyword: item.search && item.search.keyword && item.search.keyword.trim(), // 纠错内容关键字
      operatorType:
        item.operate &&
        (item.operate.type === "all" ? undefined : item.operate.type), // 操作人类型（0：答案审核人；1：纠错发布人）
      operatorList:
        item.operate && item.operate.value && item.operate.value.join(","), // 发布人
      correctCreateTimeBegin:
        item.correctCreateTime && item.correctCreateTime.length > 0
          ? item.correctCreateTime[0].format("YYYY-MM-DD")
          : undefined, // 问题创建时间起（仅日期）
      correctCreateTimeEnd:
        item.correctCreateTime && item.correctCreateTime.length > 0
          ? item.correctCreateTime[1].format("YYYY-MM-DD")
          : undefined, // 	问题创建时间止（仅日期）
      // orderBy: item.orderBy || undefined, // 排序字段（create_time: 创建时间、last_modify_time: 最后修改时间）
      orderType: item.orderType || undefined, // 排序类型（ASC，DESC）
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
   * 查询
   */
  const query = () => {
    const param = formFilterRef.current.getData();
    changeParams(initParams(param, defaultPageIndex, defaultPageSize));
    setSortedInfo(null);
  };

  /**
   * 重置搜索内容
   */
  const resert = () => {
    formFilterRef.current.clearData({
      type: 1,
      operate: {
        type: "all",
        value: undefined,
      },
    });
    changeParams({});
    setSortedInfo(null);
  };

  /**
   * 获取纠错详情
   */
  const getCorrectDetail = async (id) => {
    const res = await get({
      url: API.GetCorrectDetail,
      params: {
        id,
      },
    });
    if (res.success) {
      const data = res.data;
      setCorrectDetail(data);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 排序发生变化
   */
  const tableChange = (pagination, filters, sorter) => {
    let data = {};
    setSortedInfo(sorter);
    if (sorter.columnKey) {
      data = Object.assign({}, params, {
        orderBy: sorter.columnKey,
        orderType: sortMap[sorter.order.toLowerCase()],
      });
    } else {
      data = Object.assign(
        {
          orderType: undefined,
        },
        params
      );
    }
    changeParams(data);
  };

  /**
   * 分页
   */
  const changePage = (pageIndex, pageSize) => {
    const data = Object.assign({}, params, {
      pageIndex,
      pageSize,
    });
    changeParams(data);
  };

  /**chan
   * 关闭弹窗
   */
  const closeModal = (isSearch) => {
    setModalConfig(defaultModalConfig);
    if (isSearch) {
      getList();
    }
  };
  /**
   * 打开弹窗
   */
  const openModal = async (detail) => {
    setOpenLoading(false);
    setModalConfig(
      Object.assign({}, defaultModalConfig, {
        visible: true, // 是否关闭
      })
    );
    await getCorrectDetail(detail.id);
    setOpenLoading(true);
  };

  useEffect(() => {
    getCorrectType();
  }, []);

  return (
    <div className="correct-manage-box">
      <div className="query-box">
        <FormFilter
          config={filterConfig}
          ref={formFilterRef}
          defaultValue={defaultFilter}
          selfComponents={otherComponentSConfig}
        />
        <div className="right">
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
            清空条件
          </Button>
        </div>
      </div>
      <div className="table-box">
        <div className="total-box">
          共找到符合条件的问答数量:&nbsp;{total}&nbsp;条
        </div>
        <Table
          dataSource={list}
          loading={loading}
          columns={tableConfig}
          pagination={false}
          rowKey={"id"}
          onChange={tableChange}
        />
        {total > defaultPageSize && (
          <div className="pagination-box">
            <Pagination
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
        title={modalConfig.title}
        visible={modalConfig.visible}
        onCancel={() => {
          closeModal();
        }}
        className="edit-modal-box"
        width={513}
        footer={null}
        destroyOnClose={true}
      >
        {openLoading && (
          <CorrectDetail
            detail={correctDetail}
            onCancel={closeModal}
            correctTypeMap={correctTypeMap}
          />
        )}
      </Modal>
    </div>
  );
}

export default CorrectManage;
