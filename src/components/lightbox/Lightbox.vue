<template>
  <transition name="fade">
    <div
      :style="style"
      class="lightbox"
      ref="lightbox"
      v-if="shown">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  import LightboxBus from './lightboxBus'

  @Component
  export default class Lightbox extends Vue {
    @Prop({ type: Boolean }) shown!: boolean

    readonly $refs!: {
      lightbox: HTMLElement;
    }

    width!: number

    height!: number

    get style(): string {
      return `transform: translate(-${this.width / 2.0}px, -${this.height / 2.0}px)`
    }

    mounted(): void {
      this.resize()
    }

    updated(): void {
      this.resize()
      LightboxBus.$emit('lightbox:updated', this.shown)
    }

    private resize() {
      if (!this.$refs.lightbox) return
      this.width = this.$refs.lightbox.offsetWidth
      this.height = this.$refs.lightbox.offsetHeight
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/vars";

  .lightbox {
    background-color: $background-color;
    border-radius: 10px;
    box-shadow: 1px 1px 15px 0 rgba(0 0 0 / 50%);
    box-sizing: border-box;
    display: table;
    left: 50%;
    padding: 20px;
    position: fixed;
    top: 50%;
    z-index: $lightbox-layer;
  }
</style>
