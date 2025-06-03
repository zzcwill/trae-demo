import React from 'react'
import {Button, Menu, Dropdown, Icon} from 'dpl-react'

export default function BtnShare(props) {
  const {onClick, className = '', style = {}, disabled = false, link = '', content = ''} = props


  const subMenu = (
    <Menu onClick={onClick}>
      <Menu.Item key={1}>
        <div >复制链接</div>
      </Menu.Item>
      <Menu.Item key={2}>
        <div>复制内容</div>
      </Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={subMenu} className={className} disabled={disabled} >
      <Button type='primary-bordered' style={style}>
        分享答案 <Icon type="caret-down"/>
      </Button>
    </Dropdown>
  )
}
