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
      :readonly="$readonly"
      :error-messages="$errors[name] && $errors[name][0]"
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


<script lang="coffee">

lz = (v) ->
  return v if v > 9
  "0#{v}"

export default {
  vrfParent: 'datepicker'
  props:
    noLabel: Boolean
    withTime: Boolean
    outlined: Boolean
    dense: Boolean
    solo: Boolean

  data: ->
    datepickerVisible: false
    timeVisible: false

  watch:
    datepickerVisible: (value) ->
      return if value

      @timeVisible = false

  computed:
    locale: ->
      @VueResourceForm.locale

    dateText: ->
      return unless @dateValue

      # TODO: format settings in vrf and delegate to interceptor
      tokens = @dateValue.split("-")

      date = tokens[2] + "." + tokens[1] + "." + tokens[0]

      if @withTime
        date + " " + @timeValue
      else
        date

    dateValue:
      get: ->
        @VueResourceForm.dateInterceptor.out(@$value)?.substring(0, 10)

      set: (value) ->
        @$value = @VueResourceForm.dateInterceptor.in(value + "T" + @timeValue)

    date: ->
      @dateText?.split('T')[0]
    time: ->
      @dateText?.split('T')[1]
    timeValue:
      get: ->
        @VueResourceForm.dateInterceptor.out(@$value)?.substring(11, 16) || "00:00"
      set: (time) ->
        return unless /\d\d:\d\d/.test(time)

        hours = parseInt(time.substring(0, 2))
        minutes = parseInt(time.substring(3))

        hours = 23 if hours > 23
        minutes = 59 if minutes > 59

        @$value = @VueResourceForm.dateInterceptor.in(@dateValue + "T" + lz(hours) + ":" + lz(minutes))

  methods:
    onInput: ->
      @datepickerVisible = false if !@withTime
    modifyTime: (incHours, incMinutes) ->
      return unless @timeValue

      hours = parseInt(@timeValue.split(':')[0]) + incHours
      minutes = parseInt(@timeValue.split(':')[1]) + incMinutes
      hours = if hours < 0 then 24 + hours % 24 else hours % 24
      minutes = if minutes < 0 then 60 + minutes % 60 else minutes % 60

      value = @dateValue + "T" + lz(hours) + ":" + lz(minutes)

      @$value = @VueResourceForm.dateInterceptor.in(value)
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

