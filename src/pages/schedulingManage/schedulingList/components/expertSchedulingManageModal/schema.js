export default {
  elements: {
    addContainer: {
      type: 'Card',
      props: {
        title: '维护排期',
        deletable: false,
        style: {
          backgroundColor: '#fff',
          paddingTop:  0,
        },
        contentStyle: {
          display: 'grid',
          gridTemplateColumns: '14% 14% 14% 20% 14% 10% 14%',
        },
      },
    },
    locationCode: {
      type: 'Select',
      props: {
        placeholder: '请选择',
        allowClear: true,
      },
      formProps: {
        name: 'locationCode',
        title: '所属大区',
        rules: [{
          required: true,
          message: '请选择所属大区',
        }],
      },
    },
    serviceMode: {
      type: 'Select',
      props: {
        placeholder: '请选择',
        allowClear: true,
      },
      formProps: {
        name: 'serviceMode',
        title: '问诊方式',
        rules: [{
          required: true,
          message: '请选择问诊方式',
        }],
      },
    },
    serviceLocation: {
      type: 'AllChooseSelect',
      props: {
        placeholder: '请选择',
        allowClear: true,
        placeholder: '请选择',
        allowClear: true,
        showSearch: true,
        optionFilterProp: "children",
        mode: 'multiple',
        maxTagCount: 1,
      },
      formProps: {
        name: 'serviceLocation',
        title: '服务地区',
        rules: [{
          required: true,
          message: '请选择服务地区',
        }],
      },
    },
    offlineAddress: {
      type: 'TextArea',
      props: {
        placeholder: '请输入',
        maxLength: 100,
        showTextCount: true,
      },
      formProps: {
        name: 'offlineAddress',
        title: '线下服务地址',
        rules: [{
          message: '请输入线下服务地址',
        }],
      },
    },
    serviceDate: {
      type: 'DatePicker',
      props: {
        placeholder: '请选择',
        format: 'YYYY-MM-DD'
      },
      formProps: {
        name: 'serviceDate',
        title: '排期日期',
        rules: [{
          required: true,
          message: '请选择排期日期',
        }],
      },
    },
    startTime: {
      type: 'TimePicker',
      props: {
        placeholder: '请选择',
        format: 'HH:mm'
      },
      formProps: {
        name: 'startTime',
        title: '开始时间',
        rules: [{
          required: true,
          message: '请选择开始时间',
        }],
      },
    },
    endTime: {
      type: 'TimePicker',
      props: {
        placeholder: '请选择',
        format: 'HH:mm'
      },
      formProps: {
        name: 'endTime',
        title: '结束时间',
        rules: [{
          required: true,
          message: '请选择结束时间',
        }],
      },
    },
  },
  layouts: {
    root: 'root',
    structure: {
      root: ['addContainer'],
      addContainer: ['locationCode', 'serviceMode', 'serviceLocation', 'offlineAddress', 'serviceDate', 'startTime', 'endTime'],
    },
  },
};
