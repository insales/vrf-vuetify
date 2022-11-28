import * as components from './components'
import Spinner from './components/spinner'

export default {
  name: 'vrf-vuetify',
  components,
  install: (Vue) => {
    if(Vue.globalProperties) {
      Vue.globalProperties.VueResourceForm.loader = Spinner
    } else {
      Vue.prototype.VueResourceForm.loader = Spinner
    }
  }
}
