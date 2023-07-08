<template>
  <div class="parent">
    <div class="container">
      <router-link :to="{ name: 'episodes_list' }" data-cy="homeLink">
        <img
          src="../../assets/images/banner-image.png"
          alt="AvFacts: Aviation knowledge without limits" />
      </router-link>
      <div class="spacer" />
      <p>an aviation podcast by
        <router-link :to="{ name: 'about' }">Tim Morgan</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class Banner extends Vue {
  }
</script>

<style lang="scss" scoped>
  @use "../../assets/styles/vars";

  .parent {
    background-color: vars.$banner-background-color;

    .container {
      align-items: center;
      display: flex;
      flex-flow: row nowrap;
      height: 100px;

      img {
        display: block;
        flex: 0 0 auto;
        height: 80px;
        width: 250px;
      }

      .spacer {
        flex: 1 1 auto;
      }

      p {
        color: vars.$background-color;
        flex: 0 0 auto;
        font-family: "Libre Franklin", sans-serif;
        font-size: 14px;
      }

      a {
        color: vars.$background-color;
      }
    }
  }

  @include vars.responsive-mobile {
    header {
      margin-bottom: 0;
    }

    header p {
      display: none;
    }
  }
</style>
