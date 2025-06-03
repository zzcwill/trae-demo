import React from "react";
import "./index.scss";
import HandleTaxSvg from "./components/handleTaxSvg";
import payImg from "./images/pay.svg";
import billImg from "./images/bill.svg";
import financeDealImg from "./images/financeDeal.svg";
import formImg from "./images/form.png";
import newPolicyImg from "./images/newPolicy.png";
import policySearchImg from "./images/policySearch.svg";
import { Button } from "dpl-react";
const imgUrlList = [
  newPolicyImg, // 疫情新政
  formImg, // 报表填写
  financeDealImg, // 财务处理
  payImg, // 汇算清缴
  policySearchImg, // 政策查询
  billImg, // 发票实务
];

function HandleTaxCard(props) {
  const { data } = props;
  return (
    <div className="handle-tax-card">
      <div className="title">
        办税咨询
        <div className='line'></div>
        <HandleTaxSvg />
      </div>
      <div className="img">
        <img src={data.imageUrl} />
      </div>
      <div className="content">
        {data.consultContentList.length > 0 &&
          data.consultContentList.map((item, index) => {
            return (
              <div className="content-item">
                <div className="left">
                  <img src={imgUrlList[index]} />
                </div>
                <div className="right">
                  <div className="title">{item.title}</div>
                  <div className="intro">{item.introduction}</div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="search-button">
        <Button type="primary" className='search-button-item'>开始咨询</Button>
      </div>
    </div>
  );
}
export default React.forwardRef(HandleTaxCard);
