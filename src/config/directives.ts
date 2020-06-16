import Vue from 'vue'
import { debounce } from 'lodash-es'

Vue.directive('focus', {
  inserted(el): void {
    el.focus()
  }
})

Vue.directive('infinite-scroll', {
  async inserted(el, binding) {
    const loadMore: () => boolean = binding.value
    let more = await loadMore()

    const scrollFunction = async () => {
      if (binding.arg) return
      if (!more) return
      if (el.scrollTop + el.clientHeight >= el.scrollHeight) more = await loadMore()
    }

    el.addEventListener('scroll', () => debounce(scrollFunction))
  }
})
