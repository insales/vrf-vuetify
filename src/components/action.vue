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

<script lang="coffee">


pick = (object, keys) ->
  keys.reduce(
    (obj, key) ->
      if object && key of object
        obj[key] = object[key]

      obj
   {}
  )

vuetifyBooleanProps = [
  'fab'
  'large'
  'small'
  'xLarge'
  'xSmall'
  'rounded'
  'shaped'
  'depressed'
  'outlined'
]

export default {
  vrfParent: 'action'

  props: {
    color: String
    ...vuetifyBooleanProps.reduce(
      (props, name) ->
        props[name] = Boolean
        props
      {}
    )
  }

  computed:
    vrfProps: ->
      {
        name: @name
        params: @params
        data: @data
        method: @method
      }
    isActivatorSlot: ->
      @$scopedSlots.activator?

    props: ->
      {
        color: @color
        loading: @$actionPendings[@name]
        ...pick(@, vuetifyBooleanProps)
      }

}

</script>

