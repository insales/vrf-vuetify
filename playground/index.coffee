import Vue from 'vue'
import App from './App'
import VrfVuetify from '../src/index'
import vuetify from './vuetify'
import Vrf from 'vrf'

# import vrf from '../dist/static/lib'

Vue.config.productionTip = false
Vue.use(
  Vrf
  translate: (property) -> property
  adapters: [
    VrfVuetify
  ]
)


new Vue({
  el: '#app',
  render: (h) -> h(App)
  vuetify
})
