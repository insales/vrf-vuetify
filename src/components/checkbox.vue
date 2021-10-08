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


<script lang="coffee">

export default {
  vrfParent: 'checkbox'
  props:
    hint: String
    persistentHint: Boolean
}

</script>

