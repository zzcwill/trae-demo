import { InputNumber, Switch } from 'dpl-react';
import React from 'react'

const millSecondsFormat = (value, type) => {
  if (!value && value !==0) return '';
  if (type === -1) {
    return Math.floor(value * 1000);
  } else {
    return Math.round((value / 1000 + Number.EPSILON) * 10) / 10;
  }
}

export default function RobotDelaySend(props) {
  const { value = {}, onChange, disabled } = props;

  const onChangeHandler = (obj = {}) => {
    onChange?.({
      ...value,
      ...obj
    })
  }

  return (
    <div className='robot-delay-send'>
      <Switch checked={value.delayTransmitEnable === 'Y'} disabled={disabled} onChange={(val) => {
        const temp = {
          delayTransmitEnable: val ? 'Y' : 'N',
          delayTransmitMilliseconds: undefined
        };
        onChangeHandler(temp)
      }}></Switch>
      &nbsp;&nbsp;&nbsp;&nbsp;
      {value.delayTransmitEnable === 'Y' && <>
        发送延迟时间&nbsp;&nbsp;<InputNumber
          disabled={disabled}
          value={millSecondsFormat(value.delayTransmitMilliseconds)}
          min={0}
          max={99.9}
          precision={1}
          formatter={(val) => {
            console.log(val, 'format val');
            if (isNaN(val)) return '';
            if (!val) return val;
            if (val[val.length - 1] === '.') return val;
            const result = Math.floor(+val * 10) / 10;
            if (isNaN(result)) return '';
            return result;
          }}
          onChange={(val) => onChangeHandler({ delayTransmitMilliseconds: millSecondsFormat(val, -1)})}
        />秒。
      </>}
    </div>
  )
}
