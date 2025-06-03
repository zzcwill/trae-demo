/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-06-08 10:15:27
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-08-17 09:47:53
 * @FilePath: /askone-manage-pc/src/pages/dataManage/realTimeMonitoring/robotNoAnswerMonitor/index.js
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from "react";
import "./index.scss";
import { uForm } from "dora";
import { get, post } from "@/request/request";
import AppTable from "@/components/common/table";
import TimeRangePicker from "@/components/common/timeRangePicker";
import CustomSearchSelect from "@/components/common/customSearchSelect";
import Api from "@/request/api-olhelpmanage";
import qs from "qs";
const consult_channel = "consult_channel"; // 渠道枚举名
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
} = uForm;

export default function RobotNoAnswerMonitor(props) {
  const [queryData, setQueryData] = useState(() => {
    const obj = qs.parse(window.location.href.split("?")[1]) || {}
    obj.locationList = obj.locationList ? obj.locationList.split(",") : []
    obj.brandList = obj.brandList ? obj.brandList.split(",") : []
    return obj;
  }); 
  const [channelList, setChannelList] = useState([]);
  const [brandList, setBrandList] = useState([]); // 产品维度
  const [locationList, setLocationList] = useState([]); // 地区维度
  const columns = [
    {
      title: "报错时间",
      dataIndex: "errorTime",
      ellipsis: true,
      align: "center",
    },
    {
      title: "地区",
      dataIndex: "locationName",
      ellipsis: true,
      align: "center",
    },
		{
      title: "产品维度",
      dataIndex: "brandName",
      ellipsis: true,
      align: "center",
    },
		{
      title: "渠道名称",
      dataIndex: "channelName",
      ellipsis: true,
      align: "center",
    },
		{
      title: "渠道代码",
      dataIndex: "channel",
      ellipsis: true,
      align: "center",
    },
		{
      title: "模块名称",
      dataIndex: "moduleName",
      ellipsis: true,
      align: "center",
    },
    {
      title: "菜单名称",
      dataIndex: "menuName",
      ellipsis: true,
      align: "center",
    },
		{
      title: "场景名称",
      dataIndex: "scenePath",
      ellipsis: true,
      align: "center",
    },
		{
			title: "报错停留页面地址",
			dataIndex: "pageUrl",
      ellipsis: true,
      align: "center",
      // width: 120, // 设置宽度之后会...
		},
		{
      title: "错误信息",
      dataIndex: "cleanErrorMessage",
      ellipsis: true,
      align: "center",
    },
		{
			title: "企业名称",
			dataIndex: "companyName",
      ellipsis: true,
      align: "center",
		},
		{
			title: "企业税号",
			dataIndex: "companyTaxNo",
      ellipsis: true,
      align: "center",
		},{
			title: "用户昵称",
			dataIndex: "userName",
      ellipsis: true,
      align: "center",
		},{
			title: "登录手机号",
			dataIndex: "mobile",
      ellipsis: true,
      align: "center",
		}
  ];

  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    console.log("values", values);
		const params = {
			pageSize: pagination.pageSize,
			pageIndex: pagination.current,
			...values,
			channelList: values.channelList ? values.channelList.join(",") : "",
			brandList: values.brandList ? values.brandList.join(",") : "",
			locationList: values.locationList ? values.locationList.join(",") : "",
			companyIdList: values.companyIdList ? values.companyIdList.join(",") : "",
      errorMessage: values.errorMessage || "",
			// startErrorTime: values.startErrorTime && values.startErrorTime.length > 0 ? values.startErrorTime[0].format("HH:mm") : "",
			// endErrorTime: values.startErrorTime && values.startErrorTime.length > 0 ? values.startErrorTime[1].format("HH:mm") : "",
		}
		if(values.startErrorTime && values.startErrorTime.startTime && values.startErrorTime.endTime) {
      const pre = moment(new Date()).format("YYYY-MM-DD") + ' '
			params.startErrorTime = pre + values.startErrorTime.startTime 
			params.endErrorTime = pre + values.startErrorTime.endTime
		} else {
      params.startErrorTime = moment(new Date()).format("YYYY-MM-DD") + ' 00:00'
      params.endErrorTime = moment(new Date()).format("YYYY-MM-DD HH:mm")
    }
    const data = await get({
      url: Api.getNoAnswerList,
      params 
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
  const getAreaList = async () => {
    const res = await get({
      url: Api.getWdList,
      params: {},
    });
    if (res.success) {
      const data = res.data;
      console.log("data", data);
      if (data.location) {
        setLocationList(data.location);
      }
      if (data.brand) {
        setBrandList(data.brand);
      }
    } else {
      message.error(res.message);
    }
  };
  const getChannelList = async () => {
    const data = await get({
      url: Api.getEnumOptions,
      params: { groupNames: consult_channel },
    });
    if (data.success) {
      data.data.forEach((item) => {
        if (item.groupName === consult_channel) {
          setChannelList(item.options || []);
        }
      });
    }
  };

  useEffect(() => {
    getChannelList();
    getAreaList();
  }, []);

  return (
    <div className="app-bg-box robot-no-answer-monitor">
      <SchemaForm
        {...form}
        initialValues={queryData}
        inline
        className="app-search-box"
        components={{
          TimeRangePicker,
					CustomSearchSelect,
        }}
      >
        <Field
          type="array"
          title="渠道名称"
          name="channelList"
          x-component="Select"
          x-component-props={{
            allowClear: true,
            mode: "multiple",
            placeholder: "请选择渠道名称",
            dataSource: channelList,
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
          type="string"
          title="模块名称"
          name="moduleName"
          x-component="Input"
          x-component-props={{
            placeholder: "请输入模块名称",
            allowClear: true,
          }}
        />
        <Field
          type="string"
          title="菜单名称"
          name="menuName"
          x-component="Input"
          x-component-props={{
            placeholder: "请输入菜单名称",
            allowClear: true,
          }}
        />
        <Field
          type="string"
          title="错误提示"
          name="errorMessage"
          x-component="Input"
          x-component-props={{
            placeholder: "请输入错误提示",
            allowClear: true,
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
          type="object"
          title="时间"
          name="startErrorTime"
          x-component="TimeRangePicker"
          x-component-props={{
            format: "HH:mm",
            style: {
              width: 260,
            },
          }}
        />
        <Field
          type="array"
          title="企业名称"
          name="companyIdList"
          x-component="CustomSearchSelect"
          x-component-props={{ 
						placeholder: "请输入企业名称",
						api: Api.getCompanyByName,
						mode: 'multiple',
						maxTagCount: 1,
						maxTagTextLength: 6,
						format: {
              label: "name",
              value: "bizId",
							searchKey: 'companyName',
            },
					}}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }} />
          <Reset />
        </FormButtonGroup>
      </SchemaForm>
      <AppTable className="app-table-box" {...table} columns={columns} rowKey="id" />
    </div>
  );
}
