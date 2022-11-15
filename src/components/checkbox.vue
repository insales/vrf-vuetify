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
import {VCheckbox} from 'vuetify/lib'

export default {
  vrfParent: 'checkbox',
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

