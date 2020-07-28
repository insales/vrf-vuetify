<template>
<v-btn
  @click="handleSubmit"
  :color="color"
  :loading="saving"
  :disabled="$disabled"
  :class="{'not-clickable': showSuccess}"
  class="submit-btn"
  v-if="!$disabled"
>
  <div :class="{'transparent': showSuccess}">
    <slot>{{humanName}}</slot>
  </div>
  <transition name="fade">
    <v-icon color="white" class="icon-success" v-if="showSuccess">mdi-check</v-icon>
  </transition>
</v-btn>
</template>

<script lang="coffee">

import {descriptors} from 'vrf'


export default {
  extends: descriptors.submit

  data: ->
    showSuccess: false
    color: 'primary'

  watch:
    saving: ->
      if not @saving && Object.keys(@errors).length is 0
        @showSuccess = true
        @color = 'green'
        setTimeout(
          =>
            @showSuccess = false
            setTimeout(
              => @color = 'primary'
              100
            )
          2000
        )

  # computed:
  #   color: ->
  #     if @showSuccess then 'green' else 'primary'

  methods:
    handleSubmit: ->
      return if @showSuccess

      @submit()

}

</script>

<style lang="css" scoped>
.transparent{
  opacity: 0 !important;
}

.icon-success{
  position: absolute!important;
  margin: 0 auto!important;
}

.fade-enter-active{
  transition: opacity 1s;
}

.fade-enter, .fade-leave-active, .fade-leave-to, .fade-leave{
  opacity: 0 !important;
}

.submit-btn{
  color: white !important;
}

.not-clickable:hover {
    cursor: unset !important;
}
</style>
