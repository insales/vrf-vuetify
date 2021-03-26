<template>

<v-btn
  @click="onClick"
  v-bind="props"
>
  {{humanName}}
</v-btn>

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
    props: ->
      {
        color: @color
        loading: @$actionPendings[@name]
        ...pick(@, vuetifyBooleanProps)
      }

}

</script>

