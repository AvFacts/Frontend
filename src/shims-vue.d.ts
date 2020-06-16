/* eslint-disable import/no-duplicates */
declare module '*.vue' {
  import Vue from 'vue'

  export default Vue
}

declare module 'vue-infinite-scroll' {
  import { PluginObject } from 'vue'

  const plugin: PluginObject<unknown>
  export default plugin
}
