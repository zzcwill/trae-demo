import { Button, Icon } from 'dpl-react';
import React, { useEffect } from 'react';
import './index.scss';

export default function Card({
  children,
  ...rest
}) {
  // 作为容器组件props需要特别处理
  const props = rest?.props?.['x-component-props'] || rest;
  const { title = '', className = '', style = {}, contentStyle = {} } = props;
  return (
    <div className={`card-container ${className}`} style={style}>
      <div className="card-container-title">
        {title}
      </div>
      <div className="card-contaier-content" style={contentStyle}>
        {children}
      </div>
    </div>
  )
}
