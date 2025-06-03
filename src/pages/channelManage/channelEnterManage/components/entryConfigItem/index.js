import React, { useState, useEffect } from "react";
import "./index.scss";
import {
  Input,
  Button,
  message,
  Form,
  Col,
  Row,
  Select,
  Checkbox,
  Radio,
} from "dpl-react";
import ImageUpload from "../imageUpload";
const Option = Select.Option;
// 无构建处理类型
const extraDealTypeList = [
  {
    value: 0,
    label: "弹出宣传图",
  },
  {
    value: 1,
    label: "禁用图片",
  },
];

function EntryConfigItem(props) {
  const { value, onChange, className = "", loading, consultServiceList } = props;
  const valueChange = (key, data) => {
    let sendData = {};
    let obj = {};
    switch (key) {
      case "defaultImg":
        sendData = Object.assign({}, value, {
          defaultImgPath: data.imageUrl || "",
          defaultImgName: data.name || "",
        });
        break;
      case "hoverImg":
        sendData = Object.assign({}, value, {
          hoverImgPath: data.imageUrl || "",
          hoverImgName: data.name || "",
        });
        break;
      case "extraImg":
        sendData = Object.assign({}, value, {
          extraImgPath: data.imageUrl || "",
          extraImgName: data.name || "",
        });
        break;
      case "cpwd":
      case "gjid":
      case "jumpPageUrl":
        obj = {};
        obj[key] = (data && data.trim()) || "";
        sendData = Object.assign({}, value, obj);
        break;
      case "extraDealType":
        sendData = Object.assign({}, value, {
          extraDealType: data,
        });
        break;
      default:
        obj = {};
        obj[key] = data || "";
        sendData = Object.assign({}, value, obj);
        break;
    }
    console.log(sendData, 'sendData');
    onChange && onChange(sendData);
  };
  return (
    <div className="entry-config-item-box">
      <Row>
        <Col span={12}>
          <div className="entry-config-enum">
            <div className="entry-config-enum-label">
              <span>默认图片&nbsp;:&nbsp;</span>
            </div>
            <div className="entry-config-enum-context">
              <ImageUpload
                value={{
                  imageUrl: value.defaultImgPath,
                  name: value.defaultImgName,
                }}
                disabled={loading}
                onChange={(value) => {
                  valueChange("defaultImg", value);
                }}
              />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="entry-config-enum">
            <div className="entry-config-enum-label">
              <span>悬浮图片&nbsp;:&nbsp;</span>
            </div>
            <div className="entry-config-enum-context">
              <ImageUpload
                value={{
                  imageUrl: value.hoverImgPath,
                  name: value.hoverImgName,
                }}
                disabled={loading}
                onChange={(value) => {
                  valueChange("hoverImg", value);
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className="entry-config-enum">
            <div className="entry-config-enum-label">
              <span>产品维度&nbsp;:&nbsp;</span>
            </div>
            <div className="entry-config-enum-context">
              <Input
                value={value.cpwd}
                onChange={(e) => {
                  valueChange("cpwd", e.target.value);
                }}
                disabled={loading}
                placeholder="进入咨询带入的产品维度代码"
                maxLength="3"
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div className="entry-config-enum">
            <div className="entry-config-enum-label entry-config-enum-space"></div>
            <Checkbox.Group
              value={value.vipEntranceFlag}
              onChange={(value) => {
                valueChange("vipEntranceFlag", value);
              }}
              disabled={loading}
            >
              <Checkbox key={'Y'} value={'Y'}>
                该入口仅
              </Checkbox>
            </Checkbox.Group>
            <Col span={8}>
              <Select
                placeholder="请选择咨询产品类型"
                style={{ width: "100%" }}
                value={value.consultService}
                onChange={(value) => {
                  valueChange("consultService", value);
                }}
                disabled={loading}
              >
                {consultServiceList?.length > 0 &&
                  consultServiceList.map((item) => {
                    return (
                      <Option key={item.value} value={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
            <span>会员可咨询</span>
          </div>
        </Col>
      </Row>
      {value.vipEntranceFlag.length > 0 && (
        <>
          {/* <Row>
            <Col span={12}>
              <div className="entry-config-enum">
                <div className="entry-config-enum-label">
                  <span>会员构建&nbsp;:&nbsp;</span>
                </div>
                <div className="entry-config-enum-context">
                  <Col span={8}>
                    <Select
                      placeholder="请选择构建类型"
                      style={{ width: "100%" }}
                      value={value.gjlx}
                      onChange={(value) => {
                        valueChange("gjlx", value);
                      }}
                      disabled={loading}
                    >
                      {gjlxList.length > 0 &&
                        gjlxList.map((item) => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                    </Select>
                  </Col>
                  <Col span={16}>
                    <Input
                      style={{ width: "100%" }}
                      value={value.gjid}
                      onChange={(e) => {
                        valueChange("gjid", e.target.value);
                      }}
                      disabled={loading}
                      placeholder="可进入咨询的构件ID"
                      maxLength="16"
                    />
                  </Col>
                </div>
              </div>
            </Col>
          </Row> */}
          <Row>
            <Col span={12}>
              <div className="entry-config-enum">
                <div className="entry-config-enum-label">
                  <span>非会员&nbsp;:&nbsp;</span>
                </div>
                <div className="entry-config-enum-context">
                  <Radio.Group
                    value={value.extraDealType}
                    onChange={(e) => {
                      valueChange("extraDealType", e.target.value);
                    }}
                    disabled={loading}
                  >
                    {extraDealTypeList.map((item) => {
                      return (
                        <Radio key={item.value} value={item.value}>
                          {item.label}
                        </Radio>
                      );
                    })}
                  </Radio.Group>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div className="entry-config-enum">
                <div className="entry-config-enum-label"></div>
                <div className="entry-config-enum-context">
                  <ImageUpload
                    value={{
                      imageUrl: value.extraImgPath,
                      name: value.extraImgName,
                    }}
                    disabled={loading}
                    onChange={(value) => {
                      valueChange("extraImg", value);
                    }}
                  />
                </div>
              </div>
            </Col>
            <Col span={12}>
              {value.extraDealType !== extraDealTypeList[1].value && (
                <div className="entry-config-enum">
                  <div className="entry-config-enum-label">
                    <span>图片链接&nbsp;:&nbsp;</span>
                  </div>
                  <div className="entry-config-enum-context">
                    <Input
                      style={{ width: "100%" }}
                      value={value.jumpPageUrl}
                      onChange={(e) => {
                        valueChange("jumpPageUrl", e.target.value);
                      }}
                      disabled={loading}
                      placeholder="请输入宣传图点击后跳转链接地址"
                      maxLength="1000"
                    />
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
export default React.forwardRef(EntryConfigItem);
