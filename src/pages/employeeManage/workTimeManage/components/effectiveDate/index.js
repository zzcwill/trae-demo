import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { DatePicker, Icon } from "dpl-react";
import WorkTime from "@/components/employeeManage/workTime";
import classnames from "classnames";
import moment from "moment";
import { defaultEffectiveDate } from "../../config";
import { workTimeWeekMap, workTimeSaveKeyMap } from "@/const/config";
import "moment/locale/zh-cn";
import DatePickerNoYear from "../datePickerNoYear";
const format = "MM-DD";
const defaultMaxItem = 5;

export default function EffectiveDate(props) {
	const {
		className,
		style,
		value,
		onChange,
		maxItem = defaultMaxItem,
		disabled,
	} = props;

	const bodyClass = classnames({
		"effective-date-box": true,
		[className]: className,
	});

	const valueChange = (type, data, index) => {
		let list = [].concat(value);
		if (type === workTimeSaveKeyMap.weekConfig) {
			let weekList = [].concat(list[index][type]);
			weekList[data.index] = data.result;
			list[index][type] = weekList;
		} else if (type === workTimeSaveKeyMap.effectiveDateBegin) {
			list[index] = Object.assign({}, list[index], {
				[type]: data,
				[workTimeSaveKeyMap.effectiveDateEnd]: null,
			});
		} else {
			list[index] = Object.assign({}, list[index], {
				[type]: data,
			});
		}
		onChange && onChange(list);
	};

	// 增加
	const addDate = () => {
		if (value && value.length < maxItem && !disabled) {
			let list = [].concat(value);
			list.push(defaultEffectiveDate());
			onChange && onChange(list);
		}
	};

	const deleteDate = (index) => {
		if (value && value.length > 1 && !disabled) {
			let list = [].concat(value);
			list.splice(index, 1);
			onChange && onChange(list);
		}
	};

	return (
		<div className={bodyClass} style={style}>
			{value &&
				value.length > 0 &&
				value.map((date, index) => {
					return (
						<div className="card-box">
							<DatePickerNoYear
								key={index}
								parentData={value}
								date={date}
								index={index}
								onChange={valueChange}
								addDate={addDate}
								deleteDate={deleteDate}
								maxItem={maxItem}
							/>
							{date.weekConfig &&
								date.weekConfig.map((item, weekIndex) => {
									return (
										<div className="effective-date-item">
											<div className="effective-date-item-label">
												<span>{item.name}</span>
											</div>
											<div className="effective-date-item-context">
												<WorkTime
													isRequire={true}
													maxItem={3}
													disabled={disabled}
													value={item}
													weekIndex={weekIndex}
													onChange={(data) => {
														valueChange(
															workTimeSaveKeyMap.weekConfig,
															data,
															index
														);
													}}
												/>
											</div>
										</div>
									);
								})}
						</div>
					);
				})}
		</div>
	);
}
