<template>
<v-textarea
  v-model="$value"
  :disabled="$disabled"
  :readonly="$readonly"
  :label="humanName"
  :error-messages="$firstError"
  :required="required"
  outlined
  multi-line
  :no-resize="noResize"
  :rows="rows"
  :tabindex="tabindex"
  @change="onChange"
  :hint="hint"
  :persistent-hint="persistentHint"
  :append-icon="appendIcon"
  :prepend-icon="prependIcon"
  :prepend-inner-icon="prependInnerIcon"
  v-bind="$attrs"
/>
</template>

<script>
import {descriptors} from 'vrf'
import {VTextarea} from 'vuetify/lib'

export default {
  extends: descriptors.textarea,
  inheritAttrs: false,
  components: {
    VTextarea
  },
  props: {
    hint: String,
    persistentHint: Boolean,
    appendIcon: String,
    prependIcon: String,
    prependInnerIcon: String
  }
}

</script>
