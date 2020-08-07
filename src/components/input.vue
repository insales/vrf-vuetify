<template>

<v-text-field
  v-model="value"
  :disabled="$disabled"
  :label="noLabel ? '' : humanName"
  :error-messages="$errors[name] && $errors[name][0]"
  :required="required"
  :autofocus="autofocus"
  :suffix="suffix"
  :placeholder="placeholder"
  @keyup.enter="$submit"
  @input="onInput"
  @change="onChange"
  :name="name"
  :tabindex="tabindex"
  :messages="messages"
  :type="password ? 'password' : 'text'"
/>


</template>

<script lang="coffee">

import {descriptors} from 'vrf'
export default {
  extends: descriptors.input
  props:
    messages: Array
    autofocus: Boolean
    suffix: String
    noLabel: Boolean
}

</script>
