import moment from 'moment';
import { message } from 'dpl-react'

const range = (start, end, type) => {
  if (start > end) {
    return [];
  }
  if ((type === 'hours' && start === 23) || (type === 'minutes' && start === 59)) {
    return [start];
  }
  const result = [];
  for (let i = 0; i < start; i++) {
    result.push(i);
  }
  return result;
};

  /**
   * 默认当前日期之前禁用
   * @param {Moment} current
   */
  function disabledDate(current) {
    return current && current < moment(moment().format('YYYY-MM-DD 00:00:00'));
  }

  /**
   * 默认当前时间之后
   */
  function disabledTime(originDate, type) {
    const date = originDate?.[type === 'start' ? 0 : 1]
    const now = moment();
    if (date && date.format('YYYY-MM-DD') > now.format('YYYY-MM-DD')) {
      return {
        disabledHours: () => range(25, 24, 'hours'),
        disabledMinutes: () => range(61, 60, 'minutes')
      };
    }
    if (date && date.hours() > now.hours()) {
      return {
        disabledHours: () => range(now.hours(), 24, 'hours'),
        disabledMinutes: () => range(0, 60, 'minutes')
      };
    }
    return {
      disabledHours: () => range(now.hours(), 24, 'hours'),
      disabledMinutes: () => range(now.minutes(), 60, 'minutes')
    };
  }

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
    displayType: {
      type: 'RadioGroup',
      props: {
        placeholder: '请选择',
        min: 1,
        maxLength: '10',
      },
      formProps: {
        name: 'displayType',
        title: '选择展示位',
        rules: [{
          required: true,
          message: '请选择展示位',
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
        disabledDate: disabledDate,
        disabledTime: disabledTime
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
    imageUrl: {
      type: 'UploadImage',
      props: {
        multiple: false,
        maxLength: '1',
        acceptTypes: ["png", "jpg", "jpeg"],
        mapKey: "imageUrl",
        introTip: '',
        maxSize:  2 * 1024 * 1024,
        onSizeCheckError: (err) => {
          message.error("仅支持小于2MB的图片");
        },
      },
      formProps: {
        name: 'imageUrl',
        title: '上传图片',
        rules: [{
          required: true,
          message: '请上传图片',
        }],
      },
    },
    jumpUrl: {
      type: 'Input',
      props: {
        placeholder: '请输入上传链接',
        allowClear: true,
        maxLength: '4000'
      },
      formProps: {
        name: 'jumpUrl',
        title: '上传链接',
      },
    },
    officialServiceId: {
      type: 'Select',
      props: {
        placeholder: '请选择实务咨询入口',
        allowClear: true,
        showSearch: true,
        optionFilterProp: "children",
      },
      formProps: {
        name: 'officialServiceId',
        title: '选择实务咨询入口',
      },
    },
  },
  layouts: {
    root: 'root',
    structure: {
      root: ['name', 'displayType','isGroup','groupCode','weight', 'effectDate', 'imageUrl', 'jumpUrl', 'officialServiceId'],
    },
  },
};
