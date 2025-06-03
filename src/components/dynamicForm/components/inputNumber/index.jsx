import React from 'react'
import { Input as DPLInput } from 'dpl-react'

const numberRegx = /^(-|\+)?\d+\.?(\d+)?$/;
export default function InputNumber({
  onChange,
  precision,
  ...rest
}) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (!value || value.match(numberRegx)) {
      if (!value) {
        onChange?.('');
        return;
      }
      const dotIndex = value.indexOf('.');
      let tempValue = value;
      if (dotIndex > -1) {
        tempValue = tempValue.substring(0, dotIndex + precision + 1);
      }
      onChange?.(tempValue);
    }
  }
  const handleBlur = (e) => {
    const value = e.target.value;
    if (value && value[value.length - 1] === '.') {
      onChange?.(value.substring(0, value.length - 1));
    }
  }
  return (
    <DPLInput
      {...rest}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  )
}
