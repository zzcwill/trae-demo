import React, { useContext, useState, useEffect } from 'react';
import CallCenterWebApi from '@/requestApi/callcenterweb/api';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import axios from 'axios'
import { Button, message, Space, Drawer, Form, Select, Upload, Icon, Input } from 'dpl2-proxy';
import { StoreContext } from '../../context';
import UserFuzzyQueryDpl2 from "@/components/userFuzzyQueryDpl2";
import { sleep } from '@/utils/sleep';
import './index.scss';

const { Dragger } = Upload;

export const TaskDrawer = ({ 
  className,
}) => {
  const storeContext = useContext(StoreContext);
  const {
    // tableLoad,
    businessList,
    apiBrandList,
    caseTemplateUrl,
    toSearchTable,
    searchData,
    setSearchData,
    taskDrawerOpen,
    setTaskDrawerOpen,  
  } = storeContext;

  const [isSureIng, setIsSureIng] = useState(false); // 确认按钮状态
  const [fileList, setFileList] = useState([]); // 上传文件列表
  const [isHasFile, setIsHasFile] = useState(true); // 是否有文件

  const [searchForm] = Form.useForm();

  const toClose = () => {
    setTaskDrawerOpen(false);
    searchForm.resetFields();
    setIsSureIng(false);
    setFileList([]);
    setIsHasFile(true);
  };

  // 确认修改
  const toSure = async () => {
    if (isSureIng) {
      return;
    }

    try {
      if (
        fileList.length === 0
        || (fileList.length > 0 && fileList[0].url === '')
      ) { 
        setIsHasFile(false);
      }
      await searchForm.validateFields();
      setIsSureIng(true);

      const paramData = await searchForm.getFieldsValue();
      paramData.fileUrl = fileList[0].url; // 上传文件路径
      paramData.fileName = fileList[0].name; // 上传文件名称

      const resData = await CallCenterManageApi.postTaskAdd(paramData);
      // console.info('toSure', resData);

      setIsSureIng(false);
      if(!resData.success) {
        message.error(resData.message);
        return
      }


      message.success('创建任务成功');
      toClose();

      
      const newSearchData = {
        ...searchData,
        pageIndex: 1,
      };
      setSearchData(newSearchData);      
      toSearchTable(newSearchData);
    } catch (error) {
      setIsSureIng(false);
      console.error(error);
    }
  };  

  const footer = (
    <div>
      <Space>
        <Button type="primary" onClick={toSure} loading={isSureIng}>确定</Button>
        <Button onClick={toClose}>取消</Button>
      </Space>
    </div>
  ); 
  
  const draggerProps = {
    name: 'file',
    multiple: false,
    draggabled: true,
    accept: '.xls, .xlsx',
    // 自定义-文件上传
    async customRequest(file) {
      console.info('customRequest', file);


      const fileItem = {
        originFileObj: file.file,
        name: file.file.name,
        size: file.file.size,
        url: '',
        percent: 50,
        status: 'uploading',
        uid: file.file.uid,
      }  
      setFileList([fileItem])
      
      
      const limitByte = 10 * 1024 * 1024;
      if (file.file.size > limitByte) {
        message.warning('上传案例文件不能超过10M');
        fileItem.status = 'error';
        fileItem.percent = 100;
        await sleep(200);
        setFileList([fileItem])        
        return;
      }      

      const formData = new FormData();
      formData.append('file', file.file); // file.file 是上传的文件对象
      formData.append('type', 'email');

      try {
        const resData = await axios.post('/callcentermanage/common/upload/file', formData, { noCatch: true });      
        console.info('resData', resData.data);

        if (!resData.data.success) { 
          message.error('上传文件服务异常');
          fileItem.status = 'error';
          fileItem.percent = 100;
          setFileList([fileItem])
          return;
        }

        fileItem.status = 'done';
        fileItem.percent = 100;
        fileItem.url = resData.data.data.filePath;

        setFileList([fileItem]) 
      } catch (error) {
        console.info('error', error);
        message.error('上传文件服务异常');
        fileItem.status = 'error';
        fileItem.percent = 100;       
        setFileList([fileItem])         
      }
    },
    async onChange(info) {
      const newFileList = info.fileList.slice(-1)
      setFileList(newFileList);// 只保留最后一个文件
      setIsHasFile(true);
    },
    fileList,
  };

  return (
    <Drawer
      title={'新增对练任务'}
      className="task-drawer"
      zIndex={1000}
      open={taskDrawerOpen}
      width={600}
      onClose={toClose}
      getContainer={() => {
        return document.getElementById('root');
      }}
      footer={footer}
      showMask
    >
      <div className="task-drawer-info">
        <div className='sub-title'>基本信息</div>
        <Form
          labelCol={{ span: 4 }}
          form={searchForm}
        >
          <Form.Item
            label="任务名称："
            name="taskName"
            rules={[
              {
                required: true,
                message: '请输入',
              },
              {
                validator: async (_, value) => {
                  if (
                    value
                    && value.trim().length > 50
                  ) {
                    return Promise.reject(new Error('请输入不超过50字'));
                  }                  
                },
              },
            ]}
          >
            <Input
              allowClear
              placeholder="请输入不超过50字的名称"
              style={{ width: '428px'}}
              autoComplete="off"
              className='task-name-input'
            />
          </Form.Item>          
          <Form.Item
            label="业务分类："
            name="calendarCode"
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              placeholder="请选择"
              style={{ width: '428px' }}
              onChange={(values) => {
                console.log('onChange', values);
              }}
              wait={250}
              notFoundContent="暂无数据"
              virtual
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                businessList.map(item => (
                  <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="产品维度："
            name="dimensionCode"
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}            
          >
            <Select
              showSearch
              allowClear
              placeholder="请选择"
              style={{ width: '428px' }}
              onChange={(values) => {
                console.log('onChange', values);
              }}
              wait={250}
              notFoundContent="暂无数据"
              virtual
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                apiBrandList.map(item => (
                  <Select.Option key={item.value} value={item.value}>{item.name}</Select.Option>
                ))
              }              
            </Select>
          </Form.Item>
          <Form.Item
            label="指定受训人："
            name="traineeIdList"
            rules={[
              {
                required: true,
                message: '请选择',
              },
            ]}            
          >
            <UserFuzzyQueryDpl2
              showSearch
              allowClear
              placeholder="请选择"
              style={{ width: '428px' }}
              wait={200}
              mode="multiple"
              notFoundContent="暂无数据"
              virtual
              filterOption={() => true}
            />
          </Form.Item>           
          <Form.Item
            label="任务概述："
            name="description"
          >
            <Input.TextArea
              placeholder="请简要描述任务目的、训练内容等，最多不超过20个字"
              style={{ width: '428px' }}
              // showTextCount
              maxLength={20}
              autosize={{ minRows: 2, maxRows: 2 }}
            />
          </Form.Item>                   
        </Form>
        <div className='sub-line'></div>
        <div className='sub-title'>案例上传</div>
        <div className='task-drawer-upload'>
          <Dragger {...draggerProps}>
            <p style={{ paddingTop: 20 }}>
              <Icon type="cloud-upload" style={{ fontSize: 52, marginBottom: 10, color: '#333' }} />
            </p>
            <p style={{ fontSize: 16, color: '#333', marginBottom: 8 }}>
              点击或将文件拖拽到这里上传
              <span style={{ color: '#FF6633'}}>（案例不可为空）</span>
            </p>
            <p style={{ fontSize: 14, color: '#999', paddingBottom: 20 }}>
              已支持xls、xlsx，每个文件不超过10MB，点击
              <a 
                href={caseTemplateUrl} 
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                下载模板
              </a>
            </p>
          </Dragger> 
          {
            !isHasFile && (
              <div className="upload-warn-tip">
                点击下载模版，完成填写后上传    
              </div>
            )
          }
        </div>
      </div>
    </Drawer>
  );
};
