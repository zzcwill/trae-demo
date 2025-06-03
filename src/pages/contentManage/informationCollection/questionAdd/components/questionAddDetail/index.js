import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  message,
  Radio,
  Select,
  Input,
  Menu,
  Dropdown,
  Button,
  Icon,
} from "dpl-react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api";

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};
const optionName = "COLLECT_REFUSE_REASON";

function AddButton(props) {
  const {
    onClick,
    className = "",
    style = {},
    disabled = false,
    link = "",
    content = "",
  } = props;

  return (
    <Button
      type="primary"
      style={style}
      className={className}
      disabled={disabled}
      onClick={()=>{onClick(1)}}
    >
      新增问答
    </Button>
  );
}

function QuestionDetail(props) {
  const { form, visible = false, onCancel, onOk, id } = props;
  const { getFieldDecorator, validateFieldsAndScroll } = form;
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [status, setStatus] = useState("0");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const getDetail = async () => {
    setLoading(false);
    const data = await get({ url: Api.questionCollectDetail, params: { id } });
    setLoading(true);
    if (data.success) {
      setDetail(data.data);
      setStatus(data.data.status);
    } else {
      message.error(data.message);
    }
  };
  const okHandler = () => {
    setConfirmLoading(true);
    validateFieldsAndScroll(async (err, value) => {
      if (!err) {
        const data = await post({
          url: Api.questionCollectHandle,
          data: {
            id: id,
            status: value.status,
            refuseReason: status == "2" ? value.refuseReason : undefined,
            refuseDesc: status == "2" ? value.refuseDesc : undefined,
          },
        });
        if (data.success) {
          onOk && onOk();
        } else {
          message.error(data.message);
        }
      }
      setConfirmLoading(false);
    });
  };
  const getOptions = async () => {
    const data = await get({
      url: Api.getCommonOptions,
      params: { groupNames: optionName },
    });
    if (data.success) {
      data.data.forEach((item) => {
        if (item.groupName === optionName) {
          setOptions(item.options);
        }
      });
    }
  };
  useEffect(() => {
    getOptions();
  }, []);
  useEffect(() => {
    if (visible && id) {
      getDetail();
      setStatus(detail.status);
    }
  }, [visible, id]);
  return (
    <Modal
      visible={visible}
      title="问题新增详情"
      onCancel={onCancel}
      onOk={okHandler}
      className={"question-add-detail"}
      confirmLoading={confirmLoading}
    >
      {loading && (
        <Form>
          <FormItem label="标题" {...formItemLayout}>
            {getFieldDecorator(
              "title",
              {}
            )(
              <div className="detail-item detail-title" title={detail.title}>
                {detail.title}
              </div>
            )}
          </FormItem>
          <FormItem label="问题说明" {...formItemLayout}>
            {getFieldDecorator(
              "content",
              {}
            )(
              <div
                className="detail-item-content"
                dangerouslySetInnerHTML={{ __html: detail.content }}
              ></div>
            )}
          </FormItem>
          <FormItem label="创建时间" {...formItemLayout}>
            {getFieldDecorator(
              "createTime",
              {}
            )(<div className="detail-item">{detail.createTime}</div>)}
          </FormItem>
          <FormItem label="创建人" {...formItemLayout}>
            {getFieldDecorator(
              "creatorName",
              {}
            )(<div className="detail-item">{detail.creatorName}</div>)}
          </FormItem>
          <FormItem label="是否采纳" {...formItemLayout}>
            {getFieldDecorator("status", {
              rules: [
                {
                  validator: (rule, value, callback) => {
                    if (value != "1" && value != "2") {
                      callback("请选择是否采纳");
                    }
                    callback();
                  },
                },
                { required: true, message: "请选择是否采纳" },
              ],
              initialValue: detail.status,
            })(
              <Radio.Group
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <Radio value={"1"}>采纳</Radio>
                <Radio value={"2"}>不采纳</Radio>
              </Radio.Group>
            )}
          </FormItem>
         {/* <FormItem>
            <AddButton
              style={{ marginLeft: "20.83333333333333%" }}
              onClick={(e) => {
                let url =
                  window.location.href.split("#")[0] +
                  "#/contentManage/qaManage/taxLib/qaAdd";
                window.open(url);
              }}
            />
          </FormItem>*/}

          {status === "2" && (
            <>
              <FormItem label="不采纳原因" {...formItemLayout}>
                {getFieldDecorator("refuseReason", {
                  rules: [{ required: true, message: "请不采纳原因" }],
                  initialValue: detail.refuseReason,
                })(
                  <Select placeholder={"请选择不采纳原因"}>
                    {options.map((item) => {
                      return (
                        <Select.Option value={item.id} key={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                )}
              </FormItem>
              <FormItem label="未通过描述" {...formItemLayout}>
                {getFieldDecorator("refuseDesc", {
                  initialValue: detail.refuseDesc,
                })(<Input.TextArea rows={3} maxLength={200} />)}
              </FormItem>
            </>
          )}
        </Form>
      )}
    </Modal>
  );
}

export default Form.create()(React.forwardRef(QuestionDetail));
