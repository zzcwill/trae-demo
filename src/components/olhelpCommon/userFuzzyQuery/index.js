import React, { useRef, useEffect, useState } from "react";
import "./index.scss";
import { message, Select } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { debounce } from "lodash";
const Option = Select.Option;

function UserFuzzyQuery(props) {
	const { onChange, value, ...otherProps } = props;
	const [userList, setUserList] = useState([]);

	/**
	 * 渐进式查询人员信息
	 */
	const getUserFuzzy = async (value) => {
		try {
			const res = await get({
				url: Api.getUserFuzzy,
				params: {
					keyword: (value && value.trim()) || undefined,
				},
			});
			if (res.success) {
				const data = res.data;
				setUserList([].concat(data));
			} else {
				message.error(res.message);
			}
		} catch (e) {
			console.error(e);
		}
	};

	/**
	 * 搜索
	 */
	const selectOnSearch = debounce((value = "") => {
		getUserFuzzy(value);
	}, 600);

	/**
	 * 修改
	 */
	const selectOnChange = (value) => {
		onChange && onChange(value);
	}

	/**
	 * 选择
	 */
	const selectOnSelect = (value) => {
		onChange && onChange(value);
	};

	useEffect(() => {
		if (value && userList && !userList.length) {
			getUserFuzzy(value);
		}
	}, [value]);
	return (
		<Select
			{...otherProps}
			showSearch
			value={value}
			allowClear
			// showArrow={false}
			filterOption={false}
			defaultActiveFirstOption={false}
			onSearch={selectOnSearch}
			// onSelect={selectOnSelect}
			onChange={selectOnChange}
			notFoundContent={null}
		>
			{Array.isArray(userList) &&
				userList.map((user) => {
					return (
						<Option value={user.id} key={user.id}>
							{user.name}
						</Option>
					);
				})}
		</Select>
	);
}

export default UserFuzzyQuery;
