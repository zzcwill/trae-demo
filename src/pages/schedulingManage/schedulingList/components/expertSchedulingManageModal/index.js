import { Button, DatePicker, Empty, Input, message, Modal, Popover } from 'dpl-react'
import React, { useEffect, useState } from 'react'
import classnames from 'classnames';
import DynamicForm from '@/components/dynamicForm';
import schema from './schema';
import './index.scss';
import Api from "@/request/api-olhelpmanage.js";
import { get, post } from '@/request/request'
import moment from 'moment';
import AllChooseSelect from '@/components/common/allChooseSelect';
import { createFormActions, registerEvent, setElements, setFormValues } from '../../../../../components/dynamicForm/core';

const form = createFormActions();

export const serviceModeMap = {
  'inquiry_online': '线上',
  'inquiry_offline':  '线下'
}

export const inquiryStatusMap = {
  BEEN_INQUIRY: '1',
  CAN_INQUIRY: '0'
}

const renderScheduleDesc = (schedule) => {
  return `${schedule.startTime}-${schedule.endTime} | ${serviceModeMap[schedule.serviceMode]} | ${schedule?.serviceLocation?.map(location=> location.name)?.join(',')}${schedule.serviceMode === 'inquiry_offline' ?` | ${schedule.offlineAddress}` :''}`
}

const addZero = (val) => {
  return (+(val  ||  0)) < 10 ? `0${val}` : val;
}

const getMonthRange = (day) => {
  // 如果变更为一个新的月份，判定是否当前月，根据是否当前月份去决定是否调用整个月的状态
  const today = moment(new Date());
  const newDay = moment(day)
  let startDay = newDay.startOf('month').format('YYYY-MM-DD');
  const endDay = newDay.endOf('month').format('YYYY-MM-DD');
  if (today.isSame(newDay, 'month')) {
    startDay = today.format('YYYY-MM-DD');
  }
  return [startDay, endDay]
}

const today = moment(new Date());

