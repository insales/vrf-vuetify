import Vue from 'vue'
import App from './App'
import VrfVuetify from '../src/index'
// import VrfVuetify from '../dist/vrf-vuetify.common'


import vuetify from './vuetify'
import Vrf from 'vrf'

Vue.config.productionTip = false

Vue.use(Vrf, {
  translate: (property) => property,
  adapters: [
    VrfVuetify
  ]
})

new Vue({
  el: '#app',
  render: (h) => h(App),
  vuetify
})
