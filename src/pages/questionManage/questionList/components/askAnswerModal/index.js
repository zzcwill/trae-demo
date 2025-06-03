import React, { useState, useRef, useEffect } from "react";
import { Modal, Row, Col, Form, TreeSelect, Select, Button, message } from "dpl-react";
import Api from '@/request/api-olhelpmanage'
import PreviewImg from "@/components/common/previewImg";
import { formatImage } from '@/utils/index'
import { get } from '@/request/request'
import "./index.scss";

const FormItem = Form.Item;

/**
 * 格式化树节点，利用treeNode自行渲染，要拼接父标签名称
 * @param {props} tree
 * @param {props} formatObj
 */
function formatTree(tree, parentLabel) {
  return tree.map((item) => {
    let label = parentLabel ? `${parentLabel}-${item.labelName}` : item.labelName
    return (
      <TreeSelect.TreeNode key={item.labelId} value={item.labelId} title={label}>
        {formatTree(item.children || [], item.labelName)}
      </TreeSelect.TreeNode>
    );
  });
}

function AskAnswerModal(props) {
  const {
    open,
    onOk,
    onCancel,
    model
  } = props;

  const { form } = props;
  const {
    getFieldDecorator,
    validateFields,
    getFieldInstance,
    setFieldsValue,
    resetFields,
  } = form;

  const [detail, setDetail] = useState({})
  const [reply, setReply] = useState({})
  const [labels, setLabels] = useState([])

  const formatDetail = (detail) => {
    if (detail.imageUrlList) {
      detail.formatUrl = detail.imageUrlList.map(url => {
        return { imageUrl: url }
      })
    }
    if (detail.reply?.reply) {
      detail.reply.reply = detail.reply.reply.replace(/ href /g,' ') //把href属性去掉
    }
    return detail
  }

  const getLabels = async () => {
    const data = await get({ url: Api.getCommonLabels })
    if (data.success) {
        setLabels(data.data)
    }
}

  const getDetail = async () => {
    const data = await get({ url: Api.getReplyDetail, params: { replyId: model.sourceReplyId } })
    if (data.success) {
      const detail = data.data
      setDetail(formatDetail(detail))
      if (detail.reply) {
        setReply(detail.reply)
      }
    }

  }

  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  };

  useEffect(() => {
    if (open == true) {
      getDetail()
    }
  }, [open])

  useEffect(() => {
    getLabels()
  }, [])


  return (
    <Modal
      className="answer-modal"
      visible={open}
      width={800}
      title="追问"
      onOk={onCancel}
      onCancel={onCancel}
      footer={null}
    >
      <div className="question-view">
        <FormItem label="用户问题" {...formItemLayout}>
          {detail.question}
        </FormItem>
        <FormItem label="补充描述" {...formItemLayout} style={{ marginBottom: '12px' }}>
          <span className='question-description'>{detail.description || '无'}</span>
        </FormItem>
        {detail.formatUrl && detail.formatUrl.length > 0 &&
          <Row style={{ marginBottom: '12px' }}>
            <Col offset={3} span={21}><PreviewImg src={detail.formatUrl} /></Col>
          </Row>
        }
        <FormItem {...formItemLayout} label="问题标签">
          {getFieldDecorator("labelIdList", {
            initialValue: detail.labelIdList || undefined,
          })(
            <TreeSelect
              disabled={true}
              placeholder="请选择问题标签"
              // mode="multiple"
              multiple={false}
              allowClear
              treeCheckable
              showCheckedStrategy={TreeSelect.SHOW_CHILD}
              treeNodeFilterProp="title"
              getPopupContainer={(triggerNode) => {
                return triggerNode.parentNode;
              }}
            >
              {formatTree(labels)}
            </TreeSelect>
          )}
        </FormItem>
        <FormItem label="用户提问时间" className="normal-text" {...formItemLayout}>
          {detail.askTime} &nbsp; 问题性质：{detail.openStatus === 'Y' ? '公开' : '私密'}
        </FormItem>
      </div>
      <div className="answer-view">
          <FormItem label="回答" {...formItemLayout}>
            {getFieldDecorator(
              "reply",
              {}
            )(
              <div
                className="detail-item-content"
                dangerouslySetInnerHTML={{ __html: formatImage(reply.reply) }}
              ></div>
            )}
          </FormItem>
        <FormItem label="适用地区" {...formItemLayout}>
          {reply.locationList && reply.locationList.map(city => <span className="tag-item">{city.name}</span>)}
        </FormItem>
        <FormItem label="回答人署名" {...formItemLayout}>
          {reply.replyName}
        </FormItem>
        <FormItem label="回答时间" {...formItemLayout}>
            {reply.replyTime || '无'}
          </FormItem>
      </div>
    </Modal>
  );
}


export default Form.create()(AskAnswerModal);