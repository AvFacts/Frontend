<template>
  <div v-if="!loggedIn">
    <error-404 />
  </div>

  <div v-else>
    <h1>Add New Episode</h1>
    <episode-form :episode="episode" />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Getter } from 'vuex-class'

  import EpisodeForm from './Form.vue'
  import SmartFormBus from '@/components/smartForm/smartFormBus'
  import Error404 from '@/views/error/404.vue'
  import { Episode } from '@/types'

  @Component({
    components: { Error404, EpisodeForm }
  })
  export default class New extends Vue {
    episode: Partial<Episode> = {}

    @Getter loggedIn!: boolean

    mounted(): void {
      SmartFormBus.$on('success', () => this.$router.push({ name: 'episodes_list' }))
    }
  }
</script>
