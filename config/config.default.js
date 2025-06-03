const cdnTools = require('@afe/cdn-tools');

module.exports = () => {
  return {
    extends: [
      'recommended',
      '@afe/hylia-config-recommended',
      "@afe/hylia-config-dpl2-split"
    ],
    plugins: [
      'less',
      'resolve-fallback',
      "@afe/hylia-plugin-module-federation-internal",
      // 个性化功能，可以在此工程级别的插件内实现（如修改webpack配置），包括将来可能会发布为npm包的插件也可以在此渐进式开发
      './plugin-custom',
    ],
    pluginsOptions: {
      'dev-refresh': {
        options: {
          ignoreRuntimeErrors: true,
        },
      },
      'module-federation-internal': {
        options: {
          // 注意： 请把package.json中name字段的值改为标准的appCode，否则消费方设置的appCode将匹配不到你的模块！！
          exposes: {
            // module1和module2只是举个例子，可以自定义, 文件后缀可省略，可支持自动查找js, jsx, ts, tsx
            'consultRecordList': './src/components/consultRecordList/index.js', // 咨询记录列表 本地地址http://local.sit.91lyd.com:3000/askone-manage-pc/moduleFederationEntry.js
            'createCallBackTodo': './src/components/createCallBackTodo/index.js', // 创建回访待办
          },
        },
      },
      "dpl2-split": {
        options: {
          dplProxyPackageName: 'dpl2-proxy',
          dplSplitPackageNameScope: '@dpl2',
          // dpl样式隔离的前缀，默认为：dpl2
          dplPrefixRoot: "dpl2",
          enableImportDplResetStyle: false,
          // 默认关闭组件共享，降低接入成本，如有性能优化需求，开启后，需对mf、chunk打包等进行额外配置，详情咨询dpl小组
          moduleFederationShared: false,
        },
      },
      less: {
        options: {
          enableSourceMap: false,
          lessOptions: {
            javascriptEnabled: true
          }
        }
      },
      'resolve-fallback': {
        options: {
          fallback: {
            path: require.resolve('url'),
          },
        },
      },
      app: {
        options: {
          publicPath: cdnTools.getPublicPath(true) || '/askone-manage-pc/',
          circularDependencyDetectOptions: {
            failOnError: false,
          },
          enableStylelint: false,
          devServerPort: 3000,
          alias: {},
          proxy: {
            // "/askonemanage/**": "http://10.202.0.27:8080", //胡佳
            // "/askonemanage/**": "http://10.202.0.15:9080", //海枫
            // "/askonemanage/**": "http://10.202.3.5:8080", //文杰
            "/askonemanage/**": {
              // target: "http://askonemanage.consult-test.sit.91lyd.com",
              target: "http://askonemanage.consult2-test.sit.91lyd.com",
              changeOrigin: true,
            },
            "/callcenterweb/**": {
              target: 'http://callcenterweb.consult-test.sit.91lyd.com',
              // target: 'http://callcenterweb.consult2-test.sit.91lyd.com',
              // target: 'http://pre-callcenter.dc.servyou-it.com',
              changeOrigin: true,
            },
            // "/askonemanage/**": "http://10.212.167.158:8080",
            // "/askonemanage/**": " http://askonemanage.servyou-release.devops.91lyd.com" // release
            //  "/callcentermanage/**":"http://10.201.10.53:8180", // 文杰
            // "/callcentermanage/**": "http://10.202.0.11:8083", // 谢钦杰
            // "/callcentermanage/**":"http://10.200.2.113:8080", // 智林
            // "/callcentermanage/**":"http://10.200.81.219:8030", // 兰兰
            "/callcentermanage/**": {
              // target: "http://callcentermanage.consult-test.sit.91lyd.com",
              target: "http://callcentermanage.consult2-test.sit.91lyd.com",
              // target: 'http://pre-callcentermanage.dc.servyou-it.com',
              // target: "http://10.200.119.215:8080", // zhihui
              // target: "http://10.200.118.108:8030",
              // target: "http://10.200.118.135:38086", // xbc
              // target: "http://10.200.119.244:9093", // yurui
              // target: "http://10.200.118.18:8199", // crr
              changeOrigin: true,
            }, // 测试环境
            "/yypt-olhelp-manage/**": {
              target: "http://yypt-olhelp-manage.consult-test.sit.91lyd.com",
              // target: 'http://pre-olhelp-manage.dc.servyou-it.com',
              // target: "http://10.200.118.108:8090",
              // target: "http://10.200.118.135:38082",
              // target: "http://10.200.118.18:8099",
              // target: "http://10.200.119.244:7071",
              changeOrigin: true,
            }, // 测试环境
            // "/yypt-olhelp-manage/**": {
            //   target: "http://yypt-olhelp-manage.servyou-release.devops.91lyd.com",
            //   changeOrigin: true,
            // }, // release环境
            // "/yypt-olhelp-manage/**": "http://10.200.81.228:7071", // 测试环境
            // "/yypt-olhelp-manage/**": "http://yypt-olhelp-manage-manage2.consult-test.sit.91lyd.com", // 测试环境2

            // "/yypt-olhelp-manage/**": "http://yypt-olhelp-manage.servyou-release.devops.91lyd.com", // release环境
            //  "/yypt-olhelp-manage/**": "http://192.168.137.1:8080", // 海枫
            //  "/yypt-olhelp-manage/**": "http://10.201.8.56:8080", // 谢钦杰
              // "/yypt-olhelp-manage/**": "http://10.201.9.251:8280", // 智林
            // "/yypt-olhelp-manage/**": "http://10.201.10.53:8080", // 文杰
            // "/yypt-olhelp-manage/**": "http://10.200.81.228:7071/", // 陈立成
          // "/yypt-olhelp-manage/**": "http://10.201.9.214:8081", // 杨波
            // "/yypt-olhelp-manage/**": "http://10.202.0.10:8080", // 钦杰
            // "/yypt-olhelp-manage/**": "http://10.200.81.233:38082", // 周兴鼎
            // "/yypt-olhelp-manage/**": "http://10.200.81.212:8089", // 荣荣
            // "/yypt-olhelp-manage/**": "http://10.201.8.72:8090", // 兰兰
            //  "/yypt-olhelp-manage/**": "http://10.201.12.76:8080", // 饶慧
            //  "/yypt-olhelp-manage/**": "http://10.201.8.113:8080", // 徐彬才
            //  "/yypt-olhelp-manage/**": "http://10.201.14.242:7071", // 庾瑞
            "/consultright/**": {
              target: "http://consultright.consult2-test.sit.91lyd.com",
              changeOrigin: true,
            }
          },
          externals: {},
          define: {
            // 有环境差异的业务配置: 欢迎使用配置平台 http://galaxy.dc.servyou-it.com/ 详询@陈师东
          },
          development: {
            autoOpenBrowser: {
              // 根据需要修改虚拟host
              // host: 'local.sit.91lyd.com',
            },
          },
        },
      },
      'common-libs': {
        options: {
          // enableDplPc: true,
        },
      },
      watchdog: {
        enable: true,
        options: {
          // version: '',
          // watchdog文档： http://npm.dc.servyou-it.com/-/web/detail/watchdog-sdk
          config: {
            env: process.env.PHOENIX_BUILD_ENV,
            // 请根据自己的项目配置埋点参数
            eventApp: 'askone-manage-pc',
            entry: '',
            gatherAppName: '',
            appVersion: '1.0.0',
          },
        },
      },
      'walle-mock': {
        // 建议在config/config.local.js中开启（config/config.local.js不会被提交，不会干扰其他小伙伴）
        enable: false,
        options: {
          // 文档: http://npm.dc.servyou-it.com/-/web/detail/@servyou/walle-mock
          config: {
            // 请根据自己的工程更改此projectId
            projectId: 0,
            // prefix: '/*', // 默认baseURL/*
            // enable: true, // 是否启用mock拦截
            // useCache: true, // mock数据是否使用缓存
            // log: true, // mock日志记录
          },
        },
      },
    },
  };
};
