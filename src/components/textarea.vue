<template>
<v-textarea
  v-model="value"
  :disabled="$disabled"
  :label="humanName"
  :error-messages="errors[name] && errors[name][0]"
  :required="required"
  outlined
  multi-line
  :no-resize="noResize"
  :rows="rows"
  :tabindex="tabindex"
/>
</template>

<script lang="coffee">

import {descriptors} from 'vrf'

export default {
  extends: descriptors.textarea
}

</script>
