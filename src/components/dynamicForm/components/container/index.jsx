import { Col, Row } from 'dpl-react';
import React from 'react'

export default function Container({
  children,
  ...rest
}) {
  // 作为容器组件props需要特别处理
  const props = rest.props['x-component-props'];
  const { style = {} } = props;

  console.log(JSON.parse(JSON.stringify(props)), 'props');

  return (
    <Row>
      <Col span={6}></Col>
      <Col span={18} style={style}>
        {children}
      </Col>
    </Row>
  )
}
