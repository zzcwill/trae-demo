import React, { useEffect, useRef, useState } from 'react';
import { message, Select } from 'dpl-react';
import CallCenterManageApi from '@/requestApi/callcentermanage/api';
import { debounce } from 'lodash';

const { Option } = Select;
const valueFarmatDefault = {
  // 跟查询接口强绑定的字段
  value: 'trueId',
  label: 'userName',
};

function UserFuzzyQuery(props) {
  // 目前只支持两种 object 或者 id，因为组件内部逻辑强耦合id以及完整的oject，改造成本大
  const {
    onChange,
    value,
    maxTagCount = 3,
    maxCount,
    maxMssage = '超过最大数量限制，请重新选择',
    resultType = 'object', // 有默认值的编辑框里面传object，其他传id
    allowClear = true,
    mode,
    delay = 500, // 查询防抖
    style = { width: '100%' },
    valueFarmat = valueFarmatDefault,
    ...otherProps
  } = props;
  
  const multiple = mode === 'multiple';
  const [userList, setUserList] = useState([]);
  const [isFirst, setIsFirst] = useState(true); // 第一次进入
  const requestUsersByKeyword = async (keyword) => {
    if (!keyword || !keyword.trim()) {
      return [];
    }
    try {
      const res = await CallCenterManageApi.getUserFuzzyQuery({
        keyword: keyword.trim(),
      });
      if (res.success && Array.isArray(res.data)) {
        return res.data;
      }
      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  /**
	 * 搜索
	 */
  const selectOnSearch = debounce((val = '') => {
    requestUsersByKeyword(val).then((list) => {
      const pushMap = {};
      const newList = [];
      if (multiple) {
        // 多选
        let valueIds;

        if (resultType === 'object') {
          valueIds = value?.map((item) => item[valueFarmat?.value]);
        } else {
          valueIds = value;
        }
        // 用一个map来去重
        userList?.forEach((employee) => {
          if (valueIds?.includes(employee?.[valueFarmat?.value])) {
            // 这边把选中的项从userList里面拿出来
            newList.push(employee);
            pushMap[employee[valueFarmat?.value]] = employee;
          }
        });
        list.forEach((employee) => {
          if (!pushMap[employee[valueFarmat?.value]]) {
            newList.push(employee);
          }
        });
        setUserList(newList);
      } else {
        setUserList(list); // 单选直接用请求到的数据
      }
    });
  }, delay);

  /**
	 * 修改
	 */
  const selectOnChange = (e) => {
    if (multiple && maxCount !== undefined && e?.length > maxCount) {
      message.warn(maxMssage);
      return false;
    }
    if (resultType === 'object') {
      const items = userList?.filter((employee) => e?.includes(employee?.[valueFarmat?.value]));
      onChange?.(multiple ? items : items[0]);
    } else {
      onChange?.(e);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const firstRequest = async (searchValue) => {
    if (resultType === 'object') {
      // const keyNames = Array.isArray(searchValue)
      //   ? searchValue?.map((item) => item[valueFarmat?.label])
      //   : searchValue[valueFarmat?.label];
      // // 假如是数组就Promise.all将结果合并
      // let endList = [];
      // if (Array.isArray(keyNames)) {
      //   const list = await Promise.all(keyNames.map((key) => requestUsersByKeyword(key)));
      //   endList = list.reduce((pre, cur) => pre.concat(cur), []); // 第一次的时候合并一次起始数组
      // } else {
      //   endList = await requestUsersByKeyword(keyNames);
      // }
      // setUserList(endList);
      setUserList(Array.isArray(searchValue) ? [...searchValue] : [searchValue]);
    }

    setIsFirst(false);
  };

  useEffect(() => {
    if (isFirst && value) {
      firstRequest(value);
    }
  }, [value]);
  return (
    <Select
      {...otherProps}
      showSearch
      value={
				resultType === 'object' && value
				  ? Array.isArray(value)
				    ? value?.map((item) => item[valueFarmat?.value])
				    : value[valueFarmat?.value]
				  : value
			}
      allowClear={allowClear}
      mode={mode}
      maxTagCount={maxTagCount}
      style={style}
      filterOption={false}
      defaultActiveFirstOption={false}
      onSearch={selectOnSearch}
			// onSelect={selectOnSelect}
      virtual
      onChange={selectOnChange}
      notFoundContent={null}
    >
      {Array.isArray(userList)
				&& userList.map((item) => {
				  return (
  <Option key={item[valueFarmat?.value]} value={item[valueFarmat?.value]}>
    {item[valueFarmat?.label]}
  </Option>
				  );
				})}
    </Select>
  );
}

export default UserFuzzyQuery;
