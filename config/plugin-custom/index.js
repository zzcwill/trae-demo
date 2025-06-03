/* 插件开发文档：http://fe.dc.servyou-it.com/hyliajs/plugin */

module.exports = (task) => {
  return class extends task.PluginBase {
    static defaultOptions = {};

    // dev和build任务执行
    // async applyBeforeAll() {
    //   this.addHookListener(this.HOOK_NAMES.WEBPACK_CONFIG, async (webpackChainConfig) => {
    //     /* eslint-disable indent */
    //     webpackChainConfig
    //     /* eslint-enable indent */
    //   });
    // }

    // dev任务执行
    // async applyDev() {
    //   this.addHookListener(this.HOOK_NAMES.WEBPACK_CONFIG, async (webpackChainConfig) => {
    //     /* eslint-disable indent */
    //     webpackChainConfig
    //     /* eslint-enable indent */
    //   });
    // }

    // build任务执行
    // async applyBuild() {
    //   this.addHookListener(this.HOOK_NAMES.WEBPACK_CONFIG, async (webpackChainConfig) => {
    //     /* eslint-disable indent */
    //     webpackChainConfig
    //     /* eslint-enable indent */
    //   });
    // }
  };
};
