import "./index.scss";
import { uForm } from "dora";
import React, { useState } from "react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import useFormQueryNoChangeParams from "@/hooks/useFormQueryNoChangeParams";
import { Button, Table, Modal, message } from "dpl-react";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
} = uForm;
export default function TestMdList(props) {
  const [test3Options, setTest3Options] = useState([]);
  const [test9Options, setTest9Options] = useState([]);
  const [test13Options, setTest13Options] = useState([]);
  const [dispatchAndNoChangeParams, queryParamsMiddleware] =
    useFormQueryNoChangeParams();
  const deleteHandler = (id) => {
    Modal.confirm({
      title: "提示",
      content: "是否确定删除该记录",
      onOk: async () => {
        const data = await post({ url: Api.routePolicyDelete, data: { id } });
        if (data.success) {
          dispatchAndNoChangeParams();
          message.success("删除成功");
        } else {
          message.error(data.message);
        }
      },
    });
  };
  const columns = [
    {
      title: "字段1",
      dataIndex: "creatorName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "字段2",
      dataIndex: "lastModifierName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "id",
      ellipsis: true,
      align: "center",
      render: function (text, record) {
        return (
          <div className="operator">
            <span
              onClick={() => {
                deleteHandler(record.id);
              }}
            >
              删除
            </span>
            <span>编辑</span>
          </div>
        );
      },
    },
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    const data = await get({
      url: Api.routePolicyList,
      params: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.current,
        ...values,
      },
    });
    return {
      dataSource: data.data.list,
      pageSize: data.data.pageSize,
      total: data.data.total,
      current: data.data.pageIndex,
    };
  };
  const { form, table } = useFormTableQuery(
    service,
    {
      pagination: {
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    },
    [queryParamsMiddleware]
  );

  return (
    <div className="test-md-list">
      <SchemaForm {...form} inline className="query-form-by-render">
        <Field
          name="test1"
          title="字段1"
          x-component="Input"
          x-component-props={{
            placeholder: "请输入其他参数",
            allowClear: true,
          }}
        />
        <Field
          name="test2"
          title="字段2"
          x-component="Select"
          x-component-props={{
            placeholder: "请选择产品纬度",
            allowClear: true,
            dataSource: [
              { label: "是", value: "Y" },
              { label: "否", value: "N" },
            ],
          }}
        />
        <Field
          name="test3"
          title="字段3"
          x-component="Select"
          x-component-props={{
            placeholder: "请选择产品纬度",
            allowClear: true,
            mode: "multiple",
            dataSource: test3Options,
          }}
        />
        <Field
          name="test4"
          title="字段4"
          x-component="DatePicker"
          x-component-props={{ 
            placeholder: "请选择日期", 
            allowClear: true,
            showTime: true,
          }}
        />
        <Field
          name="test5"
          title="字段5"
          x-component="MonthPicker"
          x-component-props={{ placeholder: "请选择月份", allowClear: true }}
        />
        <Field
          name="test6"
          title="字段6"
          x-component="RangePicker"
          x-component-props={{
            placeholder: "请选择时间区间",
            allowClear: true,
          }}
        />
        <Field
          name="test7"
          title="字段7"
          x-component="YearPicker"
          x-component-props={{ placeholder: "请输入年份", allowClear: true }}
        />
        <Field
          name="test8"
          title="字段8"
          x-component="TimePicker"
          x-component-props={{ placeholder: "请输入时间", allowClear: true }}
        />
        <Field
          name="test9"
          title="字段9"
          x-component="Cascader"
          x-component-props={{
            placeholder: "请选择",
            allowClear: true,
            options: test9Options,
          }}
        />
        <Field
          name="test10"
          title="字段10"
          x-component="CheckboxGroup"
          x-component-props={{
            options: [
              { label: "是", value: "Y" },
              { label: "否", value: "N" },
            ],
          }}
        />
        <Field
          name="test11"
          title="字段11"
          x-component="RadioGroup"
          x-component-props={{
            options: [
              { label: "是", value: "Y" },
              { label: "否", value: "N" },
            ],
          }}
        />
        <Field
          name="test12"
          title="字段12"
          x-component="InputNumber"
          x-component-props={{ allowClear: true }}
        />
        <Field
          name="test13"
          title="字段13"
          x-component="TreeSelect"
          x-component-props={{
            placeholder: "请选择",
            allowClear: true,
            treeData: test13Options,
          }}
        />
        <Field
          name="test14"
          title="字段14"
          x-component="Switch"
          x-component-props={{}}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }}>查询</Submit>
          <Reset>清空条件</Reset>
        </FormButtonGroup>
      </SchemaForm>

      <div className="operate-btn-by-render">
        <Button type="primary" className="operate-btn-item">
          新增
        </Button>
        <Button type="primary" className="operate-btn-item">
          批量删除
        </Button>
      </div>
      <Table
        className="table-wrap-by-render"
        {...table}
        columns={columns}
        rowKey={"id"}
        rowSelection={{
          selectedRowKeys: selectedRowKeys,
          onChange(selectedRowKeys) {
            setSelectedRowKeys(selectedRowKeys);
          },
        }}
      />
    </div>
  );
}
