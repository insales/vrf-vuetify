<template>

<v-text-field
  v-model="$value"
  :disabled="$disabled"
  :readonly="$readonly"
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
  :type="type"
  :append-icon="appendIcon"
  @click:append="visible = !visible"
/>


</template>

<script lang="coffee">

export default {
  vrfParent: 'input'
  props:
    messages: Array
    autofocus: Boolean
    suffix: String
    noLabel: Boolean
    toggleVisibility: Boolean

  data: ->
    visible: false

  computed:
    type: ->
      return 'text' unless @password

      if @visible
        'text'
      else
        'password'
    appendIcon: ->
      return unless @toggleVisibility

      if @visible
        'mdi-eye-off'
      else
        'mdi-eye'
}

</script>
