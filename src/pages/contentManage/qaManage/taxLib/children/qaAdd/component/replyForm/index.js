import React, { useEffect, useState, createRef } from "react";
import "./index.scss";
import {
  Form,
  Input,
  message,
  Select,
  Button,
  Col,
  Row,
  Modal,
} from "dpl-react";
import { get } from "@/request/request";
import Api from "@/request/api";
import DimensionCheck from "./DimensionCheck";
import UEditor from "@/components/common/ueditor";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const Option = Select.Option;

/**
 * 维度输入错误类型
 */
const errorType = {
  noError: {
    code: 0,
    message: "没有错误",
  },
  contextError: {
    code: 1,
    message:
      "匹配错误，请检查分隔符是否为英文半角或者维度名称是否正确，确认无误后再点击自动勾选！",
  },
  repeatError: {
    code: 2,
    message: "重复，请检查确认无误后再点击自动勾选！",
  },
  gradeError: {
    code: 3,
    message: "重复，问题分级只能设置一个，请确定分级无误后再点击自动勾选！",
  },
};

function ReplyForm(props, ref) {
  const { form, reply = {}, status = true, onEdit, onSave, onDelete } = props;
  const [regionLabel, setRegionLabel] = useState([]); // 地域标签
  const [professionLabel, setProfessionLabel] = useState([]); //行业标签
  const [gradeLabel, setGradeLabel] = useState([]); // 分层标签
  const {
    getFieldDecorator,
    validateFieldsAndScroll,
    setFieldsValue,
    getFieldsValue,
    getFieldValue,
  } = form;
  const [dimensionObj, setDimensionObj] = useState({}); // 维度全部列表
  const getDimensionList = async () => {
    const res = await get({
      url: Api.getDimensionList,
      params: {
        type: "0,1,2", // 0：地域， 1：行业 ，2：分级
      },
    });
    if (res.success) {
      const data = res.data;
      let codeObj = {};
      data.forEach((item) => {
        const list = item.dimensionList;
        if (item.type == "0") {
          setRegionLabel(list);
        } else if (item.type == "1") {
          setProfessionLabel(list);
        } else if (item.type == "2") {
          setGradeLabel(list);
        }
        list.forEach((dimensionListItem) => {
          const obj = Object.assign({ type: item.type }, dimensionListItem);
          codeObj[encodeURIComponent(obj.name)] = obj;
        });
      });
      setDimensionObj(codeObj);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 自动勾选
   */
  const autoSelect = () => {
    const value = getFieldValue("dimensionContext");
    if (value && value.trim()) {
      const codeList = value.split(",");
      // 匹配对象
      let obj = {
        region: [],
        profession: [],
        grade: undefined,
      };
      let isError = errorType.noError;
      let gradeItem = "";
      for (let i = 0, len = codeList.length; i < len; i++) {
        const item = codeList[i];
        if (item) {
          const data = dimensionObj[encodeURIComponent(item)];
          if (data) {
            switch (data.type) {
              case "0":
                if (obj.region.indexOf(data.code) > -1) {
                  isError = errorType.repeatError;
                  break;
                }
                obj.region.push(data.code);
                break;
              case "1":
                if (obj.profession.indexOf(data.code) > -1) {
                  isError = errorType.repeatError;
                  break;
                }
                obj.profession.push(data.code);
                break;
              case "2":
                if (obj.grade) {
                  isError = errorType.gradeError;
                  break;
                }
                gradeItem = item;
                obj.grade = data.code;
                break;
              default:
                break;
            }
          } else {
            isError = errorType.contextError;
          }
        }
        switch (isError.code) {
          case 1:
          case 2:
            Modal.warning({
              content: `${item} ${isError.message}`,
              okText: "确定",
            });
            return;
          case 3:
            Modal.warning({
              content: `${gradeItem} 、${item} ${isError.message}`,
              okText: "确定",
            });
            return;   
          default:
            break;  
        }
      }
      const replyObj = getFieldsValue();
      setFieldsValue(
        Object.assign({}, replyObj, obj, {
          dimensionContext: undefined,
        })
      );
    }
  };

  /**
   * 清楚自动勾选
   */
  const autoClear = () => {
    const replyObj = getFieldsValue();
    setFieldsValue(
      Object.assign({}, replyObj, {
        dimensionContext: undefined,
      })
    );
  };

  useEffect(() => {
    setFieldsValue({
      region: reply.region,
      profession: reply.profession,
      grade: reply.grade,
      reply: reply.reply || "",
      internalTips: reply.internalTips || "",
      dimensionContext: reply.dimensionContext || undefined,
    });
  }, [reply]);
  useEffect(() => {
    getDimensionList();
  }, []);
  return (
    <div className="reply-form">
      <Form>
        <div className="block">
          <FormItem label="维度输入" {...formItemLayout}>
            {getFieldDecorator("dimensionContext")(
              <Input.TextArea
                placeholder="请将答案对应的维度信息填入输入框中，维度之间用“英文半角,”进行分隔;"
                autosize={{ minRows: 4, maxRows: 4 }}
                disabled={status}
              />
            )}
            <div className="btn-group dimension-button">
              <Button
                style={{ marginRight: 10 }}
                onClick={autoClear}
                disabled={status}
              >
                清空
              </Button>
              <div className="dimension-line"></div>
              <Button type="primary" onClick={autoSelect} disabled={status}>
                自动勾选
              </Button>
            </div>
          </FormItem>
          <FormItem label="区域" {...formItemLayout}>
            {getFieldDecorator("region", {
              rules: [
                {
                  required: true,
                  message: "请选择区域",
                },
              ],
            })(<DimensionCheck list={regionLabel} disabled={status} />)}
          </FormItem>
          <FormItem label="行业" {...formItemLayout}>
            {getFieldDecorator("profession", {
              rules: [
                {
                  required: true,
                  message: "请选择行业",
                },
              ],
            })(<DimensionCheck list={professionLabel} disabled={status} />)}
          </FormItem>
          <FormItem label="问题分级" {...formItemLayout}>
            {getFieldDecorator("grade", {
              rules: [{ required: true, message: "请选择问题分级" }],
            })(
              <Select
                placeholder="请选择问题分级"
                style={{ width: 300 }}
                disabled={status}
              >
                {gradeLabel.map((item) => {
                  return (
                    <Option key={item.id} value={item.code}>
                      {item.name}
                    </Option>
                  );
                })}
              </Select>
            )}
          </FormItem>
          <FormItem label="回答" {...formItemLayout}>
            {getFieldDecorator("reply", {
              rules: [{ required: true, message: "请输入回答" }],
            })(<UEditor disabled={status} />)}
          </FormItem>
        </div>
        <div className="line"></div>
        <div className="block">
          <FormItem label="内部提示" {...formItemLayout}>
            {getFieldDecorator(
              "internalTips",
              {}
            )(<UEditor disabled={status} />)}
          </FormItem>
        </div>
        <div className="btn-group">
          {status && (
            <Button
              type="primary-bordered"
              style={{ marginRight: 10 }}
              onClick={onEdit}
            >
              编辑维度
            </Button>
          )}
          {!status && (
            <Button
              type="primary-bordered"
              style={{ marginRight: 10 }}
              onClick={() => {
                validateFieldsAndScroll((err, values) => {
                  if (!err) {
                    console.log(values)
                    onSave(values);
                  }
                });
              }}
            >
              保存维度
            </Button>
          )}
          <Button onClick={onDelete}>删除维度</Button>
        </div>
      </Form>
    </div>
  );
}

export default Form.create()(React.forwardRef(ReplyForm));
