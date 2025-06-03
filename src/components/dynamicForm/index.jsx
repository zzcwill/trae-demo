import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { uForm } from 'dora';
import useForceUpdate from './hooks/useForceUpdate';
import classnames from 'classnames';
import { sortedStructure } from './utils/schemaUtils';
import { buildFormContent } from './react/render';
import defaultComponents, { virtualFields } from './components';
import { globalState, init } from './core';
import './index.scss';

const { SchemaMarkupForm: SchemaForm } = uForm
const verticalFormItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
export default function DynamicForm({
  schema: schemaProps,
  components: componentsProps,
  actions,
  disabled = false,
  onMounted,
  onUnmouted,
  formItemLayout,
  // detail: 详情模式（区别于不可编辑，只是一种纯文本展示）
  // edit: 编辑模式（以组件形式出现）
  mode = 'edit',
  showColon = false,
  className,
  formItemDisplay = 'row',
  ...rest
}) {
  const [schema, setSchema] = useState(schemaProps);
  const [forceUpdate] = useForceUpdate();
  const components = useMemo(() => {
    return {
      ...defaultComponents,
      ...(componentsProps || {}),
    }
  }, [componentsProps]);

  console.log(schema, 'schema');

  const renderFormContent = (itemLayout) => {
    const { layouts = {}, elements = {} } = schema || {};
    const elementList = sortedStructure(layouts);
    const structure = layouts.structure || {};
    return buildFormContent(elements, elementList, components, structure, disabled, itemLayout);
  }

  useEffect(() => {
    globalState.actions = actions;
  }, [actions])

  globalState.mode = mode;

  useLayoutEffect(() => {
    if (schemaProps !== schema) {
      setSchema(schemaProps);
    }
  }, [JSON.stringify(schemaProps)]);

  useEffect(() => {
    globalState.schema = schema;
  }, [JSON.stringify(schema)])
  if (globalState.__status__ === 'unmounted') {
    init(schema, setSchema, actions, forceUpdate, mode);
  }
  useEffect(() => {
    globalState.__status__ = 'mounted';
    onMounted?.(actions);
    return () => {
      globalState.__status__ = 'unmounted';
    }
  }, []);

  return (
    <SchemaForm
      {...rest}
      actions={actions}
      components={components}
      virtualFields={virtualFields}
      key="dynamicForm"
      className={classnames('dynamicForm', mode, className, {
        'field-colon': showColon,
        [`form-item-${formItemDisplay}`]: true
      })}
    >
      {renderFormContent(formItemDisplay === 'row' ? formItemLayout : verticalFormItemLayout)}
    </SchemaForm>
  )
}
