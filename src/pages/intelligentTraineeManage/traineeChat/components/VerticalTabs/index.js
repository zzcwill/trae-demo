/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-04-14 15:46:01
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-04-22 18:54:32
 * @FilePath: /consult-ep-online-help/Users/daiyichao/Documents/Documents/askone-manage-pc/src/pages/intelligentTraineeManage/traineeChat/components/VerticalTabs/index.js
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState } from "react";
import debounce from "lodash/debounce";
import { TaskStatus } from '@/const/index'
import "./index.scss";

const TASK_UNBEGIN = "-1"
const VerticalTabs = ({ disabled, task = {}, caseList = [], value, onChange }) => {

  const handleTabChange = debounce((value) => {
    onChange(value)
  }, 500)

  return (
    <div className="vertical-tabs">
      <div className="top-intro-view">
        <div className="top-intro-view-title">
          待练案例列表
        </div>
        <div className="top-intro-view-text limit-two" title={task.taskName}>
        任务名称：{task.taskName}
        </div>
        <div className="top-intro-view-text limit-two" title={task.description}>
        任务创建人：{task.creatorName}
        </div>
        {task.description && (
          <div className="top-intro-view-text limit-for" title={task.description}>
          任务概述：{task.description}
          </div>
        )}
      </div>
      <div className="case-view">
        {caseList.map((item, index) => (
          <div
            key={index}
            className={`tab-item ${index === value ? 'tab-item-active' : ''} ${disabled || item.status === TaskStatus.notStart || item.status === TaskStatus.unFinish  ? 'tab-item-disabled' : ''}`}
            onClick={() =>  {
              if (disabled || item.status === TaskStatus.notStart || item.status === TaskStatus.unFinish) {
                return
              }
              handleTabChange(index)
            }}
          >
            <div className="num">{index+1}</div>{item.overview}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTabs;
