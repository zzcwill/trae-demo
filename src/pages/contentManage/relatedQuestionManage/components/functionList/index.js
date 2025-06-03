import React, { useState, useEffect } from "react";
import "./index.scss";
import { Button, Modal, Input, Checkbox, Popover } from "dpl-react";
const defaultFunctionModal = {
  isShow: false,
};
// 渲染列表
const contentElement = (nameList) => {
  return nameList.map((item) => {
    return <div>{item}</div>;
  });
};
export default function FunctionList(props) {
  const {
    value,
    onChange,
    beforeClick,
    disabled,
    inputList,
    functionList,
    functionNameChange,
    functionMap,
  } = props;
  const [functionModal, setFunctionModal] = useState(defaultFunctionModal); // 全部功能列表
  const [selectedRowKeys, setSelectedRowKeys] = useState(() => {
    return value || [];
  }); // 选中列表
  const [selectValue, setSelectValue] = useState(""); // 过滤查询参数
  const [isComposition, setIsComposition] = useState(false); // 是否中文输入
  const [selectList, setSelectList] = useState([]); // 过滤的列表
  const [functionNameList, setFunctionNameList] = useState([]); // 选中的名字列表

  // 是否展示下拉
  const isShowPopover = (nameList) => {
    if (nameList.length > 0) {
      return false;
    } else {
      return true;
    }
  };
  // 选择功能
  const selectFunction = () => {
    let flag = true;
    if (typeof beforeClick === "function") {
      flag = beforeClick();
    }
    if (flag) {
      setFunctionModal({
        isShow: true,
      });
    }
  };

  const compositionStartFunc = () => {
    setIsComposition(true);
  };

  /**
   * 中文输入时的调用方法
   */
  const compositionEndFunc = (e) => {
    setIsComposition(false);
    selectValueChange(e, false);
  };

  //  过滤查询字段改变
  const selectValueChange = (e, flag) => {
    let data = e.target.value;
    flag = typeof flag === "undefined" ? isComposition : flag;
    if (flag) {
      setSelectValue(data);
      return;
    }
    if (data) {
      let newList = [];
      functionList.forEach((item) => {
        if (item.name.indexOf(data) > -1) {
          newList.push(item);
        }
      });
      setSelectList(newList);
    } else {
      setSelectList(functionList);
    }
    setSelectValue(data);
  };

  // 复选框选中
  const functionIdListChange = (data) => {
    let list = [];
    data.forEach((item) => {
      list.push(functionMap[item]);
    });
    setFunctionNameList(list);
    setSelectedRowKeys(data);
  };

  // 关闭
  const closeModal = (isClear) => {
    setFunctionModal(defaultFunctionModal);
    if (isClear) {
      setSelectedRowKeys(value);
      setSelectValue(undefined);
      setFunctionNameList(inputList);
    }
  };

  // 弹窗确定按钮
  const changeFunction = () => {
    onChange(selectedRowKeys);
    functionNameChange(functionNameList);
    closeModal();
  };

  useEffect(() => {
    setSelectedRowKeys(value);
    if (value) {
      let nameList = [];
      value.forEach((item) => {
        nameList.push(functionMap[item]);
      });
      setFunctionNameList(nameList);
    }
  }, [value]);

  useEffect(() => {
    setFunctionNameList(inputList);
  }, [inputList]);

  useEffect(() => {
    setSelectList([].concat(functionList));
  }, [functionList]);

  return (
    <div className="function-list-box">
      <Popover
        content={contentElement(inputList)}
        disabled={isShowPopover(inputList)}
        placement="bottom"
      >
        <Input
          placeholder="请选择功能"
          value={inputList.join(",")}
          readonly="readonly"
          className="function-list-input"
        />
      </Popover>

      <Button
        onClick={() => {
          selectFunction();
        }}
        disabled={disabled}
      >
        选择
      </Button>
      <Modal
        title="功能选择"
        visible={functionModal.isShow}
        width={"60vh"}
        className="system-function-select-modal"
        footer={null}
        onCancel={() => {
          closeModal(true);
        }}
      >
        <Input
          value={selectValue}
          autocomplete="off"
          onCompositionStart={compositionStartFunc}
          onCompositionEnd={compositionEndFunc}
          onChange={selectValueChange}
        />
        <div className="function-list-modal-box">
          <Checkbox.Group
            value={selectedRowKeys}
            onChange={functionIdListChange}
          >
            {selectList.length > 0 &&
              selectList.map((item) => {
                return (
                  <Checkbox
                    key={item.id}
                    value={item.id}
                    className="function-list-checkbox-item"
                  >
                    {item.name}
                  </Checkbox>
                );
              })}
          </Checkbox.Group>
        </div>
        <div className="button-box">
          <Button
            type="primary"
            className="button-item"
            onClick={() => {
              changeFunction();
            }}
          >
            确定
          </Button>
          <div className="line-box"></div>
          <Button
            className="button-item"
            onClick={() => {
              closeModal(true);
            }}
          >
            取消
          </Button>
        </div>
      </Modal>
    </div>
  );
}
