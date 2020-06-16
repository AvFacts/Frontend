<template>
  <div>
    <div class="title-search">
      <h1>
        All Episodes
        <router-link :to="{name: 'episodes_new'}"
                     data-cy="uploadNewLink"
                     v-if="loggedIn">Upload New
        </router-link>
      </h1>
      <div class="spacer" />
      <input @keyup="updateFilter"
             aria-label="Search episodes"
             placeholder="Find an episode"
             type="search"
             v-model.trim="filter" />
    </div>

    <div v-infinite-scroll:[episodesLoading]="loadEpisodes">
      <episode :episode="episode"
               :key="episode.number"
               v-for="episode in episodes" />

      <p class="no-episodes" v-if="episodes.length === 0">No episodes yet.</p>
    </div>

    <page-loading v-if="episodesLoading" />

    <p class="error" v-if="episodesError">Sorry, but an error occurred when
      trying to load podcast episodes. Please try again later.</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Action, Getter } from 'vuex-class'
  import { debounce } from 'lodash-es'
  import Episode from './Episode.vue'
  import PageLoading from '@/components/PageLoading.vue'

  @Component({
    components: { Episode, PageLoading }
  })
  export default class Index extends Vue {
    filter: string | null = null

    @Getter episodes!: Episode[]

    @Getter episodesLoading!: boolean

    @Getter episodesError!: Error | null

    @Getter loggedIn!: boolean

    @Action loadEpisodes!: (params: { restart: boolean }) => Promise<boolean>

    @Action setFilter!: (params: { filter: string | null }) => void

    updateFilter = debounce(this._updateFilter)

    async _updateFilter(): Promise<void> {
      await this.setFilter({ filter: this.filter })
      await this.loadEpisodes({ restart: true })
    }
  }
</script>

<style lang="scss" scoped>
  @use '../../../assets/styles/vars';

  .title-search {
    align-items: baseline;
    display: flex;
    flex-flow: row nowrap;

    h1 {
      flex: 0 0 auto;

      a {
        font-size: 14px;
        font-weight: normal;
        letter-spacing: -1px;
      }
    }

    .spacer {
      flex: 1 1 auto;
      min-width: 20px;
    }

    input {
      border: 0;
      border-right: 2px solid vars.$placeholder-color;
      display: block;
      flex: 0 0 auto;
      padding-right: 5px;
      text-align: right;
      width: 200px;

      &:focus {
        border-right-color: transparent;
      }
    }
  }

  @include vars.responsive-small {
    .title-search {
      flex-flow: column nowrap;

      h1 {
        margin-bottom: 10px;
      }

      .spacer {
        display: none;
      }

      input {
        border-left: 2px solid vars.$placeholder-color;
        border-right: 0;
        margin-bottom: 20px;
        padding-left: 5px;
        padding-right: 0;
        text-align: left;
      }
    }
  }

  p.no-episodes {
    font-family: 'Libre Franklin', sans-serif;
  }
</style>
