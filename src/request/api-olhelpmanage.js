import expert from "./modules/olhelpManage/expert";
import expertPool from "./modules/olhelpManage/expertPool";
import common from "./modules/olhelpManage/common";
import bizParams from "./modules/olhelpManage/bizParams";
import stats from "./modules/olhelpManage/stats";
import robot from "./modules/olhelpManage/robot";
import guidePage from "./modules/olhelpManage/guidePage";
import sliderImage from "./modules/olhelpManage/sliderImage";
import guessManage from "./modules/olhelpManage/guessManage";
import interact from "./modules/olhelpManage/interact";
import expertInstitution from "./modules/olhelpManage/expertInstitution";
import classifyExpert from "./modules/olhelpManage/classifyExpert";
import home from "./modules/olhelpManage/home";
import classify from "./modules/olhelpManage/classify";
import officialService from "./modules/olhelpManage/officialService";
import classifyPage from "./modules/olhelpManage/classifyPage";
import route from "./modules/olhelpManage/route";
import consultEntrance from "./modules/olhelpManage/consultEntrance";
import landingPage from "./modules/olhelpManage/landingPage";
import tool from "./modules/olhelpManage/tool";
import forbid from "./modules/olhelpManage/forbid";
import user from "./modules/olhelpManage/user";
import specialLocation from "@/request/modules/olhelpManage/specialLocation";
import specialConsult from "@/request/modules/olhelpManage/specialConsult";
import consult from './modules/olhelpManage/consult';
import promotion from './modules/olhelpManage/promotion';
import appointment from './modules/olhelpManage/appointment';
import question from './modules/olhelpManage/question';
import usertype from './modules/olhelpManage/usertype';
import brand from './modules/olhelpManage/brand';
import brandType from './modules/olhelpManage/brandType';
import operate from './modules/olhelpManage/operate';
import rightDeduct from './modules/olhelpManage/rightDeduct';
import dataStatistics from "./modules/olhelpManage/dataStatistics";
import expertSchedule from "./modules/olhelpManage/expertSchedule";
import productPackage from "./modules/olhelpManage/productPackage";
import expertInquiryRecord from './modules/olhelpManage/expertInquiryRecord'
import clue from './modules/olhelpManage/clue'
import activity from './modules/olhelpManage/activity'
import consultRightConfig from './modules/olhelpManage/consultRightConfig'
import financialTaxConfigManage from './modules/olhelpManage/financialTaxConfigManage'
import warnningConfig from './modules/olhelpManage/warnningConfig';

let obj = {
    ...expert,
    ...expertPool,
    ...common,
    ...bizParams,
    ...stats,
    ...robot,
    ...guidePage,
    ...sliderImage,
    ...guessManage,
    ...interact,
    ...expertInstitution,
    ...classifyExpert,
    ...home,
    ...classify,
    ...officialService,
    ...classifyPage,
    ...route,
    ...consultEntrance,
    ...landingPage,
    ...tool,
    ...forbid,
    ...user,
    ...specialLocation,
    ...specialConsult,
    ...consult,
    ...promotion,
    ...appointment,
    ...question,
    ...usertype,
    ...brand,
    ...brandType,
    ...operate,
    ...rightDeduct,
    ...dataStatistics,
    ...expertSchedule,
    ...expertInquiryRecord,
    ...clue,
    ...productPackage,
    ...activity,
    ...consultRightConfig,
    ...financialTaxConfigManage,
    ...warnningConfig
};

const baseUrl = "/yypt-olhelp-manage";
Object.keys(obj).forEach((key) => {
    obj[key] =
        obj[key][0] === "/" ? baseUrl + obj[key] : baseUrl + "/" + obj[key];
});

export default obj;
