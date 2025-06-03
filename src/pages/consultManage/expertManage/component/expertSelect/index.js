/* eslint-disable sonarjs/prefer-single-boolean-return */
import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Button, Modal, Input, Checkbox, Popover, Icon, message } from "dpl-react";
import classnames from "classnames";
import debounce from "lodash/debounce";
import { isPlainObject } from "@/utils/index";
const defaultFunctionModal = {
  isShow: false,
};
// 渲染列表
const contentElement = (selectedRowKeys, listMap, format) => {

  return selectedRowKeys.map((item) => {
    return (
      <div className="name-list-item">
        <span title={listMap[item][format.label]}>{listMap[item][format.label]}</span>
      </div>
    );
  });
};
const defaultModalTitle = "选择";
const defaultPlaceholder = "请选择";
const defaultModalWidth = "500";
const showTypeMap = {
  input: "input", // input框中展示
  box: "box", // 单独的box展示
};
const defaultFormat = {
  label: "name",
  value: "id",
};

/**
 * 获取选项列表
 */
function getOptionsList(targetList, optionsMap = {}) {
  let optionsList = [];
  if (Array.isArray(targetList) && isPlainObject(optionsMap)) {
    targetList.forEach((item) => {
      const data = optionsMap[item];
      if (data) {
        optionsList.push(data);
      }
    });
  }
  return optionsList;
}

