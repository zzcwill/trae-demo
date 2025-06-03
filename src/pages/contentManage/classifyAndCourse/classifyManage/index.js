import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  Input,
  Button,
  Table,
  Pagination,
  message,
  Modal
} from "dpl-react";
import "./index.scss";
import FormFilter from "@/components/common/formFilter";
import OperationBtn from "@/components/common/operationBtn";
import { get, post } from "@/request/request";
import Api from "@/request/api";
import CreateClassify from "./component/createClassify";
import UploadParent from "./component/updateParent";
import right_icon from "./image/right.png";

const MyTable = React.memo(Table, (before, next) => {
  return (
    before.dataSource === next.dataSource &&
    before.rowSelection.selectedRowKeys === next.rowSelection.selectedRowKeys &&
    before.loading === next.loading
  );
});

const { Option } = Select;
const classifyLevel = [
  { id: "0", name: "全部" },
  { id: "1", name: "一级" },
  { id: "2", name: "二级" },
  { id: "3", name: "三级" }
];

function ClassifyManage(props, refs) {
  const [queryParams, setQueryParams] = useState({
    classifyId: undefined,
    classifyLevel: undefined,
    keyword: undefined,
    pageIndex: 1,
    pageSize: 10
  });
  const [questionQueryParams, setQuestionQueryParams] = useState({
    pageIndex: 1,
    pageSize: 10,
    classifyId: undefined,
    containsClassifyChildren: "false"
  });
  const [total, setTotal] = useState(0);
  const [questionTotal, setQuestionTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [classifyList, setClassifyList] = useState([]);
  const [questionList, setQuestionList] = useState([]);
  const [isClassify, setIsClassify] = useState(true); // true目录列表,false问题列表
  const [showCreate, setShowCreate] = useState(false);
  const [newFlag, setNewFlag] = useState(true); // true新增分类，false修改分类
  const [currentEditClassify, setCurrentEditClassify] = useState({}); //当前编辑的分类
  const [showUpdate, setShowUpdate] = useState(false);
  const [isOnClassify, setIsOnClassify] = useState(false); // 是否按目录检索
  const [parentIdArr, setParentIdArr] = useState([null]); // 面包屑id数组,第一个元素总是Null,表示跟目录
  const [parentNameArr, setParentNameArr] = useState(["财税问答库"]);
  const filterConfig = [
    {
      type: "select",
      key: "classifyLevel",
      label: "目录级别",
      options: classifyLevel,
      other: {
        placeholder: "请选目录级别"
      }
    },
    {
      type: "input",
      key: "keyword",
      label: "检索",
      other: {
        placeholder: "请输入目录关键字",
        maxLength: 30,
        allowClear:true
      }
    }
  ];
  const formFilterRef = useRef(null);
  const classifyOperation = [
    {
      name: "编辑",
      callback: (text, record, index) => {
        setShowCreate(true);
        setNewFlag(false);
        setCurrentEditClassify({
          parentId:
            record.classifyList.length >= 1
              ? record.classifyList[record.classifyList.length - 1].id
              : null,
          name: record.name,
          rank: record.rank,
          id: record.id
        });
      }
    },
    {
      name: "删除",
      callback: (text, record, index) => {
        Modal.confirm({
          title: "正在进行删除目录的操作",
          content: "删除后的目录不可恢复，你还要继续吗",
          onOk: async () => {
            const data = await post({
              url: Api.deleteClassify,
              data: { id: record.id }
            });
            if (data.success) {
              message.success("删除成功");
              getClassifyList();
            } else {
              message.error(data.message);
            }
          }
        });
      }
    }
  ];
  const questionOperation = [
    {
      name: "查看详情",
      callback: async (text, record, index) => {
        let url =
          window.location.href.split("#")[0] +
          "#/contentManage/qaManage/taxLib/qaDetail?id=" +
          record.id;
        window.open(url);
      }
    },
    {
      name: "修改目录",
      callback: (text, record, index) => {
        setSelectedRowKeys([record.id]);
        setShowUpdate(true);
      }
    }
  ];
  const classifyColumns = [
    {
      title: "目录名称",
      dataIndex: "name",
      width: 200,
      ellipsis: true,
      render: (text, record, index) => {
        return (
          <span
            style={{ color: "#2C85D9", cursor: "pointer" }}
            onClick={() => {
              setIsOnClassify(true);
              const names = record.classifyList.map(item => item.name);
              const ids = record.classifyList.map(item => item.id);
              setParentIdArr([null, ...ids, record.id]);
              setParentNameArr(["财税问答库", ...names, record.name]);
              setQueryParams({
                pageSize: 10,
                pageIndex: 1,
                classifyId: record.id
              });
            }}
            title={record.name}
          >
            {record.name}
          </span>
        );
      }
    },
    {
      title: "上级目录",
      dataIndex: "parentName",
      width: 200,
      ellipsis: true
    },
    {
      title: "级别",
      dataIndex: "classifyLevel",
      ellipsis: true
    },
    {
      title: "排序",
      dataIndex: "rank",
      ellipsis: true,
      align: "center"
    },
    {
      title: "下级目录数量",
      dataIndex: "childrenNum",
      ellipsis: true,
      align: "right"
    },
    {
      title: "关联问题总量",
      dataIndex: "relatedQuestions",
      ellipsis: true,
      align: "right"
    },
    {
      title: "直属问题数量",
      dataIndex: "directlyQuestions",
      align: "right",
      render: (text, record, index) => {
        return (
          <span
            style={{ color: "#2C85D9", cursor: "pointer" }}
            onClick={() => {
              directlyQuestionHandler(record);
            }}
          >
            {record.directlyQuestions}
          </span>
        );
      }
    },
    {
      title: "操作",
      render: (text, record, index) => {
        return (
          <OperationBtn
            data={classifyOperation}
            text={text}
            record={record}
            index={index}
          />
        );
      }
    }
  ];
  const questionColumns = [
    {
      title: "标准问",
      dataIndex: "resume",
      width: 300,
      ellipsis: true,
      fixed: "left"
    },
    {
      title: "操作",
      width: 200,
      fixed: "left",
      render: (text, record, index) => {
        return (
          <OperationBtn
            data={questionOperation}
            text={text}
            record={record}
            index={index}
          />
        );
      }
    },
    {
      title: "上级目录",
      dataIndex: "classifyName",
      ellipsis: true,
      width: 150
    },
    {
      title: "分层标签",
      dataIndex: "gradeLabelName",
      ellipsis: true,
      width: 150
    },
    {
      title: "地域标签",
      dataIndex: "regionLabelName",
      ellipsis: true,
      width: 150
    },
    {
      title: "行业标签",
      dataIndex: "professionLabelName",
      ellipsis: true,
      width: 150
    },
    {
      title: "问题创建人",
      dataIndex: "creatorName",
      ellipsis: true,
      sorter: true,
      width: 150
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      ellipsis: true,
      sorter: true,
      width: 200
    },
    {
      title: "最新编辑人",
      dataIndex: "lastModifierName",
      ellipsis: true,
      sorter: true,
      width: 150
    },
    {
      title: "编辑时间",
      dataIndex: "lastModifyTime",
      ellipsis: true,
      sorter: true,
      width: 200
    },
    {
      title: "浏览总量",
      dataIndex: "visitNum",
      width: 100,
      ellipsis: true
    },
    {
      title: "纠错数量",
      dataIndex: "correctNum",
      ellipsis: true,
      width: 100
    }
  ];
  const searchHandler = () => {
    //查询
    setIsOnClassify(false);
    let data = formFilterRef.current.getData();
    data.keyword = data.keyword && data.keyword.trim();
    setQueryParams({ ...data, pageIndex: 1, pageSize: 10 });
    setIsClassify(true);
  };
  const clearHandler = () => {
    //清除条件
    formFilterRef.current.clearData();
    setQueryParams({ pageIndex: 1, pageSize: 10 });
    setIsClassify(true);
    setIsOnClassify(false);
  };
  const directlyQuestionHandler = item => {
    //直属问题点击
    setIsOnClassify(true);
    const names = item.classifyList.map(item => item.name);
    const ids = item.classifyList.map(item => item.id);
    setParentIdArr([null, ...ids, item.id]);
    setParentNameArr(["财税问答库", ...names, item.name]);
    setIsClassify(false);
    setQuestionList([]);
    setQuestionQueryParams({
      classifyId: item.id,
      pageIndex: 1,
      pageSize: 10,
      containsClassifyChildren: "false"
    });
  };
  const getClassifyList = async () => {
    setLoading(true);
    const data = await get({ url: Api.getClassifyList, params: queryParams });
    setSelectedRowKeys([]); // 只要列表改变，都清空
    if (data.success) {
      data.data.list.forEach(item => {
        item.parentName = item.parentName || "无";
      });

      setClassifyList(data.data.list);
      setTotal(data.data.total);
    }
    setLoading(false);
  };
  const getQuestionList = async () => {
    setLoading(true);
    const data = await get({
      url: Api.getQuestionList,
      params: questionQueryParams
    });
    const genList = list => {
      //处理列表数据
      list.forEach(item => {
        item.regionLabelName = item.regionLabel && item.regionLabel.name;
        item.gradeLabelName = item.gradeLabel && item.gradeLabel.name;
        item.professionLabelName =
          item.professionLabel && item.professionLabel.name;
        item.labelName = Array.isArray(item.labelList)
          ? item.labelList.map(label => label.name).join(",")
          : "";
        const category = item.classify;
        let classifyName = category.name;
        let children = category.children;
        while (children && children.length) {
          classifyName = children[0].name;
          children = children[0].children;
        }
        item.classifyName = classifyName;
      });
    };
    setSelectedRowKeys([]);
    if (data.success) {
      setQuestionTotal(data.data.total);
      genList(data.data.list);
      setQuestionList(data.data.list);
    }
    setLoading(false);
  };
  const pageChangeHandler = pageIndex => {
    if (isClassify) {
      setQueryParams(Object.assign({}, queryParams, { pageIndex }));
    } else {
      setQuestionQueryParams(
        Object.assign({}, questionQueryParams, { pageIndex })
      );
    }
  };

  const classifyOkHandler = () => {
    //新建，编辑分类成功回调
    setShowCreate(false);
    setIsClassify(true);
    setIsOnClassify(false);
    // setQueryParams({pageSize: 10, pageIndex: 1})
    getClassifyList();
  };
  const updateOkHandler = () => {
    // 修改，批量修改上级目录成功回调
    setShowUpdate(false);
    if (isClassify) {
      setIsOnClassify(false);
      setQueryParams({ pageSize: 10, pageIndex: 1 });
    } else {
      setQuestionQueryParams(
        Object.assign({}, questionQueryParams, { pageIndex: 1 })
      );
    }
  };
  const batchUpdateHandler = () => {
    //批量修改上级目录
    if (selectedRowKeys.length === 0) {
      message.error("请至少选择一条记录");
      return;
    }
    setShowUpdate(true);
  };
  const breadItemClick = index => {
    //面包屑点击
    setIsOnClassify(true);
    setIsClassify(true);
    let params = {
      pageSize: 10,
      pageIndex: 1
    };
    if (index === 0) {
      //财税问答库点击
      params.classifyLevel = 1;
      setParentNameArr(["财税问答库"]);
      setParentIdArr([null]);
    } else {
      params.classifyId = parentIdArr[index];
      setParentNameArr(parentNameArr.splice(0, index + 1));
      setParentIdArr(parentIdArr.splice(0, index + 1));
    }
    setQueryParams(params);
  };
  useEffect(() => {
    getClassifyList();
  }, [queryParams]);
  useEffect(() => {
    getQuestionList();
  }, [questionQueryParams]);
  return (
    <div className="classify-manage">
      <div className="filter-box">
        <FormFilter config={filterConfig} ref={formFilterRef} />
        <div className="btn-group">
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={searchHandler}
          >
            查询
          </Button>
          <Button onClick={clearHandler}>清空条件</Button>
        </div>
      </div>
      <div className="table-box">
        <div className="add-btn-group">
          <Button
            type="primary"
            style={{ marginRight: 8 }}
            onClick={() => {
              setShowCreate(true);
              setNewFlag(true);
              setCurrentEditClassify({});
            }}
          >
            新增目录
          </Button>
          <Button type="primary-bordered" onClick={batchUpdateHandler}>
            批量修改上级目录
          </Button>
        </div>
        {isOnClassify && (
          <div className="breadcrumb">
            {parentNameArr.map((item, index) => {
              return (
                <div className="item">
                  <p
                    onClick={() => {
                      breadItemClick(index);
                    }}
                  >
                    {item}
                  </p>
                  {index !== parentNameArr.length - 1 && (
                    <img alt="" src={right_icon} />
                  )}
                </div>
              );
            })}
          </div>
        )}
        {isClassify ? (
          <MyTable
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              onChange: e => {
                setSelectedRowKeys(e);
              }
            }}
            dataSource={classifyList}
            columns={classifyColumns}
            rowKey={"id"}
            pagination={false}
            loading={loading}
          />
        ) : (
          <MyTable
            rowSelection={{
              selectedRowKeys: selectedRowKeys,
              onChange: e => {
                setSelectedRowKeys(e);
              }
            }}
            dataSource={questionList}
            columns={questionColumns}
            rowKey={"id"}
            pagination={false}
            scroll={{ x: 2070 }}
            loading={loading}
          />
        )}
        <div className="pagination-wrap">
          {isClassify ? (
            <Pagination
              {...{
                total: total,
                current: parseInt(
                  isClassify
                    ? queryParams.pageIndex
                    : questionQueryParams.pageIndex
                ),
                pageSize: parseInt(
                  isClassify
                    ? queryParams.pageSize
                    : questionQueryParams.pageSize
                ),
                onChange: pageChangeHandler,
                showQuickJumper: true,
                className: "pagination-overwrite"
              }}
            />
          ) : (
            <Pagination
              {...{
                total: questionTotal,
                current: parseInt(
                  isClassify
                    ? queryParams.pageIndex
                    : questionQueryParams.pageIndex
                ),
                pageSize: parseInt(
                  isClassify
                    ? queryParams.pageSize
                    : questionQueryParams.pageSize
                ),
                onChange: pageChangeHandler,
                showQuickJumper: true,
                className: "pagination-overwrite"
              }}
            />
          )}
        </div>
      </div>
      {showCreate && (
        <CreateClassify
          visible={showCreate}
          onCancel={() => {
            setShowCreate(false);
          }}
          onOk={classifyOkHandler}
          newFlag={newFlag}
          classify={currentEditClassify}
          title={newFlag ? "新增目录" : "修改目录"}
        />
      )}
      {showUpdate && (
        <UploadParent
          idList={selectedRowKeys}
          isClassify={isClassify}
          onOk={updateOkHandler}
          visible={showUpdate}
          onCancel={() => {
            setShowUpdate(false);
          }}
        />
      )}
    </div>
  );
}

export default ClassifyManage;
