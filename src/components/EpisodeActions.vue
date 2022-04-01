<template>
  <div data-cy="player" v-if="playOpen">
    <audio controls v-if="audioProcessed">
      <source :src="episode.audio.aac.url"
              :type="episode.audio.aac.content_type" />
      <source :src="episode.audio.mp3.url"
              :type="episode.audio.mp3.content_type" />
    </audio>
  </div>

  <div class="actions" v-else>
    <div class="left-actions">
      <a @click.prevent="play"
         aria-label="Play"
         class="play-button"
         data-cy="playButton"
         href="#"
         v-if="audioProcessed">
        <play :height="16" />
      </a>
      <span class="duration" v-if="audioProcessed">{{episode.audio.duration | duration}}</span>
    </div>

    <div class="right-actions">
      <router-link :to="{name: 'episodes_script', params: {id: episode.number}}"
                   class="other-button"
                   data-cy="performButton"
                   v-if="loggedIn && episode['script?']">
        Perform
      </router-link>
      <router-link :to="{name: 'episodes_edit', params: {id: episode.number}}"
                   class="other-button"
                   data-cy="editButton"
                   v-if="loggedIn">
        Edit
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Prop } from 'vue-property-decorator'
  import Component from 'vue-class-component'
  import { Getter } from 'vuex-class'

  import Play from '@/assets/images/Play.vue'
  import audioProcessed from '@/utils/audioProcessed'
  import { Episode } from '@/types'

  @Component({
    components: { Play }
  })
  export default class EpisodeActions extends Vue {
    @Prop({ required: true }) episode!: Episode

    playOpen = false

    @Getter loggedIn!: boolean

    get audioProcessed(): boolean {
      return audioProcessed(this.episode)
    }

    play(): void {
      this.playOpen = true
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/styles/vars";

  .actions {
    display: flex;
    flex-flow: row wrap;

    .left-actions {
      flex: 1 1 auto;
    }

    .right-actions {
      flex: 1 1 auto;
      text-align: right;

      > a {
        margin: 0 5px;
      }
    }
  }

  span.duration {
    color: $light-gray;
    font-family: "Libre Franklin", sans-serif;
    font-size: 12px;
    margin-left: 0.5em;
  }

  a.play-button {
    @include button($avfacts-blue);

    box-sizing: border-box;
    display: inline-block;
    height: 24px;
    padding: 4px 0;
    vertical-align: middle;
    width: 30px;

    @include responsive-desktop {
      min-width: 30px;
    }
  }

  a.other-button {
    @include button($avfacts-white, $text-dark: true);
  }
</style>
