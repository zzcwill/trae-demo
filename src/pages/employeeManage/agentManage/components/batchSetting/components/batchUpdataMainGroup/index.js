import React, { useState, useEffect } from "react";
import "./index.scss";
import { message, Select, Modal, Button } from "dpl-react";
import { post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
const Option = Select.Option;

export default function BatchUpdataMainGroup(props) {
  const { mainGroupList, idList, closeModal } = props;
  const [selectGroup, setSelectGroup] = useState(undefined); // 选中组的列表
  const [loading, setLoading] = useState(false); // loading

  /**
   * 选中组修改
   */
  const selectGroupChange = value => {
    setSelectGroup(value);
  };

  /**
   * 保存
   */
  const save = () => {
    if (!selectGroup) {
      Modal.warning({
        content: "电话组不能为空",
        okText: "确定"
      });
      return;
    }
    updataMainGrroup();
  };

  /**
   * 批量修改主要业务组
   */
  const updataMainGrroup = async () => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postBatchUpdataMainGroupList,
        data: {
          idList,
          groupId: selectGroup
        }
      });
      if (res.success) {
        message.success("批量修改主要业务组成功！");
        closeModal(true);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
      message.error("系统出错，请联系管理员");
    }
    setLoading(false);
  };

  return (
    <div className="main-group-box">
      <div className="edit-item">
        <div className="item-label">
          <span className="message-required">*</span>
          <span>组类型&nbsp;:&nbsp;</span>
        </div>
        <div className="item-context">
          <span>电话</span>
        </div>
      </div>
      <div className="edit-item">
        <div className="item-label">
          <span className="message-required">*</span>
          <span>电话组&nbsp;:&nbsp;</span>
        </div>
        <div className="item-context">
          <Select
            value={selectGroup}
            optionFilterProp="children"
            placeholder="请选择电话组"
            className="context-components"
            allowClear
            onChange={selectGroupChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {mainGroupList.length > 0 &&
              mainGroupList.map(item => {
                return (
                  <Option key={item.id} value={item.id} title={item.name}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </div>
      </div>
      <div className="button-box">
        <Button
          type="primary"
          className="button-item"
          loading={loading}
          onClick={() => {
            save();
          }}
        >
          确定
        </Button>
        <div className="line-box"></div>
        <Button
          className="button-item"
          disabled={loading}
          onClick={() => {
            closeModal();
          }}
        >
          取消
        </Button>
      </div>
    </div>
  );
}
