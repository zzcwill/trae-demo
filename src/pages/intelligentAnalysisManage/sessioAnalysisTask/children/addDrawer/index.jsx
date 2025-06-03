/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-03-01 14:06:52
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-05-26 16:48:56
 * @FilePath: /askone-manage-pc/src/pages/intelligentAnalysisManage/sessioAnalysisTask/children/addDrawer/index.jsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

import React, { useEffect, useState, useCallback } from "react";
import { Drawer, Button, Input, message, Modal } from "dpl-react";
import moment from "moment";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import FormTitle from "@/components/FormTitle";
import useDictList from "@/hooks/useDictList";
import EmployeeSearch from "@/pages/employeeManage/agentManage/components/employeeSearch";
import { callcenterEnumOptionType, olhelpEnumOptionType, workGroupType } from "@/const/config";
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import CallCenterManageConfig from '@/requestApi/callcentermanage/config';
import { galaxyConfig } from "@/utils";
import { uForm } from "dora";
import "./index.scss";

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};

const TaskStartTimeEnTypeSpecific = 'specific';
const TaskTypeInTime = 'intime'; // 实时分析
const TaskTypeOffline = 'offline'; // 离线分析
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  FormEffectHooks,
  createFormActions,
  FormSlot,
  Row,
  Col,
} = uForm;
const { onFieldValueChange$ } = FormEffectHooks;
const actions = createFormActions();
const dateFormat = "YYYY-MM-DD HH:mm:ss";

const CustomTextArea = (props) => {
  const { value, onChange } = props;
  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    // reg只允许输入数字以及;分隔符符号
    const reg = /^[\d/\n]*$/;
    if (reg.test(inputValue) || inputValue === '') {
      onChange(inputValue);
    }
  };

  return (
    <Input.TextArea
      {...props}
      onChange={handleChange}
    />
  );
};

const openDownloadUrl = (errorCheckId) => {
  window.open(CallCenterManageConfig.getErrorExport.baseURL + CallCenterManageConfig.getErrorExport.url +`?checkId=${errorCheckId}`)
}

