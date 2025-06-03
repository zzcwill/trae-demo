import React, { useRef, useState, useEffect } from "react";
import "./index.scss";
import FormFilter from "@/components/common/formFilter";
import { Button, Table, message, Modal, Pagination, Checkbox } from "dpl-react";
import OperationBtn from "@/components/common/operationBtn/index";
import useGetList from "@/hooks/useGetList";
import Api from "@/request/api";
import { post, get } from "@/request/request";
import moment from "moment";
import qs from "qs";
import BatchUploadModal from "@/components/common/batchUploadModal";
import history from "@/history";
import getPermission from "@/utils/getPermission";
import { permissionCode } from "@/const";
import { sortMap } from "@/const/config";
import DimensionPopover from "@/components/common/dimensionPopover";
import User from "@/components/contentManage/user";
import ClassifyTree, {
  genCategoryDefaultValue,
} from "@/components/contentManage/classifyTree";
import DimensionSelect from "@/components/contentManage/dimensionSelect";
import CommonOptions from "@/components/contentManage/commonOptions";
const otherComponentSConfig = {
  category: ClassifyTree,
  region: DimensionSelect.Region,
  profession: DimensionSelect.Profession,
  grade: DimensionSelect.Grade,
  operator: CommonOptions.Operator,
  user: User,
};
const REGION_TYPE = "0"; //地域
const PROFESSION_TYPE = "1"; //行业
const GRADE_TYPE = "2"; //分级
const MyTable = React.memo(Table, (before, next) => {
  return (
    before.dataSource === next.dataSource && before.loading === next.loading
  );
});

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

