export default {
  elements: {
    controlType: {
      type: 'RadioGroup',
      props: {
        dataSource: [{
          label: 'saas构件',
          value: 1
        }, {
          label: '标签',
          value: 2
        }],
      },
      formProps: {
        name: 'controlType',
        title: '控件类型',
        required: true,
        itemExtra: {
          before: {
            text: '使用'
          },
          after: {
            text: '控制授权'
          }
        },
        rules: [{
          required: true,
          message: '请选择控件类型',
        }],
      },
    },
    saasCode: {
      type: 'Input',
      props: {
        placeholder: '请输入构件saascode',
        allowClear: true,
        maxLength: '50'
      },
      formProps: {
        name: 'code',
        title: 'saascode',
        rules: [{
          required: true,
          message: '请输入构件saascode',
        }],
      },
    },
    saasId: {
      type: 'Input',
      props: {
        placeholder: '请输入构件ID',
        allowClear: true,
        maxLength: '50'
      },
      formProps: {
        name: 'componentId',
        title: '构件ID',
        rules: [{
          required: true,
          message: '请输入构件ID',
        }],
      },
    },
    saasName: {
      type: 'Input',
      props: {
        placeholder: '请输入构件名称',
        allowClear: true,
        maxLength: '20'
      },
      formProps: {
        name: 'name',
        title: '构件名称',
        rules: [{
          required: true,
          message: '请输入构件名称',
        }],
      },
    },
    productionType: {
      type: 'Select',
      props: {
        placeholder: '请选择咨询产品类型',
        allowClear: true,
        showSearch: true,
        optionFilterProp: 'children',
      },
      formProps: {
        name: 'consultService',
        title: '适用产品',
        rules: [{
          required: true,
          message: '请选择咨询产品类型',
        }],
      },
    },
    limitFlag: {
      type: 'Select',
      props: {
        placeholder: '请选择是否限次',
        allowClear: true,
        dataSource: [{
          label: '限次',
          value: 'Y'
        }, {
          label: '不限次',
          value: 'N'
        }]
      },
      formProps: {
        name: 'limitFlag',
        title: '是否限次',
        rules: [{
          required: true,
          message: '请选择是否限次',
        }],
      },
    },
    note: {
      type: 'TextArea',
      props: {
        placeholder: '请输入备注',
        maxLength: 500
      },
      formProps: {
        name: 'remark',
        title: '备注'
      },
    },
    label: {
      type: 'Select',
      props: {
        placeholder: '请选择标签',
        allowClear: true,
      },
      formProps: {
        name: 'codeLabel',
        title: '标签',
        rules: [{
          required: true,
          message: '请选择标签',
        }],
      },
    },
    productionTypeLabel: {
      type: 'Select',
      props: {
        placeholder: '请选择咨询产品类型',
        allowClear: true,
      },
      formProps: {
        name: 'consultServiceLabel',
        title: '适用产品',
        rules: [{
          required: true,
          message: '请选择咨询产品类型',
        }],
      },
    },
    text: {
      type: 'text',
      props: {
        text: '不限次'
      },
      formProps: {
        name: 'text',
        title: '标签为',
      },
    },
    consultWayEnCodeList: {
      type: 'CheckboxGroup',
      props: {
        // dataSource: [{
        //   label: '在线',
        //   value: 'online'
        // }, {
        //   label: '电话',
        //   value: 'incall'
        // }],
      },
      formProps: {
        name: 'consultWayEnCodeList',
        title: '咨询方式',
        required: true,
        rules: [{
          required: true,
          message: '请选择咨询方式',
        }],
      },
    },
    noteLabel: {
      type: 'TextArea',
      props: {
        placeholder: '请输入备注',
        maxLength: 500
      },
      formProps: {
        name: 'remarkLabel',
        title: '备注',
      },
    },
  },
  layouts: {
    root: 'root',
    structure: {
      root: ['controlType', 'saasCode', 'saasId', 'saasName', 'productionType', 'limitFlag', 'label', 'productionTypeLabel', 'text', 'consultWayEnCodeList', 'note','noteLabel'],
    },
  },
};
