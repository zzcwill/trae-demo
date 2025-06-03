import React from "react";
import { Input, InputNumber } from "dpl-react";

const NoResultField = (props) => {
  const { 
    value = {
      amount: 0,
      tips: ''
    }, 
    onChange,
    disabled
  } = props;

  const handleAmountChange = (val) => {
    onChange?.({
      amount: val,
      tips: value.tips
    })
  }

  const handleTipsChange = (e) => {
    onChange?.({
      amount: value.amount,
      tips: e.target.value
    })
  }


  return <div className="no-result">
    <div className="no-result-amount">
      <span>连续</span>
      <InputNumber 
        min={1}
        max={99}
        value={value.amount}
        disabled={disabled}
        style={{ margin: '0 8px' }}
        onChange={handleAmountChange}
      />
      <span>个问题无答案转接人工</span>
    </div>
    <div className="no-result-tips" style={{ marginTop: 10 }}>
      <span>无答案转人工提示：</span>
      <Input 
        value={value.tips}
        disabled={disabled}
        onChange={handleTipsChange}
        style={{
          display: 'inline-block',
          width: 348,
        }}
      />
    </div>
  </div>;
};

export default NoResultField;