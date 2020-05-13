<template>
<v-list>
  <v-list-item v-for="item, index in items" :key="index" @click="onSelect(item)">
    <v-list-item-content>
      <v-list-item-title v-text="item.value"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</v-list>
</template>

<script lang="coffee">

export default {
  props:
    items: Array
  methods:
    onSelect: (item) ->
      @$emit 'select', item
}

</script>
