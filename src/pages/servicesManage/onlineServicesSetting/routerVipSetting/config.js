export const modalType = {
  add: {
    type: "add",
    name: "新增",
  },
  edit: {
    type: "edit",
    name: "修改",
  },
};

export const tagTypeMap = {
  company:{
    label: "企业",
    value: "company",
    list:[],
  },
  person:{
    label: "个人",
    value: "person",
    list:[],
  },
  agency:{
    label: "中介",
    value: "agency",
    list:[],
  },
  companyGroup:{
    label: "企业分群",
    value: "companyGroup",
    list:[],
  },
  agencyGroup:{
    label: "机构分群",
    value: "agencyGroup",
    list:[],
  },
  personGroup:{
    label: "个人分群",
    value: "personGroup",
    list:[],
  }  
}

export const tagTypeList = Object.keys(tagTypeMap).map((key)=>{
  return tagTypeMap[key]
})
export const taxType = [
  {
    label: "国税",
    value: "nation",
  },
  {
    label: "地税",
    value: "local",
  },
];
