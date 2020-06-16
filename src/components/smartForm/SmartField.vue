<template>
  <div class="field-error-pair">
    <textarea :aria-label="label"
              :maxlength="maxlength"
              :placeholder="placeholder"
              :required="required"
              @blur="onBlur()"
              @change="onChange()"
              @focus="onFocus()"
              v-bind="commonAttributes"
              v-if="type === 'textarea'"
              v-model="buffer" />

    <select :aria-label="label"
            @blur="onBlur()"
            @change="onChange()"
            @focus="onFocus()"
            v-bind="commonAttributes"
            v-else-if="type === 'select'"
            v-model="buffer">
      <slot />
    </select>

    <datetime :aria-label="label"
              :auto="true"
              :format="datetimeFormat"
              :phrases="{ok: 'OK', cancel: 'Cancel'}"
              :value-zone="timezone"
              :zone="timezone"
              @blur="onBlur()"
              @change="onChange()"
              @focus="onFocus()"
              type="datetime"
              v-bind="commonAttributes"
              v-else-if="type === 'datetime'"
              v-model="buffer" />

    <textarea :aria-label="label"
              :maxlength="maxlength"
              :required="required"
              @blur="onBlur()"
              @change="onChange()"
              @focus="onFocus()"
              ref="markdownField"
              v-bind="commonAttributes"
              v-else-if="type === 'markdown'"
              v-model="buffer" />

    <label class="checkbox-label"
           v-else-if="type === 'checkbox'">
      <input :type="type"
             @blur="onBlur()"
             @change="onChange()"
             @focus="onFocus()"
             v-bind="commonAttributes"
             v-model="buffer" />
      <slot />
    </label>

    <input :aria-label="label"
           :maxlength="maxlength"
           :placeholder="placeholder"
           :required="required"
           :type="type"
           @blur="onBlur()"
           @change="onChange()"
           @focus="onFocus()"
           v-bind="commonAttributes"
           v-else
           v-model="buffer" />

    <ul class="errors" v-if="errors.length > 0">
      <li v-for="(error, index) in errors" :key="index">{{error}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { DateTime, DateTimeFormatOptions } from 'luxon'
  import Component from 'vue-class-component'
  import { Prop, Watch } from 'vue-property-decorator'
  import { isNull } from 'lodash-es'
  import SimpleMDE from 'simplemde'
  import SmartFormBus from './smartFormBus'
  import SmartForm from '@/components/smartForm/SmartForm.vue'

  @Component
  export default class SmartField extends Vue {
    readonly $parent!: SmartForm

    readonly $refs!: {
      markdownField: HTMLTextAreaElement;
    }

    object: Record<string, string> | null = null

    buffer = ''

    MDE: SimpleMDE | null = null

    @Prop({ type: String, default: 'text' }) type!: string

    @Prop({ type: String, required: true }) field!: string

    @Prop({ type: Boolean, default: false }) required!: boolean

    @Prop({ type: Number }) maxlength!: number | null

    @Prop({ type: String }) placeholder!: string | null

    @Prop({ type: String }) label!: string | null

    @Prop({ type: String, default: 'America/Los_Angeles' }) timezone!: string

    get errors(): string[] {
      return this.$parent.errors[this.field] || []
    }

    get datetimeFormat(): DateTimeFormatOptions {
      return DateTime.DATETIME_FULL
    }

    get commonAttributes(): Record<string, string | Record<string, boolean>> {
      return {
        name: this.name,
        id: this.id,
        class: { invalid: this.invalid },
        'v-model': this.buffer
      }
    }

    private get name(): string {
      return `${this.$parent.objectName}[${this.field}]`
    }

    private get id(): string {
      return `${this.$parent.objectName}_${this.field}`
    }

    private get invalid(): boolean {
      return this.errors.length > 0
    }

    onFocus(): void {
      SmartFormBus.$emit('field-focus', this.field)
    }

    onBlur(): void {
      SmartFormBus.$emit('field-blur', this.field)
    }

    onChange(): void {
      SmartFormBus.$emit('value-updated', this.field, this.buffer)
    }

    @Watch('object')
    onObjectChanged(): void {
      if (this.type === 'file') return
      if (isNull(this.object)) return

      this.buffer = this.object[this.field]
      this.createMDE()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: accessing a private `element` property
      if (this.MDE) this.MDE.element = this.$refs.markdownField
    }

    @Watch('buffer')
    onBufferChanged(): void {
      if (this.MDE) this.MDE.value(this.buffer)
      this.onChange()
    }

    mounted(): void {
      this.createMDE()
    }

    private createMDE() {
      if (this.type !== 'markdown') return
      if (this.MDE) return
      this.MDE = new SimpleMDE({
        element: this.$refs.markdownField,
        blockStyles: { italic: '_' },
        spellChecker: false,
        status: false,
        forceSync: true
      })
    }
  }
</script>
