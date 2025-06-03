import React, { useState } from "react";
import {
  Button,
  Input,
  Icon,
  message,
  Row,
  Col,
  Radio,
  Checkbox,
} from "dpl-react";
import './questionComponent.scss'

export default function QuestionComponent(props) {
  const { value = [], onChange, disabled } = props;
  const addQuestion = () => {
    if (disabled) return;
    if (value.length >= 20) return message.warning("最多可添加20个问题");
    value.push({
			questionTip: '',
			multipleEnable: 'Y',
			solutionOptionRequired: 'N',
			questionOptionList: ['']
	});
    onChange([...value]);
  };

  const deleteQuestion = (index) => {
    if (disabled) return;
    if (value.length <= 1) {
      message.error("至少需要存在一个问题");
      return;
    }
    value.splice(index, 1);
    onChange([...value]);
  };
// console.log('value',value);
  return (
    <div className="question-custom" style={{ marginLeft: 40 }}>
      <Button
        style={{ marginBottom: 10 }}
        type="primary"
        disabled={disabled}
        onClick={addQuestion}
      >
        新增问题
      </Button>
      {value.map((item, index) => {
        const {
          multipleEnable,
          questionTip,
          solutionOptionRequired,
          questionOptionList,
        } = item;
        return (
          <div className="services-question-item" key={index}>
            <Row>
              <Col span={3} style={{ color: "#333" }}>
                自定义问题{index + 1}:
              </Col>
              <Col span={16} style={{ marginRight: 10 }}>
                <Input
                  placeholder={"请输入问题"}
                  value={questionTip}
                  onChange={(e) => {
                    value[index]["questionTip"] = e.target.value;
                    onChange([...value]);
                  }}
                  disabled={disabled}
                  maxLength={"200"}
                  className={item ? "success" : ""}
                />
              </Col>
              <Col span={2}>
                <Button
                  type="primary"
                  disabled={disabled}
                  onClick={() => deleteQuestion(index)}
                >
                  删除问题
                </Button>
              </Col>
            </Row>
            <Row>
              <Col offset={4} span={5}>
                <Checkbox
                  checked={multipleEnable === "Y" || false}
                  onChange={(e) => {
                    value[index]["multipleEnable"] = e.target.checked
                      ? "Y"
                      : "N";
                    onChange([...value]);
                  }}
                  disabled={disabled}
                >
                  支持访客多选
                </Checkbox>
              </Col>
              <Col span={10}>
                <span>是否必填：</span>
                <Radio.Group
									disabled={disabled}
                  value={solutionOptionRequired || "N"}
                  onChange={(e) => {
                    value[index]["solutionOptionRequired"] = e.target.value;
                    onChange([...value]);
                  }}
                >
                  <Radio value={"Y"}>必填</Radio>
                  <Radio value={"N"}>非必填</Radio>
                </Radio.Group>
              </Col>
            </Row>
            {questionOptionList.map((question, questionIndex) => {

              return (
                <Row className="answer-item" key={questionIndex}>
                  <Col span={3} style={{ color: "#333" }}>
                    选项{questionIndex + 1}:
                  </Col>
                  <Col span={16}>
                    <Input
                      placeholder={"请输入问题选项"}
                      value={question}
                      onChange={(e) => {
                        questionOptionList[questionIndex] = e.target.value;
                        onChange([...value]);
                      }}
                      disabled={disabled}
                      maxLength={"20"}
                      className={question ? "success" : ""}
                    />
                  </Col>
                  <Col span={2}>
                    <Icon
                      type="plus"
                      onClick={() => {
                        if (disabled) return;
                        if (questionOptionList.length >= 5) return;
                        questionOptionList.splice(questionIndex + 1, 0, "");
                        onChange([...value]);
                      }}
                      style={{
                        marginLeft: 10,
                        marginRight: 10,
                        cursor: "pointer",
                      }}
                    />
                    <Icon
                      type="minus"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (disabled) return;
                        if (questionOptionList.length <= 1) {
                          message.error("至少需要一条选项");
                          return;
                        }
                        questionOptionList.splice(questionIndex, 1);
                        onChange([...value]);
                      }}
                    />
                  </Col>
                </Row>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
