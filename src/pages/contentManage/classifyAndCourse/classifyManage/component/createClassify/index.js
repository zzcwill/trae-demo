import React, {useState, useEffect} from 'react'
import './index.scss'
import {Form, Modal, Alert, Input, Cascader, message} from 'dpl-react'
import {get, post} from "@/request/request";
import Api from "@/request/api";

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const FormItem = Form.Item

function CreateClassify(props, ref) {

    const {
        form,
        onOk,
        onCancel,
        visible,
        title = '新增目录',
        newFlag = true,
        classify
    } = props
    const [category, setCategory] = useState([]) // 分类
    const [formData, setFormData] = useState({
        name: undefined,
        rank: undefined,
        parentId: undefined
    })
    const [confirmLoading, setConfirmLoading] = useState(false)
    const getCategory = async () => {
        const data = await get({url: Api.getClassifyTree})
        if (data.success) {
            const step = (arr, parent) => {
                arr.forEach(item => {
                    item.path = parent ? parent.path + ',' + item.id : item.id + ''
                    item.value = item.id + ''
                    item.label = item.name
                    if (item.children) {
                        if (item.children && item.children.length === 0) {
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
    const findCategory = (id) => {
        let result = null
        let walk = (arr) => {
            arr.forEach(item => {
                if (item.id == id) {
                    result = item
                }
                item.children && walk(item.children)
            })
        }
        walk(category)
        return result
    }
    const {getFieldDecorator} = form
    const okHandler = () => {
        form.validateFieldsAndScroll(async (err, value) => {
            if (!err) {
                const url = newFlag ? Api.saveClassify : Api.updateClassify
                setConfirmLoading(true)
                const data = await post({
                    url, data: {
                        name: value.name.trim(),
                        rank: value.rank,
                        parentId: value.parentId[value.parentId.length - 1],
                        id: formData.id
                    }
                }).catch(() => {
                    setConfirmLoading(false)
                })
                if (!data) {
                    setConfirmLoading(false)
                    return
                }
                if (data.success) {
                    message.success(newFlag ? '新增成功' : '修改成功')
                    onOk && onOk()
                } else {
                    message.error(data.message)
                }
                setConfirmLoading(false)
            }
        })
    }
    useEffect(() => {
        getCategory()
    }, [])
    useEffect(() => {
        if (newFlag) { // 新建的时候清空form
            setFormData({
                name: undefined,
                rank: undefined,
                parentId: undefined
            })
            return;
        }

        if (!classify.parentId) { // 编辑时，没有parentId，认为是根目录
            setFormData(Object.assign({}, classify, {parentId: [null]}))
            return
        }
        const category = findCategory(classify.parentId)
        if (category && category.path) {
            setFormData(Object.assign({}, classify, {parentId: [null, ...category.path.split(',')]}))
        } else {
            setFormData(Object.assign({}, classify, {parentId: [null]}))
        }
    }, [classify, category, newFlag])
    return (
        <Modal title={title}
               visible={visible}
               onCancel={onCancel}
               onOk={okHandler}
               width={520}
               className={'create-classify-modal'}
               confirmLoading={confirmLoading}
        >
            <Alert message={<div>带<span style={{color: 'red'}}>*</span>号的内容需要填写完整</div>} type="warm"
                   style={{marginBottom: '20px'}}
                   showIcon/>
            <Form className='create-classify-form'>
                <FormItem label='目录名称' {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [{required: true, message: '请输入目录名称'}],
                        initialValue: formData.name
                    })(
                        <Input placeholder='请输入目录名称'
                               maxLength={30}
                        />
                    )}
                </FormItem>
                <FormItem label='排列顺序' {...formItemLayout}>
                    {getFieldDecorator('rank', {
                        rules: [{
                            required: true,
                            message: '请输入排列顺序',
                        }, (rule, value, callback) => {
                            value = value + ''
                            if (value.indexOf('.') >= 0) {
                                callback('请输入1-99正整数')
                                return
                            } else {
                                const num = parseInt(value)
                                if (num <= 0 || num > 99) {
                                    callback('请输入1-99正整数')
                                    return
                                }
                            }
                            callback()
                        }],
                        initialValue: formData.rank
                    })(
                        <Input placeholder='请输入排列顺序'
                               maxLength={100}
                               type='number'
                        />
                    )}
                </FormItem>
                <FormItem label='上级目录' {...formItemLayout}>
                    {getFieldDecorator('parentId', {
                        rules: [{required: true, message: '请选择上级目录'}],
                        initialValue: formData.parentId
                    })(
                        <Cascader options={category} placeholder='请选择上级目录' changeOnSelect={true}/>
                    )}
                </FormItem>
            </Form>

        </Modal>
    )
}

export default Form.create()(React.forwardRef(CreateClassify))
