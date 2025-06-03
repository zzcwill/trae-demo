/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2024-03-11 10:19:18
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-09-06 14:30:07
 * @FilePath: /askone-manage-pc/src/pages/intelligentAnalysisManage/sessioAnalysisUpdate/index.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import React, { useState, useEffect } from 'react'
import { ArrowSteps, Button, message } from 'dpl-react';
import './index.scss'
import RuleInfo from './ruleInfo';
import AnalysisTarget from './analysisTarget';
import { get } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { parseHashParams } from "@/utils/index";

const Step = ArrowSteps.Step;

function SessioAnalysisUpdate(props) {

    const planId = parseHashParams('planId')
    const curStep = parseHashParams('current')
    const [current, setCurrent] = useState(curStep ? +curStep : 0)
    const [remotConfig, setRemotConfig] = useState({})
    const [targetCacheData, setTargetCacheData] = useState(null)
    

    const changeStep = (current) => {
        console.log('current', current);
        setCurrent(current)
    }

    const getRemotConfig = async () => {
        try {
            const res = await get({
                url: Api.getRemotConfig,
            })
            console.log('res', res);
            if (res.success) {
                setRemotConfig(res.data)
            } else {
                message.error(res.message)
            }
        } catch (error) {
            message.error(error.message)
        }
    }

    const getTargetInfoCacheInfo = (cacheData) => {
        setTargetCacheData(cacheData)
    }

    useEffect(() => {
        getRemotConfig()
    }, [])

    return (
        <div className='sessio-analysis-update'>
            <div className='container-header'>
                <ArrowSteps
                    alignCenter
                    current={current}
                    style={{ width: "100%" }}
                    showNumber
                >
                    <Step title="分析规则信息" />
                    <Step title="方案目标" />
                </ArrowSteps>
            </div>

            <>
                {
                    current === 0 ? 
                    <RuleInfo changeStep={changeStep} remotConfig={remotConfig} planId={planId} /> : 
                    <AnalysisTarget changeStep={changeStep} remotConfig={remotConfig} planId={planId} getTargetInfoCacheInfo={getTargetInfoCacheInfo} targetCacheData={targetCacheData}/>
                }
            </>
        </div>
    )
}

export default SessioAnalysisUpdate;
