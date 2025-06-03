import React, {useState, useEffect} from 'react'
import {Form, Input, Row, Col, Select, Button} from 'dpl-react'
import {get, post} from '@/request/request'
import Api from '@/request/api-olhelpmanage'
import './index.scss'
import {getQueryString} from '@/utils'

const Option = Select.Option
const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: {span: 19},
};
const consult_channel = 'consult_channel' // 渠道枚举名
function FormFilter(props, ref) {
  const {form, onSearch, onReset,initValue} = props

  const [channelList, setChannelList] = useState([])
  const [locationList, setLocationList] = useState([])
  const {getFieldDecorator, getFieldsValue, resetFields} = form
  const filterOption = (value, option) => {
    if (option.props.children && option.props.children.indexOf(value) >= 0) {
      return true;
    }
    return false;
  };
  const getChannelList = async () => {
    const data = await get({url: Api.getEnumOptions, params: {groupNames: consult_channel}})
    if (data.success) {
      data.data.forEach(item => {
        if (item.groupName === consult_channel) {
          setChannelList(item.options || [])
        }
      })
    }
  }
  const getLocationList = async () => {
    const data = await get({url: Api.queryAreaList})
    if (data.success) {
      setLocationList(data.data || [])
    }
  }
  const confirmHandler = () => {
    const value = getFieldsValue()
    const result = {
      expertName: value.expertName,
      locationList: value.locationList ? value.locationList.join(',') : undefined,
      channelList: value.channelList ? value.channelList.join(',') : undefined
    }
    onSearch(result)
  }
  const cancelHandler = () => {

    resetFields()
    onReset && onReset()
  }

  useEffect(() => {
    getChannelList()
    getLocationList()
  }, [])

  return (
    <Form className='expert-form-filter'>
      <Row>
        <Col span={8}>
          <Form.Item label='专家名称' {...formItemLayout}>
            {getFieldDecorator('expertName', {
              initialValue: initValue.expertName
            })(
              <Input placeholder='请输入专家名称' allowClear/>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='适用地区' {...formItemLayout}>
            {getFieldDecorator('locationList', {
              initialValue: initValue.locationList
            })(
              <Select placeholder='请选择适用地区' mode="multiple" filterOption={filterOption} allowClear>
                {locationList.map((item) => {
                  return <Option key={item.id} >{item.name}</Option>
                })}
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='适用渠道' {...formItemLayout}>
            {getFieldDecorator('channelList', {
              initialValue: initValue.channelList
            })(
              <Select placeholder='请选择适用渠道' mode="multiple" filterOption={filterOption} allowClear>
                {channelList.map(item => {
                  return <Option key={item.id} >{item.name}</Option>
                })}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
      <div className='btn-group'>
        <Button type='primary' onClick={confirmHandler}>查询</Button>
        <Button style={{marginLeft: 14}} onClick={cancelHandler}>重置</Button>
      </div>
    </Form>
  )
}

export default Form.create()(React.forwardRef(FormFilter))
