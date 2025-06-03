import React, { useEffect, useState } from "react";
import { Drawer, Alert, message, Button, Form, Input, Col, Row, InputNumber } from "dpl-react";
import Api from "@/request/api-callcentermanage";
import { get, post } from "@/request/request";
import "./index.scss";

const initConfigItem = {
  field: '',
  value: '',
  displayName: ''
};

const initInfoData = {
  chatAnalysisTaskId: '',
  filterConfigList: [],
  notDisplayConfigList: [],
  summaryField: '',
}

const judgeIsMaxStr = (str) => {
  const maxNum = 200;

  return str.length > maxNum;
}


function DetailDrawer(props) {
  const { detailDrawer, trigger, setDetailDrawer } = props;
  // console.log('detailDrawer_props', detailDrawer);
  const { visible} = detailDrawer;
  const isUpdate = !!detailDrawer.id;
  const title = `${isUpdate ? '编辑' : '新增'}筛选配置`;
  const [infoData, setInfoData] = useState(initInfoData);

  const toSure = async () => {
    if (!infoData.chatAnalysisTaskId) {
      message.warning('任务id不能为空')
      return;
    }

    if (infoData.filterConfigList.length === 0) {
      message.warning('条件至少要有一行')
      return;
    }

    if (!infoData.summaryField) {
      message.warning('总结字段不能为空')
      return;
    } 
    let isEmpty = false;
    let isEmpty2 = false;
    infoData.filterConfigList.map((item) => {
      if(
        !item.field
        || !item.value
        || !item.displayName
      ) {
        isEmpty = true
      }
    });
    infoData.notDisplayConfigList.map((item) => {
      if(
        !item.field
        || !item.value
      ) {
        isEmpty2 = true
      }
    });    
    if (isEmpty) {
      message.warning('新增的条件不能为空')
      return;
    }  
    if (isEmpty2) {
      message.warning('新增设置不展示值不能为空')
      return;
    }           

    let urlInfo = Api.postIsdChatAnalysisFilterConfigSave;
    const paramData = {
      ...infoData
    }

    if(isUpdate) {
      paramData.id = detailDrawer.id
      urlInfo = Api.postIsdChatAnalysisFilterConfigUpdate
    }

    try {
      const resData = await post({
        url: urlInfo,
        data: paramData,
      });
      console.info('toSure', resData);
      if (resData.data) {
        const tipTxt = `${isUpdate ? '编辑' : '新增'}成功`;
        message.success(tipTxt);
        setDetailDrawer(false);
        trigger();
      } else {
        const tipTxt = `${isUpdate ? '编辑' : '新增'}失败`;
        message.error(resData.message || tipTxt);        
      }
    } catch (error) {
      const tipTxt = `${isUpdate ? '编辑' : '新增'}失败`;
      message.error(tipTxt); 
      console.error('toSure', error)
    }
  } 

  useEffect(() => {
    const getInfoData = async () => {
      if(
        !detailDrawer.visible
        || !detailDrawer.id
      ) {
        setInfoData(initInfoData)
        return;
      }

  
      try {
        let resData = await get({
          url: Api.getIsdChatAnalysisFilterConfigDetail,
          params: {
            id: detailDrawer.id,
          },
        });

        console.info('api_getIsdChatAnalysisFilterConfigDetail', resData);
        if (resData.data) {
          if (
            resData.data.filterConfigList
            && resData.data.filterConfigList.length === 0
          ) {
            resData.data.filterConfigList = [...initInfoData.filterConfigList]
          }

          if (
            resData.data.notDisplayConfigList
            && resData.data.notDisplayConfigList.length === 0
          ) {
            resData.data.notDisplayConfigList = [...initInfoData.notDisplayConfigList]
          }

          setInfoData(resData.data)
        }
      } catch (error) {
        setInfoData(initInfoData);
        console.info('api_getIsdChatAnalysisFilterConfigDetail', error)
      }
    }
    getInfoData();
  }, [detailDrawer]);

  return (
    <div className="sessioAnalysis-task-detail">
      <Drawer
        className="proactive-service-configuration-detail-drawer"
        open={visible}
        showMask={true}
        maskClosable={false}
        width={1000}
        title={title}
        onClose={() => {
          setDetailDrawer({
            visible: false,
            id: '',
          })
        }}
      >
        <div className="content-view">
          <div className="config-info">
            <div className="config-item dpl-form-item-required">
              任务id
            </div>
            <InputNumber 
              className="config-item" 
              placeholder="请输入任务id" 
              inputWidth={200}
              min={1}
              disabled={isUpdate}
              value={infoData.chatAnalysisTaskId}
              onChange={(data) => {
                let value = '';
                if (data) {
                  const reg = /[\.]*/g;

                  value = (data + '').replace(reg,'');
                  value = Number(value);
                }
                
                setInfoData({
                  ...infoData,
                  chatAnalysisTaskId: value,
                })
              }}
            />
          </div>
          <div className="box-line"></div>
          <div className="config-info">
            <div className="config-item dpl-form-item-required">
              设置筛选条件
            </div>
            <Button 
              type="primary" 
              className="config-item"
              onClick={() => {
                if(infoData.filterConfigList.length >= 20) {
                  message.warning('条件最多可新增20行');
                  return;
                }

                const newInfoData = { ...infoData };
                newInfoData.filterConfigList = [
                  ...newInfoData.filterConfigList,
                  {
                    ...initConfigItem
                  }
                ]

                setInfoData(newInfoData);
              }}
            >
              新增条件
            </Button>
          </div>
          <div className="config-condition-info">
            {
              infoData.filterConfigList.map((item, itemIndex) => {
                return (
                  <div className="config-condition" key={itemIndex}>
                    <div className="condition-item">{`条件${itemIndex+1}`}</div>
                    <div className="condition-item">字段名称</div>
                    <div className="condition-item">
                      <Input 
                        placeholder="请输入字段名" 
                        value={item.field}
                        onChange={(event) => {
                          let value = event.target.value;

                          if(judgeIsMaxStr(value)) {
                            value = value.slice(0, 200);
                          }

                          const newInfoData = { ...infoData };
                          newInfoData.filterConfigList[itemIndex] = {
                            ...newInfoData.filterConfigList[itemIndex],
                            field:value
                          };
          
                          setInfoData(newInfoData);                          
                        }} 
                      />
                    </div>
                    <div className="condition-item">字段值</div>
                    <div className="condition-item">
                      <Input 
                        placeholder="请输入字段值" 
                        value={item.value} 
                        onChange={(event) => {
                          let value = event.target.value;

                          if(judgeIsMaxStr(value)) {
                            value = value.slice(0, 200);
                          }

                          const newInfoData = { ...infoData };
                          newInfoData.filterConfigList[itemIndex] = {
                            ...newInfoData.filterConfigList[itemIndex],
                            value
                          };
          
                          setInfoData(newInfoData);                          
                        }}                        
                      />
                    </div>
                    <div className="condition-item">展示名称</div>
                    <div className="condition-item">
                      <Input 
                        placeholder="请输入展示名称" 
                        value={item.displayName}
                        onChange={(event) => {
                          let value = event.target.value;

                          if(judgeIsMaxStr(value)) {
                            value = value.slice(0, 200);
                          }

                          const newInfoData = { ...infoData };
                          newInfoData.filterConfigList[itemIndex] = {
                            ...newInfoData.filterConfigList[itemIndex],
                            displayName:value
                          };
          
                          setInfoData(newInfoData);                          
                        }}                         
                      />
                    </div>
                    <div className="condition-item">
                      <Button.Text 
                        onClick={() => {
                          if(infoData.filterConfigList.length === 1) {
                            message.warning('条件至少要有一行');
                            return;
                          }
                          
                          const newInfoData = { ...infoData };
                          newInfoData.filterConfigList[itemIndex] = '';
                          newInfoData.filterConfigList = newInfoData.filterConfigList.filter(Boolean);
          
                          setInfoData(newInfoData);                          
                        }}
                      >
                        删除
                      </Button.Text>
                    </div>                                     
                  </div>
                )
              })
            }
            <div className="config-item">
              <div className="config-item"></div>
            </div>
          </div>
          <div className="box-line"></div>
          <div className="config-info">
            <div className="config-item dpl-form-item-required">
              设置总结字段
            </div>
            <div className="config-item">
              字段名称
            </div>
            <Input 
              className="config-item config-item-input" 
              placeholder="请总结用户咨询内容" 
              value={infoData.summaryField}
              onChange={(event) => {
                let value = event.target.value;

                if(judgeIsMaxStr(value)) {
                  value = value.slice(0, 200);
                }               

                setInfoData({
                  ...infoData,
                  summaryField: value,
                })
              }}
            />
          </div>
          <div className="box-line"></div>
          <div className="config-info">
            <div className="config-item">
              设置不展示值
            </div>
            <Button 
              type="primary" 
              className="config-item"
              onClick={() => {
                if(infoData.notDisplayConfigList.length >= 20) {
                  message.warning('设置不展示值最多可新增20行');
                  return;
                }
      
                const newInfoData = { ...infoData };
                const initConfigItemPart = { ...initConfigItem };
                delete initConfigItemPart.displayName
                newInfoData.notDisplayConfigList = [
                  ...newInfoData.notDisplayConfigList,
                  {
                    ...initConfigItemPart
                  }
                ]

                setInfoData(newInfoData);                
              }}
            >
              新增
            </Button>
          </div>
          <div className="config-condition-info">
            {
              infoData.notDisplayConfigList.map((item, keyIndex) => {
                return (
                  <div className="config-condition" key={keyIndex}>
                    <div className="condition-item">{`字段${keyIndex+1}`}</div>
                    <div className="condition-item">字段名称</div>
                    <div className="condition-item">
                      <Input 
                        placeholder="请输入字段名" 
                        value={item.field}
                        onChange={(event) => {
                          let value = event.target.value;

                          if(judgeIsMaxStr(value)) {
                            value = value.slice(0, 200);
                          }

                          const newInfoData = { ...infoData };
                          newInfoData.notDisplayConfigList[keyIndex] = {
                            ...newInfoData.notDisplayConfigList[keyIndex],
                            field: value
                          };
          
                          setInfoData(newInfoData);                          
                        }}
                      />
                    </div>
                    <div className="condition-item">字段值</div>
                    <div className="condition-item">
                      <Input 
                        placeholder="请输入字段值" 
                        value={item.value} 
                        onChange={(event) => {
                          let value = event.target.value;

                          if(judgeIsMaxStr(value)) {
                            value = value.slice(0, 200);
                          }

                          const newInfoData = { ...infoData };
                          newInfoData.notDisplayConfigList[keyIndex] = {
                            ...newInfoData.notDisplayConfigList[keyIndex],
                            value
                          };
          
                          setInfoData(newInfoData);                          
                        }}                        
                      />
                    </div>
                    <div className="condition-item">
                      <Button.Text
                        onClick={() => {                          
                          const newInfoData = { ...infoData };
                          newInfoData.notDisplayConfigList[keyIndex] = '';
                          newInfoData.notDisplayConfigList = newInfoData.notDisplayConfigList.filter(Boolean);
          
                          setInfoData(newInfoData);                          
                        }}
                      >
                          删除
                      </Button.Text>
                    </div>                                                          
                  </div>
                )
              })
            }
          </div>         
        </div>
        <div className="footer">
          <Button.Group mode={'split'}>
            <Button type="primary" onClick={toSure}>确认</Button>
          </Button.Group>
        </div>         
      </Drawer>
    </div>
  );
}

export default DetailDrawer;
