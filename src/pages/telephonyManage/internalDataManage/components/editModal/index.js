import React, { useEffect, useState } from 'react';
import { Form, Row, Select, message, Input, Button, Col, Modal } from 'dpl-react';
import './index.scss';
import PublishMethod from '../publishMethod';
import ApplyOrgan from '../applyOrgan';
import { get, post } from '@/request/request';
import API from '@/request/api-callcentermanage';
import ContentEditor from '../contentEditor';
import moment from 'moment';

/**
 * 默认布局
 */
const defaultLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 }
};
/**
 * 两列布局
 */
const twoLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
};

/**
 * 默认表单
 */
const defaultParamForm = {
  type: '', // 资料类型
  publish: {
    publishType: '0', // 发布方式，0：立即发布，1：定时发布
    publishTime: '' // 发布时间，发布方式为定时发布时必填
  },
  departIdList: [], // 适用机构id列表
  title: '', // 资料标题
  content: '' // 资料内容
};

let orgTree = [];
/**
 * 获取组织机构树
 */
const getOrgTree = async () => {
  const res = await get({
    url: API.getOrgTree
  });
  if (res.success) {
    const data = res.data;
    orgTree = [].concat(data);
  } else {
    message.error(res.message);
  }
};
getOrgTree();

/**
 * 编辑类型
 */
const editType = {
  Detail: 'detail',
  Add: 'add'
};

