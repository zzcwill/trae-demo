import React, { useRef, useEffect, useState } from "react";
import "./index.scss";
import classnames from "classnames";
import { extraSiteTypeMap } from "../../config";
export default function LandingCard(props) {
  const {
    title,
    extra,
    children,
    extraSiteType = extraSiteTypeMap.center,
  } = props;
  const extraClass = classnames({
    "landing-card-head-extra": true,
    "landing-card-head-extra-center": extraSiteType === extraSiteTypeMap.center,
    "landing-card-head-extra-right": extraSiteType === extraSiteTypeMap.right,
  });
  const titleRef = useRef(null);
  const [extraRight, setExtraRight] = useState(null);

  useEffect(() => {
    if (titleRef.current) {
      setExtraRight(titleRef.current.clientWidth);
    }
  }, []);
  return (
    <div className="landing-card-box">
      <div className="landing-card-head">
        {title && (
          <div className="landing-card-head-title" ref={titleRef}>
            {title}
          </div>
        )}
        <div
          className={extraClass}
          style={
            extraSiteType === extraSiteTypeMap.center
              ? { paddingRight: extraRight }
              : {}
          }
        >
          {extra}
        </div>
      </div>
      <div className="landing-card-">{children}</div>
    </div>
  );
}
