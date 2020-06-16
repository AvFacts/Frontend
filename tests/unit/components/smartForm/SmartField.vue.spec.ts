import { shallowMount, Wrapper } from '@vue/test-utils'
import { expect } from 'chai'
import SmartField from '@/components/smartForm/SmartField.vue'

describe('SmartField.vue', () => {
  describe('#errors', () => {
    it('returns the errors from the parent', () => {
      const vue: SmartField = shallowMount(SmartField, {
        propsData: {
          field: 'foo'
        },
        parentComponent: {
          data() {
            return { errors: { foo: ['a', 'b'], bar: ['c'] } }
          }
        }
      }).vm

      expect(vue.errors).to.eql(['a', 'b'])
    })

    it('returns an empty array if there are no errors', () => {
      const vue: SmartField = shallowMount(SmartField, {
        propsData: {
          field: 'foo'
        },
        parentComponent: {
          data() {
            return { errors: {} }
          }
        }
      }).vm

      expect(vue.errors).to.eql([])
    })
  })

  describe('#name', () => {
    it('returns the generated name', () => {
      const wrapper: Wrapper<SmartField> = shallowMount(SmartField, {
        propsData: {
          field: 'bar'
        },
        parentComponent: {
          data() {
            return { objectName: 'foo', errors: {} }
          }
        }
      })

      expect(wrapper.find('input').attributes('name')).to.eql('foo[bar]')
    })
  })

  describe('#id', () => {
    it('returns the generated ID', () => {
      const wrapper: Wrapper<SmartField> = shallowMount(SmartField, {
        propsData: {
          field: 'bar'
        },
        parentComponent: {
          data() {
            return { objectName: 'foo', errors: {} }
          }
        }
      })

      expect(wrapper.find('input').attributes('id')).to.eql('foo_bar')
    })
  })
})
