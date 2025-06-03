import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { message, Button, Modal, Input, Checkbox, Popover } from "dpl-react";

export default function QuestionList(props) {
  const {
    value,
    onChange,
    className = "",
    searchData,
    onQuestionSearch,
    type,
  } = props;
  const [questionList, setQuestionList] = useState([]); // 问题列表
  const [isShowError, setIsShowError] = useState(false); // 是否展示错误信息
  const [isShowPopover, setIsShowPopover] = useState(true); // 是否展示Popover
  const onPressEnter = () => {
    if (type === "add") {
      if (
        searchData.location.length > 1 ||
        searchData.brand.length > 1 ||
        searchData.usertype.length > 1
      ) {
        setIsShowError(true);
        return false;
      } else {
        setIsShowError(false);
      }
      if (value) {
        const sendData = {
          systemId: searchData.systemId || undefined,
          location:
            searchData.location[0] === "all"
              ? undefined
              : searchData.location[0],
          brand:
            searchData.brand[0] === "all" ? undefined : searchData.brand[0],
          usertype:
            searchData.usertype[0] === "all"
              ? undefined
              : searchData.usertype[0],
          question: value,
        };
        getQuestionList(sendData);
      }
    } else {
      if (value) {
        const sendData = {
          systemId: searchData.systemId || undefined,
          location:
            searchData.location === "all" ? undefined : searchData.location,
          brand: searchData.brand === "all" ? undefined : searchData.brand,
          usertype:
            searchData.usertype === "all" ? undefined : searchData.usertype,
          question: value,
        };
        getQuestionList(sendData);
      }
    }
  };

  const contentElement = () => {
    return (
      <div className="question-list-popover">
        {questionList.map((item, index) => {
          return (
            <div
              key={index}
              className="question-list-popover-item"
              onClick={(e) => {
                e.nativeEvent.stopPropagation()
                e.nativeEvent.stopImmediatePropagation()
                selectValue(e, item);
              }}
              title={item}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  const selectValue = (e, data) => {
    onChange(data);
    onQuestionSearch(data);
  };

  const getQuestionList = async (data) => {
    const res = await get({
      url: Api.getRobotQuestionList,
      params: {
        ...data,
      },
    });
    if (res.success) {
      const data = res.data;
      if (data && data.length > 0) {
        setQuestionList([].concat(data));
        setIsShowPopover(false);
      } else {
        setQuestionList([]);
        setIsShowPopover(true);
      }
    } else {
      message.error(res.message);
    }
  };

  const inputValueChange = (e) => {
    const data = e.target.value;
    if (!value) {
      setIsShowError(false);
    }
    onChange(data);
  };

  const stopPropagation = () => {
    if (questionList.length > 0) {
      setIsShowPopover(false);
    }
  };

  const onBlur = () => {
    // setIsShowPopover(true);
    // setQuestionList([]);
    setTimeout(() => {
      setIsShowPopover(true);
      setQuestionList([]);
    }, 200);
  };

  useEffect(() => {
    if (!value) {
      setIsShowError(false);
    }
  }, [value]);
  return (
    <div className="question-list-box">
      <Popover
        content={contentElement()}
        control="full"
        disabled={isShowPopover}
        visible={!isShowPopover}
        placement="bottomLeft"
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      >
        <Input
          placeholder="请输入关键字后回车查询"
          value={value}
          onChange={inputValueChange}
          onPressEnter={onPressEnter}
          onFocus={stopPropagation}
          onBlur={onBlur}
        />
      </Popover>
      <div className="question-error-message-box">
        {isShowError && (
          <span>选择了多个维度值无法匹配到问题，请输入完整的标准问</span>
        )}
      </div>
    </div>
  );
}
