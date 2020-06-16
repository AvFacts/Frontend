import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { constant, times } from 'lodash-es'
import { localVue } from '../../setup'
import Script from '@/views/episodes/Script.vue'
import store from '@/store'

describe('Script.vue', () => {
  describe('estimatedRunningTime', () => {
    it('returns 0 if the script is undefined', () => {
      const vue = shallowMount(Script, {
        localVue: localVue(),
        store
      }).vm
      expect(vue.estimatedRunningTime).to.eql(0)
    })

    it('returns an estimated running time', () => {
      store.commit('SET_EPISODE', { episode: { script: times(1000, constant('hello')).join(' ') } })
      const vue = shallowMount(Script, {
        localVue: localVue(),
        store
      }).vm
      expect(vue.estimatedRunningTime).to.eql(417)
    })
  })
})
