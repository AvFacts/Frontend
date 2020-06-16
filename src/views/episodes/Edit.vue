<template>
  <div v-if="!loggedIn">
    <error-404 />
  </div>

  <page-loading v-else-if="episodeLoading" />

  <div v-else-if="episode">
    <h1>#{{episode.number | integer}}: {{episode.title}}</h1>
    <episode-form :episode="episode" />
  </div>

  <div v-else>
    <error-404 />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Action, Getter } from 'vuex-class'

  import { Watch } from 'vue-property-decorator'
  import EpisodeForm from './Form.vue'
  import { Episode } from '@/types'
  import Error404 from '@/views/error/404.vue'
  import PageLoading from '@/components/PageLoading.vue'
  import SmartFormBus from '@/components/smartForm/smartFormBus'

  @Component({
    components: { Error404, EpisodeForm, PageLoading }
  })
  export default class Edit extends Vue {
    @Getter episode!: Episode | null

    @Getter loggedIn!: boolean

    @Getter episodeLoading!: boolean

    @Action loadEpisode!: (params: { number: number }) => Promise<boolean>

    mounted(): void {
      this.refresh()
      SmartFormBus.$on('success', () => this.refresh())
    }

    @Watch('loggedIn')
    onLoggedInChanged(): void {
      if (this.loggedIn) this.refresh()
    }

    private async refresh(): Promise<void> {
      await this.loadEpisode({ number: Number(this.$route.params.id) })
    }
  }
</script>
