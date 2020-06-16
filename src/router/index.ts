import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const Root = () => import(/* webpackChunkName: 'loggedOut' */ '@/views/layout/Root.vue')
const EpisodesList = () => import(/* webpackChunkName: 'loggedOut' */ '@/views/episodes/list/Index.vue')
const EpisodesShow = () => import(/* webpackChunkName: 'loggedOut' */ '@/views/episodes/Show.vue')
const EpisodesScript = () => import(/* webpackChunkName: 'loggedOut' */ '@/views/episodes/Script.vue')
const About = () => import(/* webpackChunkName: 'loggedOut' */ '@/views/About.vue')
const EpisodesNew = () => import(/* webpackChunkName: 'loggedIn' */ '@/views/episodes/New.vue')
const EpisodesEdit = () => import(/* webpackChunkName: 'loggedIn' */ '@/views/episodes/Edit.vue')
const FourOhFour = () => import('@/views/error/404.vue')

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Root,
    children: [
      { path: '', component: EpisodesList, name: 'episodes_list' },
      { path: '/upload', component: EpisodesNew, name: 'episodes_new' },
      { path: '/episodes/:id', component: EpisodesShow },
      { path: '/episodes/:id/edit', component: EpisodesEdit, name: 'episodes_edit' },
      { path: '/episodes/:id/script', component: EpisodesScript, name: 'episodes_script' },
      { path: '/episodes/:id/:slug', component: EpisodesShow, name: 'episodes_show' },
      { path: '/about', component: About, name: 'about' }
    ]
  },

  { path: '*', component: FourOhFour }
]

const router = new VueRouter({ routes })
export default router
