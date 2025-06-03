import React from 'react';
import './index.scss';
export default function (props) {
  const { data } = props;
  const sum = data.queuingNum + data.ringingNum + data.callingNum;

  return (
    <div className="show-data-box">
      <div className="queuing-num-box show-data-item" style={{ width: `${sum > 120 ? 10 + 240 * (data.queuingNum / sum) : 10 + data.queuingNum * 2}px` }}>
        {data.queuingNum}
      </div>
      <div className="ringing-num-box show-data-item" style={{ width: `${sum > 120 ? 10 + 240 * (data.ringingNum / sum) : 10 + data.ringingNum * 2}px` }}>
        {data.ringingNum}
      </div>
      <div className="calling-num-box show-data-item" style={{ width: `${sum > 120 ? 10 + 240 * (data.callingNum / sum) : 10 + data.callingNum * 2}px` }}>
        {data.callingNum}
      </div>
    </div>
  );
}
