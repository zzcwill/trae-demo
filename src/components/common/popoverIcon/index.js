/**
 * 图标浮动展示说明内容
 */
import React from 'react';
import { Popover, Icon } from 'dpl-react';
import './index.scss';
class PopoverIcon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { iconType = 'question-circle', content = '' } = this.props;
    return (
      <div className="popover-icon">
        {content && (
          <Popover content={content} placement="right" arrowPointAtCenter={true} getPopupContainer={trigger => trigger.parentNode}>
            <Icon type={iconType} />
          </Popover>
        )}
      </div>
    );
  }
}

export default PopoverIcon;
