import { Button, DatePicker, Icon } from 'dpl-react';
import React, { useEffect, useState } from 'react'
import './index.scss';

export default function SchedualingDatePicker({
  buttonText = '查看档期',
  // 日期发生改变的回调
  onChange,
  // 用于展示排期的列表
  dataSource,
  onOpen,
}) {
  const [open, setOpen] = useState(false);
  const [valueInner, setValueInner] = useState();
  const ref = React.useRef(null);

  const handleDatePickerOpen = () => {
      setOpen(true);
      if (!open) {
        onOpen?.();
      }
  }

  const onChangeHandler = (value) => {
    onChange?.(value);
    setValueInner(value);
  }

  return (
    <div 
      className="schedualing-datepicker" 
      ref={ref} 
      onClick={handleDatePickerOpen}
    >
      <Button.Text><Icon type="calendar-o"/>{buttonText}</Button.Text>
      <DatePicker 
        renderExtraFooter={() => {
          if (!dataSource?.length) {
            return '暂无排班'
          }
          return dataSource?.map((d, index) => {
            return <div>{d}</div>
          })
        }}
        style={{
          visibility: 'hidden',
          width: 0
        }}
        value={valueInner}
        getCalendarContainer={() => ref.current}
        open={open}
        onChange={onChangeHandler}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            setValueInner();
          }
        }}
      />
    </div>
  )
}
