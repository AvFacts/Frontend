import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { constant, times } from 'lodash-es'
import { rest } from 'msw'
import { localVue } from '../../setup'
import backend from '../../backend'
import episodeJSON from '../../../fixtures/episode.json'
import Script from '@/views/episodes/Script.vue'
import store from '@/store'

describe('Script.vue', () => {
  describe('estimatedRunningTime', () => {
    it('returns 0 if the script is undefined', () => {
      backend.use(
        rest.get('http://localhost:5100/episodes/123.json', (req, res, ctx) => res(
          ctx.json({ ...episodeJSON, script: undefined })
        ))
      )

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
      store.commit('SET_EPISODE', {
        episode: {
          number: 1,
          script: times(1000, constant('hello')).join(' ')
        }
      })

      const vue = shallowMount(Script, {
        localVue: localVue(),
        store,
        mocks: {
          $route: { params: { id: '1' } }
        }
      }).vm

      expect(vue.estimatedRunningTime).to.eql(417)
    })
  })
})
