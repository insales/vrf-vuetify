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
/>


</template>


<script>
import {VCheckbox} from 'vuetify/lib'

export default {
  vrfParent: 'checkbox',
  components: {
    VCheckbox
  },
  props: {
    hint: String,
    persistentHint: Boolean
  }
}

</script>