function ContentManage(props) {
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
  const [questionIdList, setQuestionIdList] = useState([]);
  const genList = (list) => {
    const result = [];
    const idList = [];
    list.forEach((item, itemIndex) => {
      const genClassify = (item) => {
        const category = item.classify;
        let classifyName = category.name;
        let children = category.children;
        while (children && children.length) {
          classifyName = children[0].name;
          children = children[0].children;
        }
        item.classifyName = classifyName;
      };
      const getLabel = (list, type) => {
        let result = [];
        list.map((item) => {
          if (item.type == type) {
            result = item.list;
          }
        });
        return result;
      };
      genClassify(item);
      idList.push(item.id);
      item.replyList.forEach((reply, replyIndex) => {
        if (reply.dimensionList.length === 0) {
          console.log(item, reply);
        }
        reply.regionLabel = getLabel(reply.dimensionList, REGION_TYPE);
        reply.gradeLabel = getLabel(reply.dimensionList, GRADE_TYPE);
        reply.professionLabel = getLabel(reply.dimensionList, PROFESSION_TYPE);
        result.push({
          questionId: item.id,
          resume: item.resume,
          visitNum: item.visitNum,
          classifyName: item.classifyName,
          _isStart: replyIndex === 0,
          _listLength: item.replyList.length,
          ...reply,
        });
      });
    });
    setQuestionIdList(idList);
    return result;
  };

  const { params, getList, loading, total, changeParams, list } = useGetList(
    Api.getQuestionList,
    genList
  );

  const [defaultFilter, setDefaultFilter] = useState(() => {
    const genString = (str) => {
      return str ? str.split(",") : undefined;
    };
    const data = qs.parse(window.location.href.split("?")[1]);
    data.gradeCodeList = genString(data.gradeCodeList);
    data.labelIdList = genString(data.labelIdList);
    data.professionCodeList = genString(data.professionCodeList);
    data.regionCodeList = genString(data.regionCodeList);
    data.replyOperatorList = genString(data.replyOperatorList);
    data.questionOperatorList = genString(data.questionOperatorList);
    try {
      data.publishTimeBegin = data.publishTimeBegin
        ? moment(data.publishTimeBegin)
        : undefined;
      data.publishTimeEnd = data.publishTimeEnd
        ? moment(data.publishTimeEnd)
        : undefined;
      data.publicTime = [data.publishTimeBegin, data.publishTimeEnd];
    } catch (e) {}
    return data;
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [batchUploadVisible, setBatchUploadVisible] = useState(false);
  const [canBatchDelete, setCanBatchDelete] = useState(false);

  // 查询配置
  const filterConfig = [
    {
      type: "input",
      key: "resume",
      label: "标准问",
      other: {
        placeholder: "请输入标准问",
        allowClear: true,
      },
    },
    {
      type: "input",
      key: "description",
      label: "用户问",
      other: {
        placeholder: "请输入用户问",
        allowClear: true,
      },
    },
    {
      type: "input",
      key: "reply",
      label: "答案",
      other: {
        placeholder: "请输入答案",
        allowClear: true,
      },
    },

    {
      type: "category",
      key: "classifyId",
      label: "目录",
      initialValue: genCategoryDefaultValue(defaultFilter.classifyId),
      other: {
        placeholder: "请选择目录",
      },
    },
    {
      type: "region",
      key: "regionCodeList",
      label: "区域",
      maxLength: 3,
      other: {
        placeholder: "请选择区域",
      },
    },
    {
      type: "profession",
      key: "professionCodeList",
      label: "行业",
      maxLength: 3,
      other: {
        placeholder: "请选择行业",
      },
    },
    {
      type: "grade",
      key: "gradeCodeList",
      label: "问题分级",
      maxLength: 3,
      other: {
        placeholder: "请选择问题分级",
      },
    },
    {
      type: "operator",
      key: "operator",
      label: "操作人",
      span: 16,
      other: {
        placeholder: "请选择操作人",
        maxLength: 3,
      },
    },
    {
      type: "input",
      key: "questionIdList",
      label: "问答ID",
      other: {
        placeholder: "ID之间请用英文逗号分隔",
        allowClear: true,
      },
    },
    {
      type: "datePickerRangePicker",
      key: "publicTime",
      label: "发布时间",
    },
  ];
  const formFilterRef = useRef(null);
  // 操作包含内容
  const operation = [
    {
      name: "查看详情",
      callback: async (text, record, index) => {
        let url =
          window.location.href.split("#")[0] +
          "#/contentManage/qaManage/taxLib/qaDetail?id=" +
          record.questionId +
          "&replyId=" +
          record.id;
        window.open(url);
      },
    },
    {
      name: "编辑",
      callback: (text, record, index) => {
        let url =
          window.location.href.split("#")[0] +
          "#/contentManage/qaManage/taxLib/qaAdd?id=" +
          record.questionId +
          "&replyId=" +
          record.id;
        window.open(url);
      },
    },
    {
      name: "删除",
      callback: (text, record, index) => {
        deleteHandler(record.id);
      },
    },
  ];

  // 表格展示内容
  const columns = [
    {
      title: (
        <Checkbox
          checked={
            questionIdList.length > 0 &&
            selectedRowKeys.length === questionIdList.length
          }
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys([...questionIdList]);
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      ),
      width: 42,
      dataIndex: "id",
      fixed: "left",
      render(text, record, index) {
        const obj = {
          children: (
            <Checkbox
              checked={selectedRowKeys.indexOf(record.questionId) >= 0}
              onChange={(e) => {
                const checked = e.target.checked;
                const index = selectedRowKeys.indexOf(record.questionId);
                if (checked) {
                  if (index < 0) {
                    setSelectedRowKeys([...selectedRowKeys, record.questionId]);
                  }
                } else {
                  if (index >= 0) {
                    selectedRowKeys.splice(index, 1);
                    setSelectedRowKeys([...selectedRowKeys]);
                  }
                }
              }}
            />
          ),
          props: {},
        };
        if (record._isStart) {
          obj.props.rowSpan = record._listLength;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: "标准问",
      dataIndex: "resume",
      width: 320,
      ellipsis: true,
      fixed: "left",
      render: (text, record, index) => {
        const obj = {
          children: (
            <span
              title={text}
              style={{ cursor: "pointer", color: "#2C85D9" }}
              onClick={() => {
                let url =
                  window.location.href.split("#")[0] +
                  "#/contentManage/qaManage/taxLib/qaDetail?id=" +
                  record.questionId;
                window.open(url);
              }}
            >
              {text}
            </span>
          ),
          props: {},
        };
        if (record._isStart) {
          obj.props.rowSpan = record._listLength;
          obj.props.style = { borderRight: "1px solid #d1d3d8" };
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: "区域",
      dataIndex: "regionLabel",
      ellipsis: true,
      align: "center",
      width: 120,
      fixed: "left",
      render(text, record, index) {
        return (
          <DimensionPopover type={REGION_TYPE} list={text}>
            {text.length > 1 ? (
              <span title="">{`${text.length}地区`}</span>
            ) : (
              <span title={text[0] && text[0].name}>
                {text[0] && text[0].name}
              </span>
            )}
          </DimensionPopover>
        );
      },
    },
    {
      title: "行业",
      dataIndex: "professionLabel",
      ellipsis: true,
      align: "center",
      width: 120,
      fixed: "left",
      render(text, record, index) {
        return (
          <DimensionPopover type={PROFESSION_TYPE} list={text}>
            {text.length > 1 ? (
              <span title="">{`${text.length}行业`}</span>
            ) : (
              <span title={text[0] && text[0].name}>
                {text[0] && text[0].name}
              </span>
            )}
          </DimensionPopover>
        );
      },
    },
    {
      title: "问题分级",
      dataIndex: "gradeLabel",
      ellipsis: true,
      align: "center",
      width: 150,
      fixed: "left",
      render(text, record, index) {
        return (
          <DimensionPopover type={GRADE_TYPE} list={text}>
            {text.length > 1 ? (
              <span title="">{`${text.length}分级`}</span>
            ) : (
              <span title={text[0] && text[0].name}>
                {text[0] && text[0].name}
              </span>
            )}
          </DimensionPopover>
        );
      },
    },
    {
      title: "操作",
      width: 200,
      fixed: "left",
      render: (text, record, index) => {
        return (
          <OperationBtn
            data={operation}
            text={text}
            record={record}
            index={index}
          />
        );
      },
    },

    {
      title: "目录",
      dataIndex: "classifyName",
      ellipsis: true,
      align: "center",
      width: 150,
    },
    {
      title: "创建人",
      dataIndex: "creatorName",
      ellipsis: true,
      width: 150,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      ellipsis: true,
      width: 200,
    },
    {
      title: "最新编辑人",
      dataIndex: "lastModifierName",
      ellipsis: true,
      width: 150,
    },
    {
      title: "编辑时间",
      dataIndex: "lastModifyTime",
      ellipsis: true,
      width: 200,
    },
    {
      title: "审核状态",
      dataIndex: "replyNum",
      ellipsis: true,
      align: "center",
      width: 100,
      render: (text, record, index) => {
        // 不用switch是为了避免服务端传来的是init类型导致全匹配错误
        if (record.auditStatus == "2") {
          return <CorrectState iconColor={"#FF3A30"} text="审核未通过" />;
        } else if (record.auditStatus == "1") {
          return <CorrectState iconColor={"#00CC66"} text="审核通过" />;
        } else {
          return <CorrectState iconColor={"#FF9500"} text="未审核" />;
        }
      },
    },
    {
      title: "浏览总量",
      dataIndex: "visitNum",
      width: 100,
      align: "center",
      ellipsis: true,
    },
    {
      title: "纠错数量",
      dataIndex: "correctNum",
      ellipsis: true,
      align: "center",
      width: 100,
    },
  ];

  // 查询过滤
  const searchHandler = () => {
    const genArr = (item) => {
      return Array.isArray(item) ? item.join(",") : undefined;
    };
    let data = formFilterRef.current.getData();
    let publishTimeBegin = Array.isArray(data.publicTime)
      ? data.publicTime[0]
      : undefined;
    let publishTimeEnd = Array.isArray(data.publicTime)
      ? data.publicTime[1]
      : undefined;
    data.classifyId = data.classifyId
      ? data.classifyId[data.classifyId.length - 1]
      : undefined;
    data.gradeCodeList = genArr(data.gradeCodeList);
    data.labelIdList = genArr(data.labelIdList);
    data.professionCodeList = genArr(data.professionCodeList);
    data.regionCodeList = genArr(data.regionCodeList);
    data.replyOperatorList = genArr(data.replyOperatorList);
    data.questionOperatorList = genArr(data.questionOperatorList);
    data.operatorType = data.operator && data.operator.type;
    data.operatorList = genArr(data.operator && data.operator.value);
    data.resume = data.resume ? data.resume.trim() : undefined;
    data.reply = data.reply ? data.reply.trim() : undefined;
    data.description = data.description ? data.description.trim() : undefined;
    try {
      data.publishTimeBegin = publishTimeBegin
        ? publishTimeBegin.format("YYYY-MM-DD")
        : undefined;
      data.publishTimeEnd = publishTimeEnd
        ? publishTimeEnd.format("YYYY-MM-DD")
        : undefined;
      delete data.publicTime;
      delete data.operator;
    } catch (e) {
      console.log("时间解析错误");
    }
    setSelectedRowKeys([]);
    setSortedInfo(null); // 清空排序
    changeParams(data);
  };
  // 清空
  const clearHandler = () => {
    //清楚条件按钮
    formFilterRef.current.clearData();
    setSelectedRowKeys([]);
    setSortedInfo(null);
    changeParams({});
  };
  // 页数改变
  const pageChangeHandler = (pageIndex) => {
    setSelectedRowKeys([]);
    changeParams(Object.assign({}, params, { pageIndex }));
  };

  // 批量删除方法
  const deleteHandler = (ids) => {
    Modal.confirm({
      title: "正在进行删除问答的操作",
      content: "删除后的问答不可恢复，你还要继续吗？",
      onOk: async () => {
        const data = await post({
          url: Api.replyDelete,
          data: { id: ids },
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

  // 批量删除
  const batchDeleteHandler = async (ids) => {
    if (selectedRowKeys.length === 0) {
      message.error("请至少选择一条问答");
      return;
    }
    Modal.confirm({
      title: "正在进行删除问答的操作",
      content: "删除后的问答不可恢复，你还要继续吗？",
      onOk: async () => {
        const data = await post({
          url: Api.batchDeleteQuestion,
          data: { idList: selectedRowKeys },
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
  // 表格排序
  const sortChange = (pagination, filters, sorter) => {
    let result = {
      pageIndex: 1,
      orderType: sorter.order == "ascend" ? "ASC" : "DESC",
    };
    setSortedInfo(sorter);
    switch (sorter.field) {
      case "creatorName":
        result.orderBy = "CREATOR";
        break;
      case "createTime":
        result.orderBy = "CREATE_TIME";
        break;
      case "lastModifierName":
        result.orderBy = "LAST_MODIFIER";
        break;
      case "lastModifyTime":
        result.orderBy = "LAST_MODIFY_TIME";
        break;
      default:
        break;
    }
    if (!sorter.field) {
      delete params.orderBy;
      delete params.orderType;
      delete result.orderType;
    }
    changeParams(Object.assign(params, result));
  };

  // 新增按钮跳转新增页面
  const newContentHandler = () => {
    let url =
      window.location.href.split("#")[0] +
      "#/contentManage/qaManage/taxLib/qaAdd";
    window.open(url);
  };

  useEffect(() => {
    getPermission().then((data) => {
      data.forEach((item) => {
        // if (item.permissionCode === permissionCode.askone_import) {
        //   setCanUpload(true);
        // }
        if (item.permissionCode === permissionCode.batch_delete_question) {
          setCanBatchDelete(true);
        }
      });
    });
  }, []);

  return (
    <div className="content-manage">
      <div className="filter-box">
        <FormFilter
          config={filterConfig}
          ref={formFilterRef}
          defaultValue={defaultFilter}
          selfComponents={otherComponentSConfig}
        />
        <div className="btn-group">
          <Button type="primary" onClick={searchHandler}>
            查询
          </Button>
          <Button style={{ marginLeft: 10 }} onClick={clearHandler}>
            清空条件
          </Button>
        </div>
      </div>
      <div className="table-box">
        <div className="table-btn">
          <Button type="primary" onClick={newContentHandler}>
            新增问答
          </Button>
          <Button
            type="primary-bordered"
            style={{ marginLeft: 8 }}
            onClick={() => {
              setBatchUploadVisible(true);
            }}
          >
            批量导入
          </Button>
          <Button
            type="primary-bordered"
            style={{ marginLeft: 8 }}
            onClick={batchDeleteHandler}
          >
            批量删除
          </Button>
          <div className="total-box">
            共找到符合条件的问答数量:&nbsp;{total}&nbsp;条
          </div>
        </div>
        <Table
          dataSource={list}
          columns={columns}
          rowKey={"id"}
          scroll={{ x: 2107 }}
          pagination={false}
          loading={loading}
          onChange={sortChange}
        />
        {total > 10 && (
          <div className="pagination-wrap">
            <Pagination
              {...{
                total: total,
                current: parseInt(params.pageIndex),
                pageSize: parseInt(params.pageSize),
                onChange: pageChangeHandler,
                showQuickJumper: true,
                className: "pagination-overwrite",
              }}
            />
          </div>
        )}
      </div>

      <BatchUploadModal
        visible={batchUploadVisible}
        onCancel={() => {
          setBatchUploadVisible(false);
        }}
        onGoMain={() => {
          setBatchUploadVisible(false);
          changeParams({}, true);
        }}
      />
    </div>
  );
}

export default ContentManage;
