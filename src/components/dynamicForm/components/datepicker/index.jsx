import React, { useState, useMemo } from 'react';
import { DatePicker as DPLDatePicker } from 'dpl-react';
import moment from 'moment';

export default function DatePicker(props) {
  const realValue = useMemo(() => {
    if (!props.value) return undefined;
    return moment(props.value);
  }, [props.value]);
  const handleOnChange = (value) => {
    if (!value) {
      props.onChange?.(value);
      return;
    }
    props.onChange?.(value.format(props.format || 'YYYY-MM-DD HH:mm:ss'));
  }
  return (
    <DPLDatePicker {...props} onChange={handleOnChange} value={realValue} />
  )
}
