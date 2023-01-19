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
        :error-messages="$firstError"
        :placeholder="placeholder"
        @keydown="onKeydown"
        @click="onClick"
        @click:clear="onClear"
        :autofocus="autofocus"
        autocomplete="off"
        ref="autocomplete"
        :name="name"
        v-bind="$attrs"
      />
    </template>

    <slot name="items" v-if="hasItemsSlot" :items="items" :$on="on()" />
    <v-list v-else-if="hasItemSlot">
      <slot
        name="item"
        v-for="item in items"
        :item="item"
        :$on="onFor(item)"
        :text="presentItem(item)"
      />
    </v-list>

    <component :is="itemsComponent" v-else-if="itemsComponent" />
    <v-list v-else-if="itemComponent">
      <component
        :is="itemComponent"
        v-for="item, i in items"
        :item="item"
        :$on="onFor(item)"
        :text="presentItem(item)"
        :key="i"
      />
    </v-list>

    <v-list
        v-for="item, i in items"
        :key="i"
        v-else
      >
      <v-list-item v-for="item, index in items" :key="index" @click="onSelect(item)">
        <v-list-item-content>
          <v-list-item-title v-text="presentItem(item)"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

  </v-menu>
  <slot name="append-icon" />
</div>


</template>


<script>
import {descriptors} from 'vrf'
import {VTextField, VMenu, VList, VListItem} from 'vuetify/lib'


export default {
  extends: descriptors.autocomplete,
  inheritAttrs: false,
  components: {
    VTextField,
    VMenu,
    VList,
    VListItem
  },

  methods: {
    onKeydown(e) {
      this.$emit('keydown', e)
    }
  }
}

</script>
