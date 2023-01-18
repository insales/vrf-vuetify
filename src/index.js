import * as components from './components'
import Spinner from './components/spinner'

export default {
  name: 'vrf-vuetify',
  components,
  templates: {
    form: {
      loader: Spinner
    }
  }
}
