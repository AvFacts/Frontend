<template>
  <div class="spinner-container" data-cy="spinner">
    <svg
      class="lds-spinner"
      height="200px"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      width="200px"
      xmlns="http://www.w3.org/2000/svg">
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.9166666666666666s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(30 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.8333333333333334s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(60 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.75s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(90 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.6666666666666666s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(120 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.5833333333333334s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(150 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.5s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(180 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.4166666666666667s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(210 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.3333333333333333s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(240 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.25s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(270 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.16666666666666666s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(300 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="-0.08333333333333333s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
      <rect
        fill="#1d1d3c"
        height="12"
        rx="2.88"
        ry="1.14"
        transform="rotate(330 50 50)"
        width="4"
        x="48"
        y="19">
        <animate
          attributeName="opacity"
          begin="0s"
          dur="1s"
          repeatCount="indefinite"
          values="1;0" />
      </rect>
    </svg>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class PageLoading extends Vue {
  }
</script>

<style lang="scss" scoped>
@import "../assets/styles/vars";

.spinner-container {
  align-items: center;
  background-color: rgba(255 255 255 / 80%);
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: $banner-layer - 1;
}

svg {
  background: none initial initial initial initial;
}
</style>
