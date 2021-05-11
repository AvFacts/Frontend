<template>
  <page-loading v-if="episodeLoading" />

  <div v-else-if="!loggedIn">
    <error-404 />
  </div>

  <div class="container" v-else-if="episode">
    <h1>
      #{{episode.number | integer}}: {{episode.title}}
      <router-link :to="{name: 'episodes_edit', params: {id: episode.number}}">
        Back to Edit
      </router-link>
    </h1>

    <template v-if="episode.script">
      <p data-cy="runningTime" id="running-time">
        Estimated running time: {{estimatedRunningTime | duration}}
      </p>
      <div class="script" v-html="renderedScript" />
    </template>
    <div class="script" v-else>
      <p><em>This episode does not have a script.</em></p>
    </div>
  </div>

  <div v-else>
    <error-404 />
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Action, Getter } from 'vuex-class'
  import { marked } from 'marked'

  import { isUndefined } from 'lodash-es'
  import Error404 from '@/views/error/404.vue'
  import PageLoading from '@/components/PageLoading.vue'
  import { Episode } from '@/types'

  marked.setOptions({
    gfm: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: true
  })

  @Component({
    components: { Error404, PageLoading }
  })
  export default class Script extends Vue {
    @Getter episode!: Episode | null

    @Getter loggedIn!: boolean

    @Getter episodeLoading!: boolean

    @Action loadEpisode!: (params: { number: number }) => Promise<boolean>

    get renderedScript(): string {
      return marked(this.episode?.script || '')
    }

    get estimatedRunningTime(): number {
      if (isUndefined(this.episode?.script)) return 0
      const wordCount = this.episode!.script.split(/\s+/).length
      return Math.round(0.3472 * wordCount + 69.6)
    }

    mounted(): void {
      this.refresh()
    }

    private async refresh(): Promise<void> {
      await this.loadEpisode({ number: Number(this.$route.params.id) })
    }
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/styles/vars';

  h1 a {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: -1px;
  }

  @include vars.responsive-desktop {
    .container {
      margin-left: auto;
      margin-right: auto;
      width: 540px;
    }
  }

  #running-time {
    color: vars.$light-gray;
    font-size: 12px;
  }

  .script {
    margin-bottom: 100vh;
  }

  .script,
  .script p {
    font-size: 24px;
    line-height: 32px;
  }
</style>
