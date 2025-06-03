import React, { useState, useEffect } from "react";
import "./index.scss";
import { Table, Checkbox } from "dpl-react";
import CardStatus from "@/components/common/card/cardStatus";
import { htmlToPlainText } from "@/components/common/ueditor/htmlToPlainText";
import { clearImage } from "@/components/common/ueditor/util";
import BatchExamineForm from "./component/batchExamineForm";

const statusColorMap = ["#FF9500", "#00CC66", "#FF3A30"];
const statusTextMap = ["未审核", "已通过", "未通过"];
const defaultParamData = {
  status: undefined, // 审核类型
  auditUnPassReasonCode: undefined, // 审核未通过原因
  auditUnPassDesc: "" // 审核未通过补充说明
};
const BatchExamineModal = React.forwardRef((props, refs) => {
  const { data, closeModel } = props;

  const [selectedRowKeysObj, setSelectedRowKeysObj] = useState({}); // 全部选中时的对相关
  const [questionIdList, setQuestionIdList] = useState([]); // 所有问题ID
  const [tableList, setTableList] = useState([]); // 表格列表
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 选择列表
  const [selectRows, setSelectRows] = useState({});
  const [paramData, setParamData] = useState(defaultParamData);

  // 表格渲染方法
  const formatTableList = data => {
    let list = [];
    let idList = [];
    let allQuestionObj = {};
    Object.keys(data).forEach(key => {
      const item = data[key];
      let result = [];
      idList.push(item.id);
      if (item.replyList && item.replyList.length) {
        let replyIdList = [];
        item.replyList.forEach((reply, index) => {
          result.push(reply.id);
          replyIdList.push(reply.id);
          list.push({
            questionId: item.id,
            resume: item.resume,
            questionCreatorName: item.creatorName,
            _isStart: index === 0,
            _listLength: item.replyList.length,
            ...reply,
            replyList: replyIdList
          });
        });
      } else {
        list.push({
          questionId: item.id,
          resume: item.resume,
          questionCreatorName: item.creatorName,
          _isStart: true,
          _listLength: 1,
          replyList: []
        });
      }
      allQuestionObj[item.id] = result;
    });
    setSelectedRowKeys([].concat(idList));
    setQuestionIdList([].concat(idList));
    setSelectRows(Object.assign({}, allQuestionObj));
    setSelectedRowKeysObj(Object.assign({}, allQuestionObj));
    setTableList(list);
  };

  const columns = [
    {
      title: (
        <Checkbox
          indeterminate={
            questionIdList.length > 0 &&
            selectedRowKeys.length > 0 &&
            selectedRowKeys.length < questionIdList.length
          }
          checked={
            questionIdList.length > 0 &&
            selectedRowKeys.length === questionIdList.length
          }
          onChange={e => {
            if (e.target.checked) {
              setSelectedRowKeys([...questionIdList]);
              setSelectRows(selectedRowKeysObj);
            } else {
              setSelectedRowKeys([]);
              setSelectRows({});
            }
          }}
        />
      ),
      width: 50,
      dataIndex: "id",
      align: "center",
      render(text, record, index) {
        const obj = {
          children: (
            <Checkbox
              checked={selectedRowKeys.indexOf(record.questionId) >= 0}
              onChange={e => {
                const checked = e.target.checked;
                const index = selectedRowKeys.indexOf(record.questionId);
                if (checked) {
                  if (index < 0) {
                    setSelectedRowKeys([...selectedRowKeys, record.questionId]);
                    let obj = Object.assign({}, selectRows);
                    if (record.replyList && record.replyList.length) {
                      obj[record.questionId] = record.replyList;
                    }
                    setSelectRows(obj);
                  }
                } else {
                  if (index >= 0) {
                    selectedRowKeys.splice(index, 1);
                    setSelectedRowKeys([...selectedRowKeys]);
                    let obj = Object.assign({}, selectRows);
                    delete obj[record.questionId];
                    setSelectRows(obj);
                  }
                }
              }}
            />
          ),
          props: {}
        };
        if (record._isStart) {
          obj.props.rowSpan = record._listLength;
          obj.props.style = { borderRight: "1px solid #d1d3d8" };
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    },
    {
      title: "标准问",
      dataIndex: "resume",
      key: "resume",
      width: 200,
      ellipsis: true,
      render: (text, record, index) => {
        const obj = {
          children: <span title={text}>{text}</span>,
          props: {}
        };
        if (record._isStart) {
          obj.props.rowSpan = record._listLength;
          obj.props.style = { borderRight: "1px solid #d1d3d8" };
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      }
    },
    {
      title: "问题发布者",
      dataIndex: "questionCreatorName",
      key: "questionCreatorName",
      width: 120,
      ellipsis: true,
      align: "center"
    },
    {
      title: "回答",
      dataIndex: "reply",
      key: "reply",
      width: 200,
      ellipsis: true,
      render: (text, record, index) => {
        // 用ueditor的去除完成后再调用去除一边<a *>a标签的首部类型
        return clearImage(htmlToPlainText(text).replace(/<[^>]+>/g, ""));
      }
    },
    {
      title: "审核状态",
      width: 100,
      align: "center",
      render: (text, record, index) => {
        return (
          <CardStatus
            text={statusTextMap[record.auditStatus || "0"]}
            iconColor={statusColorMap[record.auditStatus || "0"]}
            unShowTextColor={true}
          />
        );
      }
    },
    {
      title: "回答发布者",
      dataIndex: "creatorName",
      key: "creatorName",
      width: 120,
      ellipsis: true,
      align: "center"
    }
  ];

  useEffect(() => {
    formatTableList(data);
    setParamData(Object.assign({}, defaultParamData));
  }, [data]);

  return (
    <div className="batch-examine-modal" ref={refs}>
      <div className="modal-text">以下问题将被修改，请确认选择对象：</div>
      <Table
        columns={columns}
        rowKey="id"
        selectedRowKeys={selectedRowKeys}
        dataSource={tableList}
        scroll={{ x: "100%", y: "calc(100vh - 45px)" }}
        pagination={false}
      ></Table>
      <div className="form-box">
        <BatchExamineForm
          closeModel={closeModel}
          selectRows={selectRows}
          param={paramData}
        />
      </div>
    </div>
  );
});
export default BatchExamineModal;
