<template>
  <form @submit.prevent="save" ref="form">
    <ul class="errors" v-if="errors.base">
      <li :key="index" v-for="(error, index) in errors.base">{{error}}</li>
    </ul>
    <slot></slot>
  </form>
</template>

<script lang="ts">
  /* eslint-disable no-param-reassign */

  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Prop, Watch } from 'vue-property-decorator'

  import { Action } from 'vuex-class'
  import SmartFormBus from './smartFormBus'
  import SmartField from '@/components/smartForm/SmartField.vue'
  import { APIResponse, Errors } from '@/store/types'

  @Component
  export default class SmartForm extends Vue {
    readonly $children!: SmartField[]

    readonly $refs!: {
      form: HTMLFormElement;
    }

    @Prop({ type: String, required: true }) path!: string

    @Prop({ type: String, default: 'post' }) method!: string

    @Prop({ type: Object, required: true }) object!: Record<string, string>

    @Prop({ type: String, required: true }) objectName!: string

    @Action request!: <T>(
      args: {
        path: string;
        method?: string;
        body?: Record<string, unknown> | FormData;
        headers?: Record<string, string>;
      }
    ) => APIResponse<T>

    errors: Errors = {}

    private formData(): FormData {
      const formData = new FormData(this.$refs.form)
      this.$children.forEach(child => {
        if (child.type !== 'file') return
        if (child.buffer === '') return
        formData.append(child.field, child.buffer)
      })
      return formData
    }

    async save(): Promise<void> {
      this.errors = {}
      SmartFormBus.$emit('submit')
      try {
        const result: APIResponse<unknown> = await this.request({
          path: this.path,
          method: this.method,
          body: this.formData()
        })

        if (result.ok) {
          SmartFormBus.$emit('success', result.val.object)
        } else {
          this.errors = result.val.errors
          SmartFormBus.$emit('invalid', result.val)
        }
      } catch (error) {
        SmartFormBus.$emit('error', error)
      } finally {
        SmartFormBus.$emit('complete')
      }
    }

    mounted(): void {
      SmartFormBus.$on(
        'value-updated',
        (field: string, value: string) => {
          this.object[field] = value
        }
      )
      this.onObjectChanged()
    }

    @Watch('object')
    onObjectChanged(): void {
      this.$children.forEach(child => {
        child.object = this.object
      })
    }
  }
</script>
