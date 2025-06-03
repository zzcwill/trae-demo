import { InputNumber, Switch } from 'dpl-react';
import React from 'react'
import './index.scss';

export default function LargeModelRecommend(props) {
  const { value = {}, onChange, disabled } = props;

  const onChangeHandler = (obj = {}) => {
    onChange?.({
      ...value,
      ...obj
    })
  }

  return (
    <div className='large-model-recommend'>
      <div>
        <span className="required">*</span>用户输入间隔&nbsp;&nbsp;<InputNumber
          disabled={disabled}
          value={value.inputInterval}
          min={0}
          max={99.9}
          precision={1}
          onChange={(val) => onChangeHandler({ inputInterval: val })}
        />&nbsp;&nbsp;秒以上，live800将用户发言传给税友
      </div>
      <div>
        <span className="required">*</span>坐席手动点击用户发言搜索智库内容时，需要将前&nbsp;&nbsp;<InputNumber
          disabled={disabled}
          value={value.packageNumber}
          min={0}
          max={99}
          precision={0}
          onChange={(val) => onChangeHandler({ packageNumber: val })}
        />&nbsp;&nbsp;条聊天记录一起组装发送。
      </div>
    </div>
  )
}
