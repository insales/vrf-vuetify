<template>


<div class="d-flex">
  <v-menu
    v-model="menu"
    :open-on-click="false"
    offset-y
    offset-overflow
    style="width: 100%"
    content-class="v-autocomplete__content"
    bottom
    :max-height="300"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-model="query"
        v-on="on"
        @input="onInput"
        :loading="loading"
        :label="humanName"
        :disabled="$disabled"
        :clearable="clearable"
        :error-messages="errors[name] && errors[name][0]"
        :placeholder="placeholder"
        @keydown="onKeydown"
        @click="onClick"
        @click:clear="onClear"
        :autofocus="autofocus"
        autocomplete="off"
        ref="autocomplete"
        :name="name"
      />
    </template>
    <component :is="itemsComponent" :items="items" @select="onSelect" />
    <!-- <v-list> -->
<!--           <v-list-item v-for="item, index in items" :key="index" @click="onSelect(item)">
        <component :is="itemComponent"  :item="item" />
      </v-list-item> -->
    <!-- </v-list> -->
  </v-menu>
  <slot name="append-icon" />
</div>


</template>


<script lang="coffee">

import {descriptors} from 'vrf'

export default {
  extends: descriptors.autocomplete
  props:
    messages: Array
    clearable: Boolean

  methods:
    onKeydown: (e) ->
      @$emit 'keydown', e
}

</script>
