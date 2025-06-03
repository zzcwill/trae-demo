import React, { useRef, useState, useEffect } from "react";
import "./index.scss";
import FormFilter from "@/components/common/formFilter";
import { Button, Table, Pagination } from "dpl-react";
import useGetList from "@/hooks/useGetList";
import { get, post } from "@/request/request";
import API from "@/request/api";
import qs from "qs";
import moment from "moment";
import QuestionAddDetail from "./components/questionAddDetail";
import User from "@/components/contentManage/user";
const otherComponentSConfig = {
  user: User,
};

const stateMap = [
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
const CorrectState = (props) => {
  const { iconColor, text } = props;
  return (
    <div className="card-status">
      <span className="icon" style={{ background: iconColor }}></span>
      <p className="text">{text}</p>
    </div>
  );
};
const defaultPageIndex = 1;
const defaultPageSize = 10;
export default function QuestionAdd(props) {
  const [defaultFilter, setDefaultFilter] = useState(() => {
    const queryData = qs.parse(window.location.href.split("?")[1]);
    let data = {
      status: queryData.status || undefined,
      keyword: queryData.keyword && queryData.keyword,
      creatorList: queryData.creatorList && queryData.creatorList.split(","),
    };
    data.createTime =
      queryData.createTimeBegin && queryData.createTimeEnd
        ? [moment(queryData.createTimeBegin), moment(queryData.createTimeEnd)]
        : undefined;
    return data;
  });
  const [currentId, setCurrentId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { params, getList, loading, total, changeParams, list } = useGetList(
    API.questionCollectList,
    null
  );
  const formFilterRef = useRef(null);
  const filterConfig = [
    {
      type: "input",
      key: "keyword",
      label: "检索",
      other: {
        placeholder: "输入信息收集内容关键字",
        allowClear: true,
      },
    },
    {
      type: "datePickerRangePicker",
      key: "createTime",
      label: "发布时间",
    },
    {
      type: "user",
      key: "creatorList",
      label: "发布人",
      maxLength: 3,
      other: {
        placeholder: "请选择发布人",
      },
    },
    {
      type: "select",
      key: "status",
      label: "处理状态",
      options: stateMap,
      other: {
        placeholder: "请选择处理状态",
      },
    },
  ];
  const tableConfig = [
    {
      title: "标题",
      dataIndex: "title",
      width: 240,
      ellipsis: true,
      render(text, record, index) {
        return (
          <span
            style={{
              fontSize: 14,
              color: "#2c85d9",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrentId(record.id);
              setShowModal(true);
            }}
            title={text}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "信息发布人",
      dataIndex: "creatorName",
      align: "center",
      width: 100,
      ellipsis: true,
    },
    {
      title: "操作",
      align: "center",
      // width: 100,
      render: (text, record, index) => {
        return (
          <span
            style={{
              fontSize: 14,
              color: "#2c85d9",
              cursor: "pointer",
            }}
            onClick={() => {
              setCurrentId(record.id);
              setShowModal(true);
            }}
          >
            查看详情
          </span>
        );
      },
    },
    
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      ellipsis: true,
      width: 180,
    },
    {
      title: "纠错状态",
      align: "center",
      // width: 100,
      render: (text, record, index) => {
        // 不用switch是为了避免服务端传来的是init类型导致全匹配错误
        if (record.status == "2") {
          return <CorrectState iconColor={"#FF3A30"} text="未采纳" />;
        } else if (record.status == "1") {
          return <CorrectState iconColor={"#00CC66"} text="已采纳" />;
        } else {
          return <CorrectState iconColor={"#FF9500"} text="未处理" />;
        }
      },
    },
  ];
  const genParams = (params, pageIndex = 1, pageSize = defaultPageSize) => {
    const obj = {
      keyword: params.keyword ? params.keyword.trim() : undefined,
      status: params.status,
      createTimeBegin:
        params.createTime && params.createTime.length > 0
          ? params.createTime[0].format("YYYY-MM-DD")
          : undefined,
      createTimeEnd:
        params.createTime && params.createTime.length > 0
          ? params.createTime[1].format("YYYY-MM-DD")
          : undefined,
      creatorList: params.creatorList
        ? params.creatorList.join(",")
        : undefined,
      pageIndex,
      pageSize,
    };
    return obj;
  };
  const query = () => {
    const param = formFilterRef.current.getData();
    changeParams(genParams(param));
  };
  const reset = () => {
    formFilterRef.current.clearData({ type: 1 });
    changeParams({});
  };
  const changePage = (page) => {
    changeParams(Object.assign({}, params, { pageIndex: page }));
  };
  return (
    <div className="question-add">
      <div className="filter-box">
        <FormFilter
          config={filterConfig}
          ref={formFilterRef}
          defaultValue={defaultFilter}
          selfComponents={otherComponentSConfig}
        />
        <div className="btn-wrap">
          <Button
            style={{ marginRight: 10 }}
            type="primary"
            className="search-button"
            onClick={query}
          >
            查询
          </Button>
          <Button className="search-button" onClick={reset}>
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
      <QuestionAddDetail
        id={currentId}
        onOk={() => {
          setShowModal(false);
          getList();
        }}
        visible={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
}
