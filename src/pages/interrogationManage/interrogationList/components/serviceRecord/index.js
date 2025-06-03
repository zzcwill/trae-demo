import React, { useState, useRef, useEffect } from 'react';
import './index.scss';
import classNames from 'classnames';
import { uForm } from 'dora'
import { Input, Button, message } from 'dpl-react';
import TextArea from '@/components/common/textArea';
import { post } from '@/request/request'
import Api from '@/request/api-olhelpmanage'
const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
  createFormActions,
} = uForm

const actions = createFormActions()

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

function ServiceRecord (props) {
  const { data = {}, className = '', style, onCancel, callback } = props;
  const [loading, setLoading] = useState(false)
  const bodyClassName = classNames('service-record-box', {
    [className]: className
  })


  const addServiceRecord = async (sendData) => {
    setLoading(true)
    try {
      const res = await post({
        url: Api.postExpertInquiryRecordUpdateRecordContent,
        data: sendData
      })
      if (res.success) {
        message.success('保存服务记录成功！')
        callback && callback();
        onCancel && onCancel()
      } else {
        message.error(res.message)
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const confirmHandler = () => {
    actions.submit().then(({ values }) => {
      let sendData = {
        id: data.id,
        ...values,
      };
      addServiceRecord(sendData);
    });
  }

  const cancelHandler = () => {
    onCancel && onCancel()
  }


  return <div className={bodyClassName} style={style}>
    <SchemaForm
      actions={actions}
      initialValues={{
        content: data.recordContent || ''
      }}
      components={{
        TextArea
      }}
      className="form-wrap">
      <Field
        {...formItemLayout}
        type="string"
        title="服务记录"
        name="content"
        x-component="TextArea"
        x-component-props={{
          allowClear: true,
          placeholder: '请输入服务记录',
          maxLength: 500,
          rows: 6,
          autoComplete: "off",
        }}
      />
      <div className="button-box">
        <Button
          type="primary"
          className="button-item"
          onClick={() => {
            confirmHandler();
          }}
          disabled={loading}
        >
          保存
        </Button>
        <div className="line-box"></div>
        <Button
          className="button-item"
          onClick={() => {
            cancelHandler();
          }}
          disabled={loading}
        >
          取消
        </Button>
      </div>
    </SchemaForm>
  </div>
}

export default ServiceRecord