import moment from 'moment';
import { message } from 'dpl-react'

export default {
  elements: {
    consultService: {
      type: 'CustomInputNumber',
      props: {
        placeholder: '请输入咨询产品类型ID',
        allowClear: true,
        min: 1,
        maxLength: '4'
      },
      formProps: {
        name: 'consultService',
        title: '咨询产品类型ID',
        rules: [{
          required: true,
          message: '请输入咨询产品类型ID',
        }],
      },
    },
    consultServiceName: {
      type: 'Input',
      props: {
        placeholder: '请输入咨询产品类型名称',
        allowClear: true,
        maxLength: '20'
      },
      formProps: {
        name: 'consultServiceName',
        title: '咨询产品类型名称',
        rules: [{
          required: true,
          message: '请输入咨询产品类型名称',
        }],
      },
    },
    category: {
      type: 'Select',
      props: {
        placeholder: '请选择咨询产品大类',
        allowClear: true,
        showSearch: true,
        optionFilterProp: "children",
      },
      formProps: {
        name: 'category',
        title: '咨询产品大类',
        rules: [{
          required: true,
          message: '请选择咨询产品大类',
        }],
      },
    },
    checkRightsFlag: {
      type: 'RadioGroup',
      props: {
        dataSource: [{
          value: '1',
          label: '判断授权',
        }, {
          value: '2',
          label: '不判断授权',
        }],
      },
      formProps: {
        name: 'checkRightsFlag',
        title: '是否判断授权',
        rules: [{
          required: true,
          message: '请选择是否判断授权',
        }],
      },
    },
    priorityType: {
      type: 'RadioGroup',
      props: {
        dataSource: [{
          value: '1',
          label: '优先判断限次授权',
        }, {
          value: '2',
          label: '优先判断不限次授权',
        }],
      },
      formProps: {
        name: 'priorityType',
        title: '授权判断优先级',
      },
    },
    cardTypes: {
      type: 'CheckboxGroup',
      props: {
        dataSource: [{
          value: '1',
          label: '专家机构卡片',
        }, {
          value: '2',
          label: '官方服务卡片',
        }],
      },
      formProps: {
        name: 'cardTypes',
        title: '适用卡片',
      },
    },
    remarks: {
      type: 'TextArea',
      props: {
        placeholder: '请输入备注',
        maxLength: 1000
      },
      formProps: {
        name: 'remarks',
        title: '备注'
      },
    },
  },
  layouts: {
    root: 'root',
    structure: {
      root: ['consultService', 'consultServiceName', 'category', 'checkRightsFlag', 'priorityType', 'cardTypes', 'remarks'],
    },
  },
};