function ModalSelect(props, ref) {
  const {
    value,
    onChange,
    className,
    style,
    other
  } = props;
  const {    
    list = [],
    format = defaultFormat,
    placeholder = defaultPlaceholder,
    beforeClick,
    disabled,
    modalTitle = defaultModalTitle,
    modalWidth = defaultModalWidth,
    onModalButtonClick,
    showType = showTypeMap.input,
    showBoxClassName,
    showButton = true,
    isShowModalClear = false,
    isNeedAllSelect = true,
    isNeedStringToNumber = false,
  } = other

  const [isShowModal, setIsShowModal] = useState(false); // 是否展示弹窗
  const [selectedRowKeys, setSelectedRowKeys] = useState(() => {
    return value || [];
  }); // 选中列表
  const [selectValue, setSelectValue] = useState(""); // 过滤查询参数
  const [lastSelectRowKeys, setLastSelectRowKeys] = useState([]); // 上一次选择
  const [isComposition, setIsComposition] = useState(false); // 是否中文输入
  const [originList, setOriginList] = useState([]); // 复制的原始列表
  const [nameList, setNameList] = useState([]); // 选中的名字列表
  const [isChecked, setIsChecked] = useState(false); // 是否选中
  console.log('selectedRowKeys', selectedRowKeys);
  const [selectRowOptions, setSelectRowOptions] = useState([]); // 选中的选项
  const listMap = useRef({}); // 列表map

  const showTypeBoxClass = classnames({
    "name-list-context": true,
    "name-list-input": showType === showTypeMap.input,
    "name-list-box": showType === showTypeMap.box,
    "name-list-box-disabled": showType === showTypeMap.box && disabled,
    "name-list-box-active": showType === showTypeMap.box && !disabled,
    [showBoxClassName]: showBoxClassName,
  });

  const bodyClass = classnames({
    "modal-select-box": true,
    [className]: className,
  });

  const modalSelectInputElClass = classnames({
    "modal-select-input-el": true,
    "modal-select-input-el-clear": nameList && nameList.length > 0,
  });

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
      setIsShowModal(true);
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
    // flag = typeof flag === "undefined" ? isComposition : flag;
    // if (flag) {
    //   setSelectValue(data);
    //   return;
    // }
    setSelectValue(data);
  };

  // 复选框选中
  const selectChange = (data) => {
    if(data.length > 100) { 
      message.error('当前已选择100位专家&机构，达到系统上线后无法选择！');
      return
    }
    setSelectedRowKeys(data);
  };

  // 关闭
  const closeModal = () => {
    // 关闭的同时将状态初始化
    setIsShowModal(false);
    setSelectValue("");
    if (isShowModalClear) {
      setSelectedRowKeys(lastSelectRowKeys);
    }
  };

  // 弹窗确定按钮
  const changeFunction = () => {
    let data = [].concat(selectedRowKeys);
    if (onModalButtonClick && typeof onModalButtonClick == "function") {
      data = onModalButtonClick(selectedRowKeys);
    }
    onChange(data, selectRowOptions);
    closeModal();
  };

  // 清空
  const clearInput = (e) => {
    onChange([], []);
  };

  // 弹窗清空
  const clearSelect = () => {
    setSelectedRowKeys([]);
  };

  /**
   * 清除选中的选项,主要在showType是box的场景下使用
   */
  const clearSelectRowKey = (item) => {
    if (Array.isArray(selectedRowKeys) && item) {
      const list = [].concat(selectedRowKeys);
      const optionList = [].concat(selectRowOptions);
      const index = list.indexOf(item[format.value]);
      if (index > -1) {
        list.splice(index, 1);
        optionList.splice(index, 1);
      }
      onChange && onChange(list, optionList);
    }
  };

  /**
   * 选中全部
   */
  const selectAllClick = () => {
    let result = [].concat(selectedRowKeys);
    const currentList =  originList.filter(out => out[format.label].indexOf(selectValue) > -1)
    if (Array.isArray(currentList)) {
      currentList.forEach((item) => {
        const resultData = item[format.value];
        if ((resultData || resultData === 0) && !result.includes(resultData)) {
          result.push(resultData);
        }
      });
    }
    setSelectedRowKeys(result);
  };

  /**
   * 清除全部
   */
  const clearAllClick = () => {
    let result = [].concat(selectedRowKeys);
    const currentList =  originList.filter(out => out[format.label].indexOf(selectValue) > -1)
    if (Array.isArray(currentList)) {
      currentList.forEach((item) => {
        const resultData = item[format.value];
        if (resultData || resultData === 0) {
          const index = result.indexOf(resultData);
          if (index > -1) {
            result.splice(index, 1);
          }
        }
      });
    }
    setSelectedRowKeys(result);
  };

  /**
   * 全选按钮点击
   */
  const allOnClick = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      selectAllClick();
    } else {
      clearAllClick();
    }
  };

  let elDom =
    showType !== showTypeMap.box ? (
      <div className="modal-select-type-input">
        <Popover
          content={contentElement(selectedRowKeys, listMap.current, format)}
          disabled={isShowPopover(selectedRowKeys)}
          placement="bottomLeft"
          overlayClassName="model-select-popover-box"
          getPopupContainer={(triggerNode) => triggerNode.parentNode}
        >
          <div className="modal-select-input">
            <Input
              placeholder={placeholder}
              value={nameList.join(",")}
              readOnly="readonly"
              className={modalSelectInputElClass}
            />
            {nameList && nameList.length > 0 && (
              <Icon
                type="circle-error"
                className="modal-select-input-icon"
                onClick={clearInput}
              />
            )}
          </div>
        </Popover>
        <Button
          type="primary"
          onClick={() => {
            selectFunction();
          }}
          className="modal-select-input-button"
          disabled={disabled}
          style={{ width: `60px` }}
        >
          选择
        </Button>
      </div>
    ) : (
      <div className="modal-select-type-box">
        <div className={showTypeBoxClass}>
          {(!nameList || nameList.length === 0) && <span className="placeholder">{placeholder}</span>}
          {nameList && nameList.length > 0 && (
            <>
              <ul className="select-box-context">
                {nameList.map((item) => {
                  return (
                    <li
                      className="select-box-item"
                      title={item[format.label] || ""}
                      key={item[format.value]}
                    >
                      <div className="item-text">{item[format.label]}</div>
                      {!disabled && (
                        <Icon
                          type="pure-close"
                          className="item-close-icon"
                          onClick={() => {
                            clearSelectRowKey(item);
                          }}
                        ></Icon>
                      )}
                    </li>
                  );
                })}
              </ul>
              <Icon
                type="circle-error"
                className="select-box-clear"
                onClick={clearInput}
              />
            </>
          )}
        </div>
        {showButton && (
          <Button
            type="primary"
            onClick={() => {
              selectFunction();
            }}
            disabled={disabled}
            style={{ width: `60px` }}
          >
            选择
          </Button>
        )}
      </div>
    );

  // list 变化要重新构建map
  useEffect(() => {
    let map = {};
    list.forEach((item) => {
      map[item[format.value]] = item;
    });
    listMap.current = map;
    setOriginList([...list]);
  }, [list]);

  // value发生变化了，需要生成对应的nameList用于展示
  useEffect(() => {
    if (value) {
      let nameList = [];
      if (showType === showTypeMap.input) {
        value.forEach((item) => {
          if (item || item === 0) {
            // 第一次重新渲染的时候，实际上是没有值的，但是list改变的时候，会重新触发，所以最后nameList会存在值
            if (listMap.current[item]) {
              nameList.push(listMap.current[item][format.label]);
            }
          }
        });
      } else {
        nameList = getOptionsList(value, listMap.current);
      }
      setNameList(nameList);
    } else {
      setNameList([]);
    }
  }, [value, listMap.current]);

  // value发生变化，selectedRowKeys的状态发生改变，并且lastSelectRowKey发生改变
  useEffect(() => {
    setSelectedRowKeys(value || []);
    setLastSelectRowKeys(value || []);
  }, [value]);

  // 根据selectRowKeys变化，构建涉及的选项内容
  useEffect(() => {
    const optionsList = getOptionsList(selectedRowKeys, listMap.current);
    setSelectRowOptions(optionsList);
  }, [selectedRowKeys, listMap.current]);

  // 根据当前的选择列表判断是否全部选中
  useEffect(() => {
    if (isNeedAllSelect) {
      const currentList =  originList.filter(out => out[format.label].indexOf(selectValue) > -1)
      const currentKeyList = currentList.map((item) =>  item[format.value]);
      let isSelectAll = true;
      if (
        currentKeyList.length &&
        Array.isArray(selectedRowKeys) &&
        selectedRowKeys.length
      ) {
        try {
          currentKeyList.forEach((key) => {
            if (isNeedStringToNumber) {
              key = Number(key);
            }
            if (!selectedRowKeys.includes(key)) {
              isSelectAll = false;
              throw "";
            }
          });
        } catch (e) {}
      } else {
        isSelectAll = false;
      }
      setIsChecked(isSelectAll);
    }
  }, [originList, selectValue, selectedRowKeys]);

  return (
    <div className={bodyClass} style={style}>
      {elDom}
      <Modal
        title={modalTitle}
        visible={isShowModal}
        width={`${modalWidth}px`}
        className="modal-select-modal"
        footer={null}
        destroyOnClose
        onCancel={() => {
          closeModal();
        }}
      >
        <div className="modal-select-modal-search">
          <Input
            value={selectValue}
            autoComplete="off"
            onCompositionStart={compositionStartFunc}
            onCompositionEnd={compositionEndFunc}
            onChange={selectValueChange}
            allowClear
          />
          {isShowModalClear && (
            <Button
              type="primary"
              onClick={() => {
                clearSelect();
              }}
            >
              清空
            </Button>
          )}
        </div>
        <div className="modal-select-checkbox">
          {/* {isNeedAllSelect && originList.length > 0 && (
            <Checkbox
              checked={isChecked}
              className="modal-select-checkbox-item"
              onClick={allOnClick}
            >
              全选
            </Checkbox>
          )} */}
          <Checkbox.Group value={selectedRowKeys} onChange={selectChange}>
            {originList.length > 0 &&
              originList.filter(out => out[format.label].indexOf(selectValue) > -1).map((item) => {
                return (
                  <Checkbox
                    key={item[format.value]}
                    value={item[format.value]}
                    className="modal-select-checkbox-item"
                  >
                    {item[format.label]}
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
              closeModal();
            }}
          >
            取消
          </Button>
        </div>
      </Modal>
    </div>
  );
}
export default ModalSelect;
