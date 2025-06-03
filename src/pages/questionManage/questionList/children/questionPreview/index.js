import React, { useEffect, useRef, useState, forwardRef } from "react";
import sessionStorageHelper from "@/utils/sessionStorage";
import { previewUrl } from "@/const/index";
import { Button, message, Modal, Tabs } from "dpl-react";
import { get, post } from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import './index.scss'

function QuestionPreview(props,refs) {
    const [detail, setDetail] = useState(() => {
        return sessionStorageHelper.getItem('__questionAnswer')
    })
    console.log('detail', detail);
    const detailIframeRef = useRef(null);

    const closePage = () => {
        // history.goBack()
        if (type === 'audit') {
            history.push('/questionManage/answerList')
        } else {
            history.push('/questionManage/questionList')
        }
    }

    const confirmHandler = async (type) => {
        const { answer } = detail;
        let data = null
        if (replyId) {
            data = await post({ url: Api.postUpdateReply, data: { ...answer } })
        } else {
            data = await post({ url: Api.postSaveReply, data: { ...answer } })
        }
        if (!data) return
        if (data.success) {
            closePage()
            message.success('操作成功')
        } else {
            message.error(data.message)
        }
    }


    return (
        <div className="answer-preview">
            <h2>回答预览</h2>
            <div className="preview-box">
                <iframe
                    ref={detailIframeRef}
                    src={previewUrl + "answerDetail/preview?" + Date.now()}
                    height={500}
                    width={"100%"}
                    onLoad={(a) => {
                        detailIframeRef.current.contentWindow.postMessage(
                            {
                                type: "answer-detail-preview",
                                data: detail,
                            },
                            "*"
                        );
                    }}
                />
            </div>
            <div className='app-buttons app-buttons-center' style={{ marginTop: '15px' }}>
                <Button className="app-button" onClick={closePage}>返回编辑</Button>
                <Button className="app-button" type='primary' onClick={() => confirmHandler('AUDIT')}>提交审核</Button>
            </div>
        </div>
    )
}

export default forwardRef(QuestionPreview)