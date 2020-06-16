/* eslint-disable no-shadow */

import {
  ActionTree, GetterTree, Module, MutationTree
} from 'vuex'
import slugify from 'slugify'

import { isNil, isNull } from 'lodash-es'
import { Episode } from '@/types'
import { APIResponse, RootState } from '@/store/types'

export interface EpisodesState {
  episodes: Episode[];
  episodesLoading: boolean;
  episodesError: Error | null;
  episodesFilter: string | null;
  nextPath: string | null;
}

function state(): EpisodesState {
  return {
    episodes: [],
    episodesLoading: false,
    episodesError: null,
    episodesFilter: null,
    nextPath: '/episodes.json'
  }
}

const getters: GetterTree<EpisodesState, RootState> = {
  episodes(state): Episode[] {
    return state.episodesLoading ? [] : state.episodes
  },
  episodesError(state): Error | null {
    return state.episodesError
  },
  episodesLoading(state, getters, rootState, rootGetters): boolean {
    return state.episodesLoading || rootGetters.episodeLoading
  }
}

const mutations: MutationTree<EpisodesState> = {
  RESET_EPISODES(state) {
    state.episodes = []
    state.episodesError = null
    state.nextPath = `/episodes.json?filter=${state.episodesFilter || ''}`
  },

  START_EPISODES(state) {
    state.episodesLoading = true
  },

  APPEND_EPISODES(state, { page }: { page: Episode[] }) {
    page.forEach(e => {
      e.slug = slugify(e.title)
    })
    state.episodes = state.episodes.concat(page)
  },

  FINISH_EPISODES(state) {
    state.episodesLoading = false
  },

  SET_EPISODES_ERROR(state, { error }: { error: Error }) {
    state.episodes = []
    state.episodesLoading = false
    state.episodesError = error
    state.nextPath = `/episodes.json?filter=${state.episodesFilter || ''}`
  },

  SET_FILTER(state, { filter }: { filter: string | null }) {
    state.episodesFilter = filter
    state.nextPath = `/episodes.json?filter=${state.episodesFilter || ''}`
  },

  SET_NEXT_PAGE_PATH(state, { path }: { path: string | null }) {
    state.nextPath = path
  },

  SET_EPISODE_IN_EPISODES(state, { episode }: { episode: Episode }) {
    if (isNil(episode.id)) return
    const index = state.episodes.findIndex(e => e.id === episode.id)
    state.episodes = [
      ...state.episodes.slice(0, index - 1),
      episode,
      ...state.episodes.slice(index + 1)
    ].sort((a, b) => b.number - a.number)
  }
}

const actions: ActionTree<EpisodesState, RootState> = {
  setEpisodeInEpisodes({ commit }, { episode }: { episode: Episode }) {
    commit('SET_EPISODE_IN_EPISODES', { episode })
  },

  async loadEpisodes(
    { commit, state, dispatch },
    { restart }: { restart: boolean } = { restart: false }
  ): Promise<boolean> {
    if (restart) commit('RESET_EPISODES')

    if (isNull(state.nextPath)) return false
    if (state.episodesLoading) return !isNull(state.nextPath)
    commit('START_EPISODES')

    try {
      const result: APIResponse<Episode[]> = await dispatch('request', { path: state.nextPath })
      if (result.ok) {
        const page: Episode[] = result.val.object
        commit('APPEND_EPISODES', { page })

        const nextPath = result.val.response.headers.has('X-Next-Page')
          ? result.val.response.headers.get('X-Next-Page')
          : null

        commit('SET_NEXT_PAGE_PATH', { path: nextPath })
        commit('FINISH_EPISODES')
        return !isNull(nextPath)
      }
      throw new Error('Invalid HTTP status: 422 Unprocessable Entity')
    } catch (error) {
      commit('SET_EPISODES_ERROR', { error })
      throw error
    }
  },

  setFilter({ commit }, { filter }: { filter: string | null }) {
    return new Promise(resolve => {
      commit('SET_FILTER', { filter })
      resolve(true)
    })
  }
}

const episodes: Module<EpisodesState, RootState> = {
  state, getters, mutations, actions
}
export default episodes
