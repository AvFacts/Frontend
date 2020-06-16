<template>
  <div>
    <ul class="container">
      <li>
        <a href="https://itunes.apple.com/us/podcast/avfacts-aviation-knowledge-without-limits/id1271248926">iTunes</a>
      </li>
      <li>
        <a href="http://stitcher.com/s?fid=169506&refid=stpr">Stitcher</a>
      </li>
      <li>
        <a :href="RSSURL">RSS</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { baseURL } from '@/store/create'

  @Component
  export default class Links extends Vue {
    get RSSURL(): string {
      return `${baseURL}/episodes.rss`
    }
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/styles/vars';

  div {
    background-color: darken(vars.$banner-background-color, 5%);
  }

  ul {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin: 0 auto;
    padding: 10px 0;
  }

  li {
    color: vars.$background-color;
    flex: 0 0 auto;
    font-family: 'Libre Franklin', sans-serif;
    font-size: 14px;
    list-style: none;
    margin: 0;
    padding: 0;

    &:not(:last-child)::after {
      content: '·';
      padding: 0 1em;
    }
  }

  a,
  a:hover,
  a:active,
  a:visited {
    color: vars.$background-color;
  }
</style>