export default function ExpertSchedulingManageModal({
  className,
  expert,
  onAddSchedule,
  onDeleteSchedule,
  serviceWaysList,
  areaList,
  bizAreaList,
  ...rest
}) {

  const [value, setValue] = useState(today);
  const [open, setOpen] = useState(false);
  const [scheduleList, setScheduleList] = useState([]);
  const [scheduleStatusList, setScheduleStatusList] = useState([]);

  const initSchedule = (val) => {
    queryScheduleList(val.format('YYYY-MM-DD'));
    queryScheduleStatusList(
      getMonthRange(val.format('YYYY-MM-DD'))
    );
  }

  const onChangeHandler = (val) => {
    setValue(val);
    initSchedule(val);
  }

  const queryScheduleList = async (serviceDate) => {
    const res = await get({
      url: Api.queryScheduleList,
      params: {
        expertId: expert.expertId,
        serviceDate, 
      }
    })
    if (res.success) {
      setScheduleList(res.data);
    }
  }
  const queryScheduleStatusList = async ([startServiceDate, endServiceDate]) => {
    const res = await get({
      url: Api.queryScheduleStatusList,
      params: {
        expertId: expert.expertId,
        startServiceDate, 
        endServiceDate
      }
    })
    if (res.success) {
      setScheduleStatusList(res.data);
    }
  }

  const postSaveInquirySchedule = async (formValues) => {
    const res = await post({
      url: Api.postSaveInquirySchedule,
      data: {
        expertId: expert.expertId,
        ...formValues,
      }
    })
    if (res.success) {
      message.success('新增排期成功!')
      initSchedule(value);
      // eslint-disable-next-line no-undef
      onAddSchedule?.(schedule);
      setFormValues({
        startTime: '',
        endTime: '' 
      });
    } else {
      message.error(res.message);
    }
  }

  const postDeleteInquirySchedule = async (schedule) => {
    const res = await post({
      url: Api.postDeleteInquirySchedule,
      data: {
        id: schedule.id,
      }
    })
    if (res.success) {
      message.success(`${schedule.startTime}-${schedule.endTime}时间段的排期删除成功!`)
      initSchedule(value);
      onDeleteSchedule?.(schedule);
    } else {
      message.error(res.message);
    }
  }

  useEffect(() => {
    setOpen(true);
    registerEvent('serviceMode', 'onChange', (elementId, element) => {
      const serviceMode = form.getFieldValue('serviceMode');
      setFormValues({
        serviceLocation: '',
        offlineAddress: '',
        serviceDate: '',
        startTime: '',
        endTime: ''
      });
      setElements({
        offlineAddress: {
          formProps: {
            name: 'offlineAddress',
            title: '线下服务地址',
            rules: [{
              required: serviceMode === 'inquiry_offline',
              message: '请输入线下服务地址',
            }],
          }
        },
        serviceLocation: {
          props: {
            placeholder: '请选择',
            allowClear: true,
            mode: serviceMode === 'inquiry_offline' ? '' : 'multiple',
          },
        }
      })
      setTimeout(() => {
        form.submit();
      }, 0)
    })
    registerEvent('startTime', 'onChange', (elementId, element) => {
      const startTime = form.getFieldValue('startTime');
      const endTime = moment.duration(startTime, 'minutes').add(30, 'minutes');
      const hours = moment.duration(endTime, 'minutes').hours();
      const minutes = moment.duration(endTime, 'minutes').minutes();
      form.setFieldValue('endTime', `${addZero(hours)}:${addZero(minutes)}`);
    })
    registerEvent('endTime', 'onChange', (elementId, element) => {
      const endTime = form.getFieldValue('endTime');
      const startTime = moment.duration(endTime, 'minutes').add(-30, 'minutes');
      const hours = moment.duration(startTime, 'minutes').hours();
      const minutes = moment.duration(startTime, 'minutes').minutes();
      form.setFieldValue('startTime', `${addZero(hours)}:${addZero(minutes)}`);
    })
  }, [])

  useEffect(() => {
    if (expert.expertId) {
      initSchedule(value);
    }
  }, [expert])

  const addSchedule = (values) => {
    postSaveInquirySchedule(values  ||  {});
  }

  const onAddHandler = async () => {
    const result = await form.submit();
    const { values } = result;
    addSchedule(values);
  }

  const deleteSchedule = async (schedule) => {
    postDeleteInquirySchedule(schedule);
  }

  const initDataSource = () => {
    setElements({
      serviceMode: {
        props: {
          dataSource: serviceWaysList
        }
      },
      locationCode: {
        props: {
          dataSource: bizAreaList
        }
      },
      serviceLocation: {
        props: {
          dataSource: areaList
        }
      },
      serviceDate: {
        props: {
          disabledDate: current => {
            const today = moment().startOf('day');
            return moment(current).isBefore(today);
          },
        },
      }
    })
  }

  const onDeleteHandler = (schedule) => {
    Modal.confirm({
      title: `确认删除${schedule.startTime}-${schedule.endTime}时间段的排期吗`,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        deleteSchedule(schedule);
      },
    });
  }

  return (
    <Modal 
      title={`${expert?.expertName  ||  ''}的排期详情`}
      className={classnames('expert-scheduling-manage-modal', className)}
      width={1200}
      destroyOnClose
      {...rest}
    >
      <div className='add-form'>
        <DynamicForm 
          actions={form}
          schema={schema}
          components={{
            AllChooseSelect
          }}
          formItemDisplay="vertical"
          showColon={false}
          onMounted={initDataSource}
        />
        <Button onClick={onAddHandler} type="primary">新增</Button>
      </div>
      <div className='content'>
        <div className='calendar-wrapper' id="calendar-wrapper">
          <DatePicker
            style={{
              visibility: 'hidden',
              width: 0
            }}
            getCalendarContainer={() => document.getElementById('calendar-wrapper')}
            value={value}
            open={open}
            onChange={(nextVal) => {
              const isPre = moment(new Date()).isAfter(nextVal.endOf('day'));
              if (isPre) {
                return;
              }
              onChangeHandler(nextVal);
            }}
            dateRender={(current) => {
              const date = current.format('YYYY-MM-DD');
              const today = moment(new Date()).format('YYYY-MM-DD');
              const isPre = moment(new Date()).isAfter(current.endOf('day'));
              return <div 
                className={classnames({
                  predays: isPre,
                  scheduling: scheduleStatusList?.find(schedule => schedule.serviceDate === date)?.scheduleStatus === inquiryStatusMap.BEEN_INQUIRY,
                  selected: value?.format('YYYY-MM-DD') === date,
                  today: moment(today).isSame(moment(current.format('YYYY-MM-DD'))),
                  day: true
                })}
              >
                {current.format('DD')}
              </div>;
            }}
          />
          <div className='tips'>
            <div className='tip'>
              <div className='circle today' />
              今天
            </div>
            <div className='tip'>
              <div className='circle selected' />
              选中
            </div>
            <div className='tip'>
              <div className='circle inquired' />
              已排期
            </div>
          </div>
        </div>
        <div className='scheduling-list-wrapper'>
            <div className='title'>已排期：</div>
            <div className='schedule-list'>
              {scheduleList?.length ? scheduleList?.map(schedule => {
                return  <Popover placement="top" content={renderScheduleDesc(schedule)} key={schedule.id}>
                  <div className='schedule-item'>
                      <Input disabled value={renderScheduleDesc(schedule)} style={{ width: '80%' }}/>
                    {inquiryStatusMap.BEEN_INQUIRY === schedule.inquiryStatus ? <span className='text'>已预约</span> : <Button.Text onClick={() => onDeleteHandler(schedule)}>删除</Button.Text>}
                  </div>
                </Popover>
              }):<Empty description="暂无排期" />}
            </div>
        </div>
      </div>
    </Modal>
  )
}
