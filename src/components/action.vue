<template>

<v-btn
  @click="onClick"
  v-bind="{...props, ...$attrs}"
  v-if="!isActivatorSlot"
>
  {{humanName}}
</v-btn>

<component :is="$vrfParent" v-bind="{...props, ...$attrs}" v-else>
  <template v-slot:activator="props">
    <slot name="activator" v-bind="props" />
  </template>
</component>

</template>

<script>

import {VBtn} from 'vuetify/lib'

export default {
  vrfParent: 'action',
  inheritAttrs: false,
  components: {
    VBtn
  },
  props: {
    color: String
  },

  computed: {
    isActivatorSlot() {
      return !!this.$scopedSlots.activator
    },

    props() {
      return {
        color: this.color,
        loading: this.$actionPendings[this.name],
      }
    }
  }


}

</script>

