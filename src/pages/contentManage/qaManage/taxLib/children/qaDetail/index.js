import React, {useState, useEffect} from "react";
import qs from "qs";
import history from "@/history";
import {message} from "dpl-react";
import Api from "@/request/api";
import {post, get} from "@/request/request";
import DetailQuestion from "./component/detailQuestion";
import DetailAnswer from "./component/detailAnswer";
import "./index.scss";
import DimensionTab from '@/components/contentManage/dimensionTab'

export default function ContentDetail(props, ref) {
    const [id, setId] = useState(() => {
        const obj = qs.parse(window.location.href.split("?")[1]);
        return obj.id;
    });
    const [replyId, setReplyId] = useState(() => {
        const obj = qs.parse(window.location.href.split("?")[1]);
        return obj.replyId || undefined;
    });
    const [detail, setDetail] = useState({});
    const [reply, setReply] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0)
    const getDetail = async (replyId) => {
        const data = await get({url: Api.getQuestionReply, params: {id}});
        if (data.success) {
            setDetail(data.data);
            if (replyId) {
                let replyTemp = null
                let replyIndex = 0
                data.data.replyList.forEach((item, index) => {
                    if (item.id === replyId) {
                        replyTemp = item
                        replyIndex = index
                    }
                })
                if (replyTemp) {
                    setReply(replyTemp)
                    setActiveIndex(replyIndex)
                } else {
                    setReply(data.data.replyList[0])
                    setActiveIndex(0)
                }
            } else {
                setReply(data.data.replyList[0])
                setActiveIndex(0)
            }
        } else {
            if(data.messageCode==='api.question.not_exist'){
                history.push("/contentManage/qaManage/taxLib");
            }
            message.error(data.message);
        }
    };
    useEffect(() => {
        getDetail(replyId);
    }, [id]);
    return (
        <div className="content-detail">
            <div className="detail-box">
                <DetailQuestion
                    detail={detail}
                    onNewAnswer={getDetail}
                />
                <div style={{borderBottom: '1px solid #DFE1E6', padding: '0 20px'}}>
                    <DimensionTab list={detail.replyList}
                                  activeIndex={activeIndex}
                                  onClick={(item, index) => {
                                      setReply(item)
                                      setActiveIndex(index)
                                  }}/>
                </div>
                {reply && <DetailAnswer
                    answer={reply}
                    question={detail}
                    onAudit={() => {
                        getDetail(reply.id)
                    }}
                />}
            </div>
        </div>
    );
}
