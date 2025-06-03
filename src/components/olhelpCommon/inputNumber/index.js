import React, { useEffect, useState, useRef } from "react";
import { Input } from "dpl-react";
function Input_Number(props) {
	const {
		onChange,
		value,
		placeholder = "请输入",
		maxLength = 20,
		allowClear,
		onBlur,
		onMouseLeave,
		style,
		...otherProps
	} = props;
	const [isComposition, setIsComposition] = useState(false);

	// 修改判断是否为数字
	const numberChange = (e, flag) => {
		let num = e.target.value;
		flag = typeof flag === "undefined" ? isComposition : flag;
		if (flag) {
			onChange(num);
			return;
		}
		if (num && num.trim()) {
			num = num.replace(/\D*/g, "");
			onChange(num);
		} else {
			onChange(num);
		}
	};
	/**
	 * 中文输入时的调用方法
	 */
	const compositionStartFunc = (e) => {
		setIsComposition(true);
	};

	/**
	 * 中文输入时的调用方法
	 */
	const compositionEndFunc = (e) => {
		setIsComposition(false);
		numberChange(e, false);
	};

	return (
		<Input
			{...otherProps}
			onCompositionStart={compositionStartFunc}
			onCompositionEnd={compositionEndFunc}
			onChange={numberChange}
			value={value}
			onMouseLeave={onMouseLeave}
			placeholder={placeholder}
			autocomplete="off"
			allowClear={allowClear}
			maxLength={maxLength}
			onBlur={onBlur}
			style={style}
		></Input>
	);
}

export default Input_Number;
