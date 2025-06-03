import React, { useState, useEffect } from "react";
import "./index.scss";
import { get } from "@/request/request";
import API from "@/request/api";
import { message, Progress, Button } from "dpl-react";
import { formatNum } from "@/utils/index";
import IconImage from "@/components/common/iconImage";
import cicon_collect_img from "./images/icon-collect-num.png";
import cicon_total_img from "./images/icon-total-num.png";
import cicon_examine_img from "./images/icon-examine.png";

export default function Main(props) {
  const [informationCollectStats, setInformationCollectStats] = useState({}); // 信息收集统计
  const [auditRate, setAuditRate] = useState({}); // 审核率统计
  const [questionStats, setQuestionStats] = useState({}); // 问题数统计

  /**
   * 问题数统计
   */
  const getStatsQuestionNum = async () => {
    const res = await get({
      url: API.getStatsQuestionNum
    });
    if (res.success) {
      const data = res.data;
      setQuestionStats({
        questionNum: formatNum(data.questionNum), // 问题总数
        questionIncreaseNum: data.questionIncreaseNum, // 日新增问题数
        weekOnWeek: data.weekOnWeek + "%", // 周环比
        dayOnDay: data.dayOnDay + "%", // 日环比
        weekOnWeekFlag: data.weekOnWeek > 0, // 周环比负数则为降低，正数为增长
        dayOnDayFlag: data.dayOnDay > 0 // 日环比负数则为降低，正数为增长
      });
    } else {
      message.error(res.message);
    }
  };

  /**
   * 审核率统计
   */
  const getStatsAuditRate = async () => {
    const res = await get({
      url: API.getStatsAuditRate
    });
    if (res.success) {
      const data = res.data;
      setAuditRate({
        auditRate: data.auditRate + "%", // 审核率带%
        originAuditRate: data.auditRate, // 原始数据
        auditIncreaseNum: data.auditIncreaseNum // 日新增审核数
      });
    } else {
      message.error(res.message);
    }
  };

  const getStateInformationCollectStats = async () => {
    const res = await get({
      url: API.getStatsInformationCollectStats
    });
    if (res.success) {
      const data = res.data;
      setInformationCollectStats({
        informationNum: formatNum(data.informationNum), // 信息收集总数
        correctNum: formatNum(data.correctNum), // 问题纠错总数
        feedbackQuestionNum: formatNum(data.feedbackQuestionNum), // 问题新增总数
        newInformationNum: data.newInformationNum // 日新增信息收集总数
      });
    } else {
      message.error(res.message);
    }
  };

  /**
   * 上涨还是下跌
   * @param {Object} props
   */
  const CaretUpDown = props => {
    const { flag } = props;
    return (
      <>
        {flag ? (
          <IconImage type="caret-up" className="caret" />
        ) : (
          <IconImage type="caret-down" className="caret" />
        )}
      </>
    );
  };

  useEffect(() => {
    getStateInformationCollectStats();
    getStatsAuditRate();
    getStatsQuestionNum();
  }, []);

  return (
    <div className="main-box">
      <div className="askone-box">
        <div className="label-box">
          <div className="label-title">财税问题库</div>
          <div className="label-data">
            <div className="label-descript">更多数据请进入数据详情页查看</div>
            <Button disabled className="button-data">
              数据详情页
            </Button>
          </div>
        </div>
        <div className="data-detail">
          {informationCollectStats.informationNum !== undefined && (
            <div className="detail-box">
              <div className="total-box">
                <div className="detail-title">
                  <img src={cicon_collect_img} className="detail-title-icon" />
                  信息收集总数
                </div>
                <div className="detail-num">
                  {informationCollectStats.informationNum}
                </div>
                <div className="question-sum">
                  <span className="num-title">问题纠错总数</span>
                  <span>{informationCollectStats.correctNum}</span>
                </div>
                <div className="question-sum">
                  <span className="num-title">问题新增总数</span>
                  <span>{informationCollectStats.feedbackQuestionNum}</span>
                </div>
              </div>
              <div className="detail-bottom-box">
                <div className="line-box"></div>
                <div className="day-add-box">
                  <span>日新增信息收集总数：</span>
                  <span>{informationCollectStats.newInformationNum}</span>
                </div>
              </div>
            </div>
          )}

          {questionStats.questionNum !== "undefined" && (
            <div className="detail-box">
              <div className="total-box">
                <div className="detail-title">
                  <img src={cicon_total_img} className="detail-title-icon" />
                  问答整理总数
                </div>
                <div className="detail-num">{questionStats.questionNum}</div>
                <div className="question-num-box">
                  <div className="question-num-item">
                    <span className="item-title">周环比</span>
                    <CaretUpDown flag={questionStats.weekOnWeekFlag} />
                    {questionStats.weekOnWeek}
                  </div>
                  <div className="question-num-item">
                    <span className="item-title">日环比</span>
                    <CaretUpDown flag={questionStats.dayOnDayFlag} />
                    {questionStats.dayOnDay}
                  </div>
                </div>
              </div>
              <div className="detail-bottom-box">
                <div className="line-box"></div>
                <div className="day-add-box">
                  <span>日新增问答数：</span>
                  <span>{questionStats.questionIncreaseNum}</span>
                </div>
              </div>
            </div>
          )}

          {auditRate.auditRate !== "undefined" && (
            <div className="detail-box">
              <div className="total-box">
                <div className="detail-title">
                  <img src={cicon_examine_img} className="detail-title-icon" />
                  问答审核率
                </div>
                <div className="detail-num">{auditRate.auditRate}</div>
                <div className="progress-box">
                  <Progress
                    lineWidth={230}
                    percent={auditRate.originAuditRate}
                  />
                </div>
              </div>
              <div className="detail-bottom-box">
                <div className="line-box"></div>
                <div className="day-add-box">
                  <span>日新增审核数：</span>
                  <span>{auditRate.auditIncreaseNum}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
