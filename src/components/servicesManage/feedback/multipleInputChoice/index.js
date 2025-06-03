import React, { useEffect, useState } from "react";
import { Checkbox, Input } from 'dpl-react'
import { makeUUID } from "@/utils";
import './index.scss'

export const MultipleInputChoice = (props) => {
    const {
      disabled,
      value,
      options = [],
      onChange,
      onChangeOptionName,
      parentClassName,
    } = props
    const [optionData, setOptionData] = useState([]);

    useEffect(() => {
      setOptionData(options);
    }, []);

    return (
        <Checkbox.Group
          className="check-box-choice-input"
          value={value}
          disabled={disabled}
          onChange={(data) => {
            // onChange(Object.assign({}, value, data))
            // console.info(data);
            if (data.length > 0) {
              const domInputList = document.querySelectorAll(`.${parentClassName} .choose-info-input`);
              let newOptions = [
                ...optionData,
              ];

              data.map((itemOne) => {
                newOptions.map((itemInfo, itemInfoIndex) => {
                  console.info(itemInfo, itemInfoIndex)
                  if (itemInfo.optionCode === itemOne) {
                    const currentValue = domInputList[itemInfoIndex].value;
                    if (!currentValue) {
                      const newOptionsItem = { ...newOptions[itemInfoIndex] };
                      newOptionsItem.optionDisplayName = newOptionsItem.optionName;
                      newOptions[itemInfoIndex] = newOptionsItem; 
                    }
                  }

                  return null;
                })

                return null
              }) 

              setOptionData(newOptions);
              onChangeOptionName(newOptions);              
            }

            onChange(data);
          }
        }>
          {
            optionData.map((item, index) => {

              return (
                // eslint-disable-next-line
                <span className="check-box-choice-input-item" key={makeUUID()}>
                  <Checkbox 
                    value={item.optionCode}
                  >
                    {item.optionName}
                  </Checkbox>
                  <Input
                    className="choose-info-input" 
                    defaultValue={item.optionDisplayName}
                    placeholder={item.optionName}
                    style={{ width: 100 }}
                    disabled={disabled}
                    maxLength="20"
                    onBlur={(e) => {
                      const inputValue = e.target.value;

                      const domInputList = document.querySelectorAll(`.${parentClassName} .choose-info-input`);
                      let newOptions = [
                        ...optionData,
                      ];

                      newOptions = newOptions.map((item, itemKey) => {
                        const currentValue = domInputList[itemKey].value;
                        let newOptionDisplayName = '';

                        if (currentValue) {
                          newOptionDisplayName = currentValue;                          
                        } 
 
                        if (
                          !currentValue
                          && (itemKey === index)
                        ) {
                          newOptionDisplayName = options[itemKey].optionName                          
                        }

                        item.optionDisplayName = newOptionDisplayName;
                        return item;
                      });  

                      setOptionData(newOptions);
                      onChangeOptionName(newOptions);                  
                    }}
                  />               
                </span>
              )
            })
          }
        </Checkbox.Group>
    )
}