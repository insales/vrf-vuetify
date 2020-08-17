<template>


<v-switch
  :name="name"
  :label="noLabel ? '' : humanName"
  v-model="$value"
  :error-messages="$errors[name] && $errors[name][0]"
  :tabindex="tabindex"
  :disabled="$disabled"
  v-on="$listeners"
/>


</template>


<script lang="coffee">

export default {
  vrfParent: 'checkbox'
}

</script>
