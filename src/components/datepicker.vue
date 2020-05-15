<template>

<v-menu
  lazy
  :close-on-content-click="false"
  v-model="datepickerVisible"
  transition="scale-transition"
  offset-y
  full-width
  min-width="290px"
  :disabled="$disabled"
>
  <template v-slot:activator="{ on }">
    <v-text-field
      :value="dateText"
      readonly
      :label="noLabel ? '' :humanName"
      v-on="on"
      :disabled="$disabled"
      :error-messages="errors[name] && errors[name][0]"
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
      :locale="locale"
      @input="onInput"
      v-else
    />

    <v-card v-if="withTime">
      <v-layout style="margin-top: -10px" v-if="value">
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


<script lang="coffee">

import {descriptors} from 'vrf'

export default {
  extends: descriptors.datepicker

  data: ->
    datepickerVisible: false
    timeVisible: false

  watch:
    datepickerVisible: (value) ->
      return if value

      @timeVisible = false

  computed:
    # fix it
    locale: ->
      @VueResourceForm.locale

    dateText: ->
      if @withTime
        @value?.format('DD.MM.YYYY HH:mm')
      else
        @value?.format('DD.MM.YYYY')
    dateValue:
      get: ->
        @value?.format('YYYY-MM-DD')
      set: (value) ->
        if @withTime
          @value = moment(value + " " + @timeValue)
        else
          @value = moment(value)

    date: ->
      @dateText?.split(' ')[0]
    time: ->
      @dateText?.split(' ')[1]
    timeValue:
      get: ->
        @value?.format('HH:mm')
      set: (time) ->
        if time.length == 4
          hours = parseInt(time.substring(0, 2))
          minutes = parseInt(time.substring(2))
          hours = 23 if hours > 23
          minutes = 59 if minutes > 59
          @value = moment(@dateValue + " " + hours + ":" + minutes)
  methods:
    onInput: ->
      @datepickerVisible = false if !@withTime
    modifyTime: (incHours, incMinutes) ->
      return unless @timeValue

      hours = parseInt(@timeValue.split(':')[0]) + incHours
      minutes = parseInt(@timeValue.split(':')[1]) + incMinutes
      hours = if hours < 0 then 24 + hours % 24 else hours % 24
      minutes = if minutes < 0 then 60 + minutes % 60 else minutes % 60
      @value = moment(@dateValue + " " + hours + ":" + minutes)

  props:
    noLabel: Boolean
    withTime: Boolean

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

