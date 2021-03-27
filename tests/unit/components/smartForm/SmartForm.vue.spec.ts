import { mount, shallowMount, Wrapper } from '@vue/test-utils'
import { expect } from 'chai'
import * as Sinon from 'sinon'
import { getSandbox, localVue, mockServer } from '../../setup'
import SmartForm from '@/components/smartForm/SmartForm.vue'
import SmartField from '@/components/smartForm/SmartField.vue'
import store from '@/store'
import SmartFormBus from '@/components/smartForm/smartFormBus'

describe('SmartForm.vue', () => {
  let wrapper: Wrapper<SmartForm>

  beforeEach(() => {
    const child1: SmartField = shallowMount(SmartField, {
      localVue: localVue(),
      store,
      propsData: { field: 'bar' },
      parentComponent: {
        data() {
          return { errors: {} }
        }
      }
    }).vm
    const child2: SmartField = shallowMount(SmartField, {
      localVue: localVue(),
      store,
      propsData: { field: 'baz' },
      parentComponent: {
        data() {
          return { errors: {} }
        }
      }
    }).vm
    wrapper = mount(SmartForm, {
      localVue: localVue(),
      store,
      propsData: {
        path: '/episodes.json',
        object: {},
        objectName: 'foo'
      }
    })
    getSandbox().stub(wrapper.vm, '$children').returns([child1, child2])
  })

  describe('#save', () => {
    it('submits the form', async () => {
      await mockServer.post('http://localhost:5100/episodes.json').thenJson(200, { foo: 'bar' })
      const spy = getSandbox().spy(SmartFormBus, '$emit')

      await wrapper.vm.save()
      await wrapper.vm.$nextTick()

      expect(spy).to.have.been.calledWith('submit', 'success')
      expect(spy).to.have.been.calledWith('error', 'submit', { foo: 'bar' })
      expect(spy).to.have.been.calledWith('complete', 'submit', 'success')
    })

    it('handles validation errors', async () => {
      await mockServer.post('http://localhost:5100/episodes.json').thenJson(422, {
        errors: { foo: ['invalid'] }
      })
      const spy = getSandbox().spy(SmartFormBus, '$emit')

      await wrapper.vm.save()
      await wrapper.vm.$nextTick()

      expect(spy).to.have.been.calledWith('submit', 'invalid')
      expect(spy).to.have.been.calledWith('error', 'submit', Sinon.match({
        errors: { foo: ['invalid'] },
        response: Sinon.match.instanceOf(Response)
      }))
      expect(spy).to.have.been.calledWith('complete', 'submit', 'invalid')
    })

    it('handles other errors', async () => {
      await mockServer.post('http://localhost:5100/episodes.json')
        .thenReply(500, 'Internal Server Error')
      const spy = getSandbox().spy(SmartFormBus, '$emit')

      await wrapper.vm.save()
      await wrapper.vm.$nextTick()

      expect(spy).to.have.been.calledWith('submit')
      expect(spy).to.have.been.calledWith('error', Sinon.match.instanceOf(Error))
      expect(spy).to.have.been.calledWith('complete')
    })
  })
})
