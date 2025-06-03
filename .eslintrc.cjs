/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:import/warnings',
    'plugin:vue/essential',
    'prettier',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': ['error', require('./.prettierrc.js')],
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-named-as-default': 'off'
  }
};
