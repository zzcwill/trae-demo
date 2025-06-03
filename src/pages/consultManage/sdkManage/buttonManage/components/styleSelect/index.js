import React, { useState, useEffect } from "react";
import "./index.scss";
import classnames from "classnames";

function StyleSelect(props) {
  const { options = [], value, onChange, disabled, className, style } = props;
  const [selectStyle, setSelectStyle] = useState(""); // 筛选的样式
  const [styleList, setStyleList] = useState([]); // 样式列表

  const bodyClass = classnames({
    "button-style-select": true,
    [className]: className,
    "button-style-select-disabled": disabled,
  });
  const selectItemClass = (id) => {
    return classnames({
      "select-item": true,
      "select-item-current": id === selectStyle,
    });
  };

  /**
   * 选择当前样式
   */
  const selectCurrentStyle = (data) => {
    if (!disabled && data.value !== selectStyle) {
      onChange && onChange(data.value);
      setSelectStyle(data.value);
    }
  };
  const loadImg = async (list) => {
    let result = [];
    if (Array.isArray(list)) {
      let promiseArr = list.map((item) => {
        return new Promise((resolve, reject) => {
          let img = new Image();
          img.src = item.label;
          img.onload = () => {
            resolve({
              ...item,
            });
          };
          img.onerror = () => {
            resolve();
          };
        });
      });
      const data = await Promise.all(promiseArr);
      result = data.filter((item) => {
        if (item) return true;
        return false;
      });
    }
    setStyleList(result);
  };

  useEffect(() => {
    loadImg(options);
  }, [options]);

  useEffect(() => {
    setSelectStyle(value);
  }, [value]);

  return (
    <div className={bodyClass} style={style}>
      {Array.isArray(styleList) &&
        styleList.map((item) => {
          return (
            <div
              className={selectItemClass(item.value)}
              key={item.value}
              onClick={() => {
                selectCurrentStyle(item);
              }}
            >
              <img src={item.label} />
            </div>
          );
        })}
    </div>
  );
}

export default StyleSelect;
