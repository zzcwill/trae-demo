/**
 * TODO 2020年8月27日去除了路由，HomePageComponent组件调整
 */
import React, { useState, useEffect } from "react";
import "./index.scss";
import { message, Modal } from "dpl-react";
import { get, post } from "@/request/request";
import Api from "@/request/api-olhelpmanage";
import { valueChangeTypeEnum } from "./config";
import HomePageComponent from "@/components/consultManage/homePageComponent";
import { configTypeMap } from "@/const/config";
// 默认的banner配置
const defaultBannerObj = {
  imageName: null,
  imageUrl: null,
  jumpUrlName: null,
  jumpUrl: null,
  orderNum: null,
};
// banner的数量
const defaultBannerLength = 3;
export default function HomePageConfig(props) {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // 获取配置信息
  const getConfig = async () => {
    const res = await get({
      url: Api.getHomePageConfig,
      params: {
        configType: configTypeMap.default,
      },
    });
    if (res.success) {
      const data = Object.assign({}, res.data);
      let list = [];
      if (data.bannerImageList) {
        for (let i = 0; i < defaultBannerLength; i++) {
          const obj = Object.assign({}, data.bannerImageList[i]);
          if (obj.imageUrl) {
            delete obj.id;
            list.push(obj);
          } else {
            list.push(
              Object.assign({}, defaultBannerObj, {
                orderNum: i + 1,
              })
            );
          }
        }
      } else {
        for (let i = 0; i < defaultBannerLength; i++) {
          list.push(defaultBannerObj);
        }
      }
      data.bannerImageList = list;
      setFormData(data);
    } else {
      message.error(res.message);
    }
  };

  // 发布
  const publish = () => {
    const data = checkData();
    if (!data) {
      return;
    }
    Modal.confirm({
      title: (
        <div style={{ paddingLeft: "50px" }}>
          <p>
            <span>正在将编辑后的主页发布到生产环境</span>
          </p>
          <span style={{ color: "#D9001B" }}>该操作将会对用户产生影响</span>
          <p>
            <span style={{ color: "#999999" }}>你还要继续吗？</span>
          </p>
        </div>
      ),
      okText: "确认",
      cancelText: "取消",
      wait: true,
      onOk: () => {
        return new Promise((resolve) => {
          try {
            updateHomePageConfig(data);
            resolve();
          } catch (e) {
            console.error(e);
            message.error("系统出错请联系管理员！");
            resolve();
          }
        });
      },
    });
  };

  // 检查数据
  const checkData = () => {
    let result = {};
    let bannerImageList = [];
    let index = 1;
    for (let i = 0, len = formData.bannerImageList.length; i < len; i++) {
      const item = formData.bannerImageList[i];
      if (i === 0 && !item.imageUrl) {
        message.warning(`Banner图${i + 1}不能为空！`);
        return;
      }
      if (item.imageUrl) {
        bannerImageList.push({
          imageName: item.imageName,
          imageUrl: item.imageUrl,
          jumpUrlName: item.jumpUrlName,
          jumpUrl: item.jumpUrl,
          orderNum: index,
        });
        index++;
      }
    }
    result.bannerImageList = bannerImageList;
    return result;
  };

  // 修改
  const updateHomePageConfig = async (data) => {
    setLoading(true);
    try {
      const res = await post({
        url: Api.postUpdateHomePageConfig,
        data,
      });
      if (res.success) {
        message.success("发布成功！");
        getConfig();
      } else {
        message.error(res.message);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  // 数据改变
  const onValueChange = (type, data) => {
    let obj = Object.assign({}, formData);
    switch (type) {
      case valueChangeTypeEnum.banner:
        let bannerImageList = [].concat(obj.bannerImageList);
        bannerImageList[data.index] = data.value;
        obj.bannerImageList = bannerImageList;
        break;
      default:
        break;
    }
    setFormData(obj);
  };
  const buttonList = [
    {
      name: "发布",
      onClick: publish,
    },
  ];

  useEffect(() => {
    getConfig();
  }, []);

  return (
    <div className="home-page-manage">
      <HomePageComponent
        loading={loading}
        formData={formData}
        buttonList={buttonList}
        valueChangeTypeEnum={valueChangeTypeEnum}
        onValueChange={onValueChange}
      />
    </div>
  );
}
