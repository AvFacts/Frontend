<template>
  <svg
    :height="size"
    :width="size"
    viewBox="0 0 25 25"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M19.011 7.402l-11.32 11.32-1.414-1.414 11.32-11.32z" />
    <path
      d="M18.305 0a6.695 6.695 0 0 0-6.364 8.77l1.706-1.706c-.01-.124-.037-.243-.037-.369A4.699
             4.699 0 0 1 18.305 2 4.7 4.7 0 0 1 23 6.695a4.701 4.701 0 0 1-4.695 4.696c-.166
             0-.322-.032-.482-.049l-1.684 1.683c.68.233 1.406.365 2.166.365a6.695 6.695 0 0 0
             0-13.39zM11.342 17.822c.018.16.049.316.049.482a4.7 4.7 0 0 1-4.695 4.695A4.699 4.699 0
             0 1 2 18.305a4.7 4.7 0 0 1 4.695-4.695c.127 0 .245.027.369.037l1.706-1.706a6.695 6.695
             0 1 0 4.62 6.364c0-.76-.132-1.486-.365-2.166l-1.683 1.683z" />
  </svg>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  @Component
  export default class Permalink extends Vue {
    @Prop({ type: Number, default: 25 }) size!: number
  }
</script>

<style lang="scss" scoped>
  @use "sass:color";
  @import "../styles/vars";

  path {
    fill: color.adjust($avfacts-blue, $lightness: -30%);
  }
</style>
