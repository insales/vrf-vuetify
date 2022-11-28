<template>

<v-checkbox
  :label="noLabel ? '' : humanName"
  v-model="$value"
  :error-messages="$firstError"
  :tabindex="tabindex"
  :disabled="$disabled"
  :indeterminate="indeterminate"
  v-on="$listeners"
  :hint="hint"
  :persistent-hint="persistentHint"
  v-bind="$attrs"
/>


</template>


<script>
import {descriptors} from 'vrf'
import {VCheckbox} from 'vuetify/lib'

export default {
  extends: descriptors.checkbox,
  inheritAttrs: false,
  components: {
    VCheckbox
  },
  props: {
    hint: String,
    persistentHint: Boolean
  }
}

</script>

