import * as components from './components'
import Spinner from './components/spinner'

export default {
  name: 'vrf-vuetify',
  components,
  install: (Vue) => {
    Vue.prototype.VueResourceForm.loader = Spinner
  }
}
