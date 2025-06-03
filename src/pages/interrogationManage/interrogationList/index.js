import React, { useState, useRef, useEffect } from 'react'
import './index.scss'
import { uForm } from 'dora'
import { Pagination, message, Modal, Button, Row,  Col, Radio, Popover } from 'dpl-react'
import { get, post } from '@/request/request'
import AppTable from '@/components/common/table'
import Api from '@/request/api-olhelpmanage'
import { APP_ID } from '@/utils/index';
import ServiceRecord from './components/serviceRecord'
import InquiryModal from './components/inquiryModal'
import CreateClue from './components/createClue'
import PermissionApi from "@/request/api-consultright";
import { classifyTypeEnum } from '@/const/config'
import qs from 'querystring';
import TextArea from '@/components/common/textArea'
import { getInterrogationListInquiryType } from "@/const/type";

const {
  SchemaMarkupForm: SchemaForm,
  SchemaMarkupField: Field,
  useFormTableQuery,
  Submit,
  FormButtonGroup,
  Reset,
  createFormActions,
} = uForm

const actions = createFormActions()
const defaultPageIndex = 1
const defaultPageSize = 10
const defaultPageInfo = {
  pageIndex: defaultPageIndex,
  pageSize: defaultPageSize,
  total: 0,
}

const questionDescMap = {
  1: '一',
  2: '二',
  3: '三'
}

// 专家问诊记录-取消按钮	ExpertInquiryRecordCancel
// 专家问诊记录-完成按钮	ExpertInquiryRecordComplete
// 专家问诊记录-服务记录按钮	ExpertInquiryRecordUpdateRecordContent
// 专家问诊记录-生成线索按钮	ExpertInquiryRecordSaveClueRecord

const PermissionCodeMap = {
  cancel: 'ExpertInquiryRecordCancel',
  finished: 'ExpertInquiryRecordComplete',
  serviceRecord: 'ExpertInquiryRecordUpdateRecordContent',
  createClue: 'ExpertInquiryRecordSaveClueRecord'
}


function InterrogationState(props) {
  const { backgroundColor, text } = props;
  return <div className="interrogation-status">
    <span
      className="color"
      style={{ backgroundColor }}
    >
    </span>
    <span className="text">{text}</span>
  </div>
}
//预约类型选项
const reservationTypeMap = {
  self: {
    label: '自主预约',
    value: 'Y',
  },
  other: {
    label: '代预约',
    value: 'N',
  },
}
const ReservationOptions = [
  reservationTypeMap.self,
  reservationTypeMap.other,
]
// 线索状态
const clueStateMap = {
  pending: {
    label: '待生成线索',
    value: '0',
  },
  finished: {
    label: '已生成线索',
    value: '1',
  },
}
// 问诊状态
const interrogationStateMap = {
  all: {
    label: '全部',
    value: '_all'
  },
  pending: {
    label: '待问诊',
    value: '0',
  },
  finished: {
    label: '已问诊',
    value: '1',
  },
  fulfilled: {
    label: '已取消',
    value: '2',
  }
}
const InterrogationOptions = [
  interrogationStateMap.all,
  interrogationStateMap.pending,
  interrogationStateMap.finished,
  interrogationStateMap.fulfilled,
]
const interrogationStateRenderMap = {
  [interrogationStateMap.pending.value]: () => {
    return <InterrogationState backgroundColor="#666666" text="待问诊" />
  },
  [interrogationStateMap.finished.value]: () => {
    return <InterrogationState backgroundColor="#00CC66" text="已问诊" />
  },
  [interrogationStateMap.fulfilled.value]: () => {
    return <InterrogationState backgroundColor="#E52441" text="已取消" />
  },
}


// 枚举列表
const groupNameList = [classifyTypeEnum.inquiryArea,classifyTypeEnum.inquiryPost];
// TODO 
const defaultModalInfo = {
  visible: false,
  title: '',
  data: null,
  component: null
}

