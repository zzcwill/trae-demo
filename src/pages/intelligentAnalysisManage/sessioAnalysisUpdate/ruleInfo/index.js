import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Icon, message, Loading } from 'dpl-react'
import CategoryWin from "../categoryWin/index.js";
import RuleTable from "../ruleTable/index.js";
import { get, post } from "@/request/request";
import Api from "@/request/api-callcentermanage";
import './index.scss';
import { makeUUID } from '@/utils/index'

function RuleInfo(props) {
  const {
    form,
    planId,
    remotConfig,
    changeStep,
  } = props

  const { getFieldDecorator } = form;
  const [maxCategoryNum, setMaxCategoryNum] = useState(0)
  const [categoryWinFlag, setCategoryWinFlag] = useState(false)
  const [ruleList, setRuleList] = useState([])
  const [curCategoryValue, setCurCategoryValue] = useState({})
  const [showLoadingFlag, setShowLoadingFlag] = useState(false);
  const [allRuleList, setAllRuleList] = useState([])


  const getAllConfigRuleList = async () => {
    try {
      const res = await get({
        url: Api.getAllRuleList,
      })
      if (res.success) {
        setAllRuleList(res.data)
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  // 保存规则信息
  const saveRuleInfo = async (values) => {
    try {
      const data = {
        planId,
        smartChatAnalysisPlanName: values.smartChatAnalysisPlanName,
        backGroundDescription: values.backGroundDescription,
        analysisPlanCategoryList: ruleList,
      }
      const res = await post({
        url: Api.saveRuleInfo,
        data,
      })
      if (res.success) {
        message.success('保存成功')
        // 下一步之后再点上一步放回，此时hash已有planId就无需再放了
        const hash = window.location.hash;
        if (hash.includes('?')) {
          const newHash = hash.substring(0, hash.lastIndexOf('?'))
          window.location.hash = `${newHash}?planId=${res.data}&current=1`
        } else {
          window.location.hash = `${hash}?planId=${res.data}&current=1`
        }
        changeStep(1);
      } else {
        message.error(res.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  const clickNextStep = () => {
    form.validateFields((err, values) => {
      if (!err) {
        saveRuleInfo(values)
      }
    })
  }

  const clickCancle = () => {
    console.log('clickCancle');
    window.location.hash = '/intelligentAnalysisManage/sessioAnalysis'
  }

  // 点击新增分类按钮
  const clickAddCategoryBtn = () => {
    setCategoryWinFlag(true)
    setCurCategoryValue({})
  }

  // 新增分类
  const addCategory = (data) => {
    console.log('data', data);
    const targetData = ruleList.filter(v => v.frontCatId === data.frontCatId)
    if (targetData?.length) {
      // 编辑已有的数据
      let updateList = ruleList.map(v => {
        if (v.frontCatId === data.frontCatId) {
          return data
        } else {
          return v
        }
      })
      setRuleList(updateList)
    } else {
      // 新增新的数据
      const addData = {
        frontCatId: makeUUID(),
        analysisPlanCategoryRuleList: [],
        ...data
      }
      const updateList = [
        ...ruleList,
        addData
      ]
      setRuleList(updateList)
    }
    setCategoryWinFlag(false)
  }

  // 编辑分类信息
  const clickEditCategore = (data) => {
    setCurCategoryValue(data)
    setCategoryWinFlag(true)
  }

  // 删除分类信息
  const clickDelCategore = (data) => {
    const filterRuleList = ruleList.filter(v => v.frontCatId !== data.frontCatId)
    setRuleList(filterRuleList)
  }

  // 选择了关联信息
  const selectLinkRule = (selectRuleInfo, categoryInfo) => {
    categoryInfo?.analysisPlanCategoryRuleList.push(selectRuleInfo)
    const updateList = ruleList.map(v => {
      if (v.frontCatId === categoryInfo.frontCatId) {
        return categoryInfo
      }
      return v
    })
    setRuleList(updateList)
  }

  // 点击了取消关联
  const cancelLinkRule = (selectRuleInfo, categoryInfo) => {
    const filterAnalysisPlanCategoryRuleList = categoryInfo?.analysisPlanCategoryRuleList.filter(v => v.frontRuleId !== selectRuleInfo.frontRuleId)
    categoryInfo.analysisPlanCategoryRuleList = filterAnalysisPlanCategoryRuleList;
    const newCategoryInfo = {
      ...categoryInfo,
      analysisPlanCategoryRuleList: filterAnalysisPlanCategoryRuleList
    }
    const updateList = ruleList.map(v => {
      if (v.frontCatId === categoryInfo.frontCatId) {
        return newCategoryInfo
      }
      return v
    })
    setRuleList(updateList)
  }

  // 查询方案详情
  const queryPlanDetail = async () => {
    try {
      setShowLoadingFlag(true)
      const res = await get({
        url: Api.planDetailQuery,
        params: {
          planId,
        }
      })
      if (res.success) {
        const updateData = res.data.analysisPlanCategoryList.map(v => {
          const analysisPlanCategoryRuleList = v.analysisPlanCategoryRuleList.map(v => {
            return {
              ...v,
              frontRuleId: makeUUID()
            }
          })
          return {
            ...v,
            analysisPlanCategoryRuleList,
            frontCatId: makeUUID(),
          }
        })
        setRuleList(updateData)
        form.setFieldsValue({
          smartChatAnalysisPlanName: res.data.smartChatAnalysisPlanName,
          backGroundDescription: res.data.backGroundDescription
        })
      } else {
        message.error(res.message)
      }

    } catch (error) {
      message.error(error.message)
    } finally {
      setShowLoadingFlag(false)
    }
  }

  const renderRuleTableBtn = () => {
    if (ruleList.length < maxCategoryNum) {
      return <Button type='dash' onClick={clickAddCategoryBtn}> <Icon type="plus" /> 新增分类</Button>
    }
    return null
  }

  useEffect(() => {
    setMaxCategoryNum(remotConfig.maxCategoryNum)
    if (planId) {
      queryPlanDetail()
    }
  }, [remotConfig, planId])

  useEffect(() => {
    getAllConfigRuleList()
  }, [])

  return (
    <>
      <div className="container-content">
        <div className='rule-info-container'>
        <Loading coloured text='加载中' visible={showLoadingFlag} />
          <div className="base-info item-wrap">
            <div className="item-title">
              基本信息
            </div>
            <div className="item-content">
              <Form>
                <Form.Item label="方案名称：">
                  {
                    getFieldDecorator('smartChatAnalysisPlanName', {
                      rules: [
                        {
                          required: true,
                          message: '请输入方案名称'
                        },
                        {
                          max: 50,
                          message: '请输入不超过50字的方案名称'
                        }
                      ],
                    })(<Input placeholder='请输入不超过50字的方案名称' />)
                  }
                </Form.Item>
                <Form.Item label="背景说明：">
                  {
                    getFieldDecorator('backGroundDescription')(<Input.TextArea placeholder='请输入背景说明' autosize={{ minRows: 15, maxRows: 15 }} showTextCount={true} maxLength={8000} />)
                  }
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="analysis-rule item-wrap display-n">
            <div className="item-title">
              分析规则
            </div>
            <div className="item-content">
              <div className="add-category-wrap">
                { renderRuleTableBtn() }
              </div>
              <div className="rule-table-wrap">
                {
                  ruleList.length ? ruleList.map(item => {
                    return (<RuleTable
                      allRuleList={allRuleList}
                      key={item.categoryName}
                      categoryInfo={item}
                      remotConfig={remotConfig}
                      clickEditCategore={clickEditCategore}
                      clickDelCategore={clickDelCategore}
                      selectLinkRule={selectLinkRule}
                      cancelLinkRule={cancelLinkRule}
                  />)
                  }) : null
                }
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className='container-footer'>
        <div className='foot-btn-wrap'>
          <Button type="primary" onClick={clickNextStep}>下一步</Button>
          <Button onClick={clickCancle}>取消</Button>
        </div>
      </div>

      {
        categoryWinFlag ?
          <CategoryWin
            ruleList={ruleList}
            curCategoryValue={curCategoryValue}
            categoryWinFlag={categoryWinFlag}
            setCategoryWinFlag={setCategoryWinFlag}
            addCategory={addCategory}
          />
          : null
      }

    </>
  );
}

export default Form.create()(React.forwardRef(RuleInfo))
