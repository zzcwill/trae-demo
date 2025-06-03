import React, { useState, useRef, useEffect } from "react";
import { Modal, Tabs, Form, Input, Select, Button, message } from "dpl-react";
import Api from '@/request/api-olhelpmanage'
import { get } from '@/request/request'
import "./index.scss";
import noData_icon from './images/空.svg'


const TabPane = Tabs.TabPane;

function RightsTag(props) {
  const { data } = props

  const showNum = (num) => {
    if (num === -1 || num === undefined) return '不限'
    return num
  }

  return <div className='rights-tag'>
    <div className='text'>{data.rightsName}({showNum(data.total)}次)</div>
  </div>
 
}


function RightsListModal(props) {
  const {
    open,
    onOk,
    onCancel,
    detail
  } = props;

  const tabs = [{
    text: '企业信息',
    key: '0'
  }, {
    text: '机构信息',
    key: '1'
  }, {
    text: '个人信息',
    key: '4'
  }]
  const [companyList, setCompanyList] = useState([])
  const [tabIndex, setTabIndex] = useState('0')
  const [isFirst, setIsFirst] = useState(true)
  const showText = tabIndex === '0' ? '企业' : (tabIndex === '1' ?'机构': '个人' )

  const getShowText = (array) => {
    const showNum = (num) => {
      if (num === -1 || num === undefined) return '不限'
      return num
    }
    const showText = []
    array.forEach(data => {
      showText.push(`${data.rightsName}(${showNum(data.total)}次)`)
    })
    return showText.join('、')
  }
  const getCompanyList = async () => {
    const res = await get({ url: Api.getCustomerList ,params: {mobile: detail.mobile} })
    if (res?.success) {
      setIsFirst(false)
      setCompanyList(res.data)
    }
  }

  useEffect(() => {
    if(open == true) {
      getCompanyList()
    }
  }, [open])


  return (
    <Modal
      className="rights-modal"
      visible={open}
      width={800}
      title="用户权益信息"
      onOk={onCancel}
      onCancel={onCancel}
      footer={null}
    >
      <Tabs defaultActiveKey={tabIndex} onChange={(index) => setTabIndex(index)} >
        {tabs.map(item => <TabPane tab={item.text} key={item.key}>
          {companyList.length > 0 && <div className='company-list'>
            {companyList.filter(item => item.type == tabIndex).map(item => {
              return <div className='company-list-item' key={item.id} >
                <div className='name-wrap'>
                  {item.type == '0' && <span className="tag tag-orange">企业</span>}
                  {item.type == '1' && <span className="tag tag-green">机构</span>}
                  {item.type == '4' && <span className="tag tag-blue">个人</span>}
                  <div className='name' title={item.name}>{item.name}</div>
                </div>
                {item.description && item.description.length > 0 &&
                  <div className='description'>描述：{item.description}</div>
                }
                {item.type != '4' && 
                  <div className='taxNo'>{item.type == '1' ? '机构号' : '税号'}：{item.taxNo}</div>
                }
                <div className='rights-wrap'>
                  <div className='rights-box'>
                    <div className='rights' style={{ marginBottom: 10 }}>
                      <p>会员咨询权益：</p>
                      <div className='rights-list'>
                        {Array.isArray(item?.rights?.memberRights) && item?.rights?.memberRights?.length > 0
                          ? getShowText(item?.rights?.memberRights)
                          : '暂无'
                        }
                      </div>
                    </div>
                    <div className='rights'>
                      <p>专项咨询权益：</p>
                      <div className='rights-list'>
                        {Array.isArray(item?.rights?.specialRights) && item?.rights?.specialRights?.length > 0
                          ? getShowText(item?.rights?.specialRights)
                          : '暂无'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            })}
          </div>}
          {!isFirst && companyList.filter(item => item.type == tabIndex).length === 0 &&
            <div className='no-data'>
              <img src={noData_icon} />
              <div className='tips'>暂无{showText}信息</div>
            </div>}
        </TabPane>)}
      </Tabs>
    </Modal>
  );
}


export default RightsListModal;