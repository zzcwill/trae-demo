import React from 'react';
import './index.scss';
import { Modal, Icon } from 'dpl-react';
import ReactDOM from 'react-dom';
function DeleteModal(props) {
  const { text = '正在进行删除操作', descript = '删除后将无法恢复，是否继续要删除？', visible = false, onCancel, onOk, okText ,title, descriptColor = '#FF3B30' , width = 420 , closable = true} = props;

  return (
    <Modal title={title} visible={visible} onCancel={onCancel} width={width} onOk={onOk} okText={okText} closable={closable}>
      <div className="modal-box">
        <Icon type="exclamation-circle-o" className="icon-size" />
        <span className="title">{text}</span>
      </div>
      <div className="depict-box">
        <span className="depict" style={{color:descriptColor}}>{descript}</span>
      </div>
    </Modal>
  );
}

export default (function() {
  let div = document.createElement('div');
  document.body.appendChild(div);
  let visible = true;
  let status = false;
  const render = config => {
    visible = true;
    status = true;
    ReactDOM.render(<DeleteModal visible={visible} {...config} />, div);
  };
  const close = () => {
    status = false;
    visible = false;
   const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  };
  const getStatus = () => {
    return status;
  };
  return {
    render,
    close,
    getStatus
  };
})();
