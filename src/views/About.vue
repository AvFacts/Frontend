<template>
  <div data-cy="about">
    <h1>About Me</h1>

    <p>
      Hello, my name is Tim Morgan. I am a full-stack web developer, hobbyist
      pilot, and all around aviation fanatic. I created this podcast to share my
      love of aviation with you, and to learn and discuss interesting topics I
      come across as I expand my aviation knowledge.
    </p>

    <img src="../assets/images/about1.jpg" alt="Photo of me" />

    <p>
      I hold a commercial pilot certificate with airplane single-engine land and
      sea ratings, aircraft multi-engine land rating, and instrument airplane
      rating. I currently own a 2005 Cirrus SR22 Turbo G2, and I also have
      experience in a variety of other small aircraft types.
    </p>

    <img src="../assets/images/about2.jpg" alt="Photo of my airplane" />

    <p>
      I also play a variety of combat and civilian flight simulators (Digital
      Combat Simulator, Falcon BMS, Prepar3D [A2A and PMDG aircraft], and
      others).
    </p>

    <img src="../assets/images/about3.jpg" alt="Photo of my man-cave" />

    <p>
      This podcast was inspired by
      <a href="https://www.quora.com/profile/Tim-Morgan-5">my answers on
        Quora</a>. When I’m not coding or flying, I’m typically answering
      aviation questions on Quora. (Even when I should be doing other things,
      like paying attention to the people around me…) I take great joy in
      sharing aviation knowledge on Quora, and this podcast is another medium
      in which to do so.
    </p>

    <p class="small">Parts of this website were created by Role Play and Andi
      Nur Abdillah, from The Noun Project, and released under the Creative
      Commons Attribution 3.0 International (CC BY 3.0) license.</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class About extends Vue {
  }
</script>

<style lang="scss" scoped>
  @use "../assets/styles/vars";

  img {
    display: block;
    margin: 40px auto;
    width: 300px;
  }

  p.small {
    font-size: 12px;
    margin-top: 40px;
  }

  @include vars.responsive-desktop {
    div {
      margin-left: auto;
      margin-right: auto;
      width: 540px;
    }
  }
</style>
