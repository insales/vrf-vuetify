<template>
<v-btn
  @click="handleSubmit"
  v-if="!$disabled"
  v-bind="{...props, ...$attrs}"
>
  <div :class="{'transparent': status}">
    <slot>{{humanName}}</slot>
  </div>
  <transition name="fade">
    <v-icon color="white" class="icon-success" v-if="status === 'success'">mdi-check</v-icon>
    <v-icon color="white" class="icon-success" v-if="status === 'error'">mdi-alert-circle</v-icon>
  </transition>
</v-btn>
</template>

<script>
import {VBtn, VIcon} from 'vuetify/lib'

export default {
  inheritAttrs: false,
  vrfParent: 'submit',

  components: {
    VBtn,
    VIcon
  },

  data() {
    return {
      status: null,
      color: 'primary'
    }
  },

  watch: {
    $saving() {
      if (this.$saving) {
        return
      }


      if (this.$lastSaveFailed) {
        this.status = 'error'
        this.color = 'error'
      }
      else {
        this.status = 'success'
        this.color = 'green'
      }

      setTimeout(
        () => {
          this.status = null
          setTimeout(
            () => this.color = 'primary',
            100
          )
        },
        2000
      )
    }
  },

  computed: {
    props() {
      return {
        color: this.color,
        loading: this.$saving,
        disabled: this.$disabled,
        class: {'not-clickable': !!this.status, 'submit-btn': true}
      }
    }
  },


  methods: {
    handleSubmit() {
      if (this.status) {
        return
      }

      this.$submit()
    }
  }
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
