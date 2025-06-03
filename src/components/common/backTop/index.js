import React, { useState, useEffect } from "react";
import "./index.scss";
import { Icon } from "dpl-react";

export default function BackTop(props) {
  const { target } = props;
  const [isShow, setIsShow] = useState(false);
  const toTop = () => {
    try {
      if (target) {
        target.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (e) {
      if (target) {
        target.scrollTop = 0;
      } else {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      }
    }
  };

  useEffect(() => {
    if (target) {
      target.onscroll = () => {
        const clientHeight = target.clientHeight || target.clientHeight;
        const scrollTop = target.scrollTop || target.scrollTop;
        setIsShow(scrollTop >= clientHeight);
      };
    } else if(target === document.body) {
      window.onscroll = () => {
        const clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        setIsShow(scrollTop >= clientHeight);
      };
    }
  }, [target]);

  return (
    <>
      {isShow && (
        <div className='back-top' onClick={toTop}></div>
      )}
    </>
  );
}
