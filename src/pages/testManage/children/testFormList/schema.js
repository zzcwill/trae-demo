import moment from 'moment';
import { message } from 'dpl-react'

export default {
  elements: {
    name: {
      type: 'Input',
      props: {
        placeholder: '请输入活动名称',
        allowClear: true,
        maxLength: '20'
      },
      formProps: {
        name: 'name',
        title: '活动名称',
        rules: [{
          required: true,
          message: '请输入活动名称',
        }],
      },
    },
    isGroup: {
      type: 'RadioGroup',
      props: {
        dataSource: [{
          value: 'Y',
          label: '是',
        }, {
          value: 'N',
          label: '否（通用所有人可查看）',
        }],
      },
      formProps: {
        name: 'isGroup',
        title: '是否使用观星阁分群',
        rules: [{
          required: true,
          message: '请选择是否使用观星阁分群',
        }],
      },
    },
    groupCode: {
      type: 'Select',
      hidden: true,
      props: {
        placeholder: '请选择分群',
        allowClear: true,
        mode: 'multiple',
        showSearch: true,
        optionFilterProp: "children",
      },
      formProps: {
        name: 'groupCode',
        title: '分群',
        rules: [{
          required: true,
          message: '请选择分群',
        }],
      },
    },
    weight: {
      type: 'InputNumber',
      props: {
        placeholder: '请输入权重',
        min: 1,
        max: 999,
        precision: 0,
        inputWidth: 100,
      },
      formProps: {
        name: 'weight',
        title: '展示权重',
        rules: [{
          required: true,
          message: '请输入权重',
        }],
      },
    },
    effectDate: {
      type: 'RangePicker',
      props: {
        allowClear: true,
        format: "YYYY-MM-DD HH:mm",
        showTime: { 
          format: 'HH:mm',
        },
      },
      formProps: {
        name: 'effectDate',
        title: '生效时间',
        rules: [{
          required: true,
          message: '请选择生效时间',
        }],
      },
    },
  },
  layouts: {
    root: 'root',
    structure: {
      root: ['name', 'isGroup','groupCode','weight', 'effectDate'],
    },
  },
};
