<template>

<v-checkbox
  :label="humanName"
  v-model="$value"
  :error-messages="$errors[name] && $errors[name][0]"
  :tabindex="tabindex"
  :disabled="$disabled"
  :indeterminate="indeterminate"
  v-on="$listeners"
/>


</template>


<script lang="coffee">

export default {
  vrfParent: 'checkbox'
}

</script>

