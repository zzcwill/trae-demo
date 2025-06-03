import { Button, message, Modal, Select } from 'dpl-react'
import React, { useEffect, useState } from 'react'
import { uForm } from "dora";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import './index.scss';

const {
    SchemaMarkupForm: SchemaForm,
    SchemaMarkupField: Field,
    createFormActions,
    FormSlot,
    Row
} = uForm;
const actions = createFormActions();

const Title = (props) => {
    const { title } = props;
    return <div className="container-title">
        {title}
    </div>
}

// 带全选的select
const SelectWithAll = (props) => {
    const { dataSource, onChange, value = [], ...rest } = props;
    return <Select
        onChange={(val) => {
            console.log(value, val, 'value change');
            if (value?.length === dataSource?.length && value?.length === val?.length && !val?.includes('all')) {
                onChange?.([]);
                return;
            }
            if (value?.includes('all') && !val?.includes('all')) {
                onChange?.([]);
                return;
            }
            if (val?.includes('all') && !value?.includes('all') && val?.length !== value?.length) {
                onChange?.(dataSource?.map(item => item.value))
            } else {
                if (val?.length !== 13) {
                    onChange?.(val?.filter(v => v !== 'all'));
                } else {
                    onChange?.(val);
                }
            }
        }}
        value={(value?.length === dataSource?.length && !value?.includes('all') ? ['all'] : []).concat(
            value
        )}
        {...rest}
    >
        <Select.Option
            key="all"
            value="all"
        >
            全选
        </Select.Option>
        {dataSource?.map(item => {
            return <Select.Option
                key={item.value}
                value={item.value}
            >
                {item.label}
            </Select.Option>
        })}
    </Select>
}

const getEffectMonthList = () => {
    return new Array(12).fill(1).map((item, index) => {
        return {
            label: `${index + 1} 月份`,
            value: index + 1
        }
    })
}

const formItemLayout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 15 },
};

