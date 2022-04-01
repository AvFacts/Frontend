import Vue from 'vue'
import Bugsnag, { Plugin } from '@bugsnag/js'
import BugsnagPluginVue from '@bugsnag/plugin-vue'
import VueRouter from 'vue-router'

import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import '@/config/directives'
import '@/config/filters'

import router from './router'
import store from './store'

import Layout from '@/views/Layout.vue'

import 'normalize.css'
import 'simplemde/dist/simplemde.min.css'
import '@/assets/styles/fonts.scss'
import '@/assets/styles/common.scss'
import '@/assets/styles/forms.scss'
import '@/assets/styles/transitions.scss'

if (process.env.NODE_ENV === 'production') {
  Bugsnag.start({
    apiKey: '8187c8e84c616cb87e02b819c78cdf2b',
    plugins: [<Plugin> new BugsnagPluginVue(Vue)]
  })

  Vue.config.productionTip = false
}

Vue.use(VueRouter)

Vue.component('date-time', Datetime)

new Vue({
  router,
  store,
  render: h => h(Layout),
  beforeCreate() {
    this.$store.dispatch('initialize')
  }
}).$mount('#app')
