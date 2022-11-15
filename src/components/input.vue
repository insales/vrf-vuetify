<template>

<v-text-field
  v-model="$value"
  :disabled="$disabled"
  :readonly="$readonly"
  :label="noLabel ? '' : humanName"
  :error-messages="$firstError"
  :required="required"
  :autofocus="autofocus"
  :suffix="suffix"
  :placeholder="placeholder"
  @keyup.enter="$submit"
  @change="onChange"
  :name="name"
  :tabindex="tabindex"
  :messages="messages"
  :type="resultType"
  :append-icon="appendIconCumputed"
  :prepend-icon="prependIcon"
  :prepend-inner-icon="prependInnerIcon"
  @click:append="visible = !visible"
  :autocomplete="autocomplete"
  :hint="hint"
  :persistent-hint="persistentHint"
  :outlined="outlined"
  :dense="dense"
  :solo="solo"
  v-bind="$attrs"
>
  <template v-slot:append-outer>
    <v-btn icon ref="copyButton" @click="onCopy" v-show="copyToClipboard">
      <v-icon color="green" v-if="showSuccessCopyIcon">mdi-check</v-icon>
      <transition name="fade" v-else>
      <v-icon class="icon">mdi-content-copy</v-icon>
      </transition>
    </v-btn>
  </template>
  <template v-if="htmlHint" v-slot:message="{ message }">
    <span v-html="message"></span>
  </template>
  <template v-for="(_, name) in $scopedSlots" v-slot:[name]>
    <slot :name="name" />
  </template>
</v-text-field>


</template>

<script>
import ClipboardJS from 'clipboard'
import {VTextField} from 'vuetify/lib'

export default {
  vrfParent: 'input',
  inheritAttrs: false,
  components: {
    VTextField
  },
  props: {
    messages: Array,
    autofocus: Boolean,
    suffix: String,
    noLabel: Boolean,
    toggleVisibility: Boolean,
    copyToClipboard: Boolean,
    autocomplete: String,
    hint: String,
    persistentHint: Boolean,
    htmlHint: Boolean,
    appendIcon: String,
    prependIcon: String,
    prependInnerIcon: String,
    outlined: Boolean,
    type: String,
    dense: Boolean,
    solo: Boolean
  },
  data() {
    return {
      visible: false,
      showSuccessCopyIcon: false
    }
  },
  mounted() {
    new ClipboardJS(this.$refs.copyButton.$el, {
      text: () => this.$value
    })
  },
  methods: {
    onCopy() {
      this.showSuccessCopyIcon = true

      setTimeout(
        () => this.showSuccessCopyIcon = false,
        1000
      )
    }
  },
  computed: {
    resultType() {
      if (this.type) {
        return this.type
      }

      if (!this.password) {
        return 'text'
      }

      return this.visible ? 'text' : 'password'
    },

    appendIconCumputed() {
      if (!this.toggleVisibility) {
        return this.appendIcon
      }

      return this.visible ? 'mdi-eye-off' : 'mdi-eye'
    }
  }
}


</script>

<style lang="css" scoped>
.transparent{
  opacity: 0 !important;
}

.icon{
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
