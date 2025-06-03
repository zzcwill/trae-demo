import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    useLayoutEffect,
} from "react";
import "./index.scss";
import { uForm } from "dora";
import { submitType, getDifferentValue } from "./index";
import Reason from "./reason";
import { MultipleInputChoice } from './multipleInputChoice';
import { OptionConfigInfo } from './optionConfigInfo';
import { MultipleChoice } from './multipleChoice';
import { SingleChoice } from './singleChoice';

const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
    FormSlot,
} = uForm;
const actions = createFormActions();
// 是否必填选项
const selectOptions = [
    { label: "必填", value: "Y" },
    { label: "非必填", value: "N" },
];

const requiredSelectOptions = [
    { label: "必填", value: true },
    { label: "非必填", value: false },
]

function solution(props, ref) {
    const {
        detail = {},
        required,
        disabled,
        config = {},
        formItemLayout,
        className,
        style,
        resetStateFunc,
    } = props;
    const [disabledFlag, setDisabledFlag] = useState(false);
    const [userInfoEnable, setUserInfoEnable] = useState(false);
    const [unsolvedReasonEnable, setunsolvedReasonEnable] = useState(false);
    const solvedDefaultOption = useRef([]);

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
    useLayoutEffect(() => {
        actions.setFieldState("*(!solvedDefaultOption,solutionCollectionOptionList)", (state) => {
            state.errors = [];
            state.required = required;
        });
        actions.validate("*");
    }, [required]);
    useLayoutEffect(() => {
        // 这里是为了处理路由设置里满意度评价切换到全局配置时如果没有数据则恢复原状
        if (disabled) {
            resetStateFunc && resetStateFunc(actions)
        }
        setDisabledFlag(disabled || !required);
    }, [disabled, required]);


    useEffect(() => {
        if (detail) {
            setUserInfoEnable(detail.unsolvedUserInfo.userInfoEnable);
            setunsolvedReasonEnable(detail.unsolvedReason.unsolvedReasonEnable);
            solvedDefaultOption.current = detail.feedbackDefaultOption ? [detail.feedbackDefaultOption] : [];
        }
    }, [detail]);

    return (
        detail && (
            <SchemaForm
                actions={actions}
                initialValues={detail}
                className={className}
                style={style}
                components={{ Reason, MultipleInputChoice, OptionConfigInfo, MultipleChoice, SingleChoice }}
            >
                <Field
                    {...formItemLayout}
                    name="solutionTip"
                    type="string"
                    title="引导语"
                    x-component="Input"
                    x-component-props={{
                        placeholder: "请输入采集解决情况时的引导语",
                        maxLength: 200,
                        disabled: disabledFlag,
                    }}
                    x-rules={[
                        {
                            required,
                            message: "请输入采集解决情况时的引导语",
                        },
                    ]}
                />
                <Field
                  type="array"
                  {...formItemLayout}
                  className="multiple-input-choice-solution"
                  x-component="MultipleInputChoice"
                  title="解决选项"
                  name="solutionOptionList"
                  x-component-props={{
                    options: detail.solutionOptionConfigList || [],
                    disabled: disabledFlag,
                    parentClassName: 'multiple-input-choice-solution',
                    onChange(data) {
                      actions.setFieldValue("solutionOptionList", data, true);
                    },
                    onChangeOptionName(data) {
                      actions.setFieldValue("solutionOptionConfigList", data, true)
                    }                    
                  }}
                  x-rules={[{ required, message: "请选择解决选项" }]}
                />  
                <Field
                 style={{ display: 'none' }}
                  type="array"
                  {...formItemLayout}
                  x-component="OptionConfigInfo"
                  title=""
                  name="solutionOptionConfigList"
                  x-component-props={{
                    disabled: disabledFlag,
                  }}                  
                />                                
                <Field
                  type="array"
                  {...formItemLayout}
                  x-component="SingleChoice"
                  title="默认选中"
                  name="solvedDefaultOption"
                  x-component-props={{
                    options: detail.solutionOptionConfigList || [],
                    disabled: disabledFlag,
                    onChange(value) {
                      if (!value.length) {
                          actions.setFieldValue("solvedDefaultOption", [] , true)
                      } else {
                          const oldValue = solvedDefaultOption.current?.[0];
                          const newValue = value.find(val => val !== oldValue);
                          if (newValue) {
                              solvedDefaultOption.current = [newValue];
                              actions.setFieldValue("solvedDefaultOption", [newValue] , true)
                          }
                      }
                  }
                  }}
                />
                <Field
                  type="array"
                  {...formItemLayout}
                  x-component="MultipleChoice"
                  title="需采集信息的选项"
                  name="solutionCollectionOptionList"
                  x-component-props={{
                    options: detail.solutionOptionConfigList || [],
                    disabled: disabledFlag,
                    onChange(data) {
                      actions.setFieldValue("solutionCollectionOptionList", data, true)
                    }
                  }}
                />


                <Field
                    {...formItemLayout}
                    name="solutionOptionRequired"
                    type="string"
                    title="是否必填"
                    x-component="RadioGroup"
                    x-component-props={{
                        options: selectOptions,
                        defaultValue: "Y",
                        disabled: disabledFlag,
                    }}
                    x-rules={[
                        {
                            required,
                            message: "请选择采集解决情况时是否必填",
                        },
                    ]}
                />
                {/* <Field
                    type="string"
                    {...formItemLayout}
                    x-component="CheckboxGroup"
                    title="默认选中"
                    name="solvedDefaultOption"
                    x-component-props={{
                        options: [{
                            label: '解决',
                            value: '1'
                        }, {
                            label: '未解决',
                            value: '0'
                        }],
                        disabled: disabledFlag,
                        onChange(value) {
                            if (!value.length) {
                                actions.setFieldValue("solvedDefaultOption", [] , true)
                            } else {
                                const oldValue = solvedDefaultOption.current?.[0];
                                const newValue = value.find(val => val !== oldValue);
                                if (newValue) {
                                    solvedDefaultOption.current = newValue;
                                    actions.setFieldValue("solvedDefaultOption", [newValue] , true)
                                }
                            }
                        }
                    }}
                /> */}
                <Field 
                    type="object"
                    name="unsolvedUserInfo"
                >
                    <Field
                        {...formItemLayout}
                        name="userInfoEnable"
                        type="boolean"
                        title="采集未解决用户信息"
                        x-component="Switch"
                        x-component-props={{
                            onChange(e) {
                                console.log(e, 'e');
                                setUserInfoEnable(e);
                            },
                            disabled: disabledFlag
                        }}
                    />
                    {userInfoEnable && (
                        <>
                            <Field
                                {...formItemLayout}
                                name="userInfoOptionList"
                                type="string"
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
                                    defaultValue: "Y",
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
                                placeholder: "请输入采集用户解决信息时的引导语",
                                maxLength: 200,
                                disabled: disabledFlag,
                            }}
                            x-rules={[
                                {
                                    required,
                                    message: "请输入采集用户未解决信息时的引导语",
                                },
                            ]}
                        />
                    )}
                </Field>
                <Field
                    type="object"
                    name="unsolvedReason"
                >
                    <Field
                        {...formItemLayout}
                        name="unsolvedReasonEnable"
                        type="string"
                        title="采集未解决原因"
                        x-component="Switch"
                        x-component-props={{
                            onChange(e) {
                                setunsolvedReasonEnable(e);
                            },
                            disabled: disabledFlag,
                        }}
                    />
                    {unsolvedReasonEnable && (
                        <Field
                            {...formItemLayout}
                            name="unsolvedReasonMultipleEnable"
                            type="string"
                            title="支持访客多选"
                            x-component="Switch"
                            x-component-props={{
                                disabled: disabledFlag,
                            }}
                        />
                    )}
                    {unsolvedReasonEnable && (
                        <Field
                            {...formItemLayout}
                            name="unsolvedReasonRequired"
                            type="boolean"
                            title="是否必填"
                            x-component="RadioGroup"
                            x-component-props={{
                                options: requiredSelectOptions,
                                defaultValue: "Y",
                                disabled: disabledFlag,
                            }}
                            x-rules={[
                                {
                                    required,
                                    message: "请选择采集未解决原因是否必填",
                                },
                            ]}
                        />
                    )}
                    {unsolvedReasonEnable && (
                        <Field
                            {...formItemLayout}
                            name="unsolvedReasonTip"
                            type="string"
                            title="引导语"
                            x-component="Input"
                            x-component-props={{
                                placeholder: "请输入采集未解决原因时的引导语",
                                maxLength: 200,
                                disabled: disabledFlag,
                            }}
                            x-rules={[
                                {
                                    required,
                                    message: "请输入采集未解决原因时的引导语",
                                },
                            ]}
                        />
                    )}
                    {unsolvedReasonEnable && (
                        <Field
                            {...formItemLayout}
                            name="unsolvedReasonOptionList"
                            type="string"
                            title="选项"
                            x-component="Reason"
                            x-component-props={{
                                disabled: disabledFlag,
                            }}
                            x-rules={[
                                { required, message: "请填写选项" },
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

export default React.forwardRef(solution);
