const componentMap = {
    Input: {
        defaultProps: {
            placeholder: '请输入',
            allowClear: true
        }
    },
    Select: {
        defaultProps: {
            placeholder: '请选择',
            allowClear: true
        }
    },
    DatePicker: {
        defaultProps: {
            placeholder: '请选择日期',
            allowClear: true
        }
    },
    MonthPicker: {
        defaultProps: {
            placeholder: '请选择月份',
            allowClear: true
        }
    },
    RangePicker: {
        defaultProps: {
            placeholder: '请选择时间区间',
            allowClear: true
        }
    },
    YearPicker: {
        defaultProps: {
            placeholder: '请输入年份',
            allowClear: true
        }
    },
    TimePicker: {
        defaultProps: {
            placeholder: '请输入时间',
            allowClear: true
        }
    },
    Cascader: {
        defaultProps: {
            placeholder: '请选择',
            allowClear: true
        }
    },
    CheckboxGroup: {},
    RadioGroup: {},
    InputNumber: {
        defaultProps: {
            allowClear: true
        }
    },
    TreeSelect: {
        defaultProps: {
            placeholder: '请选择',
            allowClear: true
        }
    },
    Switch: {}
}
const hasOptionsComponent = ['Select', 'Cascader', 'CheckboxGroup', 'RadioGroup', 'TreeSelect']
module.exports = {
    componentMap,
    hasOptionsComponent
}