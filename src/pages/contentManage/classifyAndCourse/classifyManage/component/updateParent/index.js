import React, {useState, useEffect} from 'react'
import {get, post} from "@/request/request";
import Api from "@/request/api";
import {Form, Modal, Cascader, message} from 'dpl-react'

const formItemLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};
const FormItem = Form.Item

function UpdateParent(props, refs) {
    const {
        form,
        onOk,
        onCancel,
        visible,
        title = '修改上级目录',
        idList = [],
        isClassify = true
    } = props
    const [category, setCategory] = useState([]) // 分类
    const getCategory = async () => {
        const data = await get({url: Api.getClassifyTree})
        if (data.success) {
            const step = (arr, parent) => {
                arr.forEach(item => {
                    item.path = parent ? parent.path + ',' + item.id : item.id
                    item.value = item.id + ''
                    item.label = item.name
                    if (item.children) {
                        if (item.children.length === 0) {
                            delete item.children
                        } else {
                            item.children && step(item.children, item)
                        }
                    }
                })
            }
            step(data.data)
            const result = [{
                label: '财税问答库',
                value: null,
                children: data.data
            }]
            setCategory(result)
        }
    }
    const {getFieldDecorator} = form
    const onHandler = () => {
        form.validateFieldsAndScroll(async (err, value) => {
            if (!err) {
                const url = isClassify ? Api.batchUpdateClassifyParentId : Api.updateQuestionParentId
                const categoryId = value.parentId[value.parentId.length - 1]
                const params = {
                    idList,
                    classifyId: categoryId,
                    parentId: categoryId
                }
                if(!isClassify&&!categoryId){
                    message.error('问题不能移动到根目录')
                    return
                }
                const data = await post({url, data: params})
                if (data.success) {
                    message.success('修改成功')
                    onOk && onOk()
                } else {
                    message.error(data.message)
                }
            }
        })
    }
    useEffect(() => {
        getCategory()
    }, [])

    return (
        <Modal title={title}
               onCancel={onCancel}
               visible={visible}
               onOk={onHandler}
               width={520}
        >
            {visible && <Form>
                <FormItem label='上级目录调整至' {...formItemLayout}>
                    {getFieldDecorator('parentId', {
                        rules: [{required: true, message: '请选择上级目录'}],
                        initialValue: undefined
                    })(
                        <Cascader options={category} placeholder='请选择上级目录' changeOnSelect={true}/>
                    )}
                </FormItem>
            </Form>}
        </Modal>
    )

}

export default Form.create()(UpdateParent)