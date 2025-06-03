import React from 'react';
import { Radio, DatePicker } from 'dpl-react';
import moment from 'moment';
/**
 * 列表
 */
const publishTypeMap = [
  {
    name: '立即发布',
    id: '0'
  },
  {
    name: '定时发布',
    id: '1'
  }
];

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

class PublishMethod extends React.Component {
  constructor(props) {
    super(props);
    this.radioChange = this.radioChange.bind(this);
    this.dataChange = this.dataChange.bind(this);
  }

  /**
   * 发布方式修改
   * @param {event} e
   */
  radioChange(e) {
    const value = e.target.value;
    const data = Object.assign({}, this.props.value, {
      publishType: value
    });
    if (value === 0) {
      data.publishTime = null;
    }
    this.props.onChange(data);
  }

  /**
   *
   * @param {*} e
   */
  dataChange(value) {
    const data = Object.assign({}, this.props.value, {
      publishTime: value
    });
    this.props.onChange(data);
  }

  /**
   * 默认当前日期之前
   * @param {Moment} current
   */
  disabledDate(current) {
    return current && current < moment(moment().format('YYYY-MM-DD 00:00:00'));
  }

  /**
   * 默认当前时间之后
   */
  disabledTime(date) {
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

  render() {
    const { value, disabled = false } = this.props;
    return (
      <div className="publish-box">
        <Radio.Group value={value.publishType} onChange={this.radioChange} disabled={disabled}>
          {publishTypeMap.length > 0 &&
            publishTypeMap.map(item => {
              return (
                <Radio key={item.id} value={item.id}>
                  {item.name}
                </Radio>
              );
            })}
          {value.publishType == '1' && (
            <DatePicker
              value={value.publishTime}
              disabledTime={this.disabledTime}
              showTime={{ format: 'HH:mm:00', defaultValue: moment() }}
              onChange={this.dataChange}
              disabledDate={this.disabledDate}
              format="YYYY-MM-DD HH:mm:00"
              disabled={disabled}
            />
          )}
        </Radio.Group>
      </div>
    );
  }
}
export default PublishMethod;
