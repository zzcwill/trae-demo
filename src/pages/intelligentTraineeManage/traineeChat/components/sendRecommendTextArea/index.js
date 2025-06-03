/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2025-03-07 13:45:14
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2025-04-18 19:12:41
 * @FilePath: /askone-manage-pc/src/pages/intelligentTraineeManage/traineeChat/components/sendRecommendTextArea/index.js
 * @Description:
 *
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Input, Icon, message, Popover } from 'dpl2-proxy';
import classnames from 'classnames';
import { encodeForHTML } from '@/utils';
import { DialogueEventType } from '@/const/index';
import './index.scss';

const { TextArea } = Input;
const sendImgBlue = 'https://s.17win.com/snack/134/yqconsult-web-pc/send_blue.png';
const sendImgDisabled = 'https://s.17win.com/snack/134/yqconsult-web-pc/send_gray.png';
const sendStopImgBlue = 'https://s.17win.com/snack/134/yqconsult-web-pc/6069fa91fd674c838f488608e15d19ae.png';

export default function SendRecommendTextArea(props) {
  const { className, placeholder = '请输入内容', value, onChange, onClick, disabled } = props;

  const searchHander = (keyword = value, eventType = DialogueEventType.dialogue) => {
    let trimWord = keyword?.trim();
    trimWord = encodeForHTML(trimWord);
    // 如果输入了内容且内容只是空格，提示无效内容
    if (!trimWord) {
      message.error('请输入内容后再发送~');
      return;
    }
    // 若无内容、或者不可点击状态，直接返回、无效果
    if (!trimWord || disabled) return;
    onClick?.({
      eventType,
      question: trimWord,
    });
  };
  const handlerKeyDown = (e) => {
    if (e.key === 'Enter') {
      // shift+enter 或 ctrl+enter 或 command+enter 换行换行
      if (e.shiftKey || e.ctrlKey || e.metaKey) {
        if (e.ctrlKey || e.metaKey) {
          // 这两个手动换行处理
          onChange(`${e.target.value}\n`);
        }
        return;
      }
      // enter 发送
      e.preventDefault();
      searchHander(value, DialogueEventType.dialogue);
    }
  };

  const bodyClass = classnames({
    'send-recommend-text-area-box': true,
    [className]: className,
  });
  return (
    <div className={bodyClass}>
      <TextArea
        className="send-input"
        placeholder={placeholder}
        autosize={{ minRows: 1, maxRows: 3 }}
        value={value}
        maxLength={2000}
        onKeyDown={handlerKeyDown}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <div className="send-btn" onClick={() => searchHander(value, DialogueEventType.dialogue)}>
        <img src={disabled ? sendImgDisabled : sendImgBlue} className="send-img" alt="send" />
      </div>
    </div>
  );
}
