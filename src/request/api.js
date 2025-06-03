import classify from "./modules/askone/classify";
import common from "./modules/askone/common";
import label from "./modules/askone/label";
import user from "./modules/askone/user";
import question from "./modules/askone/question";
import reply from "./modules/askone/reply";
import home from "./modules/askone/home";
import currect from "./modules/askone/correct";
import course from "./modules/askone/course";
import dimension from "./modules/askone/dimension";
import questionCollect from './modules/askone/questionCollect'

let obj = {
    ...classify,
    ...common,
    ...label,
    ...user,
    ...question,
    ...reply,
    ...home,
    ...currect,
    ...course,
    ...questionCollect,
    ...dimension
}

const baseUrl = "/askonemanage"
Object.keys(obj).forEach(key => {
    obj[key] = obj[key][0] === '/' ? baseUrl + obj[key] : baseUrl + '/' + obj[key]
})
export default obj

