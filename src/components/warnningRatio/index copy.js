import { Icon, InputNumber, message, Select, Switch } from 'dpl-react';
import { set } from 'lodash';
import React, { useEffect, useState } from 'react'
import './index.scss';

const renderDisabled = (alarmItemList, option) => {
  return alarmItemList?.some(item => item.alarmItemCode === option.value)
}

export default function WarnningRatio(props) {

  const { 
    hideAlarmItem = false, // 隐藏告警下拉选项
    hideAddDeleteBtn = false,  // 隐藏删除增加那妞
    showHeader = true, // 展示头部描述
    showConditions = true, // 展示告警条件列表
    title = '', // 头部左侧告警描述标题
    tip = '',  // 头部右侧告警提示
    value = {}, 
    dataSource = [], // 告警下啦选项
    onChange, 
    showLow = true, // 展示低于xx的值
    showHigh = true  // 展示高于xx的值
  } = props;

  const { alarmSwitchEnable = false, alarmItemList = [{}] } = (value || {});
  const [tempList, setTempList] = useState(alarmItemList?.map(item => item));

  const handleChange = (key, val) => {
    set(value, key, val);
    onChange?.({ ...value });
  }

  useEffect(() => {
    setTempList(alarmItemList?.map(item => item))
  }, [JSON.stringify(alarmItemList)])

  return (
    <div className='warnning-ratio'>
      {showHeader && <div className='header'>
        <span>{title}{title ? "：" : ""}</span>
        <span className='switch'><Switch size='small' checked={alarmSwitchEnable} onChange={(val) => handleChange('alarmSwitchEnable', val)} /></span>
        <span>{tip}</span>
      </div>}
      {showConditions && <div className='condition-box'>
        {alarmItemList.map((alarmItem, index) => {
          return <div className='condition' key={index}>
            {!hideAlarmItem && <span style={{ width: 200, display: 'inline-block' }}>
              <Select
                value={alarmItem.alarmItemCode}
                onChange={(val) => {
                  handleChange(`alarmItemList[${index}].alarmItemCode`, val);
                }}
                placeholder="请选择"
                showSearch
                filterOption="children"
              >
                {dataSource?.map((item) => {
                  return <Select.Option
                    value={item.value}
                    key={item.value}
                    disabled={renderDisabled(alarmItemList, item)}
                  >
                    {item.label}
                  </Select.Option>
                })}
              </Select>
            </span>}
            {/* 低于的值不得大于等于高于的值 */}
            {showLow && <span>
              接通率低于
              <InputNumber
                value={tempList[index]?.groupCallCompletingRateLowerThreshold}
                min={0}
                max={99}
                precision={0}
                onChange={(val) => {
                  tempList[index].groupCallCompletingRateLowerThreshold = val;
                  setTempList([...tempList])
                }}
                onBlur={(e) => {
                  handleChange(`alarmItemList[${index}].groupCallCompletingRateLowerThreshold`, e.target.value);
                }}
              />%，</span>}
            {showHigh && <span>
              {showLow ? "或" : ""}高于
              <InputNumber
                value={tempList[index]?.groupCallCompletingRateUpperThreshold}
                min={0}
                max={99}
                onChange={(val) => {
                  tempList[index].groupCallCompletingRateUpperThreshold = val;
                  setTempList([...tempList])
                }}
                onBlur={(e) => {
                  setTempList([...tempList])
                  handleChange(`alarmItemList[${index}].groupCallCompletingRateUpperThreshold`, e.target.value);
                }}
              />%，触发告警</span>}
            {!hideAddDeleteBtn && (
              <>
                <Icon
                  type="plus"
                  onClick={() => {
                    alarmItemList.splice(index + 1, 0, {})
                    tempList.splice(index + 1, 0, {});
                    setTempList([...tempList])
                    handleChange('alarmItemList', alarmItemList)
                  }}
                  style={{ marginLeft: 10, marginRight: 10, cursor: 'pointer' }}
                />
                <Icon
                  type="minus"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (alarmItemList.length <= 1) {
                      message.error('至少需要一条选项')
                      return
                    }
                    alarmItemList.splice(index, 1)
                    tempList.splice(index, 1)
                    setTempList([...tempList])
                    handleChange('alarmItemList', alarmItemList)
                  }} />
              </>)}
          </div>
        })}
      </div>}
    </div>
  )
}
