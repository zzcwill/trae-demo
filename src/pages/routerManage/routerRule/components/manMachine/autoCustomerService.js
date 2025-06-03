import React from "react";
import { Switch, Input, InputNumber } from "dpl-react";

export default function (props) {
	const {
		value = {
			multiRoundsEnable: false,
			multiRoundsCount: undefined,
			multiRoundsTip: "",
		},
		onChange,
		disabled,
	} = props;
	return (
		<div className="auto-customer-service-box">
			<Switch
				checked={value.multiRoundsEnable}
				disabled={disabled}
				onChange={(e) => {
					onChange &&
						onChange(Object.assign({}, value, { multiRoundsEnable: e }));
				}}
			/>
			{value.multiRoundsEnable && (
				<div className="limit-box">
					<div className="num">
						<span>机器人服务时，访客发言次数达到</span>
						<InputNumber
							disabled={disabled}
							value={value.multiRoundsCount}
							style={{ marginLeft: 10, marginRight: 10 }}
							max={99}
							min={1}
							className={value.multiRoundsCount ? "success" : ""}
							onChange={(e) => {
								value.multiRoundsCount = e;
								onChange(Object.assign({}, value));
							}}
						/>
						<span>次，将提示</span>
					</div>
				</div>
			)}
			{value.multiRoundsEnable && (
				<Input.TextArea
					disabled={disabled}
					value={value.multiRoundsTip}
                    maxLength='1000'
					className={value.multiRoundsTip ? "success" : ""}
					onChange={(e) => {
						value.multiRoundsTip = e.target.value;
						onChange(Object.assign({}, value));
					}}
				/>
			)}
		</div>
	);
}
