import { message } from 'dpl2-proxy';

// api接口数据转换成页面展示配置数据
export const toGetPageVersionListByApi = (apiData = []) => {
  const needVersionList = apiData.map((item) => {
    const newItem = {
      buttonName: item.buttonName,
      productVersionCode: item.productVersionCode,
    };
    const webConfigList = []; // 自定义的配置列表

    // 领域配置列表
    if(
      item.domainIdList
      && item.domainIdList.length > 0
    ) {
      webConfigList.push({
        webType: 'domain',        
        domainIdList: item.domainIdList || [], 
      })
    }

    // 产品维度配置
    if(
      item.brandGroupList
      && item.brandGroupList.length > 0
    ) {    
      item.brandGroupList.map((itemB) => {
        webConfigList.push({
          webType: 'brand',
          brandList: itemB.brandList,
          trueIdList: itemB.trueIdList,
          agentNameList: itemB.agentNameList,
        })
        return null;
      });
    }

    // 图片识别配置
    if(
      item.imageRecognitionList
      && item.imageRecognitionList.length > 0
    ) {    
      item.imageRecognitionList.map((itemC) => {
        webConfigList.push({
          webType: 'imageRecognition',
          brandList: itemC.brandList,
          trueIdList: itemC.trueIdList,
          agentNameList: itemC.agentNameList,
        })
        return null;
      });
    }

    newItem.webConfigList = webConfigList;
    return newItem;
  });

  console.info('needVersionList', needVersionList);

  return needVersionList;
}

// 当前页面数据配置校验
export const toCheckPageVersionList = async (pageVersionList = []) => {
  let isPass = true;

  const productVersionCodeList = pageVersionList.map(item => item.productVersionCode);
  // 找出重复版本
  const sameProductVersionCodeList = productVersionCodeList.filter((item, index) => productVersionCodeList.indexOf(item) !== index);
  const hasSameProductVersionCode = sameProductVersionCodeList.length > 0;

  if(hasSameProductVersionCode) {
    isPass = false;
    message.error('产品版本重复！');
    return isPass    
  }  

  // 同个版本-是否有多个领域配置
  let isHasSameDomainIdList = false;
  // 同个版本-产品维度配置-是否有相同的坐席账号配置
  let isHasSameTrueIdListByBrand = false;
  // 同个版本-图片识别配置-是否有相同的坐席账号配置
  let isHasSameTrueIdListByImageRecognition = false;
  // 图片识别配置多个，但是坐席账号有为空的提示
  let isHasSomeImageRecognitionTipByNoTrueId = false;

  pageVersionList.map((itemP) => {
    const webTypeArr = itemP.webConfigList.map(item => item.webType);
    // 同个版本-领域配置类型数量
    let domainIdListNum = 0;
    webTypeArr.map((itemM) => {
      if (itemM === 'domain') {
        domainIdListNum += 1;
      }
      return null;
    });

    if (domainIdListNum > 1) {
      isHasSameDomainIdList = true;
    }

    let allTrueIdList = []
    const webConfigList = itemP.webConfigList.filter(item => item.webType === 'brand');
    webConfigList.map((itemZ) => {
      const itemZTrueIdList = itemZ.trueIdList || []
      allTrueIdList = [...allTrueIdList, ...itemZTrueIdList];
      return null;
    });

    // 同个版本-产品维度配置trueIdList-是否有重复
    const isRepeatTrueId = allTrueIdList.filter((item, index) => allTrueIdList.indexOf(item) !== index).length > 0;
    if (isRepeatTrueId) {
      isHasSameTrueIdListByBrand = isRepeatTrueId;
    }


    let allTrueIdList2 = []
    const webConfigList2 = itemP.webConfigList.filter(item => item.webType === 'imageRecognition');
    webConfigList2.map((itemM) => {
      // 图片识别配置多个，但有坐席账号有为空
      if (webConfigList2.length > 1){
        if (itemM.trueIdList.length === 0) {
          isHasSomeImageRecognitionTipByNoTrueId = true;
        }
      }
      const itemMTrueIdList = itemM.trueIdList || []
      allTrueIdList2 = [...allTrueIdList2, ...itemMTrueIdList];
      return null;
    });

    // 同个版本-产品维度配置trueIdList-是否有重复
    const isRepeatTrueId2 = allTrueIdList2.filter((item, index) => allTrueIdList2.indexOf(item) !== index).length > 0;
    if (isRepeatTrueId2) {
      isHasSameTrueIdListByImageRecognition = isRepeatTrueId2;
    }    

    return null;
  })

  // 同个版本-产品维度-相同坐席账号
  if(isHasSameTrueIdListByBrand) {  
    isPass = false;
    message.error('同一产品版本下，存在坐席账号有多个产品维度配置');
    return isPass        
  }

  // 同个版本-图片识别-相同坐席账号
  if(isHasSameTrueIdListByImageRecognition) {  
    isPass = false;
    message.error('同一产品版本下，存在坐席账号有多个图片识别配置');
    return isPass        
  }  

  // 同个版本-图片识别多个，坐席账号必须配置
  if(isHasSomeImageRecognitionTipByNoTrueId) {  
    isPass = false;
    message.error('同一产品版本下，图片识别配置有多个时，坐席账号不能为空');
    return isPass        
  }

  // 同个版本-是否有多个领域配置
  if(isHasSameDomainIdList) {  
    isPass = false;
    message.error('同一产品版本下，有重复的领域配置');
    return isPass        
  }  

  return isPass;
}

// 页面展示配置数据转换api接口数据
export const toGetApiVersionListByPage = (pageVersionList = []) => {
  const apiVersionList = pageVersionList.map((item) => {
    const newItem = {
      buttonName: item.buttonName,
      productVersionCode: item.productVersionCode,
    };
    const webConfigList = item.webConfigList || []; // 自定义的配置列表

    let domainIdList = [];
    let brandGroupList = [];
    let imageRecognitionList = [];

    webConfigList.map((subItem) => {
      // 领域配置
      if (subItem.webType === 'domain') {
        domainIdList = subItem.domainIdList || [];
      }

      // 产品维度配置
      if (subItem.webType === 'brand') {
        brandGroupList.push({
          brandList: subItem.brandList,
          trueIdList: subItem.trueIdList,
          agentNameList: subItem.agentNameList,
        })
      }  
      
      // 图片识别配置
      if (subItem.webType === 'imageRecognition') {
        imageRecognitionList.push({
          brandList: subItem.brandList,
          trueIdList: subItem.trueIdList,
          agentNameList: subItem.agentNameList,
        })
      }

      return null;
    });
    newItem.domainIdList = domainIdList;
    newItem.brandGroupList = brandGroupList;
    newItem.imageRecognitionList = imageRecognitionList;
    
    return newItem;
  })
  
  return apiVersionList;
}
