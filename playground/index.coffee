import Vue from 'vue'
import App from './App'
import vrf from '../src/index'
import vuetify from './vuetify'

# import vrf from '../dist/static/lib'

Vue.config.productionTip = false
Vue.use(
  vrf
  translate: (property) -> property
)


new Vue({
  el: '#app',
  render: (h) -> h(App)
  vuetify
})
