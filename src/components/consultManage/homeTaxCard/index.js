import React from "react";
import "./index.scss";
import BasicIconSvg from "./components/basicIconSvg";
import CheckCircleSvg from "./components/checkCircleSvg";
import ExpertIconSvg from "./components/expertIconSvg";
import classnames from "classnames";
import { Tag } from "dpl-react";

const taxTypeEnum = {
  basic: {
    value: "1",
    name: "基础财税咨询",
    icon: BasicIconSvg,
  },
  expert: {
    value: "0",
    name: "专家财税咨询",
    icon: ExpertIconSvg,
  },
};

function HomeTaxCard(props) {
  const { desc, data } = props;

  const iconColor = () => {
    return classnames({
      right: true,
      expert: data.type === taxTypeEnum.expert.value,
      basic: data.type === taxTypeEnum.basic.value,
    });
  };
  return (
    <div className="home-tax-box">
      <div className="content">
        <div className="left">
          <img src={data.imageUrl} />
        </div>
        <div className={iconColor()}>
          <div className="title">
            <span>
              {data.type === taxTypeEnum.basic.value
                ? taxTypeEnum.basic.name
                : taxTypeEnum.expert.name}
            </span>
            <div className="line"></div>
            {data.type === taxTypeEnum.basic.value ? (
              <taxTypeEnum.basic.icon />
            ) : (
              <taxTypeEnum.expert.icon />
            )}
          </div>
          <div className="time">
            <span>人工受理时间&nbsp;:&nbsp;</span>
            <span>{desc.time}</span>
          </div>
          <div className="description">
            <span>{desc.description}</span>
          </div>
          {desc.introductionList.length > 0 &&
            desc.introductionList.map((item) => {
              return (
                <div className="intro">
                  <div className="intro-icon">
                    <CheckCircleSvg />
                  </div>
                  <div className="line"></div>
                  <span>{item}</span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="limit">
        <span className="label">咨询服务范围</span>
        <div className="line"></div>
        {desc.keywordList.length > 0 &&
          desc.keywordList.map((item, index) => {
            return (
              <Tag key={index} className="linit-tag-item">
                {item}
              </Tag>
            );
          })}
      </div>
    </div>
  );
}
export default React.forwardRef(HomeTaxCard);
