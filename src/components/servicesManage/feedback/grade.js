import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    useLayoutEffect,
    useReducer,
} from "react";
import "./index.scss";
import { uForm } from "dora";
import { submitType, getDifferentValue } from "./index";
const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
    FormSlot,
} = uForm;
const actions = createFormActions();

function grade(props, ref) {
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
        actions.setFieldState("scoreTip", (state) => {
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
    return (
        detail && (
            <SchemaForm
                actions={actions}
                initialValues={detail}
                className={className}
                style={style}
            >
                <Field
                    {...formItemLayout}
                    name="scoreTip"
                    type="string"
                    title="引导语"
                    x-component="Input"
                    x-component-props={{
                        placeholder: "请输入用户问题解决情况时的引导语",
                        maxLength: 200,
                        disabled: disabledFlag,
                    }}
                    x-rules={[
                        {
                            required,
                            message: "请输入用户问题解决情况时的引导语",
                        },
                    ]}
                />
            </SchemaForm>
        )
    );
}

export default React.forwardRef(grade);
