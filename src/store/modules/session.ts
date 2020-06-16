/* eslint-disable no-shadow */

import {
  ActionTree, GetterTree, Module, MutationTree
} from 'vuex'
import {
  assign, isNull, isString, isUndefined
} from 'lodash-es'
import { APIResponse, RootState } from '@/store/types'

export interface SessionState {
  JWT: string | null;
  sessionError: Error | null
}

interface JWTPayload {
  iss: string;
  sub: string;
  aud: string;
  exp?: string | number;
  nbf?: string | number;
  iat: string | number;
  jti: string;
}

export function state(): SessionState {
  return {
    JWT: null,
    sessionError: null
  }
}

const getters: GetterTree<SessionState, RootState> = {
  JWT(state): string | null {
    return state.JWT
  },
  JWTPayload(state): JWTPayload | null {
    return state.JWT ? JSON.parse(atob(state.JWT.split('.')[1])) : null
  },

  JWTExpired(state, getters): boolean | null {
    if (isNull(state.JWT)) return null
    if (isUndefined(getters.JWTPayload.exp)) return null
    const exp = isString(getters.JWTPayload.exp)
      ? Number.parseInt(getters.JWTPayload.exp, 10)
      : getters.JWTPayload.exp
    return exp <= new Date().getTime() / 1000
  },

  /** @return Whether a user is logged in for this session. */
  loggedIn(state): boolean {
    return !isNull(state.JWT)
  },

  /** The username of the Squadron that's logged in, if any. */
  currentUsername(state, getters): string | null {
    const payload: JWTPayload | null = getters.JWTPayload
    if (isNull(payload)) return null
    return payload.sub
  },

  authHeader(state): string | null {
    if (state.JWT) return `Bearer ${state.JWT}`
    return null
  },

  freezeSession(state): SessionState {
    return state
  },

  sessionError(state): Error | null {
    return state.sessionError
  }
}

const mutations: MutationTree<SessionState> = {
  INITIALIZE_SESSION(state, { storedState }: { storedState: SessionState }) {
    state.JWT = storedState.JWT
  },

  RESET_SESSION(state_) {
    assign(state_, state())
  },

  SET_JWT(state, { JWT }: { JWT: string | null }) {
    state.JWT = JWT
    state.sessionError = null
  },

  SET_SESSION_ERROR(state, { error }: { error: Error }) {
    state.sessionError = error
  }
}

const actions: ActionTree<SessionState, RootState> = {

  /**
   * Logs in a user account.
   *
   * @param username The username.
   * @param password The password.
   * @return A Result containing nothing if successful, or an error message if failed.
   */

  async logIn(
    { dispatch, commit },
    { username, password }: { username: string; password: string }
  ): Promise<void> {
    try {
      const result: APIResponse<void> = await dispatch('request', {
        path: `/session.json?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
        method: 'post',
        body: { username, password },
        skipResetAuth: true
      })

      if (result.ok) {
        await dispatch('setJWT', { response: result.val.response })
        await dispatch('loadEpisodes', { restart: true })
        await dispatch('reloadEpisode')
      } else {
        throw new Error(`Invalid HTTP response: ${result.val.response.status} ${result.val.response.statusText}`)
      }
    } catch (error) {
      commit('SET_SESSION_ERROR', { error })
    }
  },

  setJWT({ commit }, { response }: { response: Response }): void {
    const authorization = response.headers.get('Authorization')
    if (authorization && authorization.match(/^Bearer /)) {
      commit('SET_JWT', { JWT: authorization.slice(7) })
    }
  },

  /**
   * Logs out the logged-in user user.
   */

  async logOut({ commit, dispatch }): Promise<void> {
    await dispatch('request', { method: 'delete', path: '/session.json' })
    commit('SET_JWT', { JWT: null })
    await dispatch('loadEpisodes', { restart: true })
  }
}

const auth: Module<SessionState, RootState> = {
  state, getters, mutations, actions
}
export default auth
