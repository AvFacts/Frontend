import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import { getSandbox, localVue } from '../../setup'
import Show from '@/views/episodes/Show.vue'
import store from '@/store'

describe('episodes/Show.vue', () => {
  it('changes the URL when the slug changes', async () => {
    store.commit('SET_EPISODE', { episode: { title: 'foo', number: 123 } })
    getSandbox().stub(store, 'dispatch').resolves()
    const spy = getSandbox().spy()
    const vue: Show = shallowMount(Show, {
      localVue: localVue(),
      store,
      mocks: {
        $route: { params: { slug: 'bar' } },
        $router: { replace: spy }
      }
    }).vm
    await vue.$nextTick()

    expect(spy).to.have.been.calledOnceWith({
      name: 'episodes_show',
      params: { id: '123', slug: 'foo' }
    })
  })
})
