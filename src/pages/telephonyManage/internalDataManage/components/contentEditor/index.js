import React from 'react';
import './index.scss';
import UEditor from '@/components/telephonyManage/ueditor';

class ContentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.onEditChange = this.onEditChange.bind(this);
  }
  /**
   * 编辑内容修改
   */
  onEditChange(value) {
    this.props.onChange(value)
  }

  render() {
    const initialValue = this.props['data-__meta'].initialValue;
    return <UEditor onChange={this.onEditChange} content={initialValue} height={206}/>;
  }
}

export default ContentEditor;
