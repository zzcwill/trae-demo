import bossPermission from './modules/consultright/bossPermission'


let obj = {
  ...bossPermission
};

const baseUrl = "/consultright";
Object.keys(obj).forEach((key) => {
  obj[key] =
      obj[key][0] === "/" ? baseUrl + obj[key] : baseUrl + "/" + obj[key];
});

export default obj;
