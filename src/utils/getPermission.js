import Api from "@/request/api";
import { get } from "@/request/request";

let permissionPromise = null;
let rolePromise = null;
let userPromise = null;
let contentManageCommonOptionsPromise = null;
export default function () {
  if (permissionPromise) return permissionPromise;
  permissionPromise = new Promise((resolve, reject) => {
    get({ url: Api.getPermissionList }).then((data) => {
      if (data.success) {
        let result = [];
        data.data.roleList.forEach((item) => {
          result = result.concat(item.permissionList);
        });
        result = result.concat(data.data.permissionList);
        resolve(result);
      } else {
        reject();
        permissionPromise = null;
      }
    });
  });
  return permissionPromise;
}

export function getRole() {
  if (rolePromise) return rolePromise;
  rolePromise = new Promise((resolve, reject) => {
    get({ url: Api.getPermissionList }).then((data) => {
      if (data.success) {
        resolve(data.data.roleList);
      } else {
        reject();
        rolePromise = null;
      }
    });
  });
  return rolePromise;
}

export function getCurrentUser() {
  if (userPromise) return userPromise;
  userPromise = new Promise((resolve, reject) => {
    get({
      url: Api.getCurrentUser,
    }).then((data) => {
        console.info('getCurrentUser', data.data)
        if (data.success) {
          resolve(data.data);
        } else {
          userPromise = null;
        }
      })
      .catch(() => {
        reject();
        userPromise = null;
      });
  });
  return userPromise;
}

export function getContentManageCommonOptions() {
  if (contentManageCommonOptionsPromise)
    return contentManageCommonOptionsPromise;
  contentManageCommonOptionsPromise = new Promise((resolve, reject) => {
    get({
      url: Api.getCommonOptions,
      params: {
        groupNames:
          "OPERATOR_TYPE,audit_unpass_reason,CORRECT_REASON,CORRECT_OPERATOR",
      },
    })
      .then((data) => {
        if (data.success) {
          resolve(data);
        } else {
          contentManageCommonOptionsPromise = null;
        }
      })
      .catch(() => {
        reject();
        contentManageCommonOptionsPromise = null;
      });
  });
  return contentManageCommonOptionsPromise;
}
