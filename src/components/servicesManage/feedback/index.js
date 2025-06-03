import React, { useEffect, useState, useRef, useImperativeHandle, useCallback } from "react";
import "./index.scss";
import Guide from "./grade";
import Satisfaction from "./satisfaction";
import CustomQuestion from "./customQuestion";
import Solution from "./solution";
import DisSatisfactionInfo from "./disSatisfactionInfo";
import { InputNumber, Checkbox, Row, Col } from "dpl-react";
import classnames from "classnames";

const optionConfigList = [
    {
        type: "evaluation",
        name: "满意度评价",
        key: "evaluationEnable",
        orderKey: "evaluationOrder",
        configComponent: Satisfaction,
    },
    {
        type: "solution",
        name: "解决情况",
        key: "solutionEnable",
        orderKey: "solutionOrder",
        configComponent: Solution,
    },
    {
      type: "evaluationAndSolutionCollection",
      name: "不满意/未解决信息采集项",
      key: "collectionEnable",
      orderKey: "order",
      configComponent: DisSatisfactionInfo,
    },    
    {
        type: "score",
        name: "打分情况",
        key: "scoreEnable",
        orderKey: "scoreOrder",
        configComponent: Guide,
    },
    {
        type: "customQuestion",
        name: "自定义问题",
        key: "customQuestionEnable",
        orderKey: "customQuestionOrder",
        configComponent: CustomQuestion,
    },
];
const optionConfigListLen = optionConfigList.length;
const defaultFormItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
// 提交类型
export const submitType = {
    success: "success",
    error: "error",
};
// 重置状态
export function resetState(actions) {
    const targetData = actions.getFieldState("*").values;
    let formPathPattern = [];
    if (targetData) {
        Object.keys(targetData).forEach((targetKey) => {
            const targetValue = targetData[targetKey];
            const flag =
                typeof targetValue === "boolean" ||
                (Array.isArray(targetValue) && targetValue.length > 0) ||
                targetValue;
            if (!flag) {
                formPathPattern.push(targetKey);
            }
        });
    }
    // 存在有值为空的情况下才进行处理
    if (formPathPattern.length > 0) {
        let options = {
            validate: false,
        };
        options.selector = `*(${formPathPattern.join(",")})`;
        actions.reset(options);
    }
}
// 取值逻辑
export function getDifferentValue(optionConfig, value) {
    let result = {};
    if (optionConfig) {
        let secondData = (result[optionConfig.type] = {});
        Object.keys(value).forEach((key) => {
            if (key !== optionConfig.key && key !== optionConfig.orderKey) {
                secondData[key] = value[key];
            }
        });
    }
    return result;
}
// 校验规则
// requiredOne 是否必填一个
export function feedbackRulesFunc(value, promiseArray, requiredOne = true) {
    const errorMessage = {
        type: submitType.error,
        data: {
            type: "error",
            message: " ",
        },
    };
    if (value) {
        if (requiredOne) {
            let isHasValue = false;
            for (let i = 0; i < optionConfigListLen; i++) {
                const item = optionConfigList[i];
                if (
                    value[item.type] &&
                    value[item.type][item.key] &&
                    (value[item.type][item.orderKey] ||
                        value[item.type][item.orderKey] == 0)
                ) {
                    isHasValue = true;
                    break;
                }
            }
            if (!isHasValue) {
                return {
                    type: submitType.error,
                    data: {
                        type: "error",
                        message: "评价项不能为空",
                    },
                };
            }
        }
        let result = [];
        if (Array.isArray(promiseArray)) {
            result = promiseArray.filter(
                (item) => item.type === submitType.error
            );
        }
        if (result.length > 0) {
            return errorMessage;
        }
        return {
            type: submitType.success,
            data: promiseArray,
        };
    } else {
        return errorMessage;
    }
}

