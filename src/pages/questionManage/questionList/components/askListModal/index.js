import React, { useState, useRef, useEffect } from "react";
import { uForm } from 'dora'
import { Modal, Form, Input, Select, Button, message } from "dpl-react";
import AppTable from "@/components/common/table";
import Api from '@/request/api-olhelpmanage'
import AppLongText from "@/components/common/longText";
import UserFuzzyQuery from '@/components/olhelpCommon/userFuzzyQuery'
import { getQuestionStatus } from "@/const/type";
import {
  previewStr
} from "@/utils/htmlToPlainText";
import { get } from '@/request/request'
const { SchemaMarkupForm: SchemaForm, SchemaMarkupField: Field, useFormTableQuery, Submit, FormButtonGroup, Reset } = uForm

import "./index.scss";


function AskListModal(props) {
  const {
    open,
    onOk,
    model,
    onCancel,
  } = props;

  const modelRef = useRef({});
  modelRef.current = model;
  const outColumns = [
    {
      title: "提问时间",
      dataIndex: "askTime",
    },
    {
      title: "提问内容",
      dataIndex: "question",
      className: 'lone-content',
      render: (text) => {
          return <AppLongText text={text} maxWidth={250}/>;
      }
    },
    {
      title: "当前状态",
      dataIndex: "questionStatus",
      render: (text) => (
          <span>
              {getQuestionStatus(text)}
          </span>
      ),
  },
  ]

  // 展开菜单配置

  const expandedRowRender = (record, index, indent, expanded) => {
    const columns = [
      { title: '回答时间', dataIndex: 'replyTime' },
      { title: '回答人', dataIndex: 'replyRealName' },
      {
        title: '适用地区',
        dataIndex: 'locationList',
        render: (text) => {
          const pre = text ? text.map(item => item.name).join(',') : '无'
          return <AppLongText text={pre} />;
      }
      },
      {
        title: '回答内容', dataIndex: 'reply',
        render: (text) => {
          const pre = previewStr(text, text.length)
          return <AppLongText text={pre} />;
        }
      },
      {
        title: '是否删除', dataIndex: 'isDelete',
        render: (text) => (
          <span>{text ? '已删除' : '未删除'}</span>
        ),
      },
    ];

    const data = record.replyList || [];
    return <AppTable columns={columns} dataSource={data} pagination={false} rowKey={"replyId"} bordered={false} />;
  };
  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    const data = await get({
      url: Api.getAskQuestionRecordList,
      params: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.current,
        mobile: modelRef.current.mobile,
        ...values
      }
    })
    return {
      dataSource: data.data.list,
      pageSize: data.data.pageSize,
      total: data.data.total,
      current: data.data.pageIndex
    }
  }
  const { form, table } = useFormTableQuery(service, { pagination: { pageSize: 10 } })

  return (
    <Modal
      className="ask-modal"
      visible={open}
      width={1000}
      title="用户咨询记录"
      onOk={onCancel}
      onCancel={onCancel}
      footer={null}
    >
      <div className="ask-content">
        <SchemaForm {...form} inline className='' components={{UserFuzzyQuery}}>
          <Field
            type="string"
            title="回答人"
            name="replyTrueId"
            x-component="UserFuzzyQuery"
            x-component-props={{
              style: { width: 200 }
            }}
          />
            <Submit >搜索</Submit>
        </SchemaForm>
        <AppTable className='app-table-box' rowKey={"questionId"} {...table} columns={outColumns} expandedRowRender={expandedRowRender} />
      </div>
    </Modal>
  );
}


export default AskListModal;