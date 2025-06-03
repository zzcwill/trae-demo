import React from 'react'
import { message, Select as DPLSelect } from 'dpl-react'

export default function Select(props) {
  const uid = Math.random();
  const { maxCount, maxMssage = '超过最大数量限制，请重新选择', onChange, mode } = props;

  const multiple = mode === 'multiple';

  const onChangeHandler = (value, ...rest) => {
    if (multiple && maxCount !== undefined) {
      if (value?.length > maxCount) {
        message.warn(maxMssage);
        return false;
      }
    }
    onChange?.(value, ...rest);
  }

  return (
    <div id={uid}>
      <DPLSelect
        {...props}
        onChange={onChangeHandler}
        getPopupContainer={() => document.getElementById(uid)}
      >
        {props?.dataSource?.map(d => {
          return (
            <DPLSelect.Option
              key={d.value}
              value={d.value}
            >
              {d.label}
            </DPLSelect.Option>
          )
        })}
      </DPLSelect>
    </div>
  )
}
