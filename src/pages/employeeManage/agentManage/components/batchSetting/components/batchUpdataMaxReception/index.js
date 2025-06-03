import React, { useState, useEffect } from "react";
import "./index.scss";
import { message, InputNumber, Modal, Button } from "dpl-react";
import { post } from "@/request/request";
import Api from "@/request/api-callcentermanage";

export default function BatchUpdateMaxReception(props) {
  const { idList, closeModal } = props;
  const [maxReception, setMaxReception] = useState(1); // 接待上线
  const [loading, setLoading] = useState(false); // loading
  /**
  /**
   * 保存
   */
  const save = () => {
    const sendData = {
      idList,
      maxReception: maxReception,
    };
    updataMaxReception(sendData);
  };

  /**
   * 批量修改主要业务组
   */
  const updataMaxReception = async (sendData) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postBatchUpdateMaxReception,
        data: sendData,
      });
      if (res.success) {
        message.success("批量修改接待上限成功！");
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

  /**
   * 修改上线修改
   */
  const maxReceptionChange = (value) => {
    setMaxReception(value);
  };

  return (
    <div className="max-reception-batch">
      <div className="edit-item">
        <div className="item-label">
          <span className="message-required">*</span>
          <span>组类型&nbsp;:&nbsp;</span>
        </div>
        <div className="item-context">
          <span>在线</span>
        </div>
      </div>
      <div className="line-box"></div>

      <div className="reception-box">
        <div className="item-label item-label-large">
          <span className="message-required">*</span>
          <span>接待上限&nbsp;:&nbsp;</span>
        </div>
        <div className="item-context">
          <InputNumber
            min={1}
            max={99}
            step={1}
            precision={0}
            value={maxReception}
            inputWidth={200}
            onChange={(value) => {
              maxReceptionChange(value);
            }}
          ></InputNumber>
          <span className="help-context">建议小于或等于8个</span>
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
