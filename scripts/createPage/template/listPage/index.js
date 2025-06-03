import React, { useState } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Table } from "dpl-react";
import { get, post } from "@/request/request";
import AppTable from "@/components/common/table";
import Api from "@/request/api-olhelpmanage";
import useDictList from "@/hooks/useDictList";
import useClassifyList from "@/hooks/useClassifyList";
import { classifyTypeEnum, dictTypeEnum } from "@/const/config";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
} = uForm;
export default function __functionName(props) {
  const [topicTypeList] = useDictList(
    [dictTypeEnum.financialltaxTopicType],
    Api.getEnumOptions
  );
  const [locationList] = useClassifyList([classifyTypeEnum.allArea]);

  const detailClick = (record) => {};
  const ignoreClick = (record) => {};
  const columns = [
    {
      title: "account",
      dataIndex: "account",
      ellipsis: true,
      align: "center",
    },
    {
      title: "name",
      dataIndex: "name",
      ellipsis: true,
      align: "center",
    },
    {
      title: "操作",
      dataIndex: "operate",
      ellipsis: true,
      align: "center",
      render: (text, record, index) => {
        return (
          <div className="option-button-list">
            <span
              onClick={() => {
                detailClick(record);
              }}
              className="option-button"
            >
              详情
            </span>
            <span
              onClick={() => {
                ignoreClick(record);
              }}
              className="option-button"
            >
              忽略
            </span>
          </div>
        );
      },
    },
  ];
  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    const data = await get({
      url: Api.getExpertPoolList,
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
  const { form, table } = useFormTableQuery(service, {
    pagination: { pageSize: 10 },
  });
  return (
    <div className="app-bg-box __className">
      <SchemaForm {...form} inline className="app-search-box">
        <Field
          type="string"
          title="test1"
          name="test1"
          x-component="Input"
          x-component-props={{ placeholder: "请输入" }}
        />
        <Field
          type="string"
          title="test1"
          name="test2"
          x-component="Input"
          x-component-props={{ placeholder: "请输入" }}
        />
        <Field
          type="array"
          title="主题类型"
          name="topicType"
          x-component="Select"
          x-component-props={{
            allowClear: true,
            mode: "multiple",
            placeholder: "请选择主题类型",
            dataSource: topicTypeList,
            showSearch: true,
            optionFilterProp: "children",
            style: {
              width: 250,
            },
          }}
        />
        <Field
          type="array"
          title="适用地区"
          name="locationCodeList"
          x-component="Select"
          x-component-props={{
            allowClear: true,
            mode: "multiple",
            placeholder: "请选择适用地区",
            dataSource: locationList,
            showSearch: true,
            optionFilterProp: "children",
            style: {
              width: 250,
            },
          }}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }} />
          <Reset />
        </FormButtonGroup>
      </SchemaForm>
      <AppTable
        className="app-table-box"
        {...table}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
}
