import Vue from 'vue';
import VueRouter from 'vue-router';

import app from '@/router/app';
import demo from '@/router/demo';

Vue.use(VueRouter);

// 后续可添加模块
const constantRoutes = demo.concat(app);

export default new VueRouter({
  mode: 'history',
  base: '/h5',
  routes: constantRoutes
});
