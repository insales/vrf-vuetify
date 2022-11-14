<template>

<v-btn
  @click="onClick"
  v-bind="props"
  v-if="!isActivatorSlot"
>
  {{humanName}}
</v-btn>

<component :is="$vrfParent" v-bind="vrfProps" v-else>
  <template v-slot:activator="props">
    <slot name="activator" v-bind="props" />
  </template>
</component>

</template>

<script>

import {VBtn} from 'vuetify/lib'

const pick = (object, keys) => {
  return keys.reduce(
    (obj, key) => {
      if(object && key in object) {
        obj[key] = object[key]
      }

      return obj
    },
    {}
  )
}

const vuetifyBooleanProps = [
  'fab',
  'large',
  'small',
  'xLarge',
  'xSmall',
  'rounded',
  'shaped',
  'depressed',
  'outlined'
]

export default {
  vrfParent: 'action',
  components: {
    VBtn
  },
  props: {
    color: String,
    ...vuetifyBooleanProps.reduce(
      (props, name) => {
        props[name] = Boolean
        return props
      },
      {}
    )
  },

  computed: {
    vrfProps() {
      return {
        name: this.name,
        params: this.params,
        data: this.data,
        method: this.method
      }
    },

    isActivatorSlot() {
      return !!this.$scopedSlots.activator
    },

    props() {
      return {
        color: this.color,
        loading: this.$actionPendings[this.name],
        ...pick(this, vuetifyBooleanProps)
      }
    }
  }


}

</script>

