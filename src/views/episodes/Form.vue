<template>
  <smart-form :method="method"
              :object="scratchEpisode"
              :path="path"
              objectName="episode">

    <page-loading v-if="saving" />

    <div class="fieldset">
      <div class="field-pair">
        <label for="episode_title">Title</label>
        <smart-field :maxlength="255"
                     :required="true"
                     data-cy="titleField"
                     field="title" />

        <label for="episode_title">Subtitle</label>
        <smart-field :maxlength="255" field="subtitle" />
      </div>

      <div class="field-pair">
        <label for="episode_author">Author</label>
        <smart-field :maxlength="255"
                     :placeholder="channel.author"
                     field="author" />

        <label for="episode_published_at">Publish at</label>
        <smart-field field="published_at" type="datetime" />

        <label>&nbsp;</label>
      </div>
    </div>

    <div class="fieldset">
      <div class="field-pair">
        <label for="episode_audio">Audio file</label>
        <div class="file-pair">
          <smart-field data-cy="audioField" field="audio" type="file" />
          <p v-if="episode.audio">{{episode.audio.size | bytes}} &middot;
            {{episode.audio.duration | duration}}</p>
          <p v-else>&nbsp;</p>
        </div>

        <label for="episode_image">Image file</label>
        <div class="file-pair">
          <smart-field data-cy="imageField" field="image" type="file" />
          <p v-if="episode.image">{{episode.image.size |
            bytes}} &middot;
            <span :class="{'too-small': imageTooSmall}">
              {{episode.image.width}}&times;{{episode.image.height}}
            </span>
          </p>
          <p v-else>&nbsp;</p>
        </div>
      </div>

      <div class="field-pair">
        <smart-field field="explicit" type="checkbox">
          Contains explicit content
        </smart-field>
        <smart-field field="blocked" type="checkbox">
          Block this episode on iTunes Podcasts
        </smart-field>
      </div>
    </div>

    <label for="episode_summary">Summary</label>
    <smart-field :maxlength="255" field="summary" type="text" />

    <label class="below-textarea" for="episode_description">Description</label>
    <smart-field :maxlength="4000"
                 :required="true"
                 data-cy="descriptionField"
                 field="description"
                 type="textarea" />

    <label class="below-textarea" for="episode_credits">Credits</label>
    <smart-field :maxlength="1000" field="credits" type="textarea" />

    <label class="below-textarea" for="episode_script">Script</label>
    <smart-field field="script" type="markdown" />

    <div class="form-actions">
      <div class="left"></div>
      <div class="right">
        <input data-cy="podcastSubmitButton"
               name="commit"
               type="submit"
               value="Save" />
      </div>
    </div>
  </smart-form>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop, Watch } from 'vue-property-decorator'
  import { Action } from 'vuex-class'
  import { isUndefined, pick } from 'lodash-es'
  import channel from '@/channel/channel.json'
  import { Episode } from '@/types'
  import SmartForm from '@/components/smartForm/SmartForm.vue'
  import SmartField from '@/components/smartForm/SmartField.vue'
  import SmartFormBus from '@/components/smartForm/smartFormBus'
  import PageLoading from '@/components/PageLoading.vue'

  const ITUNES_MIN_IMAGE_SIZE = 1400

  @Component({
    components: { SmartForm, SmartField, PageLoading }
  })
  export default class Form extends Vue {
    @Prop({ required: true }) episode!: Episode

    scratchEpisode: Partial<Episode> = {}

    channel = channel

    saving = false

    @Action loadEpisodes!: (params: { restart: boolean }) => Promise<boolean>

    @Action setEpisode!: (params: { episode: Episode }) => void

    @Action setEpisodeInEpisodes!: (params: { episode: Episode }) => void

    get method(): string {
      return (this.episode.number ? 'PUT' : 'POST')
    }

    get path(): string {
      if (this.episode.number) return `/episodes/${this.episode.number}.json`
      return '/episodes.json'
    }

    get imageTooSmall(): boolean {
      return !isUndefined(this.episode.image)
        && (this.episode.image.width < ITUNES_MIN_IMAGE_SIZE
          || this.episode.image.height < ITUNES_MIN_IMAGE_SIZE)
    }

    mounted(): void {
      this.refreshScratch()
      SmartFormBus.$on('submit', () => {
        this.saving = true
      })
      SmartFormBus.$on('complete', () => {
        this.saving = false
      })

      SmartFormBus.$on('success', async (episode: Episode) => {
        await this.loadEpisodes({restart: true})
        this.setEpisode({ episode })
        // this.setEpisodeInEpisodes({ episode })
      })
    }

    @Watch('episode')
    onEpisodeChanged(): void {
      this.refreshScratch()
    }

    private refreshScratch(): void {
      this.scratchEpisode = pick(this.episode,
        ['title', 'subtitle', 'author', 'published_at', 'explicit',
          'blocked', 'summary', 'description', 'script', 'credits'])
    }
  }
</script>

<style lang="scss">
  @use '../../assets/styles/vars';

  #episode_description {
    height: 100px;
  }

  form .CodeMirror {
    height: 400px;
  }

  form {
    position: relative;
  }

  .too-small {
    color: vars.$error-color;
  }

  label.below-textarea {
    margin-top: 20px;
  }
</style>
