import React, { useState, useEffect } from "react";
import { Form, Modal, message, Input, InputNumber } from 'dpl-react'
import _ from 'lodash';
import './index.scss'

function CategoryWin(props) {
  const {
    form,
    addCategory,
    categoryWinFlag,
    curCategoryValue,
    setCategoryWinFlag,
    ruleList,
  } = props
  
  const { getFieldDecorator, setFieldsValue } = form;
  // 新增还是编辑状态
  const [createFlag, setCreateFlag] = useState(true)

  const clickConfirm = () => {
    form.validateFields((err, values) => {
      if (!err) {
        let compareRepeatList = []
        if (createFlag) {
          // 新增状态
          compareRepeatList = ruleList
        } else {
          // 编辑状态 先过滤当前自己这一条记录
          compareRepeatList = ruleList.filter(item => item.frontCatId !== curCategoryValue.frontCatId)
        }
        const repeatFlag = compareRepeatList?.some(item => item.categoryName === values.categoryName)
          if (repeatFlag) {
            // 新增状态并且名称重复
            message.error('分类名称重复')
            return
          }
        addCategory({
          ...curCategoryValue,
          ...values,
          categoryName: values.categoryName.trim(),
        })
      }
    })
  }

  useEffect(() => {
    // init value
    setFieldsValue({
      categoryName: curCategoryValue.categoryName,
      categoryTotalScore: curCategoryValue.categoryTotalScore || 0
    });
    if (_.isEmpty(curCategoryValue)) {
      setCreateFlag(true)
    } else {
      setCreateFlag(false)
    }
  }, [])

  return (
    <div>
      <Modal
        title={createFlag ? '新增分类' : '编辑分类'}
        className="category-win"
        visible={categoryWinFlag}
        onOk={clickConfirm}
        onCancel={() => { setCategoryWinFlag(false) }}
      >
        <Form>
          <Form.Item label="分类名称:">
            {
              getFieldDecorator('categoryName', {
                rules: [
                  {
                    required: true,
                    message: '请输入分类名称'
                  },
                  {
                    max: 30,
                    message: '请输入不超过30字的分类名称'
                  },
                  {
                    whitespace: true,
                    message: '请输入分类名称'
                  }
                ],
              })(<Input placeholder='请输入不超过30字的分类名称' />)
            }
          </Form.Item>
          <Form.Item label="分类总分:">
            {
              getFieldDecorator('categoryTotalScore', {
                rules: [
                  {
                    required: true,
                    message: '分类总分'
                  },
                ],
              })(
                <InputNumber
                  min={0}
                  max={100}
                  step={1}
                  formatter={value => `${Math.floor(value)}`}
                />
                )
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Form.create()(React.forwardRef(CategoryWin))
