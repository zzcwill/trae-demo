import React, { useRef, useState, useEffect, useMemo } from "react";
import "./index.scss";
import FormFilter from "@/components/common/formFilter";
import useGetList from "@/hooks/useGetList";
import {
  Button,
  Checkbox,
  message,
  Modal,
  Pagination,
  Loading
} from "dpl-react";
import Api from "@/request/api";
import { post, get } from "@/request/request";
import qs from "qs";
import moment from "moment";
import { formatList } from "./utils/index";
import DetailQuestion from "./component/detailQuestion";
import BackTop from "@/components/common/backTop";
import BatchExamineModal from "./component/batchExamineModal";
import getPermissionList from "@/utils/getPermission";
import { permissionCode } from "@/const";
import noData_icon from "./img/error-page.png";
import DetailAnswer from "./component/detailAnswer";
import User from "@/components/contentManage/user";
import ClassifyTree, {
  genCategoryDefaultValue
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
  audit: CommonOptions.Audit
};

const QuestionComponent = React.memo(
  ({ question, onAudit }) => {
    return (
      <div className="detail-box">
        <DetailQuestion question={question} />
        {question.replyList.length > 0 &&
          question.replyList.map(reply => {
            return (
              <DetailAnswer
                question={question}
                answer={reply}
                onAudit={onAudit}
                key={reply.id}
              ></DetailAnswer>
            );
          })}
      </div>
    );
  },
  (prev, next) => {
    return prev.question === next.question;
  }
);

const ModalComponents = React.memo(BatchExamineModal, (prev, next) => {
  return prev.data === next.data;
});

