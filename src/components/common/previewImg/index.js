import React, { useState, useEffect } from "react";
import openSwipe from "@/utils/photoSwipe/index";
import classnames from "classnames";

export default function PreviewImg(props) {
  // 单张src为image对应url
  // 多张src为数组 [{imageUrl,name},{imageUrl,name}]
  const { src, width = 100, marginRight = 10, className } = props;

  const [imgList, setImgList] = useState([])
  useEffect(() => {
    if (Array.isArray(src)) {
      setImgList(src)
    } else {
      setImgList([{
        imageUrl: src,
        name: "图片名称"
      }]);
    }
  }, [src]);
  const imgClass = classnames({
    [className]: className,
  });

  return (
    <div>
      {imgList && imgList.map((item, index) => (
        <img
          key={item.imageUrl}
          style={{ cursor: 'pointer', display: 'inline-block', marginRight: marginRight, width: width }}
          // className={imgClass}
          src={item.imageUrl}
          alt="图片"
          onClick={() => {
            openSwipe(
              imgList,
              index
            );
          }}
        />
      ))}
    </div>
  );
}