export default function FeedbackComponent(props) {
    const {
        value = {},
        onChange,
        className,
        style,
        setComponentRef,
        batchUpdate,
        disabled = false,
        allowMap, // batchUpdate = true时禁用取allowMap 否则 取 disabled
        formItemLayout = defaultFormItemLayout,
        isShowDiff = false,
    } = props;
    const refList = useRef([]);
    const componentRef = useRef(null);

    const getDisbaledByType = useCallback((type) => {
        if (batchUpdate && JSON.parse(allowMap)) {
            return !JSON.parse(allowMap)[type];
        }
        return disabled;
    }, [batchUpdate, disabled, allowMap]);

    useImperativeHandle(componentRef, () => ({
        submit: () => {
            const submitList = refList.current.map((item) => {
                const func = item && item.submit;
                if (typeof func === "function") {
                    return func();
                }
                return Promise.resolve(true);
            });
            return Promise.all(submitList);
        },
    }));

    /**
     * 类型发生变化
     */
    const feedBackTypeOnChange = (item, e) => {
        console.info('feedBackTypeOnChange', item, e);
        const { type, key, name } = item;
        const val = e.target.checked;
        const result = Object.assign({}, value);
        if (result[type]) {
            result[type][key] = val;
            onChange && onChange(result);
        }
    };

    const setItemComponentRef = (el, index) => {
        refList.current[index] = el;
    };

    /**
     * 排序发生变化
     */
    const feedBackOrderOnChange = (item, e, changeKey) => {
        // changeKey为修改的key，默认orderKey
        const { type, orderKey, name } = item;
        const result = Object.assign({}, value);
        if (result[type]) {
            result[type][changeKey || orderKey] = e;
            onChange && onChange(result);
        }
    };
    const bodyClassName = classnames("feedback-box", {
        [className]: className,
    });

    useEffect(() => {
        setComponentRef(componentRef);
    }, []);
    return (
        <div className={bodyClassName} style={style}>
            {Array.isArray(optionConfigList) &&
                optionConfigList.map((item, index) => {
                    const { type, key, configComponent, name, orderKey } = item;
                    const ItemComponent = configComponent;
                    const offset =
                        index === 0 ? 0 : formItemLayout.labelCol.span;
                    return (
                        <div className="feedback-item-box" key={key}>
                            <div className="item-option">
                                <Row>
                                    {index === 0 && (
                                        <Col
                                            span={formItemLayout.labelCol.span}
                                            className="dpl-form-item-label"
                                        >
                                            <label title="请选择评价项">
                                                请选择评价项
                                            </label>
                                        </Col>
                                    )}
                                    <Col span={6} offset={offset}>
                                        <Checkbox
                                            checked={
                                                (value[type] &&
                                                    value[type][key]) ||
                                                false
                                            }
                                            onChange={(e) => {
                                              feedBackTypeOnChange(item, e);
                                            }}
                                            disabled={getDisbaledByType(type)}
                                        >
                                            {name}
                                        </Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <span>顺序：</span>
                                        <InputNumber
                                            min={0}
                                            max={9}
                                            value={
                                                (value[type] &&
                                                    value[type][orderKey]) ||
                                                0
                                            }
                                            disabled={
                                                getDisbaledByType(type) ||
                                                (value[type] &&
                                                    !value[type][key]) ||
                                                false
                                            }
                                            onChange={(e) => {
                                                feedBackOrderOnChange(item, e);
                                            }}
                                        />
                                    </Col>
                                    {type ==='customQuestion' &&  <Col span={7}>
                                        <span>展示问题数：</span>
                                        <InputNumber
                                            min={1}
                                            max={9}
                                            value={
                                                (value[type] &&
                                                    value[type]['displayNum']) ||
                                                1
                                            }
                                            disabled={
                                                getDisbaledByType(type) ||
                                                (value[type] &&
                                                    !value[type][key]) ||
                                                false
                                            }
                                            onChange={(e) => {
                                                feedBackOrderOnChange(item, e, 'displayNum');
                                            }}
                                        />
                                    </Col>}
                                </Row>
                            </div>
                            <ItemComponent
                                className="option-form"
                                detail={value[type]}
                                config={item}
                                required={
                                  (value[type] && value[type][key]) || false
                                }
                                disabled={getDisbaledByType(type)}
                                formItemLayout={formItemLayout}
                                ref={(el) => {
                                    setItemComponentRef(el, index);
                                }}
                                isShowDiff={isShowDiff}
                                resetStateFunc={resetState}
                            />
                        </div>
                    );
                })}
        </div>
    );
}
