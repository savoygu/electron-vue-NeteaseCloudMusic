import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'is-active',
  exact: true,
  routes: [
    {
      path: '/',
      component: require('@/views/Landing').default,
      alias: '/recommend',
      children: [
        {
          path: '/',
          component: require('@/views/Discovery/Discovery').default,
          children: [
            {
              path: '/',
              redirect: { name: 'recommend' },
            },
            {
              path: '/recommend',
              name: 'recommend',
              component: require('@/views/Discovery/Recommend/Recommend.vue').default,
            },
            {
              path: '/song',
              name: 'song',
              component: require('@/views/Discovery/Song/Song.vue').default,
            },
            {
              path: '/radio',
              name: 'radio',
              component: require('@/views/Discovery/Radio/Radio.vue').default,
            },
            {
              path: '/ranking',
              name: 'ranking',
              component: require('@/views/Discovery/Ranking/Ranking.vue').default,
            },
            {
              path: '/singer',
              name: 'singer',
              component: require('@/views/Discovery/Singer/Singer.vue').default,
            },
            {
              path: '/latest',
              name: 'latest',
              component: require('@/views/Discovery/Latest/Latest.vue').default,
            },
          ],
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
