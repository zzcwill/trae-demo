import React from 'react';
import { Popover } from 'dpl-react';


export default function LongText(props) {
  const { text = '', maxWidth } = props;
  const style = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: maxWidth ? maxWidth : '250px'
  };

  return  <Popover
      placement="bottomLeft"
      content={text}
      overlayStyle={{ whiteSpace: 'normal', maxWidth: '800px' }}
      arrowPointAtCenter={true}
    >
      <div style={{ ...style }}>
        {text}
      </div>
    </Popover>
    };