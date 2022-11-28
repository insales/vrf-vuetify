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
import {descriptors} from 'vrf'
import {VSwitch} from 'vuetify/lib'


export default {
  extends: descriptors.checkbox,
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
