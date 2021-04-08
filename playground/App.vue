<template>
  <v-app id="app">
    <v-container>
      <!-- <img src="./assets/logo.png"> -->

      VRF playground(Vuetify)

      <rf-form auto name="Lala">
        <rf-input name="test" />
        <rf-submit />

      </rf-form>
      <h1> Simple form </h1>
      <div style="display: flex">
        <rf-form :resource="todo" class="form">
          <rf-input name="title" @input="onInput" copy-to-clipboard />
          <rf-checkbox name="status" />
          <rf-switch name="status" />
          <rf-datepicker name="finishTill" with-time />
          <rf-select name="importance" :options="importanceOptions" />
          <rf-textarea name="description" />
          <rf-span name="owner" />


          <h3>Bitwise field</h3>
          <h4>Markup based</h4>
          <rf-bitwise name="flags">
            <rf-checkbox name="some 1" power="1" />
            <rf-checkbox name="some 2" power="2" />
          </rf-bitwise>

          <h4>Options based(inverted)</h4>
          <rf-bitwise
            name="flags"
            :options="[{id: 1, title: 'some 1'}, {id: 2, title: 'some 2'}]"
            inverted
          />

          <v-btn color="primary" @click="add">Add</v-btn>
        </rf-form>
        <div style="flex: 1">
          {{todo}}
        </div>
      </div>

      <h1> Nested form </h1>
      <div style="display: flex">
        <rf-form :resource="user" class="form">
          <rf-nested name="todos">
            <template slot-scope="props">
              <div class="form">
                <rf-input name="title" />
                <rf-checkbox name="status" />
                <rf-datepicker name="finishTill" />
                <rf-select name="importance" :options="importanceOptions" />
                <rf-textarea name="description" />
                <rf-span name="owner" />

                <h2> rf-resource example </h2>
                <rf-resource>
                  <template slot-scope="props">
                    {{props}}
                  </template>
                </rf-resource>
              </div>
            </template>
          </rf-nested>

        </rf-form>
        <div style="flex: 1">
          {{user}}
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="coffee">
export default {
  data: ->
    todo: null
    user:
      todos: [
        {
          title: 'First'
          status: false
          finishTill: null
          importance: null
          description: ''
          owner: 'User #1'
        }
        {
          title: 'Second'
          status: false
          finishTill: null
          importance: null
          description: ''
          owner: 'User #1'
        }
      ]


  created: ->
    @todo = @blank()

  methods:
    onInput: ->

    add: ->
      @user.todos.push(@todo)

      @todo = @blank()

      # @user.todos.push(@blank())

    blank: ->
      title: ''
      status: false
      finishTill: null
      importance: null
      description: ''
      owner: 'User #1'
      flags: 0

  computed:
    importanceOptions: ->
      [
        {
          id: 1, title: 'Low'
        }
        {
          id: 2, title: 'High'
        }
      ]
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form{
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
