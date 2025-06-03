/**
 * @description 透出表单的核心api能力，基于uform
 */
import { uForm } from 'dora';

export const createFormActions = uForm.createFormActions;
// 表单全局状态保存，包括表单的值、schema相关的一系列数据
export const globalState = {
  __status__: 'unmounted',
  preSchema: undefined,
  schema: undefined,
  updateSchema: undefined,
  actions: undefined,
  formFieldMap: {},
  eventMap: {},
  forceUpdate: undefined,
  mode: undefined,
}
const originPropertyNamesMap = {
  hidden: {
    type: Boolean
  }
}
// 缓存函数
const stateListenerFactory = () => {
  // eslint-disable-next-line sonarjs/no-unused-collection
  const callBackMap = {};
  return {
    addListener: (callBack, elementId) => {
      callBackMap[elementId] = callBackMap[elementId] || [];
      callBackMap[elementId].push(callBack);
    },
    emit: (elementId, state) => {
      callBackMap[elementId]?.forEach(fn => fn(elementId, state))
    },
  }
}
const stateListeners = stateListenerFactory();
/**
  * @description 订阅schema的element  value的状态变化，并返回nextState
  * @param {function} callBack
  * @param {string[]} elementId 参数列表，具体是元素id的属性路径
  */
export const subscribe = (callBack, elementId) => {
  if (!callBack) {
    console.error('你必须传入回调函数来处理监听的状态变化');
  }
  stateListeners.addListener(callBack, elementId);
}

/**
  * @description 更新表单值
  */
const updateFormValeus = (changedFormState) => {
  const changedKeys = Object.keys(changedFormState);
  // 更新表单值
  if (changedKeys?.length) {
    changedKeys.forEach((key) => {
      globalState.actions?.setFieldValue(key, changedFormState[key]);
    })
    changedKeys.forEach((key) => {
      const shouldEmitElementsList = globalState.formFieldMap[key];
      shouldEmitElementsList?.forEach(elementId => stateListeners.emit(elementId, { value: changedFormState[key] }));
    });
  }
}

/**
  * @description 改变element的各种属性以更新schema和渲染页面
  */
export const setElements = (elementsState = {}) => {
  const elements = (globalState.schema || {}).elements;
  const elementIds = Object.keys(elementsState) || [];
  const changedFormState = {};
  elementIds?.forEach((elementId) => {
    // TODO: 这里后面需要做优化、只需要判断数据发生变化的element, 做一层json的diff
    const elementChanged = elementsState[elementId];
    // 一层局部更新
    Object.keys(elementChanged)?.forEach((propName) => {
      const element = elements[elementId];
      const propValue = elementChanged[propName];
      if (originPropertyNamesMap[propName]) {
        const type = originPropertyNamesMap[propName].type;
        if (type === Boolean) {
          element[propName] = propValue;
        }
      } else {
        element[propName] = element[propName] || {};
        const originValue = element[propName];
        element[propName] = {
          ...originValue,
          ...propValue,
        }
      }
      
      // eslint-disable-next-line no-prototype-builtins
      if (propValue && propValue.hasOwnProperty('value')) {
        changedFormState[element.formProps.name] = propValue.value;
      }
    })
  });
  updateFormValeus(changedFormState);
  // 更新schema
  globalState.updateSchema({
    ...globalState.schema,
  });
  elementIds?.forEach((elementId) => {
    // 触发元素改变的回调
    stateListeners.emit(elementId, globalState.preSchema?.elements?.[elementId]);
  })
}

/**
  * @description 初始化
  */
export const init = (
  schema,
  updateSchema,
  actions,
  forceUpdate,
  mode,
) => {
  globalState.__status__ = 'init';
  globalState.schema = schema;
  globalState.actions = actions;
  globalState.forceUpdate = forceUpdate;
  globalState.mode = mode;
  globalState.updateSchema = (nextSchema) => {
    globalState.preSchema = globalState.schema;
    globalState.schema = nextSchema;
    updateSchema?.(nextSchema);
  }
  globalState.formFieldMap = Object.keys(schema.elements)?.reduce((pre, elementId) => {
    const element = schema.elements[elementId];
    if (element.formProps?.name) {
      pre[element.formProps.name] = pre[element.formProps.name] || [];
      pre[element.formProps.name].push(elementId);
    }
    return pre;
  }, {});
};

/**
  * @description 设置表单的values
  */
export const setFormValues = (values) => {
  updateFormValeus(values);
}

/**
  * @description 注册元素事件
  */
export const registerEvent = (elementId, eventName, callBack) => {
  globalState.eventMap[elementId] = globalState.eventMap[elementId] || {};
  globalState.eventMap[elementId][eventName] = globalState.eventMap[elementId][eventName] || [];
  globalState.eventMap[elementId][eventName] = callBack;
  globalState.forceUpdate?.();
};

