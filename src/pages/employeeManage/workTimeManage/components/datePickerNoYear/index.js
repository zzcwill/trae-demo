import React, { useRef, useEffect, useState } from "react";
import "./index.scss";
import { DatePicker, Icon } from "dpl-react";
import WorkTime from "@/components/employeeManage/workTime";
import "moment/locale/zh-cn";
import moment from "moment";
import { workTimeWeekMap, workTimeSaveKeyMap } from "@/const/config";
import classnames from "classnames";

const format = "MM-DD";

function DatePickerNoYear(props) {
	const {
		parentData,
		date,
		onChange,
		index,
		disabled,
		addDate,
		deleteDate,
		maxItem = 1,
		className,
		style,
	} = props;
	const dateRef = useRef(null);

	const bodyClassName = classnames({
		"effective-date-item": true,
		[className]: className,
	});

	const valueChange = (type, value) => {
		onChange && onChange(type, value, index);
	};

	// 禁止选择日期范围
	const disabledDateFunc = (current, begin) => {
		if (begin) {
			const monthStart = moment(begin).valueOf();
			const monthEnd = moment(begin).endOf("month").valueOf();
			return (
				current &&
				(current.valueOf() < monthStart || current.valueOf() > monthEnd)
			);
		}
		return current && current.valueOf() < moment().startOf("year").valueOf();
	};

	const getValue = (type, value) => {
		if (value) {
			const momentDate = moment(value, format);
			// momentDate.isValid() 为false，则认为不是闰年，非法时间不考虑处理，
			if (momentDate.isValid()) {
				return momentDate;
			} else {
				valueChange(type, "02-28");
				return moment("02-28", format);
			}
		}
		return value;
	};

	return (
		<div className={bodyClassName} style={style}>
			<div className="effective-date-item-label">
				<span>生效日期</span>
			</div>
			<div className="effective-date-item-context">
				<DatePicker
					format={format}
					allowClear={false}
					onChange={(momentLit, stringList) => {
						dateRef.current = momentLit.format("YYYY-MM-DD");
						valueChange(workTimeSaveKeyMap.effectiveDateBegin, stringList);
					}}
					value={getValue(
						workTimeSaveKeyMap.effectiveDateBegin,
						date.effectiveDateBegin
					)}
					disabled={disabled}
					disabledDate={(current) => disabledDateFunc(current)}
				/>
				<div className="date-picker-line">至</div>
				<DatePicker
					format={format}
					allowClear={false}
					onChange={(momentLit, stringList) => {
						valueChange(workTimeSaveKeyMap.effectiveDateEnd, stringList);
					}}
					value={getValue(
						workTimeSaveKeyMap.effectiveDateEnd,
						date.effectiveDateEnd
					)}
					disabled={disabled}
					disabledDate={(current) => disabledDateFunc(current, dateRef.current)}
				/>
				<div className="effective-date-item-option">
					<div className="option-item">
						{parentData &&
							index == parentData.length - 1 &&
							parentData.length < maxItem && (
								<Icon
									type="plus"
									className="effective-date-item-option-icon"
									onClick={() => {
										addDate && addDate();
									}}
								/>
							)}
					</div>
					<div className="option-line-box"></div>
					<div className="option-item">
						{parentData && parentData.length != 1 && (
							<Icon
								type="minus"
								className="effective-date-item-option-icon"
								onClick={() => {
									deleteDate && deleteDate(index);
								}}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default DatePickerNoYear;
