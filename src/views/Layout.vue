<template>
  <div>
    <router-view />
    <lightbox-overlay />
    <login-lightbox />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  import LoginLightbox from '@/views/layout/LoginLightbox.vue'
  import LightboxOverlay from '@/components/lightbox/LightboxOverlay.vue'

  @Component({
    components: { LightboxOverlay, LoginLightbox }
  })
  export default class Layout extends Vue {
  }
</script>
