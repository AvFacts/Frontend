<template>
  <div data-cy="404">
    <h1>Not Found</h1>
    <p class="error">You tried to go somewhere that doesn’t exist.</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class FourOhFour extends Vue {
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/styles/vars';

  p,
  h1 {
    text-align: center;
  }

  @include vars.responsive-desktop {
    div {
      padding: 40px 0;
    }
  }
</style>
