const demo = () => import('@/views/demo/index');

const chart = () => import('@/views/demo/chart/chart');
const chart2 = () => import('@/views/demo/chart/chart2');
const chart3 = () => import('@/views/demo/chart/chart3');
const chart4 = () => import('@/views/demo/chart/chart4');

const store = () => import('@/views/demo/store');

const ref = () => import('@/views/demo/ref');

const sync = () => import('@/views/demo/sync');

const demoRoute = [
  {
    path: '/demo',
    name: 'demo',
    component: demo
  },

  {
    path: '/demo/chart',
    name: 'chart',
    component: chart
  },
  {
    path: '/demo/chart2',
    name: 'chart2',
    component: chart2
  },
  {
    path: '/demo/chart3',
    name: 'chart3',
    component: chart3
  },
  {
    path: '/demo/chart4',
    name: 'chart4',
    component: chart4
  },
  {
    path: '/demo/store',
    name: 'store',
    component: store
  },
  {
    path: '/demo/ref',
    name: 'ref',
    component: ref
  },
  {
    path: '/demo/sync',
    name: 'sync',
    component: sync
  }
];

export default demoRoute;