function ExamineManage(props) {
  /**
   * 默认参数
   */
  const [defaultFilter, setDefaultFilter] = useState(() => {
    const genString = str => {
      return str ? str.split(",") : undefined;
    };
    const data = qs.parse(window.location.href.split("?")[1]);
    data.gradeCodeList = genString(data.gradeCodeList);
    data.labelIdList = genString(data.labelIdList);
    data.professionCodeList = genString(data.professionCodeList);
    data.regionCodeList = genString(data.regionCodeList);
    data.audit = data.auditStatus ? [].concat(data.auditStatus) : undefined;
    data.unpassReason && data.audit.push(data.unpassReason);
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
  const filterConfig = [
    {
      type: "input",
      key: "resume",
      label: "标准问",
      other: {
        placeholder: "检索标准问内容",
        allowClear: true
      }
    },
    {
      type: "input",
      key: "description",
      label: "用户问",
      other: {
        placeholder: "检索用户问内容",
        allowClear: true
      }
    },
    {
      type: "input",
      key: "reply",
      label: "答案",
      other: {
        placeholder: "检索回答内容",
        allowClear: true
      }
    },
    {
      type: "category",
      key: "classifyId",
      label: "目录",
      initialValue: genCategoryDefaultValue(defaultFilter.classifyId),
      other: {
        placeholder: "请选择目录"
      }
    },
    {
      type: "region",
      key: "regionCodeList",
      label: "区域",
      maxLength: 3,
      other: {
        placeholder: "请选择区域",
      }
    },
    {
      type: "profession",
      key: "professionCodeList",
      label: "行业",
      maxLength: 3,
      other: {
        placeholder: "请选择行业",
        
      }
    },
    {
      type: "grade",
      key: "gradeCodeList",
      label: "问题分级",
      maxLength: 3,
      other: {
        placeholder: "请选择问题分级",
      }
    },
    {
      type: "operator",
      key: "operator",
      label: "操作人",
      span: 16,
      maxLength: 3,
      other: {
        placeholder: "请选择操作人",
        maxLength: 3
      }
    },
    {
      type: "audit",
      key: "audit",
      label: "审核状态",
      other: {
        placeholder: "请选择审核状态"
      }
    },
    {
      type: "input",
      key: "questionIdList",
      label: "问答ID",
      other: {
        placeholder: "ID之间请用英文逗号分隔",
        allowClear: true
      }
    },
    {
      type: "datePickerRangePicker",
      key: "publicTime",
      label: "发布时间"
    }
  ];
  const { params, getList, loading, total, changeParams, list } = useGetList(
    Api.getAuditList,
    formatList
  );

  const formFilterRef = useRef(null);
  const bodyRef = useRef(null);

  const [selectAll, setSelectAll] = useState({
    indeterminate: false,
    checkAll: false
  }); // 是否全选

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选择列表
  const [selectedRows, setSelectedRows] = useState({}); // 选中对象
  const [isShowBatchExamine, setIsShowBatchExamine] = useState(false); //是否展示批量删除弹窗
  const [defaultCheckList, setDefaultCheckList] = useState([]); // 选择列表
  const [canExamine, setCanExamine] = useState(false); // 是否顯示審核

  /**
   * 查询操作
   */
  const searchHandler = () => {
    const genArr = item => {
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
    data.professionCodeList = genArr(data.professionCodeList);
    data.regionCodeList = genArr(data.regionCodeList);
    data.auditStatus = Array.isArray(data.audit) ? data.audit[0] : undefined;
    data.unpassReason = Array.isArray(data.audit) ? data.audit[1] : undefined;
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
      delete data.audit;
      delete data.operator;
    } catch (e) {
      console.log("时间解析错误");
    }
    setSelectAll({
      indeterminate: false,
      checkAll: false
    });
    setSelectedRowKeys([]);
    changeParams(data);
  };

  const clearHandler = () => {
    //清楚条件按钮
    formFilterRef.current.clearData();
    setSelectedRowKeys([]);
    changeParams({});
  };

  /**
   * 批量审核
   */
  const batchExamine = () => {
    if (selectedRowKeys.length > 0) {
      setIsShowBatchExamine(true);
    } else {
      message.warning("请至少选择一条数据进行批量审核！");
    }
  };

  /**
   * 全选
   */
  const selectAllChange = e => {
    const checked = e.target.checked;
    if (checked) {
      let result = {};
      let idList = [];
      list.forEach(item => {
        result[item.questionId] = item;
        idList.push(item.questionId);
      });
      setSelectedRowKeys(idList);
      setSelectedRows(result);
    } else {
      setSelectedRowKeys([]);
      setSelectedRows({});
    }
    setSelectAll({
      indeterminate: false,
      checkAll: checked
    });
  };

  /**
   * 单个checkBox点击
   */
  const checkChange = (e, record) => {
    const checked = e.target.checked;
    const index = selectedRowKeys.indexOf(record.questionId);
    if (checked) {
      if (index < 0) {
        let list = [...selectedRowKeys, record.questionId];
        setSelectedRowKeys(list);
        let obj = Object.assign({}, selectedRows);
        obj[record.questionId] = Object.assign({}, record);
        setSelectedRows(obj);
        setSelectAll({
          indeterminate: !!list.length && list.length < defaultCheckList.length,
          checkAll: list.length === defaultCheckList.length
        });
      }
    } else {
      if (index >= 0) {
        selectedRowKeys.splice(index, 1);
        setSelectedRowKeys([...selectedRowKeys]);
        let obj = Object.assign({}, selectedRows);
        delete obj[record.questionId];
        setSelectedRows(obj);
        setSelectAll({
          indeterminate:
            !!selectedRowKeys.length &&
            selectedRowKeys.length < defaultCheckList.length,
          checkAll: selectedRowKeys.length === defaultCheckList.length
        });
      }
    }
  };

  /**
   * 关闭弹窗
   */
  const closeModel = isRefresh => {
    setIsShowBatchExamine(false);
    if (isRefresh) {
      setSelectAll({
        indeterminate: false,
        checkAll: false
      });
      setSelectedRowKeys([]);
      setSelectedRows({});
      getList();
    }
  };

  /**
   * 分页
   * @param {Number} pageIndex
   */
  const pageChangeHandler = pageIndex => {
    setSelectedRowKeys([]);
    setSelectedRows({});
    setSelectAll({
      indeterminate: false,
      checkAll: false
    });
    changeParams(Object.assign({}, params, { pageIndex }));
  };

  useEffect(() => {
    setDefaultCheckList(list);
  }, [list]);

  useEffect(() => {
    getPermissionList().then(permissionList => {
      permissionList.forEach(item => {
        if (item.permissionCode === permissionCode.audit_reply) {
          setCanExamine(true);
        }
      });
    });
  }, []);

  return (
    <div className="cxamine-manage" ref={bodyRef}>
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
          <Checkbox
            indeterminate={selectAll.indeterminate}
            checked={selectAll.checkAll}
            onChange={selectAllChange}
            className="select-all"
          >
            全选
          </Checkbox>
          {canExamine && (
            <Button type="primary" onClick={batchExamine}>
              批量审核
            </Button>
          )}
        </div>
        {list.length > 0 ? (
          <>
            <div className="total-box">
              共找到符合条件的问答数量:&nbsp;{total}&nbsp;条
            </div>
            {list.length > 0 &&
              list.map(item => {
                return (
                  <div className="table-item-box" key={item.questionId}>
                    <div className="checkbox-box">
                      <Checkbox
                        checked={selectedRowKeys.indexOf(item.questionId) >= 0}
                        onChange={e => {
                          checkChange(e, item);
                        }}
                      ></Checkbox>
                    </div>
                    <QuestionComponent question={item} onAudit={getList} />
                  </div>
                );
              })}
          </>
        ) : (
          <div className="nodata-wrap">
            <img src={noData_icon} />
            <p>没有符合要求的内容</p>
          </div>
        )}
        <Pagination
          current={parseInt(params.pageIndex)}
          defaultPageSize={params.pageSize}
          total={total}
          hideOnSinglePage
          showQuickJumper
          onChange={pageChangeHandler}
        />
      </div>
      <BackTop target={bodyRef.current} />
      <Modal
        title="批量修改审核状态"
        visible={isShowBatchExamine}
        width={900}
        footer={null}
        onCancel={() => {
          closeModel();
        }}
      >
        <ModalComponents data={selectedRows} closeModel={closeModel} />
      </Modal>
      <Loading text="加载中" visible={loading} />
    </div>
  );
}

export default ExamineManage;
