/* eslint-disable @typescript-eslint/no-unused-vars,@typescript-eslint/no-empty-function,
    mocha/no-top-level-hooks */

import Vue from 'vue'
import Vuex from 'vuex'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import chaiAsPromised from 'chai-as-promised'
import Sinon, { SinonSandbox } from 'sinon'
import nock from 'nock'
import { createLocalVue } from '@vue/test-utils'
import 'cross-fetch/polyfill'

chai.use(sinonChai)
chai.use(chaiAsPromised)

const localStorage = {
  length: 0,
  clear(): void {
  },
  getItem(key: string): string | null {
    return null
  },
  key(index: number): string | null {
    return null
  },
  removeItem(key: string): void {
  },
  setItem(key: string, value: string): void {
  }
}

let sandbox: SinonSandbox

beforeEach(() => {
  sandbox = Sinon.createSandbox()
  sandbox.replaceGetter(window, 'localStorage', () => localStorage)
  nock.disableNetConnect()
})

afterEach(() => {
  sandbox.restore()
  // nock.cleanAll()
})

export function getSandbox(): SinonSandbox {
  return sandbox
}

export function localVue(): typeof Vue {
  const vue = createLocalVue()
  vue.use(Vuex)
  return vue
}
