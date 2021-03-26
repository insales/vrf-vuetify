import * as components from './components'
import AutocompleteProvider from './autocomplete-provider'

_components = {...components}

delete _components.AutocompleteProvider

export default {
  name: 'vrf-vuetify'
  components
}

export {
  AutocompleteProvider
}