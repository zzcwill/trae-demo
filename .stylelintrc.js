/*
 * @Author: zhaoyan zy7199@servyou.com.cn
 * @Date: 2023-06-12 18:49:07
 * @LastEditors: zhaoyan zy7199@servyou.com.cn
 * @LastEditTime: 2024-01-08 18:39:59
 * @FilePath: /askone-manage-pc/.stylelintrc.js
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
// Css  rules: https://github.com/stylelint/stylelint/blob/main/docs/user-guide/rules/list.md
// Scss rules: https://github.com/stylelint-scss/stylelint-scss#list-of-rules
const getStylelintConfig = require('hylia-plugin-app/config/getStylelintConfig');

module.exports = getStylelintConfig({
  rules: {
    "block-no-empty": null,
  },
});
