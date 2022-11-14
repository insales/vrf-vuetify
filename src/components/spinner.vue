<template>
  <v-container mt-5>
    <v-layout justify-center algin-center>
      <v-progress-circular
        size="100"
        color="primary"
        class="vrf-progress"
        indeterminate
      ></v-progress-circular>
    </v-layout>
  </v-container>
</template>


<script>

import {VContainer, VLayout, VProgressCircular} from 'vuetify/lib'

export default {
  components: {
    VContainer,
    VLayout,
    VProgressCircular
  }
}

</script>