const EditModal = React.forwardRef((props, ref) => {
  const { form, typeList = [], type, onCancel, detail } = props;
  const { getFieldDecorator, setFieldsValue, getFieldsValue } = form;

  const [paramForm, setParamForm] = useState(() => {
    if (type === editType.Add) {
      return defaultParamForm;
    } else {
      return {
        type: detail.type, // 资料类型
        publish: {
          publishType: detail.publishType, // 发布方式，0：立即发布，1：定时发布
          publishTime: moment(detail.publishTime) // 发布时间，发布方式为定时发布时必填
        },
        departIdList: detail.departList, // 适用机构id列表
        title: detail.title, // 资料标题
        content: detail.content // 资料内容
      };
    }
  }); // 新增表单内容

  const [loading, setLoading] = useState(false); // 新增loading

  const [disabled, setDisabled] = useState(() => {
    return type === editType.Detail;
  });

  /**
   * 发布时间校验规则
   */
  const publishValidator = (rule, value, callback) => {
    if (value.publishType == '1' && !value.publishTime) {
      callback('请选择定时发布时间');
    } else {
      callback();
    }
  };

  /**
   * 提交
   */
  const submit = () => {
    form.validateFieldsAndScroll((err, value) => {
      if (!err) {
        if (!value.content) {
          Modal.confirm({
            title: '警告',
            content: '标题内容不能为空'
          });
          return false;
        }
        const formParam = {
          type: value.type, // 资料类型
          publishType: value.publish.publishType, // 发布方式，0：立即发布，1：定时发布
          publishTime: value.publish.publishType.toString() === '1' ? value.publish.publishTime.format('YYYY-MM-DD HH:mm:00') : '', // 发布时间，发布方式为定时发布时必填
          // departIdList: value.departIdList && value.departIdList.join(','), // 适用机构id列表
          departIdList: value.departIdList, // 适用机构id列表
          title: value.title, // 资料标题
          content: value.content // 资料内容
        };
        const now = moment();
        if (formParam.publishType == '0' || formParam.publishTime > now.format('YYYY-MM-DD HH:mm:00')) {
          addInternalData(formParam);
        } else {
          Modal.confirm({
            title: '警告',
            content: '您选择的发布时间小于当前时间，请重新选择',
            okText: '确定'
            // cancelText:'取消'
          });
        }
      }
    });
  };

  /**
   * 新增内部资料
   * @param {Obje} data
   */
  const addInternalData = async data => {
    setLoading(true);
    const res = await post({
      url: API.saveInternalData,
      data
    });
    if (res.success) {
      message.success('新增内部资料成功！');
      setLoading(true);
      onCancel && onCancel(true);
    } else {
      setLoading(true);
      message.error(res.message);
    }
  };

  return (
    <div className="internal-edit-box" ref={ref}>
      <Form>
        <div className="rules-box">
          <div className="title">发布规则</div>
          <Row>
            <Col span={12}>
              <Form.Item label="类别：" {...twoLayout} colon={false}>
                {getFieldDecorator('type', {
                  rules: [
                    {
                      required: true,
                      message: '请选择内部资料类别'
                    }
                  ],
                  initialValue: paramForm.type
                })(
                  <Select placeholder="请选择内部资料类型" allowClear disabled={disabled}>
                    {typeList.length > 0 &&
                      typeList.map(type => {
                        return (
                          <Select.Option key={type.id} value={type.id}>
                            {type.name}
                          </Select.Option>
                        );
                      })}
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="适用机构：" {...twoLayout} colon={false}>
                {type !== editType.Detail &&
                  getFieldDecorator('departIdList', {
                    rules: [
                      {
                        required: true,
                        message: '请选择适用机构'
                      }
                    ],
                    initialValue: paramForm.departIdList
                  })(<ApplyOrgan orgTree={orgTree} treeNodeFilter={{ key: 'id', value: 'id', title: 'name' }} disabled={disabled} />)}
                {type === editType.Detail && (
                  <div className="detail-org-box">
                    <Input
                      disabled={true}
                      value={paramForm.departIdList.reduce((pre, next) => {
                        return pre.concat(next.name);
                      }, [])}
                    ></Input>
                    <ul className="detail-org-list">
                      {paramForm.departIdList.map(item => {
                        return (
                          <li className="list-item" key={item.id}>
                            {item.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Form.Item label="发布方式：" {...defaultLayout} colon={false}>
              {getFieldDecorator('publish', {
                rules: [
                  {
                    required: true,
                    message: '请选择内部资料类别'
                  },
                  {
                    validator: publishValidator
                  }
                ],
                initialValue: paramForm.publish
              })(<PublishMethod disabled={disabled} />)}
            </Form.Item>
          </Row>
        </div>
        <div className="context-box">
          <div className="title">发布内容</div>
          <Row>
            <Form.Item label="标题：" {...defaultLayout} colon={false}>
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题'
                  }
                ],
                initialValue: paramForm.title
              })(<Input placeholder="请输入标题" autoComplete="off" disabled={disabled} maxLength={100} allowClear={disabled ? false : true} />)}
            </Form.Item>
          </Row>
          <Form.Item>
            <Form.Item label="内容：" {...defaultLayout} colon={false} className="editor-box">
              {type !== editType.Detail &&
                getFieldDecorator('content', {
                  initialValue: paramForm.content
                })(<ContentEditor disabled={disabled} />)}
              {type === editType.Detail && (
                <div className="detail-content-box">
                  <div dangerouslySetInnerHTML={{ __html: paramForm.content }}></div>
                </div>
              )}
            </Form.Item>
          </Form.Item>
        </div>
        <div className="center">
          {type === editType.Add && (
            <>
              <Button
                type="primary"
                className="search-button"
                size="small"
                loading={loading}
                onClick={() => {
                  submit();
                }}
              >
                确定
              </Button>
              <div className="line-box"></div>
              <Button
                type="primary"
                className="search-button"
                size="small"
                disabled={loading}
                onClick={() => {
                  onCancel();
                }}
              >
                取消
              </Button>
            </>
          )}
          {type === editType.Detail && (
            <>
              <Button
                type="primary"
                className="search-button"
                size="small"
                disabled={loading}
                onClick={() => {
                  onCancel();
                }}
              >
                取消
              </Button>
            </>
          )}
        </div>
      </Form>
    </div>
  );
});

export default Form.create()(EditModal);
