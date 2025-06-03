import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import { Radio, DatePicker } from "dpl-react";
import { modalType, effectiveType } from "../../config";
import moment from "moment";

function ExpireData(props) {
	const { value = {}, onChange, ...otherProps } = props;

	const datePickerOnChange = (date, dateString) => {
		const sendData = Object.assign({}, value, {
			expireDate: dateString,
		});
		onChange && onChange(sendData);
	};

	const radioOnChange = (e) => {
		const result = e.target.value;
		const sendData = Object.assign({}, value, {
			type: result,
		});
		onChange && onChange(sendData);
	};

	return (
		<Radio.Group {...otherProps} value={value.type} onChange={radioOnChange}>
			<Radio value={effectiveType.foreverEffective.id}>永久</Radio>
			<Radio value={effectiveType.effective.id}>
				<span>有效期至</span>
				<div className="line-box"></div>
				<DatePicker
					disabled={value.type !== effectiveType.effective.id}
					value={value.expireDate && moment(value.expireDate)}
					format="YYYY-MM-DD"
					onChange={datePickerOnChange}
				/>
			</Radio>
		</Radio.Group>
	);
}

export default ExpireData;
