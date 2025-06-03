import React, { useState, useRef, useEffect } from "react";
import "./index.scss";
import { Tag, Input, Button, Popover } from "dpl-react";

function TagInput(props) {
	const { value, onChange, disabled = false } = props;
	const [tagList, setTagList] = useState([]); // 标签列表
	const [inputVisible, setInputVisible] = useState(false); // 是否展示输入框
	const inputRef = useRef(null);

	/**
	 * 关闭
	 */
	const handleClose = (data, index) => {
		let list = [].concat(tagList);
		list.splice(index, 1);
		setTagList(list);
		onChange && onChange(list);
	};

	/**
	 * input数据改变
	 */
	const handleInputConfirm = (e) => {
		const value = inputRef.current.input.refs.input.value;
		let list = [].concat(tagList);
		if (value && value.trim()) {
			list.push(value);
			setTagList(list);
			setInputVisible(false);
			onChange && onChange(list);
		} else {
			setInputVisible(false);
		}
	};

	/**
	 * 展示input框
	 */
	const showInput = () => {
		setInputVisible(true);
	};

	useEffect(() => {
		if (inputVisible) {
			inputRef.current.input.refs.input.focus();
		}
	}, [inputVisible]);

	useEffect(() => {
		if (Array.isArray(value)) {
			setTagList(value);
		} else {
			setTagList([]);
		}
	}, [value]);
	return (
		<div className="tag-input-box">
			{Array.isArray(tagList) &&
				tagList.map((item, index) => {
					const isLongTag = item.length > 40;
					const tagElem = (
						<Tag
							key={`${item}${index}`}
							closable={!disabled}
							afterClose={() => handleClose(item, index)}
						>
							{isLongTag ? `${item.slice(0, 20)}...` : item}
						</Tag>
					);
					return isLongTag ? (
						<Popover
							overlayClassName="tag-max-limit"
							content={item}
							key={`${item}${index}`}
							arrowPointAtCenter={true}
						>
							{tagElem}
						</Popover>
					) : (
						tagElem
					);
				})}
			{inputVisible && (
				<Input
					ref={inputRef}
					type="text"
					size="small"
					style={{ width: 100 }}
					onBlur={handleInputConfirm}
					onPressEnter={handleInputConfirm}
				/>
			)}
			{!inputVisible && (
				<Button
					mass="tiny"
					type="dashed"
					onClick={showInput}
					disabled={disabled}
				>
					+ 新增
				</Button>
			)}
		</div>
	);
}

export default TagInput;
