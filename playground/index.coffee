import Vue from 'vue'
import App from './App'
import VrfVuetify from '../src/index'
import vuetify from './vuetify'
import Vrf from 'vrf'

# import vrf from '../dist/static/lib'

class Middleware
  @accepts: -> true

  load: ->
    Promise.resolve({})

  loadSources: ->
    Promise.resolve({})

  save: ->
    new Promise((resolve) -> setTimeout((-> resolve([false, {}])), 2000))

Vue.config.productionTip = false
Vue.use(
  Vrf
  translate: (property) -> property
  adapters: [
    VrfVuetify
  ]
  middlewares: [Middleware]
)


new Vue({
  el: '#app',
  render: (h) -> h(App)
  vuetify
})
