// eslint-disable-next-line import/no-extraneous-dependencies
const getBabelConfig = require('hylia-plugin-app/config/getBabelConfig');

module.exports = getBabelConfig({
  babelPresetEnvOptions: {},
  presets: [],
  plugins: [
    ["transform-modules", {
      "dpl-react": {
        "transform": "dpl-react/npm/components/${member}",
        "preventFullImport": true,
        "camelCase": true,
        "kebabCase": true
      }
    }]
  ],
});
