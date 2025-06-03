import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useLayoutEffect,
} from "react";
import "./index.scss";
import { uForm } from "dora";
import Reason from "./reason";
import { submitType, getDifferentValue } from "./index";
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  createFormActions,
  FormSlot,
} = uForm;
const actions = createFormActions();
const requiredSelectOptions = [
  { label: "必填", value: true },
  { label: "非必填", value: false },
]

function disSatisfactionInfo(props, ref) {
  const {
      detail = {},
      required,
      disabled,
      config = {},
      formItemLayout,
      className,
      style,
      resetStateFunc,
      isShowDiff,
  } = props;
  const [userInfoEnable, setUserInfoEnable] = useState(false);
  const [dissatisfiedReasonEnable, setDissatisfiedReasonEnable] = useState(false);
  const [disabledFlag, setDisabledFlag] = useState(false);
  // const feedbackDefaultOptionRef = useRef(null);

  useImperativeHandle(ref, () => ({
      submit: () => {
          return new Promise((resolve, reject) => {
              actions.submit().then(
                  ({ values }) => {
                      resolve({
                          type: submitType.success,
                          data: getDifferentValue(config, values),
                      });
                  },
                  (err) => {
                      resolve({
                          type: submitType.error,
                          data: err,
                      });
                  }
              );
          });
      },
  }));

  useEffect(() => {
      if (detail) {
          setUserInfoEnable(detail.evaluationAndSolutionUserInfoCollection.userInfoEnable);
          setDissatisfiedReasonEnable(detail.evaluationAndSolutionReasonCollection.reasonEnable);
          // feedbackDefaultOptionRef.current = detail.feedbackDefaultOption;
      }
  }, [detail]);

  // useEffect(() => {
  //     actions.setFieldState("*(!feedbackTip,feedbackDefaultOption)", (state) => {
  //         state.errors = [];
  //         state.required = required;
  //     });
  //     actions.validate("*");
  // }, [required]);

  useLayoutEffect(() => {
      if (disabled) {
        resetStateFunc && resetStateFunc(actions);
      }
      setDisabledFlag(disabled || !required);
  }, [disabled, required]);

  return (
      detail && (
          <SchemaForm
              actions={actions}
              initialValues={detail}
              components={{ Reason }}
              className={className}
              style={style}
          >
              <Field type="object" name="evaluationAndSolutionUserInfoCollection">
                <Field
                  {...formItemLayout}
                  name="userInfoEnable"
                  type="boolean"
                  title="采集未解决/不满意用户信息"
                  x-component="Switch"
                  x-component-props={{
                      onChange(e) {
                          setUserInfoEnable(e);
                      },
                      disabled: disabledFlag,
                  }}
                />
                {userInfoEnable && (
                    <>
                        <Field
                            {...formItemLayout}
                            name="userInfoOptionList"
                            type="array"
                            title="用户信息"
                            x-component="CheckboxGroup"
                            x-component-props={{
                                options: [
                                    { label: "称呼", value: "0" },
                                    { label: "电话", value: "1" },
                                ],
                                disabled: disabledFlag,
                            }}
                            style={{ marginTop: 20 }}
                            x-rules={[
                                {
                                    required,
                                    message: "请选择要采集的用户信息",
                                },
                            ]}
                        />
                        <Field
                            {...formItemLayout}
                            name="userInfoRequired"
                            type="boolean"
                            title="是否必填"
                            x-component="RadioGroup"
                            x-component-props={{
                                options: requiredSelectOptions,
                                disabled: disabledFlag,
                            }}
                            x-rules={[
                                {
                                    required,
                                    message: "请选择用户信息是否必填",
                                },
                            ]}
                        />
                    </>
                )}
                {userInfoEnable && (
                    <Field
                        {...formItemLayout}
                        name="userInfoTip"
                        type="string"
                        title="引导语"
                        x-component="Input"
                        x-component-props={{
                            placeholder: "请输入采集用户不满意信息时的引导语",
                            maxLength: 200,
                            disabled: disabledFlag,
                        }}
                        x-rules={[
                            {
                                required,
                                message: "请输入采集用户不满意信息时的引导语",
                            },
                        ]}
                    />
                )}
              </Field>
              <Field type="object" name="evaluationAndSolutionReasonCollection">
                <Field
                  {...formItemLayout}
                  name="reasonEnable"
                  type="boolean"
                  title="采集未解决/不满意原因"
                  x-component="Switch"
                  x-component-props={{
                      onChange(e) {
                          setDissatisfiedReasonEnable(e);
                      },
                      disabled: disabledFlag,
                  }}
                />
                {dissatisfiedReasonEnable && (
                    <Field
                        {...formItemLayout}
                        name="reasonMultipleEnable"
                        type="boolean"
                        title="支持访客多选"
                        x-component="Switch"
                        x-component-props={{
                            disabled: disabledFlag,
                        }}
                    />
                )}
                {dissatisfiedReasonEnable && (
                    <Field
                        {...formItemLayout}
                        name="reasonRequired"
                        type="boolean"
                        title="是否必填"
                        x-component="RadioGroup"
                        x-component-props={{
                            options: requiredSelectOptions,
                            disabled: disabledFlag,
                        }}
                        x-rules={[
                            {
                                required,
                                message: "请选择采集不满意原因是否必填",
                            },
                        ]}
                    />
                )}
                {dissatisfiedReasonEnable && (
                    <Field
                        {...formItemLayout}
                        name="reasonTip"
                        type="string"
                        title="引导语"
                        x-component="Input"
                        x-component-props={{
                            placeholder: "请输入采集不满意原因时的引导语",
                            maxLength: 200,
                            disabled: disabledFlag,
                        }}
                        x-rules={[
                            {
                                required,
                                message: "请输入采集不满意原因时的引导语",
                            },
                        ]}
                    />
                )}
                {dissatisfiedReasonEnable && (
                    <Field
                        {...formItemLayout}
                        name="reasonOptionList"
                        type="string"
                        title="未解决/不满意项"
                        x-component="Reason"
                        x-component-props={{
                          disabled: disabledFlag,
                        }}
                        x-rules={[
                            { required, message: "请填写不满意项" },
                            (value) => {
                                let indexArr = [];
                                for (let i = 0; i < value.length; i++) {
                                    let item = value[i];
                                    if (!item) {
                                        indexArr.push(i + 1);
                                    }
                                }
                                if (indexArr.length > 0) {
                                    return {
                                        type: "error",
                                        message:
                                            "第" +
                                            indexArr.join(",") +
                                            "条数据未填",
                                    };
                                }
                            },
                        ]}
                    />
                )}
              </Field>
          </SchemaForm>
      )
  );
}

export default React.forwardRef(disSatisfactionInfo);
