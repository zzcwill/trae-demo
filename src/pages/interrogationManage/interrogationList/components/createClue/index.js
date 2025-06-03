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

function CreateClue (props) {
  const { data = {}, className = '', style, onCancel, callback } = props;
  const [loading, setLoading] = useState(false)
  const bodyClassName = classNames('create-clue-box', {
    [className]: className
  })


  const addClue = async (sendData) => {
    setLoading(true)
    try {
      const res = await post({
        url: Api.postSaveClueRecord,
        data: sendData
      })
      if (res.success) {
        message.success('线索创建成功')
        callback && callback()
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
        businessId: data.id, // 业务主键Id,目前是业务表的自增主键id
        clueName: '专家问诊服务记录', // 线索名称
        name:  data.name, // 没有用户名称
        mobile: data.phone, // 用户手机号码
        businessType: '1', // 线索来源 1:亿企咨询专家问诊服务
        location: data.serviceLocationCode, // 地区（code）
        customerId: data.customerId, // 携带的企业信息
        ...values,
      };
      addClue(sendData);
    });
  }

  const cancelHandler = () => {
    onCancel && onCancel()
  }


  return <div className={bodyClassName} style={style}>
    <SchemaForm
      actions={actions}
      components={{
        TextArea
      }}
      className="form-wrap">
      <Field
        {...formItemLayout}
        type="string"
        title="线索描述"
        name="question"
        x-component="TextArea"
        x-rules={[
          {
            message: "请输入线索描述",
            required: true,
            whitespace: true,
          },
        ]}
        x-component-props={{
          allowClear: true,
          placeholder: '请输入线索描述',
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

export default CreateClue