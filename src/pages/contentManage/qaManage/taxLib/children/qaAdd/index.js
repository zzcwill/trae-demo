import React, {useState, useEffect, useRef} from "react";
import {
    Button,
    message,
    Modal
} from "dpl-react";
import "./index.scss";
import {get, post} from "@/request/request";
import Api from "@/request/api";
import qs from "qs";
import QuestionForm from './component/questionForm'
import ReplyForm from './component/replyForm'
import DimensionTab from "@/components/contentManage/dimensionTab";
import {toChineseNum} from "@/utils";
import history from "@/history";

function NewDetail(props, ref) {
    const [questionId, setQuestionId] = useState(() => {
        const obj = qs.parse(window.location.href.split("?")[1]);
        return obj.id;
    })
    const [replyId, setReplyId] = useState(() => {
        const obj = qs.parse(window.location.href.split("?")[1]);
        return obj.replyId;
    })
    const questionRef = useRef(null)
    const [detail, setDetail] = useState({})
    const [currentReply, setCurrentReply] = useState({})
    const replyRef = useRef(null)
    const [replyList, setReplyList] = useState([{}])
    const [statusList, setStatusList] = useState([false])
    const [activeIndex, setActiveIndex] = useState(0)
    const tabRef = useRef(null)
    const genReplyList = (list) => {
        const getLabelCode = (list, type) => {
            let result = []
            list.forEach(item => {
                if (item.type == type) {
                    result = item.list.map(label => label.code)
                }
            })
            return result
        }
        let resultIndex = 0
        const result = list.map((item, index) => {
            const obj = {
                region: getLabelCode(item.dimensionList, '0'),
                profession: getLabelCode(item.dimensionList, '1'),
                grade: getLabelCode(item.dimensionList, '2'),
                reply: item.reply,
                internalTips: item.internalTips,
                id: item.id
            }
            if (item.id == replyId) {
                resultIndex = index
                setActiveIndex(index)
            }
            return obj
        })
        setCurrentReply(result[resultIndex])
        setReplyList(result)
        setStatusList(result.map(item => true))
    }
    const genDetail = (question) => {
        const genCategory = category => {
            if (!category) return [];
            let result = [category.id.toString()];
            let children = category.children;
            while (children && children.length) {
                result.push(children[0].id.toString());
                children = children[0].children;
            }
            return result;
        };
        setDetail({
            resume: question.resume,
            description: question.description,
            descImageList: Array.isArray(question.descImageList) ? [...question.descImageList] : [],
            classifyId: genCategory(question.classify),
            id: question.id
        })
    }
    const getQuestionDetail = async id => {
        const res = await get({
            url: Api.getQuestionReply,
            params: {
                id
            }
        });
        if (res.success) {
            const data = res.data;
            setDetail(data)
            genReplyList(data.replyList)
            genDetail(data)
        } else {
            if (res.messageCode === 'api.question.not_exist') {
                if (history.length === 1) {
                    history.push("/contentManage/qaManage/taxLib");
                } else {
                    history.goBack()
                }
            }
            message.error(res.message);
        }
    };
    const saveQuestion = async (values) => {
        const data = await post({
            url: Api.updateQuestion, data: {
                id: questionId,
                resume: values.resume,
                description: values.description,
                classifyId: values.classifyId[values.classifyId.length - 1],
                descImageList: values.descImageList
            }
        })
        if (data.success) {
            message.success('问题修改成功')
        } else {
            if (data.messageCode === 'api.question.not_exist') {
                if (history.length === 1) {
                    history.push("/contentManage/qaManage/taxLib");
                } else {
                    history.goBack()
                }
            }
            message.error(data.message)
        }
    }
    const saveDimension = (dimension) => {
        questionRef.current.validateFieldsAndScroll(async (err, question) => {
            if (!err) {
                const data = await post({
                    url: Api.saveQuestionReply, data: {
                        id: questionId || undefined,
                        resume: question.resume,
                        description: question.description,
                        classifyId: question.classifyId[question.classifyId.length - 1],
                        descImageList: question.descImageList,
                        reply: {
                            id: currentReply.id,
                            dimensionList: [
                                {type: '0', list: dimension.region.map(code => ({code}))},
                                {type: '1', list: dimension.profession.map(code => ({code}))},
                                {
                                    type: '2',
                                    list: Array.isArray(dimension.grade) ? [{code: dimension.grade[0]}] : [{code: dimension.grade}]
                                }
                            ],
                            reply: dimension.reply,
                            internalTips: dimension.internalTips
                        }
                    }
                })
                if (data.success) {
                    //更新缓存信息
                    const replyResult = Object.assign({}, currentReply, dimension, {id: data.data.replyId})
                    setQuestionId(data.data.questionId)
                    setCurrentReply(replyResult)
                    replyList[activeIndex] = replyResult
                    setReplyList([...replyList])
                    statusList[activeIndex] = true
                    setStatusList([...statusList])
                    setDetail(Object.assign(questionRef.current.getFieldsValue(), {id: data.data.questionId}))
                    message.success('保存成功')
                } else {
                    if (data.messageCode === 'api.reply.not_exist') {
                        Modal.confirm({
                            title: '维度无法删除',
                            content: data.message + ';刷新页面重试',
                            onOk() {
                                window.location.reload()
                            }
                        })
                    } else if (data.messageCode === 'api.question.not_exist') {
                        message.error(data.message)
                        if (history.length === 1) {
                            history.push("/contentManage/qaManage/taxLib");
                        } else {
                            history.goBack()
                        }
                    } else {
                        Modal.alert({title: '无法保存', content: data.message})
                    }
                }
            }
        })
    }
    const deleteDimension = () => {
        function reset() {
            replyList.splice(activeIndex, 1)
            statusList.splice(activeIndex, 1)
            setReplyList([...replyList])
            setStatusList([...statusList])
            setCurrentReply(replyList[0])
            setActiveIndex(0)
            tabRef.current.scrollTo()
            if (replyList.length === 0) { //删除最后一个跳转回列表页
                history.push('/contentManage/qaManage/taxLib')
            }
            message.success('删除成功')
        }

        Modal.confirm({
            title: '正在执行删除维度答案的操作',
            content: '删除后的维度答案将无法恢复，是否继续?',
            onOk: async function () {
                if (!currentReply.id) {
                    reset()
                } else {
                    const data = await post({url: Api.replyDelete, data: {id: currentReply.id}})
                    if (data.success) {
                        reset()
                    } else {
                        Modal.confirm({
                            title: '维度无法删除',
                            content: data.message + ';刷新页面重试',
                            onOk() {
                                window.location.reload()
                            }
                        })
                    }
                }
            }
        })
    }
    const onEnd = () => {
        let checkArr = []
        statusList.forEach((item, index) => {
            if (!item) {
                checkArr.push(index)
            }
        })
        if (checkArr.length > 0) {
            const message = checkArr.map(item => {
                return `维度${toChineseNum(item + 1)}`
            }).join(',')
            Modal.alert({
                title: '当前存在未保存的维度',
                content: `${message}未保存，请保存后发布`
            })
            return
        }
        history.push('/contentManage/qaManage/taxLib/qaDetail?id=' + questionId)
    }
    useEffect(() => {
        if (questionId) {
            getQuestionDetail(questionId)
        }
    }, []);
    return (
        <div className="add-qa">
            <div className='add-qa-content'>
                <div className='title'>{questionId ? '修改问答' : '新增问答'}</div>
                <QuestionForm ref={questionRef}
                              question={detail}
                              onSave={saveQuestion}
                />
                <div className='dimension-tab-box'>
                    <DimensionTab list={replyList}
                                  activeIndex={activeIndex}
                                  onClick={(item, index) => {
                                      //缓存当前编辑信息
                                      replyList[activeIndex] = Object.assign({}, currentReply, replyRef.current.getFieldsValue())
                                      setReplyList([...replyList])
                                      setCurrentReply(item)
                                      setActiveIndex(index)
                                  }}
                                  showAdd={true}
                                  onAdd={() => {
                                      //缓存当前编辑信息
                                      replyList[activeIndex] = Object.assign({}, currentReply, replyRef.current.getFieldsValue())
                                      setReplyList([...replyList, {}])
                                      setStatusList([...statusList, false])
                                      setCurrentReply({})
                                      setActiveIndex(statusList.length)
                                  }}
                                  showStatus={true}
                                  statusList={statusList}
                                  ref={tabRef}
                    />
                </div>
                <ReplyForm reply={currentReply}
                           onEdit={() => {
                               statusList[activeIndex] = false
                               setStatusList([...statusList])
                           }}
                           status={statusList[activeIndex]}
                           onSave={saveDimension}
                           onDelete={deleteDimension}
                           ref={replyRef}
                />
                <div className='end-btn'>
                    <Button type='primary' onClick={onEnd}>结束</Button>
                </div>
            </div>

        </div>
    );
}

export default NewDetail;
