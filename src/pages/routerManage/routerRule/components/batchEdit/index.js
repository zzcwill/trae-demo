import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { message, Select, Modal, Row, Col } from "dpl-react";
import { get, post, postFile } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { uForm, UploadImage } from "dora";
import RuleConfig from "../ruleConfig";
import AutoCustomerService from "../manMachine/autoCustomerService";
import QuestionComponent from "@/components/servicesManage/feedback/questionComponent";
import WaitingMessage from "@/pages/routerManage/routerRule/components/chatTip/waitingMessage";
import CustomCheckbox from "@/components/common/customCheckbox";
import { olhelpEnumOptionType } from "@/const/config";
import TextArea from "@/components/common/textArea";
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const formItemLayout1 = {
  labelCol: { span: 12 },
  wrapperCol: { span: 10 },
};
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormEffectHooks,
  Row: DRow,
  Col: DCol,
} = uForm;
const actions = createFormActions();
const { onFieldValueChange$ } = FormEffectHooks;

// 批量操作配置
const batchSettingList = [
  {
    id: "add",
    name: "批量新增条件",
    value: "1",
    tips: "提示",
  },
  {
    id: "delete",
    name: "批量删除条件",
    value: "2",
    breakNext: true, // 不可以下一步操作
    tips: "无法删除，以下规则将会没有规则条件，请确认后重新操作",
  },
  {
    id: "updateModel",
    name: "批量修改受理模式",
    value: "3",
    breakNext: true, // 不可以下一步操作
    tips: "提示",
  },
  {
    id: "updateGroup",
    name: "批量修改分配组",
    value: "4",
    tips: "提示",
  },
  {
    id: "updateLogo",
    name: "批量修改窗口界面Logo图",
    value: "5",
    tips: "以下规则中窗口界面使用全局设置，是否继续修改",
  },
  {
    id: "updateWelcome",
    name: "批量修改欢迎语",
    value: "6",
    tips: "以下规则中对话提示使用全局设置，是否继续修改",
  },
  {
    id: "updateWaiting",
    name: "批量修改排队提示语",
    value: "7",
    tips: "以下规则中对话提示使用全局设置，是否继续修改",
  },
  {
    id: "batchRobotToArtificial",
    name: "批量修改机器人多次对话转人工配置",
    value: "8",
    tips: "以下规则中人机协助使用全局设置，是否继续修改",
  },
  // {
  //   id: "batchSetSatisfaction",
  //   name: "批量配置满意度评价自定义问题",
  //   value: "9",
  //   tips: "有规则满意度评价使用全局设置或未选中使用自定义问题，请确认是否继续修改",
  // },
  {
    id: "batchSetHorseRaceLamp",
    name: "批量修改跑马灯",
    value: "10",
    tips: "以下规则中对话提示使用全局设置，是否继续修改",
  },
  {
    id: "batchSetCustomerServiceButtonEnable",
    name: "批量修改窗口界面转人工按钮是否展示",
    value: "11",
    tips: "以下规则中对话提示使用全局设置，是否继续修改",
  },
  {
    id: "batchSetWaitingMessage",
    name: "批量修改对话提示排队发送消息",
    value: "12",
    tips: "以下规则中对话提示使用全局设置，是否继续修改",
  },
];
// 默认批量操作为批量新增组
const defaultBatchSettingCode = "add";
// 因为对象会被修改
const defaultData = {
  "operateType": "add",
  "logoImageUrl": [

  ],
  "conditionList": [
      {
          "paramCode": "",
          "operatorType": "",
          "targetValue": ""
      }
  ],
  "questionList": [
      {
          "questionTip": "",
          "multipleEnable": "Y",
          "solutionOptionRequired": "N",
          "questionOptionList": [
              ""
          ]
      }
  ],
  "displayNum": 1,
  "customQuestionEnable": true,
  "customQuestionOrder": 0,
  waitingMessage:  {
    waitingMessageSendConfigList: [
      { sendNum: "", sendTip: "" },
      { sendNum: "", sendTip: "" },
    ],
    waitingSendMessageEnable: false,
    // waitingMessageSendLimit: "",
    // waitingMessageSendLimitTip: "",
    // disableTip: "",
  }
};

