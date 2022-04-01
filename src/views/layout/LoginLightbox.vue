<template>
  <lightbox :shown="loginLightboxShown">
    <header>
      <h1>Log in to AvFacts</h1>
      <lightbox-close-button :onClose="hideLoginLightbox" />
    </header>

    <form>
      <input :class="fieldClass"
             autocomplete="username"
             data-cy="usernameField"
             maxlength="50"
             placeholder="Username"
             aria-label="Username"
             required
             type="text"
             v-focus="true"
             v-model="username" />
      <input :class="fieldClass"
             autocomplete="current-password"
             data-cy="passwordField"
             placeholder="Password"
             aria-label="Password"
             required
             type="password"
             v-model="password" />
      <input @click.prevent="submitCredentials"
             data-cy="loginSubmit"
             name="commit"
             type="submit"
             value="Log In" />
    </form>

    <p class="error" data-cy="loginError" v-if="sessionError">{{ sessionError }}</p>
  </lightbox>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Watch } from 'vue-property-decorator'
  import { Action, Getter } from 'vuex-class'

  import Lightbox from '@/components/lightbox/Lightbox.vue'
  import LightboxCloseButton from '@/components/lightbox/LightboxCloseButton.vue'

  @Component({
    components: { Lightbox, LightboxCloseButton }
  })
  export default class LoginLightbox extends Vue {
    username = ''

    password = ''

    @Getter loginLightboxShown!: boolean

    @Getter sessionError!: Error | null

    @Getter loggedIn!: boolean

    @Action hideLoginLightbox!: () => void

    @Action logIn!: (fields: Record<string, string>) => Promise<boolean>

    get fieldClass(): string | null {
      return this.sessionError ? 'invalid' : null
    }

    async submitCredentials(): Promise<void> {
      await this.logIn({ username: this.username, password: this.password })
      if (this.loggedIn) {
        this.hideLoginLightbox()
      }
    }

    @Watch('loginLightboxShown')
    onLoginLightboxShownChanged(newShown: boolean, oldShown: boolean): void {
      if (newShown && !oldShown) {
        this.username = ''
        this.password = ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @use "../../assets/styles/vars";

  header {
    align-items: flex-start;
    display: flex;
    flex-flow: row nowrap;
  }

  h1 {
    color: vars.$dark-gray;
    flex: 1 1 auto;
    font-size: 14px;
    font-weight: 500;
    margin: -5px 0 20px;
  }

  a {
    display: block;
    flex: 0 0 auto;
    margin: -10px -10px 0 0;
  }

  p.error {
    font-weight: normal;
    margin-bottom: 0;
  }
</style>
