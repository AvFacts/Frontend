import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { constant, times } from 'lodash-es'
import nock from 'nock'
import { localVue } from '../../setup'
import Script from '@/views/episodes/Script.vue'
import store from '@/store'

describe('Script.vue', () => {
  describe('estimatedRunningTime', () => {
    it('returns 0 if the script is undefined', () => {
      nock('http://localhost:5100').get('/episodes/123.json').reply(200, {})

      const vue = shallowMount(Script, {
        localVue: localVue(),
        store,
        mocks: {
          $route: { params: { id: '123' } }
        }
      }).vm

      expect(vue.estimatedRunningTime).to.eql(0)
    })

    it('returns an estimated running time', () => {
      nock('http://localhost:5100')
        .get('/episodes/123.json')
        .reply(200, {
          number: 123,
          script: times(1000, constant('hello')).join(' ')
        })
      store.commit('SET_EPISODE', {
        episode: {
          number: 123,
          script: times(1000, constant('hello')).join(' ')
        }
      })

      const vue = shallowMount(Script, {
        localVue: localVue(),
        store,
        mocks: {
          $route: { params: { id: '123' } }
        }
      }).vm

      expect(vue.estimatedRunningTime).to.eql(417)
    })
  })
})
