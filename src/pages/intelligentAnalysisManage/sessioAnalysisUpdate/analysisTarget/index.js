import React, { useEffect, useState } from "react";
import { Form, Input, Button, Icon, Modal, Loading, message } from 'dpl-react'
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import { parseHashParams, galaxyConfig } from "@/utils/index";

import './index.scss'

const hitText = `
请输入详细的步骤说明，格式参考以下：
步骤二：XXXXXXXX；
步骤三：XXXXXXXX；
……
`

const hitText1 = `
请输入方案目标，格式参考如下：
"客户问题是否解决": 未解决/已解决，
"客户是否满意": 满意/不满意，
`
// 动态表单的id
let id = 0;

// 用户规则目标最大数量

function AnalysisTarget(props) {
  const {
    changeStep,
    targetCacheData,
    getTargetInfoCacheInfo
  } = props
  const planId = parseHashParams('planId')
  const [showDescTxtFlag, setShowDescTxtFlag] = useState(false)
  
  // 默认步骤说明
  const [defaultStepDescription, setDefaultStepDescription] = useState('');

  // 自定义步骤说明
  const [stepDescription, setStepDescription] = useState('')

  // 方案目标
  const [planGoals, setPlanGoals] = useState({
    goalsTitle: "",
    fullUserGoals: '', // string 完整用户输入目标
    // defaultGoals: [], // string list
    // goals: [],  // string list
  })

  const [showPreviewWinFlag, setShowPreviewWinFlag] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [previewContent, setPreviewContent] = useState('')

  // 缓存该页面的数据
  const cacheData = () => {
    const updatePlanGoals = {
      ...planGoals,
    }
    const cacheDateInfo = {
      defaultStepDescription,
      stepDescription,
      planGoals: updatePlanGoals
    }
    console.log('cacheDateInfo', cacheDateInfo);
    getTargetInfoCacheInfo(cacheDateInfo)
  }

  const clickPrevStep = () => {
    cacheData()
    const hash = window.location.hash;
    const newHash = hash.substring(0, hash.lastIndexOf('?'))
    window.location.hash = `${newHash}?planId=${planId}&current=0`
    changeStep(0)
  }

  const clickCancle = () => {
    console.log('clickCancle');
    window.location.hash = '/intelligentAnalysisManage/sessioAnalysis'
  }

  // 请求加载预览内容
  const getPrevirewContent = async () => {
    try {
      setShowLoading(true)
      const data = {
        planId,
        defaultStepDescription,
        stepDescription,
        planGoals: {
          ...planGoals,
        }
      }
      const res = await post({
        url: Api.getPreviewContent,
        data,
      })
      if (res.success) {
        setPreviewContent(res.data)
        setShowPreviewWinFlag(true)
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error(error.message)
    } finally {
      setShowLoading(false)
    }
  }

  // 点击预览按钮
  const clickPreview = () => {
    getPrevirewContent()
  }

  // 保存方案目标
  const saveTargetInfo = async () => {
    // 多个换行符转一个
    const normalizeNewlines = (str) => {
      // 将多个换行符（包括 \r\n 和 \n）替换为单个换行符 \n
      return str.replace(/(\r\n|\n)+/g, '\n');
    }
    try {
      setShowLoading(true)
      const data = {
        planId,
        defaultStepDescription: normalizeNewlines(defaultStepDescription),
        stepDescription: normalizeNewlines(stepDescription),
        planGoals: {
          ...planGoals,
        }
      }
      console.info('saveTargetInfo_data', data);
      const res = await post({
        url: Api.saveTargetInfo,
        data
      })
      if (res.success) {
        message.success('保存成功')
        window.location.hash = '/intelligentAnalysisManage/sessioAnalysis'
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error(error.message)
    } finally {
      setShowLoading(false)
    }
  }
  
  const clickConfirm = (e) => {
    e.preventDefault();
    saveTargetInfo()
  }

  const clickAddDescBtn = () => {
    console.log('clickAddDescBtn');
    setShowDescTxtFlag(true)
  }

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 21, offset: 3 },
    },
  };

  // 根据请求数据或缓存数据渲染页面
  const renderPageByData = (data) => {
    const { defaultStepDescription, stepDescription, planGoals } = data
        setDefaultStepDescription(defaultStepDescription)
        setStepDescription(stepDescription)
        planGoals && setPlanGoals(planGoals)
        if (stepDescription) {
          setShowDescTxtFlag(true)
        }
  }

  // 编辑情况下获取方案目标详情
  const getPlanTargetDetail = async () => {
    try {
      setShowLoading(true)
      const res = await get({
        url: Api.targetDetailQuery,
        params: {
          planId,
        }
      })
      if (res.success) {
        renderPageByData(res.data)
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error(error.message)
    } finally {
      setShowLoading(false)
    }
  }

  useEffect(() => {
    // console.log('targetCacheData', targetCacheData);
    if (targetCacheData) {
      // 从缓存获取值
      renderPageByData(targetCacheData)
    } else {
      getPlanTargetDetail()
    }
  }, [])

  return (
    <>
      <div className="container-content">
        <Loading coloured text='加载中' visible={showLoading}></Loading>
        <div className="analysis-target-container">
          <div className="item-wrap progress-des">
            <div className="item-title">
              步骤说明
            </div>
            <div className="item-content">
              <div className="step-desc-wrap">
                <div dangerouslySetInnerHTML={{ __html: defaultStepDescription }} />
              </div>
              <div className="add-desc-btn-wrap">
                {
                  !showDescTxtFlag && (<Button type="dashed" onClick={clickAddDescBtn}>
                    <Icon type="plus" />
                    添加步骤说明
                  </Button>)
                }
              </div>
              {
                showDescTxtFlag && (<div className="showDescTxtWrap">
                  <Input.TextArea
                    placeholder={hitText}
                    autosize={{ minRows: 15, maxRows: 15 }}
                    showTextCount={true}
                    maxLength={8000}
                    value={stepDescription}
                    onChange={(e) => setStepDescription(e.target.value)}
                  />
                </div>)
              }
            </div>
          </div>

          <div className="item-wrap target-wrap">
            <div className="item-title">
              方案目标
            </div>
            <div className="item-content">
              <div className="plan-goals-wrap">
                <div className="default-title">
                  {planGoals?.goalsTitle}
                </div>
                <Input.TextArea
                  placeholder={hitText1}
                  autosize={{ minRows: 15, maxRows: 15 }}
                  showTextCount={true}
                  maxLength={galaxyConfig.sessioAnalysisTaskTargetLimitNum || 8000}
                  value={planGoals?.fullUserGoals || ''}
                  onChange={(e) => setPlanGoals({
                    ...planGoals,
                    fullUserGoals: e.target.value
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container-footer'>
        <div className='foot-btn-wrap'>
          <div onClick={clickPrevStep} style={{ display: "inline-block", marginRight: "15px", cursor: "pointer" }}>上一步</div>
          <Button onClick={clickPreview}>预览提示词</Button>
          <Button type="primary" onClick={clickConfirm}>确定</Button>
          <Button onClick={clickCancle}>取消</Button>
        </div>
      </div>
      {
        showPreviewWinFlag ? (
          <Modal
            width={700}
            title="预览提示词"
            visible={showPreviewWinFlag}
            onCancel={() => {
              setShowPreviewWinFlag(false)
            }}
            footer={null}
          >
            <div className="preview-content whitespace-pre-line">
              <div dangerouslySetInnerHTML={{ __html: previewContent }} />
            </div>
          </Modal>
        ) : null
      }
    </>

  )
}

export default AnalysisTarget
