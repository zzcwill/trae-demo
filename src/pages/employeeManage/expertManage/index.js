import React, { useState } from "react";
import FormFilter from "./component/formFilter";
import useGetList from "./hooks/useGetList";
import Api from "@/request/api-olhelpmanage";
import { post } from "@/request/request";
import { Table, Pagination, Modal, message, Button } from "dpl-react";
import OperationBtn from "@/components/employeeManage/operationBtn";
import "./index.scss";
import history from "@/history";
import localStorageHelper from "@/utils/localStorage";
import { getQueryString } from "@/utils/index";

const MyTable = React.memo(Table, (before, next) => {
  return (
    before.dataSource === next.dataSource && before.loading === next.loading
  );
});

const getInitValue = () => {
  let obj = getQueryString();
  let result = {
    expertName: obj.expertName,
    locationList: obj.locationList ? obj.locationList.split(",") : undefined,
    channelList: obj.channelList ? obj.channelList.split(",") : undefined,
  };
  return result;
};

function ExpertManage(props, ref) {
  const genList = (list) => {
    const genName = (list) => {
      if (!Array.isArray(list)) return "";
      return list.map((item) => item).join(",");
    };
    list.forEach((item) => {
      item.labelName = genName(item.labelList);
      item.locationName = genName(item.locationList);
      item.channelName = genName(item.channelList);
      item.speciality = item.speciality.replace(/<br\/>/g, "\n");
      item.workTime = item.workTime.replace(/<br\/>/g, "\n");
    });
    return list;
  };
  const { params, getList, loading, total, changeParams, list } = useGetList(
    Api.getExpertList,
    genList,
    getQueryString().firstRender === "true"
  );
  const [initValue, setInitValue] = useState(() => {
    return getInitValue();
  });
  const operation = [
    {
      name: "修改",
      callback: (text, record, index) => {
        localStorageHelper.setItem("_listPage_query", getQueryString());
        history.push("/employeeManage/expertManage/detail?id=" + record.id);
      },
    },
    {
      name: "删除",
      callback: (text, record, index) => {
        deleteHandler(record);
      },
    },
  ];
  const columns = [
    {
      title: "专家名称",
      dataIndex: "name",
      width: 150,
      ellipsis: true,
      fixed: "left",
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
      title: "头衔",
      dataIndex: "appellation",
      ellipsis: true,
      width: 150,
    },
    {
      title: "职称",
      dataIndex: "professionalTitle",
      ellipsis: true,
      width: 150,
    },
    {
      title: "擅长",
      dataIndex: "speciality",
      ellipsis: true,
      width: 150,
    },
    {
      title: "上班时间",
      dataIndex: "workTime",
      ellipsis: true,
      width: 150,
    },
    {
      title: "标签",
      dataIndex: "labelName",
      ellipsis: true,
      width: 150,
    },
    {
      title: "适用地",
      dataIndex: "locationName",
      ellipsis: true,
      width: 150,
    },
    {
      title: "适用渠道",
      dataIndex: "channelName",
      ellipsis: true,
      width: 200,
    },
    {
      title: "顺序",
      dataIndex: "indexNum",
      ellipsis: true,
      width: 150,
    },
    {
      title: "最后修改人",
      dataIndex: "lastModifierName",
      ellipsis: true,
      width: 200,
    },
    {
      title: "最后修改时间",
      dataIndex: "lastModifyTime",
      ellipsis: true,
      width: 200,
    },
  ];
  const onSearch = (value) => {
    changeParams({ ...value, pageIndex: 1 }, true);
  };
  const onReset = () => {
    changeParams({ pageIndex: 1 }, true);
    setInitValue(getInitValue());
  };
  const pageChangeHandler = (pageIndex, pageSize) => {
    changeParams(Object.assign({}, params, { pageIndex }));
  };
  const deleteHandler = (item) => {
    Modal.confirm({
      title: "提示",
      content: "您确定要删除该专家吗？",
      onOk: async () => {
        const data = await post({
          url: Api.deleteExpert,
          data: { idList: [item.id] },
        });
        if (data.success) {
          message.success("删除成功");
          getList();
        } else {
          message.error(data.message);
        }
        return true;
      },
    });
  };
  return (
    <div className="expertManage">
      <div className="search-box">
        <FormFilter
          onSearch={onSearch}
          onReset={onReset}
          initValue={initValue}
        />
      </div>
      <div className="table-box">
        <Button
          type="primary"
          onClick={() => {
            localStorageHelper.setItem("_listPage_query", getQueryString());
            history.push("/employeeManage/expertManage/detail");
          }}
          style={{ margin: "0 0 20px 20px" }}
        >
          新增
        </Button>
        <MyTable
          dataSource={list}
          columns={columns}
          rowKey={"id"}
          scroll={{ x: 2000 }}
          pagination={false}
          loading={loading}
          border
        />

        <div className="pagination-wrap">
          <Pagination
            {...{
              total: total,
              current: parseInt(params.pageIndex),
              pageSize: parseInt(params.pageSize),
              onChange: pageChangeHandler,
              showQuickJumper: true,
              className: "pagination-overwrite",
              showTotalInfo: true,
              showSizeChanger: true,
              pageSizeOptions:['10','20','50','100'],
              onShowSizeChange: (current, pageSize) => {
                changeParams(
                  Object.assign({}, params, { pageIndex: 1, pageSize })
                );
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ExpertManage;
