import React from "react";
import "./index.scss";
import { Button, Menu, Dropdown, Icon } from "dpl-react";
export default function UpdateStatus(props) {
  const { className, disabled, style, list = [], onClick } = props;
  const subMenu = (
    <Menu onClick={onClick}>
      {list.length > 0 &&
        list.map((item) => {
          return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
        })}
    </Menu>
  );
  return (
    <Dropdown
      overlay={subMenu}
      className={className}
      style={style}
      disabled={disabled}
    >
      <Button type="primary-bordered">
        修改状态 <Icon type="caret-down" />
      </Button>
    </Dropdown>
  );
}
