import React, { useState, useEffect, useImperativeHandle } from "react";
import CorrectSeaarch from "../common/correctSeaarch";
import CascaderRender from "../common/cascaderRender";
import OperatorSelect from "../common/operatorSelect";
import { get } from "@/request/request";
import Api from "@/request/api";
import { Select } from "dpl-react";
import debounce from "lodash/debounce";
import sessionStorageHelp from "@/utils/sessionStorage";
import { getContentManageCommonOptions } from "@/utils/getPermission";
const Option = Select.Option;

const defaultOptionMap = {
  id: "id",
  name: "name",
  key: "id",
};

const optionsRender = (arr, map = defaultOptionMap) => {
  return arr.map((item) => {
    return (
      <Option key={item[map.key]} value={item[map.id]}>
        {item[map.name]}
      </Option>
    );
  });
};

const userOptionsRender = (arr) => {
  return arr.map((item) => {
    return (
      <Option key={item.id} value={item.id}>
        {item.userName}
      </Option>
    );
  });
};

let userType = []; // 人员类型
let auditUserType = []; // 纠错查询操作人类型
let correctType = []; // 纠错原因
let auditState = [
  {
    value: null,
    label: "全部",
  },
  {
    value: "0",
    label: "未审核",
  },
  {
    value: "1",
    label: "审核通过",
  },
  {
    value: "2",
    label: "审核未通过",
    children: [],
  },
]; // 审核状态

const getCommonOptions = async () => {
  const map = {
    CORRECT_OPERATOR: (value) => {
      value.unshift({
        id: "all",
        name: "全部类型",
      });
      auditUserType = [].concat(value);
    },
    OPERATOR_TYPE: (value) => {
      userType = [].concat(value);
    },
    audit_unpass_reason: (value) => {
      let result = [{ value: null, label: "全部" }];
      value.forEach((item) => {
        result.push({ value: item.id, label: item.name });
      });
      auditState[3].children = [].concat(result);
    },
    CORRECT_REASON: (value) => {
      value.unshift({
        id: "all",
        name: "全部纠错类型",
      });
      correctType = [].concat(value);
    },
  };
  const data = await getContentManageCommonOptions();
  if (data.success) {
    data.data.forEach((item) => {
      const fn = map[item.groupName];
      fn && fn(item.options);
    });
  }
};
getCommonOptions();

// 审核检索
function Auditor(props) {
  const { value, onChange, other } = props;
  return (
    <CorrectSeaarch
      selectChildren={optionsRender(correctType)}
      item={other}
      value={value}
      onChange={onChange}
    />
  );
}

// 审核状态
function Audit(props) {
  const { value, onChange, other } = props;
  return (
    <CascaderRender
      item={other}
      options={auditState}
      changeOnSelect={false}
      value={value}
      onChange={onChange}
    />
  );
}

// 操作人
function Operator(props) {
  const { value, onChange, other } = props;

  const [user, setUser] = useState([]); // 人员

  const getUser = debounce(async (keyword = undefined) => {
    const data = await get({
      url: Api.userFuzzyQuery,
      params: { userName: keyword },
    });
    if (data.success) {
      setUser(data.data);
    } else {
      setUser([]);
    }
  }, 300);

  return (
    <OperatorSelect
      selectChildren={optionsRender(userType)}
      multipleChildren={userOptionsRender(user)}
      item={other}
      onSearch={getUser}
      value={value}
      onChange={onChange}
    />
  );
}

// 纠错操作人
function AuditUser(props) {
  const { value, onChange, other } = props;
  const [user, setUser] = useState([]); // 人员

  const getUser = debounce(async (keyword = undefined) => {
    const data = await get({
      url: Api.userFuzzyQuery,
      params: { userName: keyword },
    });
    if (data.success) {
      setUser(data.data);
    } else {
      setUser([]);
    }
  }, 300);
  return (
    <OperatorSelect
      selectChildren={optionsRender(auditUserType)}
      multipleChildren={userOptionsRender(user)}
      item={other}
      onSearch={getUser}
      value={value}
      onChange={onChange}
    />
  );
}
const CommonOptions = {
  Auditor,
  Audit,
  Operator,
  AuditUser,
};
export default CommonOptions;
