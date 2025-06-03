
import React, { useEffect, useState, useRef } from 'react';
import { Drawer, Form, Input, Button, message, Loading, Modal, Cascader } from 'dpl-react';
import Cookies from 'js-cookie'
import Api from "@/request/api-callcentermanage";
import { get, post } from "@/request/request";
import { galaxyConfig } from "@/utils";
import AppTable from '@/components/common/betterTable'
import { sleep } from "@/utils/sleep"
import './index.scss';


function TestDrawer(props) {
  const {
    form,
    curVal,
    testWinFlag,
    closeDrawer,
    setTestWinFlag
  } = props

  const SSO_EPCTOKEN = Cookies.get('sso-epctoken')

  const { getFieldDecorator } = form;

  const [testRst, setTestRst] = useState('')
  const [enableTest, setEnableTest] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [messageId, setMessageId] = useState('')
  const [isTestEnd, setIsTestEnd] = useState(true) // 是否测试轮训结束
  const isTestStopRef = useRef(false); // 是否测试停止

  const [consultChatUrl, setConsultChatUrl] = useState(galaxyConfig?.consultChatUrl)
  const [showDetailWin, setShowDetailWin] = useState(false)

  const [modelList, setModelList] = useState([]); // 大模型列表
  const [answerTableList, setAnswerTableList] = useState([]); // 解析结果-table数据
  const [answerTableColumns, setAnswerTableColumns] = useState([]); // 解析结果-table列

  const requestModelList = async () => {
    const res = await get({
      url: Api.getAnalysisTaskConfigList,
    });
    if (res.success) {
      const step = (arr) => {
        arr.forEach((item) => {
          item.value = item.vendor.code;
          item.label = item.vendor.name;
          if (item.modelList) {
            if (item.modelList.length === 0) {
              delete item.modelList;
            } else {
              const children = [];
              item.modelList.forEach((model) => {
                children.push({
                  value: model.code,
                  label: model.name,
                });
              });
              item.children = children;
            }
          }
        });
      };
      step(res.data);

      setModelList(res?.data || []);

      if(
        res?.data
        && res?.data.length > 0
      ) {
        form.setFieldsValue({
          specificFmttVO: ['aliyun', 'qwen-max'],
        })
      }
    }
  };   

  const getSmartChatByMessageId = async (messageId) => {
    try {
      setLoading(true)
      const res = await get({
        url: Api.getSmartChatByMessageId,
        params: {
          messageId,
        }
      })
      if (res.success) {
          if (res.data) {
            setEnableTest(true)
          } else {
            message.error('未查到会话记录，请重新输入')
            setEnableTest(false)
          }
      } else {
        message.error(res.message || '查询出错')
        setEnableTest(false)
      }
    } catch (error) {
      message.error(error.message)
      setEnableTest(false)
    } finally {
      setLoading(false)
    }
  }

  const clickQueryBtn = () => {
    isTestStopRef.current = true
    setAnswerTableList([])
    setAnswerTableColumns([
      {
        title: '解析结果',
        dataIndex: 'analysisResult',
        align: 'center',
      }
    ])
    setTestRst('')
    setEnableTest(false)
    setLoading(false)
    setLoading2(false)
    setIsTestEnd(true)

    form.validateFields((err, values) => {
      if (!err) {
        console.log('values', values);
        setMessageId(values.messageId)
        setConsultChatUrl(`${galaxyConfig?.consultChatUrl}?msgId=${values.messageId}&sso-epctoken=${SSO_EPCTOKEN}`)
        getSmartChatByMessageId(values.messageId)
      }
    })
  }

  // 获取解析结果-动态表格
  const getFmtAnswerTable = async (outData) => {
    const data = { ...outData };
    try {
      const resData = await post({
        url: Api.getSmartChatAnalysisPlanGetAnalysisResult,
        data,
      })
      
      if (resData.success) {
        const {
          analysisResult,
          analysistDataList = [],
        } = resData.data;

        const needAnswerTableColumns = [
          {
            title: '解析结果',
            dataIndex: 'analysisResult',
            width: 120,
            align: 'center',
            fixed: 'left',
          }
        ];        
        const answerTableItem = {
          webSortNum: '0',
          analysisResult: analysisResult === 'success' ? '成功' : '失败',
        };

        analysistDataList.map((item, itemIndex) => {
          const titleWidth = item.question ? (item.question.length * 20 + 16) : 120;
          console.info('titleWidth', titleWidth)
          answerTableItem[`question${itemIndex}`] = item.answer || '-';  
          needAnswerTableColumns.push({
            title: item.question,
            dataIndex: `question${itemIndex}`,
            align: 'center',
            width: titleWidth,           
          })
          return null;
        })
        const needAnswerTableList = [answerTableItem];
        console.info('needAnswerTableColumns', needAnswerTableColumns);
        console.info('needAnswerTableList', needAnswerTableList);
        setAnswerTableColumns(needAnswerTableColumns)        
        setAnswerTableList(needAnswerTableList)
      }
    } catch (error) {
      console.error('getFmtAnswerTable_error', error);
    }
  }

  // 后续需要根据fmttLogId获取fmtAnswer
  const getFmtAnswerByFmtLogId = async (fmttLogId) => {
    if(isTestStopRef.current) {
      return;
    }

    try {
      const res = await get({
        url: Api.getFmtAnswer,
        params: {
          fmttLogId,
          messageId,
        }
      })

      if(!res.success) {
        message.error(res.message)
        setEnableTest(true)
        setIsTestEnd(true)
        return;
      }

      if (res.data) {
        const { answerContent, fmttLogId, fmttAnswerEnd } = res.data
        setTestRst(answerContent)
        if (!fmttAnswerEnd) {
          // 还未结束，继续请求
          await sleep(200);
          await getFmtAnswerByFmtLogId(fmttLogId)
        } else {
          // 已结束
          setEnableTest(true)
          setIsTestEnd(true)
          getFmtAnswerTable({
            planId: curVal.planId,
            answerContent
          });
        }
      }
    } catch (error) {
      message.error(error.message)
      setEnableTest(true)
      setIsTestEnd(true)
    }
  }

  // 点击开始测试按钮
  const clickBeginTest = async () => {
    form.validateFields(async (err, values) => {
      if (!err) {
        const formData = values;
        try {
          // 每次开始测试，先清空
          setLoading2(true)
          setTestRst('')
          setEnableTest(false)
          isTestStopRef.current = false
          setIsTestEnd(false)
          const res = await get({
            url: Api.testPlan,
            params: {
              msgId:messageId,
              planId: curVal.planId,
              fmttVendorEnCode: formData.specificFmttVO[0],
              fmttModelEnCode: formData.specificFmttVO[1],
            }
          })
    
          if (!res.success) {
            message.error(res.message);
            setEnableTest(true);
            setIsTestEnd(true)
            return;
          }
    
          if (res.data) {
            const { fmttLogId } = res.data
            getFmtAnswerByFmtLogId(fmttLogId);
          }
        } catch (error) {
          message.error(error.message);
          setEnableTest(true);
          setIsTestEnd(true)
        } finally {
          setLoading2(false);
        } 
      }
    })
  }

  // 状态重置
  const resetState = async () => {
    isTestStopRef.current = true
    await sleep(500)

    setAnswerTableList([])
    setAnswerTableColumns([
      {
        title: '解析结果',
        dataIndex: 'analysisResult',
        align: 'center',
      }
    ])

    setTestRst('')
    setEnableTest(false)
    setLoading(false)
    setLoading2(false)
    setMessageId('')
    setIsTestEnd(true)
    closeDrawer()
  }

  // 点击详情
  const viewDetail = () => {
    if (enableTest) {
      setShowDetailWin(true)
    }
  }

  useEffect(() => {
    requestModelList()
  }, [testWinFlag])

  return (
    <div className='test-drawer-container'>
      <Drawer
        className='test-drawer-wrap'
        open={testWinFlag}
        showMask={true}
        maskClosable={true}
        width={700}
        title='测试会话分析方案'
        placement='right'
        onOpenChange={(open) => {
          setTestWinFlag(open);
          resetState()
        }}
        onClose={() => {
          setTestWinFlag(false);
          resetState()
        }}
      >
        <div className="quert-wrap">
          <Loading text="加载中" visible={loading} size='small' />
          <Form
            layout="inline"
          >
            <Form.Item label="选择会话:">
              {
                getFieldDecorator('messageId', {
                  rules: [
                    {
                      required: true,
                      message: '请输入会话ID精准查询'
                    }
                  ],
                })(<Input placeholder='请输入会话ID精准查询' />)
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={clickQueryBtn} disabled={!isTestEnd}>查询</Button>
            </Form.Item>            
            <Form.Item
              label="指定大模型："            
            >
              {
                getFieldDecorator('specificFmttVO', {
                  rules: [
                    {
                      required: true,
                      message: '请选择指定大模型'
                    }
                  ],
                })(<Cascader
                  showSearch
                  placeholder="请选择指定大模型"
                  options={modelList}
                  style={{ width: '360px' }}
                ></Cascader>)                
              }
            </Form.Item>
          </Form>
          <div className='pl-10'>
            <div className="text-wrap line-item">
              <span className="text">会话详情：</span>
              <span
                onClick={viewDetail}
                className={`view-detail ${enableTest ? 'enable' : 'disable'}`}
              >点击详情</span>
            </div>

            <div className="line-item">
              <Button
                type="primary"
                disabled={!enableTest}
                loading={!isTestEnd}
                onClick={clickBeginTest}
              >
                开始测试
              </Button>
            </div>
            {
              (loading2) && (
                <div style={{ height: 140}}>
                  <Loading text="加载中" visible={loading2} size='small' />
                </div>
              )
            }
            { 
              (testRst) && (
                <>
                  <div className="text-wrap line-item">
                    <span className="text">测试结果：</span>
                  </div>         
                  <div className="text-wrap line-item">
                    <Input.TextArea
                      className="test-rst-wrap"
                      value={testRst}
                      placeholder=""
                      autosize={{ minRows: 12, maxRows: 12 }}
                      onChange={(e) => {
                        setTestRst(e.target.value);
                      }}
                    />             
                  </div>
                  {
                    (isTestEnd) && (
                      <>
                        <div className="text-wrap line-item">
                          <span className="text">解析结果：</span>
                        </div>
                        <AppTable
                          bordered
                          dataSource={answerTableList} 
                          columns={answerTableColumns}
                          rowKey="webSortNum"
                          pagination={false}
                        />                       
                      </>                      
                    )
                  }
                </>
              )
            }
          </div>
        </div>
      </Drawer>
      {
        showDetailWin ? (
          <Modal
            width={1000}
            height={700}
            title="会话详情"
            visible={showDetailWin}
            onCancel={() => {
              setShowDetailWin(false);
            }}
            footer={null}
        >
          <iframe src={consultChatUrl} style={{ width: '100%', height: 600}}></iframe>
        </Modal>
        ) : null
      }
    </div>
  );
}

export default Form.create()(React.forwardRef(TestDrawer))
