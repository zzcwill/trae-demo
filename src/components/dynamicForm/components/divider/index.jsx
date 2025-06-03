import { Divider as DPLDivider } from 'dpl-react';
import React from 'react'

export default function Divider({
  children,
  ...rest
}) {
  // 作为容器组件props需要特别处理
  const props = rest.props['x-component-props'] || rest;

  return (
    <DPLDivider {...props} />
  )
}