export default function ConfigSettingModal(props) {
    const { visible, info, onCancel, topicTypeList = [], onSaveSuccess, locationList = [] } = props; // type: add 新增 edit 编辑
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id, type } = info || {};
    const [detail, setDetail] = useState();
    const [topicType, setTopicType] = useState();

    const getDetail = async () => {
        const res = await get({
            url: Api.getFinancialTaxConfigDetail,
            params: {
                id
            },
        });
        if (res.success) {
            setTopicType(res?.data?.topicType)
            setDetail({
                ...(res.data || {}),
                locationCodeList: res.data?.locationList?.map(loc => loc.locationCode)
            });
        } else {
            message.error(res.message)
        }
    }

    useEffect(() => {
        if (id) {
            getDetail();
        } else {
            setDetail({
                chatgptModelRetrieveThreshold: "0.87",
                chatgptModelRetrieveTopkThreshold: "3"
            });
        }
    }, [id])

    const onSubmit = async () => {
        actions.submit().then(async ({ values }) => {
            const res = await post({
                url: type === 'edit' ? Api.postFinancialTaxConfigUpdate : Api.postFinancialTaxConfigAdd,
                data: {
                    ...(values || {}),
                    id: type === 'edit' ? id : undefined,
                    locationList: undefined,
                    modifierName: undefined,
                    modifyDate: undefined
                },
            });
            if (res.success) {
                message.success(`业务主题${type === 'edit' ? "修改" : id ? "复制" : "添加"}成功`)
                onSaveSuccess?.();
            } else {
                if (['KNOWLEDGE0001', 'KNOWLEDGE0002'].includes(res.messageCode)) {
                    setErrorMessage(res.message);
                    setModalVisible(true);
                } else {
                    message.error(res.message)
                }
            }
        })
    }

    console.log(topicType, 'topicType');

    return (
        <>
            <Modal
                visible={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    setErrorMessage('');
                }}
                onOk={() => {
                    setModalVisible(false);
                    setErrorMessage('');
                }}
                okText="确认"
                title="提示"
                className='error-message-modal'
            >
                <div dangerouslySetInnerHTML={{
                    __html: errorMessage
                }}></div>
            </Modal>
            <Modal
                visible={visible}
                className="config-setting-modal"
                onCancel={onCancel}
                destroyOnClose
                width={960}
                onOk={onSubmit}
                title={`${type === 'edit' ? "修改" : id ? "复制" : "添加"}业务主题`}
            >
                {detail && (
                    <SchemaForm
                        actions={actions}
                        initialValues={detail}
                        className="config-setting-form"
                        components={{
                            SelectWithAll
                        }}
                    >
                        <FormSlot>
                            <Title title="主题信息" />
                        </FormSlot>
                        <Row className="row-parent-row">
                            <Field
                                type="string"
                                name="businessTopicName"
                                x-component="Input"
                                x-component-props={{
                                    maxLength: 32,
                                    placeholder: "请输入"
                                }}
                                x-rules={[{
                                    required: true,
                                    message: "请输入主题名称"
                                }]}
                                title="主题名称"
                                {...formItemLayout}
                            />
                            <Field
                                type="string"
                                name="businessTopicCode"
                                x-component="Input"
                                x-component-props={{
                                    maxLength: 32,
                                    placeholder: "请输入"
                                }}
                                x-rules={[{
                                    required: true,
                                    message: "请输入主题代码"
                                }]}
                                title="主题代码"
                                {...formItemLayout}
                            />
                            <Field
                                {...formItemLayout}
                                name="topicType"
                                type="string"
                                title="主题类型"
                                x-component="Select"
                                x-component-props={{
                                    dataSource: topicTypeList,
                                    placeholder: "请选择",
                                    onChange(val) {
                                        setTopicType(val);
                                    }
                                }}
                                x-rules={[
                                    {
                                        required: true,
                                        message: "请选择主题类型",
                                    },
                                ]}
                            />
                        </Row>
                        <FormSlot>
                            <Title title="展示设置" />
                        </FormSlot>
                        <Row className="row-parent-row">
                            <Field
                                type="array"
                                name="effectMonthList"
                                x-component="SelectWithAll"
                                x-component-props={{
                                    placeholder: "请选择",
                                    allowClear: true,
                                    mode: "multiple",
                                    maxTagCount: 1,
                                    maxTagTextLength: 5,
                                    dataSource: getEffectMonthList()
                                }}
                                x-rules={[{
                                    required: true,
                                    message: "请选择生效月份"
                                }]}
                                title="生效月份"
                                {...formItemLayout}
                            />
                            <Field
                                type="array"
                                name="locationCodeList"
                                x-component="Select"
                                x-component-props={{
                                    placeholder: "请选择",
                                    allowClear: true,
                                    mode: "multiple",
                                    showSearch: true,
                                    maxTagCount: 1,
                                    maxTagTextLength: 4,
                                    dataSource: locationList
                                }}
                                x-rules={[{
                                    required: true,
                                    message: "请选择适用地区"
                                }]}
                                title="适用地区"
                                {...formItemLayout}
                            />
                            <Field
                                type="string"
                                name="topicOrder"
                                x-component="InputNumber"
                                x-component-props={{
                                    placeholder: "请输入",
                                    precision: 0,
                                    min: 0
                                }}
                                x-rules={[{
                                    required: true,
                                    message: "请输入展示顺序"
                                }]}
                                title="展示顺序"
                                {...formItemLayout}
                            />
                        </Row>
                        <Row className="row-parent-row">
                            <Field
                                type="string"
                                name="scopeName"
                                x-component="Input"
                                x-component-props={{
                                    maxLength: 500,
                                    placeholder: "请输入",
                                }}
                                x-rules={[{
                                    required: true,
                                    message: "请输入问候语-业务范围"
                                }]}
                                title="问候语-业务范围"
                                {...formItemLayout}
                            />
                            <Field
                                type="string"
                                name="inputTip"
                                x-component="Input"
                                x-component-props={{
                                    placeholder: "请输入",
                                    maxLength: 128,
                                }}
                                x-rules={[{
                                    required: true,
                                    message: "问题录入框默认文案"
                                }]}
                                title="问题录入框默认文案"
                                {...formItemLayout}
                            />
                        </Row>
                        <FormSlot>
                            <Title title="阈值设置" />
                        </FormSlot>
                        {(!topicType || topicType == '1') && <>
                            <FormSlot>
                                <div className='sub-title'>问答机器人模型</div>
                            </FormSlot>
                            <Row className="row-parent-row">
                                <Field
                                    type="string"
                                    name="qaRobotQuestionModelSimilarityThreshold"
                                    x-component="InputNumber"
                                    x-component-props={{
                                        placeholder: "请输入",
                                        min: 0,
                                        // precision: 9,
                                    }}
                                    x-rules={[{
                                        required: true,
                                        message: "请输入用户问和标准问相似度"
                                    }]}
                                    title="用户问和标准问相似度"
                                    labelCol={{
                                        span: 5
                                    }}
                                    wrapperCol={{
                                        span: 11
                                    }}
                                />
                            </Row>

                            <FormSlot>
                                <div className='sub-title'>智库大模型</div>
                            </FormSlot>
                            <Row className="row-parent-row">
                                <Field
                                    type="string"
                                    name="chatgptSwitchFlag"
                                    x-component="Select"
                                    x-component-props={{
                                        placeholder: "请选择",
                                        dataSource: [{
                                            label: "开",
                                            value: "1"
                                        }, {
                                            label: "关",
                                            value: "0"
                                        }]
                                    }}
                                    x-rules={[{
                                        required: true,
                                        message: "请选择开关是否开启或关闭"
                                    }]}
                                    title="开关"
                                    labelCol={{
                                        span: 2
                                    }}
                                    wrapperCol={{
                                        span: 6
                                    }}
                                />
                            </Row>
                            {/* <Row className="row-parent-row">
                                <Field
                                    type="string"
                                    name="chatgptModelSimilarityThreshold"
                                    x-component="InputNumber"
                                    x-component-props={{
                                        placeholder: "请输入",
                                        min: 0,
                                        // precision: 9,
                                    }}
                                    x-rules={[{
                                        required: true,
                                        message: "请输入用户问和业务主题的相似程度"
                                    }]}
                                    title="用户问和业务主题的相似程度"
                                    labelCol={{
                                        span: 12
                                    }}
                                    wrapperCol={{
                                        span: 12
                                    }}
                                />
                                <Field
                                    type="string"
                                    name="chatgptModelRetrieveThreshold"
                                    x-component="InputNumber"
                                    x-component-props={{
                                        placeholder: "请输入",
                                        min: 0,
                                        // precision: 9,
                                    }}
                                    x-rules={[{
                                        required: true,
                                        message: "请输入参考资料相似程度"
                                    }]}
                                    title="参考资料相似程度"
                                    labelCol={{
                                        span: 12
                                    }}
                                    wrapperCol={{
                                        span: 12
                                    }}
                                />
                            </Row>
                            <Field
                                type="string"
                                name="chatgptModelRetrieveTopkThreshold"
                                x-component="InputNumber"
                                x-component-props={{
                                    placeholder: "请输入",
                                    min: 0,
                                    precision: 0,
                                }}
                                x-rules={[{
                                    required: true,
                                    message: "请输入GPT-参考资料最大数量"
                                }]}
                                title="GPT-参考资料最大数量"
                                labelCol={{
                                    span: 6
                                }}
                                wrapperCol={{
                                    span: 12
                                }}
                            /> */}
                            <FormSlot>
                                <div className='sub-title'>搜索算法</div>
                            </FormSlot>
                            <Row className="row-parent-row">
                                <Field
                                    type="string"
                                    name="qaSearchModelSimilarityThreshold"
                                    x-component="InputNumber"
                                    x-component-props={{
                                        placeholder: "请输入",
                                        min: 0,
                                        // precision: 9,
                                    }}
                                    x-rules={[{
                                        required: true,
                                        message: "请输入用户问和知识的相似程度"
                                    }]}
                                    title="用户问和知识的相似程度"
                                    labelCol={{
                                        span: 6
                                    }}
                                    wrapperCol={{
                                        span: 12
                                    }}
                                />
                            </Row>
                        </>}
                        {(!topicType || topicType == '2') && <>
                            <FormSlot>
                                <div className='sub-title'>工具类模型</div>
                            </FormSlot>
                            <Row className="row-parent-row">
                                <Field
                                    type="string"
                                    name="toolModelSimilarityThreshold"
                                    x-component="InputNumber"
                                    x-component-props={{
                                        placeholder: "请输入",
                                        min: 0,
                                        // precision: 9,
                                    }}
                                    x-rules={[{
                                        required: true,
                                        message: "请输入用户问和标准问的相似程度"
                                    }]}
                                    title="用户问和标准问的相似程度"
                                    labelCol={{
                                        span: 6
                                    }}
                                    wrapperCol={{
                                        span: 12
                                    }}
                                />
                            </Row>
                        </>}
                    </SchemaForm>
                )}
            </Modal>
        </>
    )
}
