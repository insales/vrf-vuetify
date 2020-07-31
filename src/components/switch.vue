<template>


<v-switch
  :name="name"
  :label="humanName"
  v-model="checkboxValue"
  :error-messages="$errors[name] && $errors[name][0]"
  :tabindex="tabindex"
  :disabled="$disabled"
  v-on="$listeners"
/>


</template>


<script lang="coffee">

import {fieldsDescriptors} from 'vrf'

export default {
  extends: fieldsDescriptors.checkbox
}

</script>
