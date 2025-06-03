export default {
  elements: {
    packageName: {
      type: 'Input',
      props: {
        placeholder: '请输入产品包名称',
        allowClear: true,
        maxLength: 20
      },
      formProps: {
        name: 'packageName',
        title: '产品包名称',
        rules: [{
          required: true,
          message: '请输入产品包名称',
        }],
      },
    },
    productId: {
      type: 'CustomInputNumber',
      props: {
        placeholder: '请输入产品包ID',
        min: 1,
        maxLength: 10,
      },
      formProps: {
        name: 'productId',
        title: '产品包ID',
        rules: [{
          required: true,
          message: '请输入产品包ID',
        }],
      },
    },
    consultService: {
      type: 'Select',
      props: {
        placeholder: '请选择适用服务',
        allowClear: true,
      },
      formProps: {
        name: 'consultService',
        title: '适用服务',
        rules: [{
          required: true,
          message: '请选择适用服务',
        }],
      },
    },
    amount: {
      type: 'CustomInputNumber',
      props: {
        placeholder: '请输入次数',
        min: 1,
        maxLength: 6,
      },
      formProps: {
        name: 'amount',
        title: '次数',
        rules: [{
          required: true,
          message: '请输入次数',
        }],
      },
    },
    type: {
      type: 'Select',
      props: {
        placeholder: '请选择类型',
        allowClear: true,
      },
      formProps: {
        name: 'type',
        title: '类型',
        rules: [{
          required: true,
          message: '请选择类型',
        }],
      },
    },
    shelfRegionList: {
      type: 'Select',
      props: {
        placeholder: '请选择上架位置',
        allowClear: true,
        mode: 'multiple',
      },
      formProps: {
        name: 'shelfRegionList',
        title: '上架位置',
      },
    },
    areaCodeList: {
      type: 'Select',
      props: {
        placeholder: '请选择适用地区',
        allowClear: true,
        mode: 'multiple',
      },
      formProps: {
        name: 'areaCodeList',
        title: '适用地区',
      },
    },
    note: {
      type: 'TextArea',
      props: {
        placeholder: '请输入备注',
        maxLength: 500
      },
      formProps: {
        name: 'note',
        title: '备注'
      },
    },
  },
  layouts: {
    root: 'root',
    structure: {
      root: ['packageName', 'productId', 'consultService', 'amount', 'type', 'shelfRegionList', 'areaCodeList', 'note'],
    },
  },
};
