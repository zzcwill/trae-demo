import React,{useState} from 'react';
import './index.scss';
import { Modal, Icon, Button } from 'dpl-react';
import ReactDOM from 'react-dom';
function DeleteModal(props) {
  const {
    text = '正在进行删除操作',
    descript = '删除后将无法恢复，是否继续要删除？',
    visible = false,
    onCancel,
    onOk,
    okText,
    title,
    descriptColor = '#FF3B30',
    width = 420,
    closable = true,
    cancelText
  } = props;

  const [modalVisible,setModalVisible] = useState(visible)
  return (
    <Modal title={title} visible={modalVisible} width={width} onCancel={onCancel} closable={closable} footer={null}>
      <div className="modal-box">
        <Icon type="exclamation-circle-o" className="icon-size" />
        <span className="title">{text}</span>
      </div>
      {descript && (
        <div className="depict-box">
          <span className="depict" style={{ color: descriptColor }}>
            {descript}
          </span>
        </div>
      )}
      <div className="button-box">
        {okText && (
          <Button
            type="primary"
            onClick={() => {
              onOk && onOk()
              setModalVisible(!modalVisible);
            }}
          >
            {okText}
          </Button>
        )}
        {cancelText && (
          <Button
            onClick={() => {
              onCancel && onCancel();
              setModalVisible(!modalVisible);
            }}
          >
            {cancelText}
          </Button>
        )}
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
