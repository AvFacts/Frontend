import {
  ActionContext, ModuleTree, Store, createLogger
} from 'vuex'

import { Err, Ok } from 'ts-results'
import { has, isNull, isUndefined } from 'lodash-es'
import { APIResponse, FROZEN_MODULES, RootState } from '@/store/types'

const debug = process.env.NODE_ENV !== 'production'

export const baseURL = process.env.NODE_ENV === 'production'
  ? 'https://app.avfacts.org'
  : 'http://localhost:5100'

export default function createStore(modules: ModuleTree<RootState>): Store<RootState> {
  return new Store<RootState>({
    actions: {
      initialize({ commit }: ActionContext<RootState, RootState>): void {
        const storedStateJSON = localStorage.getItem('store')
        if (!isNull(storedStateJSON)) {
          const storedState = JSON.parse(storedStateJSON)
          FROZEN_MODULES.forEach(mod => {
            if (has(storedState, mod)) {
              commit(`INITIALIZE_${mod.toUpperCase()}`, { storedState: storedState[mod] })
            }
          })
        }
      },

      async request<T>(
        { commit, rootGetters }: ActionContext<RootState, RootState>,
        {
          path, method, body, headers
        }: {
          path: string;
          method: string;
          body?: Record<string, unknown> | FormData;
          headers?: Record<string, string>;
        }
      ): Promise<APIResponse<T>> {
        let actualBody
        if (isUndefined(body)) actualBody = undefined
        else if (body instanceof FormData) actualBody = body
        else actualBody = JSON.stringify(body)

        if (rootGetters.JWTExpired) commit('RESET_SESSION')

        const response = await fetch(baseURL + path, {
          method: isUndefined(method) ? 'get' : method,
          body: actualBody,
          headers: {
            ...headers,
            Accept: 'application/json',
            Authorization: rootGetters.authHeader
          }
        })

        if (response.ok) {
          return new Ok({ response, object: await response.json() })
        }
        if (response.status === 401) {
          commit('RESET_SESSION')
          throw new Error('Incorrect login or password')
        } else if (response.status === 422) {
          return new Err({ response, errors: (await response.json()).errors })
        } else {
          throw new Error(`Invalid HTTP response: ${response.status} ${response.statusText}`)
        }
      }
    },

    modules,
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
}
