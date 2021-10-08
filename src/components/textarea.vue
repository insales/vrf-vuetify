<template>
<v-textarea
  v-model="$value"
  :disabled="$disabled"
  :readonly="$readonly"
  :label="humanName"
  :error-messages="$firstError"
  :required="required"
  outlined
  multi-line
  :no-resize="noResize"
  :rows="rows"
  :tabindex="tabindex"
  @change="onChange"
  :hint="hint"
  :persistent-hint="persistentHint"
  :append-icon="appendIcon"
  :prepend-icon="prependIcon"
  :prepend-inner-icon="prependInnerIcon"
/>
</template>

<script lang="coffee">

export default {
  vrfParent: 'textarea'
  props:
    hint: String
    persistentHint: Boolean
    appendIcon: String
    prependIcon: String
    prependInnerIcon: String
}

</script>
