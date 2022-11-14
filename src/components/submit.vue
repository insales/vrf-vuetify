<template>
<v-btn
  @click="handleSubmit"
  v-if="!$disabled"
  v-bind="props"
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
  vrfParent: 'submit',

  components: {
    VBtn,
    VIcon
  },

  props: vuetifyBooleanProps.reduce(
    (props, name) => {
      props[name] = Boolean
      return props
    },
    {}
  ),

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
        class: {'not-clickable': !!this.status, 'submit-btn': true},
        ...pick(this, vuetifyBooleanProps)
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
