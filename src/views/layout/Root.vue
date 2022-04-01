<template>
  <div>
    <header>
      <banner />
      <links />
    </header>

    <main class="container content-view">
      <router-view />
    </main>

    <footer-view />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import Banner from './Banner.vue'
  import Links from './Links.vue'
  import Footer from './Footer.vue'

  @Component({
    components: { Links, Banner, FooterView: Footer }
  })
  export default class Root extends Vue {
  }
</script>

<style lang="scss" scoped>
  @use "../../assets/styles/vars";

  @include vars.responsive-desktop {
    header {
      left: 0;
      position: fixed;
      top: 0;
      width: 100%;
      z-index: vars.$banner-layer;
    }

    .content-view {
      margin-top: 180px;
    }
  }

  @include vars.responsive-mobile {
    header {
      margin-bottom: 40px;
    }

    header p {
      display: none;
    }
  }
</style>
