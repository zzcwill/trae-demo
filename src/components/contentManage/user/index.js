import React, { useState, useEffect } from "react";
import { Select } from "dpl-react";
import { get } from "@/request/request";
import Api from "@/request/api";
import debounce from "lodash/debounce";
import sessionStorageHelp from "@/utils/sessionStorage";
import MultipleSelectRender from "../common/multipleSelectRender";
const Option = Select.Option;
const userOptionsRender = arr => {
  return arr.map(item => {
    return (
      <Option key={item.id} value={item.id}>
        {item.userName}
      </Option>
    );
  });
};
export default function User(props) {
  const { other, onChange, value } = props;
  const [user, setUser] = useState([]); // 人员
  const getUser = debounce(async (keyword = undefined) => {
    const data = await get({
      url: Api.userFuzzyQuery,
      params: { userName: keyword }
    });
    if (data.success) {
      setUser(data.data);
    } else {
      setUser([]);
    }
  }, 300);
  return (
    <MultipleSelectRender
      item={other}
      children={userOptionsRender(user)}
      useFilter={false}
      onSearch={getUser}
      onChange={onChange}
      value={value}
    />
  );
}
