import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import { uForm } from "dora";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { message, Modal, Table } from "dpl-react";
import OperationBtn from "@/components/common/operationBtn";
import Copy from "./copy";
import moment from "moment";
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  Row,
  Col,
  FormSlot,
  useFormTableQuery,
  FormButtonGroup,
  Submit,
  Reset,
  FormEffectHooks,
} = uForm;
const action = createFormActions();
let preStartTime;
let preEndTime;
export default function AccessLog(props) {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [currentLog, setCurrentLog] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [channel, setChannel] = useState([]);

  const [wdList, setWdList] = useState({
    location: [],
    brand: [],
  });
  const getWdList = async () => {
    const res = await get(Api.getWdList);
    if (res.success) {
      Object.keys(res.data).forEach((key) => {
        Array.isArray(res.data[key]) &&
          res.data[key].forEach((item) => {
            item.label = item.name;
            item.value = item.id;
          });
      });
      setWdList(res.data);
    }
  };
  const getOptions = async () => {
    const data = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: "consult_channel",
      },
    });
    let map = {
      consult_channel: setChannel,
    };
    if (Array.isArray(data.data)) {
      data.data.forEach((item) => {
        map[item.groupName] &&
          map[item.groupName](
            item.options.map((item) => {
              return { label: item.name, value: item.id };
            })
          );
      });
    }
  };
  const columns = [
    {
      title: "时间",
      // ellipsis: true,
      //dataIndex: "机构代码",
      width: 165,
      fixed: "left",
      render(text, record, index) {
        const copyContent = record.find(
          (item) => item.key === "createDate"
        ).value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "操作",
      dataIndex: "id",
      //  ellipsis: true,
      width: 100,
      fixed: "left",
      render(text, record, index) {
        const btnList = [
          {
            name: "查看详情",
            callback(id, item) {
              setCurrentLog(item);
              setModalVisible(true);
            },
          },
        ];
        return (
          <OperationBtn
            className="center"
            data={btnList}
            text={text}
            record={record}
            index={index}
          />
        );
      },
    },
    {
      title: "机构代码",
      // dataIndex: "机构代码",
      //ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find(
          (item) => item.key === "agencydm"
        ).value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "机构名称",
      // dataIndex: "机构名称",
      //ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find(
          (item) => item.key === "agencymc"
        ).value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "企业税号",
      //dataIndex: "企业税号",
      // ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find((item) => item.key === "yhdm").value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "企业名称",
      // dataIndex: "企业名称",
      //  ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find((item) => item.key === "yhmc").value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "个人账号",
      //dataIndex: "个人账号",
      // ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find(
          (item) => item.key === "personaldm"
        ).value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "个人名称",
      //dataIndex: "个人名称",
      // ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find(
          (item) => item.key === "personalmc"
        ).value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "来源渠道",
      // dataIndex: "来源渠道",
      // ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find((item) => item.key === "channel").value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "地区维度",
      //dataIndex: "地区维度",
      //  ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find(
          (item) => item.key === "location"
        ).value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "产品维度",
      //dataIndex: "产品维度",
      // ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find((item) => item.key === "brand").value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
    {
      title: "会员等级",
      //dataIndex: "会员等级",
      // ellipsis: true,
      width: 150,
      render(text, record, index) {
        const copyContent = record.find(
          (item) => item.key === "userType"
        ).value;
        return <Copy copyContent={copyContent}>{copyContent}</Copy>;
      },
    },
  ];
  const startTimeRef = useRef(undefined);
  const service = async ({ values, pagination, sorter = {}, filters = {} }) => {
    //  values = Object.assign({},values)
    if (values.startTime && !values.endTime) {
      // 处理endTime清空后直接点提交报错的问题
      if (!startTimeRef.current) {
        startTimeRef.current = moment(values.startTime);
      }
      values.endTime = startTimeRef.current
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss");
    }
    if (!values.startTime) {
      const now = moment(new Date());
      values.startTime = now.startOf("day").format("YYYY-MM-DD HH:mm:ss");
      values.endTime = now.endOf("day").format("YYYY-MM-DD HH:mm:ss");
    }
    setStartTime(moment(values.startTime));
    const data = await get({
      url: Api.toolQueryLogList,
      params: {
        pageSize: pagination.pageSize,
        pageIndex: pagination.current,
        ...values,
      },
    });
    data.data.list = data.data.list.map((a) => a.fieldLogObjDTO);
    data.data.list.forEach((a) => {
      a.forEach((item) => {
        item[item.name] = item.name;
      });
    });
    return {
      dataSource: data.data.list,
      pageSize: data.data.pageSize,
      total: data.data.total,
      current: data.data.pageIndex,
    };
  };
  const { form, table, trigger } = useFormTableQuery(service, {
    pagination: { pageSize: 20, showSizeChanger: true },
  });
  useEffect(() => {
    getWdList();
    getOptions();
  }, []);
  return (
    <div>
      <SchemaForm {...form} inline className="form-wrap" actions={action}>
        <Field
          type="string"
          name="startTime"
          title="开始时间"
          x-component="DatePicker"
          x-component-props={{
            showTime: true,
            onChange(data) {
              if (data) {
                const momentData = moment(data);
                // 如果从无值到有值，需要取00:00:00
                // 如果新的值跟之前的值日期不同，需要取00:00:00
                if (
                  !preStartTime ||
                  !momentData.isSame(moment(preStartTime), "day")
                ) {
                  data = momentData.startOf("day");
                }
              }
              preStartTime = data;
              action.setFieldValue(
                "startTime",
                data ? data.format("YYYY-MM-DD HH:mm:ss") : null
              );
              action.setFieldValue("endTime", null);
              setStartTime(data);
              setEndTime(undefined);
              startTimeRef.current = data;
            },
          }}
        />
        <Field
          type="string"
          name="endTime"
          title="结束时间"
          x-component="DatePicker"
          x-component-props={{
            showTime: true,
            disabled: !startTime,
            onChange(data) {
              console.log(preEndTime, data, "preEndTime");
              if (data) {
                const momentData = moment(data);
                // 如果从无值到有值，需要取23:59:59
                // 如果新的值跟之前的值日期不同，需要取00:00:00
                if (
                  !preEndTime ||
                  !momentData.isSame(moment(preEndTime), "day")
                ) {
                  data = momentData.endOf("day");
                }
              }
              preEndTime = data;
              action.setFieldValue(
                "endTime",
                data ? data.format("YYYY-MM-DD HH:mm:ss") : null
              );
              setEndTime(data);
            },
            disabledDate: (data) => {
              // 历史问题：startTimeRef 在未进行查询的时候是无值的，因此清空结束时间不点提交的话，就没办法去再次选择结束时间了
              // 修改时间：2022-10-19 如果startTimeRef.current无值，从action中获取表单的值
              let startTime = startTimeRef.current;
              if (!startTime) {
                startTime = moment(action.getFieldValue("startTime"));
              }
              if (startTime) {
                return !startTime.isSame(data, "day");
              }
              return true;
            },
            disabledTime: (data) => {
              const startTime = startTimeRef.current;
              const getArr = (end) => {
                const result = [];
                for (let i = 0; i < end; i++) {
                  result.push(i);
                }
                return result;
              };
              if (startTime && data) {
                const startTimeObj = startTime.toObject();
                const nowTimeObj = data.toObject();
                const sameHours = startTimeObj.hours === nowTimeObj.hours;
                const sameMinutes =
                  startTimeObj.hours === nowTimeObj.hours &&
                  startTimeObj.minutes === nowTimeObj.minutes;
                const obj = {
                  disabledHours: (a) => getArr(startTimeObj.hours),
                  disabledMinutes: () =>
                    (sameHours ? getArr(startTimeObj.minutes) : []),
                  disabledSeconds: () =>
                    (sameMinutes ? getArr(startTimeObj.seconds) : []),
                };
                return obj;
              }
              return true;
            },
          }}
        />
        <Field
          type="string"
          name="logId"
          title="logId"
          x-component="Input"
          x-component-props={{ placeholder: "请输入logId", allowClear: true }}
        />
        <Field
          type="string"
          name="location"
          title="地区维度"
          x-component="Select"
          x-component-props={{
            dataSource: wdList.location,
            placeholder: "请选择地区维度",
            allowClear: true,
          }}
        />
        <Field
          type="string"
          name="channel"
          title="来源渠道"
          x-component="Select"
          x-component-props={{
            dataSource: channel,
            placeholder: "请选择来源渠道",
            allowClear: true,
          }}
        />
         <Field
            type="string"
            name="personalmc"
            title="个人名称"
            x-component="Input"
            x-component-props={{
                placeholder: "请输入个人名称",
                allowClear: true,
            }}
        />
        <Field
            type="string"
            name="yhmc"
            title="企业名称"
            x-component="Input"
            x-component-props={{
                placeholder: "请输入企业名称",
                allowClear: true,
            }}
        />
        <Field
            type="string"
            name="agencymc"
            title="机构名称"
            x-component="Input"
            x-component-props={{
                placeholder: "请输入机构名称",
                allowClear: true,
            }}
        />
        <FormButtonGroup>
          <Submit style={{ marginRight: 10 }} />
          <Reset />
        </FormButtonGroup>
      </SchemaForm>
      <Table
        className="access-log-table"
        {...table}
        columns={columns}
        scroll={{ x: 1727 }}
        bordered={true}
      />
      <Modal
        visible={modalVisible}
        title="日志详情"
        className="online-log-detail-modal"
        onCancel={() => {
          setModalVisible(false);
        }}
        onOk={() => {
          setModalVisible(false);
        }}
      >
        <div className="online-log-detail">
          {Array.isArray(currentLog) &&
            currentLog.map((item) => {
              return (
                <div className="log-detail-item">
                  <div className="label">{item.name}：</div>
                  <div className="value">{item.value}</div>
                </div>
              );
            })}
        </div>
      </Modal>
    </div>
  );
}
