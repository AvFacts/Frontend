<template>
  <transition name="fade">
    <div class="overlay" v-if="shown">&nbsp;</div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import LightboxBus from './lightboxBus'

  @Component
  export default class LightboxOverlay extends Vue {
    shown = false

    created(): void {
      LightboxBus.$on('lightbox:updated', (shown: boolean) => {
        this.shown = shown
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/vars';

  .overlay {

    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    left: 0;
    position: fixed;
    top: 0;

    width: 100vw;
    z-index: $lightbox-layer - 1;
  }
</style>
