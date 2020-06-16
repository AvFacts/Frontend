import { shallowMount } from '@vue/test-utils'
import { expect } from 'chai'
import Form from '@/views/episodes/Form.vue'

describe('episodes/Form.vue', () => {
  describe('#imageTooSmall', () => {
    it('returns true if the image is too small', () => {
      const vue = shallowMount(Form, {
        propsData: { episode: { image: { width: 1000, height: 1000 } } }
      }).vm
      expect(vue.imageTooSmall).to.be.true
    })

    it('returns false if the image is large enough', () => {
      const vue = shallowMount(Form, {
        propsData: { episode: { image: { width: 3000, height: 3000 } } }
      }).vm
      expect(vue.imageTooSmall).to.be.false
    })

    it('returns false if there is no image', () => {
      const vue = shallowMount(Form, {
        propsData: { episode: { } }
      }).vm
      expect(vue.imageTooSmall).to.be.false
    })
  })
})
