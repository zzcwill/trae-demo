import React, { useState } from 'react';

/**
 * 将rules格式化成对象
 * @param {Object} validateRules
 */
function getValidateTriggers(validateRules) {
  return validateRules.reduce((current, next) => Object.assign(current, next), {});
}
function isObject(obj) {
  return obj && typeof obj === 'object' && toString.call(obj) === '[object Object]';
}

function isEmptyArray(arr) {
  return arr === null || arr === undefined || arr.length === 0;
}

function isArray(arr) {
  return arr && typeof arr === 'object' && Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 *  双向绑定构造者，用法类似antd Form
 *
 * */
export function bindingCreator(Component) {
  // binding组件
  function BindWrapComponent(props, ref) {
    const [formData, setFormData] = useState({}); // 表单数据
    const [initValueStatus, setInitValueStatus] = useState({}); // 默认数据
    const [rulesData, setRulesData] = useState({}); // 校验规则
    /**
     * @Params (表单key值，初始值)
     * */
    function getBindDecorator(key, defaultValue, rules = [], validateDataChange) {
      if (defaultValue) {
        if (!initValueStatus[key]) {
          // 未初始化过
          setInitValueStatus(Object.assign(initValueStatus, { [key]: defaultValue }));
          setFormData(Object.assign(formData, { [key]: defaultValue }));
        } else {
          if (JSON.stringify(initValueStatus[key]) !== JSON.stringify(defaultValue)) {
            // 初始化过，但上次初始值和本次不一样
            setInitValueStatus(Object.assign(initValueStatus, { [key]: defaultValue }));
            setFormData(Object.assign(formData, { [key]: defaultValue }));
          }
        }
      }
      // 获取校验配置数据，模仿antd中对于rules的处理，便于将共有逻辑提取
      const rulesParam = Object.assign(getValidateTriggers(rules), { isError: false });
      if (rulesParam.required) {
        if (!rulesData[key]) {
          // TODO 修改
          setRulesData(
            Object.assign({}, rulesData, {
              [key]: {
                ...rulesParam,
                validateDataChange
              }
            })
          );
        }
      }

      return function(InputComponent) {
        if (!InputComponent) return null;
        const props = Object.assign({}, InputComponent.props);
        const { onChange, maxLength } = props;
        props.onChange = e => {
          let value = undefined;
          if (e === undefined || e === null) {
            value = e;
          } else {
            value = e.target ? (e.target.value !== undefined ? e.target.value : undefined) : e;
          }
          if (Array.isArray(value) && maxLength && value.length > maxLength) {
            return;
          }
          if (rulesData[key] && rulesData[key].required) {
            validateDataChange && validateDataChange(key, value ? 'Y' : 'N');
          }
          setFormData(pre => {
            return Object.assign({}, pre, { [key]: value });
          });
          onChange && onChange(e);
        };
        props.value = formData[key];
        props.defaultValue = defaultValue;
        return React.cloneElement(InputComponent, { ...props });
      };
    }

    /**
     * 判断是否通过必填校验
     * @param {String} key
     */
    const judgeIsRequired = key => {
      let flag = true;
      if (rulesData[key].required) {
        if (!formData[key]) {
          flag = false;
        } else {
          if (isObject(formData[key])) {
            // 如果数据是对象，判断对象是否是空对象，如果是空对象则返回false
            flag = Object.keys(formData[key]).length > 0;
          } else if (isArray(formData[key])) {
            // 判断数据是否是数组，如果是数组则判断数组长度是否大于 0 ，如果大于0，则为true，否则位false
            flag = formData[key].length > 0;
          }
        }
      }
      return flag;
    };

    /**
     * 校验数据
     * 接收一个方法为参数，方法里面接收两个参数一个是success,一个是value，在err位false的情况下不返回value
     */
    function validateData(callback, key) {
      let errorFlag = true;
      if (!key) {
        const ruleKeys = Object.keys(rulesData).reverse();
        for (let i = 0, len = ruleKeys.length; i < len; i++) {
          const rule = rulesData[ruleKeys[i]];
          errorFlag = judgeIsRequired(ruleKeys[i]);
          rule.validateDataChange && rule.validateDataChange(ruleKeys[i], errorFlag ? 'Y' : 'N');
          if (!errorFlag) {
            break;
          }
        }
      } else {
        errorFlag = judgeIsRequired(key);
      }
      if (!errorFlag) {
        callback && callback(errorFlag, {});
      } else {
        callback && callback(errorFlag, formData);
      }
      return errorFlag;
    }

    const binder = {
      getBindDecorator,
      // getData只返回数据，不做数据校验
      getData() {
        return Object.assign({}, formData);
      },
      // clearData 清除数据，支持自定义清除结果
      clearData(data) {
        setFormData(data || {});
      },
      // 校验数据
      validateData
    };
    return <Component {...props} binder={binder} ref={ref} />;
  }

  return React.forwardRef(BindWrapComponent);
}
