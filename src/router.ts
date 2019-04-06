import Vue from 'vue'
import Router from 'vue-router'
import Game from './views/Game.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'game',
      // route level code-splitting
      // this generates a separate chunk (game.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "game" */ './views/Game.vue')
    },
    {
      path: '/scores',
      name: 'scores',
      component: () =>
        import(/* webpackChunkName: "game" */ './views/Scores.vue')
    }
  ]
})
