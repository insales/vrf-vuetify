<template>


<v-select
  :name="name"
  :items="$_options"
  v-model="value"
  :item-value="idKey"
  :item-text="titleKey"
  :label="humanName"
  :error-messages="errors[name] && errors[name][0]"
  :disabled="$disabled"
  :multiple="multiple"
  :clearable="clearable"
  @click:clear="onClear"
  v-on="listeners"
  :tabindex="tabindex"
  no-data-text="Нет данных"
/>


</template>

<script lang="coffee">

import {descriptors} from 'vrf'

export default {
  extends: descriptors.select

  methods:
    onClear: ->
      @$nextTick =>
        @value = null

}

</script>