const reasonCode = 'inquiry_cancel_option';
const otherCode = 999;
export default function InterrogationList(props) {

  const isResetForm = useRef(false) // 是否重置
  const isJsQueryRef = useRef(false) // 是否js调用查询的
  const pageInfoRef = useRef(defaultPageInfo)
  const firstRef = useRef(false) // 第一次的ref
  const [formData, setFormData] = useState({})
  const [reservationOptionList, setReservationOptionList] = useState(ReservationOptions); // 预约选项列表
  const [interrogationOptionList, setInterrogationOptionList] = useState(InterrogationOptions); // 问诊状态列表
  const [serviceAreaList, setServiceAreaList] = useState([]);
  const [customerWorkList, setCustomerWorkList] = useState([]);
  const [modalInfo, setModalInfo] = useState(defaultModalInfo)
  const [inquiryVisible, setInquiryVisible] = useState(false)
  const [exporting, setExporting] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);
  const [actionPermission, setActionPermission] = useState({});
  const [cancelReasonVisible, setCancelReasonVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [cancelRecord, setCancelRecord] = useState({});
  const [cancelReasonList, setCancelReasonList] = useState([]);
  const [checkedReason, setCheckedReason] = useState();
  const [canceling, setCanceling] = useState(false);
  const [customReasonContent, setCustomReasonContent] = useState();
  const [state] = useState({
    searchParams: {},
    questionDetail: []
  })

  /**
   * 获取枚举（入口类型、构建类型）
   */
   const getEnumOptions = async () => {
    const res = await get({
      url: Api.getEnumOptions,
      params: {
        groupNames: reasonCode,
      },
    });
    if (res.success) {
      const data = res.data || [];
      const list = data?.find(item => item.groupName === reasonCode)?.options || [];
      setCancelReasonList(list);
    } else {
      message.error(res.message);
    }
  };

  /**
   * 获取枚举
   */
  const getAreaList = async () => {
    try {
      const map = {
        [classifyTypeEnum.inquiryArea]: (list, map) => {
          setServiceAreaList(list);
        },
        [classifyTypeEnum.inquiryPost]: (list, map) => {
          setCustomerWorkList(list);
        },
      };
      const res = await get({
        url: Api.getClassifyList,
        params: {
          type: groupNameList.join(","),
        },
      });
      if (res.success) {
        const data = res.data;
        Array.isArray(data) &&
          data.forEach((item) => {
            const func = map[item.type];
            if (func) {
              let obj = {};
              let optionsList = [];
              item.list &&
                item.list.forEach((item) => {
                  obj[item.code] = item.name;
                  optionsList.push({
                    label: item.name,
                    value: item.code,
                  });
                });
              func(optionsList, obj);
            }
          });
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e)
    }
  }

  const postExpertInquiryRecordComplete = async (id, forceOperationFlag = false) => { 
    return post({
      url: Api.postExpertInquiryRecordComplete,
      data: { 
        id,
        operate: '1',
        forceOperationFlag
      }
    })
  }
  /**
   * 完成问诊
   * @param {*} id 
   */
  const finishInterrogation = (id) => {
    Modal.confirm({
      title: "完成问诊提示",
      content: "确认完成该问诊吗",
      onOk: async () => {
        const res = await postExpertInquiryRecordComplete(id);
        if (res.success) {
          if (res.data) {
            message.success('完成问诊成功');
            trigger();
          } else { 
            // 强制成功
            Modal.confirm({
              title: "完成问诊提示",
              content: "权益扣减失败，当前没有权益，是否将问诊状态改为 “已问诊”",
              onOk: async () => {
                const res = await postExpertInquiryRecordComplete(id, true);
                if (res.success && res.data) {
                  message.success('完成问诊成功');
                  trigger();
                } else {
                  message.error(res.message);
                }
              },
            });
          }
        } else {
          message.error(res.message);
        }
      },
    });
  };

  /**
   * 取消问诊
   * @param {*} id 
   */
  const cancelInterrogation = (data) => {
    // 20221027迭代修改为 弹框填取消原因
    setCancelVisible(true);
    setCancelRecord(data);
    setCheckedReason(data.cancelOption || '');
    setCustomReasonContent(data.customReason || '');
  }

  const showCancelModal = (data) => {
    setCancelReasonVisible(true);
    setCancelRecord(data);
  }

  const inquiryClick = () => {
    setInquiryVisible(true)
  }

  /**
   * 操作map
   * permissionCode 存在值表示受权限控制
   */
  const optionsMap = {
    finished: {
      permissionCode: PermissionCodeMap.finished,
      name: '完成问诊',
      click(data) {
        console.log(data.id)
        if (data.id || data.id === 0) {
          finishInterrogation(data.id)
        }
      }
    },
    cancel: {
      permissionCode: PermissionCodeMap.cancel,
      name: '取消',
      click(data) {
        if (data.id || data.id === 0) {
          cancelInterrogation(data)
        }
      }
    },
    cancelReason: {
      // permissionCode: PermissionCodeMap.cancel,
      name: '取消原因',
      click(data) {
        if (data.id || data.id === 0) {
          // 如果存在取消原因，点击展示取消原因
          if (data.cancelOption) {
            showCancelModal(data);
          } else {
            // 不存在取消原因，点击弹出取消原因补充
            cancelInterrogation(data)
          }
        }
      }
    },
    serviceRecord: {
      permissionCode: PermissionCodeMap.serviceRecord,
      name: '服务记录',
      click(data) {
        const newModalInfo = {
          visible: true,
          title: '服务记录',
          data: data,
          component: ServiceRecord
        }
        setModalInfo(newModalInfo)
      }
    },
    createClue: {
      permissionCode: PermissionCodeMap.createClue,
      name: '生成线索',
      click(data) {
        const newModalInfo = {
          visible: true,
          title: '生成线索',
          data: data,
          component: CreateClue
        }
        setModalInfo(newModalInfo)
      }
    },
    hasClue: {
      name: '已生成线索',
      className: 'disabled',
      click() {

      }
    },
  }

  const handleQuestionDetail = (record) => {
    const  questionList = [
      record.questionFirst,
      record.questionSecond,
      record.questionThree
    ];
    setQuestionVisible(true);
    state.questionDetail = questionList;
  }


  const columns = [
    {
      title: '问诊日期',
      dataIndex: 'serviceDate',
      ellipsis: true,
      align: 'center',
      className: 'remark-rows',
      width: 56,
      // minWidth: 56,
      fixed: 'left',
    },
    {
      title: '问诊时段',
      dataIndex: 'inquiryTime',
      ellipsis: true,
      align: 'center',
      className: 'remark-rows',
      width: 56,
      // minWidth: 56,
      fixed: 'left',
    },
    {
      title: '专家',
      dataIndex: 'expertName',
      ellipsis: true,
      align: 'center',
      width: 56,
      // minWidth: 56,
      className: 'remark-rows',
      fixed: 'left',
    },
    {
      title: '企业名称',
      dataIndex: 'customerName',
      ellipsis: true,
      align: 'center',
      width: 100,
      // minWidth: 100,
      className: 'remark-rows',
      fixed: 'left',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      ellipsis: true,
      align: 'center',
      className: 'remark-rows',
      width: 56,
      // minWidth: 56,
      fixed: 'left',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
      ellipsis: true,
      align: 'center',
      className: 'remark-rows',
      width: 104,
      // minWidth: 104,
      fixed: 'left',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 140,
      // minWidth: 140,
      // className: 'remark-rows',
      fixed: 'left',
      render(text, record, index) {
        let list = []
        // 如果状态是待问诊，则操作只有完成问诊，否则加入服务记录
        if (record.status === interrogationStateMap.pending.value) {
          list.push(optionsMap.finished)
          list.push(optionsMap.cancel)
        } else if (record.status !== interrogationStateMap.fulfilled.value) {
          list.push(optionsMap.serviceRecord)
          // 判断是否留有线索,流过了则展示已生成线索，否则展示生成线索
          if (record.clueStatus === clueStateMap.pending.value) {
            list.push(optionsMap.createClue)
          } else {
            list.push(optionsMap.hasClue)
          }
        } else if (record.status === interrogationStateMap.fulfilled.value) {
          list.push(optionsMap.cancelReason)
        }
        const actions = list.filter(action => !action.permissionCode || actionPermission[action.permissionCode]);
        return actions.length > 0 && <div className='table-option-box'>
          {
            actions.map((item, index) => {
              const contentElement = <span>
                <span key={item.name} className={`option-item ${item.className || ''}`} onClick={() => { item.click && item.click(record) }}>
                  {item.name}{record.status === interrogationStateMap.fulfilled.value && !record.cancelOption ? <span style={{ color: 'red' }}>!</span>:''}
                </span>
                {
                  index !== actions.length - 1 && <div className='line'></div>
                }
              </span>;
              // if (record.status === interrogationStateMap.fulfilled.value && record.cancelOption) {
              //   return <Popover placement="top" content={record.cancelReason}>
              //     {contentElement}
              //   </Popover>
              // }
              return contentElement;
            })
          }
        </div>
      }
    },
    {
      title: '问诊类型',
      dataIndex: 'inquiryType',
      ellipsis: true,
      minWidth: 44,
      align: 'center',
      render(h) {
        return <div>{h ? getInterrogationListInquiryType(h) : ''}</div>
      },
    },
    {
      title: '预约方式',
      dataIndex: 'independentAppointment',
      ellipsis: true,
      align: 'center',
      // width: 52,
      minWidth: 52,
    },
    {
      title: '问诊问题',
      dataIndex: 'question',
      ellipsis: true,
      // width: 44,
      minWidth: 44,
      render(_, record, index) {
        return <Button.Text onClick={() => handleQuestionDetail(record)}>详情</Button.Text>
      }
    },
    {
      title: '问诊方式',
      dataIndex: 'serviceMode',
      ellipsis: true,
      align: 'center',
      // width: 44,
      minWidth: 44,
    },
    {
      title: '服务地区',
      dataIndex: 'serviceLocation',
      ellipsis: true,
      align: 'center',
      // width: 44,
      minWidth: 44,
    },
    {
      title: '用户所属地区',
      dataIndex: 'customerArea',
      ellipsis: true,
      align: 'center',
      // width: 56,
      minWidth: 56
    },
    {
      title: '网点',
      dataIndex: 'customerSite',
      ellipsis: true,
      align: 'center',
      className: 'remark-rows',
      // width: 56,
      minWidth: 80,
    },
    {
      title: '专属客户经理',
      dataIndex: 'customerManager',
      ellipsis: true,
      align: 'center',
      className: 'remark-rows',
      // width: 56,
      minWidth: 60
    },
    {
      title: '用户岗责',
      dataIndex: 'customerWork',
      ellipsis: true,
      align: 'center',
      className: 'remark-rows',
      // width: 68,
      minWidth: 68,
    },
    {
      title: '问诊状态',
      dataIndex: 'status',
      align: 'center',
      // width: 62,
      minWidth: 62,
      render(text, record, index) {
        if (text || text === 0) {
          const render = interrogationStateRenderMap[text];
          if (render) {
            return render()
          }
        }
        return null
      }
    },
    {
      title: '记录创建时间',
      dataIndex: 'createTime',
      ellipsis: true,
      align: 'center',
      className: 'remark-rows',
      // width: 96,
      minWidth: 96
    },
    {
      title: '预约ID',
      dataIndex: 'id',
      ellipsis: true,
      align: 'center',
      // width: 56,
      minWidth: 56
    },
    // {
    //   title: '问诊身份',
    //   dataIndex: 'customerType',
    //   ellipsis: true,
    //   align: 'center',
    //   width: 80,
    // },
  ]

  /**
   * 服务
   * @param {*} param0
   * @returns
   */
  const service = async ({
    values,
    pagination,
    sorter = {},
    filters = {},
  }) => {
    // TODO 参数调整
    const sendParams = {
      id: values.id,
      expertName: values.expertName && values.expertName.trim(), // 专家名称
      startCreateDate: values?.createTime?.[0],
      endCreateDate: values?.createTime?.[1],
      startInquiryDate: values?.serviceDate?.[0],
      endInquiryDate: values?.serviceDate?.[1],
      customerName:
        values.customerName && values.customerName.trim(), // 身份名称
      location: values.location, // 服务地区
      inquiryType: values.inquiryType,
      status: values.status === interrogationStateMap.all.value ? undefined : values.status, // 问诊状态
      pageIndex: pagination.current || defaultPageIndex,
      pageSize: pagination.pageSize || defaultPageSize,

    }
    if (isJsQueryRef.current) {
      sendParams.pageIndex = pageInfoRef.current.pageIndex
      sendParams.pageSize = pageInfoRef.current.pageSize
    }
    let res = {}
    state.searchParams = sendParams;
    if (!firstRef.current) {
      res = await get({
        url: Api.getExpertInquiryRecordList,
        params: sendParams
      })
      if (res.success) {
        const data = res.data
        pageInfoRef.current = {
          pageIndex: data.pageIndex,
          pageSize: data.pageSize,
          total: data.total,
        }
      } else {
        message.error(res.message)
      }
    }
    return {
      dataSource: (res.data && res.data.list) || [],
      pageSize: (res.data && res.data.pageSize) || pagination.pageSize,
      total: (res.data && res.data.total) || pagination.total,
      current: (res.data && res.data.pageIndex) || pagination.current,
    }
  }

  /**
   * 中间件
   * @returns
   */
  const middleware =
    () =>
      ({ context }) => ({
        onFormResetQuery(payload, next) {
          isResetForm.current = true
          context.setPagination({
            ...context.pagination,
            current: 1,
          })
          context.setSorter({})
          context.setFilters({})
          return next({})
        },
        onPageQuery(payload, next) {
          isJsQueryRef.current = false
          context.setPagination({
            ...context.pagination,
          })
          context.setSorter({})
          context.setFilters({})
          return next(isResetForm.current ? {} : payload)
        },
      })

  const { form, table, trigger } = useFormTableQuery(
    service,
    {
      pagination: {
        pageSize: defaultPageSize,
        current: defaultPageIndex,
      },
    },
    [middleware()]
  )

  /**
   * 关闭弹窗
   */
  const closeModal = () => {
    setModalInfo(defaultModalInfo)
  }

  /**
   * 分页
   * @param {*} pageIndex
   * @param {*} pageSize
   */
  const onPageChange = (pageIndex, pageSize) => {
    const pagination = {
      ...table.pagination,
      current: pageIndex,
      pageSize,
    }
    console.log(pageIndex, pagination)
    table.onChange(pagination, null, null)
  }

  /**
   * 获取当前登陆用户
   */
   const getCurrentUserInfo = async () => {
    try {
        const res = await get({
            url: Api.getCurrentUserInfo,
            params: {},
        });
        if (res.success) {
            const data = res.data;
            return data;
        } else {
            // message.error(res.message);
        }
    } catch (e) {
        console.error(e);
        return {}
    }
    return {};
  };

  /**
   * 获取操作权限
   */
  const getFunctionalAuthorityList = async () => {
    const userData = await getCurrentUserInfo();
    const res = await get({
      url: PermissionApi.getFunctionalAuthorityList,
      params: {
        appId: APP_ID,
        trueId: userData.id,
      },
    });
    console.log(res, 'res');
    if (res.success) {
      setActionPermission(res.data?.reduce((pre, item) => ({ ...pre, [item.permissionCode]: true }), {}));
    }
  }

  const init = () => {
    getAreaList()
    getFunctionalAuthorityList()
    getEnumOptions()
  }
  /**
     * 导出
     */
   const onExportClick = async () => {
      setExporting(true);
      const origin = window.location.origin
      const params = { ...state.searchParams };
      delete params.pageIndex;
      delete params.pageSize;
      const url =
          `${origin}${Api.getExpertInquiryRecordExport}?${
            qs.stringify(params)
          }`
      window.open(url);
      setExporting(false);
  };

  const inquirySubmitSuccess = () => {
    actions.submit();
  }
  useEffect(() => {
    init()
    const resize = () => {

    }
  }, [])

  const tableWrap = document.querySelector('.interrogation-list .app-table-box');
  const scrollX = tableWrap?.clientWidth;

  const updateCancel = (msg, updateFlag = false) => {
    const api = updateFlag ? Api.postExpertInquiryRecordUpdateCancelReason : Api.postExpertInquiryRecordComplete;
    setCanceling(true);
    post({ 
      url: api,
      data: { 
        id: cancelRecord.id, 
        operate: updateFlag ? undefined : '0',
        cancelOption: checkedReason,
        customReason: (checkedReason == otherCode ? customReasonContent : cancelReasonList?.find(reason => reason.id === checkedReason)?.name)?.trim()
      } 
    }).then((data) => {
      if (data.success) {
        message.success(msg);
        setCancelVisible(false);
        setCanceling(false);
        trigger()
      } else {
        message.error(data.message);
        setCanceling(false);
      }
    }).catch(() => {
      setCanceling(false);
    });
  }

  const onCancelUpdateHandler = () => {
    // 如果未选择原因，或者选择了其他原因但未填写自定义说明，则提示必填
    if (!checkedReason) {
      message.error('请选择取消原因')
      return;
    } else {
      if (checkedReason == otherCode && !customReasonContent?.trim()) {
        message.error('请填写原因详情')
        return;
      }
    }
    // 如果本条数据状态为已取消，说明是补充原因行为，不需要二次确认
    if (cancelRecord.status === interrogationStateMap.fulfilled.value) {
      updateCancel("取消原因更新成功", true);
    } else {
      Modal.confirm({
        title: "取消提示",
        content: "取消问诊后无法撤销，是否确认取消该问诊",
        onOk() {
          updateCancel("取消问诊成功");
        },
      });
    }
  }

  // console.log(tableWrap, scrollX, 'scrollX');

  return (
    <div className="app-bg-box interrogation-list">
      <div className="form-box">
        <SchemaForm initialValues={{
          status: interrogationStateMap.all.value
        }} {...form} actions={actions} inline className="form-wrap">
          <Field
            type="string"
            title="专家名称"
            name="expertName"
            x-component="Input"
            x-component-props={{
              allowClear: true,
              placeholder: '请输入专家名称',
            }}
          />
          <Field
            title="问诊日期"
            name="serviceDate"
            x-component='RangePicker'
            x-component-props={{"placeholder": ["请选择", "请选择"], "allowClear": true}}
          />
          <Field
            title="创建日期"
            name="createTime"
            x-component='RangePicker'
            x-component-props={{"placeholder": ["请选择", "请选择"], "allowClear": true}}
          />
          <Field
            type="string"
            title="预约ID"
            name="id"
            x-component="Input"
            x-component-props={{
              allowClear: true,
              placeholder: '请输入预约ID',
            }}
          />
          <Field
            type="string"
            title="问诊类型"
            name="inquiryType"
            x-component="Select"
            x-component-props={{
              allowClear: true,
              placeholder: '请输入问诊类型',
              dataSource: getInterrogationListInquiryType(),
            }}
          />
          <Field
            type="string"
            title="服务地区"
            name="location"
            x-component="Select"
            x-component-props={{
              allowClear: true,
              placeholder: '请选择服务地区',
              dataSource: serviceAreaList,
              showSearch: true,
              optionFilterProp: 'children'
            }}
          />
          <Field
            type="string"
            title="企业名称"
            name="customerName"
            x-component="Input"
            x-component-props={{
              allowClear: true,
              placeholder: '请输入企业名称',
            }}
          />
          <Field
            type="string"
            title="问诊状态"
            name="status"
            x-component="Select"
            x-component-props={{
              // allowClear: true,
              placeholder: '请选择问诊状态',
              dataSource: interrogationOptionList,
            }}
          />
          <FormButtonGroup>
            <Submit style={{ marginRight: 10 }} />
            <Reset />
            <Button style={{marginLeft: 10}} type='primary' onClick={inquiryClick}>代预约</Button>
            <Button style={{marginLeft: 10}} loading={exporting} type='primary' onClick={onExportClick}>导出</Button>
          </FormButtonGroup>
        </SchemaForm>
      </div>
      <div className="table-box">
        <AppTable
          className="app-table-box"
          {...table}
          columns={columns}
          rowKey="id"
          pagination={false}
          bordered
          scroll={{ x: scrollX ? scrollX - 44 : 1088 }}
        />
        <div className="pagination-box">
          <Pagination
            showTotalInfo
            current={Number(table.pagination.current)}
            pageSize={Number(table.pagination.pageSize)}
            total={Number(table.pagination.total)}
            showQuickJumper
            showSizeChanger
            onShowSizeChange={onPageChange}
            onChange={onPageChange}
          />
        </div>
      </div>
      <Modal
        visible={modalInfo.visible}
        title={modalInfo.title}
        onCancel={closeModal}
        className="interrogation-modal"
        footer={null}
        width={520}>
        {
          modalInfo.component && <modalInfo.component data={modalInfo.data} onCancel={closeModal} callback={trigger} />
        }
      </Modal>
      <Modal
        visible={questionVisible}
        title='问题详情'
        onCancel={() => setQuestionVisible(false)}
        onOk={() => setQuestionVisible(false)}
        className='interrogation-question-list'
        width={520}>
        {
          state.questionDetail.map((question,  idx) => {
            return <>
              <Row>
                {/* <Col>问题{questionDescMap[idx + 1]}: </Col> */}
                <Col>{question}</Col>
              </Row>
            </>
          })
        }
      </Modal>
      <Modal
        visible={cancelReasonVisible}
        title='取消原因'
        onCancel={() => setCancelReasonVisible(false)}
        footer={null}
        className='cancel-reason'
        width={520}
      >
        <Row style={{ minHeight: 100 }}>
          <Col span={4}><span style={{ color: 'red', textAlign: 'right' }}>*</span>取消原因：</Col>
          <Col span={20}>{cancelRecord.cancelReason}</Col>
        </Row>
      </Modal>
      <Modal
        visible={cancelVisible}
        title='取消原因'
        onCancel={() => setCancelVisible(false)}
        onOk={onCancelUpdateHandler}
        className='cancel-reason'
        confirmLoading={canceling}
        width={640}>
        <Row>
          <Col span={4}><span style={{ color: 'red', textAlign: 'right' }}>*</span>取消原因：</Col>
          <Col span={20}>
          {
            cancelReasonList.map((item,  idx) => {
              return <div 
                key={item.id} 
                className="reason-item" 
                onClick={() => {
                  setCheckedReason(item.id)
                  // if (item.id !== otherCode) {
                  //   setCustomReasonContent('');
                  // }
                }}
              >
                <div className='reason-item-option'><Radio checked={checkedReason === item.id}/>{item.name}</div>
                {item.id == otherCode ? <>：<TextArea 
                  maxLength={200}
                  value={customReasonContent}
                  onChange={(e) => setCustomReasonContent(e.target.value)}
                  placeholder="请填写原因详情"
                /> </>: null}
              </div>
            })
          }
          </Col>
        </Row>
      </Modal>
      {inquiryVisible && 
        <InquiryModal 
          visible={inquiryVisible}
          locationList={serviceAreaList || []}
          customerWorkList={customerWorkList} 
          onCancel={() => setInquiryVisible(false)}
          onSuccess={inquirySubmitSuccess}
        />
      }
    </div>
  )
}
