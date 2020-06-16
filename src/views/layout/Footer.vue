<template>
  <footer class="container" ref="footer">
    <p class="copyright">
      AvFacts and this website are copyright ©2017–{{year}} Tim Morgan. All
      rights reserved.
    </p>
    <p class="login">
      <a @click.prevent="showLoginLightbox"
         data-cy="loginLink"
         href="#"
         v-if="!loggedIn">Log in</a>
      <a @click.prevent="logOut"
         data-cy="logoutLink"
         href="#"
         v-if="loggedIn">Log out</a>
    </p>
  </footer>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Action, Getter } from 'vuex-class'
  import { DateTime } from 'luxon'
  import { isNull, isUndefined } from 'lodash-es'

  @Component
  export default class Footer extends Vue {
    readonly $refs!: {
      footer: HTMLElement;
    }

    @Getter loggedIn!: boolean

    @Action showLoginLightbox!: () => void

    @Action logOut!: () => Promise<void>

    get year(): string {
      return DateTime.local().toLocaleString({ year: 'numeric' })
    }

    mounted(): void {
      this.recalculateContentPadding()
      window.addEventListener('resize', () => this.recalculateContentPadding())
    }

    private recalculateContentPadding() {
      if (isUndefined(this.$refs.footer)) return
      const height = this.$refs.footer.offsetHeight
      const content: HTMLDivElement | null = document.querySelector('body>div')
      if (isNull(content)) return
      content.style.paddingBottom = `${height + 20}px`
    }
  }
</script>

<style lang="scss" scoped>
  @use '../../assets/styles/vars';

  footer {
    align-items: flex-start;

    background-color: #fff;
    bottom: 0;
    box-sizing: border-box;

    display: flex;
    flex-flow: row nowrap;
    left: 0;

    padding: 5px 20px;
    position: fixed;
    width: 100%;
    z-index: vars.$footer-layer;

    .copyright {
      flex: 1 1 auto;
    }

    .login {
      flex: 0 0 auto;
    }
  }

  p {
    font-size: 12px;
  }

  @include vars.responsive-mobile {
    footer {
      flex-flow: column nowrap;
    }
  }
</style>
