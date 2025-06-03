import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    useLayoutEffect,
} from "react";
import "./index.scss";
import { uForm } from "dora";
import QuestionComponent from "./questionComponent";
import { submitType, getDifferentValue } from "./index";
const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
    FormSlot,
} = uForm;
const actions = createFormActions();

function customQuestion(props, ref) {
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
    const [disabledFlag, setDisabledFlag] = useState(false);

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
        actions.setFieldState("*(!feedbackTip)", (state) => {
            state.errors = [];
            state.required = required;
        });
        actions.validate("*");
    }, [required]);

    useLayoutEffect(() => {
        if (disabled) {
            resetStateFunc && resetStateFunc(actions);
        }
        setDisabledFlag(disabled || !required);
    }, [disabled, required]);
    // console.log('customQuestionEnable', detail);
    return (
        detail && (
            <SchemaForm
                actions={actions}
                initialValues={detail}
                components={{ QuestionComponent }}
                className={className}
                style={style}
            >
                <Field
                    wrapperCol={{span: 22}}
                    name="questionList"
                    type="string"
                    x-component="QuestionComponent"
                    x-component-props={{
                        disabled: disabledFlag,
                    }}
                    x-rules={[
                        { required, message: "请填写自定义问题" },
                        (value) => {
                            if(!detail.customQuestionEnable) return
                            let indexArr = [];
                            for (let i = 0; i < value.length; i++) {
                                let item = value[i];
                                
                                if (!item || !item.questionTip || item.questionOptionList.some(item => !item)) {
                                    indexArr.push(i + 1);
                                }
                            }
                            if (indexArr.length > 0) {
                                return {
                                    type: "error",
                                    message:
                                        "第" +
                                        indexArr.join(",") +
                                        "条数据未完善",
                                };
                            }
                            if(detail.displayNum > value?.length) {//这边不能用detail.questionList来判断，内部值变化不会触发
                                return {
                                    type: "error",
                                    message: '展示问题数不可大于总自定义问题数',
                                };
                            }
                        },
                    ]}
                />
            </SchemaForm>
        )
    );
}

export default React.forwardRef(customQuestion);