export default function BatchSetting(props) {
  const { visible, idList = [], onCancel, setLoading } = props;
  const [defaultValue, setDefaultValue] = useState(JSON.parse(JSON.stringify(defaultData)));
  const [paramCode, setParamCode] = useState([]); // 删除的枚举值
  const [acceptanceModes, setAcceptanceModes] = useState([]); // 受理模式
  const [currentAcceptanceMode, setCurrentAcceptanceMode] = useState(-1);
  const [operateType, setOperateType] = useState(defaultBatchSettingCode); // 操作
  const [groupList, setGroupList] = useState([]); //在线组
  const [customQuestionCheck, setCustomQuestionCheck] = useState(true); // 自定义问题是否选中
  const customQuestionCheckRef = useRef(true);
  const displayNumRef = useRef(1)
  const [displayNum, setDisplayNum] = useState(1); // 显示的问题数量
  /**
   * 批量操作类型修改
   */
  const batchOptionChange = (value) => {
    setCustomQuestionCheck(true);
    resetField(value);
    setTimeout(() => {
      setOperateType(value);
    }, 0)
  };

  const resetField = (value = operateType) => {
    setDefaultValue(JSON.parse(JSON.stringify(defaultData)));
    actions.reset();
    if (value === "add") {
      actions.setFieldState("conditionList", (state) => {
        state.value = [{ paramCode: "", operatorType: "", targetValue: "" }];
      });
    } else if (value === "batchSetSatisfaction") {
      
      customQuestionCheckRef.current = true
      displayNumRef.current = 1
      actions.setFieldState("questionList", (state) => {
        state.value = [
          {
            questionTip: "",
            multipleEnable: "Y",
            solutionOptionRequired: "N",
            questionOptionList: [""],
          },
        ];
      });

    }
  };

  const uploadHandler = async (files) => {
    const data = await postFile(Api.saveImage, { data: { file: files[0] } });
    return [
      {
        imageUrl: data.data.domain + data.data.imageUrl,
        name: data.data.name,
      },
    ];
  };

  const dealData = async (values, currentOperatorItem) => {
    const apiDict = {
      batchSetHorseRaceLamp: Api.postWindowBatchUpdate, // 批量修改跑马灯
      batchSetCustomerServiceButtonEnable: Api.postWindowBatchUpdate,
      updateLogo: Api.postWindowBatchUpdate,
      batchSetWaitingMessage: Api.postChatTipBatchUpdate,
    }
    const submitPost = async (data) => {
      setLoading(true);
      const newRes = await post({
        url: apiDict[operateType] || Api.postBatchOperateUpdate,
        data,
      });
      setLoading(false);
      if (newRes.success) {
        message.success(`${name}成功`);
        resetField();
        onCancel && onCancel();
      } else if (newRes.message) {
        message.error(newRes.message);
      }
    };

    const {
      conditionList,
      deleteCondition = [],
      acceptanceMode,
      groupId,
      logoImageUrl = [],
      welcomeTip,
      waitingTip,
      autoCustomerService,
      questionList,
      customQuestionEnable,
      displayNum,
      customQuestionOrder,
      carousel,
      carouselStartDate,
      carouselEndDate,
      customerServiceButtonEnable,
      waitingMessage,
    } = values;
    const dict = {
      add: conditionList,
      delete: deleteCondition.map((item) => {
        return {
          paramCode: item,
        };
      }),
      updateModel: acceptanceMode,
      updateGroup: groupId,
      updateLogo: {
        fieldList: ['logoImageUrl'],
        routeRuleWindow: {
          logoImageUrl: logoImageUrl[0]?.imageUrl
        }
      } ,
      updateWelcome: welcomeTip,
      updateWaiting: waitingTip,
      batchRobotToArtificial: {
        ...autoCustomerService,
        multiRoundsEnable:
          autoCustomerService?.multiRoundsEnable === true ? "Y" : "N",
      },
      batchSetSatisfaction: {
        customQuestionEnable: customQuestionEnable === true ? "Y" : "N",
        customQuestionOrder,
        displayNum,
        questionList,
      },
      batchSetHorseRaceLamp: {
        fieldList: ['carousel'],
        routeRuleWindow: {
          carousel,
          carouselStartDate: carousel && carouselStartDate ? carouselStartDate : undefined,
          carouselEndDate: carousel && carouselEndDate ? carouselEndDate : undefined,
        }
      },
      batchSetCustomerServiceButtonEnable: {
        fieldList: ['customerServiceButtonEnable'],
        routeRuleWindow: {
          customerServiceButtonEnable
        }
      },
      batchSetWaitingMessage: {
        // fieldList: [
        //   'waitingMessageSendConfigList',
        //   'waitingMessageSendLimit',
        //   'waitingMessageSendLimitTip',
        //   'waitingSendMessageEnable',
        //   'disableTip'
        // ],
        fieldList: ['waitingMessageSend'],
        routeRuleChatTip: {
          waitingSendMessageEnable: waitingMessage?.waitingSendMessageEnable === true ? "Y" : "N",
          waitingMessageSendLimit : waitingMessage?.waitingSendMessageEnable === true ? waitingMessage?.waitingMessageSendLimit : undefined,
          waitingMessageSendLimitTip : waitingMessage?.waitingSendMessageEnable === true ? waitingMessage?.waitingMessageSendLimitTip : undefined,
          waitingMessageSendConfigList: waitingMessage?.waitingSendMessageEnable === true ? waitingMessage?.waitingMessageSendConfigList.filter(
            (item) => {
              return item.sendNum && item.sendTip;
            }
          ): undefined,
          disableTip: waitingMessage?.waitingSendMessageEnable !== true ? waitingMessage?.disableTip?.trim() : undefined,
        }
      }
    };
    const { name, value, breakNext, globalTips } = currentOperatorItem;
    // 校验接口
    const newCheckPostData = {
      batchSetCustomerServiceButtonEnable: 'window',
      batchSetHorseRaceLamp: 'window',
      updateLogo: 'window',
      batchSetWaitingMessage: 'chatTip',
    }
    const data = newCheckPostData[operateType] ? {
      ruleIdList: idList,
      ...dict[operateType],
    } : {
      ruleIdList: idList,
      content: dict[operateType],
      operateType: value,
    };
    // console.log("data", data);

    // postBatchOperateCheckConfig是以前旧的校验接口
    const res = await post({
      url: newCheckPostData[operateType] ? Api.postCheckGlobalConfig : Api.postBatchOperateCheckConfig,
      data: newCheckPostData[operateType] ? {
        ruleIdList: idList,
        checkType: newCheckPostData[operateType]
      } : data,
    });
    if (res.success) {
      if (!res.data?.checkSuccess) {
        // res.data?.tip 换行展示
        Modal.confirm({
          title: "有规则使用全局设置，请确认是否继续修改，如果确定以下规则会调整为差异化配置",
          width: 560,
          content: (
            <div
              className="tips-content"
              style={{
                maxHeight: '560px',
                overflowY: 'auto'
              }}
              dangerouslySetInnerHTML={{
                __html:
                  operateType === "add"
                    ? res.data?.failureMsgList.join("<br/>")
                    : res.data?.failureMsgList.join("，"),
              }}
            ></div>
          ),
          onOk: async () => {
            if (!breakNext) {
              // 不阻断就继续往下走，除了删除其他都不阻断
              submitPost(data);
            }
          },
          onCancel: () => {},
        });
      } else {
        submitPost(data);
      }
    }
  };

  const cancelHandler = () => {
    resetField();
    onCancel && onCancel();
  };
  const okHandler = () => {
    actions.submit().then(
      ({ values }) => {
        console.log("values", values);
        const currentOperatorItem = batchSettingList.find(
          (item) => item.id === operateType
        );
        Modal.confirm({
          title: `是否${currentOperatorItem.name}？`,
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            dealData(values, currentOperatorItem);
          },
        });
      },
      (err) => {}
    );
  };
  const getOptions = async () => {
    const groupNames = [
      olhelpEnumOptionType.RouterRuleParamCode,
      olhelpEnumOptionType.route_rule_acceptance_mode,
    ];
    const data = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: groupNames.join(","),
      },
    });
    let map = {
      [olhelpEnumOptionType.RouterRuleParamCode]: setParamCode,
      [olhelpEnumOptionType.route_rule_acceptance_mode]: setAcceptanceModes,
    };
    if (Array.isArray(data.data)) {
      data.data.forEach((item) => {
        map[item.groupName] && map[item.groupName](item.options);
      });
    }
  };

  const getGroupList = async () => {
    const data = await get({
      url: Api.getCommonGroupList,
      params: { type: "2" },
    });
    if (data.success) {
      setGroupList(data.data);
    }
  };

  const effectsFunc = () => {
    onFieldValueChange$("customQuestionEnable").subscribe(({ value }) => {
      if (value !== undefined) {
        setCustomQuestionCheck(value);
      }
    });
  };

  useEffect(() => {
    customQuestionCheckRef.current = customQuestionCheck;
    displayNumRef.current = displayNum
    actions.validate("questionList");
  }, [customQuestionCheck, displayNum]);
  useEffect(() => {
    getOptions();
    getGroupList();
  }, []);

  return (
    <Modal
      title="批量设置"
      visible={visible}
      width={960}
      className="batch-edit-modal"
      destroyOnClose
      onOk={okHandler}
      onCancel={cancelHandler}
    >
      <Row className="operate-view">
        <Col span={5} className="left-view">
          <span className="title-message">操作&nbsp;:&nbsp;</span>
        </Col>
        <Col span={18}>
          <Select
            value={operateType}
            placeholder="请选择操作类型"
            style={{ width: "100%" }}
            onChange={batchOptionChange}
          >
            {batchSettingList.map((item) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>
      <SchemaForm
        actions={actions}
        initialValues={defaultValue}
        components={{
          RuleConfig,
          UploadImage,
          AutoCustomerService,
          QuestionComponent,
          TextArea,
          CustomCheckbox,
          WaitingMessage,
        }}
        effects={effectsFunc}
      >
        {/* <Field
          {...formItemLayout}
          type="string"
          title="操作"
          name="operateType"
          x-component="Select"
          x-component-props={{
            placeholder: "操作",
            dataSource: batchSettingList,
            showSearch: true,
            optionFormat: {
              label: "name",
              value: "id",
            },
            onChange(e) {
              setOperateType(e);
            },
            filterOption: function (input, option) {
              return (
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              );
            },
          }}
          x-rules={[{ required: true, message: "请选择操作" }]}
        /> */}
        {operateType === "add" && (
          <Field
            {...formItemLayout}
            type="string" //array数组中会多一行
            title="规则配置"
            name="conditionList"
            x-component="RuleConfig"
            x-component-props={{ placeholder: "请输入" }}
            x-rules={[
              { required: true, message: "请配置规则" },
              (value) => {
                let indexArr = [];
                Array.isArray(value) &&
                  value.forEach((item, index) => {
                    if (
                      !item.operatorType ||
                      !item.paramCode ||
                      !item.targetValue
                    ) {
                      indexArr.push(index + 1);
                    }
                  });
                if (indexArr.length > 0) {
                  return {
                    type: "error",
                    message:
                      "第" + indexArr.join(",") + "条规则有未填项，请检查",
                  };
                }
              },
            ]}
          />
        )}
        {operateType === "delete" && (
          <Field
            {...formItemLayout}
            type="string"
            title="请选择需要删除的条件"
            name="deleteCondition"
            x-rules={[{ required: true, message: "请选择需要删除的条件" }]}
            x-component="Select"
            x-component-props={{
              placeholder: "请选择",
              multiple: true,
              dataSource: paramCode,
              showSearch: true,
              optionFormat: {
                label: "name",
                value: "id",
              },
              filterOption: function (input, option) {
                return (
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                );
              },
            }}
          />
        )}
        {operateType === "updateModel" && (
          <Field
            {...formItemLayout}
            type="string"
            title="受理模式"
            name="acceptanceMode"
            x-component="Select"
            x-component-props={{
              placeholder: "请选择受理模式",
              dataSource: acceptanceModes,
              showSearch: true,
              optionFormat: {
                label: "name",
                value: "id",
              },
              onChange(e) {
                setCurrentAcceptanceMode(e);
              },
              allowClear: true,
            }}
            x-rules={[{ required: true, message: "请选择受理模式" }]}
          />
        )}
        {currentAcceptanceMode == "4" && (
          <Field
            {...formItemLayout}
            name="tips"
            type="string"
            title="注"
            x-props={{
              style: { color: "red", fontSize: "12px" },
            }}
            x-component-props={{
              children:
                "机器人与人工都不启用时，请到对话提示中设置无服务提示语。",
            }}
            x-component="customText"
          />
        )}
        {operateType === "updateGroup" && (
          <Field
            {...formItemLayout}
            type="string"
            title="分配给组"
            name="groupId"
            x-component="Select"
            x-rules={[{ required: true, message: "请选择分配给组" }]}
            x-component-props={{
              placeholder: "请选择在线组",
              dataSource: groupList,
              optionFormat: {
                label: "name",
                value: "id",
              },
              showSearch: true,
              allowClear: true,
              filterOption: function (input, option) {
                return (
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                );
              },
            }}
          />
        )}
        {operateType === "updateLogo" && (
          <Field
            {...formItemLayout}
            type="string"
            title="LOGO图片"
            name="logoImageUrl"
            x-component="UploadImage"
            x-component-props={{
              maxLength: 1,
              multiple: false,
              introTip: "建议尺寸：340*75px，jpg/png/gif/bmp格式",
              acceptTypes: ["png", "jpg", "jpeg", "bmp"],
              mapKey: "imageUrl",
              onUpload: uploadHandler,
              maxSize: 1024 * 1024,
              onSizeCheckError() {
                message.error("仅支持小于1MB的图片");
              },
            }}
            x-rules={[{ required: true, message: "请上传LOGO图片" }]}
          />
        )}
        {operateType === "updateWelcome" && (
          <Field
            type="string"
            title="欢迎语"
            x-rules={[{ required: true, message: "请输入欢迎语" }]}
            x-component="TextArea"
            {...formItemLayout}
            x-component-props={{ maxLength: 1000 }}
            name="welcomeTip"
          />
        )}
        {operateType === "updateWaiting" && (
          <Field
            type="string"
            name="waitingTip"
            title="排队提示语"
            x-rules={[{ required: true, message: "请输入排队提示语" }]}
            x-component="TextArea"
            x-component-props={{ maxLength: 1000 }}
            {...formItemLayout}
          />
        )}
        {operateType === "batchRobotToArtificial" && (
          <Field
            name="autoCustomerService"
            type="object"
            title="机器人多次对话转人工"
            x-component="AutoCustomerService"
            x-component-props={{}}
            {...formItemLayout}
            x-rules={(value) => {
              if (
                value.multiRoundsEnable &&
                (!value.multiRoundsCount || !value.multiRoundsTip)
              ) {
                return {
                  type: "error",
                  message: "有必填项未填，请检查",
                };
              }
            }}
          />
        )}
        {operateType === "batchSetSatisfaction" && (
          <DRow>
            <DCol span={7}>
              <Field
                type="boolean"
                name="customQuestionEnable"
                x-component="CustomCheckbox"
                title="自定义问题"
                // x-rules={[{ message: "请输入展示问题数", required: true }]}
                {...formItemLayout1}
                x-component-props={{
                  disabled: false,
                }}
              />
            </DCol>
            <DCol span={6}>
              <Field
                type="string"
                name="customQuestionOrder"
                x-component="InputNumber"
                title="顺序"
                x-rules={[{ message: "请输入顺序", required: true }]}
                {...formItemLayout1}
                x-component-props={{
                  min: 0,
                  max: 9,
                  precision: 0,
                  disabled: !customQuestionCheck,
                }}
              />
            </DCol>
            <DCol span={7}>
              <Field
                type="string"
                name="displayNum"
                x-component="InputNumber"
                title="展示问题数"
                x-rules={[{ message: "请输入展示问题数", required: true }]}
                {...formItemLayout1}
                x-component-props={{
                  max: 9,
                  min: 1,
                  precision: 0,
                  disabled: !customQuestionCheck,
                  onChange: (value) => {
                    setDisplayNum(value);
                    displayNumRef.current = value
                  },
                }}
              />
            </DCol>
          </DRow>
        )}
        {operateType === "batchSetSatisfaction" && (
          <Field
            wrapperCol={{ span: 22 }}
            name="questionList"
            type="string"
            x-component="QuestionComponent"
            x-component-props={{
              disabled: !customQuestionCheck,
            }}
            x-rules={[
              { required: true, message: "请填写自定义问题" },
              (value) => {
                if(!customQuestionCheckRef.current) return;
                let indexArr = [];
                for (let i = 0; i < value.length; i++) {
                  let item = value[i];
                  if (
                    !item ||
                    !item.questionTip ||
                    item.questionOptionList.some((item) => !item)
                  ) {
                    indexArr.push(i + 1);
                  }
                }
                if (indexArr.length > 0) {
                  return {
                    type: "error",
                    message: "第" + indexArr.join(",") + "条数据未完善",
                  };
                }
                if (displayNumRef.current > value?.length) {
                  //这边不能用detail.questionList来判断，内部值变化不会触发
                  return {
                    type: "error",
                    message: "展示问题数不可大于总自定义问题数",
                  };
                }
              },
            ]}
          />
        )}
        {operateType === "batchSetHorseRaceLamp" && (
          <Field
            {...formItemLayout}
            type="string"
            title="跑马灯"
            name="carousel"
            x-component="TextArea"
            x-rules={[{ message: "请填写跑马灯", required: true }]}
            x-component-props={{
              placeholder: "请填写跑马灯",
              maxLength: 200,
            }}
          />
        )}
        {operateType === "batchSetHorseRaceLamp" && (
          <Field type='array'
            {...formItemLayout}
            title='有效期'
            name='[carouselStartDate,carouselEndDate]'
            x-component='RangePicker'
            x-component-props={{
              "allowClear": true
            }}
          />
        )}
        {operateType === "batchSetCustomerServiceButtonEnable" && (
          <Field
            {...formItemLayout}
            type='string'
            title='转人工按钮'
            name='customerServiceButtonEnable'
            x-component='RadioGroup'
            x-component-props={{
                options: [{label: '显示', value: 'Y'}, {label: '不显示', value: 'N'}]
            }}
            x-rules={[{required: true, message: "请选择"}]}
            />
        )}
        {operateType === "batchSetWaitingMessage" && (
          <Field
            {...formItemLayout}
            type="string"
            title="排队发送消息"
            name="waitingMessage"
            x-component="WaitingMessage"
            x-component-props={{
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
        )}
      </SchemaForm>
    </Modal>
  );
}
