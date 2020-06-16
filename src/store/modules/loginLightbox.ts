/* eslint-disable no-shadow */

import {
  ActionTree, GetterTree, Module, MutationTree
} from 'vuex'
import { RootState } from '@/store/types'

export interface LoginLightboxState {
  loginLightboxShown: boolean;
}

const state: LoginLightboxState = {
  loginLightboxShown: false
}

const getters: GetterTree<LoginLightboxState, RootState> = {
  loginLightboxShown(state): boolean {
    return state.loginLightboxShown
  }
}

const mutations: MutationTree<LoginLightboxState> = {
  SHOW_LOGIN_LIGHTBOX(state) {
    state.loginLightboxShown = true
  },

  HIDE_LOGIN_LIGHTBOX(state) {
    state.loginLightboxShown = false
  },

  TOGGLE_LOGIN_LIGHTBOX(state) {
    state.loginLightboxShown = !state.loginLightboxShown
  }
}

const actions: ActionTree<LoginLightboxState, RootState> = {
  showLoginLightbox({ commit }) {
    commit('SHOW_LOGIN_LIGHTBOX')
  },

  hideLoginLightbox({ commit }) {
    commit('HIDE_LOGIN_LIGHTBOX')
  },

  toggleLoginLightbox({ commit }) {
    commit('TOGGLE_LOGIN_LIGHTBOX')
  }
}

const loginLightbox: Module<LoginLightboxState, RootState> = {
  state, getters, mutations, actions
}
export default loginLightbox
