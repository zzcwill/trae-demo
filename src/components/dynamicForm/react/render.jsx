import React from 'react';
import { uForm } from 'dora';
import { transformHiddenExpression } from '../core/relation';
import { globalState } from '../core';
import { render } from 'react-dom';
/**
 * @description 承前启后的作用，将schema渲染成react组件
 */
const { SchemaMarkupField: Field } = uForm

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const CONTAINER_TYPES = ['Card', 'Container'];

const injectEvents = (eventMap, elementId, element) => {
  const { props } = element;
  const events = eventMap[elementId];
  if (!events) return {};
  const eventPropsHandler = {};
  Object.keys(events).forEach((eventName) => {
    // 先不做事件的状态流转, 默认只触发第一个
    const callBack = events[eventName];
    const originCallBack = props?.[eventName];
    // 事件代理
    eventPropsHandler[eventName] = (...rest) => {
      originCallBack?.(...rest);
      callBack?.(elementId, element, ...rest);
    };
  });
  return eventPropsHandler;
}

export const buildFormContent = (elements = {}, elementList = [], components = {}, structure = {}, disabled, itemLayout) => {
  return elementList?.map(elementId => {
    const element = elements[elementId] || {};
    const { type = '', props = {}, formProps = {}, hidden = false } = element;
    const { name, title = '', rules = [], itemExtra } = formProps;
    const { before = {}, after = {} } = (itemExtra || {});

    const typeResult = CONTAINER_TYPES?.includes(type) ? 'object' : 'string';
    const xComponentProps = {
      ...props,
      disabled: props.disabled || disabled,
      ...injectEvents(globalState.eventMap, elementId, element),
    }

    const formLayout = itemLayout ? itemLayout : formItemLayout;

    const compTypeResult = type !== 'Divider' && !CONTAINER_TYPES?.includes(type) && globalState.mode === 'detail' ? 'Text' : type;
    // console.log(rules, 'rules');
    return (
      <Field
        key={elementId}
        type={typeResult}
        x-component={compTypeResult}
        // fix me：自定义事件无法通过x-component-props进行传递，需要另想办法
        x-component-props={xComponentProps}
        // 吐槽：这个版本uform bug挺多的，先手动实现动态显隐的渲染，不能对field做显隐，否则会存在表单字段无法采集导致的一堆渲染问题
        // 说实话antd的form这方面做的比较好
        // 相对的：事件监听的拦截也需要在这里做了
        x-render={({ renderComponent, props: innerProps }) => {
          if (transformHiddenExpression(hidden)) return null;
          // console.log(renderComponent(), 'renderComponent()');
          const element = renderComponent();
          if (!element) return null;
          const innerComponent = element?.props?.children;
          if (innerComponent && itemExtra) {
            return React.cloneElement(element, {
              ...(element.props || {}),
              children: [
                React.createElement('span', {
                  style: {
                    marginRight: 8
                  },
                  dangerouslySetInnerHTML: {
                    __html: before.text
                  }
                }),
                innerComponent,
                React.createElement('span', {
                  style: {
                    marginLeft: 8
                  },
                  dangerouslySetInnerHTML: {
                    __html: after.text
                  }
                }),
              ]
            })
          }
          return element;
        }}
        // fix me: visible 来表示field是否展示存在bug无法正常实现显隐逻辑
        // visible={!transformHiddenExpression(hidden)}
        x-rules={transformHiddenExpression(hidden) ? [] : rules}
        {...formLayout}
        title={title || ''}
        name={name || elementId}
      >
        {buildFormContent(elements, structure[elementId], components, structure, disabled, itemLayout)}
      </Field>
    )
  })
}
