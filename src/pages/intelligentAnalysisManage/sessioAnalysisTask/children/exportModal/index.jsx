/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-03-01 14:06:52
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-09-23 16:30:56
 * @FilePath: /askone-manage-pc/src/pages/intelligentAnalysisManage/sessioAnalysisTask/children/exportModal/index.jsx
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */

import React, { useEffect, useState, useRef } from "react";
import { Modal, message } from "dpl-react";
import moment from "moment";
import Api from "@/request/api-callcentermanage";
import { uForm } from "dora";
import "./index.scss";

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormSlot,
  Row,
  Col,
} = uForm;
const actions = createFormActions();
const dateFormat1 = "YYYY-MM-DD";
const dateFormat = "YYYY-MM-DD HH:mm:ss";

function ExportModal(props) {
  const { open, detail, cancelClick, submitClick } = props;
  console.log('detail', detail);
  
  const [loading, setLoading] = useState(false); // 防止多次提交

  const confirmHandler = () => {
    if (loading) {
      return;
    }
    actions.submit().then(async (value) => {
      setLoading(true);
      console.log("values", value.values);
      const { consultTime } = value.values;
      window.open(Api.getSmartChatAnalysisTaskExport + `?taskId=${detail.id}&consultStartTime=${consultTime[0]}&consultEndTime=${consultTime[1]}`);
      submitClick();
      resetStatus();
      setLoading(false);
    });
  };
  const resetStatus = () => {
    actions.reset()
  }
  const cancelHandler = () => {
    resetStatus();
    cancelClick && cancelClick();
  };

  useEffect(() => {

  }, []);
  return (
    <div className="sessioAnalysis-task-add">
      <Modal 
        visible={open}
        className="task-add-drawer"
        width={600}
        title="任务结果"
        onCancel={cancelHandler}
        onOk={confirmHandler}
      >
        <SchemaForm
          actions={actions}
          initialValues={{}}
        >
            <Field
              {...formItemLayout}
              name="consultTime"
              title="咨询时间"
              x-component="RangePicker"
              x-component-props={{
                style: {
                  width: "100%",
                },
                showTime: true,
                format: dateFormat,
                disabledDate: (data) => {
                  // 只有detail.appointStartTime 跟 detail.appointEndTime内的日期可选,包含当天
                  if (data) {
                    // 开始之前的不可选
                    if (detail.appointStartTime && data.format(dateFormat1) < moment(detail.appointStartTime).format(dateFormat1)) {
                      return true;
                    }
                    // 今天及以后的不可选 
                    if (detail.appointEndTime && data.format(dateFormat1) > (moment(detail.appointEndTime).format(dateFormat1))){
                      return true;
                    }
                  }
                  return false;
                },
                // disabledTime: (data, type) => {
                //   if (!data || data.length === 0) {
                //     return false;
                //   }
                //   // console.log('disabledTime-data', data, type);
                //   if (type === 'start') {
                //     const startDate = moment(detail.appointStartTime, dateFormat);
                //     const chooseDate = data[0] || data; // 这边有可能是数组有可能是单个
                //     // 如果跟开始时间比较是同一天
                //     if (chooseDate && chooseDate.isSame(startDate, 'day')) {
                //       return {
                //         disabledHours: () => {
                //           return Array.from(
                //             { length: startDate.hour() },
                //             (v, index) => index
                //           );
                //         },
                //         disabledMinutes: () => {
                //           if (chooseDate.hour() > startDate.hour()) {
                //             return [];
                //           }
                //           return Array.from(
                //             { length: startDate.minute() },
                //             (v, index) => index
                //           );
                //         },
                //         // 禁用秒数
                //         disabledSeconds: () => {
                //           if (chooseDate.hour() > startDate.hour()) {
                //             return [];
                //           }
                //           if (chooseDate.minute() > startDate.minute()) {
                //             return [];
                //           }
                //           return Array.from(
                //             { length: startDate.second() },
                //             (v, index) => index
                //           );
                //         },
                //       };
                //     }
                //   }
                //   if (type === 'end') {
                //     const endDate = moment(detail.appointEndTime, dateFormat);
                //     // 如果跟结束时间比较是同一天
                //     if (data[1] && data[1].isSame(endDate, 'day')) {
                //       return {
                //         disabledHours: () => {
                //           return range(endDate.hour() + 1, 24)
                //         },
                //         disabledMinutes: () => {
                //           if (data[1].hour() < endDate.hour()) {
                //             return [];
                //           }
                //           return range(endDate.minute() + 1, 60);
                //         },
                //         // 禁用秒数
                //         disabledSeconds: () => {
                //           if (data[1].hour() < endDate.hour()) {
                //             return [];
                //           }
                //           if (data[1].minute() < endDate.minute()) {
                //             return [];
                //           }
                //           return range(endDate.second() + 1, 60);
                //         },
                //       };
                //     }
                //   }
                //   return false
                // }
              }}
              x-rules={[{ required: true, message: "请选择咨询时间" }]}
            />
        </SchemaForm>
      </Modal>
    </div>
  );
}

export default ExportModal;
