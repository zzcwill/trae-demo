import React, { useEffect, useState } from 'react';
import { Form, Button, message, Input, Select, Icon } from 'dpl2-proxy';
import API from '@/requestApi/callcentermanage/api';
import { cloneDeep } from 'lodash';
import { 
  seatAssistVersionArr, 
  seatAssistVersionConfigTypeArr,
} from "@/const"
import { makeUUID } from '@/utils'
import UserFuzzyQueryDpl2 from "@/components/userFuzzyQueryDpl2";
import {
  toGetApiVersionListByPage,
  toGetPageVersionListByApi,
  toCheckPageVersionList,
} from './utils';
import './index.scss';

const initVersionItem = {
  buttonName: '',
  productVersionCode: '',
  webConfigList: [
    {
      webType: '',
      domainIdList: [],
      brandList: [],
      trueIdList: [],
      agentNameList: [],
    }
  ],
}

const AgentAuxiliaryConfig = () => {
  const [pageVersionList, setPageVersionList] = useState([]); // 版本列表
  const [apiDomainIdList, setApiDomainIdList] = useState([]); // 领域列表
  const [apiBrandList, setApiBrandList] = useState([]); // 产品维度列表
  const [searchForm] = Form.useForm();

  // 初始化表单-只有版本变的时候才初始化
  const toInitSearchForm = (versionList) => {
    // 设置表单值
    const searchFormData = {};
    versionList.map((itemZ, itemZIndex) => {
      searchFormData[`productVersionCode${itemZIndex}`] = itemZ.productVersionCode
      searchFormData[`buttonName${itemZIndex}`] = itemZ.buttonName
      return null;
    })
    searchForm.setFieldsValue(searchFormData);
  }

  // 新增和删除版本
  const toAddConfigVersion = () => {
    // if(pageVersionList.length >= 3) {
    //   message.warning('最多配置3个产品版本');
    //   return;
    // }

    const needPageVersionList = cloneDeep(pageVersionList);
    needPageVersionList.push(initVersionItem);
    console.info('needPageVersionList', needPageVersionList);
    toInitSearchForm(needPageVersionList);
    setPageVersionList(needPageVersionList);
  }
  const toDelConfigVersion = (outData) => {
    const { itemIndex } = outData
    let needPageVersionList = cloneDeep(pageVersionList);
    needPageVersionList = needPageVersionList.filter((itemA, itemAIndex) => itemAIndex !== itemIndex);
    console.info('needPageVersionList', needPageVersionList);
    toInitSearchForm(needPageVersionList);
    setPageVersionList(needPageVersionList);
  }  
  
  // 保存版本
  const toSaveVersion = async () => {
    // 配型类型有空的过滤在处理
    const needPageVersionList = pageVersionList.map((item) => {
      let newItem = cloneDeep(item);
      let webConfigList = item.webConfigList.filter(item => item.webType);
      newItem.webConfigList = webConfigList;
      return newItem;
    });
    console.info('needPageVersionList', needPageVersionList)
    setPageVersionList(needPageVersionList);

    // 检验是否必填
    await searchForm.validateFields();
    // 校验有没超出3个版本，版本有没重复
    const isPass = await toCheckPageVersionList(needPageVersionList);
    if (!isPass) {
      return;
    }

    let paramValue = toGetApiVersionListByPage(needPageVersionList);
    
    const paramData = [
      {
        paramType: 'OL_AGENT_ASSISTANCE',
        paramKey: 'invocationScheme',
        paramValue,
      }
    ];
    try {
      const resData = await API.postSystemParamsSave(paramData);

      if (resData.data) {
        message.success('提交成功')
      } else {
        message.error('提交失败')
      }
      console.info('toSaveVersion_paramData', paramData);
    } catch (error) {
      message.error('提交失败')
      console.error('toSaveVersion_error', error)
    }
  }

  // 表单onChange事件-枚举
  const formItemKeyEnum = {
    buttonName: 'buttonName',
    productVersionCode: 'productVersionCode',
    webType: 'webType',
    domainIdList: 'domainIdList',
    brandList: 'brandList',
    trueIdList: 'trueIdList',
    agentNameList: 'agentNameList',
  }
  // 表单onChange事件  
  const onChangeFormItem = (outData) => {
    const {
      itemIndex,
      itemChildIndex,
      formItemKey,
      formItemValue,
    } = outData;

    const needPageVersionList = cloneDeep(pageVersionList);

    // 产品版本
    if (formItemKey === formItemKeyEnum.productVersionCode) {
      needPageVersionList[itemIndex] = {
        ...initVersionItem,
        productVersionCode: formItemValue,
      };
    }    

    // 名称
    if (formItemKey === formItemKeyEnum.buttonName) {
      needPageVersionList[itemIndex].buttonName = formItemValue;
    }

    // 配置类型
    if (formItemKey === formItemKeyEnum.webType) {
      const needWebConfigList = needPageVersionList[itemIndex].webConfigList;
      needWebConfigList[itemChildIndex] = {
        ...initVersionItem.webConfigList[0],
        webType: formItemValue,
      }
      needPageVersionList[itemIndex].webConfigList = needWebConfigList;
    }  
    
    // 领域列表-多选
    if (formItemKey === formItemKeyEnum.domainIdList) {
      const needWebConfigList = needPageVersionList[itemIndex].webConfigList;
      needWebConfigList[itemChildIndex].domainIdList = formItemValue || [];
      needPageVersionList[itemIndex].webConfigList = needWebConfigList;
    }  
    
    // 产品维度-产品列表-多选
    if (formItemKey === formItemKeyEnum.brandList) {
      const needWebConfigList = needPageVersionList[itemIndex].webConfigList;
      needWebConfigList[itemChildIndex].brandList = formItemValue;
      needPageVersionList[itemIndex].webConfigList = needWebConfigList;
    }    
    
    // 产品维度-账号列表-多选
    if (formItemKey === formItemKeyEnum.trueIdList) {
      const needWebConfigList = needPageVersionList[itemIndex].webConfigList;
      needWebConfigList[itemChildIndex].trueIdList = formItemValue.trueIdList;
      needWebConfigList[itemChildIndex].agentNameList = formItemValue.agentNameList;
      needPageVersionList[itemIndex].webConfigList = needWebConfigList;
    }    
    
    console.info('needPageVersionList', needPageVersionList);

    setPageVersionList(needPageVersionList);
  }

  // 增加和删除配置类型事件-枚举
  const handleTypeEnum = {
    add: 'add',
    del: 'del',
  }
  // 增加和删除配置类型事件
  const onHandleWebType = (outData) => {
    const {
      itemIndex,
      itemChildIndex,
      handleType,
    } = outData;

    const needPageVersionList = cloneDeep(pageVersionList);
    const initWebTypeItem = initVersionItem.webConfigList[0];

    // 增加配置类型
    if(handleType === handleTypeEnum.add) {
      const webConfigList = needPageVersionList[itemIndex].webConfigList;
      webConfigList.push(initWebTypeItem);
      needPageVersionList[itemIndex].webConfigList = webConfigList;
    }

    // 删除配置类型
    if(handleType === handleTypeEnum.del) {
      let webConfigList = needPageVersionList[itemIndex].webConfigList;
      webConfigList = webConfigList.filter((itemQ, itemQIndex) => itemQIndex !== itemChildIndex);
      needPageVersionList[itemIndex].webConfigList = webConfigList;
    }    

    console.info('needPageVersionList', needPageVersionList)
    setPageVersionList(needPageVersionList);
  }

  // 获取版本列表
  const getVersionListApi = async () => {
    const paramData = {  
      paramTypeList: 'OL_AGENT_ASSISTANCE',
      paramKeyList: ['invocationScheme'].join(',')      
    }
    try {
      const resData = await API.getSystemParamsQuery(paramData);

      if(resData.success) {
        let needArrData = [];
        if (resData.data.length > 0) {
          needArrData = resData.data[0].paramValue
        }

        // 接口返回配置数据转换，转成页面需要配置数据
        const versionList = toGetPageVersionListByApi(needArrData);
        console.info('versionList', versionList);

        toInitSearchForm(versionList);
        setPageVersionList(versionList);
      }
    } catch (error) {
      console.error('getVersionListApi_error', error)
    }
  }

  // 获取领域列表
  const getApiDomainIdList = async () => {
    try {
      const resData = await API.getBrainDict({});
      // console.info('getApiDomainIdList', resData);
      if (resData.success) {
        const needData = resData.data.map((item) => {
          return {
            name: item.name,
            value: item.domainId
          }
        })
        setApiDomainIdList(needData);
      }
    } catch (error) {
      console.error('getApiDomainIdList_error', error);
    }  
  }  

  // 获取产品维度列表
  const getApiBrandList = async () => {
    try {
      const paramData = {
        typeList: 'brand'
      }
      const resData = await API.getCommonDimensionList(paramData);
      if (resData.success) {
        if (resData.data.length > 0) {
          const needData = resData.data[0].dimensionParamList || []
          setApiBrandList(needData);          
        }
      }
    } catch (error) {
      console.error('getApiBrandList_error', error);
    }  
  }   

  useEffect(() => {
    getApiDomainIdList();
    getApiBrandList();
    getVersionListApi();
  }, [])

  return (
    <div className='agent-auxiliary-config'>
      <div className='agent-auxiliary-config-head'>
        <Button className='btn-new' type='primary' onClick={toAddConfigVersion}>新增版本</Button>
        <Button type='primary' onClick={toSaveVersion}>提交</Button>
      </div>
      <div className='agent-auxiliary-config-body'>
        <Form
          form={searchForm}
        >
          {
            pageVersionList.map((itemInfo, itemIndex) => {
              return (
                <div className='version-config-part' key={itemIndex}>
                  <div className='version-config-item'>
                    <div className='version-config-item-row'>
                      <Form.Item
                        className='version-config-item-form'
                        label="产品版本："
                        name={`productVersionCode${itemIndex}`}
                        rules={[
                          {
                            required: true,
                            message: '请选择产品版本',
                          },
                        ]}              
                      >
                        <Select
                          showSearch
                          allowClear
                          placeholder="请选择"
                          style={{ width: '190px' }}
                          wait={250}
                          // mode="multiple"
                          notFoundContent="暂无数据"
                          virtual
                          filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                          onChange={(value) => {
                            onChangeFormItem({
                              itemIndex,
                              formItemKey: formItemKeyEnum.productVersionCode,
                              formItemValue: value,
                            });
                          }}
                        >
                          {
                            seatAssistVersionArr.map((itemM) => {
                              return (
                                <Select.Option key={itemM.value} value={itemM.value}>{itemM.name}</Select.Option>
                              )
                            })
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item
                        className='version-config-item-form'
                        label="名称："
                        name={`buttonName${itemIndex}`}
                        // validateStatus={itemInfo.buttonNameValidateStatus || ''}
                        rules={[
                          {
                            validator: (rule, value) => {
                              if (!value) {
                                return Promise.reject(new Error('请输入展示名称'));
                              }

                              if (value.length > 10) {
                                return Promise.reject(new Error('请输入不超过10个字的名称'));
                              }
                              return Promise.resolve();
                            }                     
                          }                    
                        ]}                    
                      >
                        <Input
                          placeholder="请输入不超过10个字的名称"
                          style={{ width: '240px' }}
                          maxLength="100"
                          allowClear
                          onChange={(event) => {
                            let toValue = event.target.value;
                            if (toValue) {
                              toValue = toValue.trim();
                            }
                            onChangeFormItem({
                              itemIndex,
                              formItemKey: formItemKeyEnum.buttonName,
                              formItemValue: toValue,
                            });
                          }}
                        />
                      </Form.Item> 
                      <Form.Item
                        className='version-config-item-form'
                      >
                        <Button 
                          type="text" 
                          onClick={() => {
                            onHandleWebType({
                              itemIndex,
                              handleType: handleTypeEnum.add,
                            })
                          }}
                        >
                          +增加配置项
                        </Button>
                      </Form.Item>
                    </div> 
                    {
                      itemInfo.webConfigList.map((itemChild, itemChildIndex) => {
                        // 坐席账号-初始化数据
                        let initApiDataList = [];
                        if(itemChild.trueIdList) {
                          itemChild.trueIdList.map((itemZ, indexZ) => { 
                            initApiDataList.push({
                              value: itemZ,
                              name: itemChild.agentNameList[indexZ],
                            })
                          });
                        }
                        console.info(`initApiDataList_${itemChild.webType}`, initApiDataList)

                        return (
                          <div 
                            className='version-config-item-row'
                            key={makeUUID()}
                          >
                            <Form.Item
                              className='version-config-item-form'
                              label="配置类型："    
                            >
                              <Select
                                value={itemChild.webType}
                                showSearch
                                allowClear
                                placeholder="请选择"
                                style={{ width: '190px' }}
                                wait={250}
                                // mode="multiple"
                                notFoundContent="暂无数据"
                                virtual
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                onChange={(value) => {
                                  onChangeFormItem({
                                    itemIndex,
                                    itemChildIndex,
                                    formItemKey: formItemKeyEnum.webType,
                                    formItemValue: value,
                                  });                                
                                }}
                              >
                                {
                                  seatAssistVersionConfigTypeArr.map((itemK) => {
                                    return (
                                      <Select.Option key={itemK.value} value={itemK.value}>{itemK.name}</Select.Option>
                                    )
                                  })
                                }
                              </Select>
                            </Form.Item>
                            {
                              (itemChild.webType === 'domain') && (
                                <Form.Item
                                  className='version-config-item-form'
                                  label={`领域：`}        
                                >
                                  <Select
                                    value={itemChild.domainIdList}
                                    showSearch
                                    allowClear
                                    placeholder="请选择"
                                    style={{ width: '240px' }}
                                    wait={200}
                                    mode="multiple"
                                    notFoundContent="暂无数据"
                                    virtual
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    onChange={(value) => {
                                      onChangeFormItem({
                                        itemIndex,
                                        itemChildIndex,
                                        formItemKey: formItemKeyEnum.domainIdList,
                                        formItemValue: value || [],
                                      });                                
                                    }}                                  
                                  >
                                    {
                                      apiDomainIdList.map((itemK) => {
                                        return (
                                          <Select.Option key={itemK.value} value={itemK.value}>{itemK.name}</Select.Option>
                                        )
                                      })
                                    }
                                  </Select>
                                </Form.Item> 
                              )
                            }  
                            {
                              (['brand', 'imageRecognition'].includes(itemChild.webType)) && (
                                <>
                                  <Form.Item
                                    className='version-config-item-form'
                                    label={`产品维度：`}        
                                  >
                                    <Select
                                      value={itemChild.brandList}
                                      showSearch
                                      allowClear
                                      placeholder="请选择"
                                      style={{ width: '240px' }}
                                      wait={250}
                                      mode="multiple"
                                      notFoundContent="暂无数据"
                                      virtual
                                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                      onChange={(value) => {
                                        onChangeFormItem({
                                          itemIndex,
                                          itemChildIndex,
                                          formItemKey: formItemKeyEnum.brandList,
                                          formItemValue: value || [],
                                        });                                
                                      }}                                  
                                    >
                                      {
                                        apiBrandList.map((itemK) => {
                                          return (
                                            <Select.Option key={itemK.value} value={itemK.value}>{itemK.name}</Select.Option>
                                          )
                                        })
                                      }
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                  className='version-config-item-form'
                                  label={`坐席账号：`}        
                                  >
                                    <UserFuzzyQueryDpl2
                                      initApiDataList={initApiDataList}
                                      value={itemChild.trueIdList}
                                      showSearch
                                      allowClear
                                      placeholder="请选择"
                                      style={{ width: '240px' }}
                                      wait={200}
                                      mode="multiple"
                                      notFoundContent="暂无数据"
                                      virtual
                                      filterOption={() => true}
                                      onChange={(value, option) => {
                                        onChangeFormItem({
                                          itemIndex,
                                          itemChildIndex,
                                          formItemKey: formItemKeyEnum.trueIdList,
                                          formItemValue: {
                                            trueIdList: value || [],
                                            agentNameList: option.map((item) => item.children),
                                          },
                                        });                                
                                      }}                                  
                                    />
                                  </Form.Item>                                                                  
                                  </>
                              )
                            }                                                   
                            <Form.Item
                              className='version-config-item-form'
                            >
                              <Button 
                                type="text"
                                onClick={() => {
                                  onHandleWebType({
                                    itemIndex,
                                    itemChildIndex,
                                    handleType: handleTypeEnum.del,
                                  })
                                }}                              
                              >
                                删除配置项
                              </Button>
                            </Form.Item>                            
                          </div>
                        )
                      })
                    }              
                  </div>
                  <div className='version-config-item-btn'>
                    <Icon
                      className="icon-delete"
                      type="delete"
                      onClick={() => {
                        toDelConfigVersion({
                          itemIndex
                        })
                      }}
                    >
                    </Icon>                      
                  </div>
                </div>
              )
            })
          }
        </Form>
      </div>
    </div>
  )
}

export default AgentAuxiliaryConfig;