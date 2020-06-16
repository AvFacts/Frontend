import Vue from 'vue'
import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import VueI18n from 'vue-i18n'
import { RootState } from '@/store/types'
import createStore from '@/store/create'
import episode from '@/store/modules/episode'
import episodes from '@/store/modules/episodes'
import loginLightbox from '@/store/modules/loginLightbox'
import session from '@/store/modules/session'

export function componentLocalVue(): typeof Vue {
  const vue = createLocalVue()
  vue.use(VueI18n)
  return vue
}

export function createTestStore(): Store<RootState> {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  return createStore({
    episode, episodes, loginLightbox, session
  })
}

export function logIn(store: Store<RootState>): void {
  store.commit('SET_JWT', {
    JWT: 'TODO'
  })
}
