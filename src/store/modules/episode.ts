/* eslint-disable no-shadow */

import {
  ActionTree, GetterTree, Module, MutationTree
} from 'vuex'
import slugify from 'slugify'
import { cloneDeep, isNull, isUndefined } from 'lodash-es'
import { APIResponse, RootState } from '@/store/types'
import { Episode } from '@/types'

export interface EpisodeState {
  episode: Episode | null;
  episodeLoading: boolean;
  episodeError: Error | null;
}

const state: EpisodeState = {
  episode: null,
  episodeLoading: false,
  episodeError: null
}

const getters: GetterTree<EpisodeState, RootState> = {
  episode(state): Episode | null {
    return state.episodeLoading ? null : state.episode
  },
  episodeLoading(state): boolean {
    return state.episodeLoading
  },
  episodeError(state): Error | null {
    return state.episodeError
  }
}

const mutations: MutationTree<EpisodeState> = {
  START_EPISODE(state) {
    state.episodeLoading = true
  },

  SET_EPISODE(state, { episode }: { episode: Episode }) {
    state.episode = {
      ...cloneDeep(episode),
      slug: isUndefined(episode.title) ? undefined : slugify(episode.title)
    }
    state.episodeLoading = false
  },

  SET_EPISODE_ERROR(state, { error }: { error: Error }) {
    state.episode = null
    state.episodeError = error
    state.episodeLoading = false
  }
}

const actions: ActionTree<EpisodeState, RootState> = {
  setEpisode({ commit }, { episode }: { episode: Episode }) {
    commit('SET_EPISODE', { episode })
  },

  async loadEpisode({ commit, state, dispatch }, { number }: { number: number }): Promise<boolean> {
    if (state.episode && state.episode.number === number) return false

    commit('START_EPISODE')
    try {
      const result: APIResponse<Episode> = await dispatch('request', { path: `/episodes/${number}.json` })
      if (result.ok) {
        commit('SET_EPISODE', { episode: result.val.object })
        return true
      }
      throw new Error('Invalid HTTP status: 422 Unprocessable Entity')
    } catch (error) {
      commit('SET_EPISODE_ERROR', { error })
      throw error
    }
  },

  async reloadEpisode({ state, dispatch }): Promise<void> {
    if (isNull(state.episode)) return
    dispatch('loadEpisode', { number: state.episode.number })
  }
}

const episode: Module<EpisodeState, RootState> = {
  state, getters, mutations, actions
}
export default episode
