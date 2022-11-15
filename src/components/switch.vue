<template>


<v-switch
  :name="name"
  :label="noLabel ? '' : humanName"
  v-model="$value"
  :error-messages="$firstError"
  :tabindex="tabindex"
  :disabled="$disabled"
  v-on="$listeners"
  :hint="hint"
  :persistent-hint="persistentHint"
  v-bind="$attrs"
/>


</template>


<script>
import {VSwitch} from 'vuetify/lib'


export default {
  vrfParent: 'checkbox',
  inheritAttrs: false,
  components: {
    VSwitch
  },
  props: {
    hint: String,
    persistentHint: Boolean
  }
}

</script>
