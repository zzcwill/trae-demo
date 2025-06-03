const env = process.env.PHOENIX_BUILD_ENV;
const cdnMap = {
  test: 'https://test-s.17win.com',
  release: 'https://release-s.17win.com',
  beta: 'https://pre-s.17win.com',
  uat: 'https://pre-s.17win.com',
  pre: 'https://pre-s.17win.com',
  production: 'https://s.17win.com',
  prod: 'https://s.17win.com',
}

let config = {
  entryList: [
    {
      name: "index",
      path: "index.js",
      templatePath: "index.html"
    },
  ],
  alias: {
  //  'react-dom':'@hot-loader/react-dom/cjs/react-dom.production.min.js'
  },
  staticDirMappings: {
    "/askone-manage-pc/ueditor": 'public/ueditor'
  },
  publicPath:'/askone-manage-pc',
  theme:'assets/styles/theme.less',
  CDN: cdnMap[env],
}
/*TODO:修改配置*/
if(process.env.PHOENIX_BUILD_ENV !== "development"){
  config.staticDirMappings={
    "/ueditor" : 'public/ueditor',
  }
}
module.exports = config
