import React, { useEffect, useState } from "react";
import { uForm, UploadImage } from "dora";
import "./index.scss";
import Api from "@/request/api-olhelpmanage";
import { get, post, postFile } from "@/request/request";
import { Button, message, Switch, Input } from "dpl-react";
import WaitingTip from "./components/waitingTip";
import BusyLimitTip from "./components/busyLimitTip";
import PersonLimit from "./components/personLimit";
import WaitingMessage from "./components/waitingMessage";
import Spam from "./components/spam";
import VisitorNoReply from "./components/visitorNoReply";
import Attention from "./components/attention";
import AgentTimeout from "./components/agentTimeout";
import ChatDuration from "./components/chatDuration";
import SensitiveWordAgent from "./components/sensitiveWordAgrnt";
import ChatHold from "./components/chatHold";
import ActiveMessage from "./components/activeMessage";
import ReconnectInterval from "./components/reconnectInterval";
import TextArea from '@/components/common/textArea';
import TransferOverMessage from '@/components/chatSetting/transferOverMessage';
import WaitTimeoutPriority from '@/components/chatSetting/waitTimeoutPriority';
import RiskWordRemind from '@/components/chatSetting/riskWordRemind';
import Collection from '@/components/chatSetting/collection';

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
  console.log(result);
  return result;
}
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormSlot,
} = uForm;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};
const actions = createFormActions();
export default function ManMachineRoute(props) {
  const [detail, setDetail] = useState(null);
  const getDetail = async function (isRefresh) {
    let res = await get({ url: Api.globalChatTipDetail });
    if (res.success) {
      let data = res.data;
      data.customerService._waitingTip = {
        waitingTipEnable: data.customerService.waitingTipEnable,
        waitingTipCount: data.customerService.waitingTipCount,
      };
      data.customerService._busyLimitTip = {
        busyLimitTipEnable: data.customerService.busyLimitTipEnable,
        busyLimitCount: data.customerService.busyLimitCount,
        busyLimitTip: replaceBreakToText(data.customerService.busyLimitTip),
      };
      data.customerService._limit = {
        limitEnable: data.customerService.limitEnable,
        limitInterval: data.customerService.limitInterval,
        limitCount: data.customerService.limitCount,
        limitTip: data.customerService.limitTip,
        limitDuration: data.customerService.limitDuration,
      };
      data.customerService.waitingTip = replaceBreakToText(
        data.customerService.waitingTip
      );
      data.customerService.busyTip = replaceBreakToText(
        data.customerService.busyTip
      );
      data.customerService.welcomeTip = replaceBreakToText(
        data.customerService.welcomeTip
      );
      data.customerService.waitTimeoutPriority = data.customerService.waitTimeoutPriority || {
        enable: 'N'
      }
      data.chatTip.visitorNoReply.endTip = replaceBreakToText(
        data.chatTip.visitorNoReply.endTip
      );
      data.chatTip.visitorNoReply.tip = replaceBreakToText(
        data.chatTip.visitorNoReply.tip
      );

      data.activeMessage._offline = {
        offlineMessageTimeoutEnable:
          data.activeMessage.offlineMessageTimeoutEnable,
        offlineMessageInterval: data.activeMessage.offlineMessageInterval,
      };
      data.operateTip = data.operateTip || {}
      data.operateTip.chatTransferLimit = data.operateTip.chatTransferLimit || {
        enable: 'N'
      }
      data.operateTip.chatCollect = data.operateTip.chatCollect || {
        enable: 'N'
      }
      data.sensitiveWord.riskWordRemind = data.sensitiveWord.riskWordRemind || {
        enable: 'N'
      }
      setDetail(data);
      if (isRefresh) {
        console.log(data);
        // actions.setFieldValue(detail)
        actions.setFormState((state) => (state.values = data));
      }
    } else {
      message.error(res.message);
    }
  };
  const submit = function () {
    actions.submit().then(async (data) => {
      let values = data.values;
      values.customerService = {
        ...values.customerService,
        ...values.customerService._waitingTip,
        ...values.customerService._busyLimitTip,
        ...values.customerService._limit,
        waitingTip:
          values.customerService &&
          replaceBreak(values.customerService.waitingTip),
        busyTip:
          values.customerService &&
          replaceBreak(values.customerService.busyTip),
        welcomeTip:
          values.customerService &&
          replaceBreak(values.customerService.welcomeTip),
      };
      values.activeMessage = {
        ...values.activeMessage,
        ...values.activeMessage._offline,
      };
      values.chatTip.visitorNoReply = {
        ...values.chatTip.visitorNoReply,
        tip:
          values.chatTip.visitorNoReply &&
          replaceBreak(values.chatTip.visitorNoReply.tip),
        endTip:
          values.chatTip.visitorNoReply &&
          replaceBreak(values.chatTip.visitorNoReply.endTip),
      };
      delete values.customerService._waitingTip;
      delete values.customerService._busyLimitTip;
      delete values.customerService._limit;
      delete values.activeMessage._offline;
      if (
        values.customerService.waitingMessage &&
        values.customerService.waitingMessage.disableTip
      ) {
        values.customerService.waitingMessage.disableTip =
          values.customerService.waitingMessage.disableTip.trim() || "";
      }
      const response = await post({ url: Api.globalChatTipSave, data: values });
      if (response.success) {
        message.success("保存成功");
        // 保存成功后重新调用详情接口主要是为了去除必填的input内容去除前后空格后的数据影响
        getDetail(true);
      } else {
        message.success(response.message);
      }
    });
  };
  useEffect(() => {
    getDetail();
  }, []);
  return (
    <div>
      {detail ? (
        <SchemaForm
          className="global-chat-page"
          components={{
            WaitingTip,
            BusyLimitTip,
            PersonLimit,
            WaitingMessage,
            Spam,
            VisitorNoReply,
            Attention,
            AgentTimeout,
            ChatDuration,
            SensitiveWordAgent,
            ChatHold,
            ActiveMessage,
            Collection,
            TransferOverMessage,
            WaitTimeoutPriority,
            RiskWordRemind,
            ReconnectInterval,
            TextArea,
          }}
          initialValues={detail}
          actions={actions}
        >
          <FormSlot>
            <div className="box-title">自动应答</div>
          </FormSlot>
          <Field type="object" name="autoReply">
            <Field
              type="string"
              name="type"
              x-component="RadioGroup"
              {...formItemLayout}
              x-component-props={{
                options: [
                  { label: "公司统一设置", value: "0" },
                  {
                    label: "客服自行设置",
                    value: "1",
                  },
                ],
              }}
            />
          </Field>
          <FormSlot>
            <div className="box-line"></div>
            <div className="box-title">进入人工提示</div>
          </FormSlot>
          <Field type="object" name="customerService">
            <Field
              type="object"
              name="_waitingTip"
              x-component="WaitingTip"
              title="机器人转人工排队提示"
              required
              {...formItemLayout}
              x-rules={(value) => {
                if (value.waitingTipEnable === "Y" && !value.waitingTipCount) {
                  return {
                    message: "排队人数必填",
                    type: "error",
                  };
                }
              }}
            />
            <Field
              type="object"
              name="_busyLimitTip"
              x-component="BusyLimitTip"
              title="高排队请求人工限制提示"
              required
              {...formItemLayout}
              x-rules={(value) => {
                if (value.busyLimitTipEnable === "Y") {
                  if (!value.busyLimitCount || !value.busyLimitTip) {
                    return {
                      message: "有必填项未填，请检查",
                      type: "error",
                    };
                  }
                }
              }}
            />
            <Field
              type="object"
              name="_limit"
              x-component="PersonLimit"
              title="请求人工限制"
              required
              {...formItemLayout}
              x-rules={(value) => {
                if (value.limitEnable === "Y") {
                  if (
                    !value.limitInterval ||
                    !value.limitCount ||
                    !value.limitTip ||
                    !value.limitDuration
                  ) {
                    return {
                      message: "有必填项未填，请检查",
                      type: "error",
                    };
                  }
                }
              }}
            />

            <Field
              type="string"
              name="waitingTip"
              title="排队提示语"
              x-component="TextArea"
              x-component-props={{ maxLength: 1000 }}
              {...formItemLayout}
              x-rules={(value) => {
                let state = actions.getFieldValue("customerService._limit");
                if (state.limitEnable === "Y" && !value) {
                  return {
                    message: "请输入排队提示语",
                    type: "error",
                  };
                }
              }}
            />

            <Field
              type="object"
              name="waitingMessage"
              title="排队发消息"
              x-component="WaitingMessage"
              {...formItemLayout}
              x-rules={(value) => {
                let isEmpty = false;
                value.configList.forEach((item) => {
                  if (!item.sendNum || !item.sendTip) {
                    isEmpty = true;
                  }
                });
                if (!value.sendLimit || !value.sendLimitTip) {
                  isEmpty = true;
                }
                if (
                  (value.enable === "Y" && isEmpty) ||
                  (value.enable === "N" &&
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
              type="string"
              title="忙碌提示语"
              x-component="TextArea"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
              name="busyTip"
            />
            <Field
              type="string"
              title="欢迎语"
              x-component="TextArea"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
              name="welcomeTip"
            />

            <Field
              type="string"
              title="对话接通前提示语"
              x-component="Input"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
              name="beforeChatTip"
            />
            <Field
              type="string"
              title="黑名单提示语"
              {...formItemLayout}
              x-component="Input"
              x-component-props={{ maxLength: 1000 }}
              name="blacklistTip"
            />
            <Field
              type="string"
              title="非工作时间提示语"
              x-component="Input"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
              name="nonWorkingTimeTip"
            />
            <Field
              type="string"
              title="离线提示语"
              x-component="Input"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
              name="offlineTip"
            />
            <Field
              type="string"
              title="访问限制提示语"
              x-component="Input"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
              name="visitLimitTip"
            />
            <Field
              type="string"
              title="重新发起会话"
              x-component="ReconnectInterval"
              {...formItemLayout}
              x-rules={[{ required: true, message: "请输入重新发起会话时长" }]}
              name="reconnectInterval"
            />
            <Field
              type="object"
              x-component="WaitTimeoutPriority"
              title="排队超时优先接入"
              name="waitTimeoutPriority"
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
          </Field>
          <FormSlot>
            <div className="box-line"></div>
            <div className="box-title">对话提示</div>
          </FormSlot>
          <Field type="object" name="chatTip">
            <Field
              type="object"
              name="spam"
              x-component="Spam"
              title="屏蔽限制"
              required
              {...formItemLayout}
              x-rules={(value) => {
                if (value.enable === "Y") {
                  if (!value.tip || !value.count) {
                    return {
                      message: "有必填项未填，请检查",
                      type: "error",
                    };
                  }
                }
              }}
            />
            <Field
              type="object"
              name="visitorNoReply"
              x-component="VisitorNoReply"
              title="访客长时间未回复提示"
              required
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty =
                  !value.interval ||
                  !value.tip ||
                  !value.endInternal ||
                  !value.endTip;
                if (value.tipEnable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />

            <Field
              type="object"
              name="attention"
              x-component="Attention"
              title="关注提醒"
              required
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty = !value.content;
                if (value.remindEnable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />

            <Field
              type="object"
              name="agentTimeout"
              x-component="AgentTimeout"
              title="客服超时提醒"
              required
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty = !value.interval;
                if (value.tipEnable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />

            <Field
              type="object"
              name="chatDuration"
              x-component="ChatDuration"
              title="对话时长限制"
              required
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty =
                  !value.threshold || !value.limitInterval || !value.limitTip;
                if (value.limitEnable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />
          </Field>

          <FormSlot>
            <div className="box-line"></div>
            <div className="box-title">敏感词限制</div>
          </FormSlot>

          <Field type="object" name="sensitiveWord">
            <Field
              type="object"
              name="visitor"
              x-component="SensitiveWordAgent"
              title="访客敏感词限制"
              required
              {...formItemLayout}
            />
            <Field
              type="object"
              name="agent"
              x-component="SensitiveWordAgent"
              x-component-props={{ type: "客服" }}
              title="客服敏感词限制"
              required
              {...formItemLayout}
            />
            <Field
              type="object"
              name="riskWordRemind"
              x-component="RiskWordRemind"
              title="风险词提醒"
              x-rules={(value) => {
                const isEmpty = !value.riskWord;
                if (value.enable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "风险词必须填写",
                  };
                }
              }}
              {...formItemLayout}
            />
          </Field>

          <FormSlot>
            <div className="box-line"></div>
            <div className="box-title">对话保持</div>
          </FormSlot>
          <Field name="chatHold" type="object">
            <Field
              type="object"
              name="pc"
              x-component="ChatHold"
              title="PC端对话保持"
              required
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty = !value.duration;
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
              name="mobile"
              x-component="ChatHold"
              x-component-props={{ type: "手机" }}
              title="手机端对话保持"
              required
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty = !value.duration;
                if (value.enable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />
          </Field>

          <FormSlot>
            <div className="box-line"></div>
            <div className="box-title">操作提示</div>
          </FormSlot>

          <Field type="object" name="operateTip">
            <Field
              type="string"
              name="chatTransferTip"
              title="对话转接提示语"
              x-component="Input"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
            />
            <Field
              type="string"
              name="chatInsertTip"
              title="对话插入提示语"
              x-component="Input"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
            />
            <Field
              type="string"
              name="chatHoldTip"
              title="对话拦截提示语"
              x-component="Input"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
            />
            <Field
              type="string"
              name="chatJoinTip"
              title="对话协同提示语"
              x-component="Input"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
            />
            <Field
              type="string"
              name="agentCloseTip"
              title="客服主动结束提示语"
              x-component="Input"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
            />
            <Field
              type="object"
              x-component="Collection"
              title="收藏"
              name="chatCollect"
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty = !value.collectTip;
                if (value.enable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "请填写提示语",
                  };
                }
              }}
            />
            <Field
              type="object"
              x-component="TransferOverMessage"
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
          </Field>

          <FormSlot>
            <div className="box-line"></div>
            <div className="box-title">主动消息</div>
          </FormSlot>

          <Field name="activeMessage" type="object">
            <Field
              type="string"
              x-component="Input"
              title="主动发消息模板"
              name="template"
              {...formItemLayout}
              x-component-props={{ maxLength: 1000 }}
            />

            <Field
              type="object"
              x-component="ActiveMessage"
              title="离线消息超时不显示"
              name="_offline"
              {...formItemLayout}
              x-rules={(value) => {
                const isEmpty = !value.offlineMessageInterval;
                if (value.offlineMessageTimeoutEnable === "Y" && isEmpty) {
                  return {
                    type: "error",
                    message: "有必填项未填，请检查",
                  };
                }
              }}
            />
          </Field>
        </SchemaForm>
      ) : null}

      <div className="btn-group">
        <Button type="primary" onClick={submit}>
          提交
        </Button>
      </div>
    </div>
  );
}
