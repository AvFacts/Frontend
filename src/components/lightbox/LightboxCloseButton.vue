<template>
  <a @click.prevent="onClose"
     @mousedown="closeActive = true"
     @mouseup="closeActive = false"
     href="#">
    <close-button :active="closeActive" />
  </a>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  import CloseButton from '@/assets/images/CloseButton.vue'

  @Component({
    components: { CloseButton }
  })
  export default class LightboxCloseButton extends Vue {
    @Prop({ type: Function }) onClose!: (e: Event) => void

    closeActive = false
  }
</script>
