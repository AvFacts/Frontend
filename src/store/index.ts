import Vue from 'vue'
import Vuex from 'vuex'
import { capitalize } from 'lodash-es'
import episodes from './modules/episodes'
import episode from './modules/episode'
import session from './modules/session'
import loginLightbox from './modules/loginLightbox'
import createStore from './create'
import { FROZEN_MODULES } from '@/store/types'

Vue.use(Vuex)

const store = createStore({
  episodes, episode, session, loginLightbox
})

store.subscribe(() => {
  const frozenState: Record<string, unknown> = {}
  FROZEN_MODULES.forEach(mod => {
    const frozenMod = store.getters[`freeze${capitalize(mod)}`]
    if (frozenMod) frozenState[mod] = frozenMod
  })
  window.localStorage.setItem('store', JSON.stringify(frozenState))
})

export default store
