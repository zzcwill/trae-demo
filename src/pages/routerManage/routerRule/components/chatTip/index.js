import React, { useEffect, useState } from "react";
import "./index.scss";
import { uForm } from "dora";
import { Modal, Switch, message, Input } from "dpl-react";
import { post, get, postFile } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import VisitorNoReplyTip from "@/pages/routerManage/routerRule/components/chatTip/visitorNoReplyTip";
import WaitingMessage from "@/pages/routerManage/routerRule/components/chatTip/waitingMessage";
import ReconnectInterval from "@/pages/routerManage/routerRule/components/chatTip/reconnectInterval";
import TextArea from '@/components/common/textArea';
import TransferOverMessage from '@/components/chatSetting/transferOverMessage';
import WaitTimeoutPriority from '@/components/chatSetting/waitTimeoutPriority';
import Collection from '@/components/chatSetting/collection';

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormEffectHooks,
} = uForm;

function replaceBreak(str) {
  let result = str.trim();
  if (result) {
    result = result.replace(/\n/g, "<br>");
  }
  return result;
}
function replaceBreakToText(str) {
  let result = str;
  if (result) {
    return result.replace(/\<br\>/g, "\n");
  }
  return result;
}
const actions = createFormActions();
const { onFieldValueChange$ } = FormEffectHooks;
const toolbarOptions = [
  { label: "字体", value: "0" },
  { label: "表情", value: "1" },
  { label: "截屏", value: "2" },
  { label: "文件发送", value: "3" },
  { label: "保存记录", value: "4" },
  { label: "声音", value: "5" },
];
export default function ChatTip(props) {
  const { visible, onOk, onCancel, id } = props;
  const [type, setType] = useState("0");
  const [detail, setDetail] = useState(null);
  const getDetail = async (id) => {
    const data = await get({
      url: Api.routeRuleChatTipDetail,
      params: { ruleId: id },
    });
    if (data.success) {
      data.data.visitorNoReplyTipEnable =
        data.data.visitorNoReplyTipEnable === "Y";
      data.data.remindAgentEnable = data.data.remindAgentEnable === "Y";
      data.data.waitingSendMessageEnable =
        data.data.waitingSendMessageEnable === "Y";
      data.data.visitorNoReply = {
        visitorNoReplyTipEnable: data.data.visitorNoReplyTipEnable,
        remindAgentEnable: data.data.remindAgentEnable,
        visitorNoReplyInterval: data.data.visitorNoReplyInterval,
        visitorNoReplyTip: replaceBreakToText(data.data.visitorNoReplyTip),
        visitorNoReplyEndInternal: data.data.visitorNoReplyEndInternal,
        visitorNoReplyEndTip: replaceBreakToText(
          data.data.visitorNoReplyEndTip
        ),
      };
      data.data.waitingTip = replaceBreakToText(data.data.waitingTip);
      data.data.welcomeTip = replaceBreakToText(data.data.welcomeTip);
      data.data.busyTip = replaceBreakToText(data.data.busyTip);

      data.data.waitingMessage = {
        waitingMessageSendConfigList: Array.isArray(
          data.data.waitingMessageSendConfigList
        )
          ? data.data.waitingMessageSendConfigList.length > 0
            ? data.data.waitingMessageSendConfigList
            : [
                { sendNum: "", sendTip: "" },
                { sendNum: "", sendTip: "" },
              ]
          : [
              { sendNum: "", sendTip: "" },
              { sendNum: "", sendTip: "" },
            ],
        waitingSendMessageEnable: data.data.waitingSendMessageEnable,
        waitingMessageSendLimit: data.data.waitingMessageSendLimit,
        waitingMessageSendLimitTip: data.data.waitingMessageSendLimitTip,
        disableTip: data.data.disableTip,
      };
      setType(data.data.type);
      if (!data.data.chatTransferLimit) {
        data.data.chatTransferLimit = {
          enable: 'N'
        };
      }
      if (!data.data.chatCollect) {
        data.data.chatCollect = {
          enable: 'N'
        };
      }
      if (!data.data.waitTimeoutPriority) {
        data.data.waitTimeoutPriority = {
          enable: 'N'
        }
      }
      setDetail(data.data);
    }
  };

  const okHandler = async () => {
    let params = {};
    if (type == "0") {
      params = {
        ruleId: id,
        type: type,
      };
    } else {
      let values = await actions.submit();
      values = values.values;
      values.waitingMessage.waitingMessageSendConfigList = values.waitingMessage.waitingMessageSendConfigList.filter(
        (item) => {
          return item.sendNum && item.sendTip;
        }
      );
      values.visitorNoReply.visitorNoReplyTipEnable = values.visitorNoReply
        .visitorNoReplyTipEnable
        ? "Y"
        : "N";
      values.visitorNoReply.remindAgentEnable = values.visitorNoReply
        .remindAgentEnable
        ? "Y"
        : "N";
      values.waitingMessage.waitingSendMessageEnable = values.waitingMessage
        .waitingSendMessageEnable
        ? "Y"
        : "N";
      values.visitorNoReply.visitorNoReplyEndTip = replaceBreak(
        values.visitorNoReply.visitorNoReplyEndTip
      );
      values.visitorNoReply.visitorNoReplyTip = replaceBreak(
        values.visitorNoReply.visitorNoReplyTip
      );
      params = {
        ruleId: id,
        type: values.type,
        welcomeTip: values.welcomeTip ? replaceBreak(values.welcomeTip) : "",
        beforeChatTip: values.beforeChatTip ? values.beforeChatTip.trim() : "",
        waitingTip: values.waitingTip ? replaceBreak(values.waitingTip) : "",
        busyTip: values.busyTip ? replaceBreak(values.busyTip) : "",
        blacklistTip: values.blacklistTip ? values.blacklistTip.trim() : "",
        offlineTip: values.offlineTip ? values.offlineTip.trim() : "",
        noServiceTip: values.noServiceTip ? values.noServiceTip.trim() : "",
        reconnectInterval: values.reconnectInterval,
        chatTransferLimit: values.chatTransferLimit,
        chatCollect: values.chatCollect,
        waitTimeoutPriority: values.waitTimeoutPriority,
      };

      // 下面两个if,当开关关闭时，不传参数
      if (values.visitorNoReply.visitorNoReplyTipEnable === "Y") {
        params = { ...params, ...values.visitorNoReply };
      } else {
        params.visitorNoReplyTipEnable = "N";
      }

      if (values.waitingMessage.waitingSendMessageEnable === "Y") {
        params = { ...params, ...values.waitingMessage, disableTip: undefined };
      } else {
        params.waitingSendMessageEnable = "N";
        params.disableTip =
          (values.waitingMessage && values.waitingMessage.disableTip.trim()) ||
          "";
      }
    }
    const data = await post({
      url: Api.routeRuleChatTipSave,
      data: params,
    });
    if (data && data.success) {
      message.success("保存成功");
      onOk && onOk();
    } else {
      message.error(data.message);
    }
  };
  const doNotValid = () => {
    //type为全局配置时不校验
    onFieldValueChange$("type").subscribe((state) => {
      if (state.value == "0") {
        actions.setFieldState("*", (stateA) => {
          stateA.errors = [];
          stateA.valid = true;
          stateA.invalid = false;
          stateA.ruleErrors = [];
        });
      }
    });
  };

  useEffect(() => {
    if (visible) {
      getDetail(id);
    } else {
      setDetail(null);
    }
  }, [visible, id]);
  return (
    <div className="chat-tip">
      <Modal
        title="对话提示"
        visible={visible}
        onCancel={onCancel}
        onOk={okHandler}
        width={900}
        className="chat-tip-modal"
      >
        {detail && (
          <SchemaForm
            components={{
              VisitorNoReplyTip,
              WaitingMessage,
              ReconnectInterval,
              TextArea,
              WaitTimeoutPriority,
              TransferOverMessage,
              Collection
            }}
            initialValues={detail}
            actions={actions}
            effects={() => {
              doNotValid();
            }}
          >
            <Field
              {...formItemLayout}
              type="string"
              title="是否使用全局设置"
              name="type"
              x-component="RadioGroup"
              x-component-props={{
                options: [
                  { label: "使用全局设置", value: "0" },
                  { label: "差异化设置", value: "1" },
                ],
                onChange(e) {
                  setType(e.target.value);
                },
              }}
              x-rules={[{ required: true, message: "请选择" }]}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="欢迎语"
              name="welcomeTip"
              x-component="TextArea"
              x-component-props={{
                placeholder: "请输入欢迎语",
                maxLength: 1000,
                disabled: type == "0",
              }}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="接入前提示语"
              name="beforeChatTip"
              x-component="Input"
              x-component-props={{
                placeholder: "请输入接入前提示语",
                maxLength: 1000,
                disabled: type == "0",
              }}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="排队提示语"
              name="waitingTip"
              x-component="TextArea"
              x-component-props={{
                placeholder: "请输入排队提示语",
                maxLength: 1000,
                disabled: type == "0",
              }}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="忙碌提示语"
              name="busyTip"
              x-component="TextArea"
              x-component-props={{
                placeholder: "请输入忙碌提示语",
                maxLength: 1000,
                disabled: type == "0",
              }}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="黑名单提示语"
              name="blacklistTip"
              x-component="Input"
              x-component-props={{
                placeholder: "请输入黑名单提示语",
                maxLength: 1000,
                disabled: type == "0",
              }}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="离线提示语"
              name="offlineTip"
              x-component="Input"
              x-component-props={{
                placeholder: "请输入离线提示语",
                maxLength: 1000,
                disabled: type == "0",
              }}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="访客长时未回复提示"
              name="visitorNoReply"
              x-component="VisitorNoReplyTip"
              x-component-props={{
                disabled: type == "0",
              }}
              x-rules={(value) => {
                const isEmpty =
                  !value.visitorNoReplyEndInternal ||
                  !value.visitorNoReplyEndTip ||
                  !value.visitorNoReplyInterval ||
                  !value.visitorNoReplyTip;
                if (value.visitorNoReplyTipEnable && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="排队发送消息"
              name="waitingMessage"
              x-component="WaitingMessage"
              x-component-props={{
                disabled: type == "0",
              }}
              x-rules={(value) => {
                let isEmpty = false;
                value.waitingMessageSendConfigList.forEach((item) => {
                  if (!item.sendNum || !item.sendTip) {
                    isEmpty = true;
                  }
                });
                if (
                  !value.waitingMessageSendLimit ||
                  !value.waitingMessageSendLimitTip
                ) {
                  isEmpty = true;
                }
                if (
                  (value.waitingSendMessageEnable && isEmpty) ||
                  (!value.waitingSendMessageEnable &&
                    !(value.disableTip && value.disableTip.trim()))
                ) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="无服务提示语"
              name="noServiceTip"
              x-component="Input"
              x-component-props={{
                maxLength: 100,
                disabled: type == "0",
              }}
            />
            <Field
              {...formItemLayout}
              type="string"
              title="重新发起会话"
              name="reconnectInterval"
              x-component="ReconnectInterval"
              x-component-props={{
                disabled: type == "0",
              }}
              x-rules={[{ required: true, message: "请输入重新发起会话时长" }]}
            />
            <Field
              type="object"
              x-component="WaitTimeoutPriority"
              title="排队超时优先接入"
              name="waitTimeoutPriority"
              x-component-props={{
                disabled: type == "0",
              }}
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty = !value.timeout || !value.priority;
                if (value.enable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />
            <Field
              type="object"
              x-component="Collection"
              x-component-props={{
                disabled: type == "0",
              }}
              title="收藏"
              name="chatCollect"
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty = !value.collectTip;
                if (value.enable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />
            <Field
              type="object"
              x-component="TransferOverMessage"
              x-component-props={{
                disabled: type == "0",
              }}
              title="转接超限提醒"
              name="chatTransferLimit"
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty = !value.limitTip || !value.limitNum;
                if (value.enable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />
          </SchemaForm>
        )}
      </Modal>
    </div>
  );
}
