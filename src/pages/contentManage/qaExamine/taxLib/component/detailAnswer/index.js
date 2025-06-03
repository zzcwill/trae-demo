/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2021-09-13 14:30:19
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2023-11-28 10:58:14
 * @FilePath: /askone-manage-pc/src/pages/contentManage/qaExamine/taxLib/component/detailAnswer/index.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useEffect } from "react";
import "./index.scss";
import CardTime from "@/components/common/card/cardTime";
import CardInternalTips from "@/components/common/card/cardInternalTips";
import CardStatus from "@/components/common/card/cardStatus";
import BtnExamine from "@/components/common/card/btnExamine";
import { post } from "@/request/request";
import Api from "@/request/api";
import { message } from "dpl-react";
import CardUnPass from "@/components/common/card/cardUnPass";
import DimensionList from "@/components/contentManage/dimensionList";
const statusColorMap = ["#FF9500", "#00CC66", "#FF3A30"];
const statusTextMap = ["未审核", "已审核", "审核未通过"];

export default function DetailAnswer(props) {
  const { question, answer, onAudit } = props;
  const statusChangeHandler = async values => {
    values.idList = [answer.id];
    const data = await post({ url: Api.replyBatchAudit, data: values });
    if (data.success) {
      message.success("修改成功");
      onAudit && onAudit();
    } else {
      message.error(data.message);
    }
  };
  return (
    <div className="detail-answer-box">
      <DimensionList list={answer.dimensionList} />
      <div className="answer-content-box">
        <div dangerouslySetInnerHTML={{ __html: answer.reply }}></div>
        {answer.internalTips && (
          <CardInternalTips
            content={answer.internalTips}
            style={{ marginTop: 12 }}
          />
        )}
      </div>
      <div className="answer-content-times">
        <CardTime
          time={answer.lastModifyTime}
          userName={answer.lastModifierName}
          des="最后修改于："
        />
      </div>
      {answer.id && (
        <div className="bottom">
          <div className="status">
            {answer.auditStatus && (
              <CardStatus
                text={statusTextMap[answer.auditStatus]}
                iconColor={statusColorMap[answer.auditStatus]}
              />
            )}

            {(answer.auditStatus == 1 || answer.auditStatus == 2) && (
              <CardTime
                time={answer.auditTime}
                userName={answer.auditorName}
                des="最近审核于："
                style={{ marginLeft: 20 }}
              />
            )}
          </div>

          <div className="btn-group">
            <BtnExamine onStatusChange={statusChangeHandler} />
          </div>
        </div>
      )}

      {answer.auditStatus == 2 && (
        <CardUnPass
          auditUnpassReasonName={answer.auditUnpassReasonName}
          auditUnpassDesc={answer.auditUnpassDesc}
          style={{ marginTop: 16 }}
        />
      )}
    </div>
  );
}
