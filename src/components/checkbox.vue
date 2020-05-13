<template>

<v-checkbox
  :label="humanName"
  v-model="checkboxValue"
  :error-messages="errors[name] && errors[name][0]"
  :tabindex="tabindex"
  :disabled="$disabled"
  :indeterminate="indeterminate"
  v-on="$listeners"
/>


</template>


<script lang="coffee">

import {fieldsDescriptors} from 'vrf'

export default {
  extends: fieldsDescriptors.checkbox
}

</script>

