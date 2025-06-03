// 项目需要引入包
import Vue from 'vue';

// 项目需要引入文件
import App from '@/App';
// 引入全局过滤器
import '@/filters';
// 引入路由权限控制
import '@/permission';
import router from '@/router';
import store from '@/store';
// 引入css公共样式
import '@/styles/index.less';
// 让网页根据设备dpr和宽度，利用viewport和html根元素的font-size配合rem来适配不同尺寸的移动端设备
import 'amfe-flexible';

// Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
