import React, {useState, useEffect} from "react";
import "./index.scss";
import {message, Checkbox, Button, Modal, Radio, Input, Select, Form} from "dpl-react";
import {post, get} from "@/request/request";
import API from "@/request/api";

const optionName = 'CORRECT_REFUSE_REASON'
const formItemLayout = {
    labelCol: {span: 7},
    wrapperCol: {span: 17},
};
const FormItem = Form.Item

function CorrectDetail(props) {
    const {detail = {}, onCancel, correctTypeMap = {}, form} = props;
    const {getFieldDecorator, validateFieldsAndScroll} = form
    const [correctStatus, setCorrectStatus] = useState([]); // 纠错状态
    const [loading, setLoading] = useState(false); // loading
    const [unacceptReasonDesc, setUnacceptReasonDesc] = useState('')
    const [options, setOptions] = useState([])

    /**
     * 跳转到详情页
     */
    const openDetail = () => {
        if (detail.deleteStatus !== "Y") {
            let url =
                window.location.href.split("#")[0] +
                "#/contentManage/qaManage/taxLib/qaDetail?id=" +
                detail.questionId+'&replyId='+detail.replyId
            window.open(url);
        }
    };

    /**
     * 采纳状态改变
     */
    const correctStatusChange = list => {
        const value = list[list.length - 1];
        if (value) {
            setCorrectStatus([].concat(value));
        }
    };

    /**
     * 更新纠错状态
     */
    const update = async () => {
        validateFieldsAndScroll(async (err, value) => {
            if (err) return
            setLoading(true);
            const res = await post({
                url: API.UpdateCorrectState,
                data: {
                    id: detail.id,
                    ...value
                }
            });
            if (res.success) {
                message.success("纠错审核成功！");
                onCancel && onCancel(true);
            } else {
                message.error(res.message);
            }
            setLoading(false);
        })
    };

    const getOptions = async () => {
        const data = await get({url: API.getCommonOptions, params: {groupNames: optionName}})
        if (data.success) {
            data.data.forEach(item => {
                if (item.groupName === optionName) {
                    setOptions(item.options)
                }
            })
        }
    }

    useEffect(() => {
        if (detail.correctStatus) {
            setCorrectStatus([].concat(parseInt(detail.correctStatus)));
        }
        setUnacceptReasonDesc(detail.unacceptReasonDesc)
        return () => {
            setCorrectStatus([]);
        };
    }, [detail]);
    useEffect(() => {
        getOptions()
    }, [])

    return (
        <div className="correct-detail-box">
            <div className="correct-detail-item">
                <div className="label-title">标准问：</div>
                <div
                    className={`label-value question-resume ${
                        detail.deleteStatus === "Y" ? "delete-question" : ""
                        }`}
                    onClick={openDetail}
                    title={detail.questionResume}
                >
                    {detail.questionResume}
                </div>
            </div>
            <div className="correct-detail-item">
                <div className="label-title">错误类型：</div>
                <div className="label-value">
                    {correctTypeMap[detail.correctReason]}
                </div>
            </div>
            <div className="correct-detail-item top">
                <div className="label-title">纠错说明：</div>
                <div className="label-value correct-desc" dangerouslySetInnerHTML={{__html: detail.correctDesc}}></div>
            </div>
            <div className="correct-detail-item">
                <div className="label-title">纠错人：</div>
                <div className="label-value">{detail.creator}</div>
            </div>
            <div className="correct-detail-item">
                <div className="label-title">创建时间：</div>
                <div className="label-value">{detail.createTime}</div>
            </div>
            <Form>
                <FormItem label='是否采纳' {...formItemLayout}>
                    {getFieldDecorator('correctStatus', {
                        rules: [{required: true, message: '请选择是否采纳'}],
                        initialValue: detail.correctStatus
                    })(
                        <Radio.Group onChange={(e) => {
                            setCorrectStatus(e.target.value)
                        }}>
                            <Radio value={'1'}>采纳</Radio>
                            <Radio value={'2'}>不采纳</Radio>
                        </Radio.Group>
                    )}
                </FormItem>
                {correctStatus[0] == 2 && <>
                    <FormItem label='不采纳原因' {...formItemLayout}>
                        {getFieldDecorator('refuseReason', {
                            rules: [{required: true, message: '请不采纳原因'}],
                            initialValue: detail.refuseReason
                        })(
                            <Select placeholder={'请选择不采纳原因'}>
                                {options.map(item => {
                                    return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                                })}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label='未通过补充说明' {...formItemLayout}>
                        {getFieldDecorator('refuseDesc', {
                            rules: [{required: true, message: '请填写未通过补充说明'}],
                            initialValue: detail.refuseDesc
                        })(
                            <Input.TextArea className="label-value" maxLength={200}/>
                        )}
                    </FormItem>
                </>}
            </Form>

            <div className="update-box">
                <Button
                    type="primary"
                    className="search-button"
                    loading={loading}
                    onClick={() => {
                        update();
                    }}
                >
                    确认发布
                </Button>
                <div className="line-box"></div>
                <Button
                    className="search-button"
                    disabled={loading}
                    onClick={() => {
                        onCancel();
                    }}
                >
                    取消发布
                </Button>
            </div>

        </div>
    );
}

export default Form.create()(React.forwardRef(CorrectDetail))