const defaultValues = {
  taskType: TaskTypeOffline,
  specificFmttVO: ["aliyun","qwen-max"],
  taskStartTimeEnType: "immediate",
  selectChatType: "1",
  // consultStartTime默认是前一天的00:00:00-23:59:59
  consultStartTime: [
    moment().subtract(1, "days").startOf("day").format(dateFormat),
    moment().subtract(1, "days").endOf("day").format(dateFormat),
  ],
}
function AddDrawer(props) {
  const { open, onOpenChange, cancelClick, submitClick } = props;
  const [detail, setDetail] = useState(defaultValues);
  const [planList, setPlanList] = useState([]); // 选择的方案-全量
  const [brandList, setBrandList] = useState([]); // 产品列表
  const [modelList, setModelList] = useState([]); // 大模型列表
  const [locationList, setLocationList] = useState([]); // 地区列表
  const [onlineGroupList, setOnlineGroupList] = useState([]); // 在线业务组
  const [taskType, setTaskType] = useState(defaultValues.taskType); // 任务类型
  const [taskStartTimeEnType, settaskStartTimeEnType] = useState(defaultValues.taskStartTimeEnType); // 任务开启时间
  const [selectChatType, setSelectChatType] = useState("1"); // 选择会话类型
  const [loading, setLoading] = useState(false); // 防止多次提交
  const [errorCheckId, setErrorCheckId] = useState(); // 错误文件id
  
  const [
      businessCenterList, 
      satisfactionEvaluationList, 
      appIdList,
      isSatisfiedList,
    ] = useDictList(
    [
      callcenterEnumOptionType.region_company_code,
      callcenterEnumOptionType.satisfaction_evaluation_code,
      callcenterEnumOptionType.smart_chat_analysis_specific_fmtt_app_id,
      callcenterEnumOptionType.feedback_solution_option_config
    ],
    Api.getEnumOption,
  );

  const requestPlanList = async () => {
    const res = await post({
      url: Api.getIntelligentAnalysisManageSessionAnalysisList,
      data: {
        pageSize: 0,
        pageIndex: 1,
        publishStatus: "published",
      },
    });
    if (res.success) {
      const newList = res?.data?.list?.map((item) => {
        return {
          label: item.smartChatAnalysisPlanName, // 方案名称
          value: item.planId, // 方案id
          planSnapshotId: item.planSnapshotId, // 方案快照id
        };
      });
      setPlanList(newList || []);
    }
  };

  const requestModelList = async () => {
    const res = await get({
      url: Api.getAnalysisTaskConfigList,
    });
    if (res.success) {
      const step = (arr) => {
        arr.forEach((item) => {
          item.value = item.vendor.code;
          item.label = item.vendor.name;
          if (item.modelList) {
            if (item.modelList.length === 0) {
              delete item.modelList;
            } else {
              const children = [];
              item.modelList.forEach((model) => {
                children.push({
                  value: model.code,
                  label: model.name,
                });
              });
              item.children = children;
            }
          }
        });
      };
      step(res.data);

      setModelList(res?.data || []);
    }
  };

    /**
   * 获取业务组
   */
    const getWorkGroupList = async (type) => {
      const res = await get({
        url: Api.getWorkGroupList,
        params: {
          type,
        },
      });
      if (res.success) {
        const data = res.data;
        if (type === workGroupType.online) {
          setOnlineGroupList(data);
        }
      } else {
        message.error(res.message);
      }
    };

  const requestCommonList = async () => {
    const res = await get({
      url: Api.getCommonDimensionList,
      params: {
        typeList: ["brand", "location"].join(","),
      },
    });
    if (res.success) {
      res?.data?.forEach((item) => {
        if (item.type === "brand") {
          setBrandList(
            item.dimensionParamList.map((item) => {
              return {
                label: item.name,
                value: item.value,
              };
            })
          );
        } else if (item.type === "location") {
          setLocationList(
            item.dimensionParamList.map((item) => {
              return {
                label: item.name,
                value: item.value,
              };
            })
          );
        }
      });
    }
  };

  /**
 * 联动
 */
  const effectsFunc = () => {
    const { setFieldState, getFieldValue } = createFormActions();
    onFieldValueChange$("taskType").subscribe(({ value }) => {
      setFieldState("selectChatType", (state) => {
        state.value = "1" // 默认按条件筛选
      });
      if (value === TaskTypeOffline) {
        setFieldState("consultStartTime", (state) => {
          state.value = defaultValues.consultStartTime
        });
      } else if(value === TaskTypeInTime){ // 切到实时分析
        setFieldState("consultStartTime", (state) => {
          const consultStartTime = getFieldValue('consultStartTime');
          state.value = [moment().format(dateFormat), consultStartTime?.[1]];
        });
      }
    });
    onFieldValueChange$("selectChatType").subscribe(({ value }) => {
      setFieldState("*(consultStartTime,locationList,brandList,agentUserIdList,groupIdList,responsibleManagerTrueIdList,consultBusinessCenterList,solvedTypeList,satisfiedCodeList)", (state) => {
        state.visible = value === "1";
      });
    });

    onFieldValueChange$("appointStartTime").subscribe(({ value }) => {
      // setFieldState("*(consultOpenType,landingPageId)", (state) => {
      //   state.visible = otherVisibleFlag;
      // });
      const taskType = getFieldValue('taskType');
      if (taskType === TaskTypeInTime) { 
        setFieldState("consultStartTime", (state) => {
          const consultStartTime = getFieldValue('consultStartTime');
          const taskStartTimeEnType = getFieldValue("taskStartTimeEnType");
          if (taskStartTimeEnType === TaskStartTimeEnTypeSpecific) {
            state.value = [value, consultStartTime?.[1]];
          }
        });
      }
    });
    onFieldValueChange$("appointEndTime").subscribe(({ value }) => {
      const taskType = getFieldValue('taskType');
      if (taskType === TaskTypeInTime) {
        setFieldState("consultStartTime", (state) => {
          const appointStartTime = getFieldValue('appointStartTime');
          const consultStartTime = getFieldValue('consultStartTime');
          state.value = [appointStartTime || consultStartTime?.[0], value];
        });
      }
    });
    onFieldValueChange$("taskStartTimeEnType").subscribe(({ value }) => {
      const taskType = getFieldValue('taskType');
      if (taskType === TaskTypeInTime && value === 'immediate') {  // 立即执行的咨询开始时间设置成当前时间
        setFieldState("consultStartTime", (state) => {
          const consultStartTime = getFieldValue('consultStartTime');
          state.value = [moment().format(dateFormat), consultStartTime?.[1]];
        });
      }
    });
  };
  
  const submitPost = async (data) => {
    setLoading(true);
    let res = await post({ url: Api.postSmartChatAnalysisTaskSave, data });
    setLoading(false)
    if (res?.success) {
      message.success("新增成功");
      resetStatus();
      submitClick?.();
    } else {
      message.error(res.message);
    }
  };

  const confirmHandler = () => {
    actions.submit().then(async (value) => {
      console.log("values", value.values);
      // 判断appointStartTime要小于appointEndTime，否则警告提示
      const { 
        name, 
        planId, 
        taskType,
        taskStartTimeEnType, 
        appointStartTime,
        appointEndTime,
        consultMsgIdList, 
        locationList, 
        brandList, 
        agentUserIdList,
        responsibleManagerTrueIdList,
        consultBusinessCenterList,
        groupIdList,
        solvedTypeList,
        satisfiedCodeList,
        consultStartTime = [],
        fmttAppId,
        specificFmttVO,
      } = value.values;
      const newMsgIdList = consultMsgIdList?.split("\n").filter((item) => item);
      setErrorCheckId('');
      if (taskType === TaskTypeInTime && taskStartTimeEnType === TaskStartTimeEnTypeSpecific && appointStartTime >= appointEndTime) {
        return message.error('指定结束时间需大于指定开启时间');
      }
      if (consultStartTime[0] > consultStartTime[1]) {
        return message.error('咨询结束时间需大于咨询开启时间');
      }
      const currentTime = moment();
      // // 实时分析咨询开始时间要大于当前时间
      // if (taskType === TaskTypeInTime && currentTime.isAfter(moment(consultStartTime[0]))) {
      //   return message.error('咨询开始时间需大于当前时间');
      // }
      // 离线分析咨询结束时间要小于当前时间
      if (taskType === TaskTypeOffline && currentTime.isBefore(moment(consultStartTime[1]))) {
        return message.error('咨询结束时间需小于当前时间');
      }
      
      if (selectChatType === '2' && newMsgIdList?.length === 0) {
        return message.error('请输入有效会话ID');
      }
      const plan = planList.find((item) => item.value === planId) || {};
      const json = {
        locationList,
        brandList,
        agentUserIdList,
        groupIdList,
        responsibleManagerTrueIdList,
        consultBusinessCenterList,
        solvedTypeList,
        satisfiedCodeList,
        consultStartTime: consultStartTime[0],
        consultEndTime: consultStartTime[1],
      }
      // json中的数组值是空的不传
      for (let key in json) {
        if (Array.isArray(json[key]) && json[key].length === 0) {
          delete json[key];
        } 
      }
      const params = {
        name,
        planId,
        planName: plan?.label,
        planSnapshotId: plan?.planSnapshotId,
        selectChatType,
        filterConditionJson: selectChatType === '1' ? JSON.stringify(json) : undefined,
        consultMsgIdList: selectChatType === '2' ? newMsgIdList : undefined,
        taskType,
        taskStartTimeEnType,
        appointStartTime: taskStartTimeEnType === TaskStartTimeEnTypeSpecific ? appointStartTime : undefined,
      };
      if (taskType === TaskTypeInTime) {
        params.appointEndTime = appointEndTime;
      }
      params.fmttAppId = fmttAppId;
      params.fmttVendorEnCode = specificFmttVO[0];
      params.fmttModelEnCode = specificFmttVO[1];
      console.log('params', json, params);

      // 离线任务保存前校验
      if (taskType === TaskTypeOffline) {
        const checkRes = await CallCenterManageApi.postSaveCheck(params);
        if (!checkRes.success) {
          return message.error(checkRes.message);
        } else {
          const { isCheckSuccess, analysisMsgIdNum, checkId } = checkRes.data;
          if (isCheckSuccess) {
            Modal.confirm({
              title: "提示",
              width: 400,
              content: (
                <div
                >本次待分析数据共【<span style={{ color: 'red'}}>{analysisMsgIdNum}</span>】条</div>
              ),
              onOk: async () => {
                params.analysisMsgIdNum = analysisMsgIdNum;
                submitPost(params);
              },
              onCancel: () => {},
            });
          } else {
            message.error('请下载错误文件查看错误详情');
            setErrorCheckId(checkId);
          }
        }
      } else {
        submitPost(params);
      }
    });
  };
  const resetStatus = () => {
    actions.reset()
    setTaskType(defaultValues.taskType);
    settaskStartTimeEnType(defaultValues.taskStartTimeEnType);
    setSelectChatType(defaultValues.selectChatType);
    setErrorCheckId('');
    setDetail({
      ...defaultValues,
    })
  }
  const cancelHandler = () => {
    resetStatus();
    cancelClick && cancelClick();
  };

  useEffect(() => {
    requestPlanList();
    requestModelList();
    requestCommonList();
    getWorkGroupList(workGroupType.online);
    if (galaxyConfig.sessioAnalysisTaskSpecificFmttVO) {
      actions.setFieldValue('specificFmttVO', galaxyConfig.sessioAnalysisTaskSpecificFmttVO)
    }
  }, []);
  return (
    <div className="sessioAnalysis-task-add">
      <Drawer
        className="task-add-drawer"
        open={open}
        showMask={true}
        maskClosable={false}
        width={900}
        title="新增会话分析任务"
        onOpenChange={(open) => {
          resetStatus();
          onOpenChange(open);
        }}
        onClose={cancelHandler}
      >
        <div className="content-view">
          <SchemaForm
            actions={actions}
            effects={effectsFunc}
            initialValues={detail}
            components={{ EmployeeSearch, CustomTextArea }}
          >
            <FormSlot>
              <FormTitle title="基本信息" />
            </FormSlot>
            <Field
              {...formItemLayout}
              type="string"
              title="任务名称"
              name="name"
              x-component="Input"
              x-component-props={{ 
                placeholder: "请输入不超过50字的方案名称",
                maxLength: 50,
              }}
              x-rules={[
                { required: true, message: "请输入不超过50字的方案名称" },
              ]}
            />
            <Field
              {...formItemLayout}
              title="任务类型"
              name="taskType"
              x-component="RadioGroup"
              x-component-props={{
                options: [
                  { label: "离线分析", value: TaskTypeOffline },
                  { label: "实时分析", value: TaskTypeInTime },
                ],
                onChange: (e) => {
                  setTaskType(e.target.value);
                  setSelectChatType("1"); // 选择会话类型默认按条件筛选
                },
              }}
              x-rules={[{ required: true, message: "请选择" }]}
            />
            <Field
              {...formItemLayout}
              title="任务开启时间"
              name="taskStartTimeEnType"
              x-component="RadioGroup"
              x-component-props={{
                options: [
                  { label: "立即执行", value: "immediate" },
                  { label: "指定开启时间", value: "specific" },
                ],
                onChange: (e) => {
                  settaskStartTimeEnType(e.target.value);
                },
              }}
              x-rules={[{ required: true, message: "请选择" }]}
            />
            {taskStartTimeEnType === TaskStartTimeEnTypeSpecific && (
              <Field
              {...formItemLayout}
              name="appointStartTime"
              title="指定开启时间"
              x-component="DatePicker"
              x-component-props={{
                style: { 
                  width: "100%",
                },
                format: dateFormat,
                placeholder: "请选择",
                showTime: true,
                allowClear: true,
                disabledDate: (data) => {
                  // 日期不小于今天
                  return data && data < moment().startOf("day");
                },
                // 时间不小于当前时间
                disabledTime: (data) => {
                  if (data && data.isSame(moment().startOf("day"), "day")) {
                    // console.log('data.hour()', data.hour(), moment().hour());
                    return {
                      disabledHours: () => {
                        return Array.from(
                          { length: moment().hour() },
                          (v, index) => index
                        );
                      },
                      disabledMinutes: () => {
                        if (data.hour() > moment().hour()) {
                          return [];
                        }
                        return Array.from(
                          { length: moment().minute() },
                          (v, index) => index
                        );
                      },
                    };
                  }
                  return false;
                },
              }}
              x-rules={[{ required: true, message: "请选择任务开启时间" }]}
              />
            )}
            {taskType === TaskTypeInTime && (
              <Field
              {...formItemLayout}
              name="appointEndTime"
              title="指定结束时间"
              x-component="DatePicker"
              x-component-props={{
                style: {
                  width: "100%",
                },
                format: dateFormat,
                placeholder: "请选择",
                showTime: true,
                allowClear: true,
                disabledDate: (data) => {
                  // 日期不小于今天
                  return data && data < moment().startOf("day");
                },
                // 时间不小于当前时间
                disabledTime: (data) => {
                  if (data && data.isSame(moment().startOf("day"), "day")) {
                    // console.log('data.hour()', data.hour(), moment().hour());
                    return {
                      disabledHours: () => {
                        return Array.from(
                          { length: moment().hour() },
                          (v, index) => index
                        );
                      },
                      disabledMinutes: () => {
                        if (data.hour() > moment().hour()) {
                          return [];
                        }
                        return Array.from(
                          { length: moment().minute() },
                          (v, index) => index
                        );
                      },
                    };
                  }
                  return false;
                },
              }}
              x-rules={[{ required: true, message: "请选择任务结束时间" }]}
              />
            )}
            <Field
              {...formItemLayout}
              name="planId"
              title="选择分析方案"
              x-component="Select"
              x-component-props={{
                placeholder: "请输入会话分析方案名称关键字",
                allowClear: true,
                dataSource: planList,
                showSearch: true,
                optionFilterProp: "children",
              }}
              x-rules={[{ required: true, message: "请选择分析方案" }]}
            />
            <Field
              {...formItemLayout}
              name="specificFmttVO"
              title="指定大模型" 
              x-component="Cascader"
              x-component-props={{
                allowClear: true,
                placeholder: "请选择指定大模型",
                options: modelList,
                showSearch: true,
                // changeOnSelect: true,
                // style: {
                //   width: 250,
                // },
              }}
              x-rules={[{ required: true, message: "请选择指定大模型" }]}
            /> 
            <Field
              {...formItemLayout}
              name="fmttAppId"
              title="调用appID" 
              x-component="Select"
              x-component-props={{
                placeholder: "请选择",
                allowClear: true,
                dataSource: appIdList,
                showSearch: true,
                optionFilterProp: "children",
              }}
              x-rules={[{ required: true, message: "请选择调用appID" }]}
            />            
            <FormSlot>
             <div className="custom-divider"></div>
            </FormSlot>
            <FormSlot>
              <FormTitle title="选择会话" />
            </FormSlot>
            <Field
              {...formItemLayout}
              title="选择会话"
              name="selectChatType"
              x-component="RadioGroup"
              x-component-props={{
                options: taskType === TaskTypeInTime ? [
                  { label: "按条件筛选", value: "1" },
                  { label: "自定义数据源", value: "3" },
                ] : [
                  { label: "按条件筛选", value: "1" },
                  { label: "指定会话ID", value: "2" },
                ],
                onChange: (e) => {
                  setSelectChatType(e.target.value);
                }
              }}
              x-rules={[{ required: true, message: "请选择" }]}
            />
            <Field
                {...formItemLayout}
                name="consultStartTime"
                title="咨询时间"
                x-component="RangePicker"
                x-component-props={{
                  style: {
                    width: "100%",
                  },
                  disabled: taskType === TaskTypeInTime,
                  showTime: true,
                  format: dateFormat,
                  disabledDate: (data) => {
                    // console.log('data', data);
                    
                    if (data) {
                      // 三年前的不可选
                      if (data < moment().subtract(3, "years")) {
                        return true;
                      }
                      // 今天及以后的不可选 
                      if (data.isAfter(moment()) || data.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")){
                        return true;
                      }
                    }
                    return false;
                  },
                  defaultValue: [
                    moment("00:00:00", "HH:mm:ss"),
                    moment("23:59:59", "HH:mm:ss"),
                  ],
                }}
                x-rules={[{ required: true, message: "请选择咨询时间" }]}
              />
            <Field
              {...formItemLayout}
              name="locationList"
              title="地区维度" 
              x-component="Select"
              x-component-props={{
                placeholder: "请选择",
                allowClear: true,
                dataSource: locationList,
                showSearch: true,
                optionFilterProp: "children",
                mode: "multiple",
              }}
            />
            <Field
              {...formItemLayout}
              name="brandList"
              title="产品维度"
              x-component="Select"
              x-component-props={{
                placeholder: "请选择",
                allowClear: true,
                dataSource: brandList,
                showSearch: true,
                optionFilterProp: "children",
                mode: "multiple",
              }}
            />
            <Field
              type="string"
              title="坐席账号"
              name="agentUserIdList"
              {...formItemLayout}
              x-component="EmployeeSearch"
              x-component-props={{
                onChange: (values, selecteItems) => {
                  // setSelectUserItems(selecteItems);
                },
                other: {
                  mode: "multiple",
                  allowClear: true,
                  showSearch: true,
                  placeholder: "请输入员工账号",
                  valueFarmat: {
                    value: 'userId',
                    label: 'userName',
                  }
                },
              }}
            />
            <Field
              type="string"
              title="技能组"
              name="groupIdList"
              {...formItemLayout}
              x-component="Select"
              x-component-props={{
                placeholder: "请选择",
                dataSource: onlineGroupList,
                allowClear: true,
                showSearch: true,
                optionFilterProp: "children",
                multiple: true,
                maxTagCount: 1,
                maxTagTextLength: 6,
                optionFormat: {
                  label: "name",
                  value: "id",
                },
              }}
            />              
            <Field
              type="string"
              title="客户经理"
              name="responsibleManagerTrueIdList"
              {...formItemLayout}
              x-component="EmployeeSearch"
              x-component-props={{
                other: {
                  allowClear: true,
                  showSearch: true,
                  placeholder: "请输入员工账号",
                  mode: "multiple",
                  valueFarmat: {
                    value: 'trueId',
                    label: 'userName',
                  }
                },
              }}
            />
            <Field
              type="string"
              title="所属经营中心"
              name="consultBusinessCenterList"
              {...formItemLayout}
              x-component="Select"
              x-component-props={{
                placeholder: "请选择",
                dataSource: businessCenterList,
                allowClear: true,
                showSearch: true,
                optionFilterProp: "children",
                multiple: true,
                maxTagCount: 1,
                maxTagTextLength: 6,
              }}
            />
            <Field
              {...formItemLayout}
              name="solvedTypeList"
              title="是否解决"
              x-component="Select"
              x-component-props={{
                placeholder: "请选择",
                allowClear: true,
                mode: "multiple",
                dataSource: isSatisfiedList,
              }}
            />
            <Field
              {...formItemLayout}
              name="satisfiedCodeList"
              title="满意程度"
              x-component="Select"
              x-component-props={{
                placeholder: "请选择",
                allowClear: true,
                mode: "multiple",
                dataSource: satisfactionEvaluationList,
              }}
            />
            {selectChatType === "2" &&
            <>
              <Row>
                <Col offset={7} span={15}>
                  <Field
                    type="string"
                    name="consultMsgIdList"
                    x-component="CustomTextArea"
                    title=""
                    x-component-props={{
                      placeholder: "请输入指定会话ID，会话ID之间换行",
                      autoComplete: "off",
                      autosize: { minRows: 4, maxRows: 20 },
                    }}
                    x-rules={[
                      { required: true, message: "请输入会话ID" },
                    //   (value) => {
                    //     console.log('value', value);
                    //     return {};
                    //     // if(detail.displayNum > value?.length) {//这边不能用detail.questionList来判断，内部值变化不会触发
                    //     //     return {
                    //     //         type: "error",
                    //     //         message: '展示问题数不可大于总自定义问题数',
                    //     //     };
                    //     // }
                    // },
                    ]}
                  />
                </Col>
              </Row>
              {errorCheckId && 
                <Row>
                  <Col offset="19">                 
                    <FormSlot>
                      <span style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => {openDownloadUrl(errorCheckId)}}
                      >
                        下载错误文件
                      </span>
                    </FormSlot></Col>
                </Row>
              }
            </>
            }
          </SchemaForm>
          <div className="app-buttons app-buttons-center">
            <Button
              className="app-button"
              type="primary"
              onClick={confirmHandler}
              loading={loading}
            >
              保存
            </Button>
            <Button className="app-button" onClick={cancelHandler}>
              取消
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default AddDrawer;
