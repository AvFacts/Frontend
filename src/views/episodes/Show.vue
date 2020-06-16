<template>
  <page-loading v-if="episodeLoading" />

  <div v-else-if="episode" data-cy="episodeShow">
    <div v-if="audioProcessed">
      <h1>#{{episode.number | integer}}: {{episode.title}}</h1>
      <p class="published-at">{{episode.published_at | date}}</p>

      <div class="summary">
        <img :src="episode.image.preview_url" class="image" />
        <p>{{episode.description}}</p>
      </div>

      <episode-actions :episode="episode" />

      <p id="credits" v-if="episode.credits">{{episode.credits}}</p>
    </div>

    <div v-else>
      <h1>Not Yet Released</h1>
      <p class="error">This episode hasn’t been released yet.</p>
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

  import { isNull, isUndefined } from 'lodash-es'
  import { Episode } from '@/types'
  import audioProcessed from '@/utils/audioProcessed'
  import PageLoading from '@/components/PageLoading.vue'
  import Error404 from '@/views/error/404.vue'
  import EpisodeActions from '@/components/EpisodeActions.vue'

  @Component({
    components: { Error404, EpisodeActions, PageLoading }
  })
  export default class Show extends Vue {
    @Getter episode!: Episode | null

    @Getter episodeLoading!: boolean

    @Action loadEpisode!: (params: { number: number }) => Promise<boolean>

    get audioProcessed(): boolean {
      if (isNull(this.episode)) return false
      return audioProcessed(this.episode)
    }

    mounted(): void {
      console.log(123)
      this.loadEpisode({ number: Number(this.$route.params.id) })
        .then(() => this.checkSlug())
    }

    private async checkSlug() {
      if (isNull(this.episode)) return
      if (isUndefined(this.episode.slug)) return

      if (this.$route.params.slug !== this.episode.slug) {
        await this.$router.replace({
          name: 'episodes_show',
          params: { id: this.episode.number.toString(), slug: this.episode.slug }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/styles/vars';

  h1 {
    margin-bottom: 0;
  }

  p.published-at {
    color: vars.$dark-gray;
    font-family: 'Libre Franklin', sans-serif;
    font-size: 12px;
    margin-bottom: 40px;
    margin-top: 5px;
  }

  .summary {
    align-items: flex-start;
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 40px;

    img {
      display: block;
      flex: 0 0 auto;
      height: 100px;
      margin-right: 15px;
      width: 100px;
    }

    p {
      flex: 1 1 auto;
      margin: 0;
    }
  }

  #credits {
    font-size: 12px;
    margin-top: 20px;
    white-space: pre-wrap;
  }

  @include vars.responsive-small {
    .image {
      display: none;
    }
  }
</style>
