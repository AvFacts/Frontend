<template>
  <div class="episode" data-cy="episode">
    <div class="image">
      <img :src="episode.image.preview_url"
           :alt="episode.title"
           data-cy="episode-image"
           v-if="episode.image" />
      <div class="image-placeholder" data-cy="image-placeholder" v-else />
    </div>
    <div class="player">
      <h1>#{{episode.number | integer}}: <span data-cy="episodeTitle">{{episode.title}}</span></h1>

      <p class="published-at">
        <span v-if="episode.published_at">{{episode.published_at | date}}</span>
        <router-link :to="{name: 'episodes_show', params: {id: episode.number, slug: episode.slug}}"
                     aria-label="Permalink"
                     data-cy="permalink"
                     v-if="audioProcessed">
          <permalink :size="10" class="permalink-image" />
        </router-link>
      </p>

      <p data-cy="episodeDescription">{{episode.description}}</p>

      <episode-actions :episode="episode" />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'

  import Permalink from '@/assets/images/Permalink.vue'
  import * as Types from '@/types'
  import audioProcessed from '@/utils/audioProcessed'
  import EpisodeActions from '@/components/EpisodeActions.vue'

  @Component({
    components: { EpisodeActions, Permalink }
  })
  export default class Episode extends Vue {
    @Prop({ required: true }) episode!: Types.Episode

    get audioProcessed(): boolean {
      return audioProcessed(this.episode)
    }
  }
</script>

<style lang="scss" scoped>
  @use '../../../assets/styles/vars';

  .episode {
    align-items: flex-start;
    display: flex;
    flex-flow: row nowrap;

    &:not(:last-child) {
      margin-bottom: 50px;
    }

    .image {
      flex: 0 0 auto;
      margin-right: 15px;

      img {
        height: 100px;
        width: 100px;
      }
    }

    .player {
      flex: 1 1 auto;

      h1 {
        font-size: 20px;
        line-height: 20px;
        margin: 0;
      }

      p {
        font-size: 11px;
        line-height: 15px;
      }
    }
  }

  p.published-at {
    color: vars.$dark-gray;
    font-family: 'Libre Franklin', sans-serif;
    margin-top: 5px;

    .permalink-image {
      margin-left: 3px;
    }
  }

  @include vars.responsive-small {
    .image {
      display: none;
    }
  }

  .image-placeholder {
    background-color: vars.$light-gray;
    height: 100px;
    width: 100px;
  }
</style>
