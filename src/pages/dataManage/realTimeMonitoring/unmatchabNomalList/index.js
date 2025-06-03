/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-08-07 14:22:32
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-08-22 10:56:03
 * @FilePath: /askone-manage-pc/src/pages/dataManage/realTimeMonitoring/unmatchabNomalList/index.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Modal, message, InputNumber } from "dpl-react";
import { get, post } from "@/request/request";
import AppTable from "@/components/common/table";
import Api from "@/request/api-olhelpmanage";
import { makeUUID } from "@/utils/index";
import moment from "moment";
import useClassifyList from "@/hooks/useClassifyList";
import { classifyTypeEnum } from "@/const/config";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  createFormActions,
  Submit,
  FormButtonGroup,
  Reset,
} = uForm;
const actions = createFormActions();

function InputNumberNew(props) {
  const { ...rest } = props;
  return (
    <div style={{
      display: 'flex',
    }}>
      <InputNumber
      {...rest}
      />
      户
    </div>
    
  )
}

export default function UnmatchabNomalList(props) {
  const [brandList, setBrandList] = useState([]); // 产品维度
  const [locationList] = useClassifyList([classifyTypeEnum.allArea]);
  const [refreshFrequency, setRefreshFrequency] = useState(15); // 刷新频率
  const [refreshTime, setRefreshTime] = useState(new Date()); // 刷新时间
  const timer = useRef();

  const refreshList = () => {
    actions.submit();
  };

  const detailClick = (record) => {
    let url =
      window.location.href.split("#")[0] +
      `#/dataManage/realTimeMonitoring/robotNoAnswerMonitor?errorMessage=${record.errorMessage}`;
    if (record.locationCode && record.locationCode.length > 0) {
      url += `&locationList=${record.locationCode}`;
    }
    if (record.brandCode && record.brandCode.length > 0) {
      url += `&brandList=${record.brandCode}`;
    }
    window.open(url);
  };

  const ignoreClick = (record) => {
    Modal.confirm({
      title: "提示",
      content: "确认忽略本条异常，将永久不再展示",
      onOk: async function () {
        const data = await post({
          url: Api.postIgnoreErrorWarn,
          data: {
            errorMessage: record.errorMessage,
            locationCode: record.locationCode,
            brandCode: record.brandCode,
          },
        });
        if (data.success) {
          message.success("忽略成功");
          refreshList();
        } else {
          message.error(data.message);
        }
      },
    });
  };

  const getAreaList = async () => {
    const res = await get({
      url: Api.getWdList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      if (data.brand) {
        setBrandList(data.brand);
      }
    } else {
      message.error(res.message);
    }
  };

  const columns = [
    {
      title: "异常信息",
      dataIndex: "errorMessage",
      ellipsis: true,
      align: "center",
      width: 300,
    },
    {
      title: "地区",
      dataIndex: "locationName",
      ellipsis: true,
      align: "center",
      render: (text) => {
        return (
          <div>
            {text || '-'}
          </div>
        )
      }
    },
    {
      title: "产品维度",
      dataIndex: "brandName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "影响客户数",
      dataIndex: "affectUserNum",
      ellipsis: true,
      align: "center",
    },
    {
      title: "人工服务发生次数",
      dataIndex: "humanServiceNum",
      ellipsis: true,
      align: "center",
    },
    {
      title: "最近报错时间",
      dataIndex: "lastErrorTime",
      ellipsis: true,
      align: "center",
    },
    {
      title: "操作",
      width: 130,
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
      url: Api.getErrorWarnList,
      params: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.current,
        ...values,
        brandList: values.brandList ? values.brandList.join(",") : "",
        locationList: values.locationList ? values.locationList.join(",") : "",
      },
    });
    setRefreshTime(new Date());
    // 这边加一下唯一id
    data.data.list?.forEach((item, index) => {
      item.id = makeUUID();
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

  useEffect(() => {
    getAreaList();
  }, []);

  useEffect(() => {
    console.log("refreshFrequency", refreshFrequency);
    timer.current = setInterval(() => {
      console.log("refreshList", moment(new Date()).format("HH:mm"));
      refreshList();
    }, 1000 * 60 * refreshFrequency);
    return () => {
      clearInterval(timer.current);
    };
  }, [refreshFrequency]);

  return (
    <div className="app-bg-box unmatchab-nomal-list">
      <SchemaForm {...form} actions={actions} components={{ InputNumberNew }} inline className="app-search-box">
        <Field
          type="array"
          title="产品维度"
          name="brandList"
          x-component="Select"
          x-component-props={{
            allowClear: true,
            mode: "multiple",
            placeholder: "请选择产品维度",
            dataSource: brandList,
            optionFormat: {
              label: "name",
              value: "id",
            },
            showSearch: true,
            optionFilterProp: "children",
            style: {
              width: 250,
            },
          }}
        />
        <Field
          type="array"
          title="地区名称"
          name="locationList"
          x-component="Select"
          x-component-props={{
            allowClear: true,
            mode: "multiple",
            placeholder: "请选择地区名称",
            dataSource: locationList,
            showSearch: true,
            optionFormat: {
              label: "name",
              value: "id",
            },
            optionFilterProp: "children",
            style: {
              width: 250,
            },
          }}
        />
        <Field
          type="string"
          title="异常信息"
          name="errorMessage"
          x-component="Input"
          x-component-props={{ placeholder: "请输入异常信息" }}
        />
        <Field
          type="string"
          title="影响客户数大于"
          name="affectUserNum"
          x-component="InputNumberNew"
          x-component-props={{
            placeholder: "请输入影响客户数",
            inputWidth: 140,
            precision: 0,
          }}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }} />
          <Reset />
        </FormButtonGroup>
      </SchemaForm>
      <div className="refresh-view">
        <div className="refresh-frequency">
          <span>更新频率：</span>
          <InputNumber
            className="input"
            min={1}
            precision={0}
            defaultValue={refreshFrequency}
            onChange={(value) => {
              if(value) {
                setRefreshFrequency(value)
              }
            }}
            inputWidth={120}
          />
          <span>分钟</span>
        </div>
        <span className="refresh-view-text">
          更新时间：{moment(refreshTime).format("HH:mm")}
        </span>
      </div>
      <AppTable
        className="app-table-box"
        {...table}
        columns={columns}
        rowKey="id"
      />
    </div>
  );
}
