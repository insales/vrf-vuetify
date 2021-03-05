<template>
<v-textarea
  v-model="$value"
  :disabled="$disabled"
  :readonly="$readonly"
  :label="humanName"
  :error-messages="$errors[name] && $errors[name][0]"
  :required="required"
  outlined
  multi-line
  :no-resize="noResize"
  :rows="rows"
  :tabindex="tabindex"
  @change="onChange"
/>
</template>

<script lang="coffee">

export default {
  vrfParent: 'textarea'
}

</script>
