/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-08-07 17:29:41
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-01-08 14:48:10
 * @FilePath: /askone-manage-pc/src/request/api-callcentermanage.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import org from "./modules/callcenterManage/org";
import common from "./modules/callcenterManage/common";
import group from "./modules/callcenterManage/group";
import agent from "./modules/callcenterManage/agent";
import user from "./modules/callcenterManage/user";
import blackList from "./modules/callcenterManage/blackList";
import extNumber from "./modules/callcenterManage/extNumber";
import consultMatter from "./modules/callcenterManage/consultMatter";
import email from "./modules/callcenterManage/email";
import internalData from "./modules/callcenterManage/internalData";
import monitor from "./modules/callcenterManage/monitor";
import workTime from "./modules/callcenterManage/workTime";
import specialDay from "@/request/modules/callcenterManage/specialDay";
import resourcePool from "@/request/modules/callcenterManage/resourcePool";
import isdConfig from "@/request/modules/callcenterManage/isdConfig";
import smart from "./modules/callcenterManage/smart";
import systemParams from "./modules/callcenterManage/systemParams";
import isd from "./modules/callcenterManage/isd";

let obj = {
  ...org,
  ...common,
  ...group,
  ...agent,
  ...user,
  ...blackList,
  ...extNumber,
  ...consultMatter,
  ...email,
  ...internalData,
  ...monitor,
  ...workTime,
  ...specialDay,
  ...resourcePool,
  ...isdConfig,
  ...smart,
  ...systemParams,
  ...isd
};

const baseUrl = "/callcentermanage";
Object.keys(obj).forEach((key) => {
  obj[key] =
    obj[key][0] === "/" ? baseUrl + obj[key] : baseUrl + "/" + obj[key];
});

export default obj;
