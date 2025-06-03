import { Button, Icon } from 'dpl-react';
import React, { useEffect } from 'react';
import './index.scss';

export default function Card({
  children,
  ...rest
}) {
  // 作为容器组件props需要特别处理
  const props = rest.props['x-component-props'] || rest;
  const { title = '', deletable = true, onDelete, className = '', style = {}, disabled, contentStyle = {} } = props;

  return (
    <div className={`card-container ${className}`} style={style}>
      {deletable && !disabled ? (
        <div className="card-container-delete">
          <Button.Text onClick={onDelete}><Icon type="dustbin-o" /> 删除</Button.Text>
        </div>
      ) : null}
      <div className="card-container-title">
        {title}
      </div>
      <div className="card-contaier-content" style={contentStyle}>
        {children}
      </div>
    </div>
  )
}
