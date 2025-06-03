import React, { useState, useEffect } from "react";
import "./index.scss";
import { Input, Col, Row, Icon, DatePicker } from "dpl-react";
import moment from "moment";
import ImageUpload from "../imageUpload";

export default function ImageInfoItem(props) {
  const {
    value,
    onChange,
    className = "",
    loading,
    length,
    index,
    imageIsErrorChange,
    type,
  } = props;
  const [isShowError, setIsShowError] = useState(false);
  
  const valueChange = (type, data) => {
    let sendData = {};
    let isError = false;
    if (type === "image") {
      sendData = {
        ...value,
        imageUrl: data.imageUrl || "",
        name: data.name || "",
      };
      if (!data.imageUrl && value.clickUrl) {
        isError = true;
      }
    } else if (type === 'imageDate') {
      // 有效期解析到imageStartDate、imageEndDate
      sendData = {
        ...value,
        imageStartDate: data?.length > 0 ? data[0] : undefined,
        imageEndDate: data?.length > 0 ? data[1] : undefined,
      }
      if (!data.imageUrl && value.clickUrl) {
        isError = true;
      }
    } else {
      sendData = { ...value, clickUrl: (data && data.trim()) || "" };
      if (!value.imageUrl && data) {
        isError = true;
      }
    }
    setIsShowError(isError);
    imageIsErrorChange(isError, index);
    onChange("value", sendData);
  };

  //向上移动
  const moveUp = () => {
    onChange("moveUp", value);
  };

  //向下移动
  const moveDown = () => {
    onChange("moveDown", value);
  };

  useEffect(() => {
    if (!!value.clickUrl && !value.imageUrl) {
      setIsShowError(true);
    } else {
      setIsShowError(false);
    }
  }, [value]);

  return (
    <div className="image-info-item-box">
      <Row>
        <Col span={10}>
          <div className="image-info-item-context">
            <ImageUpload
              value={{
                imageUrl: value.imageUrl,
                name: value.name,
              }}
              className={isShowError ? "image-info-item-context-error" : ""}
              disabled={loading || type === "detail"}
              onChange={(value) => {
                valueChange("image", value);
              }}
            />
          </div>
        </Col>
        <Col span={10}>
          <div className="image-info-item">
            <div className="image-info-item-label">
              点击链接&nbsp;:&nbsp;
            </div>
            <div className="image-info-item-context">
              <Input
                value={value.clickUrl}
                onChange={(e) => {
                  valueChange("clickUrl", e.target.value);
                }}
                disabled={loading || type === "detail"}
              />
            </div>
          </div>
        </Col>
        {type !== "detail" && (
          <Col span={3} className="image-info-item-icon-area">
            <div className="image-info-item-icon-box">
              {index !== 0 && (
                <Icon
                  type="up-arrow"
                  className="image-info-item-icon"
                  onClick={() => {
                    moveUp();
                  }}
                />
              )}
            </div>
            <div className="line"></div>
            <div className="image-info-item-icon-box">
              {((length === 4 && index !== 3) ||
                (length === 8 && index !== 7)) && (
                <Icon
                  type="down-arrow"
                  className="image-info-item-icon"
                  onClick={() => {
                    moveDown();
                  }}
                />
              )}
            </div>
          </Col>
        )}
      </Row>
      <div className="imageInfo-error-message-box">
        {isShowError && (
          <span>点击链接存在时，图片{index + 1}不能为空，请选择图片！</span>
        )}
      </div>
      <Row style={{ marginBottom: 10 }}>
        <Col span={12}>
          <div className="image-info-item">
            <div className="image-info-item-label">
              有效期&nbsp;:&nbsp;
            </div>
            <div className="image-info-item-context">
              <DatePicker.RangePicker
                disabled={loading || type === "detail"}
                // 要格式化为moment对象
                value={
                  value.imageStartDate && value.imageEndDate
                    ? [
                        moment(value.imageStartDate, "YYYY-MM-DD"),
                        moment(value.imageEndDate, "YYYY-MM-DD"),
                      ]
                    : undefined
                }
                onChange={(date, dateString) => {
                  valueChange("imageDate", dateString);
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
