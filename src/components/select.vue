<template>


<v-select
  :name="name"
  :items="$_options"
  v-model="$value"
  :item-value="idKey"
  :item-text="titleKey"
  :label="humanName"
  :error-messages="$errors[name] && $errors[name][0]"
  :disabled="$disabled"
  :multiple="multiple"
  :clearable="clearable"
  @click:clear="onClear"
  v-on="listeners"
  :tabindex="tabindex"
  no-data-text="Нет данных"
  :hint="hint"
  :persistent-hint="persistentHint"
  :append-icon="appendIcon"
  :prepend-icon="prependIcon"
  :prepend-inner-icon="prependInnerIcon"
/>


</template>

<script lang="coffee">

export default {
  vrfParent: 'select'
  props:
    hint: String
    persistentHint: Boolean
    appendIcon: String
    prependIcon: String
    prependInnerIcon: String

  methods:
    onClear: ->
      @$nextTick =>
        @value = null

}

</script>
