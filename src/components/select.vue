<template>


<v-select
  :name="name"
  :items="$_options"
  v-model="$value"
  :item-value="idKey"
  :item-text="titleKey"
  :label="humanName"
  :error-messages="$firstError"
  :disabled="$disabled"
  :multiple="multiple"
  :clearable="clearable"
  @click:clear="onClear"
  v-on="listeners"
  :tabindex="tabindex"
  no-data-text="Нет данных"
  :hint="hint"
  :persistent-hint="persistentHint"
  :append-icon="appendIcon"
  :prepend-icon="prependIcon"
  :prepend-inner-icon="prependInnerIcon"
  :outlined="outlined"
  :dense="dense"
  :solo="solo"
  v-bind="$attrs"
/>


</template>


<script lang="coffee">
import {descriptors} from 'vrf'
import {VSelect} from 'vuetify/lib'

export default {
  extends: descriptors.select,
  inheritAttrs: false,
  components: {
    VSelect
  },
  props: {
    hint: String,
    persistentHint: Boolean,
    appendIcon: String,
    prependIcon: String,
    prependInnerIcon: String,
    outlined: Boolean,
    dense: Boolean,
    solo: Boolean
  },

  methods: {
    onClear() {
      this.$nextTick(() => this.value = null)
    }
  }
}

</script>
