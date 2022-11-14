<template>

<v-menu
  :close-on-content-click="false"
  v-model="datepickerVisible"
  transition="scale-transition"
  offset-y
  min-width="290px"
  :disabled="$disabled || $readonly"
>
  <template v-slot:activator="{ on }">
    <v-text-field
      :value="dateText"
      readonly
      :label="noLabel ? '' :humanName"
      v-on="on"
      :disabled="$disabled"
      :error-messages="$firstError"
      :outlined="outlined"
      :dense="dense"
      :solo="solo"
    />
  </template>
  <div style="display: flex; flex-direction: column">
    <v-card width="290" height="286" v-if="timeVisible" class="custom-time-picker">
      <v-layout align-center justify-center column style="height: 100%">
        <v-flex shrink>
          <v-layout>
            <v-btn @click="modifyTime(1, 0)" fab color="transparent"><v-icon>mdi-chevron-up</v-icon></v-btn>
            <v-btn @click="modifyTime(0, 1)" fab color="transparent"><v-icon>mdi-chevron-down</v-icon></v-btn>
          </v-layout>
        </v-flex>
        <v-flex shrink class="input-wrapper">
          <v-text-field
            mask="time"
            v-model="timeValue"
            single-line
            />
        </v-flex>
        <v-flex shrink>
          <v-layout>
            <v-btn @click="modifyTime(-1, 0)" fab color="transparent"><v-icon class="mdi mdi-keyboard_arrow_down"></v-icon></v-btn>
            <v-btn @click="modifyTime(0, -1)" fab color="transparent"><v-icon class="mdi mdi-keyboard_arrow_down"></v-icon></v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card>
    <v-date-picker
      v-model="dateValue"
      no-title
      scrollable
      first-day-of-week="1"
      :locale="locale"
      @input="onInput"
      v-else
    />

    <v-card v-if="withTime">
      <v-layout style="margin-top: -10px" v-if="$value">
        <v-btn class="flex xs6" v-if="timeVisible" color="black" text @click="timeVisible = !timeVisible">
          <v-icon class="mr-1">mdi-today</v-icon>
          {{ date }}
        </v-btn>
        <v-btn class="flex xs6" v-else color="black" text @click="timeVisible = !timeVisible">
          <v-icon class="mr-1">mdi-clock-outline</v-icon>
          {{ time }}
        </v-btn>
        <v-btn class="flex xs6" color="primary" text @click="datepickerVisible = false">OK</v-btn>
      </v-layout>
    </v-card>
  </div>
</v-menu>


</template>


<script>
import {VTextField, VMenu, VCard, VLayout, VFlex, VBtn, VDatePicker, VIcon} from 'vuetify/lib'

const lz = (v) => v > 9 ? v : "0#{v}"


export default {
  vrfParent: 'datepicker',
  components: {
    VTextField,
    VMenu,
    VCard,
    VLayout,
    VFlex,
    VBtn,
    VDatePicker,
    VIcon
  },
  props: {
    noLabel: Boolean,
    withTime: Boolean,
    outlined: Boolean,
    dense: Boolean,
    solo: Boolean
  },

  data() {
    return {
      datepickerVisible: false,
      timeVisible: false
    }
  },

  watch: {
    datepickerVisible(value) {
      if(value) {
        return
      }

      this.timeVisible = false
    }
  },

  computed: {
    locale() {
      return this.VueResourceForm.locale
    },

    dateText() {
      if (!this.dateValue) {
        return
      }

      // TODO: format settings in vrf and delegate to interceptor
      const tokens = this.dateValue.split("-")

      const date = tokens[2] + "." + tokens[1] + "." + tokens[0]

      if (this.withTime) {
        return date + " " + this.timeValue
      }
      else {
        return date
      }
    },

    dateValue: {
      get() {
        return this.VueResourceForm.dateInterceptor.out(this.$value)?.substring(0, 10)
      },
      set(value) {
        this.$value = this.VueResourceForm.dateInterceptor.in(value + "T" + this.timeValue)
      }
    },
    date() {
      return this.dateText?.split('T')[0]
    },
    time() {
      return this.dateText?.split('T')[1]
    },
    timeValue: {
      get() {
        return this.VueResourceForm.dateInterceptor.out(this.$value)?.substring(11, 16) || "00:00"
      },
      set(time) {
        if(!/\d\d:\d\d/.test(time)) {
          return
        }

        let hours = parseInt(time.substring(0, 2))
        let minutes = parseInt(time.substring(3))

        if (hours > 23) {
          hours = 23
        }

        if (minutes > 59) {
          minutes = 59
        }

        this.$value = this.VueResourceForm.dateInterceptor.in(this.dateValue + "T" + lz(hours) + ":" + lz(minutes))
      }
    }
  },

  methods: {
    onInput() {
      if(!this.withTime) {
        this.datepickerVisible = false
      }
    },
    modifyTime(incHours, incMinutes) {
      if(!this.timeValue) {
        return
      }

      let hours = parseInt(this.timeValue.split(':')[0]) + incHours
      let minutes = parseInt(this.timeValue.split(':')[1]) + incMinutes
      hours = hours < 0 ? 24 + hours % 24 : hours % 24
      minutes = minutes < 0 ? 60 + minutes % 60 : minutes % 60

      const value = this.dateValue + "T" + lz(hours) + ":" + lz(minutes)

      this.$value = this.VueResourceForm.dateInterceptor.in(value)
    }
  }
}

</script>

<style lang="css" scoped>
.custom-time-picker {
  font-size: 70px;
}

.custom-time-picker .input-wrapper {
  max-width: 185px!important;
}

.custom-time-picker .v-btn {
  margin: 0 18px;
}

.custom-time-picker .v-btn .v-icon {
  font-size: 50px;
}

input{
  font-size: 70px;
  max-height: inherit!important;
  text-align: center;

}
.v-input__control .v-input__description {
  display: none;
}


.v-input__control .v-input__slot{
  border-radius: 0;
  margin-bottom: 0;
}


.v-input__control .v-input__slot:before{
  border: none ;
}

</style>

