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
  Modal,
} from "dpl-react";
import Api from "@/request/api-olhelpmanage.js";
import { post } from "@/request/request";
import InputNumber from "@/components/common/inputNumber";
import EntryConfigItem from "../entryConfigItem";
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

// 入口入量
const entryAmountList = [
  {
    id: 1,
    name: "1",
  },
  {
    id: 2,
    name: "2",
  },
  {
    id: 3,
    name: "3",
  },
  {
    id: 4,
    name: "4",
  },
  {
    id: 5,
    name: "5",
  },
];
// 单个默认对象
const defaultEnterItem = {
  indexNum: 0, // 入口顺序
  defaultImgPath: "", // 默认图片路径
  defaultImgName: "", // 默认图片名称
  hoverImgPath: "", // 悬浮图片地址
  hoverImgName: "", // 悬浮图片名称
  cpwd: "", // 产品维度
  vipEntranceFlag: [], // 是否是会员通道，Y为仅会员可咨询、N为全部可咨询
  gjlx: "", // 构建类型
  gjid: "", // 构建ID
  extraDealType: 0, // 无构件处理类型，0：弹出宣传图，1：禁用图片
  extraImgPath: "", // 特殊处理图片地址
  extraImgName: "", // 特殊处理图片名称
  jumpPageUrl: "", // 跳转网页链接
};
function EditModal(props) {
  const {
    className = "",
    form,
    enterTypeList,
    formData = {},
    config,
    gjlxList,
    consultServiceList,
    onCancel,
  } = props;
  const { getFieldDecorator, validateFields } = form;
  const [loading, setLoading] = useState(false);
  const [entryConfigList, setEntryConfigList] = useState(() => {
    const len = entryAmountList.slice(-1)[0].id;
    let list = [];
    const entryArrayList = formData.entryList;
    for (let i = 0; i < len; i++) {
      if (entryArrayList[i]) {
        list.push(Object.assign({}, entryArrayList[i]));
      } else {
        list.push(
          Object.assign({}, defaultEnterItem, {
            indexNum: i + 1,
          })
        );
      }
    }
    return list;
  });

  const [entryList, setEntryList] = useState(() => {
    let list = [];
    const len = formData.entryAmount;
    for (let i = 0; i < len; i++) {
      list.push(Object.assign({}, entryConfigList[i]));
    }
    return list;
  });

  /**
   * 入口数量修改
   */
  const entryAmountChange = (value) => {
    let list = [];
    for (let i = 0; i < value; i++) {
      list.push(entryConfigList[i]);
    }
    setEntryList(list);
  };

  /**
   * 数组内容变化
   */
  const entryItemChange = (value, index) => {
    let configList = [].concat(entryConfigList);
    let list = [];
    configList[index] = value;
    const len = entryList.length;
    for (let i = 0; i < len; i++) {
      list.push(configList[i]);
    }
    setEntryConfigList(configList);
    setEntryList(list);
  };

  /**
   * 保存
   */
  const save = () => {
    form.validateFields((err, values) => {
      if (!err) {
        setLoading(true);
        let sendData = Object.assign({}, values);
        sendData.entryType =
          sendData.entryType === "all" ? "" : sendData.entryType;
        // 判断是否所有要配置的入口约定参数存在
        let hasEnterConfig = {
          hasDefaultImg: true,
          hasExtra: true,
          hasExtraImgError: "",
          index: 0,
        };
        for (let i = 0; i < sendData.entryAmount; i++) {
          // 判断默认图片是否存在
          if (!entryList[i].defaultImgPath) {
            hasEnterConfig.hasDefaultImg = false;
            hasEnterConfig.index = i;
            break;
          }
          // 判断在会员通道下，是否包含构件类型、构件ID、特殊处理图片
          if (entryList[i]["vipEntranceFlag"][0] === "Y") {
            if (!entryList[i].consultService) {
              // 错误类型构件类型为空
              hasEnterConfig.hasExtraImgError = "consultService";
              hasEnterConfig.hasExtra = false;
              hasEnterConfig.index = i;
              break;
            }
            // if (!entryList[i].gjid) {
            //   // 错误类型构件ID为空
            //   hasEnterConfig.hasExtraImgError = "gjid";
            //   hasEnterConfig.hasExtra = false;
            //   hasEnterConfig.index = i;
            //   break;
            // }
            if (!entryList[i].extraImgPath) {
              hasEnterConfig.hasExtra = false;
              hasEnterConfig.index = i;
              if (entryList[i].extraDealType) {
                // 错误类型禁用图片为空
                hasEnterConfig.hasExtraImgError = "forbidImgPath";
                break;
              } else {
                // 错误类型弹出宣传图为空
                hasEnterConfig.hasExtraImgError = "propagandaImgPath";
                break;
              }
            }
          }
        }
        // 存在没有默认图片的时候弹窗提示
        if (!hasEnterConfig.hasDefaultImg) {
          Modal.warning({
            content: "入口" + (hasEnterConfig.index + 1) + "默认图片必填！",
            okText: "确定",
          });
          setLoading(false);
          return false;
        }
        // 在会员通道下，存在没有
        if (!hasEnterConfig.hasExtra) {
          switch (hasEnterConfig.hasExtraImgError) {
            case "consultService":
              Modal.warning({
                content:
                  "入口" + (hasEnterConfig.index + 1) + "请选择服务类型！",
                okText: "确定",
              });
              break;
            // case "gjid":
            //   Modal.warning({
            //     content: "入口" + (hasEnterConfig.index + 1) + "请输入构件ID！",
            //     okText: "确定",
            //   });
            //   break;
            case "forbidImgPath":
              Modal.warning({
                content:
                  "入口" + (hasEnterConfig.index + 1) + "请选择禁用图片！",
                okText: "确定",
              });
              break;
            case "propagandaImgPath":
              Modal.warning({
                content:
                  "入口" + (hasEnterConfig.index + 1) + "请选择弹出宣传图片！",
                okText: "确定",
              });
              break;
          }
          setLoading(false);
          return false;
        }
        // 数据拼装
        let list = [];
        for (let j = 0; j < sendData.entryAmount; j++) {
          let enterObj = {
            indexNum: entryList[j]["indexNum"], // 入口顺序
            defaultImgPath: entryList[j]["defaultImgPath"], // 默认图片路径
            defaultImgName: entryList[j]["defaultImgName"], // 默认图片名称
            hoverImgPath: entryList[j]["hoverImgPath"], // 悬浮图片地址
            hoverImgName: entryList[j]["hoverImgName"], // 悬浮图片名称
            cpwd: entryList[j]["cpwd"], // 产品维度
            vipEntranceFlag:
              entryList[j]["vipEntranceFlag"].length > 0
                ? entryList[j]["vipEntranceFlag"][0]
                : "N", // 是否是会员通道，Y为仅会员可咨询、N为全部可咨询
          };
          if (enterObj.vipEntranceFlag === "N") {
            list.push(enterObj);
          } else {
            enterObj.consultService = entryList[j]["consultService"];
            // enterObj.gjid = entryList[j]["gjid"];
            enterObj.extraDealType = entryList[j]["extraDealType"];
            enterObj.extraImgPath = entryList[j]["extraImgPath"];
            enterObj.extraImgName = entryList[j]["extraImgName"];
            enterObj.jumpPageUrl =
              enterObj.extraDealType === 0 ? entryList[j]["jumpPageUrl"] : "";
            list.push(enterObj);
          }
        }
        sendData.entryList = [...list];

        switch (config.type) {
          case "add":
            addEntryConfig(sendData);
            break;
          case "edit":
            updateEntryConfig(sendData);
            break;
        }
      }
    });
  };

  const addEntryConfig = async (data) => {
    try {
      const res = await post({
        url: Api.postAddEnterConfig,
        data,
      });
      if (res.success) {
        message.success("新增成功！");
        onCancel(true);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const updateEntryConfig = async (data) => {
    try {
      const res = await post({
        url: Api.postUpdateEnterConfig,
        data: {
          id: config.id,
          ...data,
        },
      });
      if (res.success) {
        message.success("修改成功！");
        onCancel(true);
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="enter-config-edit-box">
      <Form>
        <div className="enter-config-edit-title">发布规则</div>
        <Row>
          <Col span={8}>
            <FormItem label="入口类型" {...formItemLayout}>
              {getFieldDecorator("entryType", {
                rules: [{ required: true, message: "请选择入口类型" }],
                initialValue: formData.entryType,
              })(
                <Select placeholder="请选择入口类型">
                  {enterTypeList.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="地区" {...formItemLayout}>
              {getFieldDecorator("location", {
                rules: [{ required: true, message: "请输入地区" }],
                initialValue: formData.location,
              })(
                <InputNumber
                  placeholder="请输入地区"
                  maxLength="16"
                  allowClear
                />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="产品代码" {...formItemLayout}>
              {getFieldDecorator("cpdm", {
                initialValue: formData.cpdm,
              })(
                <Input
                  placeholder="请输入产品代码"
                  maxLength="50"
                  autocomplete="off"
                  allowClear
                ></Input>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <FormItem label="来源渠道" {...formItemLayout}>
              {getFieldDecorator("channel", {
                initialValue: formData.channel,
              })(
                <InputNumber
                  allowClear
                  placeholder="请输入来源渠道"
                  maxLength="2"
                ></InputNumber>
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <FormItem label="模块" {...formItemLayout}>
              {getFieldDecorator("module", {
                initialValue: formData.module,
              })(
                <Input
                  placeholder="请输入模块"
                  maxLength="30"
                  allowClear
                  autocomplete="off"
                ></Input>
              )}
            </FormItem>
          </Col>
        </Row>
        <div className="enter-config-edit-title">入口规则</div>
        <Row>
          <Col span={8}>
            <FormItem label="入口数量" {...formItemLayout}>
              {getFieldDecorator("entryAmount", {
                rules: [{ required: true, message: "请选择入口数量" }],
                initialValue: formData.entryAmount,
              })(
                <Select
                  placeholder="请选择入口数量"
                  onChange={entryAmountChange}
                >
                  {entryAmountList.map((item, index) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div className="edit-entry-config-box">
        {entryList.map((item, index) => {
          return (
            <Row className="entry-config-box" key={index}>
              <Col span={2}>
                <div className="entry-config-label">
                  入口{index + 1}&nbsp;:&nbsp;
                </div>
              </Col>
              <Col span={22}>
                <EntryConfigItem
                  value={item}
                  onChange={(value) => {
                    entryItemChange(value, index);
                  }}
                  loading={loading}
                  consultServiceList={consultServiceList}
                />
              </Col>
            </Row>
          );
        })}
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
          保存
        </Button>
        <div className="line-box"></div>
        <Button
          className="button-item"
          disabled={loading}
          onClick={() => {
            onCancel();
          }}
        >
          取消
        </Button>
      </div>
    </div>
  );
}
export default Form.create()(React.forwardRef(EditModal));
