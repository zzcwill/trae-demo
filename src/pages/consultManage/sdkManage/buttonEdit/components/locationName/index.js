import React, { useEffect, useState } from "react";
import "./index.scss";

export default function LocationName(props) {
  const { value, locationMap } = props;
  const [locationName, setLocationName] = useState(""); // 配置地区名称
  // 获取到地区配置信息
  useEffect(() => {
    // 转换地区code为名称
    if (value) {
      const list = value.split(",");
      let nameList = [];
      if (Array.isArray(list) && list.length > 0) {
        list.forEach((item) => {
          const locationItem = locationMap[item];
          if (locationItem) {
            nameList.push(locationItem.name)
          }
        });
      }
      setLocationName(nameList.join(','));
    }
  }, [value]);
  return (
    <div className="location-info-box">
      <span>{locationName || "全部地区"}</span>
    </div>
  );
}
